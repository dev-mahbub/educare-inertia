<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\UserRole;
use App\Enums\Status;
use App\Enums\AbsenceReasonEnum;
use App\Enums\FreezeMarkStatus;
use App\Http\Controllers\Api\ControllerApi;
use Illuminate\Support\Str;
use App\Models\SchoolSetting;
use App\Repositories\IAcademicRepository;
use App\Repositories\IAdmissionRepository;
use App\Repositories\IBankAccountRepository;
use App\Repositories\IBankRepository;
use App\Repositories\IBloodGroupRepository;
use App\Repositories\ICategoryRepository;
use App\Repositories\IClassFeeStudentAmountRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IClassroomSubjectRepository;
use App\Repositories\ICountryRepository;
use App\Repositories\IExamRepository;
use App\Repositories\IExamRoasterRepository;
use App\Repositories\IFeeStructureRepository;
use App\Repositories\IGuardianRepository;
use App\Repositories\IHouseRepository;
use App\Repositories\IImageRepository;
use App\Repositories\IReligionRepository;
use App\Repositories\ISiteSettingRepository;
use App\Repositories\IStateRepository;
use App\Repositories\IStudentHouseRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\ISubjectRepository;
use App\Repositories\IUserRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StudentApiController extends ControllerApi
{
    private $_upload;
    public function __construct(
        private IStudentRepository $studentRepository,
        private IExamRoasterRepository $examRoasterRepository,
        private IAcademicRepository $academicRepository,
        private IExamRepository $examRepository,
        private ISubjectRepository $subjectRepository,
        private IClassroomRepository $classroomRepository,
        private IClassroomSubjectRepository $classroomSubjectRepository,
        private ICategoryRepository $categoryRepository,
        private IBankAccountRepository $bankAccountRepository,
        private IStudentHouseRepository $studentHouseRepository,
        private IGuardianRepository $guardianRepository,
        private IImageRepository $imageRepository,
        private IUserRepository $userRepository,
        private IFeeStructureRepository $feeStructureRepository,
        private IHouseRepository $houseRepository,
        private IAdmissionRepository $admissionRepository,
        private IBloodGroupRepository $bloodGroupRepository,
        private IReligionRepository $religionRepository,
        private ICountryRepository $countryRepository,
        private IBankRepository $bankRepository,
        private IStateRepository $stateRepository,
        private IClassFeeStudentAmountRepository $classFeeStudentAmountRepository,
    ) {
        $this->_upload = new \App\Http\Controllers\UploadFileController();
    }
    
    /**
     * @OA\Get(
     *    path="/students/all",
     *    operationId="indexStudent",
     *    tags={"Student"},
     *    summary="All Active Classroom Student",
     *    description="All Active Classroom Student",
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
    public function indexStudent(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->classroomId) ) { 
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $students = $this->studentRepository->getAllByClassroomId($request->classroomId, $request->schoolId, $setting?->academic_year_id);

            return response()->json([
                'success' => true,
                'data' => $students,
                'dataCount' => count($students)
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
     *    path="/students/show/{id}",
     *    operationId="showStudent",
     *    tags={"Student"},
     *    summary="Show Student Details",
     *    description="Show Student Details",
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
    public function showStudent(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) { 
            $student = $this->studentRepository->getStudentDetailsData($id, $request->schoolId);
            return response()->json([
                'success' => true,
                'data' => $student,
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
     *    path="/students/next/adn-no",
     *    operationId="getNextAdnNo",
     *    tags={"Student"},
     *    summary="Get Adn No",
     *    description="Get Adn No",
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
    public function getNextAdnNo(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $admissionNo = $this->studentRepository->getNextAdmissionNo($request->schoolId);
            return response()->json([
                'success' => true,
                'data' => $admissionNo,
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
     *    path="/students/classroom-subject-exam",
     *    operationId="studentsByClassroomStudentExamId",
     *    tags={"Student"},
     *    summary="All Active Students from Classroom, Subject, Exam ID",
     *    description="All Active Students from Classroom, Subject, Exam ID",
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
    public function studentsByClassroomStudentExamId(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->classroomId) ) { 
            $classWiseData = [];
            $fullMinMark = [];
            $apsenceReson = [];
            $grade = [];
            $is_co_scholastic = false;
            $isMarkFreezed = false;

            $classroom_id = $request->classroomId ?? null;
            $subject_id = $request->subjectId ?? null;
            $exam_id = $request->examId ?? null;
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);

            $classWiseData = $this->studentRepository->getClassWiseStudent($classroom_id, $subject_id, $exam_id, $request->schoolId, $academicYearId);

            if (count($classWiseData) > 0) {
                $classWiseData->each(function ($markData) use (&$isMarkFreezed) {
                    if ($markData?->mark?->status == FreezeMarkStatus::FREEZE->value) {
                        $isMarkFreezed = true;
                        return;
                    }
                });
            }

            $fullMinMark = $this->examRoasterRepository->apiFullMinMarkBySubjectId($subject_id, $classroom_id, $exam_id, $request->schoolId, $academicYearId);
        
            $subject = null;
            if (!empty($subject_id)) {
                $subject = $this->subjectRepository->getSubjectById($subject_id, $request->schoolId);
            }

            if ($fullMinMark?->classroom_subject?->subject?->is_co_scholastic === 'Yes' || $subject?->is_co_scholastic === 'Yes') {
                $is_co_scholastic = true;
                $grade = $this->academicRepository->getGradeOne($subject_id, $classroom_id, $request->schoolId, $academicYearId);
            }

            foreach (AbsenceReasonEnum::cases() as $asbsence) {
                array_push($apsenceReson, ['id' => $asbsence->value, 'title' => $asbsence->value]);
            }

            $classrooms = $this->classroomRepository->getActiveAll($request->schoolId, $academicYearId);
            $subjects   = $this->classroomSubjectRepository->getClassroomSubjectIdTitle($request->schoolId, $academicYearId)->map(function ($subject) {
                return [
                    'id' => $subject->subject_id,
                    'title' => $subject->title,
                    'classroom_id' => $subject->classroom_id
                ];
            });

            $exams = $this->examRepository->getExamtitle($request->schoolId, $academicYearId)?->filter(function ($exam) {
                return $exam?->is_registration != true;
            });

            return response()->json([
                'success' => true,
                'data' => array(
                    'classrooms' => $classrooms,
                    'subjects' => $subjects,
                    'exams' => $exams,
                    'classWiseData' => $classWiseData,
                    'apsenceReson' => $apsenceReson,
                    'fullMinMark' => $fullMinMark,
                    'grade' => $grade,
                    'is_co_scholastic' => $is_co_scholastic,
                    'isMarkFreezed' => $isMarkFreezed
                ),
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
     *    path="/students/ranks",
     *    operationId="studentsRankByClassroomExamId",
     *    tags={"Student"},
     *    summary="All Students Rank from Classroom, Exam ID",
     *    description="All Students Rank from Classroom, Exam ID",
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
    public function studentsRankByClassroomExamId(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->classroomId) ) { 
            $classroom_id = $request->classroomId ?? null;
            $subject_id = $request->subjectId ?? null;
            $exam_id = $request->examId ?? null;
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $schoolId = $request->schoolId;
            $academicYearId = $setting?->academic_year_id;
            $students = $this->studentRepository->getClassWiseStudent($classroom_id, $subject_id, $exam_id, $request->schoolId, $setting?->academic_year_id);
            $students->loadMissing(['academicRankRaw' => function ($query) use ($schoolId, $academicYearId) {
                $query->where('school_id', $schoolId)
                ->where('academic_year_id', $academicYearId);
            }]);
         
            $subject = null;
            if (!empty($subject_id)) {
                $subject = $this->subjectRepository->getSubjectById($subject_id, $request->schoolId);
            }

            return response()->json([
                'success' => true,
                'data' => $students,
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
     *    path="/students/create",
     *    operationId="createStudent",
     *    tags={"Student"},
     *    summary="Create Student Data",
     *    description="Create Student Data",
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
    public function createStudent(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $setting = SchoolSetting::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->first();

            $isFeeStructureWithTemplate = getSiteSettingData('fee_is_structure_with_template', $request->schoolId, $setting?->academic_year_id)?->value ?? "No";
            $feeStructures = [];

            if ($isFeeStructureWithTemplate === "Yes") {
                $feeStructures = $this->feeStructureRepository->getActiveAll($request->schoolId, $setting?->academic_year_id);
                $feeStructures->load(['classNames']);

                $feeStructures = $feeStructures->map(function ($feeStructure) {
                    $classNameIds = $feeStructure->classNames->pluck('id')->toArray();
                    $classrooms = $this->classroomRepository->getActiveNameAndIdByClassNameIds($classNameIds, $request->schoolId, $setting?->academic_year_id);
                    $classroomIds = $classrooms->pluck('id')->toArray();

                    return [
                        'id' => $feeStructure->id,
                        'title' => $feeStructure->title,
                        'class_name_ids' => $classNameIds,
                        'classroom_ids' => $classroomIds,
                    ];
                });
            }

            $classNamesData = $this->classroomRepository->getActiveNameAndId($setting?->academic_year_id, $request->schoolId); // will later schoolID
            $housesData = $this->houseRepository->getActiveNameAndId($request->schoolId);
            $admissionNumbersData = $this->admissionRepository->getActiveAdmissionNumberAndId();
            $categoryData = $this->categoryRepository->getActiveNameAndId($request->schoolId);
            $catEmpData = $this->categoryRepository->getActiveNameAndIdOfEmployment($request->schoolId);
            $bloodGroupData = $this->bloodGroupRepository->getActiveNameAndId($request->schoolId);
            $religionData = $this->religionRepository->getActiveNameAndId($request->schoolId);
            $countryData = $this->countryRepository->getActiveNameAndId();
            $bankData = $this->bankRepository->getActiveNameAndId($request->schoolId);
            $stateData = $this->stateRepository->getActiveNameAndId();
            $admissionNo = $this->studentRepository->getNextAdmissionNo($request->schoolId);

            $classNames = $classNamesData->map(fn ($className) => ['id' => $className->id, 'title' => $className->title])->all();
            $houses = $housesData->map(fn ($house) => ['id' => $house->id, 'title' => $house->name])->all();
            $admissionNumbers = $admissionNumbersData->map(fn ($admissionNumber) => ['id' => $admissionNumber->id,  'title' => "{$admissionNumber->admission_number}"])->all();
            $categories = $categoryData->map(fn ($category) => ['id' => $category->id, 'title' => $category->title])->all();
            $bloodGroups = $bloodGroupData->map(fn ($bloodGroup) => ['id' => $bloodGroup->id, 'title' => $bloodGroup->name])->all();
            $religions = $religionData->map(fn ($religion) => ['id' => $religion->id, 'title' => $religion->name])->all();
            $countries = $countryData->map(fn ($country) => ['id' => $country->id, 'title' => $country->name])->all();
            $catEmps = $catEmpData->map(fn ($catEmp) => ['id' => $catEmp->id, 'title' => $catEmp->title])->all();
            $banks = $bankData->map(fn ($bank) => ['id' => $bank->id, 'title' => $bank->name])->all();
            $states = $stateData->map(fn ($state) => ['id' => $state->id, 'title' => $state->name])->all();

    
            return response()->json([
                'success' => true,
                'data' => [
                    'classNames' => $classNames,
                    'houses' => $houses,
                    'admissionNumbers' => $admissionNumbers,
                    'categories' => $categories,
                    'bloodGroups' => $bloodGroups,
                    'religions' => $religions,
                    'countries' => $countries,
                    'catEmps' => $catEmps,
                    'banks' => $banks,
                    'admissionNo' => $admissionNo,
                    'states' => $states,
                    'feeStructures' => $feeStructures,
                    'isFeeStructureWithTemplate' => $isFeeStructureWithTemplate,
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


     /**
     * @OA\Post(
     *     path="/students/save",
     *     operationId="saveStudent",
     *     tags={"Student"},
     *     summary="Create Student",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 required={"userId", "schoolId", "firstName", "classroomId", ""},
     *                 @OA\Property(property="name", type="string"),
     *                 @OA\Property(property="phone", type="string"),
     *                 example={"first_name": "Hasan"}
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error response",
     *         @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Sorry, Can't Create")
     *         )
     *     )
     * )
     */
    public function saveStudent(Request $request)
    {
        if (!empty($request->firstName) && !empty($request->classroomId) && !empty($request->schoolKey) && !empty($request->schoolId)) {
            $classNameId = $this->classroomRepository->getClassNameIdFromClassId($request->classroomId);
            $academicYearId = $this->classroomRepository->getSessionIdFromClassId($request->classroomId);

            if (!empty($request->email)) {
                $inputEmail = $request->email;
                $username = strtolower($request->firstName)  . rand(1000, 9999);
            } 
            else {
                $username = strtolower($request->firstName)  . rand(1000, 9999);
                $inputEmail = $username . '@educarestudy.in';
            }

            $userArray = [
                'school_id' => $request->schoolId,
                'username' => $username,
                'first_name' => $request->firstName ?? null,
                'middle_name' =>  $request->middleName ?? null,
                'last_name' => $request->lastName ?? null,
                'phone' => $request->phone ?? null,
                'email' => $inputEmail,
                'role' => UserRole::SITE_STUDENT,
                'password' => Hash::make($request->firstName),
                'status' => Status::ACTIVE
            ];
            $studentUser = $this->userRepository->create($userArray);
            $studentUser->assignRole(15);  // assign student role, here student role id: 15
            $studentData = array(
                'user_id' => $studentUser->id ?? null,
                'school_id' => $request->schoolId,
                'classroom_id' => $request->classroomId ?? null,
                'academic_year_id' => $academicYearId ?? null,
                'class_name_id' => $classNameId,
                'employment_cat_id' => !empty($request->employmentCatId) ? $request->employmentCatId : null,
                'country_id' => !empty($request->countryId) ? $request->countryId : null,
                'is_have_sibling' => $request->isHaveSibling ?? false,
                'sibling_student_id' => !empty($request->siblingStudentId) ? $request->siblingStudentId : null,
                'admission_no' => $request->admissionNo,
                'admission_date_at' => !empty($request->admissionDateAt) ? \Carbon\Carbon::parse($request->admissionDateAt)->format('Y-m-d') : date('Y-m-d'),
                'first_name' => $request->firstName ?? '',
                'middle_name' => $request->middleName ?? '',
                'last_name' => $request->lastName ?? '',
                'phone' => $request->phone ?? '',
                'email' => $inputEmail,
                'boarding_type' => $request->boardingType ?? '',
                'caste_type' => $request->casteType ?? '',
                'is_computer_option' => $request->isComputerOption ?? 0,
                'is_social_studies_option' => $request->isSocialStudiesOption ?? 0,
                'gender' => $request->gender ?? '',
                'aadhar_card_no' => $request->aadharCardNo ?? '',
                'blood_group' => $request->bloodGroup ?? '',
                'religion' => $request->religion ?? '',
                'srn_no' => $request->srnNo ?? '',
                'child_id' => $request->childId ?? '',
                'samagra_id' => $request->samagraId ?? '',
                'birth_place' => $request->birthPlace ?? '',
                'caste' => $request->caste ?? '',
                'sub_caste' => $request->subCaste ?? '',
                'admission_class' => $request->admissionClass ?? '',
                'mother_tongue' => $request->motherTongue ?? '',
                'medical_condition' => $request->medicalCondition ?? '',
                'notes' => $request->notes ?? '',
                'birth_date_at' => !empty($request->birthDateAt) ? \Carbon\Carbon::parse($request->birthDateAt)->format('Y-m-d') : date('Y-m-d'),
                'height' => $request->height ?? '0.00',
                'weight' => $request->weight ?? '0.00',
                'present_address' => $request->presentAddress ?? '',
                'present_state' => $request->presentState ?? '',
                'present_city' => $request->presentCity ?? '',
                'present_taluka' => $request->presentTaluka ?? '',
                'present_district' => $request->presentDistrict ?? '',
                'present_pin_code' => $request->presentPinCode ?? '',
                'permanent_address' => $request->permanentAddress ?? '',
                'permanent_state' => $request->permanentState ?? '',
                'permanent_city' => $request->permanentCity ?? '',
                'permanent_taluka' => $request->permanentTaluka ?? '',
                'permanent_district' => $request->permanentDistrict ?? '',
                'permanent_pin_code' => $request->permanentPinCode ?? '',
                'is_physical_disabled' => $request->isPhysicalDisabled ?? 0,
                'is_economically_weaker' => $request->isEconomicallyWeaker ?? 0,
                'is_spacial_child' => $request->isSpacialChild ?? 0,
                'prev_school_name' => $request->prevSchoolName ?? '',
                'prev_school_class' => $request->prevSchoolClass ?? '',
                'prev_school_year' => $request->prevSchoolYear ?? '',
                'prev_school_note' => $request->prevSchoolNote ?? '',
                'prev_school_tc_no' => $request->prevSchoolTcNo ?? 'Active',
                'student_status' => $request->status ?? 'New',
                'document_attached' => !empty($request->documentAttached) ? json_encode($request->documentAttached) : null
            );

            $student = $this->studentRepository->create($studentData);

            if (!empty($student['id'])) {
                // student classroom
                $studentClassroomData = array(
                    'school_id' => $request->schoolId,
                    'academic_year_id' => $academicYearId ?? null,
                    'class_name_id' => $classNameId,
                    'classroom_id' => $request->classroomId,
                    'student_id' => $student['id'],
                    'academic_year_id_from' => null,
                    'classroom_id_from' => null,
                    'promoted_date_at' => null,
                    'user_id' => $request->userId,
                    'status' => Status::ACTIVE->value,
                );
                $this->studentRepository->createClassroomStudent($studentClassroomData);
                
                // user activity
                $userActivityArr = [
                    'school_id' => $request->schoolId,
                    'user_id' => $request->userId,
                    'activitiesable_id' => $student['id'],
                    'activitiesable_type' => \App\Models\Student::class,
                    'status' => Status::ACTIVE->value,
                ];
                $this->userRepository->createUserActivity($userActivityArr, $student['id']);

                if (!empty($request->selectedSibling)) {
                    foreach ($request->selectedSibling as $sibling) {
                        $studentSibling = array(
                            'school_id'  => $request->schoolId,
                            'student_id' => $student['id'] ?? null,
                            'sibling_id' => $sibling['id'] ?? null,
                        );
                        $this->studentRepository->createSibling($studentSibling);
                    }
                }

                // student category
                if (!empty($request->categoryId)) {
                    $studentCategory = array(
                        'school_id'  => $request->schoolId,
                        'student_id' => $student['id'] ?? null,
                        'category_id' => $request->categoryId
                    );
                    $this->categoryRepository->createStudentCategory($studentCategory);
                }

                // student house
                if (!empty($request->houseId)) {
                    $houseData = array(
                        'school_id' => $request->schoolId,
                        'academic_year_id' => $academicYearId,
                        'student_id' => $student['id'] ?? null,
                        'house_id' => $request->houseId ?? null,
                        'status' => Status::ACTIVE
                    );
                    $this->studentHouseRepository->create($houseData);
                }

                // student bank
                if (!empty($request->accountName)) {
                    $bankAccountData = array(
                        'school_id'  => $request->schoolId,
                        'student_id' => $student['id'] ?? '',
                        'bank_id' => $request->bankId ?? null,
                        'account_name' => $request->accountName ?? '',
                        'account_no' => $request->accountNo ?? '',
                        'account_type' => $request->accountType ?? '',
                        'ifsc_code' => $request->ifscCode ?? '',
                        'micr_no' => $request->micrNo ?? '',
                        'branch_name' => $request->branchName ?? '',
                        'status' => Status::ACTIVE
                    );
                    $this->bankAccountRepository->create($bankAccountData);
                }

                // create user for father
                if (!empty($request->fatherFirstName)) {
                    if (!empty($request->fatherEmail)) {
                        $inputEmailF = $request->fatherEmail;
                        $username = strtolower($request->fatherFirstName)  . rand(1000, 9999);
                    } 
                    else {
                        $username = strtolower($request->fatherFirstName)  . rand(1000, 9999);
                        $inputEmailF = $username . '@educarestudy.in';
                    }
                    $haveFather = $this->userRepository->getFatherByEmail($request->fatherEmail);
                    $userArray = [
                        'school_id' => $request->schoolId,
                        'username' => $username,
                        'first_name' => $request->fatherFirstName ?? null,
                        'middle_name' =>  $request->fatherMiddleName ?? null,
                        'last_name' => $request->fatherLastName ?? null,
                        'phone' => $request->fatherPhone ?? null,
                        'email' => $inputEmailF,
                        'role' => UserRole::SITE_PARENT,
                        'password' => Hash::make(Str::random(10)),
                        'status' => Status::ACTIVE
                    ];
                    if (!empty($haveFather)) {
                        $user = $this->userRepository->updateOrCreate(['id' => $haveFather->id], $userArray);
                    } 
                    else {
                        $user = $this->userRepository->create($userArray);
                    }

                    // father
                    if (!empty($user->id) && !empty($request->fatherType) && $request->fatherType == 'Father') {
                        $fatherData = array(
                            'school_id'  => $request->schoolId,
                            'user_id' => $user->id ?? null,
                            'student_id' => $student['id'] ?? '',
                            'guardian_type' => 'Father',
                            'first_name' => $request->fatherFirstName ?? '',
                            'middle_name' => $request->fatherMiddleName ?? '',
                            'last_name' => $request->fatherLastName ?? '',
                            'religion' => $request->fatherReligion ?? '',
                            'relation' => null,
                            'phone' => $request->fatherPhone ?? '',
                            'email' => $inputEmailF,
                            'sms_phone' => $request->fatherSmsPhone ?? '',
                            'highest_qualification' => $request->fatherHighestQualification ?? '',
                            'occupation' => $request->fatherOccupation ?? '',
                            'income_per_year' => $request->fatherIncomePerYear ?? '',
                            'department' => $request->fatherDepartment ?? '',
                            'designation' => $request->fatherDesignation ?? '',
                            'aadhar_card_no' => $request->fatherAadharCardNo ?? '',
                            'pan_card_no' => $request->fatherPanCardNo ?? '',
                            'company_name' => $request->fatherCompanyName ?? '',
                            'city' => $request->fatherCity ?? '',
                            'address' => $request->fatherAddress ?? '',
                            'office_address' => $request->fatherOfficeAddress ?? '',
                            'is_inactive' => 0,
                            'status' => Status::ACTIVE
                        );
                        $this->guardianRepository->create($fatherData);
                    }
                }

                // mother
                if (!empty($request->motherFirstName) && $request->motherType == 'Mother') {
                    $motherData = array(
                        'school_id'  => $request->schoolId,
                        'student_id' => $student['id'] ?? '',
                        'guardian_type' => 'Mother',
                        'first_name' => $request->motherFirstName ?? '',
                        'middle_name' => $request->motherMiddleName ?? '',
                        'last_name' => $request->motherLastName ?? '',
                        'religion' => $request->motherReligion ?? '',
                        'relation' => null,
                        'phone' => $request->motherPhone ?? '',
                        'email' => $request->motherEmail ?? '',
                        'sms_phone' => $request->motherSmsPhone ?? '',
                        'highest_qualification' => $request->motherHighestQualification ?? '',
                        'occupation' => $request->motherOccupation ?? '',
                        'income_per_year' => $request->motherIncomePerYear ?? '',
                        'department' => $request->motherDepartment ?? '',
                        'designation' => $request->motherDesignation ?? '',
                        'aadhar_card_no' => $request->motherAadharCardNo ?? '',
                        'pan_card_no' => $request->motherPanCardNo ?? '',
                        'company_name' => $request->motherCompanyName ?? '',
                        'city' => $request->motherCity ?? '',
                        'address' => $request->motherAddress ?? '',
                        'office_address' => $request->motherOfficeAddress ?? '',
                        'is_inactive' => 0,
                        'status' => Status::ACTIVE
                    );
                    $this->guardianRepository->create($motherData);
                }

                // guardian
                if (!empty($request->guardianFirstName) && $request->guardianType == 'Guardian') {
                    $guardianData = array(
                        'school_id'  => $request->schoolId,
                        'student_id' => $student['id'] ?? '',
                        'guardian_type' => 'Guardian',
                        'first_name' => $request->guardianFirstName ?? '',
                        'middle_name' => $request->guardianMiddleName ?? '',
                        'last_name' => $request->guardianLastName ?? '',
                        'religion' => $request->guardianReligion ?? '',
                        'relation' => $request->guardianRelation ?? '',
                        'phone' => $request->guardianPhone ?? '',
                        'email' => $request->guardianEmail ?? '',
                        'sms_phone' => $request->guardianSmsPhone ?? '',
                        'highest_qualification' => $request->guardianHighestQualification ?? '',
                        'occupation' => $request->guardianOccupation ?? '',
                        'income_per_year' => $request->guardianIncomePerYear ?? '',
                        'department' => $request->guardianDepartment ?? '',
                        'designation' => $request->guardianDesignation ?? '',
                        'aadhar_card_no' => $request->guardianAadharCardNo ?? '',
                        'pan_card_no' => $request->guardianPanCardNo ?? '',
                        'company_name' => $request->guardianCompanyName ?? '',
                        'city' => $request->guardianCity ?? '',
                        'address' => $request->guardianAddress ?? '',
                        'office_address' => $request->guardianOfficeAddress ?? '',
                        'is_inactive' => 0,
                        'status' => Status::ACTIVE
                    );
                    $this->guardianRepository->create($guardianData);
                }

                // profile image
                if (!empty($request->file('student_profile_image'))) {
                    $image_url = $this->_upload->uploadImage($request, 'student_profile_image', 'student_profile_image', $request->schoolKey);
                    $dataImage = array(
                        'school_id' => $request->schoolId,
                        'imageable_type' => \App\Models\Student::class,
                        'imageable_id' => $student['id'],
                        'name' => 'student_profile_image',
                        'path' => !empty($image_url) ? $image_url : 'no image',
                        'status' => Status::ACTIVE,
                    );
                    $this->imageRepository->morphCreate($dataImage, $student['id']);
                }

                // Father Profile image
                if (!empty($request->file('student_father_profile_image'))) {
                    $image_url = $this->_upload->uploadImage($request, 'student_father_profile_image', 'student_father_profile_image', $request->schoolKey);
                    $dataImage = array(
                        'school_id' => $request->schoolId,
                        'imageable_type' => \App\Models\Student::class,
                        'imageable_id' => $student['id'],
                        'name' => 'student_father_profile_image',
                        'path' => !empty($image_url) ? $image_url : 'no image',
                        'status' => Status::ACTIVE,
                    );
                    $this->imageRepository->morphCreate($dataImage, $student['id']);
                }

                // Mother Profile
                if (!empty($request->file('student_mother_profile_image'))) {
                    $image_url = $this->_upload->uploadImage($request, 'student_mother_profile_image', 'student_mother_profile_image', $request->schoolKey);
                    $dataImage = array(
                        'school_id' => $request->schoolId,
                        'imageable_type' => \App\Models\Student::class,
                        'imageable_id' => $student['id'],
                        'name' => 'student_mother_profile_image',
                        'path' => !empty($image_url) ? $image_url : 'no image',
                        'status' => Status::ACTIVE,
                    );
                    $this->imageRepository->morphCreate($dataImage, $student['id']);
                }

                // Guardian profile
                if (!empty($request->file('student_guardian_profile_image'))) {
                    $image_url = $this->_upload->uploadImage($request, 'student_guardian_profile_image', 'student_guardian_profile_image', $request->schoolKey);
                    $dataImage = array(
                        'school_id' => $request->schoolId,
                        'imageable_type' => \App\Models\Student::class,
                        'imageable_id' => $student['id'],
                        'name' => 'student_guardian_profile_image',
                        'path' => !empty($image_url) ? $image_url : 'no image',
                        'status' => Status::ACTIVE,
                    );
                    $this->imageRepository->morphCreate($dataImage, $student['id']);
                }

                // assign fee to student
                if (!empty($classNameId)) {
                    $feeStructureId = !empty($request->feeStructureId) ? $request->feeStructureId : null;
                    $this->apiAssignFeeToNewStudent($student['id'], $classNameId, $feeStructureId);
                }
            };

            return response()->json([
                'success' => true,
                'message' => 'created successfully',
                'data' => $student,
            ], 200);
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'Fields required',
                'data' => []
            ], 200);
        }
    }

    /**
     * @OA\Put(
     * path="/students/update/{id}",
     * summary="Update Student",
     * description="Update Student",
     * operationId="updateStudent",
     * tags={"Student"},
     *    @OA\Parameter(
     *    in="path",
     *    name="id",
     *    required=true,
     *    description="Update Student",
     *    @OA\Schema(type="string"),
     *    @OA\Examples(example="int", value="1", summary="An int value."),
     * ),
     * @OA\RequestBody(
     *    required=true,
     *    description="Update Student",
     *    @OA\JsonContent(
     *       required={"schoolId", "schoolKey", "firstName","fatherFirstName","classroomId"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="schoolKey", type="interger", example="demo"),
     *       @OA\Property(property="classroomId", type="interger", example="demo"),
     *       @OA\Property(property="startDateAt", type="string", example=""),
     *       @OA\Property(property="fatherFirstName", type="string", example=""),
     *    ),
     * ),
     * @OA\Response(
     *    response=422,
     *    description="Error response",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, Can't Update")
     *        )
     *     )
     * )
     */
    public function updateStudent(Request $request, int $id)
    {
        if (!empty($request->firstName) && !empty($request->classroomId) && !empty($request->schoolId)) {
            $proStudent = $this->studentRepository->getRelationalObjById($id, $request->schoolId);
            if (!empty($proStudent->classroomStudent->academic_year_id)) {
                // promoted classroom student
                $promotedClassroomStudentId = $proStudent->classroomStudent->id;
                $promotedClassNameId = $this->classroomRepository->getClassNameIdFromClassId($request->classroomId);
                $promotedAcademicYearId = $this->classroomRepository->getSessionIdFromClassId($request->classroomId);

                $dataArrUpdate = array(
                    'academic_year_id' => $promotedAcademicYearId,
                    'class_name_id' => $promotedClassNameId,
                    'classroom_id' => $request->classroomId,
                );
                $this->studentRepository->updateClassroomStudent($promotedClassroomStudentId, $dataArrUpdate);
                //update student mark classroom
                $examMarkUpdateData = [
                    'classroom_id' => $request->classroomId
                ];
                $this->studentRepository->updateExamMarkClassroomData($id, $examMarkUpdateData, $request->schoolId, $promotedAcademicYearId);

                // no change
                $classNameId = $proStudent->class_name_id;
                $academicYearId = $proStudent->academic_year_id;
                $_classroom_id = $proStudent->classroom_id;
            } else {
                $classNameId = $this->classroomRepository->getClassNameIdFromClassId($request->classroomId);
                $academicYearId = $this->classroomRepository->getSessionIdFromClassId($request->classroomId);
                $_classroom_id = $request->classroomId;
            }

            $studentData = array(
                'school_id' => $request->schoolId,
                'classroom_id' => $_classroom_id,
                'academic_year_id' => $academicYearId,
                'class_name_id' => $classNameId,
                'employment_cat_id' => !empty($request->employmentCatId) ? $request->employmentCatId : null,
                'country_id' => !empty($request->countryId) ? $request->countryId  : null,
                'is_have_sibling' => $request->isHaveSibling ?? false,
                'sibling_student_id' => ($request->isHaveSibling && $request->siblingStudentId) ? $request->siblingStudentId : null,
                // 'admission_no' => $request->admission_no'],
                'admission_date_at' => !empty($request->admissionDateAt) ? \Carbon\Carbon::parse($request->admissionDateAt)->format('Y-m-d') : date('Y-m-d'),
                'first_name' => $request->firstName ?? '',
                'middle_name' => $request->middleName ?? '',
                'last_name' => $request->lastName ?? '',
                'phone' => $request->phone ?? '',
                'email' => $request->email ?? '',
                // 'roll_no' => $request->roll_no'] ?? '',
                'boarding_type' => $request->boardingType ?? '',
                'caste_type' => $request->casteType ?? '',
                'is_computer_option' => $request->isComputerOption ?? 0,
                'is_social_studies_option' => $request->isSocialStudiesOption ?? 0,
                'gender' => $request->gender ?? '',
                'aadhar_card_no' => $request->aadharCardNo ?? '',
                'blood_group' => $request->bloodGroup ?? '',
                'religion' => $request->religion ?? '',
                'srn_no' => $request->srnNo ?? '',
                'child_id' => $request->childId ?? '',
                'samagra_id' => $request->samagraId ?? '',
                'birth_place' => $request->birthPlace ?? '',
                'caste' => $request->caste ?? '',
                'sub_caste' => $request->subCaste ?? '',
                'admission_class' => $request->admissionClass ?? '',
                'mother_tongue' => $request->motherTongue ?? '',
                'medical_condition' => $request->medicalCondition ?? '',
                'notes' => $request->notes ?? '',
                'birth_date_at' => !empty($request->birthDateAt) ? \Carbon\Carbon::parse($request->birthDateAt)->format('Y-m-d') : date('Y-m-d'),
                'height' => $request->height ?? '0.00',
                'weight' => $request->weight ?? '0.00',
                'present_address' => $request->presentAddress ?? '',
                'present_state' => $request->presentState ?? '',
                'present_city' => $request->presentCity ?? '',
                'present_taluka' => $request->presentTaluka ?? '',
                'present_district' => $request->presentDistrict ?? '',
                'present_pin_code' => $request->presentPinCode ?? '',
                'permanent_address' => $request->permanentAddress ?? '',
                'permanent_state' => $request->permanentState ?? '',
                'permanent_city' => $request->permanentCity ?? '',
                'permanent_taluka' => $request->permanentTaluka ?? '',
                'permanent_district' => $request->permanentDistrict ?? '',
                'permanent_pin_code' => $request->permanentPinCode ?? '',
                'is_physical_disabled' => $request->isPhysicalDisabled ?? 0,
                'is_economically_weaker' => $request->isEconomicallyWeaker ?? 0,
                'is_spacial_child' => $request->isSpacialChild ?? 0,
                'prev_school_name' => $request->prevSchoolName ?? '',
                'prev_school_class' => $request->prevSchoolClass ?? '',
                'prev_school_year' => $request->prevSchoolYear ?? '',
                'prev_school_note' => $request->prevSchoolNote ?? '',
                'prev_school_tc_no' => $request->prevSchoolTcNo ?? 'Active',
                'student_status' => $request->status ?? 'New',
                'document_attached' => !empty($request->documentAttached) ? json_encode($request->documentAttached) : null
            );
            $student = $this->studentRepository->update($id, $studentData);
            // user activity
            $userActivityArr = [
                'school_id' => $request->schoolId,
                'user_id' => $request->userId,
                'activitiesable_id' => $id,
                'activitiesable_type' => \App\Models\Student::class,
                'status' => Status::ACTIVE->value,
            ];
            $this->userRepository->createUserActivity($userActivityArr, $id);

            if (!empty($request->studentCategoryId)) {
                if (!empty($request->categoryId)) {
                    $studentCategory = array(
                        'category_id' => intval($request->categoryId) ?? null
                    );
                    $this->categoryRepository->updateStudent($request->studentCategoryId, $studentCategory);
                } else {
                    $this->categoryRepository->deleteStudent($request->studentCategoryId);
                }
            } else if (!empty($request->categoryId)) {
                // student category
                $studentCategory = array(
                    'school_id'  => $request->schoolId,
                    'student_id' => $id ?? null,
                    'category_id' => $request->categoryId ?? null
                );
                $this->categoryRepository->createStudentCategory($studentCategory);
            }

            if (!empty($request->studentHouseId)) {
                if (!empty($request->houseId)) {
                    $houseData = array(
                        'house_id' => !empty($request->houseId) ? $request->houseId : ''
                    );
                    $this->studentHouseRepository->update($request->studentHouseId, $houseData);
                } else {
                    $this->studentHouseRepository->delete($request->studentHouseId);
                }
            } else if (!empty($request->houseId)) {
                $houseData = array(
                    'school_id' => $request->schoolId,
                    'academic_year_id' => $academicYearId,
                    'student_id' => $id ?? null,
                    'house_id' => $request->houseId ?? null,
                    'status' => Status::ACTIVE
                );
                $this->studentHouseRepository->create($houseData);
            }

            if (!empty($request->studentBankAccountId)) {
                // student bank
                $bankAccountData = array(
                    'bank_id' => $request->bankId ?? null,
                    'account_name' => $request->accountName ?? '',
                    'account_no' => $request->accountNo ?? '',
                    'account_type' => $request->accountType ?? '',
                    'ifsc_code' => $request->ifscCode ?? '',
                    'micr_no' => $request->micrNo ?? '',
                    'branch_name' => $request->branchName ?? '',
                    'status' => Status::ACTIVE
                );
                $this->bankAccountRepository->update($request->studentBankAccountId, $bankAccountData);
            }


            // father
            if (!empty($request->fatherFirstName) && $request->fatherFirstName == 'Father') {

                $fatherData = array(
                    'school_id'  => $request->schoolId,
                    'student_id' => $id,
                    'guardian_type' => 'Father',
                    'first_name' => $request->fatherFirstName ?? '',
                    'middle_name' => $request->fatherMiddleName ?? '',
                    'last_name' => $request->fatherLastName ?? '',
                    'religion' => $request->fatherReligion ?? '',
                    'relation' => null,
                    'phone' => $request->fatherPhone ?? '',
                    'email' => $request->fatherEmail ?? '',
                    'sms_phone' => $request->fatherSmsPhone ?? '',
                    'highest_qualification' => $request->fatherHighestQualification ?? '',
                    'occupation' => $request->fatherOccupation ?? '',
                    'income_per_year' => $request->fatherIncomePerYear ?? '',
                    'department' => $request->fatherDepartment ?? '',
                    'designation' => $request->fatherDesignation ?? '',
                    'aadhar_card_no' => $request->fatherAadharCardNo ?? '',
                    'pan_card_no' => $request->fatherPanCardNo ?? '',
                    'company_name' => $request->fatherCompanyName ?? '',
                    'city' => $request->fatherCity ?? '',
                    'address' => $request->fatherAddress ?? '',
                    'office_address' => $request->fatherOfficeAddress ?? '',
                    'is_inactive' => 0,
                    'status' => Status::ACTIVE
                );

                if (!empty($request->fatherId)) {
                    $this->guardianRepository->update($request->fatherId, $fatherData);
                } else {
                    if (!empty($request->fatherEmail)) {
                        $inputEmailF = $request->fatherEmail;
                        $username = strtolower($request->fatherFirstName)  . rand(1000, 9999);
                    } else {
                        $username = strtolower($request->fatherFirstName)  . rand(1000, 9999);
                        $inputEmailF = $username . '@educarestudy.in';
                    }

                    $haveFather = $this->userRepository->getFatherByEmail($request->fatherEmail);

                    $userArrayF = [
                        'school_id' => $request->schoolId,
                        'username' => $username,
                        'first_name' => $request->fatherFirstName ?? null,
                        'middle_name' =>  $request->fatherMiddleName ?? null,
                        'last_name' => $request->fatherLastName ?? null,
                        'phone' => $request->fatherPhone ?? null,
                        'email' => $inputEmailF,
                        'role' => UserRole::SITE_PARENT,
                        'password' => Hash::make(Str::random(10)),
                        'status' => Status::ACTIVE
                    ];
                    if (!empty($haveFather)) {
                        $user = $this->userRepository->updateOrCreate(['id' => $haveFather->id], $userArrayF);
                    } else {
                        $user = $this->userRepository->create($userArrayF);
                        $fatherData['user_id'] = $user->id ?? null;
                    }
                    $this->guardianRepository->create($fatherData);
                }
            }

            // mother
            if (!empty($request->motherFirstName) && $request->motherType == 'Mother') {

                $motherData = array(
                    'school_id'  => $request->schoolId,
                    'student_id' => $id,
                    'guardian_type' => 'Mother',
                    'first_name' => $request->motherFirstName ?? '',
                    'middle_name' => $request->motherMiddleName ?? '',
                    'last_name' => $request->motherLastName ?? '',
                    'religion' => $request->motherReligion ?? '',
                    'relation' => null,
                    'phone' => $request->motherPhone ?? '',
                    'email' => $request->motherEmail ?? '',
                    'sms_phone' => $request->motherSmsPhone ?? '',
                    'highest_qualification' => $request->motherHighestQualification ?? '',
                    'occupation' => $request->motherOccupation ?? '',
                    'income_per_year' => $request->motherIncomePerYear ?? '',
                    'department' => $request->motherDepartment ?? '',
                    'designation' => $request->motherDesignation ?? '',
                    'aadhar_card_no' => $request->motherAadharCardNo ?? '',
                    'pan_card_no' => $request->motherPanCardNo ?? '',
                    'company_name' => $request->motherCompanyName ?? '',
                    'city' => $request->motherCity ?? '',
                    'address' => $request->motherAddress ?? '',
                    'office_address' => $request->motherOfficeAddress ?? '',
                    'is_inactive' => 0,
                    'status' => Status::ACTIVE
                );

                if (!empty($request->motherId)) {
                    $this->guardianRepository->update($request->motherId, $motherData);
                } else {
                    $this->guardianRepository->create($motherData);
                }
            }

            // guardian
            if (!empty($request->guardianFirstName) && $request->guardianType == 'Guardian') {

                $guardianData = array(
                    'school_id'  => $request->schoolId,
                    'student_id' => $id,
                    'guardian_type' => 'Guardian',
                    'first_name' => $request->guardianFirstName ?? '',
                    'middle_name' => $request->guardianMiddleName ?? '',
                    'last_name' => $request->guardianLastName ?? '',
                    'religion' => $request->guardianReligion ?? '',
                    'relation' => $request->guardianRelation ?? '',
                    'phone' => $request->guardianPhone ?? '',
                    'email' => $request->guardianEmail ?? '',
                    'sms_phone' => $request->guardianSmsPhone ?? '',
                    'highest_qualification' => $request->guardianHighestQualification ?? '',
                    'occupation' => $request->guardianOccupation ?? '',
                    'income_per_year' => $request->guardianIncomePerYear ?? '',
                    'department' => $request->guardianDepartment ?? '',
                    'designation' => $request->guardianDesignation ?? '',
                    'aadhar_card_no' => $request->guardianAadharCardNo ?? '',
                    'pan_card_no' => $request->guardianPanCardNo ?? '',
                    'company_name' => $request->guardianCompanyName ?? '',
                    'city' => $request->guardianCity ?? '',
                    'address' => $request->guardianAddress ?? '',
                    'office_address' => $request->guardianOfficeAddress ?? '',
                    'is_inactive' => 0,
                    'status' => Status::ACTIVE
                );
                if (!empty($request->guardianId)) {
                    $this->guardianRepository->update($request->guardianId, $guardianData);
                } else {
                    $this->guardianRepository->create($guardianData);
                }
            }


            // profile image
            if (!empty($request->file('student_profile_image'))) {
                $image_url = $this->_upload->uploadImage($request, 'student_profile_image', 'student_profile_image', $request->schoolKey);
                $arrayMatch = [
                    'imageable_id' => $id,
                    'name' => 'student_profile_image',
                    'imageable_type' => \App\Models\Student::class,
                ];

                $arrayData = [
                    'school_id' => $request->schoolId,
                    'imageable_type' => \App\Models\Student::class,
                    'imageable_id' => $id,
                    'name' => 'student_profile_image',
                    'path' => !empty($image_url) ? $image_url : 'no image',
                    'status' => Status::ACTIVE,
                ];

                $this->imageRepository->updateOrCreate($arrayMatch, $arrayData);
            }

            // Father Profile image
            if (!empty($request->file('student_father_profile_image'))) {
                $image_url = $this->_upload->uploadImage($request, 'student_father_profile_image', 'student_father_profile_image', $request->schoolKey);
                $arrayMatch = [
                    'imageable_id' => $id,
                    'name' => 'student_father_profile_image',
                    'imageable_type' => \App\Models\Student::class,
                ];

                $arrayData = [
                    'school_id' => $request->schoolId,
                    'imageable_type' => \App\Models\Student::class,
                    'imageable_id' => $id,
                    'name' => 'student_father_profile_image',
                    'path' => !empty($image_url) ? $image_url : 'no image',
                    'status' => Status::ACTIVE,
                ];
                $this->imageRepository->updateOrCreate($arrayMatch, $arrayData);
            }

            // Mother Profile
            if (!empty($request->file('student_mother_profile_image'))) {
                $image_url = $this->_upload->uploadImage($request, 'student_mother_profile_image', 'student_mother_profile_image', $request->schoolKey);
                $arrayMatch = [
                    'imageable_id' => $id,
                    'name' => 'student_mother_profile_image',
                    'imageable_type' => \App\Models\Student::class,
                ];

                $arrayData = [
                    'school_id' => $request->schoolId,
                    'imageable_type' => \App\Models\Student::class,
                    'imageable_id' => $id,
                    'name' => 'student_mother_profile_image',
                    'path' => !empty($image_url) ? $image_url : 'no image',
                    'status' => Status::ACTIVE,
                ];
                $this->imageRepository->updateOrCreate($arrayMatch, $arrayData);
            }

            // Guardian profile
            if (!empty($request->file('student_guardian_profile_image'))) {
                $image_url = $this->_upload->uploadImage($request, 'student_guardian_profile_image', 'student_guardian_profile_image', $request->schoolKey);
                $arrayMatch = [
                    'imageable_id' => $id,
                    'name' => 'student_guardian_profile_image',
                    'imageable_type' => \App\Models\Student::class,
                ];

                $arrayData = [
                    'school_id' => $request->schoolId,
                    'imageable_type' => \App\Models\Student::class,
                    'imageable_id' => $id,
                    'name' => 'student_guardian_profile_image',
                    'path' => !empty($image_url) ? $image_url : 'no image',
                    'status' => Status::ACTIVE,
                ];
                $this->imageRepository->updateOrCreate($arrayMatch, $arrayData);
            }
          
            return response()->json([
                'success' => true,
                'message' => 'created successfully',
                'data' => $student,
            ], 200);
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'Staff json data required',
                'data' => []
            ], 200);
        }
    }


    /*
    *  assign fee to new student
    */
    protected function apiAssignFeeToNewStudent($studentId, $classNameId, $feeStructureId = null)
    {
        $student = $this->studentRepository->getByStudentId($studentId);
        // $student = $this->studentRepository->getById($studentId);

        if ($student != null) {
            $disallowStructureToEwsStudent = getSiteSettingData('fee_is_disallow_structure_to_ews_student')?->value ?? "No";

            if ($disallowStructureToEwsStudent == "No" || ($disallowStructureToEwsStudent == "Yes" && $student?->is_economically_weaker != true)) {
                $isFeeStructureWithTemplate = getSiteSettingData('fee_is_structure_with_template')?->value ?? "No";

                $feeStructure = null;

                if ($isFeeStructureWithTemplate === "Yes" && !empty($feeStructureId) && !empty($classNameId)) {
                    $feeStructure = $this->feeStructureRepository->getByIdAndClassNameId($feeStructureId, $classNameId);
                }

                if ($isFeeStructureWithTemplate === "No" && !empty($classNameId)) {
                    $feeStructure = $this->feeStructureRepository->getByClassNameId($classNameId);
                }

                DB::transaction(function () use ($feeStructure, $student) {
                    if ($feeStructure != null && $feeStructure->class_fee_structure_amounts->count() > 0) {
                        if ($feeStructure->structure_type == $student->boarding_type) {
                            foreach ($feeStructure->class_fee_structure_amounts as $structureData) {
                                if (
                                    ($student->student_status == $structureData->student_status ||
                                        in_array($student->student_status, [StudentStatus::OLD->value, StudentStatus::PROMOTED->value]) &&
                                        in_array($structureData->student_status, [StudentStatus::OLD->value, StudentStatus::PROMOTED->value])
                                    ) &&
                                    (
                                        $student->student_status == StudentStatus::NEW->value ||
                                        in_array($student->student_status, [StudentStatus::OLD->value, StudentStatus::PROMOTED->value]) && $structureData['is_admission_installment'] == false
                                    )
                                ) {
                                    $dataArray = array(
                                        'school_id' => getUserSchoolId(),
                                        'academic_year_id' => getAcademicYearId(),
                                        'student_id' => $student->id,
                                        'class_name_id' => $student->class_name_id,
                                        'class_fee_structure_id' => $feeStructure->id,
                                        'fee_id' => $structureData['fee_id'],
                                        'fee_type_id' => $structureData['fee_type_id'],
                                        'amount' => !empty($structureData['amount']) ? $structureData['amount'] : 0,
                                        'semester' => !empty($structureData['semester']) ? $structureData['semester'] : null,
                                        'is_admission_installment' => !empty($structureData['is_admission_installment']) ? $structureData['is_admission_installment'] : 0,
                                        'is_fee_special' => !empty($structureData['is_special']) ? $structureData['is_special'] : 0,
                                        'status' => Status::ACTIVE,
                                    );

                                    $this->classFeeStudentAmountRepository->create($dataArray);
                                }
                            }
                        }
                    }
                });
            }
        }
    }
}