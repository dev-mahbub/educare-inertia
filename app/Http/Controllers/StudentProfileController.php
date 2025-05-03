<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Enums\Gender;
use App\Enums\Status;
use App\Models\House;
use Inertia\Response;
use App\Enums\UserRole;
use App\Models\Student;
use App\Enums\CasteType;
use App\Models\Religion;
use App\Enums\AccountType;
use App\Enums\GuardianType;
use App\Enums\SubCasteType;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use App\Enums\StaffRoleType;
use App\Enums\StudentStatus;
use Illuminate\Http\Request;
use App\Enums\ScholarBoardingType;
use App\Repositories\BankRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\StudentRequest;
use App\Repositories\HouseRepository;
use App\Repositories\IBankRepository;
use App\Repositories\ImageRepository;
use App\Repositories\IUserRepository;
use App\Repositories\StateRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IHouseRepository;
use App\Repositories\IImageRepository;
use App\Repositories\IStateRepository;
use App\Repositories\SchoolRepository;
use App\Repositories\CountryRepository;
use App\Repositories\ISchoolRepository;
use App\Repositories\StudentRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\GuardianRepository;
use App\Repositories\ICountryRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\ReligionRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\AdmissionRepository;
use App\Repositories\ClassroomRepository;
use App\Repositories\IAcademicRepository;
use App\Repositories\ICategoryRepository;
use App\Repositories\IGuardianRepository;
use App\Repositories\IReligionRepository;
use App\Repositories\BloodGroupRepository;
use App\Repositories\IAdmissionRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\ITransportRepository;
use App\Repositories\BankAccountRepository;
use App\Repositories\IBloodGroupRepository;
use App\Http\Requests\StudentSiblingRequest;
use App\Repositories\IBankAccountRepository;
use App\Repositories\StudentHouseRepository;
use App\Repositories\IAcademicYearRepository;
use App\Repositories\IStudentHouseRepository;
use App\Http\Requests\ClassroomStudentRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Repositories\IStudentSubjectRepository;
use App\Repositories\StudentAdmissionRepository;
use App\Repositories\IClassroomSubjectRepository;
use App\Repositories\IStudentAdmissionRepository;

