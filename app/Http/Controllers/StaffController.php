<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Inertia\Inertia;
use App\Enums\Gender;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\JobType;
use App\Enums\UserRole;
use App\Models\Teacher;
use App\Enums\TeachingType;
use Illuminate\Support\Str;
use App\Enums\StaffRoleType;
use Illuminate\Http\Request;
use App\Services\MailService;
use App\Enums\LedgerAmountType;
use Illuminate\Validation\Rule;
use App\Mail\StaffCredentialMail;
use App\Enums\CustomFieldDataType;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use App\Http\Requests\StaffRequest;
use App\Enums\StudentStaffFieldType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\TeacherRequest;
use App\Repositories\HouseRepository;
use App\Repositories\ImageRepository;
use App\Repositories\IUserRepository;
use App\Repositories\StaffRepository;
use App\Repositories\StateRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IHouseRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\IStateRepository;
use App\Repositories\ILedgerRepository;
use App\Repositories\ISchoolRepository;
use App\Repositories\TeacherRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\ISubjectRepository;
use App\Repositories\ITeacherRepository;
use App\Repositories\ReligionRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ICategoryRepository;
use App\Repositories\IReligionRepository;
use App\Repositories\BloodGroupRepository;
use App\Repositories\DepartmentRepository;
use App\Repositories\DesignationRepository;
use App\Repositories\IBloodGroupRepository;
use App\Repositories\IDepartmentRepository;
use App\Repositories\ICustomFieldRepository;
use App\Repositories\IDesignationRepository;
use App\Repositories\ISiteSettingRepository;
use App\Repositories\IAccountGroupRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;


