<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\Gender;
use App\Enums\JobType;
use App\Enums\LedgerAmountType;
use App\Enums\StaffRoleType;
use App\Enums\Status;
use App\Enums\TeachingType;
use App\Http\Controllers\Api\ControllerApi;
use App\Repositories\IAccountGroupRepository;
use App\Repositories\IBloodGroupRepository;
use App\Repositories\ICategoryRepository;
use App\Repositories\IClassroomSubjectRepository;
use App\Repositories\ICustomFieldRepository;
use App\Repositories\IDepartmentRepository;
use App\Repositories\IDesignationRepository;
use App\Repositories\IHouseRepository;
use App\Repositories\ILedgerRepository;
use App\Repositories\ImageRepository;
use App\Repositories\IReligionRepository;
use App\Repositories\ISiteSettingRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\IStateRepository;
use App\Repositories\ISubjectRepository;
use App\Repositories\ITeacherRepository;
use App\Repositories\IUserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class StaffApiController extends ControllerApi
{
    public function __construct(
        private IStaffRepository $staffRepository,
        private IClassroomSubjectRepository $classroomSubjectRepository,
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
    ) {
        //
    }

    /**
     * @OA\Get(
     *    path="/staffs/teachers",
     *    operationId="teacherStaff",
     *    tags={"Staff"},
     *    summary="All Active Teachers",
     *    description="All Active Teachers",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function teacherStaff(Request $request)
    {
        // classroom_subjects need work
        if ( !empty($request->schoolId) ) { 
            $staffs = $this->staffRepository->getActiveTeacherNameId($request->schoolId);
            return response()->json([
                'success' => true,
                'data' => $staffs,
            ], 200);

        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => []
            ], 200);
        }
    }

    
    /**
     * @OA\Get(
     *    path="/staffs/all",
     *    operationId="indexStaff",
     *    tags={"Staff"},
     *    summary="All Active Staff",
     *    description="All Active Staff",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function indexStaff(Request $request)
    {
        // classroom_subjects need work
        if ( !empty($request->schoolId) ) { 

            $staffs = $this->staffRepository->getActiveStaffsApi($request->schoolId);
            $staffsAll = $staffs->map( function ($staff) {
                if($staff->staffProfileImageRaw == null) {
                    $path = ['path' => '', 'id' => 0];
                }
                else {
                    $path = ['path' => $staff?->staffProfileImageRaw?->path, 'id' => $staff?->staffProfileImageRaw?->imageable_id];
                }
                $staff->makeHidden(['staffProfileImageRaw']);
                $staff['name'] = getCocatenationTitle($staff?->first_name, $staff?->middle_name,  $staff?->last_name);
                $staff['staff_profile_image_raw'] = $path;
                
                return $staff;
            });

            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $teacherIds = [];

            if( !empty($request->classroomId) ) {
                $teachers = $this->classroomSubjectRepository->getClassroomSubjectsByClassroomId($request->classroomId, $request->schoolId, $academicYearId);
                if( !empty($teachers) ) {
                    foreach($teachers as $teacher) {
                        $teacherId = !empty($teacher->teachers_data) ? json_decode($teacher->teachers_data)[0]->teacher_id : '';
                        if( !empty($teacherId) )
                            array_push($teacherIds, $teacherId);
                    }
                }

                $staffsAll = $staffs->map( function ($staff) use($teacherIds) {
                    if( in_array($staff->id, $teacherIds) ) {
                        if($staff->staffProfileImageRaw == null) {
                            $path = ['path' => '', 'id' => 0];
                        }
                        else {
                            $path = ['path' => $staff?->staffProfileImageRaw?->path, 'id' => $staff?->staffProfileImageRaw?->imageable_id];
                        }
                        $staff->makeHidden(['staffProfileImageRaw']);
                        $staff['name'] = getCocatenationTitle($staff?->first_name, $staff?->middle_name,  $staff?->last_name);
                        $staff['staff_profile_image_raw'] = $path;
                        
                        return $staff;
                    } 
  
                });

             //   dd($staffsAll);

                $staffData = $staffsAll;
            }
            else {
                $staffData = $staffsAll;
            }
      
            return response()->json([
                'success' => true,
                'data' => $staffData,
            ], 200);

        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => []
            ], 200);
        }
    }

    /**
     * @OA\Post(
     * path="/staffs/save",
     * summary="Save staffs",
     * description="Save Leave",
     * operationId="saveStaff",
     * tags={"Staff"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Save staff",
     *    @OA\JsonContent(
     *       required={"schoolId", "userId", "title","leaveType","startDateAt","endDateAt"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="userId", type="interger", example="1"),
     *       @OA\Property(property="title", type="string", example=""),
     *       @OA\Property(property="leaveType", type="string", example=""),
     *       @OA\Property(property="startDateAt", type="string", example=""),
     *       @OA\Property(property="endDateAt", type="string", example=""),
     *       @OA\Property(property="description", type="string", example=""),
     *       @OA\Property(property="isApproved", type="integer", example="0"),
     *    ),
     * ),
     * @OA\Response(
     *    response=422,
     *    description="Error response",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, Can't Create")
     *        )
     *     )
     * )
     */
    public function saveStaff(Request $request)
    {
        if (!empty($request->first_name) && !empty($request->schoolId)) {
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            if (!empty($request->email)) {
                $inputEmail = $request->email;
                $username = strtolower($request->first_name)  . rand(1000, 9999);
            } else {
                $username = strtolower($request->first_name)  . rand(1000, 9999);
                $inputEmail = $username . '@educarestudy.in';
            }

            $userArray = [
                'school_id' => $request->schoolId,
                'username' => $username,
                'first_name' => $request->first_name,
                'middle_name' => $request->middle_name ?? null,
                'last_name' => $request->last_name ?? null,
                'phone' => $request->phone ?? null,
                'email' => $inputEmail,
                'role' => $request->user_roll_type ? $request->user_roll_type : StaffRoleType::TEACHER,
                'password' => Hash::make($request->phone),
                'parent_pass' => $request->phone,
                'status' => Status::ACTIVE->value
            ];
            $user = $this->staffRepository->createUser($userArray);
        
    
            if (!empty($user['id'])) {
    
                // set staff role
                if (!empty($request->user_roll_type) && $request->user_roll_type == 'Admin') {
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
                    'school_id' => $request->schoolId,
                    'user_id' => $user->id,
                    'state_id' => intval($request->state_id) ?? null,
                    'house_id' => intval($request->house_id) ?? null,
                    'category_id' => intval($request->category_id) ?? null,
                    'academic_year_id' => $academicYearId ?? null,
                    'religion_id' => intval($request->religion_id) ?? null,
                    'department_id' => intval($request->department_id) ?? null,
                    'designation_id' => intval($request->designation_id) ?? null,
                    'blood_group_id' => intval($request->blood_group_id) ?? null,
                    'employee_id' => intval($request->employee_id) ?? null,
                    'employment_category_id' => intval($request->employment_category_id) ?? null,
                    'staff_category_id' => intval($request->staff_category_id) ?? null,
                    'staff_sub_category_id' => intval($request->staff_sub_category_id) ?? null,
                    'user_roll_type' => $request->user_roll_type ? $request->user_roll_type : StaffRoleType::TEACHER,
                    'staff_type' => $request->staff_type ?? "",
                    'first_name' => $request->first_name ?? "",
                    'middle_name' => $request->middle_name ?? "",
                    'last_name' => $request->last_name ?? "",
                    'phone' => $request->phone ?? "",
                    'email' => $inputEmail,
                    'father_name' => $request->father_name ?? "",
                    'spouse_name' => $request->spouse_name ?? "",
                    'gender' => $request->gender ?? "",
                    'city' => $request->city ?? "",
                    'join_date_at' => !empty($request->join_date_at) ? \Carbon\Carbon::parse($request->join_date_at)->format('Y-m-d') : date('Y-m-d'),
                    'leave_date_at' => !empty($request->leave_date_at) ? \Carbon\Carbon::parse($request->leave_date_at)->format('Y-m-d') : date('Y-m-d'),
                    'birth_date_at' => !empty($request->birth_date_at) ? \Carbon\Carbon::parse($request->birth_date_at)->format('Y-m-d') : date('Y-m-d'),
                    'job_type' => $request->job_type ?? "",
                    'pan_number' => $request->pan_number ?? "",
                    'qualification' => $request->qualification ?? "",
                    'voter_card_no' => $request->voter_card_no ?? "",
                    'aadhar_card_no' => $request->aadhar_card_no ?? "",
                    'oasis_id' => $request->oasis_id ?? null,
                    'address' => $request->address ?? "",
                    'description' => $request->description ?? "",
                    'bank_name' => $request->bank_name ?? "",
                    'bank_account_no' => $request->bank_account_no ?? "",
                    'uan' => $request->uan ?? "",
                    'ifsc' => $request->ifsc ?? "",
                    'pf_account_number' => $request->pf_account_number ?? "",
                    'experience_year' => $request->experience_year ?? "",
                    'esic_no' => $request->esic_no ?? "",
                    'status' => Status::ACTIVE,
                );

                // create staff
                $staff = $this->staffRepository->create($dataArray);
            }
    
            
    
            // sync staff to ledger
            if ($staff?->id != null && $request->user_roll_type == StaffRoleType::TEACHER->value) {
                $salaryIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_salary_integrated', $request->schoolId, $academicYearId);
                $isSalaryIntegratedWithAccount = $salaryIntegratedWithAccountSetting?->value == 'Yes' ? true : false;
    
                if ($isSalaryIntegratedWithAccount) {
                    $accountGroup = $this->accountGroupRepository->getDefaultAccountGroupByTitle('Sundry Creditors', $request->schoolId);
    
                    $title = "{$staff?->first_name} {$staff?->middle_name} {$staff?->last_name}";
    
                    $dataArray = [
                        'school_id' => $request->schoolId,
                        'account_group_id' => $accountGroup?->id ?? null,
                        'staff_id' => $staff?->id,
                        'title' => $title,
                        'amount_type' => LedgerAmountType::DEBIT,
                        'is_system_default' => true,
                        'status' => Status::ACTIVE,
                    ];
    
                    $this->ledgerRepository->create($dataArray);
                }
            }
    
            return response()->json([
                'success' => true,
                'message' => 'created successfully',
                'data' => $staff
            ], 200);
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => null
            ], 200);
        }
    }


     /**
     * @OA\Get(
     *    path="/staffs/forms/selects",
     *    operationId="staffFormData",
     *    tags={"Staff"},
     *    summary="All form Staff",
     *    description="All form Staff",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function staffFormData(Request $request)
    {
        // classroom_subjects need work
        if ( !empty($request->schoolId) ) { 
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
            $housesData = $this->houseRepository->getActiveNameAndId($request->schoolId);
            $categoryData = $this->categoryRepository->getActiveNameAndId($request->schoolId);
            $empCatData = $this->categoryRepository->getEmploymentCategory($request->schoolId);
            $staffCatData = $this->categoryRepository->getStaffCategory($request->schoolId);
            $religionData = $this->religionRepository->getActiveNameAndId($request->schoolId);
            $departmentData = $this->departmentRepository->getActiveNameAndId($request->schoolId);
            $designationData = $this->designationRepository->getActiveNameAndId($request->schoolId);
            $bloodGroupData = $this->bloodGroupRepository->getActiveNameAndId($request->schoolId);

            $states = $stateData->map(fn($state) => ['id' => $state->id, 'title' => $state->name])->all();
            $houses = $housesData->map(fn($house) => ['id' => $house->id, 'title' => $house->name])->all();
            $categories = $categoryData->map(fn($category) => ['id' => $category->id, 'title' => $category->title])->all();
            $empCats = $empCatData->map(fn($emtCat) => ['id' => $emtCat->id, 'title' => $emtCat->title])->all();
            $staffCats = $staffCatData->map(fn($staffCat) => ['id' => $staffCat->id, 'title' => $staffCat->title])->all();
            $religions = $religionData->map(fn($religion) => ['id' => $religion->id, 'title' => $religion->name])->all();
            $departments = $departmentData->map(fn($department) => ['id' => $department->id, 'title' => $department->name])->all();
            $designations = $designationData->map(fn($designation) => ['id' => $designation->id, 'title' => $designation->name])->all();
            $bloodGroups = $bloodGroupData->map(fn($bloodGroup) => ['id' => $bloodGroup->id, 'title' => $bloodGroup->name])->all();

            return response()->json([
                'success' => true,
                'data' => [
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
                    'bloodGroups' => $bloodGroups
                ],
            ], 200);

        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => []
            ], 200);
        }
    }
}