class StudentProfileController extends Controller
{
    private $_upload;
    public function __construct(
        private ISchoolRepository $schoolRepository,
        private IStudentRepository $studentRepository,
        private IClassroomRepository $classroomRepository,
        private IHouseRepository $houseRepository,
        private IAdmissionRepository $admissionRepository,
        private ICategoryRepository $categoryRepository,
        private IBloodGroupRepository $bloodGroupRepository,
        private ICountryRepository $countryRepository,
        private IReligionRepository $religionRepository,
        private IBankRepository $bankRepository,
        private IStateRepository $stateRepository,
        private IBankAccountRepository $bankAccountRepository,
        private IStudentHouseRepository $studentHouseRepository,
        private IGuardianRepository $guardianRepository,
        private IImageRepository $imageRepository,
        private IStudentAdmissionRepository $studentAdmissionRepository,
        private IUserRepository $userRepository,
        private IAcademicRepository $academicRepository,
        private ITransportRepository $transportRepository,
        private IClassroomSubjectRepository $classroomSubjectRepository,
        private IStudentSubjectRepository $studentSubjectRepository,
    ) {
        $this->_upload = new UploadFileController();
        $this->middleware('permission:edit student', ['only' => ['edit', 'update', 'updateDetails', 'updateDetailsSave']]);
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $id = 1;
        $student = $this->studentRepository->getRelationalObjById($id);
        $fatherUserId = $this->guardianRepository->getParentByStudentId($id);
        $fatherUserData = $this->userRepository->getById($fatherUserId->user_id);

        $stuSiblingData = $this->studentRepository->getActiveNameAndIdWithoutSame($id);
        $classNamesData = $this->classroomRepository->getActiveNameAndId();
        $housesData = $this->houseRepository->getActiveNameAndId();
        $admissionNumbersData = $this->admissionRepository->getActiveAdmissionNumberAndId();
        $categoryData = $this->categoryRepository->getActiveNameAndId();
        $catEmpData = $this->categoryRepository->getActiveNameAndIdOfEmployment();
        $bloodGroupData = $this->bloodGroupRepository->getActiveNameAndId();
        $religionData = $this->religionRepository->getActiveNameAndId();
        $countryData = $this->countryRepository->getActiveNameAndId();
        $bankData = $this->bankRepository->getActiveNameAndId();
        $stateData = $this->stateRepository->getActiveNameAndId();

        $stuSibling = $stuSiblingData->map(fn ($sibling) => ['id' => $sibling->id, 'title' => getCocatenationTitle($sibling->first_name, $sibling->middle_name, $sibling->last_name)])->all();
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

        //guardians
        $fatherData = array();
        $motherData = array();
        $guardianData = array();

        if (!empty($student->guardians)) {
            foreach ($student->guardians as $guardian) {

                if ($guardian['guardian_type'] === 'Father') {
                    $fatherData = $guardian;
                } elseif ($guardian['guardian_type'] === 'Mother') {
                    $motherData = $guardian;
                } else {
                    $guardianData = $guardian;
                }
            }
        }

        // types
        $statusType = Status::cases();
        $status = array();
        foreach ($statusType as $sType) {
            array_push($status, ['id' => $sType->value, 'title' => $sType->value]);
        }

        $schBoaType = ScholarBoardingType::cases();
        $schBoaArr = array();
        foreach ($schBoaType as $sbType) {
            array_push($schBoaArr, ['id' => $sbType->value, 'title' => $sbType->value]);
        }

        $casteType = CasteType::cases();
        $casteArr = array();
        foreach ($casteType as $cType) {
            array_push($casteArr, ['id' => $cType->value, 'title' => $cType->value]);
        }

        $subCasteType = SubCasteType::cases();
        $subCasteArr = array();
        foreach ($subCasteType as $scType) {
            array_push($subCasteArr, ['id' => $scType->value, 'title' => $scType->value]);
        }

        $genderType = Gender::cases();
        $genderArr = array();
        foreach ($genderType as $gType) {
            array_push($genderArr, ['id' => $gType->value, 'title' => $gType->value]);
        }

        $accountType = AccountType::cases();
        $accountArr = array();
        foreach ($accountType as $aType) {
            array_push($accountArr, ['id' => $aType->value, 'title' => $aType->value]);
        }


        return Inertia::render('StudentProfile/Edit', [
            'student' => $student,
            'fatherData' => $fatherData,
            'motherData' => $motherData,
            'guardianData' => $guardianData,
            'classNames' => $classNames,
            'houses' => $houses,
            'status' => $status,
            'admissionNumbers' => $admissionNumbers,
            'schBoaArr' => $schBoaArr,
            'casteArr' => $casteArr,
            'genderArr' => $genderArr,
            'categories' => $categories,
            'bloodGroups' => $bloodGroups,
            'religions' => $religions,
            'countries' => $countries,
            'catEmps' => $catEmps,
            'subCasteArr' => $subCasteArr,
            'accountArr' => $accountArr,
            'banks' => $banks,
            'states' => $states,
            'fatherUserData' => $fatherUserData,
            'stuSibling' => [],
        ]);
    }

    /**
     * Update student info
     */