class StaffController extends Controller
{
    private $_upload;
    public function __construct(
        private IStaffRepository $staffRepository,
        private ITeacherRepository $teacherRepository,
        private IStateRepository $stateRepository,
        private IHouseRepository $houseRepository,
        private ICategoryRepository $categoryRepository,
        private IReligionRepository $religionRepository,
        private IDepartmentRepository $departmentRepository,
        private IDesignationRepository $designationRepository,
        private IBloodGroupRepository $bloodGroupRepository,
        private IUserRepository $userRepository,
        private ImageRepository $imageRepository,
        private IAccountGroupRepository $accountGroupRepository,
        private ILedgerRepository $ledgerRepository,
        private ISiteSettingRepository $siteSettingRepository,
        private ISubjectRepository $subjectRepository,
        private ICustomFieldRepository $customFieldRepository,
        private ISchoolRepository $schoolRepository,
        private MailService $mailService,
    ) {
        $this->_upload = new UploadFileController();
        $this->middleware('permission:view staffs', ['only' => ['index', 'misReport', 'inactiveStaff', 'staffInactive', 'staffMakeActive', 'details']]);
        $this->middleware('permission:add staffs', ['only' => ['create', 'save', 'updateProfileImage', 'updateUser', 'updatePassword']]);
        $this->middleware('permission:edit staffs', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete staffs', ['only' => ['destroy']]);
    }

    /**
     * display staff list.
     */
    public function index(Request $request): Response
    {
        $orderText =  null;
        $staffDepartmentId = null;
        $staffDesignationId = null;
        $staffHouseId = null;
        $staffType = "";
        $staffJobType = "";
        $staffRoleType = "";
        $staffSearch = "";

        if ($request->isMethod('post')) {
            $orderText = $request->input('order_text') ?? null;
            $staffDepartmentId = $request->input('staff_department') ?? null;
            $staffDesignationId = $request->input('staff_designation') ?? null;
            $staffHouseId = $request->input('staff_house') ?? null;
            $staffType = $request->input('staff_type') ?? "";
            $staffJobType = $request->input('staff_job_type') ?? "";
            $staffRoleType = $request->input('staff_role_type') ?? "";
            $staffSearch = $request->input('staff_search') ?? "";
        }
        $staffs = $this->staffRepository->getActiveAllStaff($orderText, $staffDepartmentId, $staffDesignationId, $staffHouseId, $staffType, $staffJobType, $staffRoleType, $staffSearch);

        // get user role
        $userRollType = StaffRoleType::cases();
        $userRolls = array_map(function ($rollType) {
            return ['id' => $rollType->value, 'title' => $rollType->value];
        }, $userRollType);

        // get teaching
        $teachingType = TeachingType::cases();
        $teachingTypes = array_map(function ($tType) {
            return ['id' => $tType->value, 'title' => $tType->value];
        }, $teachingType);

        // get job type
        $jobType = JobType::cases();
        $jobTypes = array_map(function ($jType) {
            return ['id' => $jType->value, 'title' => $jType->value];
        }, $jobType);

        // data
        $housesData = $this->houseRepository->getActiveNameAndId();
        $departmentData = $this->departmentRepository->getActiveNameAndId();
        $designationData = $this->designationRepository->getActiveNameAndId();

        $houses = $housesData->map(fn($house) => ['id' => $house->id, 'title' => $house->name])->all();
        $departments = $departmentData->map(fn($department) => ['id' => $department->id, 'title' => $department->name])->all();
        $designations = $designationData->map(fn($designation) => ['id' => $designation->id, 'title' => $designation->name])->all();

        return Inertia::render('Staff/Show', [
            'staffs' => $staffs,
            'designations' => $designations,
            'houses' => $houses,
            'jobTypes' => $jobTypes,
            'departments' => $departments,
            'teachingTypes' => $teachingTypes,
            'userRolls' => $userRolls,
        ]);
    }

    /** Send Staff Login Credential Mail
     *
     */
    public function sendStaffLoginCredential(Request $request): RedirectResponse
    {
        try {
            // staff
            $staff = $this->staffRepository->getStaffByIdAndStatus($request->staff_id);

            $staff->loadMissing(['user:id,username,parent_pass']);

            // school
            $school = $this->schoolRepository->getById(getUserSchoolId());

            // domain name
            $domain_name = env('DOMAIN_NAME', 'educarestudy.in');

            // credential data
            $credentialData = [
                'school_key' => $school->school_key,
                'school_name' => $school->title,
                'staff_name' => trim(implode(' ', [$staff?->first_name, $staff?->middle_name, $staff?->last_name])),
                'username' => $staff?->user?->username,
                'password' => $staff?->user?->parent_pass,
                'website_url' => $school->school_key . "." . $domain_name
            ];

            // send mail
            $this->mailService->sendMail($staff->email, new StaffCredentialMail($credentialData));

            return redirect()->back()->with('message', 'Credential sent successfully!');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Something goes wrong!');
        }
    }

    /**
     * Display the mis report.
     */
    public function misReport(Request $request): Response
    {
        $staffs = $this->staffRepository->getActiveAll();
        $misCounts = $this->staffRepository->getMisReportCounts();

        // departments data
        $staffFromDepartments = $this->staffRepository->getStaffFromDepartments();
        $departmentsStaffs = array();
        $departmentData = $this->departmentRepository->getActiveNameAndId();
        if (!empty($departmentData)) {
            foreach ($departmentData as $dept) {
                $tempArray = array(
                    'id' => $dept->id,
                    'title' => $dept->name,
                    'count' => !empty($staffFromDepartments[$dept->name]) ? $staffFromDepartments[$dept->name] : 0
                );
                array_push($departmentsStaffs, $tempArray);
            }
        }

        // Religion data
        $staffFromReligions = $this->staffRepository->getStaffFromReligions();
        $religionData = $this->religionRepository->getActiveNameAndId();
        $religionStaffs = array();
        if (!empty($religionData)) {
            foreach ($religionData as $religion) {
                $tempArray = array(
                    'id' => $religion->id,
                    'title' => $religion->name,
                    'count' => !empty($staffFromReligions[$religion->name]) ? $staffFromReligions[$religion->name] : 0
                );
                array_push($religionStaffs, $tempArray);
            }
        }

        // Caste data
        $casteData = $this->religionRepository->getActiveNameAndId();
        $staffFromCastes = $this->staffRepository->getStaffFromReligions();
        $castleStaffs = array();
        if (!empty($casteData)) {
            foreach ($casteData as $caste) {
                $tempArray = array(
                    'id' => $caste->id,
                    'title' => $caste->name,
                    'count' => !empty($staffFromCastes[$caste->name]) ? $staffFromCastes[$caste->name] : 0
                );
                array_push($castleStaffs, $tempArray);
            }
        }

        // job type data
        $jobTypes = JobType::cases();
        $staffFromJobTypes = $this->staffRepository->getStaffFromJobType();
        $jobTypeStaffs = array();
        if (!empty($jobTypes)) {
            foreach ($jobTypes as $jType) {
                $tempArray = array(
                    'id' => $jType->value,
                    'title' => $jType->value,
                    'count' => !empty($staffFromJobTypes[$jType->value]) ? $staffFromJobTypes[$jType->value] : 0
                );
                array_push($jobTypeStaffs, $tempArray);
            }
        }

        // designation data
        $designationData = $this->designationRepository->getActiveNameAndId();
        $staffFromDesignations = $this->staffRepository->getStaffFromDesignations();
        $designationStaffs = array();
        if (!empty($designationData)) {
            foreach ($designationData as $designation) {
                $tempArray = array(
                    'id' => $designation->id,
                    'title' => $designation->name,
                    'count' => !empty($staffFromDesignations[$designation->name]) ? $staffFromDesignations[$designation->name] : 0
                );
                array_push($designationStaffs, $tempArray);
            }
        }

        return Inertia::render('Staff/MisReport', [
            'staffs' => $staffs,
            'misCounts' => $misCounts,
            'departmentsStaffs' => $departmentsStaffs,
            'religionStaffs' => $religionStaffs,
            'castleStaffs' => $castleStaffs,
            'jobTypeStaffs' => $jobTypeStaffs,
            'designationStaffs' => $designationStaffs,
        ]);
    }

    /**
     * Display the staff form
     */
    public function create(Request $request): Response
    {
        // get user role
        $userRollType = StaffRoleType::cases();
        $userRolls = array_map(function ($rollType) {
            return ['id' => $rollType->value, 'title' => $rollType->value];
        }, $userRollType);

        // get gender
        $genderType = Gender::cases();
        $genders = array_map(function ($gType) {
            return ['id' => $gType->value, 'title' => $gType->value];
        }, $genderType);

        // get teaching
        $teachingType = TeachingType::cases();
        $teachingTypes = array_map(function ($tType) {
            return ['id' => $tType->value, 'title' => $tType->value];
        }, $teachingType);

        // get job type
        $jobType = JobType::cases();
        $jobTypes = array_map(function ($jType) {
            return ['id' => $jType->value, 'title' => $jType->value];
        }, $jobType);

        // data
        $stateData = $this->stateRepository->getActiveNameAndId();
        $housesData = $this->houseRepository->getActiveNameAndId();
        $categoryData = $this->categoryRepository->getActiveNameAndId();
        $empCatData = $this->categoryRepository->getEmploymentCategory();
        $staffCatData = $this->categoryRepository->getStaffCategory();
        $religionData = $this->religionRepository->getActiveNameAndId();
        $departmentData = $this->departmentRepository->getActiveNameAndId();
        $designationData = $this->designationRepository->getActiveNameAndId();
        $bloodGroupData = $this->bloodGroupRepository->getActiveNameAndId();

        $states = $stateData->map(fn($state) => ['id' => $state->id, 'title' => $state->name])->all();
        $houses = $housesData->map(fn($house) => ['id' => $house->id, 'title' => $house->name])->all();
        $categories = $categoryData->map(fn($category) => ['id' => $category->id, 'title' => $category->title])->all();
        $empCats = $empCatData->map(fn($emtCat) => ['id' => $emtCat->id, 'title' => $emtCat->title])->all();
        $staffCats = $staffCatData->map(fn($staffCat) => ['id' => $staffCat->id, 'title' => $staffCat->title])->all();
        $religions = $religionData->map(fn($religion) => ['id' => $religion->id, 'title' => $religion->name])->all();
        $departments = $departmentData->map(fn($department) => ['id' => $department->id, 'title' => $department->name])->all();
        $designations = $designationData->map(fn($designation) => ['id' => $designation->id, 'title' => $designation->name])->all();
        $bloodGroups = $bloodGroupData->map(fn($bloodGroup) => ['id' => $bloodGroup->id, 'title' => $bloodGroup->name])->all();

        // custom fields
        $customFields = $this->customFieldRepository->getCustomFieldsByType(StudentStaffFieldType::TEACHER->value);

        if (count($customFields) > 0) {
            $customFields = $customFields->map(function ($customField) {
                $listValues = [];

                if ($customField->data_type == CustomFieldDataType::LIST->value && !empty($customField)) {
                    $lists = explode(',', $customField->list_value);

                    foreach ($lists as $list) {
                        $listValues[] = ['id' => $list, 'title' => $list];
                    }
                }

                $customField['list_values'] = $listValues;

                return $customField;
            });
        }

        return Inertia::render('Staff/Create', [
            'userRolls' => $userRolls,
            'genders' => $genders,
            'teachingTypes' => $teachingTypes,
            'states' => $states,
            'houses' => $houses,
            'categories' => $categories,
            'empCats' => $empCats,
            'staffCats' => $staffCats,
            'religions' => $religions,
            'jobTypes' => $jobTypes,
            'departments' => $departments,
            'designations' => $designations,
            'bloodGroups' => $bloodGroups,
            'customFields' => $customFields
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(StaffRequest $request): RedirectResponse
    {
        $input = $request->validated();

        if (!empty($input['first_name'])) {

            if (!empty($input['email'])) {
                $inputEmail = $input['email'];
                $username = strtolower($input['first_name'])  . rand(1000, 9999);
            } else {
                $username = strtolower($input['first_name'])  . rand(1000, 9999);
                $inputEmail = $username . '@educarestudy.in';
            }

            $userArray = [
                'school_id' => getUserSchoolId(),
                'username' => $username,
                'first_name' => $input['first_name'],
                'middle_name' => $input['middle_name'] ?? null,
                'last_name' => $input['last_name'] ?? null,
                'phone' => $input['phone'] ?? null,
                'email' => $inputEmail,
                'role' => $input['user_roll_type'] ? $input['user_roll_type'] : StaffRoleType::TEACHER,
                'password' => Hash::make($input['phone']),
                'parent_pass' => $input['phone'],
                'status' => Status::ACTIVE
            ];
            $user = $this->staffRepository->createUser($userArray);
        }

        if (!empty($user['id'])) {

            // set staff role
            if (!empty($input['user_roll_type']) && $input['user_roll_type'] == 'Admin') {
                $roleId = 2;
                $permissions = array(
                    0 => "view permissions",
                    1 => "view school import",
                    2 => "add permissions",
                    3 => "add school import",
                    4 => "edit permissions",
                    5 => "edit school import",
                    6 => "delete permissions",
                    7 => "delete school import",
                    8 => "view staffs",
                    9 => "add staffs",
                    10 => "edit staffs",
                    11 => "delete staffs",
                    12 => "view student",
                    13 => "add student",
                    14 => "edit student",
                    15 => "delete student",
                    16 => "view schools",
                    17 => "add schools",
                    18 => "edit schools",
                    19 => "delete schools",
                    20 => "view classes",
                    21 => "add classes",
                    22 => "edit classes",
                    23 => "delete classes",
                );
            } else {
                $roleId = 13;
                $permissions = array();
            }

            $role = Role::find($roleId);

            if (!empty($role)) {
                $role->syncPermissions($permissions);
                // assign teacher role, here teacher role id: 13
                $user->assignRole($role->id);
            }

            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'user_id' => $user->id,
                'state_id' => intval($input['state_id']) ?? null,
                'house_id' => intval($input['house_id']) ?? null,
                'category_id' => intval($input['category_id']) ?? null,
                'academic_year_id' => getAcademicYearId() ?? null,
                'religion_id' => intval($input['religion_id']) ?? null,
                'department_id' => intval($input['department_id']) ?? null,
                'designation_id' => intval($input['designation_id']) ?? null,
                'blood_group_id' => intval($input['blood_group_id']) ?? null,
                'employee_id' => intval($input['employee_id']) ?? null,
                'employment_category_id' => intval($input['employment_category_id']) ?? null,
                'staff_category_id' => intval($input['staff_category_id']) ?? null,
                'staff_sub_category_id' => intval($input['staff_sub_category_id']) ?? null,
                'user_roll_type' => $input['user_roll_type'] ? $input['user_roll_type'] : StaffRoleType::TEACHER,
                'staff_type' => $input['staff_type'] ?? "",
                'first_name' => $input['first_name'] ?? "",
                'middle_name' => $input['middle_name'] ?? "",
                'last_name' => $input['last_name'] ?? "",
                'phone' => $input['phone'] ?? "",
                // 'email' => $inputEmail,
                'email' => $input['email'] ?? '',
                'father_name' => $input['father_name'] ?? "",
                'spouse_name' => $input['spouse_name'] ?? "",
                'gender' => $input['gender'] ?? "",
                'city' => $input['city'] ?? "",
                'join_date_at' => !empty($input['join_date_at']) ? \Carbon\Carbon::parse($input['join_date_at'])->format('Y-m-d') : date('Y-m-d'),
                'leave_date_at' => !empty($input['leave_date_at']) ? \Carbon\Carbon::parse($input['leave_date_at'])->format('Y-m-d') : date('Y-m-d'),
                'birth_date_at' => !empty($input['birth_date_at']) ? \Carbon\Carbon::parse($input['birth_date_at'])->format('Y-m-d') : date('Y-m-d'),
                'job_type' => $input['job_type'] ?? "",
                'pan_number' => $input['pan_number'] ?? "",
                'qualification' => $input['qualification'] ?? "",
                'voter_card_no' => $input['voter_card_no'] ?? "",
                'aadhar_card_no' => $input['aadhar_card_no'] ?? "",
                'oasis_id' => $input['oasis_id'] ?? null,
                'address' => $input['address'] ?? "",
                'description' => $input['description'] ?? "",
                'bank_name' => $input['bank_name'] ?? "",
                'bank_account_no' => $input['bank_account_no'] ?? "",
                'uan' => $input['uan'] ?? "",
                'ifsc' => $input['ifsc'] ?? "",
                'pf_account_number' => $input['pf_account_number'] ?? "",
                'experience_year' => $input['experience_year'] ?? "",
                'esic_no' => $input['esic_no'] ?? "",
                'status' => Status::ACTIVE,
            );
        }

        // create staff
        $staff = $this->staffRepository->create($dataArray);

        // sync staff to ledger
        if ($staff?->id != null && $input['user_roll_type'] == StaffRoleType::TEACHER->value) {
            $salaryIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_salary_integrated');
            $isSalaryIntegratedWithAccount = $salaryIntegratedWithAccountSetting?->value == 'Yes' ? true : false;

            if ($isSalaryIntegratedWithAccount) {
                $accountGroup = $this->accountGroupRepository->getDefaultAccountGroupByTitle('Sundry Creditors');

                $title = "{$staff?->first_name} {$staff?->middle_name} {$staff?->last_name}";

                $dataArray = [
                    'school_id' => getUserSchoolId(),
                    'account_group_id' => $accountGroup->id ?? null,
                    'staff_id' => $staff?->id,
                    'title' => $title,
                    'amount_type' => LedgerAmountType::DEBIT,
                    'is_system_default' => true,
                    'status' => Status::ACTIVE,
                ];

                $this->ledgerRepository->create($dataArray);
            }
        }

        // satff custom field
        if (!empty($input['custom_fields'])) {
            $this->createBulkStaffCustomField($staff->id, $input['custom_fields']);
        }

        if (!$staff) {
            return redirect()->route('staff.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('staff.list')->with('message', 'Staff created successfully.');
    }

    /*
    * create bulk staff custom field
    */
    protected function createBulkStaffCustomField(int $staffId, array $customFields)
    {
        $schoolId = getUserSchoolId();
        $dataArray = [];

        foreach ($customFields as $customField) {
            $dataArray[] = [
                'school_id' => $schoolId,
                'staff_id' => $staffId,
                'custom_field_id' => $customField['id'] ?? null,
                'value' => $customField['value'] ?? null,
                'status' => Status::ACTIVE,
                'created_at' => now(),
                'updated_at' => now()
            ];
        }

        $this->customFieldRepository->insertStaffCustomField($dataArray);
    }

    /**
     * display staff edit form
     */
    public function edit(Request $request)
    {
        $id = $request->input('id');
        if (empty($id) || $request->isMethod('get')) {
            return redirect()->route('staff.list');
        }
        // get user role
        $userRollType = StaffRoleType::cases();
        $userRolls = array_map(function ($rollType) {
            return ['id' => $rollType->value, 'title' => $rollType->value];
        }, $userRollType);

        // get gender
        $genderType = Gender::cases();
        $genders = array_map(function ($gType) {
            return ['id' => $gType->value, 'title' => $gType->value];
        }, $genderType);

        // get teaching
        $teachingType = TeachingType::cases();
        $teachingTypes = array_map(function ($tType) {
            return ['id' => $tType->value, 'title' => $tType->value];
        }, $teachingType);

        // get job type
        $jobType = JobType::cases();
        $jobTypes = array_map(function ($jType) {
            return ['id' => $jType->value, 'title' => $jType->value];
        }, $jobType);

        // data
        $stateData = $this->stateRepository->getActiveNameAndId();
        $housesData = $this->houseRepository->getActiveNameAndId();
        $categoryData = $this->categoryRepository->getActiveNameAndId();
        $empCatData = $this->categoryRepository->getEmploymentCategory();
        $staffCatData = $this->categoryRepository->getStaffCategory();
        $religionData = $this->religionRepository->getActiveNameAndId();
        $departmentData = $this->departmentRepository->getActiveNameAndId();
        $designationData = $this->designationRepository->getActiveNameAndId();
        $bloodGroupData = $this->bloodGroupRepository->getActiveNameAndId();

        $states = $stateData->map(fn($state) => ['id' => $state->id, 'title' => $state->name])->all();
        $houses = $housesData->map(fn($house) => ['id' => $house->id, 'title' => $house->name])->all();
        $categories = $categoryData->map(fn($category) => ['id' => $category->id, 'title' => $category->title])->all();
        $empCats = $empCatData->map(fn($emtCat) => ['id' => $emtCat->id, 'title' => $emtCat->title])->all();
        $staffCats = $staffCatData->map(fn($staffCat) => ['id' => $staffCat->id, 'title' => $staffCat->title])->all();
        $religions = $religionData->map(fn($religion) => ['id' => $religion->id, 'title' => $religion->name])->all();
        $departments = $departmentData->map(fn($department) => ['id' => $department->id, 'title' => $department->name])->all();
        $designations = $designationData->map(fn($designation) => ['id' => $designation->id, 'title' => $designation->name])->all();
        $bloodGroups = $bloodGroupData->map(fn($bloodGroup) => ['id' => $bloodGroup->id, 'title' => $bloodGroup->name])->all();

        $staff = $this->staffRepository->getObjById($id);

        // staff custom fields
        $staff?->loadMissing(['staffCustomFields']);

        $staffCustomFields = $staff->staffCustomFields;

        // custom fields
        $customFields = $this->customFieldRepository->getCustomFieldsByType(StudentStaffFieldType::TEACHER->value);

        if (count($customFields) > 0) {
            $customFields = $customFields->map(function ($customField) use ($staffCustomFields) {
                $value = '';

                foreach ($staffCustomFields as $staffCustomField) {
                    if ($staffCustomField?->custom_field_id == $customField?->id) {
                        $value = $staffCustomField->value ?? '';
                    }
                }

                $customField['value'] = $value;

                $listValues = [];

                if ($customField->data_type == CustomFieldDataType::LIST->value && !empty($customField)) {
                    $lists = explode(',', $customField->list_value);

                    foreach ($lists as $list) {
                        $listValues[] = ['id' => $list, 'title' => $list];
                    }
                }

                $customField['list_values'] = $listValues;

                return $customField;
            });
        }

        return Inertia::render('Staff/Edit', [
            'staff' => $staff,
            'userRolls' => $userRolls,
            'genders' => $genders,
            'teachingTypes' => $teachingTypes,
            'states' => $states,
            'houses' => $houses,
            'categories' => $categories,
            'empCats' => $empCats,
            'staffCats' => $staffCats,
            'religions' => $religions,
            'jobTypes' => $jobTypes,
            'departments' => $departments,
            'designations' => $designations,
            'bloodGroups' => $bloodGroups,
            'customFields' => $customFields,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(StaffRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();

        if (!empty($input['email'])) {
            $inputEmail = $input['email'];
            $username = strtolower($input['first_name'])  . rand(1000, 9999);
        } else {
            $username = strtolower($input['first_name'])  . rand(1000, 9999);
            $inputEmail = $username . '@educarestudy.in';
        }

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'state_id' => intval($input['state_id']) ?? null,
            'house_id' => intval($input['house_id']) ?? null,
            'category_id' => intval($input['category_id']) ?? null,
            'religion_id' => intval($input['religion_id']) ?? null,
            'department_id' => intval($input['department_id']) ?? null,
            'designation_id' => intval($input['designation_id']) ?? null,
            'blood_group_id' => intval($input['blood_group_id']) ?? null,
            'employee_id' => intval($input['employee_id']) ?? null,
            'employment_category_id' => intval($input['employment_category_id']) ?? null,
            'staff_category_id' => intval($input['staff_category_id']) ?? null,
            'staff_sub_category_id' => intval($input['staff_sub_category_id']) ?? null,
            'user_roll_type' => $input['user_roll_type'] ?? UserRole::SITE_TEACHER,
            'staff_type' => $input['staff_type'] ?? "",
            'first_name' => $input['first_name'] ?? "",
            'middle_name' => $input['middle_name'] ?? "",
            'last_name' => $input['last_name'] ?? "",
            'phone' => $input['phone'] ?? "",
            // 'email' => $inputEmail,
            'email' => $input['email'] ?? '',
            'father_name' => $input['father_name'] ?? "",
            'spouse_name' => $input['spouse_name'] ?? "",
            'gender' => $input['gender'] ?? "",
            'city' => $input['city'] ?? "",
            'join_date_at' => !empty($input['join_date_at']) ? \Carbon\Carbon::parse($input['join_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'leave_date_at' => !empty($input['leave_date_at']) ? \Carbon\Carbon::parse($input['leave_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'birth_date_at' => !empty($input['birth_date_at']) ? \Carbon\Carbon::parse($input['birth_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'job_type' => $input['job_type'] ?? "",
            'pan_number' => $input['pan_number'] ?? "",
            'qualification' => $input['qualification'] ?? "",
            'voter_card_no' => $input['voter_card_no'] ?? "",
            'aadhar_card_no' => $input['aadhar_card_no'] ?? "",
            'oasis_id' => $input['oasis_id'] ?? null,
            'address' => $input['address'] ?? "",
            'description' => $input['description'] ?? "",
            'bank_name' => $input['bank_name'] ?? "",
            'bank_account_no' => $input['bank_account_no'] ?? "",
            'uan' => $input['uan'] ?? "",
            'ifsc' => $input['ifsc'] ?? "",
            'pf_account_number' => $input['pf_account_number'] ?? "",
            'experience_year' => $input['experience_year'] ?? "",
            'esic_no' => $input['esic_no'] ?? "",
            'status' => Status::ACTIVE,
        );

        $staff = $this->staffRepository->update($id, $dataArray);
        $staffUser = User::find($input['user_id']);

        if (!empty($staffUser->id)) {
            $staffUserData = array(
                'first_name' => $input['first_name'] ?? "",
                'middle_name' => $input['middle_name'] ?? "",
                'last_name' => $input['last_name'] ?? "",
                'phone' => $input['phone'] ?? "",
                'email' => $inputEmail
            );
            User::whereId($input['user_id'])->update($staffUserData);
        }




        // set staff role
        if (!empty($input['user_roll_type']) && $input['user_roll_type'] == 'Admin') {
            $roleId = 2;
            $permissions = array(
                0 => "view permissions",
                1 => "view school import",
                2 => "add permissions",
                3 => "add school import",
                4 => "edit permissions",
                5 => "edit school import",
                6 => "delete permissions",
                7 => "delete school import",
                8 => "view staffs",
                9 => "add staffs",
                10 => "edit staffs",
                11 => "delete staffs",
                12 => "view student",
                13 => "add student",
                14 => "edit student",
                15 => "delete student",
                16 => "view schools",
                17 => "add schools",
                18 => "edit schools",
                19 => "delete schools",
                20 => "view classes",
                21 => "add classes",
                22 => "edit classes",
                23 => "delete classes",
            );
            // remove role
            if ($staffUser->hasRole('Teacher')) {
                $staffUser->removeRole('Teacher');
            }
        } else {
            $roleId = 13;
            $permissions = array();
            if ($staffUser->hasRole('Admin')) {
                $staffUser->removeRole('Admin');
            }
        }

        $role = Role::find($roleId);
        if (!empty($role)) {
            $role->syncPermissions($permissions);
            // assign teacher role, here teacher role id: 13
            $staffUser->assignRole($role->id);
        }

        // staff custom field
        if (!empty($input['custom_fields'])) {
            $this->updateOrCreateBulkStaffCustomField($id, $input['custom_fields']);
        }

        if (!$staff) {
            return redirect()->route('staff.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('staff.list')->with('message', 'Staff updated successfully.');
    }

    /*
    * update or create bulk staff custom field
    */
    protected function updateOrCreateBulkStaffCustomField(int $staffId, array $customFields)
    {
        $schoolId = getUserSchoolId();

        foreach ($customFields as $customField) {
            $atributesToCheck = [
                'school_id' => $schoolId,
                'staff_id' => $staffId,
                'custom_field_id' => $customField['id'] ?? null
            ];

            $valuesToUpdate = [
                'value' => $customField['value'] ?? null,
                'status' => Status::ACTIVE,
                'created_at' => now(),
                'updated_at' => now()
            ];

            $this->customFieldRepository->updateOrCreateStaffCustomField($atributesToCheck, $valuesToUpdate);
        }
    }

    /**
     * Display the inactive staff.
     */
    public function inactiveStaff(Request $request): Response
    {
        $orderText =  null;
        $staffDepartmentId = null;
        $staffDesignationId = null;
        $staffHouseId = null;
        $staffType = "";
        $staffJobType = "";
        $staffRoleType = "";
        $staffSearch = "";

        if ($request->isMethod('post')) {
            $orderText = $request->input('order_text') ?? null;
            $staffDepartmentId = $request->input('staff_department') ?? null;
            $staffDesignationId = $request->input('staff_designation') ?? null;
            $staffHouseId = $request->input('staff_house') ?? null;
            $staffType = $request->input('staff_type') ?? "";
            $staffJobType = $request->input('staff_job_type') ?? "";
            $staffRoleType = $request->input('staff_role_type') ?? "";
            $staffSearch = $request->input('staff_search') ?? "";
        }
        $inactiveStaffs = $this->staffRepository->getInactiveAll($orderText, $staffDepartmentId, $staffDesignationId, $staffHouseId, $staffType, $staffJobType, $staffRoleType, $staffSearch);

        // get user role
        $userRollType = StaffRoleType::cases();
        $userRolls = array_map(function ($rollType) {
            return ['id' => $rollType->value, 'title' => $rollType->value];
        }, $userRollType);

        // get teaching
        $teachingType = TeachingType::cases();
        $teachingTypes = array_map(function ($tType) {
            return ['id' => $tType->value, 'title' => $tType->value];
        }, $teachingType);

        // get job type
        $jobType = JobType::cases();
        $jobTypes = array_map(function ($jType) {
            return ['id' => $jType->value, 'title' => $jType->value];
        }, $jobType);

        // data
        $housesData = $this->houseRepository->getActiveNameAndId();
        $departmentData = $this->departmentRepository->getActiveNameAndId();
        $designationData = $this->designationRepository->getActiveNameAndId();

        $houses = $housesData->map(fn($house) => ['id' => $house->id, 'title' => $house->name])->all();
        $departments = $departmentData->map(fn($department) => ['id' => $department->id, 'title' => $department->name])->all();
        $designations = $designationData->map(fn($designation) => ['id' => $designation->id, 'title' => $designation->name])->all();

        return Inertia::render('Staff/ShowInactive', [
            'inactiveStaffs' => $inactiveStaffs,
            'designations' => $designations,
            'houses' => $houses,
            'jobTypes' => $jobTypes,
            'departments' => $departments,
            'teachingTypes' => $teachingTypes,
            'userRolls' => $userRolls,
        ]);
    }

    /**
     * staffInactive
     */
    public function staffInactive(int $id): RedirectResponse
    {
        $dataArray = array(
            'reason_data' => !empty($_POST) ? key($_POST) : Null,
            'inactive_date_at' => now(), //date('Y-m-d'),
            'status' => Status::INACTIVE,
        );
        $staff = $this->staffRepository->update($id, $dataArray);

        //make user inactive
        $staffDetails = $this->staffRepository->getById($id);
        $userDataArray = array(
            'is_inactive' => 1, //date('Y-m-d'),
            'status' => Status::INACTIVE,
        );
        $this->userRepository->update($staffDetails->user_id, $userDataArray);

        if (!empty(!$staff)) {
            return redirect()->route('staff.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('staff.list')->with('message', 'Staff inactive successfully.');
    }

    /**
     * staffMakeActive
     */
    public function staffMakeActive(int $id): RedirectResponse
    {
        $dataArray = array(
            'reason_data' => null,
            'inactive_date_at' => null,
            'status' => Status::ACTIVE,
        );
        $staff = $this->staffRepository->update($id, $dataArray);

        //make user inactive
        $staffDetails = $this->staffRepository->getById($id);
        $userDataArray = array(
            'is_inactive' => 0, //date('Y-m-d'),
            'status' => Status::ACTIVE,
        );
        $this->userRepository->update($staffDetails->user_id, $userDataArray);

        if (!empty(!$staff)) {
            return redirect()->route('staff.inactive_list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('staff.inactive_list')->with('message', 'Staff active successfully.');
    }

    public function updateProfileImage(Request $request)
    {
        if ($request->hasFile('image')) {
            try {
                $input = $request->validate([
                    'image' => ['image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
                ]);

                $staffId = $request->input('staff_id');
                $staffImage = $this->imageRepository->getMorphStaff($staffId);
                if (!empty($staffImage)) {
                    $image_url = $this->_upload->uploadImage($request, 'image', 'staff_image');
                    $dataImage = array(
                        'name' => 'image',
                        'path' => !empty($image_url) ? $image_url : NULL,
                        'status' => Status::ACTIVE,
                    );
                    $this->imageRepository->morphStaffImageUpdate($dataImage, $staffId);
                } else {
                    if (!empty($request->file('image'))) {
                        $image_url = $this->_upload->uploadImage($request, 'image', 'staff_profile_image');
                    } else {
                        $image_url = 'no image';
                    }
                    $dataImage = array(
                        'school_id' => getUserSchoolId(),
                        'imageable_type' => \App\Models\Staff::class,
                        'imageable_id' => $request->input('staff_id'),
                        'name' => 'image',
                        'path' => $image_url,
                        'status' => Status::ACTIVE,
                    );
                    $this->imageRepository->create($dataImage, $request->input('staff_id'));
                }
            } catch (Exception $e) {
                return redirect()->back()->with('error', 'Something goes wrong.');
            }
            return redirect()->back()->with('message', 'Profile image updated.');
        } else {
            return redirect()->back()->with('error', 'Please select image.');
        }
    }

    /**
     * update User name
     */
    public function updateUser(Request $request)
    {
        $userId = $request->input('user_id');
        try {
            $input = $request->validate([
                'new_user_name' => [
                    'required',
                    Rule::unique('users', 'username')->where(function ($query) {
                        return $query->where('school_id', getUserSchoolId());
                    })
                ],
            ]);

            $this->staffRepository->updateUser($userId, ['username' => $input['new_user_name']]);
            return redirect()->back()->with('message', 'Username updated successfully.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Something went wrong.');
        }
    }

    /**
     * Update user password
     */
    public function updatePassword(Request $request)
    {
        $newPass = $request->input('new_password');
        $confirmPassword = $request->input('confirm_password');
        if ($newPass === $confirmPassword) {
            $userId = $request->input('user_id');
            $this->staffRepository->updateUser($userId, ['password' => Hash::make($newPass), 'parent_pass' => $newPass]);
            return redirect()->back()->with('message', 'Password updated successfully.');
        } else {
            return redirect()->back()->with('error', 'New password and confirm password are not match.');
        }
    }

    /**
     * Display the staff details
     */
    public function details(Request $request): RedirectResponse|Response
    {
        $id = $request->input('id');
        if (empty($id)) {
            return redirect()->route('staff.list');
        }

        $staff = $this->staffRepository->getStaffDetailsData($id);
        $subjects = $this->subjectRepository->getActiveAll();


        return Inertia::render('Staff/StaffDetails', [
            'staff' => $staff,
            'subjects' => $subjects,
            'status' => session('status'),
        ]);
    }

    /**
     * delete staff
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            DB::beginTransaction();
            $this->staffRepository->delete($id);
            DB::commit();
            return redirect()->route('staff.list')->with('message', 'Staff deleted successfully.');
        } catch (Exception $e) {
            DB::rollback();
            return redirect()->route('staff.list')->with('error', 'Something goes wrong.');
        }
    }
}
