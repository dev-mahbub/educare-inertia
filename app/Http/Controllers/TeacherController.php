<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Gender;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\JobType;
use App\Enums\UserRole;
use App\Models\Teacher;
use App\Enums\TeachingType;
use Illuminate\Http\Request;
use App\Jobs\TeacherBirthdaySmsJob;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\TeacherRequest;
use App\Repositories\HouseRepository;
use App\Repositories\StateRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IHouseRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\IStateRepository;
use App\Repositories\TeacherRepository;
use App\Repositories\CategoryRepository;
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
use App\Jobs\TeacherBirthdayNotificationJob;
use App\Repositories\IDesignationRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\StudentBirthdayNotificationRequest;
use App\Http\Requests\TeacherBirthdayNotificationRequest;

class TeacherController extends Controller
{

    public function __construct(
        private ITeacherRepository $teacherRepository,
        private IStateRepository $stateRepository,
        private IHouseRepository $houseRepository,
        private ICategoryRepository $categoryRepository,
        private IStaffRepository $staffRepository,
        private IReligionRepository $religionRepository,
        private IDepartmentRepository $departmentRepository,
        private IDesignationRepository $designationRepository,
        private IBloodGroupRepository $bloodGroupRepository
    ) {
        $this->middleware('permission:view staffs', ['only' => ['index', 'birthdayList']]);
        $this->middleware('permission:add staffs', ['only' => ['create', 'save']]);
        $this->middleware('permission:edit staffs', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete staffs', ['only' => ['destroy']]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $teachers = $this->teacherRepository->getActiveAll();

        return Inertia::render('Teacher/Show', [
            'teachers' => $teachers,
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {

        // get user role
        $userRollType = UserRole::cases();
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

        $states = $stateData->map(fn ($state) => ['id' => $state->id, 'title' => $state->name])->all();
        $houses = $housesData->map(fn ($house) => ['id' => $house->id, 'title' => $house->name])->all();
        $categories = $categoryData->map(fn ($category) => ['id' => $category->id, 'title' => $category->title])->all();
        $empCats = $empCatData->map(fn ($emtCat) => ['id' => $emtCat->id, 'title' => $emtCat->title])->all();
        $staffCats = $staffCatData->map(fn ($staffCat) => ['id' => $staffCat->id, 'title' => $staffCat->title])->all();
        $religions = $religionData->map(fn ($religion) => ['id' => $religion->id, 'title' => $religion->name])->all();
        $departments = $departmentData->map(fn ($department) => ['id' => $department->id, 'title' => $department->name])->all();
        $designations = $designationData->map(fn ($designation) => ['id' => $designation->id, 'title' => $designation->name])->all();
        $bloodGroups = $bloodGroupData->map(fn ($bloodGroup) => ['id' => $bloodGroup->id, 'title' => $bloodGroup->name])->all();

        return Inertia::render('Teacher/Create', [
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
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(TeacherRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'user_id' => null,
            'state_id' => intval($input['state_id']) ?? null,
            'house_id' => intval($input['house_id']) ?? null,
            'category_id' => intval($input['category_id']) ?? null,
            'religion_id' => intval($input['religion_id']) ?? null,
            'department_id' => intval($input['department_id']) ?? null,
            'designation_id' => intval($input['designation_id']) ?? null,
            'blood_group_id' => intval($input['blood_group_id']) ?? null,
            'employee_id' => intval($input['employee_id']) ?? null,
            'employment_category_id' => intval($input['employment_category_id']) ?? null,
            'teacher_category_id' => intval($input['teacher_category_id']) ?? null,
            'teacher_sub_category_id' => intval($input['teacher_sub_category_id']) ?? null,
            'user_roll_type' => $input['user_roll_type'] ?? UserRole::SITE_TEACHER,
            'teacher_type' => $input['teacher_type'] ?? null,
            'first_name' => $input['first_name'] ?? null,
            'middle_name' => $input['middle_name'] ?? null,
            'last_name' => $input['last_name'] ?? null,
            'phone' => $input['phone'] ?? null,
            'email' => $input['email'] ?? null,
            'father_name' => $input['father_name'] ?? null,
            'spouse_name' => $input['spouse_name'] ?? null,
            'gender' => $input['gender'] ?? null,
            'city' => $input['city'] ?? null,
            'join_date_at' => !empty($input['join_date_at']) ? \Carbon\Carbon::parse($input['join_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'leave_date_at' => !empty($input['leave_date_at']) ? \Carbon\Carbon::parse($input['leave_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'birth_date_at' => !empty($input['birth_date_at']) ? \Carbon\Carbon::parse($input['birth_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'job_type' => $input['job_type'] ?? null,
            'pan_number' => $input['pan_number'] ?? null,
            'qualification' => $input['qualification'] ?? null,
            'voter_card_no' => $input['voter_card_no'] ?? null,
            'aadhar_card_no' => $input['aadhar_card_no'] ?? null,
            'oasis_id' => $input['oasis_id'] ?? null,
            'address' => $input['address'] ?? null,
            'description' => $input['description'] ?? null,
            'bank_name' => $input['bank_name'] ?? null,
            'bank_account_no' => $input['bank_account_no'] ?? null,
            'uan' => $input['uan'] ?? null,
            'ifsc' => $input['ifsc'] ?? null,
            'pf_account_number' => $input['pf_account_number'] ?? null,
            'experience_year' => $input['experience_year'] ?? null,
            'esic_no' => $input['esic_no'] ?? null,
            'status' => Status::ACTIVE,
        );

        $teacher = $this->teacherRepository->create($dataArray);
        if (!$teacher) {
            return redirect()->route('teacher.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('teacher.list')->with('message', 'Teacher created successfully.');
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request, int $id): Response
    {


        // get user role
        $userRollType = UserRole::cases();
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

        $states = $stateData->map(fn ($state) => ['id' => $state->id, 'title' => $state->name])->all();
        $houses = $housesData->map(fn ($house) => ['id' => $house->id, 'title' => $house->name])->all();
        $categories = $categoryData->map(fn ($category) => ['id' => $category->id, 'title' => $category->title])->all();
        $empCats = $empCatData->map(fn ($emtCat) => ['id' => $emtCat->id, 'title' => $emtCat->title])->all();
        $staffCats = $staffCatData->map(fn ($staffCat) => ['id' => $staffCat->id, 'title' => $staffCat->title])->all();
        $religions = $religionData->map(fn ($religion) => ['id' => $religion->id, 'title' => $religion->name])->all();
        $departments = $departmentData->map(fn ($department) => ['id' => $department->id, 'title' => $department->name])->all();
        $designations = $designationData->map(fn ($designation) => ['id' => $designation->id, 'title' => $designation->name])->all();
        $bloodGroups = $bloodGroupData->map(fn ($bloodGroup) => ['id' => $bloodGroup->id, 'title' => $bloodGroup->name])->all();


        $teacher = $this->teacherRepository->getById($id);
        return Inertia::render('Teacher/Edit', [
            'teacher' => $teacher,
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
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(TeacherRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'state_id' => intval($input['state_id']) ?? null,
            'house_id' => intval($input['house_id']) ?? null,
            'category_id' => intval($input['category_id']) ?? null,
            'religion_id' => intval($input['religion_id']) ?? null,
            'department_id' => intval($input['department_id']) ?? null,
            'designation_id' => intval($input['designation_id']) ?? null,
            'blood_group_id' => intval($input['blood_group_id']) ?? null,
            'employee_id' => intval($input['employee_id']) ?? null,
            'employment_category_id' => intval($input['employment_category_id']) ?? null,
            'teacher_category_id' => intval($input['teacher_category_id']) ?? null,
            'teacher_sub_category_id' => intval($input['teacher_sub_category_id']) ?? null,
            'user_roll_type' => $input['user_roll_type'] ?? UserRole::SITE_TEACHER,
            'teacher_type' => $input['teacher_type'] ?? null,
            'first_name' => $input['first_name'] ?? null,
            'middle_name' => $input['middle_name'] ?? null,
            'last_name' => $input['last_name'] ?? null,
            'phone' => $input['phone'] ?? null,
            'email' => $input['email'] ?? null,
            'father_name' => $input['father_name'] ?? null,
            'spouse_name' => $input['spouse_name'] ?? null,
            'gender' => $input['gender'] ?? null,
            'city' => $input['city'] ?? null,
            'join_date_at' => !empty($input['join_date_at']) ? \Carbon\Carbon::parse($input['join_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'leave_date_at' => !empty($input['leave_date_at']) ? \Carbon\Carbon::parse($input['leave_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'birth_date_at' => !empty($input['birth_date_at']) ? \Carbon\Carbon::parse($input['birth_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'job_type' => $input['job_type'] ?? null,
            'pan_number' => $input['pan_number'] ?? null,
            'qualification' => $input['qualification'] ?? null,
            'voter_card_no' => $input['voter_card_no'] ?? null,
            'aadhar_card_no' => $input['aadhar_card_no'] ?? null,
            'oasis_id' => $input['oasis_id'] ?? null,
            'address' => $input['address'] ?? null,
            'description' => $input['description'] ?? null,
            'bank_name' => $input['bank_name'] ?? null,
            'bank_account_no' => $input['bank_account_no'] ?? null,
            'uan' => $input['uan'] ?? null,
            'ifsc' => $input['ifsc'] ?? null,
            'pf_account_number' => $input['pf_account_number'] ?? null,
            'experience_year' => $input['experience_year'] ?? null,
            'esic_no' => $input['esic_no'] ?? null,
            'status' => Status::ACTIVE,
        );

        $teacher = $this->teacherRepository->update($id, $dataArray);
        if (!$teacher) {
            return redirect()->route('teacher.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('teacher.list')->with('message', 'Teacher updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(int $id): RedirectResponse
    {
        // $this->sectionRepository->deleteFromClassId($id);
        $teacher = $this->teacherRepository->delete($id);
        if (!$teacher) {
            return redirect()->route('teacher.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('teacher.list')->with('message', 'Teacher deleted successfully.');
    }

    /**
     * Display Teacher Birthday Lists.
     */
    public function birthdayList(Request $request): Response
    {
        $teachers = [];

        if ($request->isMethod('POST')) {
            $birthDate =  !empty($request->birth_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('birth_date'))->timezone(getSchoolTimeZone())->toDateString() : "";
            $teachers = $this->teacherRepository->getBirthDateWiseTeachers($birthDate);
            
            if (count($teachers) > 0) {
                $teachers =  $teachers->map(function ($teacher) {
                    $teacherName = $teacher?->first_name . " " . $teacher?->middle_name . " " . $teacher?->last_name;
                    $birthDate = !empty($teacher->birth_date_at) ? Carbon::parse($teacher->birth_date_at)->format('d-M') : "";

                    return [
                        'id' => $teacher->id,
                        'name' => $teacherName,
                        'birth_date' => $birthDate,
                        'phone' => $teacher?->phone,
                    ];
                });
            }
        }

        return Inertia::render('Teacher/BirthdayList', [
            'teachers' => $teachers,
        ]);
    }

    
    //Teacher Birthday Notification
    public function teacherBirthdayNotification(TeacherBirthdayNotificationRequest $request)
    {
        $input = $request->validated();
        $message = $input['message'];
        $teachers = $input['teacherIds'] ?? [];
        $teachersMail = [];

        if(!empty($teachers)) {
            $teachersUserEmails = $this->staffRepository->getTeachersByIds($teachers)->map(function($teacher) {
                return $teacher?->email;
            });
            
            $teachersMail = array_unique(array_merge($teachersMail, $teachersUserEmails->toArray()));
            
            dispatch(new TeacherBirthdayNotificationJob($teachersMail, $message));
        }

        return redirect()->back()->with('message', 'Birthday Notification Send Successfully');
    }

    //Teacher Birthday Sms
    public function teacherBirthdaySms(TeacherBirthdayNotificationRequest $request)
    {
        $input = $request->validated();
        $message = $input['message'];
        $teachers = $input['teacherIds'] ?? [];
        $teachersSmsPhone = [];

        if(!empty($students)) {
            $teachersUserEmails = $this->staffRepository->getTeachersByIds($teachers)->map(function($teacher) {
                return $teacher?->email;
            });
            
            $teachersSmsPhone = array_unique(array_merge($teachersSmsPhone, $teachersUserEmails->toArray()));
            
            dispatch(new TeacherBirthdaySmsJob($teachersSmsPhone, $message));
        }

        return redirect()->back()->with('message', 'Birthday SMS Send Successfully');
    }
}