    public function update(StudentRequest $request): RedirectResponse
    {
        $id = 1;
        $input = $request->validated();

        $classNameId = $this->classroomRepository->getClassNameIdFromClassId($input['classroom_id']);

        $studentData = array(
            'school_id' => getUserSchoolId(),
            'classroom_id' => $input['classroom_id'] ?? null,
            'class_name_id' => $classNameId,
            'employment_cat_id' => intval($input['employment_cat_id']) ?? null,
            'country_id' => intval($input['country_id']) ?? null,
            'is_have_sibling' => $input['is_have_sibling'] ?? false,
            'sibling_student_id' => $input['is_have_sibling'] && $input['sibling_student_id'] ?? null,
            // 'admission_no' => $input['admission_no'],
            'first_name' => $input['first_name'] ?? '',
            'middle_name' => $input['middle_name'] ?? '',
            'last_name' => $input['last_name'] ?? '',
            'phone' => $input['phone'] ?? '',
            'email' => $input['email'] ?? '',
            // 'roll_no' => $input['roll_no'] ?? '',
            'boarding_type' => $input['boarding_type'] ?? '',
            'caste_type' => $input['caste_type'] ?? '',
            'is_computer_option' => $input['is_computer_option'] ?? 0,
            'is_social_studies_option' => $input['is_social_studies_option'] ?? 0,
            'gender' => $input['gender'] ?? '',
            'aadhar_card_no' => $input['aadhar_card_no'] ?? '',
            'blood_group' => $input['blood_group'] ?? '',
            'religion' => $input['religion'] ?? '',
            'srn_no' => $input['srn_no'] ?? '',
            'child_id' => $input['child_id'] ?? '',
            'samagra_id' => $input['samagra_id'] ?? '',
            'birth_place' => $input['birth_place'] ?? '',
            'caste' => $input['caste'] ?? '',
            'sub_caste' => $input['sub_caste'] ?? '',
            'admission_class' => $input['admission_class'] ?? '',
            'mother_tongue' => $input['mother_tongue'] ?? '',
            'medical_condition' => $input['medical_condition'] ?? '',
            'notes' => $input['notes'] ?? '',
            'birth_date_at' => !empty($input['birth_date_at']) ? \Carbon\Carbon::parse($input['birth_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'height' => $input['height'] ?? '0.00',
            'weight' => $input['weight'] ?? '0.00',
            'present_address' => $input['present_address'] ?? '',
            'present_state' => $input['present_state'] ?? '',
            'present_city' => $input['present_city'] ?? '',
            'present_taluka' => $input['present_taluka'] ?? '',
            'present_district' => $input['present_district'] ?? '',
            'present_pin_code' => $input['present_pin_code'] ?? '',
            'permanent_address' => $input['permanent_address'] ?? '',
            'permanent_state' => $input['permanent_state'] ?? '',
            'permanent_city' => $input['permanent_city'] ?? '',
            'permanent_taluka' => $input['permanent_taluka'] ?? '',
            'permanent_district' => $input['permanent_district'] ?? '',
            'permanent_pin_code' => $input['permanent_pin_code'] ?? '',
            'is_physical_disabled' => $input['is_physical_disabled'] ?? 0,
            'is_economically_weaker' => $input['is_economically_weaker'] ?? 0,
            'is_spacial_child' => $input['is_spacial_child'] ?? 0,
            'prev_school_name' => $input['prev_school_name'] ?? '',
            'prev_school_class' => $input['prev_school_class'] ?? '',
            'prev_school_year' => $input['prev_school_year'] ?? '',
            'prev_school_note' => $input['prev_school_note'] ?? '',
            'prev_school_tc_no' => $input['prev_school_tc_no'] ?? 'Active',
            'document_attached' => !empty($input['document_attached']) ? json_encode($input['document_attached']) : null
        );

        $student = $this->studentRepository->update($id, $studentData);

        if (!empty($input['student_category_id'])) {
            $studentCategory = array(
                'category_id' => intval($input['category_id']) ?? null
            );
            $this->categoryRepository->updateStudent($input['student_category_id'], $studentCategory);
        }


        if (!empty($input['student_house_id'])) {
            $houseData = array(
                'house_id' => intval($input['house_id']) ?? ''
            );
            $this->studentHouseRepository->update($input['student_house_id'], $houseData);
        }

        if (!empty($input['student_bank_account_id'])) {
            // student bank
            $bankAccountData = array(
                'bank_id' => $input['bank_id'] ?? null,
                'account_name' => $input['account_name'] ?? '',
                'account_no' => $input['account_no'] ?? '',
                'account_type' => $input['account_type'] ?? '',
                'ifsc_code' => $input['ifsc_code'] ?? '',
                'micr_no' => $input['micr_no'] ?? '',
                'branch_name' => $input['branch_name'] ?? '',
                'status' => Status::ACTIVE
            );
            $this->bankAccountRepository->update($input['student_bank_account_id'], $bankAccountData);
        }


        // father
        if (!empty($input['father_id'] && $input['father_type'] == 'Father')) {
            $fatherData = array(
                'guardian_type' => 'Father',
                'first_name' => $input['f_first_name'] ?? '',
                'middle_name' => $input['f_middle_name'] ?? '',
                'last_name' => $input['f_last_name'] ?? '',
                'religion' => $input['f_religion'] ?? '',
                'relation' => null,
                'phone' => $input['f_phone'] ?? '',
                'email' => $input['f_email'] ?? '',
                'sms_phone' => $input['f_sms_phone'] ?? '',
                'highest_qualification' => $input['f_highest_qualification'] ?? '',
                'occupation' => $input['f_occupation'] ?? '',
                'income_per_year' => $input['f_income_per_year'] ?? '',
                'department' => $input['f_department'] ?? '',
                'designation' => $input['f_designation'] ?? '',
                'aadhar_card_no' => $input['f_aadhar_card_no'] ?? '',
                'pan_card_no' => $input['f_pan_card_no'] ?? '',
                'company_name' => $input['f_company_name'] ?? '',
                'city' => $input['f_city'] ?? '',
                'address' => $input['f_address'] ?? '',
                'office_address' => $input['f_office_address'] ?? '',
                'is_inactive' => 0,
                'status' => Status::ACTIVE
            );
            $this->guardianRepository->update($input['father_id'], $fatherData);
        }


        // mother
        if ($input['mother_id'] && $input['mother_type'] == 'Mother') {
            $motherData = array(
                'guardian_type' => 'Mother',
                'first_name' => $input['m_first_name'] ?? '',
                'middle_name' => $input['m_middle_name'] ?? '',
                'last_name' => $input['m_last_name'] ?? '',
                'religion' => $input['m_religion'] ?? '',
                'relation' => null,
                'phone' => $input['m_phone'] ?? '',
                'email' => $input['m_email'] ?? '',
                'sms_phone' => $input['m_sms_phone'] ?? '',
                'highest_qualification' => $input['m_highest_qualification'] ?? '',
                'occupation' => $input['m_occupation'] ?? '',
                'income_per_year' => $input['m_income_per_year'] ?? '',
                'department' => $input['m_department'] ?? '',
                'designation' => $input['m_designation'] ?? '',
                'aadhar_card_no' => $input['m_aadhar_card_no'] ?? '',
                'pan_card_no' => $input['m_pan_card_no'] ?? '',
                'company_name' => $input['m_company_name'] ?? '',
                'city' => $input['m_city'] ?? '',
                'address' => $input['m_address'] ?? '',
                'office_address' => $input['m_office_address'] ?? '',
                'is_inactive' => 0,
                'status' => Status::ACTIVE
            );
            $this->guardianRepository->update($input['mother_id'], $motherData);
        }

        //     // guardian
        if ($input['guardian_id'] && $input['guardian_type'] == 'Guardian') {
            $guardianData = array(
                'guardian_type' => 'Guardian',
                'first_name' => $input['g_first_name'] ?? '',
                'middle_name' => $input['g_middle_name'] ?? '',
                'last_name' => $input['g_last_name'] ?? '',
                'religion' => $input['g_religion'] ?? '',
                'relation' => $input['g_relation'],
                'phone' => $input['g_phone'] ?? '',
                'email' => $input['g_email'] ?? '',
                'sms_phone' => $input['g_sms_phone'] ?? '',
                'highest_qualification' => $input['g_highest_qualification'] ?? '',
                'occupation' => $input['g_occupation'] ?? '',
                'income_per_year' => $input['g_income_per_year'] ?? '',
                'department' => $input['g_department'] ?? '',
                'designation' => $input['g_designation'] ?? '',
                'aadhar_card_no' => $input['g_aadhar_card_no'] ?? '',
                'pan_card_no' => $input['g_pan_card_no'] ?? '',
                'company_name' => $input['g_company_name'] ?? '',
                'city' => $input['g_city'] ?? '',
                'address' => $input['g_address'] ?? '',
                'office_address' => $input['g_office_address'] ?? '',
                'is_inactive' => 0,
                'status' => Status::ACTIVE
            );
            $this->guardianRepository->update($input['guardian_id'], $guardianData);
        }

        // profile image
        if (!empty($request->file('student_profile_image'))) {

            $image_url = $this->_upload->uploadImage($request, 'student_profile_image', 'student_image');

            $dataImage = array(
                'school_id' => getUserSchoolId(),
                'imageable_type' => \App\Models\Student::class,
                'imageable_id' => $student['id'],
                'name' => 'student_profile_image',
                'path' => !empty($image_url) ? $image_url : NULL,
                'status' => Status::ACTIVE,
            );

            $image = $this->imageRepository->morphCreate($dataImage, $student['id']);
        }

        // Father Profile image
        if (!empty($request->file('student_father_profile_image'))) {

            $image_url = $this->_upload->uploadImage($request, 'student_father_profile_image', 'student_image');

            $dataImage = array(
                'school_id' => getUserSchoolId(),
                'imageable_type' => \App\Models\Student::class,
                'imageable_id' => $student['id'],
                'name' => 'student_father_profile_image',
                'path' => !empty($image_url) ? $image_url : NULL,
                'status' => Status::ACTIVE,
            );

            $image = $this->imageRepository->morphCreate($dataImage, $student['id']);
        }


        // Mother Profile
        if (!empty($request->file('student_mother_profile_image'))) {

            $image_url = $this->_upload->uploadImage($request, 'student_mother_profile_image', 'student_image');

            $dataImage = array(
                'school_id' => getUserSchoolId(),
                'imageable_type' => \App\Models\Student::class,
                'imageable_id' => $student['id'],
                'name' => 'student_mother_profile_image',
                'path' => !empty($image_url) ? $image_url : NULL,
                'status' => Status::ACTIVE,
            );

            $image = $this->imageRepository->morphCreate($dataImage, $student['id']);
        }

        // Guardian profile
        if (!empty($request->file('student_guardian_profile_image'))) {

            $image_url = $this->_upload->uploadImage($request, 'student_guardian_profile_image', 'student_image');

            $dataImage = array(
                'school_id' => getUserSchoolId(),
                'imageable_type' => \App\Models\Student::class,
                'imageable_id' => $student['id'],
                'name' => 'student_guardian_profile_image',
                'path' => !empty($image_url) ? $image_url : NULL,
                'status' => Status::ACTIVE,
            );

            $image = $this->imageRepository->morphCreate($dataImage, $student['id']);
        }

        if (!$student) {
            return redirect()->route('student.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('student.list')->with('message', 'Student updated successfully.');
    }

    /**
     * Display the student's details.
     */
    public function details()
    {
        $id = getStudentId();

        if (empty($id)) {
            return;
        }

        $student = $this->studentRepository->getStudentDetailsData($id);
        $transportData = [];
        $subjectsData = [];

        if ($student != null) {
            $student->loadMissing(['latestClassroomStudent.classroom', 'guardians']);

            $classroomId = $student?->latestClassroomStudent?->classroom?->id ?? $student?->classroom_id;

            // subjects
            $classroomSubjects = $this->classroomSubjectRepository->getByClassroomId($classroomId);

            if (!empty($classroomSubjects)) {
                foreach ($classroomSubjects as $classroomSubject) {
                    if (empty($subjectsData[$classroomSubject?->subject_id])) {
                        $subjectsData[$classroomSubject?->subject_id] = [
                            'name' => $classroomSubject?->subject?->title,
                            'type' => $classroomSubject?->type,
                            'teacher_name' => "",
                        ];
                    }
                }
            }

            $studentSubjects = $this->studentSubjectRepository->getByClassroomIdAndStudentId($classroomId, $student->id);

            if (!empty($studentSubjects)) {
                foreach ($studentSubjects as $studentSubject) {
                    if (empty($subjectsData[$classroomSubject?->subject_id])) {
                        $subjectsData[$studentSubject?->subject_id] = [
                            'name' => $studentSubject?->subject?->title,
                            'type' => "Optional",
                            'teacher_name' => "",
                        ];
                    }
                }
            }

            // transport
            $transportDetails = $this->transportRepository->getCurrentAllocateTransportByStudentIdAndClassroomId($student->id, $classroomId);

            if (!empty($transportDetails)) {
                $transportDetails->load(['transportRoute.vehicle.driver', 'transportRoute.vehicle.conductor', 'transportStoppage']);

                $transportData = [
                    'vehicle_number' => $transportDetails?->transportRoute?->vehicle?->vehicle_number,
                    'route_name' => $transportDetails?->transportRoute?->name,
                    'stoppage' => $transportDetails?->transportStoppage?->stoppage,
                    'driver_name' => $transportDetails?->transportRoute?->vehicle?->driver?->first_name . ' ' . $transportDetails?->transportRoute?->vehicle?->driver?->last_name,
                    'driver_mobile' => $transportDetails?->transportRoute?->vehicle?->driver?->contact,
                    'conductor_name' => $transportDetails?->transportRoute?->vehicle?->conductor?->first_name . ' ' . $transportDetails?->transportRoute?->vehicle?->conductor?->last_name,
                    'conductor_mobile' => $transportDetails?->transportRoute?->vehicle?->conductor?->contact,
                    'transport_fee' => $transportDetails?->amount,
                ];
            }
        }

        $catEmpData = $this->categoryRepository->getActiveNameAndIdOfEmployment();
        $countryData = $this->countryRepository->getActiveNameAndId();
        $stateData = $this->stateRepository->getActiveNameAndId();

        $countries = $countryData->map(fn ($country) => ['id' => $country->id, 'title' => $country->name])->all();
        $catEmps = $catEmpData->map(fn ($catEmp) => ['id' => $catEmp->id, 'title' => $catEmp->title])->all();
        $states = $stateData->map(fn ($state) => ['id' => $state->id, 'title' => $state->name])->all();

        //guardians
        $fatherData = array();
        $motherData = array();
        $guardianData = array();

        if (!empty($student->guardians)) {
            foreach ($student->guardians as $guardian) {

                if ($guardian['guardian_type'] === 'Father') {
                    $fatherData = $guardian;
                } elseif ($guardian['guardian_type'] === 'Mother') {
                    $motherData = $guardian;
                } else {
                    $guardianData = $guardian;
                }
            }
        }

        $subCasteType = SubCasteType::cases();
        $subCasteArr = array();
        foreach ($subCasteType as $scType) {
            array_push($subCasteArr, ['id' => $scType->value, 'title' => $scType->value]);
        }

        $accountType = AccountType::cases();
        $accountArr = array();
        foreach ($accountType as $aType) {
            array_push($accountArr, ['id' => $aType->value, 'title' => $aType->value]);
        }

        return Inertia::render('StudentProfile/Details', [
            // 'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            // 'status' => session('status'),
            'student' => $student,
            'fatherData' => $fatherData,
            'motherData' => $motherData,
            'guardianData' => $guardianData,
            'countries' => $countries,
            'catEmps' => $catEmps,
            'subCasteArr' => $subCasteArr,
            'accountArr' => $accountArr,
            'states' => $states,
            'transportData' => $transportData,
            'subjectsData' => $subjectsData,
        ]);
    }

    /**
     * Display updateDetails form
     */
    public function updateDetails(Request $request): Response
    {
        $students = $this->studentRepository->getListForUpdated();
        $housesData = $this->houseRepository->getActiveNameAndId();
        $categoryData = $this->categoryRepository->getActiveNameAndId();


        $houses = $housesData->map(fn ($house) => ['id' => $house->id, 'title' => $house->name])->all();
        $categories = $categoryData->map(fn ($category) => ['id' => $category->id, 'title' => $category->title])->all();

        $genderType = Gender::cases();
        $genderArr = array();
        foreach ($genderType as $gType) {
            array_push($genderArr, ['id' => $gType->value, 'title' => $gType->value]);
        }

        return Inertia::render('StudentProfile/UpdateDetails', [
            'students' => $students,
            'genders' => $genderArr,
            'houses' => $houses,
            'categories' => $categories,
        ]);
    }


    /**
     * updateDetailsSave
     */
    public function updateDetailsSave(Request $request)
    {
        $data = $request->all();
        $filteredData = array_filter($data, function ($entry) {
            return $entry['is_checked'] === true;
        });
        // dd( $filteredData);
        if (empty($filteredData)) {
            return redirect()->route('student.update_details')->with('error', 'Select at least one row to update.');
        }
        if (!empty($filteredData)) {
            foreach ($filteredData as $fData) {
                //student data
                if (!empty($fData['id'])) {
                    $studentDataArray = [
                        'gender' => $fData['gender'],
                        'aadhar_card_no' => $fData['aadhar_card_no'],
                        'birth_date_at' => !empty($fData['birth_date_at']) ? \Carbon\Carbon::parse($fData['birth_date_at'])->format('Y-m-d') : date('Y-m-d'),
                        'admission_date_at' => !empty($fData['admission_date_at']) ? \Carbon\Carbon::parse($fData['admission_date_at'])->format('Y-m-d') : date('Y-m-d'),
                        'remark' => $fData['remark'] ?? null,
                    ];
                    $this->studentRepository->update($fData['id'], $studentDataArray);
                }

                // category data
                if (!empty($fData['student_category_id']) && is_numeric($fData['category_id'])) {
                    $catDataArray = [
                        'category_id' => $fData['category_id'],
                    ];
                    $this->categoryRepository->updateStudent($fData['student_category_id'], $catDataArray);
                }

                // house data
                if (!empty($fData['student_house_id']) && is_numeric($fData['house_id'])) {
                    $houseDataArray = [
                        'house_id' => $fData['house_id'],
                    ];
                    $this->studentHouseRepository->update($fData['student_house_id'], $houseDataArray);
                }

                // house data
                if (!empty($fData['student_father_id'])) {
                    $fatherDataArray = [
                        'phone' => $fData['father_phone'],
                        'sms_phone' => $fData['father_sms_phone'],
                    ];
                    $this->guardianRepository->update($fData['student_father_id'], $fatherDataArray);
                }
            }
            return redirect()->route('student.update_details')->with('message', 'Student updated successfully.');
        }
    }
}
