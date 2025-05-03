<?php

namespace App\Http\Controllers;


use Mpdf\Tag\Em;
use Mpdf\Tag\Tr;
use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Gender;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\UserRole;
use App\Models\Enquery;
use App\Models\Enquiry;

use App\Enums\CasteType;
use App\Enums\AlumniType;
use App\Enums\AccountType;
use App\Enums\EnquiryType;
use App\Enums\PaymentMode;
use App\Enums\GuardianType;
use App\Enums\SubCasteType;
use App\Enums\EnquiryStatus;
use App\Enums\ReferenceType;
use App\Enums\StaffRoleType;
use App\Enums\StudentStatus;
use Illuminate\Http\Request;
use App\Enums\AdmissionStatus;
use App\Enums\RegistrationMode;
use App\Enums\EnquiryStatusType;
use App\Enums\RegistrationStatus;
use App\Enums\AdmissionExamStatus;
use App\Enums\CustomFieldDataType;
use App\Enums\ScholarBoardingType;
use Illuminate\Support\Facades\DB;
use App\Enums\StudentStaffFieldType;
use App\Repositories\IFeeRepository;
use App\Repositories\UserRepository;
use App\Enums\EmploymentCategoryType;
use App\Http\Requests\StudentRequest;
use App\Repositories\IBankRepository;
use App\Repositories\IUserRepository;
use Illuminate\Http\RedirectResponse;
use App\Models\AdmissionExamEnquiries;
use App\Repositories\IHouseRepository;
use App\Repositories\IImageRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\IStateRepository;
use App\Repositories\ISchoolRepository;
use App\Repositories\StudentRepository;
use App\Repositories\GuardianRepository;
use App\Repositories\ICountryRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\AdmissionRepository;
use App\Repositories\ClassroomRepository;
use App\Repositories\ICategoryRepository;
use App\Repositories\IGuardianRepository;
use App\Repositories\IReligionRepository;
use App\Repositories\IAdmissionRepository;
use App\Repositories\IClassroomRepository;
use App\Http\Requests\AdmissionExamRequest;
use App\Repositories\IBloodGroupRepository;
use App\Repositories\IBankAccountRepository;
use App\Repositories\ICustomFieldRepository;
use App\Http\Requests\EnquiryFollowUpRequest;
use App\Repositories\IStudentHouseRepository;
use App\Http\Requests\AdmissionEnquiryRequest;
use App\Http\Middleware\RedirectIfAuthenticated;
use App\Http\Requests\AdmissionExamStatusRequest;
use App\Http\Requests\EnquiryStatusUpdateRequest;
use App\Repositories\IFeePaymentMethodRepository;
use App\Repositories\IStudentAdmissionRepository;
use App\Http\Requests\AdmissionInqueryRegistrationRequest;

class AdmissionEnqueryRegistrationController extends Controller
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
        private IStaffRepository $staffRepository,
        private IFeeRepository $feeRepository,
        private IFeePaymentMethodRepository $feePaymentMethodRepository,
        private ICustomFieldRepository $customFieldRepository,
    ) {
        $this->_upload = new UploadFileController();
        $this->middleware('permission:view enquiry', ['only' => ['enquiryReport']]);
        $this->middleware('permission:add enquiry', ['only' => [
            'enquiryForm',
            'enquiryFollows',
            'save',
            'admissionExam',
            'createRegistration',
            'pushEnquiryToRegistrationSave',
            'registrationSave',
            'enquiryStudentSave'
        ]]);
        $this->middleware('permission:edit enquiry', ['only' => [
            'edit',
            'switchEnquiryToReg',
            'editRegistration',
            'update',
            'updateEnquiryStatus',
            'updateAdmissionExamStatus',
            'updateRegistration'
        ]]);
        $this->middleware('permission:delete enquiry', ['only' => ['destroy']]);
    }

    /**
     * Display the enquiry form.
     */
    public function enquiryForm(Request $request): Response
    {
        $admissionSourceData = $this->admissionRepository->getSchoolWiseActiveAllEnquerySource();
        $admissionSources = $admissionSourceData->map(fn($admissionSource) => ['id' => $admissionSource->id, 'title' => $admissionSource->title])->all();

        $userData = $this->userRepository->getActiveAdminUser();
        $users = $userData->map(function ($user) {
            $fullName = $user?->first_name . " " . $user?->middle_name . " " . $user?->last_name;

            return [
                'id' => $user->id,
                'title' => $fullName
            ];
        })->all();

        $stateData = $this->admissionRepository->getActiveState();
        $states = $stateData->map(fn($state) => ['id' => $state->id, 'title' => $state->name])->all();

        $academicYears = getAcademicYearsAll();

        // $classes = $this->classroomRepository->getActiveClassNameAll();

        // ScholarBoardingType
        $ScholarBoardingTypeData = ScholarBoardingType::cases();
        $ScholarBoardingType = array();
        foreach ($ScholarBoardingTypeData as $dt) {
            array_push($ScholarBoardingType, ['id' => $dt->value, 'title' => $dt->value]);
        }
        // gender Type
        $genderTypeData = Gender::cases();
        $genderType = array();
        foreach ($genderTypeData as $dt) {
            array_push($genderType, ['id' => $dt->value, 'title' => $dt->value]);
        }

        $totalEnquiryCount = $this->admissionRepository->totalEnquiryCount();

        $classes = [];

        $academicYearId = getAcademicYearId();

        if ($request->isMethod('POST')) {
            $academicYearId = $request->academic_year_id ?? null;
        }

        if (!empty($academicYearId)) {
            $admissionProcess = $this->admissionRepository->getAdmissionByAcademicYearId($academicYearId);

            if ($admissionProcess != null) {
                $classes = $this->classroomRepository->getActiveClassNameAllByAcademicYearId($academicYearId);
            }
        }

        return Inertia::render('Admission/EnquiryForm', [
            'admissionSources' => $admissionSources,
            'users' => $users,
            'states' => $states,
            'ScholarBoardingType' => $ScholarBoardingType,
            'academicYears' => $academicYears,
            'genderType' => $genderType,
            'classes' => $classes,
            'totalEnquiryCount' => $totalEnquiryCount,
            'academicYearId' => $academicYearId,
        ]);
    }

    /**
     * Display the enquiry form.
     */
    public function enquiryFormOld(Request $request): Response
    {
        $admissionSourceData = $this->admissionRepository->getActiveTitleAndId();
        $admissionSources = $admissionSourceData->map(fn($admissionSource) => ['id' => $admissionSource->id, 'title' => $admissionSource->title])->all();

        $userData = $this->userRepository->getActiveUserNameAndId();
        $users = $userData->map(fn($user) => ['id' => $user->id, 'title' => $user->username])->all();

        $stateData = $this->admissionRepository->getActiveState();
        $states = $stateData->map(fn($state) => ['id' => $state->id, 'title' => $state->name])->all();

        $academicYearData = $this->admissionRepository->findAcademicYear();
        $academicYears = $academicYearData->map(fn($academicYear) => ['id' => $academicYear->id, 'title' => $academicYear->academic_session])->all();

        $classes = $this->classroomRepository->getActiveClassNameAll();

        // ScholarBoardingType
        $ScholarBoardingTypeData = ScholarBoardingType::cases();
        $ScholarBoardingType = array();
        foreach ($ScholarBoardingTypeData as $dt) {
            array_push($ScholarBoardingType, ['id' => $dt->value, 'title' => $dt->value]);
        }
        // gender Type
        $genderTypeData = Gender::cases();
        $genderType = array();
        foreach ($genderTypeData as $dt) {
            array_push($genderType, ['id' => $dt->value, 'title' => $dt->value]);
        }

        return Inertia::render('Admission/EnquiryForm', [
            'admissionSources' => $admissionSources,
            'users' => $users,
            'states' => $states,
            'ScholarBoardingType' => $ScholarBoardingType,
            'academicYears' => $academicYears,
            'genderType' => $genderType,
            'classes' => $classes,
        ]);
    }

    /*
    * Enquiry Follow Up
    */
    public function enquiryFollows(EnquiryFollowUpRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $is_next_action = $input['is_next_action'] ?? false;

            if ($is_next_action) {
                $dataArray = [
                    [
                        'school_id' => getUserSchoolId(),
                        'enquiry_id' => !empty($input['enquiry_id']) ? intval($input['enquiry_id']) : null,
                        'activity' => !empty($input['activity']) ? $input['activity'] : "",
                        'activity_date_at' => !empty($input['activity_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['activity_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                        'follow_date_at' => !empty($input['follow_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['follow_date_at'])->timezone(getSchoolTimeZone())->toDateString() : null,
                        // 'next_action' => !empty($input['next_action']) ? $input['next_action'] : "",
                        // 'is_next_action' => $is_next_action,
                        'status' => Status::ACTIVE,
                        'created_by' => auth()->user()->id,
                    ],
                    [
                        'school_id' => getUserSchoolId(),
                        'enquiry_id' => !empty($input['enquiry_id']) ? intval($input['enquiry_id']) : null,
                        'activity' => !empty($input['next_action']) ? $input['next_action'] : "",
                        'activity_date_at' => !empty($input['activity_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['activity_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                        'follow_date_at' => !empty($input['follow_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['follow_date_at'])->timezone(getSchoolTimeZone())->toDateString() : null,
                        // 'next_action' => !empty($input['next_action']) ? $input['next_action'] : "",
                        // 'is_next_action' => $is_next_action,
                        'status' => Status::ACTIVE,
                        'created_by' => auth()->user()->id,
                    ],
                ];

                foreach ($dataArray as $data) {
                    $this->admissionRepository->createEnquiryFollows($data);
                }
            } else {
                $dataArray = array(
                    'school_id' => getUserSchoolId(),
                    'enquiry_id' => !empty($input['enquiry_id']) ? intval($input['enquiry_id']) : null,
                    'activity' => !empty($input['activity']) ? $input['activity'] : "",
                    'activity_date_at' => !empty($input['activity_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['activity_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                    'follow_date_at' => !empty($input['follow_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['follow_date_at'])->timezone(getSchoolTimeZone())->toDateString() : null,
                    // 'next_action' => !empty($input['next_action']) ? $input['next_action'] : "",
                    // 'is_next_action' => $is_next_action,
                    'status' => Status::ACTIVE,
                    'created_by' => auth()->user()->id,
                );

                $this->admissionRepository->createEnquiryFollows($dataArray);
            }

            DB::commit();

            return redirect()->route('admission_enquery_reg.enquiry_report')->with('message', 'Your Enquery Follow Up successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    // Follow up
    public function enquiryFollowsOld(Request $request)
    {
        $input = $request->validate([
            'activity' => ['required', 'string'],
            'enquiry_id' => ['required'],
            'activity_date_at' => ['required'],
            'follow_date_at' => ['required'],
            'next_action' => ['required', 'string'],
            'is_next_action' => ['required'],
            'activity' => ['required', 'string'],
        ]);

        $is_next_action = $request->has('is_next_action') ? true : false;

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'enquiry_id' => !empty($input['enquiry_id']) ? intval($input['enquiry_id']) : null,
            'activity' => !empty($input['activity']) ? $input['activity'] : "",
            'activity_date_at' => !empty($input['activity_date_at']) ? Carbon::parse($input['activity_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'follow_date_at' => !empty($input['follow_date_at']) ? Carbon::parse($input['follow_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'next_action' => !empty($input['next_action']) ? $input['next_action'] : "",
            'is_next_action' => $is_next_action,
            'status' => Status::ACTIVE,
        );

        $enqueryFollows = $this->admissionRepository->createEnquiryFollows($dataArray);

        if (!$enqueryFollows) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        } else {
            return redirect()->route('admission_enquery_reg.enquiry_report')->with('message', 'Your Enquery Follow Up successfully.');
        }
    }

    public function save(AdmissionInqueryRegistrationRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                // 'classroom_id' => !empty($input['classroom_id']) ? intval($input['classroom_id']) : null,
                'class_name_id' => !empty($input['class_name_id']) ? intval($input['class_name_id']) : null,
                'category_id' => !empty($input['category_id']) ? intval($input['category_id']) : null,
                'user_id' => !empty($input['user_id']) ? intval($input['user_id']) : null,
                'source_id' => !empty($input['source_id']) ? intval($input['source_id']) : null,
                // 'academic_year_id' => !empty($input['academic_year_id']) ? intval($input['academic_year_id']) : null,
                'admission_academic_year_id' => !empty($input['academic_year_id']) ? intval($input['academic_year_id']) : null,
                'state_id' => !empty($input['state_id']) ? intval($input['state_id']) : null,
                'employment_category_id' => !empty($input['employment_category_id']) ? intval($input['employment_category_id']) : null,
                'bank_account_id' => !empty($input['bank_account_id']) ? intval($input['bank_account_id']) : null,
                'bank_id' => !empty($input['bank_id']) ? intval($input['bank_id']) : null,
                'staff_id' => !empty($input['staff_id']) ? intval($input['staff_id']) : null,
                'enquiry_date_at' => !empty($input['enquiry_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['enquiry_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'birth_date_at' => !empty($input['birth_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['birth_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'contact_name' => !empty($input['contact_name']) ? $input['contact_name'] : null,
                'enquiry_detail' => !empty($input['enquiry_detail']) ? $input['enquiry_detail'] : null,
                'contact_number' => !empty($input['contact_number']) ? $input['contact_number'] : null,
                'contact_email' => !empty($input['contact_email']) ? $input['contact_email'] : null,
                'person_to_meet' => !empty($input['person_to_meet']) ? $input['person_to_meet'] : null,
                'in_time' =>  !empty($input['in_time']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['in_time'])->timezone(getSchoolTimeZone())->format('H:i:s') : date('H:i:s'),
                'refer_contact_person' => !empty($input['refer_contact_person']) ? $input['refer_contact_person'] : null,
                // 'refer_person' => !empty($input['refer_person']) ? $input['refer_person'] : null,
                'refer_mobile' => !empty($input['refer_mobile']) ? $input['refer_mobile'] : null,
                'enquiry_address' => !empty($input['enquiry_address']) ? $input['enquiry_address'] : null,
                'reference_by' => !empty($input['reference_by']) ? trim($input['reference_by']) : null,
                'boarding_scholar' => !empty($input['boarding_scholar']) ? trim($input['boarding_scholar']) : null,
                'first_name' => !empty($input['first_name']) ? trim($input['first_name']) : null,
                'middle_name' => !empty($input['middle_name']) ? trim($input['middle_name']) : null,
                'last_name' => !empty($input['last_name']) ? trim($input['last_name']) : null,
                'gender' => !empty($input['gender']) ? trim($input['gender']) : null,
                'date_of_birth' => !empty($input['date_of_birth']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['date_of_birth'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'aadhar_card_no' => !empty($input['aadhar_card_no']) ? trim($input['aadhar_card_no']) : null,
                'blood_group' => !empty($input['blood_group']) ? trim($input['blood_group']) : null,
                'religion' => !empty($input['religion']) ? trim($input['religion']) : null,
                'country_id' => !empty($input['country_id']) ? trim($input['country_id']) : null,
                'date_of_registration' => !empty($input['date_of_registration']) ? trim($input['date_of_registration']) : null,
                'form_no' => !empty($input['form_no']) ? trim($input['form_no']) : null,
                'srn_no' => !empty($input['srn_no']) ? trim($input['srn_no']) : null,
                'child_id' => !empty($input['child_id']) ? trim($input['child_id']) : null,
                'samagra_id' => !empty($input['samagra_id']) ? trim($input['samagra_id']) : null,
                'mother_tongue' => !empty($input['mother_tongue']) ? trim($input['mother_tongue']) : null,
                'medical_condition' => !empty($input['medical_condition']) ? trim($input['medical_condition']) : null,
                'is_transport_availed' => !empty($input['is_transport_availed']) ? trim($input['is_transport_availed']) : null,
                'is_physically_disabled' => !empty($input['is_physically_disabled']) ? trim($input['is_physically_disabled']) : null,
                'is_special_child' => !empty($input['is_special_child']) ? trim($input['is_special_child']) : null,
                'conomically_weaker_section' => !empty($input['conomically_weaker_section']) ? trim($input['conomically_weaker_section']) : null,
                'student_image' => !empty($input['student_image']) ? trim($input['student_image']) : null,
                'father_image' => !empty($input['father_image']) ? trim($input['father_image']) : null,
                'mother_image' => !empty($input['mother_image']) ? trim($input['mother_image']) : null,
                'guardian_image' => !empty($input['guardian_image']) ? trim($input['guardian_image']) : null,
                'school_name' => !empty($input['school_name']) ? trim($input['school_name']) : null,
                'school_class' => !empty($input['school_class']) ? trim($input['school_class']) : null,
                'school_year' => !empty($input['school_year']) ? trim($input['school_year']) : null,
                'tc_no' => !empty($input['tc_no']) ? trim($input['tc_no']) : null,
                'referred_by' => !empty($input['referred_by']) ? trim($input['referred_by']) : null,
                'is_have_sibling' => !empty($input['is_have_sibling']) ? trim($input['is_have_sibling']) : null,
                'present_address' => !empty($input['present_address']) ? $input['present_address'] : null,
                'present_state' => !empty($input['present_state']) ? $input['present_state'] : null,
                'landmark' => !empty($input['landmark']) ? $input['landmark'] : null,
                // 'boarding_type' => !empty($input['boarding_type']) ? $input['boarding_type'] : null,
                'city' => !empty($input['city']) ? $input['city'] : null,
                'district' => !empty($input['district']) ? $input['district'] : null,
                'taluka' => !empty($input['taluka']) ? trim($input['statalukate_id']) : null,
                'pin_code' => !empty($input['pin_code']) ? trim($input['pin_code']) : null,
                'permanent_address' => !empty($input['permanent_address']) ? trim($input['permanent_address']) : null,
                'permanent_state' => !empty($input['permanent_state']) ? trim($input['permanent_state']) : null,
                'permanent_city' => !empty($input['permanent_city']) ? trim($input['permanent_city']) : null,
                'permanent_taluka' => !empty($input['permanent_taluka']) ? trim($input['permanent_taluka']) : null,
                'permanent_district' => !empty($input['permanent_district']) ? trim($input['permanent_district']) : null,
                'permanent_pin_code' => !empty($input['permanent_pin_code']) ? trim($input['permanent_pin_code']) : null,
                'sibling_name' => !empty($input['sibling_name']) ? trim($input['sibling_name']) : null,
                'sibling_std' => !empty($input['sibling_std']) ? trim($input['sibling_std']) : null,
                'sibling_adm_no' => !empty($input['sibling_adm_no']) ? trim($input['sibling_adm_no']) : null,
                'sibling_year' => !empty($input['sibling_year']) ? trim($input['sibling_year']) : null,
                'reference_by_parent' => !empty($input['reference_by_parent']) ? trim($input['reference_by_parent']) : null,
                'enquiry_type' => EnquiryType::ENQUIRY,
                'enquiry_status' => EnquiryStatus::NEW,
                'registration_status' => RegistrationStatus::NEW,
                'is_enquiry' => true,
                'status' => Status::ACTIVE,
            );

            $enquery = $this->admissionRepository->createEnquiry($dataArray);

            if (!empty($enquery['id'])) {
                // Save enquiry Parents
                $dataParentArray = array(
                    'school_id' => getUserSchoolId(),
                    'enquiry_id' => $enquery['id'],
                    'father_first_name' => !empty($input['father_first_name']) ? trim($input['father_first_name']) : null,
                    'father_middle_name' => !empty($input['father_middle_name']) ? trim($input['father_middle_name']) : null,
                    'father_last_name' => !empty($input['father_last_name']) ? trim($input['father_last_name']) : null,
                    'father_email' => !empty($input['father_email']) ? trim($input['father_email']) : null,
                    'father_mobile' => !empty($input['father_mobile']) ? trim($input['father_mobile']) : null,
                    'father_sms_number' => !empty($input['father_sms_number']) ? trim($input['father_sms_number']) : null,
                    'father_occupation' => !empty($input['father_occupation']) ? trim($input['father_occupation']) : null,
                    'father_highest_qualification' => !empty($input['father_highest_qualification']) ? trim($input['father_highest_qualification']) : null,
                    'father_aadhar_card_no' => !empty($input['father_aadhar_card_no']) ? trim($input['father_aadhar_card_no']) : null,
                    'father_whatsapp_no' => !empty($input['father_whatsapp_no']) ? trim($input['father_whatsapp_no']) : null,
                    'father_income_per_year' => !empty($input['father_income_per_year']) ? trim($input['father_income_per_year']) : null,
                    'father_department' => !empty($input['father_department']) ? trim($input['father_department']) : null,
                    'father_designation' => !empty($input['father_designation']) ? trim($input['father_designation']) : null,
                    'father_pan_card_no' => !empty($input['father_pan_card_no']) ? trim($input['father_pan_card_no']) : null,
                    'father_company_name' => !empty($input['father_company_name']) ? trim($input['father_company_name']) : null,
                    'father_office_address' => !empty($input['father_office_address']) ? trim($input['father_office_address']) : null,
                    'mother_first_name' => !empty($input['mother_first_name']) ? trim($input['mother_first_name']) : null,
                    'mother_middle_name' => !empty($input['mother_middle_name']) ? trim($input['mother_middle_name']) : null,
                    'mother_last_name' => !empty($input['mother_last_name']) ? trim($input['mother_last_name']) : null,
                    'mother_email' => !empty($input['mother_email']) ? trim($input['mother_email']) : null,
                    'mother_mobile' => !empty($input['mother_mobile']) ? trim($input['mother_mobile']) : null,
                    'mother_highest_qualification' => !empty($input['mother_highest_qualification']) ? trim($input['mother_highest_qualification']) : null,
                    'mother_occupation' => !empty($input['mother_occupation']) ? trim($input['mother_occupation']) : null,
                    'mother_income_per_year' => !empty($input['mother_income_per_year']) ? trim($input['mother_income_per_year']) : null,
                    'mother_department' => !empty($input['mother_department']) ? trim($input['mother_department']) : null,
                    'mother_designation' => !empty($input['mother_designation']) ? trim($input['mother_designation']) : null,
                    'mother_aadhar_card_no' => !empty($input['mother_aadhar_card_no']) ? trim($input['mother_aadhar_card_no']) : null,
                    'mother_pan_card_no' => !empty($input['mother_pan_card_no']) ? trim($input['mother_pan_card_no']) : null,
                    'mother_company_name' => !empty($input['mother_company_name']) ? trim($input['mother_company_name']) : null,
                    'mother_office_address' => !empty($input['mother_office_address']) ? trim($input['mother_office_address']) : null,
                    'status' => Status::ACTIVE,
                );

                $this->admissionRepository->createEnquiryParents($dataParentArray);
            }

            DB::commit();

            return redirect()->route('admission_enquery_reg.enquiry_report')->with('message', 'Your Enquery submited successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    public function saveOld(AdmissionInqueryRegistrationRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'classroom_id' => !empty($input['classroom_id']) ? intval($input['classroom_id']) : null,
            'category_id' => !empty($input['category_id']) ? intval($input['category_id']) : null,
            'user_id' => !empty($input['user_id']) ? intval($input['user_id']) : null,
            'source_id' => !empty($input['source_id']) ? intval($input['source_id']) : null,
            'academic_year_id' => !empty($input['academic_year_id']) ? intval($input['academic_year_id']) : null,
            'state_id' => !empty($input['state_id']) ? intval($input['state_id']) : null,
            'employment_category_id' => !empty($input['employment_category_id']) ? intval($input['employment_category_id']) : null,
            'bank_account_id' => !empty($input['bank_account_id']) ? intval($input['bank_account_id']) : null,
            'bank_id' => !empty($input['bank_id']) ? intval($input['bank_id']) : null,
            'staff_id' => !empty($input['staff_id']) ? intval($input['staff_id']) : null,
            'enquiry_date_at' => !empty($input['enquiry_date_at']) ? \Carbon\Carbon::parse($input['enquiry_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'birth_date_at' => !empty($input['birth_date_at']) ? \Carbon\Carbon::parse($input['birth_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'contact_name' => !empty($input['contact_name']) ? $input['contact_name'] : null,
            'enquiry_detail' => !empty($input['enquiry_detail']) ? $input['enquiry_detail'] : null,
            'contact_number' => !empty($input['contact_number']) ? $input['contact_number'] : null,
            'contact_email' => !empty($input['contact_email']) ? $input['contact_email'] : null,
            'person_to_meet' => !empty($input['person_to_meet']) ? $input['person_to_meet'] : null,
            'in_time' =>  !empty($input['in_time']) ? \Carbon\Carbon::parse($input['in_time'])->format('H:i:s') : date('H:i:s'),
            'refer_contact_person' => !empty($input['refer_contact_person']) ? $input['refer_contact_person'] : null,
            'refer_person' => !empty($input['refer_person']) ? $input['refer_person'] : null,
            'refer_mobile' => !empty($input['refer_mobile']) ? $input['refer_mobile'] : null,
            'enquiry_address' => !empty($input['enquiry_address']) ? $input['enquiry_address'] : null,
            'reference_by' => !empty($input['reference_by']) ? trim($input['reference_by']) : null,
            'boarding_scholar' => !empty($input['boarding_scholar']) ? trim($input['boarding_scholar']) : null,
            'first_name' => !empty($input['first_name']) ? trim($input['first_name']) : null,
            'middle_name' => !empty($input['middle_name']) ? trim($input['middle_name']) : null,
            'last_name' => !empty($input['last_name']) ? trim($input['last_name']) : null,
            'gender' => !empty($input['gender']) ? trim($input['gender']) : null,
            'date_of_birth' => !empty($input['date_of_birth']) ? \Carbon\Carbon::parse($input['date_of_birth'])->format('Y-m-d') : date('Y-m-d'),
            'aadhar_card_no' => !empty($input['aadhar_card_no']) ? trim($input['aadhar_card_no']) : null,
            'blood_group' => !empty($input['blood_group']) ? trim($input['blood_group']) : null,
            'religion' => !empty($input['religion']) ? trim($input['religion']) : null,
            'country_id' => !empty($input['country_id']) ? trim($input['country_id']) : null,
            'date_of_registration' => !empty($input['date_of_registration']) ? trim($input['date_of_registration']) : null,
            'form_no' => !empty($input['form_no']) ? trim($input['form_no']) : null,
            'srn_no' => !empty($input['srn_no']) ? trim($input['srn_no']) : null,
            'child_id' => !empty($input['child_id']) ? trim($input['child_id']) : null,
            'samagra_id' => !empty($input['samagra_id']) ? trim($input['samagra_id']) : null,
            'mother_tongue' => !empty($input['mother_tongue']) ? trim($input['mother_tongue']) : null,
            'medical_condition' => !empty($input['medical_condition']) ? trim($input['medical_condition']) : null,
            'is_transport_availed' => !empty($input['is_transport_availed']) ? trim($input['is_transport_availed']) : null,
            'is_physically_disabled' => !empty($input['is_physically_disabled']) ? trim($input['is_physically_disabled']) : null,
            'is_special_child' => !empty($input['is_special_child']) ? trim($input['is_special_child']) : null,
            'conomically_weaker_section' => !empty($input['conomically_weaker_section']) ? trim($input['conomically_weaker_section']) : null,
            'student_image' => !empty($input['student_image']) ? trim($input['student_image']) : null,
            'father_image' => !empty($input['father_image']) ? trim($input['father_image']) : null,
            'mother_image' => !empty($input['mother_image']) ? trim($input['mother_image']) : null,
            'guardian_image' => !empty($input['guardian_image']) ? trim($input['guardian_image']) : null,
            'school_name' => !empty($input['school_name']) ? trim($input['school_name']) : null,
            'school_class' => !empty($input['school_class']) ? trim($input['school_class']) : null,
            'school_year' => !empty($input['school_year']) ? trim($input['school_year']) : null,
            'tc_no' => !empty($input['tc_no']) ? trim($input['tc_no']) : null,
            'referred_by' => !empty($input['referred_by']) ? trim($input['referred_by']) : null,
            'is_have_sibling' => !empty($input['is_have_sibling']) ? trim($input['is_have_sibling']) : null,
            'present_address' => !empty($input['present_address']) ? $input['present_address'] : null,
            'present_state' => !empty($input['present_state']) ? $input['present_state'] : null,
            'landmark' => !empty($input['landmark']) ? $input['landmark'] : null,
            'boarding_type' => !empty($input['boarding_type']) ? $input['boarding_type'] : null,
            'city' => !empty($input['city']) ? $input['city'] : null,
            'district' => !empty($input['district']) ? $input['district'] : null,
            'taluka' => !empty($input['taluka']) ? trim($input['statalukate_id']) : null,
            'pin_code' => !empty($input['pin_code']) ? trim($input['pin_code']) : null,
            'permanent_address' => !empty($input['permanent_address']) ? trim($input['permanent_address']) : null,
            'permanent_state' => !empty($input['permanent_state']) ? trim($input['permanent_state']) : null,
            'permanent_city' => !empty($input['permanent_city']) ? trim($input['permanent_city']) : null,
            'permanent_taluka' => !empty($input['permanent_taluka']) ? trim($input['permanent_taluka']) : null,
            'permanent_district' => !empty($input['permanent_district']) ? trim($input['permanent_district']) : null,
            'permanent_pin_code' => !empty($input['permanent_pin_code']) ? trim($input['permanent_pin_code']) : null,
            'sibling_name' => !empty($input['sibling_name']) ? trim($input['sibling_name']) : null,
            'sibling_std' => !empty($input['sibling_std']) ? trim($input['sibling_std']) : null,
            'sibling_adm_no' => !empty($input['sibling_adm_no']) ? trim($input['sibling_adm_no']) : null,
            'sibling_year' => !empty($input['sibling_year']) ? trim($input['sibling_year']) : null,
            'reference_by_parent' => !empty($input['reference_by_parent']) ? trim($input['reference_by_parent']) : null,
            'enquiry_type' => EnquiryType::ENQUIRY,
            'enquiry_status' => EnquiryStatus::NEW,
            'status' => Status::ACTIVE,
        );

        $enquery = $this->admissionRepository->createEnquiry($dataArray);

        if (!empty($enquery['id'])) {
            // Save enquiry fee
            $dataFeeArray = array(
                'school_id' => getUserSchoolId(),
                'enquiry_id' => $enquery['id'],
                'academic_fee' => !empty($input['academic_fee']) ? trim($input['academic_fee']) : 0.00,
                'fee_amount' => !empty($input['fee_amount']) ? trim($input['fee_amount']) : 0.00,
                'payment_mode' => !empty($input['payment_mode']) ? trim($input['payment_mode']) : null,
                'payment_note' => !empty($input['payment_note']) ? trim($input['payment_note']) : null,
                'cheque_no' => !empty($input['cheque_no']) ? trim($input['cheque_no']) : null,
                'cheque_date' => !empty($input['cheque_date']) ? \Carbon\Carbon::parse($input['cheque_date'])->format('Y-m-d') : date('Y-m-d'),
                'bank_id' => !empty($input['bank_id']) ? trim($input['bank_id']) : null,
                'bank_account_id'  => !empty($input['bank_account_id']) ? trim($input['bank_account_id']) : null,
                'paytm_ref_no' => !empty($input['paytm_ref_no']) ? trim($input['paytm_ref_no']) : null,
                'paytm_mobile' => !empty($input['paytm_mobile']) ? trim($input['paytm_mobile']) : null,
                'neft_number' => !empty($input['neft_number']) ? trim($input['neft_number']) : null,
                'neft_desc' => !empty($input['neft_desc']) ? trim($input['neft_desc']) : null,
                'upi_number' => !empty($input['upi_number']) ? trim($input['upi_number']) : null,
                'upi_description' => !empty($input['upi_description']) ? trim($input['upi_description']) : null,
                'status' => Status::ACTIVE,
            );
            $enqueryForm = $this->admissionRepository->createEnquiryFee($dataFeeArray);

            // Save enquiry Parents
            $dataParentArray = array(
                'school_id' => getUserSchoolId(),
                'enquiry_id' => $enquery['id'],
                'father_first_name' => !empty($input['father_first_name']) ? trim($input['father_first_name']) : null,
                'father_middle_name' => !empty($input['father_middle_name']) ? trim($input['father_middle_name']) : null,
                'father_last_name' => !empty($input['father_last_name']) ? trim($input['father_last_name']) : null,
                'father_email' => !empty($input['father_email']) ? trim($input['father_email']) : null,
                'father_mobile' => !empty($input['father_mobile']) ? trim($input['father_mobile']) : null,
                'father_sms_number' => !empty($input['father_sms_number']) ? trim($input['father_sms_number']) : null,
                'father_occupation' => !empty($input['father_occupation']) ? trim($input['father_occupation']) : null,
                'father_highest_qualification' => !empty($input['father_highest_qualification']) ? trim($input['father_highest_qualification']) : null,
                'father_aadhar_card_no' => !empty($input['father_aadhar_card_no']) ? trim($input['father_aadhar_card_no']) : null,
                'father_whatsapp_no' => !empty($input['father_whatsapp_no']) ? trim($input['father_whatsapp_no']) : null,
                'father_income_per_year' => !empty($input['father_income_per_year']) ? trim($input['father_income_per_year']) : null,
                'father_department' => !empty($input['father_department']) ? trim($input['father_department']) : null,
                'father_designation' => !empty($input['father_designation']) ? trim($input['father_designation']) : null,
                'father_pan_card_no' => !empty($input['father_pan_card_no']) ? trim($input['father_pan_card_no']) : null,
                'father_company_name' => !empty($input['father_company_name']) ? trim($input['father_company_name']) : null,
                'father_office_address' => !empty($input['father_office_address']) ? trim($input['father_office_address']) : null,
                'mother_first_name' => !empty($input['mother_first_name']) ? trim($input['mother_first_name']) : null,
                'mother_middle_name' => !empty($input['mother_middle_name']) ? trim($input['mother_middle_name']) : null,
                'mother_last_name' => !empty($input['mother_last_name']) ? trim($input['mother_last_name']) : null,
                'mother_email' => !empty($input['mother_email']) ? trim($input['mother_email']) : null,
                'mother_mobile' => !empty($input['mother_mobile']) ? trim($input['mother_mobile']) : null,
                'mother_highest_qualification' => !empty($input['mother_highest_qualification']) ? trim($input['mother_highest_qualification']) : null,
                'mother_occupation' => !empty($input['mother_occupation']) ? trim($input['mother_occupation']) : null,
                'mother_income_per_year' => !empty($input['mother_income_per_year']) ? trim($input['mother_income_per_year']) : null,
                'mother_department' => !empty($input['mother_department']) ? trim($input['mother_department']) : null,
                'mother_designation' => !empty($input['mother_designation']) ? trim($input['mother_designation']) : null,
                'mother_aadhar_card_no' => !empty($input['mother_aadhar_card_no']) ? trim($input['mother_aadhar_card_no']) : null,
                'mother_pan_card_no' => !empty($input['mother_pan_card_no']) ? trim($input['mother_pan_card_no']) : null,
                'mother_company_name' => !empty($input['mother_company_name']) ? trim($input['mother_company_name']) : null,
                'mother_office_address' => !empty($input['mother_office_address']) ? trim($input['mother_office_address']) : null,
                'status' => Status::ACTIVE,
            );
            $enqueryForm = $this->admissionRepository->createEnquiryParents($dataParentArray);
        } else {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->route('admission_enquery_reg.enquiry_report')->with('message', 'Your Enquery submited successfully.');
    }

    public function edit(int $id, Request $request): Response
    {
        $enqueryData = $this->admissionRepository->getByEnquiryId($id);
        $enqueryGuardianData = $this->admissionRepository->getEnqueryGuardianByEnqueryId($id);

        $admissionSourceData = $this->admissionRepository->getSchoolWiseActiveAllEnquerySource();
        $admissionSources = $admissionSourceData->map(fn($admissionSource) => ['id' => $admissionSource->id, 'title' => $admissionSource->title])->all();

        $userData = $this->userRepository->getActiveAdminUser();
        $users = $userData->map(function ($user) {
            $fullName = $user?->first_name . " " . $user?->middle_name . " " . $user?->last_name;

            return [
                'id' => $user->id,
                'title' => $fullName
            ];
        })->all();

        $stateData = $this->admissionRepository->getActiveState();
        $states = $stateData->map(fn($state) => ['id' => $state->id, 'title' => $state->name])->all();

        // $classes = $this->classroomRepository->getActiveClassNameAll();

        $academicYears = getAcademicYearsAll();

        // ScholarBoardingType
        $ScholarBoardingTypeData = ScholarBoardingType::cases();
        $ScholarBoardingType = array();
        foreach ($ScholarBoardingTypeData as $dt) {
            array_push($ScholarBoardingType, ['id' => $dt->value, 'title' => $dt->value]);
        }

        $totalEnquiryCount = $this->admissionRepository->totalEnquiryCount();

        // gender Type
        $genderTypeData = Gender::cases();
        $genderType = array();
        foreach ($genderTypeData as $dt) {
            array_push($genderType, ['id' => $dt->value, 'title' => $dt->value]);
        }

        $classes = [];
        $academicYearId = $enqueryData?->admission_academic_year_id;

        if ($request->isMethod('POST')) {
            $academicYearId = $request->academic_year_id ?? null;
        }

        if (!empty($academicYearId)) {
            $admissionProcess = $this->admissionRepository->getAdmissionByAcademicYearId($academicYearId);

            if ($admissionProcess != null) {
                $classes = $this->classroomRepository->getActiveClassNameAllByAcademicYearId($academicYearId);
            }
        }

        return Inertia::render('Admission/EditEnquiryForm', [
            'enqueryData' => $enqueryData,
            'enqueryGuardianData' => $enqueryGuardianData,
            'admissionSources' => $admissionSources,
            'users' => $users,
            'states' => $states,
            'ScholarBoardingType' => $ScholarBoardingType,
            'academicYears' => $academicYears,
            'classes' => $classes,
            'totalEnquiryCount' => $totalEnquiryCount,
            'genderType' => $genderType,
        ]);
    }

    public function editOld(int $id): Response
    {
        $enqueryData = $this->admissionRepository->getEnqueryById($id);
        $enqueryFeeData = $this->admissionRepository->getEnqueryFeeByEnqueryId($id);
        $enqueryGuardianData = $this->admissionRepository->getEnqueryGuardianByEnqueryId($id);

        $admissionSourceData = $this->admissionRepository->getActiveTitleAndId();
        $admissionSources = $admissionSourceData->map(fn($admissionSource) => ['id' => $admissionSource->id, 'title' => $admissionSource->title])->all();

        $userData = $this->userRepository->getActiveUserNameAndId();
        $users = $userData->map(fn($user) => ['id' => $user->id, 'title' => $user->username])->all();

        $stateData = $this->admissionRepository->getActiveState();
        $states = $stateData->map(fn($state) => ['id' => $state->id, 'title' => $state->name])->all();

        $classes = $this->classroomRepository->getActiveClassNameAll();

        $academicYearData = $this->admissionRepository->findAcademicYear();
        $academicYears = $academicYearData->map(fn($academicYear) => ['id' => $academicYear->id, 'title' => $academicYear->academic_session])->all();

        // ScholarBoardingType
        $ScholarBoardingTypeData = ScholarBoardingType::cases();
        $ScholarBoardingType = array();
        foreach ($ScholarBoardingTypeData as $dt) {
            array_push($ScholarBoardingType, ['id' => $dt->value, 'title' => $dt->value]);
        }

        return Inertia::render('Admission/EditEnquiryForm', [
            'enqueryData' => $enqueryData,
            'enqueryFeeData' => $enqueryFeeData,
            'enqueryGuardianData' => $enqueryGuardianData,
            'admissionSources' => $admissionSources,
            'users' => $users,
            'states' => $states,
            'ScholarBoardingType' => $ScholarBoardingType,
            'academicYears' => $academicYears,
            'classes' => $classes,
        ]);
    }


    public function update(AdmissionInqueryRegistrationRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = array(
                // 'classroom_id' => !empty($input['classroom_id']) ? intval($input['classroom_id']) : null,
                'class_name_id' => !empty($input['class_name_id']) ? intval($input['class_name_id']) : null,
                'category_id' => !empty($input['category_id']) ? intval($input['category_id']) : null,
                'user_id' => !empty($input['user_id']) ? intval($input['user_id']) : null,
                'source_id' => !empty($input['source_id']) ? intval($input['source_id']) : null,
                'admission_academic_year_id' => !empty($input['academic_year_id']) ? intval($input['academic_year_id']) : null,
                'state_id' => !empty($input['state_id']) ? intval($input['state_id']) : null,
                'employment_category_id' => !empty($input['employment_category_id']) ? intval($input['employment_category_id']) : null,
                'bank_account_id' => !empty($input['bank_account_id']) ? intval($input['bank_account_id']) : null,
                'bank_id' => !empty($input['bank_id']) ? intval($input['bank_id']) : null,
                'staff_id' => !empty($input['staff_id']) ? intval($input['staff_id']) : null,
                'enquiry_date_at' => !empty($input['enquiry_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['enquiry_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'birth_date_at' => !empty($input['birth_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['birth_date_at'])->timezone(getSchoolTimeZone())->toDateString() : null,
                'contact_name' => !empty($input['contact_name']) ? $input['contact_name'] : null,
                'enquiry_detail' => !empty($input['enquiry_detail']) ? $input['enquiry_detail'] : null,
                'contact_number' => !empty($input['contact_number']) ? $input['contact_number'] : null,
                'contact_email' => !empty($input['contact_email']) ? $input['contact_email'] : null,
                'person_to_meet' => !empty($input['person_to_meet']) ? $input['person_to_meet'] : null,
                'in_time' =>  !empty($input['in_time']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['in_time'])->timezone(getSchoolTimeZone())->format('H:i:s') : date('H:i:s'),
                'refer_contact_person' => !empty($input['refer_contact_person']) ? $input['refer_contact_person'] : null,
                // 'refer_person' => !empty($input['refer_person']) ? $input['refer_person'] : null,
                'refer_mobile' => !empty($input['refer_mobile']) ? $input['refer_mobile'] : null,
                'enquiry_address' => !empty($input['enquiry_address']) ? $input['enquiry_address'] : null,
                'reference_by' => !empty($input['reference_by']) ? trim($input['reference_by']) : null,
                'boarding_scholar' => !empty($input['boarding_scholar']) ? trim($input['boarding_scholar']) : null,
                'first_name' => !empty($input['first_name']) ? trim($input['first_name']) : null,
                'middle_name' => !empty($input['middle_name']) ? trim($input['middle_name']) : null,
                'last_name' => !empty($input['last_name']) ? trim($input['last_name']) : null,
                'gender' => !empty($input['gender']) ? trim($input['gender']) : null,
                'date_of_birth' => !empty($input['date_of_birth']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['date_of_birth'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'aadhar_card_no' => !empty($input['aadhar_card_no']) ? trim($input['aadhar_card_no']) : null,
                'blood_group' => !empty($input['blood_group']) ? trim($input['blood_group']) : null,
                'religion' => !empty($input['religion']) ? trim($input['religion']) : null,
                'country_id' => !empty($input['country_id']) ? trim($input['country_id']) : null,
                'date_of_registration' => !empty($input['date_of_registration']) ? trim($input['date_of_registration']) : null,
                'form_no' => !empty($input['form_no']) ? trim($input['form_no']) : null,
                'srn_no' => !empty($input['srn_no']) ? trim($input['srn_no']) : null,
                'child_id' => !empty($input['child_id']) ? trim($input['child_id']) : null,
                'samagra_id' => !empty($input['samagra_id']) ? trim($input['samagra_id']) : null,
                'mother_tongue' => !empty($input['mother_tongue']) ? trim($input['mother_tongue']) : null,
                'medical_condition' => !empty($input['medical_condition']) ? trim($input['medical_condition']) : null,
                'is_transport_availed' => !empty($input['is_transport_availed']) ? trim($input['is_transport_availed']) : null,
                'is_physically_disabled' => !empty($input['is_physically_disabled']) ? trim($input['is_physically_disabled']) : null,
                'is_special_child' => !empty($input['is_special_child']) ? trim($input['is_special_child']) : null,
                'conomically_weaker_section' => !empty($input['conomically_weaker_section']) ? trim($input['conomically_weaker_section']) : null,
                'student_image' => !empty($input['student_image']) ? trim($input['student_image']) : null,
                'father_image' => !empty($input['father_image']) ? trim($input['father_image']) : null,
                'mother_image' => !empty($input['mother_image']) ? trim($input['mother_image']) : null,
                'guardian_image' => !empty($input['guardian_image']) ? trim($input['guardian_image']) : null,
                'school_name' => !empty($input['school_name']) ? trim($input['school_name']) : null,
                'school_class' => !empty($input['school_class']) ? trim($input['school_class']) : null,
                'school_year' => !empty($input['school_year']) ? trim($input['school_year']) : null,
                'tc_no' => !empty($input['tc_no']) ? trim($input['tc_no']) : null,
                'referred_by' => !empty($input['referred_by']) ? trim($input['referred_by']) : null,
                'is_have_sibling' => !empty($input['is_have_sibling']) ? trim($input['is_have_sibling']) : null,
                'present_address' => !empty($input['present_address']) ? $input['present_address'] : null,
                'present_state' => !empty($input['present_state']) ? $input['present_state'] : null,
                'landmark' => !empty($input['landmark']) ? $input['landmark'] : null,
                // 'boarding_type' => !empty($input['boarding_type']) ? $input['boarding_type'] : null,
                'city' => !empty($input['city']) ? $input['city'] : null,
                'district' => !empty($input['district']) ? $input['district'] : null,
                'taluka' => !empty($input['taluka']) ? trim($input['statalukate_id']) : null,
                'pin_code' => !empty($input['pin_code']) ? trim($input['pin_code']) : null,
                'permanent_address' => !empty($input['permanent_address']) ? trim($input['permanent_address']) : null,
                'permanent_state' => !empty($input['permanent_state']) ? trim($input['permanent_state']) : null,
                'permanent_city' => !empty($input['permanent_city']) ? trim($input['permanent_city']) : null,
                'permanent_taluka' => !empty($input['permanent_taluka']) ? trim($input['permanent_taluka']) : null,
                'permanent_district' => !empty($input['permanent_district']) ? trim($input['permanent_district']) : null,
                'permanent_pin_code' => !empty($input['permanent_pin_code']) ? trim($input['permanent_pin_code']) : null,
                'sibling_name' => !empty($input['sibling_name']) ? trim($input['sibling_name']) : null,
                'sibling_std' => !empty($input['sibling_std']) ? trim($input['sibling_std']) : null,
                'sibling_adm_no' => !empty($input['sibling_adm_no']) ? trim($input['sibling_adm_no']) : null,
                'sibling_year' => !empty($input['sibling_year']) ? trim($input['sibling_year']) : null,
                'reference_by_parent' => !empty($input['reference_by_parent']) ? trim($input['reference_by_parent']) : null,
            );

            $this->admissionRepository->updateEnquery($id, $dataArray);

            // Save enquiry Parents
            $dataParentArray = array(
                'father_first_name' => !empty($input['father_first_name']) ? trim($input['father_first_name']) : null,
                'father_middle_name' => !empty($input['father_middle_name']) ? trim($input['father_middle_name']) : null,
                'father_last_name' => !empty($input['father_last_name']) ? trim($input['father_last_name']) : null,
                'father_email' => !empty($input['father_email']) ? trim($input['father_email']) : null,
                'father_mobile' => !empty($input['father_mobile']) ? trim($input['father_mobile']) : null,
                'father_sms_number' => !empty($input['father_sms_number']) ? trim($input['father_sms_number']) : null,
                'father_occupation' => !empty($input['father_occupation']) ? trim($input['father_occupation']) : null,
                'father_highest_qualification' => !empty($input['father_highest_qualification']) ? trim($input['father_highest_qualification']) : null,
                'father_aadhar_card_no' => !empty($input['father_aadhar_card_no']) ? trim($input['father_aadhar_card_no']) : null,
                'father_whatsapp_no' => !empty($input['whatsapp_no']) ? trim($input['whatsapp_no']) : null,
                'father_income_per_year' => !empty($input['father_income_per_year']) ? trim($input['father_income_per_year']) : null,
                'father_department' => !empty($input['father_department']) ? trim($input['father_department']) : null,
                'father_designation' => !empty($input['father_designation']) ? trim($input['father_designation']) : null,
                'father_pan_card_no' => !empty($input['father_pan_card_no']) ? trim($input['father_pan_card_no']) : null,
                'father_company_name' => !empty($input['father_company_name']) ? trim($input['father_company_name']) : null,
                'father_office_address' => !empty($input['father_office_address']) ? trim($input['father_office_address']) : null,
                'mother_first_name' => !empty($input['mother_first_name']) ? trim($input['mother_first_name']) : null,
                'mother_middle_name' => !empty($input['mother_middle_name']) ? trim($input['mother_middle_name']) : null,
                'mother_last_name' => !empty($input['mother_last_name']) ? trim($input['mother_last_name']) : null,
                'mother_email' => !empty($input['mother_email']) ? trim($input['mother_email']) : null,
                'mother_mobile' => !empty($input['mother_mobile']) ? trim($input['mother_mobile']) : null,
                'mother_highest_qualification' => !empty($input['mother_highest_qualification']) ? trim($input['mother_highest_qualification']) : null,
                'mother_occupation' => !empty($input['mother_occupation']) ? trim($input['mother_occupation']) : null,
                'mother_income_per_year' => !empty($input['mother_income_per_year']) ? trim($input['mother_income_per_year']) : null,
                'mother_department' => !empty($input['mother_department']) ? trim($input['mother_department']) : null,
                'mother_designation' => !empty($input['mother_designation']) ? trim($input['mother_designation']) : null,
                'mother_aadhar_card_no' => !empty($input['mother_aadhar_card_no']) ? trim($input['mother_aadhar_card_no']) : null,
                'mother_pan_card_no' => !empty($input['mother_pan_card_no']) ? trim($input['mother_pan_card_no']) : null,
                'mother_company_name' => !empty($input['mother_company_name']) ? trim($input['mother_company_name']) : null,
                'mother_office_address' => !empty($input['mother_office_address']) ? trim($input['mother_office_address']) : null,
            );

            $this->admissionRepository->updateEnquiryParents($id, $dataParentArray);

            DB::commit();

            return redirect()->route('admission_enquery_reg.enquiry_report')->with('message', 'Your Enquery updated successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }


    public function updateOld(AdmissionInqueryRegistrationRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'classroom_id' => !empty($input['classroom_id']) ? intval($input['classroom_id']) : null,
            'category_id' => !empty($input['category_id']) ? intval($input['category_id']) : null,
            'user_id' => !empty($input['user_id']) ? intval($input['user_id']) : null,
            'source_id' => !empty($input['source_id']) ? intval($input['source_id']) : null,
            'academic_year_id' => !empty($input['academic_year_id']) ? intval($input['academic_year_id']) : null,
            'state_id' => !empty($input['state_id']) ? intval($input['state_id']) : null,
            'employment_category_id' => !empty($input['employment_category_id']) ? intval($input['employment_category_id']) : null,
            'bank_account_id' => !empty($input['bank_account_id']) ? intval($input['bank_account_id']) : null,
            'bank_id' => !empty($input['bank_id']) ? intval($input['bank_id']) : null,
            'staff_id' => !empty($input['staff_id']) ? intval($input['staff_id']) : null,
            'enquiry_date_at' => !empty($input['enquiry_date_at']) ? \Carbon\Carbon::parse($input['enquiry_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'birth_date_at' => !empty($input['birth_date_at']) ? \Carbon\Carbon::parse($input['birth_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'contact_name' => !empty($input['contact_name']) ? $input['contact_name'] : null,
            'enquiry_detail' => !empty($input['enquiry_detail']) ? $input['enquiry_detail'] : null,
            'contact_number' => !empty($input['contact_number']) ? $input['contact_number'] : null,
            'contact_email' => !empty($input['contact_email']) ? $input['contact_email'] : null,
            'person_to_meet' => !empty($input['person_to_meet']) ? $input['person_to_meet'] : null,
            'in_time' =>  !empty($input['in_time']) ? \Carbon\Carbon::parse($input['in_time'])->format('H:i:s') : date('H:i:s'),
            'refer_contact_person' => !empty($input['refer_contact_person']) ? $input['refer_contact_person'] : null,
            'refer_person' => !empty($input['refer_person']) ? $input['refer_person'] : null,
            'refer_mobile' => !empty($input['refer_mobile']) ? $input['refer_mobile'] : null,
            'enquiry_address' => !empty($input['enquiry_address']) ? $input['enquiry_address'] : null,
            'reference_by' => !empty($input['reference_by']) ? trim($input['reference_by']) : null,
            'boarding_scholar' => !empty($input['boarding_scholar']) ? trim($input['boarding_scholar']) : null,
            'first_name' => !empty($input['first_name']) ? trim($input['first_name']) : null,
            'middle_name' => !empty($input['middle_name']) ? trim($input['middle_name']) : null,
            'last_name' => !empty($input['last_name']) ? trim($input['last_name']) : null,
            'gender' => !empty($input['gender']) ? trim($input['gender']) : null,
            'date_of_birth' => !empty($input['date_of_birth']) ? \Carbon\Carbon::parse($input['date_of_birth'])->format('Y-m-d') : date('Y-m-d'),
            'aadhar_card_no' => !empty($input['aadhar_card_no']) ? trim($input['aadhar_card_no']) : null,
            'blood_group' => !empty($input['blood_group']) ? trim($input['blood_group']) : null,
            'religion' => !empty($input['religion']) ? trim($input['religion']) : null,
            'country_id' => !empty($input['country_id']) ? trim($input['country_id']) : null,
            'date_of_registration' => !empty($input['date_of_registration']) ? trim($input['date_of_registration']) : null,
            'form_no' => !empty($input['form_no']) ? trim($input['form_no']) : null,
            'srn_no' => !empty($input['srn_no']) ? trim($input['srn_no']) : null,
            'child_id' => !empty($input['child_id']) ? trim($input['child_id']) : null,
            'samagra_id' => !empty($input['samagra_id']) ? trim($input['samagra_id']) : null,
            'mother_tongue' => !empty($input['mother_tongue']) ? trim($input['mother_tongue']) : null,
            'medical_condition' => !empty($input['medical_condition']) ? trim($input['medical_condition']) : null,
            'is_transport_availed' => !empty($input['is_transport_availed']) ? trim($input['is_transport_availed']) : null,
            'is_physically_disabled' => !empty($input['is_physically_disabled']) ? trim($input['is_physically_disabled']) : null,
            'is_special_child' => !empty($input['is_special_child']) ? trim($input['is_special_child']) : null,
            'conomically_weaker_section' => !empty($input['conomically_weaker_section']) ? trim($input['conomically_weaker_section']) : null,
            'student_image' => !empty($input['student_image']) ? trim($input['student_image']) : null,
            'father_image' => !empty($input['father_image']) ? trim($input['father_image']) : null,
            'mother_image' => !empty($input['mother_image']) ? trim($input['mother_image']) : null,
            'guardian_image' => !empty($input['guardian_image']) ? trim($input['guardian_image']) : null,
            'school_name' => !empty($input['school_name']) ? trim($input['school_name']) : null,
            'school_class' => !empty($input['school_class']) ? trim($input['school_class']) : null,
            'school_year' => !empty($input['school_year']) ? trim($input['school_year']) : null,
            'tc_no' => !empty($input['tc_no']) ? trim($input['tc_no']) : null,
            'referred_by' => !empty($input['referred_by']) ? trim($input['referred_by']) : null,
            'is_have_sibling' => !empty($input['is_have_sibling']) ? trim($input['is_have_sibling']) : null,
            'present_address' => !empty($input['present_address']) ? $input['present_address'] : null,
            'present_state' => !empty($input['present_state']) ? $input['present_state'] : null,
            'landmark' => !empty($input['landmark']) ? $input['landmark'] : null,
            'boarding_type' => !empty($input['boarding_type']) ? $input['boarding_type'] : null,
            'city' => !empty($input['city']) ? $input['city'] : null,
            'district' => !empty($input['district']) ? $input['district'] : null,
            'taluka' => !empty($input['taluka']) ? trim($input['statalukate_id']) : null,
            'pin_code' => !empty($input['pin_code']) ? trim($input['pin_code']) : null,
            'permanent_address' => !empty($input['permanent_address']) ? trim($input['permanent_address']) : null,
            'permanent_state' => !empty($input['permanent_state']) ? trim($input['permanent_state']) : null,
            'permanent_city' => !empty($input['permanent_city']) ? trim($input['permanent_city']) : null,
            'permanent_taluka' => !empty($input['permanent_taluka']) ? trim($input['permanent_taluka']) : null,
            'permanent_district' => !empty($input['permanent_district']) ? trim($input['permanent_district']) : null,
            'permanent_pin_code' => !empty($input['permanent_pin_code']) ? trim($input['permanent_pin_code']) : null,
            'sibling_name' => !empty($input['sibling_name']) ? trim($input['sibling_name']) : null,
            'sibling_std' => !empty($input['sibling_std']) ? trim($input['sibling_std']) : null,
            'sibling_adm_no' => !empty($input['sibling_adm_no']) ? trim($input['sibling_adm_no']) : null,
            'sibling_year' => !empty($input['sibling_year']) ? trim($input['sibling_year']) : null,
            'reference_by_parent' => !empty($input['reference_by_parent']) ? trim($input['reference_by_parent']) : null,
        );

        $enquery = $this->admissionRepository->updateEnquery($id, $dataArray);

        // Save enquiry fee
        $dataFeeArray = array(
            'academic_fee' => !empty($input['academic_fee']) ? trim($input['academic_fee']) : 0.00,
            'fee_amount' => !empty($input['fee_amount']) ? trim($input['fee_amount']) : 0.00,
            'payment_mode' => !empty($input['payment_mode']) ? trim($input['payment_mode']) : null,
            'payment_note' => !empty($input['payment_note']) ? trim($input['payment_note']) : null,
            'cheque_no' => !empty($input['cheque_no']) ? trim($input['cheque_no']) : null,
            'cheque_date' => !empty($input['cheque_date']) ? \Carbon\Carbon::parse($input['cheque_date'])->format('Y-m-d') : date('Y-m-d'),
            'bank_id' => !empty($input['bank_id']) ? trim($input['bank_id']) : null,
            'bank_account_id'  => !empty($input['bank_account_id']) ? trim($input['bank_account_id']) : null,
            'paytm_ref_no' => !empty($input['paytm_ref_no']) ? trim($input['paytm_ref_no']) : null,
            'paytm_mobile' => !empty($input['paytm_mobile']) ? trim($input['paytm_mobile']) : null,
            'neft_number' => !empty($input['neft_number']) ? trim($input['neft_number']) : null,
            'neft_desc' => !empty($input['neft_desc']) ? trim($input['neft_desc']) : null,
            'upi_number' => !empty($input['upi_number']) ? trim($input['upi_number']) : null,
            'upi_description' => !empty($input['upi_description']) ? trim($input['upi_description']) : null,
        );
        $enqueryFee = $this->admissionRepository->updateEnquiryFee($id, $dataFeeArray);

        // Save enquiry Parents
        $dataParentArray = array(
            'father_first_name' => !empty($input['father_first_name']) ? trim($input['father_first_name']) : null,
            'father_middle_name' => !empty($input['father_middle_name']) ? trim($input['father_middle_name']) : null,
            'father_last_name' => !empty($input['father_last_name']) ? trim($input['father_last_name']) : null,
            'father_email' => !empty($input['father_email']) ? trim($input['father_email']) : null,
            'father_mobile' => !empty($input['father_mobile']) ? trim($input['father_mobile']) : null,
            'father_sms_number' => !empty($input['father_sms_number']) ? trim($input['father_sms_number']) : null,
            'father_occupation' => !empty($input['father_occupation']) ? trim($input['father_occupation']) : null,
            'father_highest_qualification' => !empty($input['father_highest_qualification']) ? trim($input['father_highest_qualification']) : null,
            'father_aadhar_card_no' => !empty($input['father_aadhar_card_no']) ? trim($input['father_aadhar_card_no']) : null,
            'father_whatsapp_no' => !empty($input['whatsapp_no']) ? trim($input['whatsapp_no']) : null,
            'father_income_per_year' => !empty($input['father_income_per_year']) ? trim($input['father_income_per_year']) : null,
            'father_department' => !empty($input['father_department']) ? trim($input['father_department']) : null,
            'father_designation' => !empty($input['father_designation']) ? trim($input['father_designation']) : null,
            'father_pan_card_no' => !empty($input['father_pan_card_no']) ? trim($input['father_pan_card_no']) : null,
            'father_company_name' => !empty($input['father_company_name']) ? trim($input['father_company_name']) : null,
            'father_office_address' => !empty($input['father_office_address']) ? trim($input['father_office_address']) : null,
            'mother_first_name' => !empty($input['mother_first_name']) ? trim($input['mother_first_name']) : null,
            'mother_middle_name' => !empty($input['mother_middle_name']) ? trim($input['mother_middle_name']) : null,
            'mother_last_name' => !empty($input['mother_last_name']) ? trim($input['mother_last_name']) : null,
            'mother_email' => !empty($input['mother_email']) ? trim($input['mother_email']) : null,
            'mother_mobile' => !empty($input['mother_mobile']) ? trim($input['mother_mobile']) : null,
            'mother_highest_qualification' => !empty($input['mother_highest_qualification']) ? trim($input['mother_highest_qualification']) : null,
            'mother_occupation' => !empty($input['mother_occupation']) ? trim($input['mother_occupation']) : null,
            'mother_income_per_year' => !empty($input['mother_income_per_year']) ? trim($input['mother_income_per_year']) : null,
            'mother_department' => !empty($input['mother_department']) ? trim($input['mother_department']) : null,
            'mother_designation' => !empty($input['mother_designation']) ? trim($input['mother_designation']) : null,
            'mother_aadhar_card_no' => !empty($input['mother_aadhar_card_no']) ? trim($input['mother_aadhar_card_no']) : null,
            'mother_pan_card_no' => !empty($input['mother_pan_card_no']) ? trim($input['mother_pan_card_no']) : null,
            'mother_company_name' => !empty($input['mother_company_name']) ? trim($input['mother_company_name']) : null,
            'mother_office_address' => !empty($input['mother_office_address']) ? trim($input['mother_office_address']) : null,
        );
        $enqueryParent = $this->admissionRepository->updateEnquiryParents($id, $dataParentArray);

        return redirect()->route('admission_enquery_reg.enquiry_report')->with('message', 'Your Enquery updated successfully.');
    }


    public function switchEnquiryToReg(AdmissionInqueryRegistrationRequest $request, int $id): RedirectResponse
    {
        $dataArray              = array(
            'enquiry_type'      => EnquiryType::ADMISSION,
            'status'            => Status::ACTIVE,
        );

        $enquery = $this->admissionRepository->updateEnquery($id, $dataArray);
        return redirect()->route('admission_enquery_reg.edit_registration', $id)->with('message', 'Updated Enquiry to Registration');
    }

    /*
    *  delete enquiry
    */
    public function destroy(int $id): RedirectResponse
    {
        $enquery = $this->admissionRepository->getEnqueryById($id);

        if (!$enquery) {
            return redirect()->back()->with('error', 'Source not found.');
        }

        if ($enquery?->enquiry_type == EnquiryType::ADMISSION->value) {
            return redirect()->back()->with('error', 'Cannot be deleted.');
        }

        DB::beginTransaction();

        try {
            if ($enquery?->enquiryFollows?->count() > 0) {
                $enquery->enquiryFollows->each(function ($enquiryFollow) {
                    $enquiryFollow->delete();
                });
            }

            if ($enquery?->enquiry_fee != null) {
                $enquery->enquiry_fee->delete();
            }

            if ($enquery?->guardian != null) {
                $enquery->guardian->delete();
            }

            $this->admissionRepository->deleteEnquery($id);

            DB::commit();

            return redirect()->back()->with('message', 'Deleted successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /*
    *  update enquiry status
    */
    public function updateEnquiryStatus(int $id, EnquiryStatusUpdateRequest $request)
    {
        $input = $request->validated();

        $dataArray = array(
            'enquiry_status' => $input['enquiry_status'],
        );

        $enquiry = $this->admissionRepository->updateEnquery($id, $dataArray);

        if (!$enquiry) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->route('admission_enquery_reg.enquiry_report')->with('message', 'Status updated successfully.');
    }

    /**
     * Display Enquiry Report - Admission Enquiry
     */
    public function enquiryReport(Request $request): Response
    {
        if ($request->isMethod('POST')) {
            $landmarkName       = $request->input('landmarks_id') ?? "";
            $schoolAdminName    = $request->input('school_admin_id') ?? "";
            $search             = $request->input('admission_search') ?? "";
            $classId            = $request->input('class_id') ?? "";
            $enquiryStatus      = $request->input('status_id') ?? "";
            $startDate          = !empty($request->input('start_date')) ? Carbon::parse($request->input('start_date'))->format('Y-m-d') : '';
            $endDate            = !empty($request->input('end_date')) ? Carbon::parse($request->input('end_date'))->format('Y-m-d') : '';

            $enqueryReportList  = $this->admissionRepository->getActiveEnqueryAllFilterData($landmarkName, $schoolAdminName, $search, $classId, $enquiryStatus, $startDate, $endDate);
        } else {
            $enqueryReportList  = $this->admissionRepository->getActiveEnqueryAll();
        }

        $enqueryReportList = $enqueryReportList?->map(function ($enquiry) {
            $enquiry['enquiry_date_at'] = !empty($enquiry['enquiry_date_at']) ? Carbon::parse($enquiry['enquiry_date_at'])->format('d-M-Y') : "";

            if ($enquiry?->enquiryFollows?->count() > 0) {
                $enquiry['enquiry_follows'] = collect($enquiry?->enquiryFollows)?->map(function ($enquiryFollow) {
                    $enquiryFollow['activity_date_at'] = !empty($enquiryFollow['activity_date_at']) ? Carbon::parse($enquiryFollow['activity_date_at'])->format('d-M-Y') : "";
                    $enquiryFollow['follow_date_at'] = !empty($enquiryFollow['follow_date_at']) ? Carbon::parse($enquiryFollow['follow_date_at'])->format('d-M-Y') : "";

                    return $enquiryFollow;
                });
            }

            return $enquiry;
        });

        $landmarkData = $this->admissionRepository->getActiveLandmark();
        $landmark = $landmarkData->map(fn($landmark) => ['id' => $landmark->landmark, 'title' => $landmark->landmark])->all();

        $getClassName = $this->classroomRepository->getActiveClassNameAll();
        $class = $getClassName->map(fn($className) => ['id' => $className->id, 'title' => $className->title]);

        $enqueryStatusEnum = EnquiryStatus::cases();
        $status = array();
        $enquiryStatusArray = [];

        foreach ($enqueryStatusEnum as $item) {
            if (!in_array($item->value, [EnquiryStatus::CANCELLED->value, EnquiryStatus::ON_HOLD->value])) {
                array_push($status, ['id' => $item->value, 'title' => $item->value]);
            }
        }

        foreach ($enqueryStatusEnum as $item) {
            if (!in_array($item->value, [EnquiryStatus::CANCELLED->value, EnquiryStatus::ON_HOLD->value, EnquiryStatus::REGISTRATION_TAKEN->value])) {
                array_push($enquiryStatusArray, ['id' => $item->value, 'title' => $item->value]);
            }
        }

        $adminName  = $this->admissionRepository->getSchoolAdminName();
        $admins     = $adminName->map(fn($query) => ['id' => $query->id, 'title' => $query->username])->all();

        return Inertia::render('Admission/EnquiryReport', [
            'enqueryReportList' => $enqueryReportList,
            'landmarks' => $landmark,
            'classes' => $class,
            'status' => $status,
            'schoolAdmin' => $admins,
            'enquiryStatusArray' => $enquiryStatusArray,
        ]);
    }

    // End Display Enquiry Report - Admission Enquiry
    /**
     * Display Enquiry Report - Admission Enquiry
     */
    public function enquiryReportOld(Request $request): Response
    {

        if ($request->isMethod('post')) {
            // dd($request->all());
            $landmarkName       = $request->input('landmarks_id') ?? "";
            $schoolAdminName    = $request->input('school_admin_id') ?? "";
            $search             = $request->input('admission_search') ?? "";
            $classId            = $request->input('class_id') ?? "";
            $enquiryStatus      = $request->input('status_id') ?? "";
            $startDate          = !empty($request->input('start_date')) ? Carbon::parse($request->input('start_date'))->format('Y-m-d') : '';
            $endDate            = !empty($request->input('end_date')) ? Carbon::parse($request->input('end_date'))->format('Y-m-d') : '';

            $enqueryReportList  = $this->admissionRepository->getActiveAllEnqueryFilterData($landmarkName, $schoolAdminName, $search, $classId, $enquiryStatus, $startDate, $endDate);
            // dd($enqueryReportList);
        } else {
            $enqueryReportList  = $this->admissionRepository->getActiveAllEnquery();
        }


        $landmarkData           = $this->admissionRepository->getActiveLandmark();
        $landmark               = $landmarkData->map(fn($landmark) => ['id' => $landmark->landmark, 'title' => $landmark->landmark])->all();

        $getClassRoom           = $this->admissionRepository->getActiveClassRoomName();
        $class                  = $getClassRoom->map(fn($classRoom) => ['id' => $classRoom->id, 'title' => $classRoom->title]);

        $enqueryStatusEnum      = Status::cases();
        $status                 = array();

        foreach ($enqueryStatusEnum as $item) {
            array_push($status, ['id' => $item->value, 'title' => $item->value]);
        }

        $adminName  = $this->admissionRepository->getSchoolAdminName();
        $admins     = $adminName->map(fn($query) => ['id' => $query->id, 'title' => $query->username])->all();

        return Inertia::render('Admission/EnquiryReport', [
            'enqueryReportList' => $enqueryReportList,
            'landmarks'         => $landmark,
            'classes'           => $class,
            'status'            => $status,
            'schoolAdmin'       => $admins,
        ]);
    }
    // End Display Enquiry Report - Admission Enquiry

    // Set Admission Exam Date
    public function admissionExam(AdmissionExamRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $attributesToCheck = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => !empty($input['academic_year_id']) ? intval($input['academic_year_id']) : null,
                'class_name_id' => !empty($input['class_name_id']) ? intval($input['class_name_id']) : null,
            ];

            $valuesToUpdate = [
                'test_date' => !empty($input['test_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['test_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'test_time' => !empty($input['test_time']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['test_time'])->timezone(getSchoolTimeZone())->format('H:i:s') : date('H:i:s'),
                'exam_status' => AdmissionExamStatus::ACTIVE,
                'status' => Status::ACTIVE,
            ];

            foreach ($input['enquiry_ids'] as $enquiryId) {
                $attributesToCheck['enquiry_id'] = $enquiryId;

                $admissionExam = $this->admissionRepository->updateOrCreateAdmissionExam($attributesToCheck, $valuesToUpdate);
            }

            DB::commit();

            return redirect()->back()->with('message', 'Admission Exam Date Saved Successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    // Set Admission Exam Date
    public function admissionExamOld(Request $request)
    {
        $input = $request->validate([
            "academic_year_id" => ['required'],
            "classroom_id" => ['required'],
            "test_date" => ['required'],
            "test_time" => ['required'],
            "enquiry_ids" => ['required', 'array'],
        ]);

        // dd($input, $request->all());
        DB::beginTransaction();

        try {
            $attributesToCheck = [
                'academic_year_id' => !empty($input['academic_year_id']) ? intval($input['academic_year_id']) : null,
                'classroom_id' => !empty($input['classroom_id']) ? intval($input['classroom_id']) : null,
            ];

            $valuesToUpdate = [
                'test_date' => !empty($input['test_date']) ? Carbon::parse($input['test_date'])->format('Y-m-d') : date('Y-m-d'),
                'test_time' => !empty($input['test_time']) ? Carbon::parse($input['test_time'])->format('H:i:s') : date('H:i:s'),
            ];

            $admissionExam = $this->admissionRepository->updateOrCreateAdmissionExam($attributesToCheck, $valuesToUpdate);

            foreach ($input['enquiry_ids'] as $enquiryId) {
                $attributesToCheck = [
                    'admission_exam_id' => $admissionExam->id,
                    'enquiry_id' => $enquiryId,
                ];

                $valuesToUpdate = [
                    'status' => AdmissionStatus::NEW,
                    'exam_status' => AdmissionExamStatus::PENDING,
                ];

                $this->admissionRepository->updateOrCreateAdmissionExamEnquiry($attributesToCheck, $valuesToUpdate);
            }

            DB::commit();

            return redirect()->back()->with('message', 'Your Admission Exam submitted successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    public function updateAdmissionExamStatus(AdmissionExamStatusRequest $request)
    {
        $input = $request->validated();

        $dataArray = [
            'exam_status' => $input['exam_status'] ?? AdmissionExamStatus::PENDING
        ];

        $updateStatus = $this->admissionRepository->updateAdmissionExamStatus($input['enquiry_ids'], $dataArray);

        if (!$updateStatus) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Admission exam status updated successfully.');
    }

    public function updateAdmissionExamStatusOld(Request $request)
    {
        $validatedData = $request->validate([
            'enquiry_ids' => 'required',
            'exam_status' => 'required',
        ]);

        DB::beginTransaction();

        try {
            foreach ($validatedData['enquiry_ids'] as $id) {
                AdmissionExamEnquiries::updateOrInsert(
                    [
                        'enquiry_id' => $id
                    ],
                    [
                        'exam_status' => $validatedData['exam_status'],
                    ]
                );
            }

            DB::commit();

            return redirect()->back()->with('message', 'Admission exam status updated successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }


    /**
     * Display the registration form.
     */
    public function createRegistration(Request $request): Response
    {
        $housesData = $this->houseRepository->getActiveNameAndId();
        $admissionNumbersData = $this->admissionRepository->getActiveAdmissionNumberAndId();
        $categoryData = $this->categoryRepository->getActiveNameAndId();
        $catEmpData = $this->categoryRepository->getActiveNameIdStudentEmployment();
        $bloodGroupData = $this->bloodGroupRepository->getActiveNameAndId();
        $religionData = $this->religionRepository->getActiveNameAndId();
        $countryData = $this->countryRepository->getActiveNameAndId();
        $bankData = $this->bankRepository->getActiveNameAndId();
        $stateData = $this->stateRepository->getActiveNameAndId();
        $admissionNo = $this->studentRepository->getNextAdmissionNo();
        $academicYears = getAcademicYearsAll();
        $userData = $this->userRepository->getActiveAdminUser();
        $admissionSourceData = $this->admissionRepository->getSchoolWiseActiveAllEnquerySource();
        $staffData = $this->staffRepository->getActiveNameId();

        $admissionSources = $admissionSourceData->map(fn($admissionSource) => ['id' => $admissionSource->id, 'title' => $admissionSource->title])->all();
        $users = $userData->map(function ($user) {
            $fullName = $user?->first_name . " " . $user?->middle_name . " " . $user?->last_name;

            return [
                'id' => $user->id,
                'title' => $fullName
            ];
        })->all();
        $houses = $housesData->map(fn($house) => ['id' => $house->id, 'title' => $house->name])->all();
        $admissionNumbers = $admissionNumbersData->map(fn($admissionNumber) => ['id' => $admissionNumber->id,  'title' => "{$admissionNumber->admission_number}"])->all();
        $categories = $categoryData->map(fn($category) => ['id' => $category->id, 'title' => $category->title])->all();
        $bloodGroups = $bloodGroupData->map(fn($bloodGroup) => ['id' => $bloodGroup->id, 'title' => $bloodGroup->name])->all();
        $religions = $religionData->map(fn($religion) => ['id' => $religion->id, 'title' => $religion->name])->all();
        $countries = $countryData->map(fn($country) => ['id' => $country->id, 'title' => $country->name])->all();
        $catEmps = $catEmpData->map(fn($catEmp) => ['id' => $catEmp->id, 'title' => $catEmp->title])->all();
        $banks = $bankData->map(fn($bank) => ['id' => $bank->id, 'title' => $bank->name])->all();
        $states = $stateData->map(fn($state) => ['id' => $state->id, 'title' => $state->name])->all();
        $staffs = $staffData->map(fn($staff) => ['id' => $staff->id, 'title' => $staff->first_name . ' ' . $staff->last_name])->all();

        // type
        $schBoaType = ScholarBoardingType::cases();
        $schBoaArr = array();
        foreach ($schBoaType as $sbType) {
            array_push($schBoaArr, ['id' => $sbType->value, 'title' => $sbType->value]);
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

        // payment mode
        $paymentModeData = PaymentMode::cases();
        $paymentMode = array();
        foreach ($paymentModeData as $dt) {
            array_push($paymentMode, ['id' => $dt->value, 'title' => $dt->value]);
        }

        // payment mode
        $referenceType = ReferenceType::cases();
        $referenceTypeArr = array();
        foreach ($referenceType as $rt) {
            array_push($referenceTypeArr, ['id' => $rt->value, 'title' => $rt->value]);
        }

        // payment mode
        $alumniType = AlumniType::cases();
        $alumniTypeArr = array();
        foreach ($alumniType as $alt) {
            array_push($alumniTypeArr, ['id' => $alt->value, 'title' => $alt->value]);
        }

        $enquiry = null;
        $enquiryCustomFields = [];

        if (!empty($request?->enquiry_id)) {
            $enquiry = $this->admissionRepository->getByEnquiryId($request?->enquiry_id);

            $enquiry->loadMissing(['guardian', 'enquiryCustomFields']);

            // enquiry custom fields
            $enquiryCustomFields = $enquiry->enquiryCustomFields;
        }

        $students = [];
        $classNames = [];
        $admissionProcess = null;
        $academicYearId = $enquiry?->admission_academic_year_id ?? getAcademicYearId();

        if ($request->isMethod('POST')) {
            $academicYearId = $request->academic_year_id ?? null;
            $studentAdmissionNo = $request->admission_no ?? null;
            $studentFirstName = $request->student_first_name ?? null;
            $fatherFirstName = $request->father_first_name ?? null;
            $fatherMobile = $request->father_mobile ?? null;

            if ($studentAdmissionNo != null || $studentFirstName != null || $fatherFirstName != null || $fatherMobile != null) {
                $students = $this->studentRepository->filterSiblingStudents($studentAdmissionNo, $studentFirstName, $fatherFirstName, $fatherMobile);

                if (count($students) > 0) {
                    $students = $students->map(function ($student) {
                        if ($student?->promotedClassroom != null) {
                            if (!empty($student['classroom'])) {
                                unset($student['classroom']);
                            }

                            $student['classroom'] = $student?->promotedClassroom;
                            $student['classroom_id'] = $student?->promotedClassroom?->id;
                        }

                        return $student;
                    });
                }
            }
        }

        if (!empty($academicYearId)) {
            $admissionProcess = $this->admissionRepository->getAdmissionByAcademicYearId($academicYearId);

            if ($admissionProcess != null) {
                $classNames = $this->classroomRepository->getActiveClassNameAllByAcademicYearId($academicYearId);
            }
        }

        // custom fields
        $customFields = $this->customFieldRepository->getCustomFieldsByType(StudentStaffFieldType::REGISTERFORSTUDENT->value);

        if (count($customFields) > 0) {
            $customFields = $customFields->map(function ($customField) use ($enquiryCustomFields) {
                $value = '';

                foreach ($enquiryCustomFields as $enquiryCustomField) {
                    if ($enquiryCustomField?->custom_field_id == $customField?->id) {
                        $value = $enquiryCustomField->value ?? '';
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

        return Inertia::render('Admission/AdmissionForm', [
            'classNames' => $classNames,
            'houses' => $houses,
            'admissionNumbers' => $admissionNumbers,
            'schBoaArr' => $schBoaArr,
            'genderArr' => $genderArr,
            'categories' => $categories,
            'bloodGroups' => $bloodGroups,
            'religions' => $religions,
            'countries' => $countries,
            'catEmps' => $catEmps,
            'accountArr' => $accountArr,
            'banks' => $banks,
            'admissionNo' => $admissionNo,
            'states' => $states,
            'academicYears' => $academicYears,
            'users' => $users,
            'admissionSources' => $admissionSources,
            'paymentMode' => $paymentMode,
            'referenceTypeArr' => $referenceTypeArr,
            'alumniTypeArr' => $alumniTypeArr,
            'staffs' => $staffs,
            'admissionProcess' => $admissionProcess,
            'enquiry' => $enquiry,
            'students' => $students,
            'academicYearId' => $academicYearId,
            'customFields' => $customFields,
        ]);
    }


    /**
     * Display the registration form.
     */
    public function createRegistrationOld(Request $request): Response
    {
        $classNamesData = $this->classroomRepository->getActiveNameAndId();
        $housesData = $this->houseRepository->getActiveNameAndId();
        $admissionNumbersData = $this->admissionRepository->getActiveAdmissionNumberAndId();
        $categoryData = $this->categoryRepository->getActiveNameAndId();
        $catEmpData = $this->categoryRepository->getActiveNameIdStudentEmployment();
        $bloodGroupData = $this->bloodGroupRepository->getActiveNameAndId();
        $religionData = $this->religionRepository->getActiveNameAndId();
        $countryData = $this->countryRepository->getActiveNameAndId();
        $bankData = $this->bankRepository->getActiveNameAndId();
        $stateData = $this->stateRepository->getActiveNameAndId();
        $admissionNo = $this->studentRepository->getNextAdmissionNo();
        $academicYearData = $this->admissionRepository->findAcademicYear();
        $userData = $this->userRepository->getActiveUserNameAndId();
        $admissionSourceData = $this->admissionRepository->getActiveTitleAndId();
        $staffData = $this->staffRepository->getActiveNameId();

        $admissionSources = $admissionSourceData->map(fn($admissionSource) => ['id' => $admissionSource->id, 'title' => $admissionSource->title])->all();
        $users = $userData->map(fn($user) => ['id' => $user->id, 'title' => $user->username])->all();
        $academicYears = $academicYearData->map(fn($academicYear) => ['id' => $academicYear->id, 'title' => $academicYear->academic_session])->all();
        $classNames = $classNamesData->map(fn($className) => ['id' => $className->id, 'title' => $className->title])->all();
        $houses = $housesData->map(fn($house) => ['id' => $house->id, 'title' => $house->name])->all();
        $admissionNumbers = $admissionNumbersData->map(fn($admissionNumber) => ['id' => $admissionNumber->id,  'title' => "{$admissionNumber->admission_number}"])->all();
        $categories = $categoryData->map(fn($category) => ['id' => $category->id, 'title' => $category->title])->all();
        $bloodGroups = $bloodGroupData->map(fn($bloodGroup) => ['id' => $bloodGroup->id, 'title' => $bloodGroup->name])->all();
        $religions = $religionData->map(fn($religion) => ['id' => $religion->id, 'title' => $religion->name])->all();
        $countries = $countryData->map(fn($country) => ['id' => $country->id, 'title' => $country->name])->all();
        $catEmps = $catEmpData->map(fn($catEmp) => ['id' => $catEmp->id, 'title' => $catEmp->title])->all();
        $banks = $bankData->map(fn($bank) => ['id' => $bank->id, 'title' => $bank->name])->all();
        $states = $stateData->map(fn($state) => ['id' => $state->id, 'title' => $state->name])->all();
        $staffs = $staffData->map(fn($staff) => ['id' => $staff->id, 'title' => $staff->first_name . ' ' . $staff->last_name])->all();

        // type
        $schBoaType = ScholarBoardingType::cases();
        $schBoaArr = array();
        foreach ($schBoaType as $sbType) {
            array_push($schBoaArr, ['id' => $sbType->value, 'title' => $sbType->value]);
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

        // payment mode
        $paymentModeData = PaymentMode::cases();
        $paymentMode = array();
        foreach ($paymentModeData as $dt) {
            array_push($paymentMode, ['id' => $dt->value, 'title' => $dt->value]);
        }

        // payment mode
        $referenceType = ReferenceType::cases();
        $referenceTypeArr = array();
        foreach ($referenceType as $rt) {
            array_push($referenceTypeArr, ['id' => $rt->value, 'title' => $rt->value]);
        }

        // payment mode
        $alumniType = AlumniType::cases();
        $alumniTypeArr = array();
        foreach ($alumniType as $alt) {
            array_push($alumniTypeArr, ['id' => $alt->value, 'title' => $alt->value]);
        }


        return Inertia::render('Admission/AdmissionForm', [
            'classNames' => $classNames,
            'houses' => $houses,
            'admissionNumbers' => $admissionNumbers,
            'schBoaArr' => $schBoaArr,
            'genderArr' => $genderArr,
            'categories' => $categories,
            'bloodGroups' => $bloodGroups,
            'religions' => $religions,
            'countries' => $countries,
            'catEmps' => $catEmps,
            'accountArr' => $accountArr,
            'banks' => $banks,
            'admissionNo' => $admissionNo,
            'states' => $states,
            'academicYears' => $academicYears,
            'users' => $users,
            'admissionSources' => $admissionSources,
            'paymentMode' => $paymentMode,
            'referenceTypeArr' => $referenceTypeArr,
            'alumniTypeArr' => $alumniTypeArr,
            'staffs' => $staffs,
        ]);
    }

    /**
     * save student info from admission form
     */
    public function pushEnquiryToRegistrationSave(int $id, AdmissionEnquiryRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $enquiry = $this->admissionRepository->getByEnquiryId($id);

            $admissionProcess = $this->admissionRepository->getAdmissionByAcademicYearId($input['academic_year_id']);

            $registrationNo = "";

            if ($admissionProcess != null) {
                $admissionProcess?->load(['academicYear']);

                $registrationSeed = (int) $admissionProcess?->registration_seed ?? 0;

                $registrationNo = $admissionProcess?->academicYear?->academic_session . "/" . $registrationSeed;

                $admissionProcess->update([
                    'registration_seed' => $registrationSeed + 1
                ]);
            }

            $dataArray = array(
                'admission_academic_year_id' => $input['academic_year_id'] ?? null,
                'class_name_id' => $input['class_name_id'] ?? null,
                'enquiry_date_at' => !empty($input['enquiry_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['enquiry_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'category_id' => !empty($input['category_id']) ? intval($input['category_id']) : null,
                'user_id' => !empty($input['user_id']) ? intval($input['user_id']) : null,
                'source_id' => !empty($input['source_id']) ? intval($input['source_id']) : null,
                'state_id' => !empty($input['state_id']) ? intval($input['state_id']) : null,
                'first_name' => $input['first_name'],
                'middle_name' => !empty($input['middle_name']) ? $input['middle_name'] : null,
                'last_name' => !empty($input['last_name']) ? $input['last_name'] : null,
                'date_of_birth' => !empty($input['date_of_birth']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['date_of_birth'])->timezone(getSchoolTimeZone())->toDateString() : null,
                'gender' =>  $input['gender'],
                'boarding_scholar' => !empty($input['boarding_scholar']) ? $input['boarding_scholar'] : null,
                'contact_name' => !empty($input['contact_name']) ? $input['contact_name'] : null,
                'reference_by' => !empty($input['reference_by']) ? $input['reference_by'] : null,
                'employment_category_id' => !empty($input['employment_category_id']) ? $input['employment_category_id'] : null,
                'enquiry_detail' => !empty($input['enquiry_detail']) ? $input['enquiry_detail'] : null,
                'contact_number' => !empty($input['contact_number']) ? $input['contact_number'] : null,
                'contact_email' => !empty($input['contact_email']) ? $input['contact_email'] : null,
                'person_to_meet' => !empty($input['person_to_meet']) ? $input['person_to_meet'] : null,
                'in_time' => !empty($input['in_time']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['in_time'])->timezone(getSchoolTimeZone())->format('H:i:s') : null,
                'refer_mobile' => !empty($input['refer_mobile']) ? $input['refer_mobile'] : null,
                'blood_group' => !empty($input['blood_group']) ? $input['blood_group'] : null,
                'religion' => !empty($input['religion']) ? $input['religion'] : null,
                'country_id' => !empty($input['country_id']) ? $input['country_id'] : null,
                'aadhar_card_no' => !empty($input['aadhar_card_no']) ? $input['aadhar_card_no'] : null,
                'srn_no' => !empty($input['srn_no']) ? $input['srn_no'] : null,
                'child_id' => !empty($input['child_id']) ? $input['child_id'] : null,
                'samagra_id' => !empty($input['samagra_id']) ? $input['samagra_id'] : null,
                'mother_tongue' => !empty($input['mother_tongue']) ? $input['mother_tongue'] : null,
                'medical_condition' => !empty($input['medical_condition']) ? $input['medical_condition'] : null,
                'date_of_registration' => !empty($input['date_of_registration']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['date_of_registration'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'form_no' => !empty($input['form_no']) ? intval($input['form_no']) : null,
                'is_physically_disabled' => !empty($input['is_physically_disabled']) ? $input['is_physically_disabled'] : 0,
                'is_special_child' => !empty($input['is_special_child']) ? $input['is_special_child'] : 0,
                'conomically_weaker_section' => !empty($input['conomically_weaker_section']) ? $input['conomically_weaker_section'] : 0,
                'is_have_sibling' => !empty($input['is_have_sibling']) ? $input['is_have_sibling'] : 0,
                'is_transport_availed' => !empty($input['is_transport_availed']) ? $input['is_transport_availed'] : 0,
                'reference_by_parent' => !empty($input['reference_by_parent']) ? $input['reference_by_parent'] : null,
                'registration_no' => $registrationNo,

                //refer person Previous School Details info.
                'school_name' => !empty($input['school_name']) ? $input['school_name'] : null,
                'school_class' => !empty($input['school_class']) ? $input['school_class'] : null,
                'school_year' => !empty($input['school_year']) ? $input['school_year'] : null,
                'tc_no' => !empty($input['tc_no']) ? $input['tc_no'] : null,
                'referred_by' => !empty($input['referred_by']) ? $input['referred_by'] : null,

                //present info
                'present_address' => !empty($input['present_address']) ? $input['present_address'] : null,
                'landmark' => !empty($input['landmark']) ? $input['landmark'] : null,
                'present_state' => !empty($input['present_state']) ? intval($input['present_state']) : null,
                'city' => !empty($input['city']) ? $input['city'] : null,
                'district' => !empty($input['district']) ? $input['district'] : null,
                'taluka' => !empty($input['taluka']) ? $input['taluka'] : null,
                'pin_code' => !empty($input['pin_code']) ? $input['pin_code'] : null,

                //permanent info
                'permanent_address' => !empty($input['permanent_address']) ? $input['permanent_address'] : null,
                'permanent_state' => !empty($input['permanent_state']) ? intval($input['permanent_state']) : null,
                'permanent_city' => !empty($input['permanent_city']) ? $input['permanent_city'] : null,
                'permanent_district' => !empty($input['permanent_district']) ? $input['permanent_district'] : null,
                'permanent_taluka' => !empty($input['permanent_taluka']) ? $input['permanent_taluka'] : null,
                'permanent_pin_code' => !empty($input['permanent_pin_code']) ? $input['permanent_pin_code'] : null,

                //siblings info.
                'sibling_name' => !empty($input['sibling_name']) ? $input['sibling_name'] : null,
                'sibling_std' => !empty($input['sibling_std']) ? $input['sibling_std'] : null,
                'sibling_adm_no' => !empty($input['sibling_adm_no']) ? $input['sibling_adm_no'] : null,
                'sibling_year' => !empty($input['sibling_year']) ? $input['sibling_year'] : null,
                'enquiry_type' => EnquiryType::REGISTRATION,
                'enquiry_status' => EnquiryStatus::REGISTRATION_TAKEN,
                'registration_status' => RegistrationStatus::NEW,
                'registration_mode' => RegistrationMode::ERP
            );

            $enquiry->update($dataArray);

            if (!empty($enquiry->id)) {
                // enquery fee
                $nextFeeReceiptNumber = $this->feePaymentMethodRepository->getNextRegistrationFeeReceiptNumber();

                $enqueryFeeArr = [
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => $enquiry?->academic_year_id,
                    'enquiry_id' => $enquiry->id,
                    'academic_fee' => !empty($input['academic_fee']) ? $input['academic_fee'] : null,
                    'payment_mode' => !empty($input['payment_mode']) ? $input['payment_mode'] : null,
                    'payment_note' => !empty($input['payment_note']) ? $input['payment_note'] : null,
                    'cheque_no' => intval($input['cheque_no']),
                    'cheque_date' => !empty($input['cheque_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['cheque_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                    'bank_id' => !empty($input['bank_id']) ? intval($input['bank_id']) : null,
                    'bank_account_id' => !empty($input['bank_account_id']) ? intval($input['bank_account_id']) : null,
                    'paytm_ref_no' => !empty($input['paytm_ref_no']) ? intval($input['paytm_ref_no']) : null,
                    'paytm_mobile' => !empty($input['paytm_mobile']) ? intval($input['paytm_mobile']) : null,
                    'neft_number' => !empty($input['neft_number']) ? intval($input['neft_number']) : null,
                    'neft_desc' => !empty($input['neft_desc']) ? $input['neft_desc'] : null,
                    'upi_number' => !empty($input['upi_number']) ? intval($input['upi_number']) : null,
                    'upi_description' => !empty($input['upi_description']) ? $input['upi_description'] : null,
                    'created_by' => auth()->user()->id,
                    'payment_date' => !empty($input['payment_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['payment_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                    'receipt_no' => (int) $nextFeeReceiptNumber,
                ];

                $this->feeRepository->createEnquiryFee($enqueryFeeArr);

                $receiptNumberSetting = getSiteSettingData('fee_is_registration_seed_no_enabled');
                $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";

                if ($receiptNumberEnabaled) {
                    $currentSeedNo = getCurrentRegistrationFeeReceiptSeedNumber();
                    setSiteSettingData('Fee', 'fee_registration_seed_no', $currentSeedNo + 1);
                }

                //father info
                $enqueryGuardianArr = [
                    'enquiry_id' => $enquiry?->id,
                    'father_first_name' => !empty($input['father_first_name']) ? $input['father_first_name'] : null,
                    'father_middle_name' => !empty($input['father_middle_name']) ? $input['father_middle_name'] : null,
                    'father_last_name' => !empty($input['father_last_name']) ? $input['father_last_name'] : null,
                    'father_email' => !empty($input['father_email']) ? $input['father_email'] : null,
                    'father_mobile' => !empty($input['father_mobile']) ? $input['father_mobile'] : null,
                    'father_sms_number' => !empty($input['father_sms_number']) ? $input['father_sms_number'] : null,
                    'father_occupation' => !empty($input['father_occupation']) ? $input['father_occupation'] : null,
                    'father_highest_qualification' => !empty($input['father_highest_qualification']) ? $input['father_highest_qualification'] : null,
                    'father_aadhar_card_no' => !empty($input['father_aadhar_card_no']) ? $input['father_aadhar_card_no'] : null,
                    'father_income_per_year' => !empty($input['father_income_per_year']) ? $input['father_income_per_year'] : null,
                    'father_department' => !empty($input['father_department']) ? $input['father_department'] : null,
                    'father_designation' => !empty($input['father_designation']) ? $input['father_designation'] : null,
                    'father_pan_card_no' => !empty($input['father_pan_card_no']) ? $input['father_pan_card_no'] : null,
                    'father_company_name' => !empty($input['father_company_name']) ? $input['father_company_name'] : null,
                    'father_office_address' => !empty($input['father_office_address']) ? $input['father_office_address'] : null,
                    //mother info
                    'mother_first_name' => !empty($input['mother_first_name']) ? $input['mother_first_name'] : null,
                    'mother_middle_name' => !empty($input['mother_middle_name']) ? $input['mother_middle_name'] : null,
                    'mother_last_name' => !empty($input['mother_last_name']) ? $input['mother_last_name'] : null,
                    'mother_email' => !empty($input['mother_email']) ? $input['mother_email'] : null,
                    'mother_mobile' => !empty($input['mother_mobile']) ? $input['mother_mobile'] : null,
                    'mother_highest_qualification' => !empty($input['mother_highest_qualification']) ? $input['mother_highest_qualification'] : null,
                    'mother_occupation' => !empty($input['mother_occupation']) ? $input['mother_occupation'] : null,
                    'mother_income_per_year' => !empty($input['mother_income_per_year']) ? $input['mother_income_per_year'] : null,
                    'mother_department' => !empty($input['mother_department']) ? $input['mother_department'] : null,
                    'mother_designation' => !empty($input['mother_designation']) ? $input['mother_designation'] : null,
                    'mother_aadhar_card_no' => !empty($input['mother_aadhar_card_no']) ? $input['mother_aadhar_card_no'] : null,
                    'mother_pan_card_no' => !empty($input['mother_pan_card_no']) ? $input['mother_pan_card_no'] : null,
                    'mother_company_name' => !empty($input['mother_company_name']) ? $input['mother_company_name'] : null,
                    'mother_office_address' => !empty($input['mother_office_address']) ? $input['mother_office_address'] : null,
                ];

                if ($enquiry?->guardian != null) {
                    $enquiry?->guardian->update($enqueryGuardianArr);
                } else {
                    $this->guardianRepository->createEnquiryGuardian($enqueryGuardianArr);
                }

                if (!empty($input['is_have_sibling']) && $input['is_have_sibling'] == true && !empty($input['sibling_id'])) {
                    $studentSibling = array(
                        'school_id'  => getUserSchoolId(),
                        'enquiry_id' => $enquiry->id,
                        'sibling_id' => $input['sibling_id'],
                        'status' => Status::ACTIVE,
                    );

                    $this->admissionRepository->createEnquerySibling($studentSibling);
                }

                // if (!empty($input['selectedSibling'])) {
                //     foreach ($input['selectedSibling'] as $sibling) {
                //         $studentSibling = array(
                //             'school_id'  => getUserSchoolId(),
                //             'enquiry_id' => $enquiry?->id,
                //             'sibling_id' => $sibling['id'] ?? null,
                //             'status' => Status::ACTIVE,
                //         );

                //         $this->admissionRepository->createEnquerySibling($studentSibling);
                //     }
                // }
            }

            // student image
            if (!empty($request->file('student_image'))) {
                $image_url = $this->_upload->uploadImage($request, 'student_image', 'student_image');

                $dataImage = array(
                    'school_id' => getUserSchoolId(),
                    'imageable_type' => Enquiry::class,
                    'imageable_id' => $enquiry?->id,
                    'name' => 'student_image',
                    'path' => !empty($image_url) ? $image_url : NULL,
                    'status' => Status::ACTIVE,
                );

                $this->imageRepository->morphCreate($dataImage, $enquiry?->id);
            }

            // Father Profile image
            if (!empty($request->file('father_image'))) {
                $image_url = $this->_upload->uploadImage($request, 'father_image', 'student_image');

                $dataImage = array(
                    'school_id' => getUserSchoolId(),
                    'imageable_type' => Enquiry::class,
                    'imageable_id' => $enquiry?->id,
                    'name' => 'father_image',
                    'path' => !empty($image_url) ? $image_url : NULL,
                    'status' => Status::ACTIVE,
                );

                $this->imageRepository->morphCreate($dataImage, $enquiry?->id);
            }


            // Mother Profile
            if (!empty($request->file('mother_image'))) {
                $image_url = $this->_upload->uploadImage($request, 'mother_image', 'student_image');

                $dataImage = array(
                    'school_id' => getUserSchoolId(),
                    'imageable_type' => Enquiry::class,
                    'imageable_id' => $enquiry?->id,
                    'name' => 'mother_image',
                    'path' => !empty($image_url) ? $image_url : NULL,
                    'status' => Status::ACTIVE,
                );

                $this->imageRepository->morphCreate($dataImage, $enquiry?->id);
            }

            // Guardian profile
            if (!empty($request->file('guardian_image'))) {
                $image_url = $this->_upload->uploadImage($request, 'guardian_image', 'student_image');

                $dataImage = array(
                    'school_id' => getUserSchoolId(),
                    'imageable_type' => Enquiry::class,
                    'imageable_id' => $enquiry?->id,
                    'name' => 'guardian_image',
                    'path' => !empty($image_url) ? $image_url : NULL,
                    'status' => Status::ACTIVE,
                );

                $this->imageRepository->morphCreate($dataImage, $enquiry?->id);
            }

            // enquiry custom field
            if (!empty($input['custom_fields'])) {
                $this->updateOrCreateBulkEnquiryCustomField($enquiry->id, $input['custom_fields']);
            }

            DB::commit();

            return redirect()->route('admission_enquery_reg.enquiry_report')->with('message', 'Updated successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /**
     * save student info from admission form
     */
    public function registrationSave(AdmissionEnquiryRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $admissionProcess = $this->admissionRepository->getAdmissionByAcademicYearId($input['academic_year_id']);
            $registrationNo = "";

            if ($admissionProcess != null) {
                $admissionProcess?->load(['academicYear']);

                $registrationSeed = (int) $admissionProcess?->registration_seed ?? 0;

                $registrationNo = $admissionProcess?->academicYear?->academic_session . "/" . $registrationSeed;

                $admissionProcess->update([
                    'registration_seed' => $registrationSeed + 1
                ]);
            }

            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'admission_academic_year_id' => $input['academic_year_id'] ?? null,
                'class_name_id' => $input['class_name_id'] ?? null,
                'enquiry_date_at' => !empty($input['enquiry_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['enquiry_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'category_id' => !empty($input['category_id']) ? intval($input['category_id']) : null,
                'user_id' => !empty($input['user_id']) ? intval($input['user_id']) : null,
                'source_id' => !empty($input['source_id']) ? intval($input['source_id']) : null,
                'state_id' => !empty($input['state_id']) ? intval($input['state_id']) : null,
                'first_name' => $input['first_name'],
                'middle_name' => !empty($input['middle_name']) ? $input['middle_name'] : null,
                'last_name' => !empty($input['last_name']) ? $input['last_name'] : null,
                'date_of_birth' => !empty($input['date_of_birth']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['date_of_birth'])->timezone(getSchoolTimeZone())->toDateString() : null,
                'boarding_scholar' => !empty($input['boarding_scholar']) ? $input['boarding_scholar'] : null,
                'contact_name' => !empty($input['contact_name']) ? $input['contact_name'] : null,
                'reference_by' => !empty($input['reference_by']) ? $input['reference_by'] : null,
                'employment_category_id' => !empty($input['employment_category_id']) ? $input['employment_category_id'] : null,
                'enquiry_detail' => !empty($input['enquiry_detail']) ? $input['enquiry_detail'] : null,
                'contact_number' => !empty($input['contact_number']) ? $input['contact_number'] : null,
                'contact_email' => !empty($input['contact_email']) ? $input['contact_email'] : null,
                'person_to_meet' => !empty($input['person_to_meet']) ? $input['person_to_meet'] : null,
                'in_time' => !empty($input['in_time']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['in_time'])->timezone(getSchoolTimeZone())->format('H:i:s') : null,
                'refer_mobile' => !empty($input['refer_mobile']) ? $input['refer_mobile'] : null,
                'blood_group' => !empty($input['blood_group']) ? $input['blood_group'] : null,
                'religion' => !empty($input['religion']) ? $input['religion'] : null,
                'country_id' => !empty($input['country_id']) ? $input['country_id'] : null,
                'aadhar_card_no' => !empty($input['aadhar_card_no']) ? $input['aadhar_card_no'] : null,
                'srn_no' => !empty($input['srn_no']) ? $input['srn_no'] : null,
                'child_id' => !empty($input['child_id']) ? $input['child_id'] : null,
                'samagra_id' => !empty($input['samagra_id']) ? $input['samagra_id'] : null,
                'mother_tongue' => !empty($input['mother_tongue']) ? $input['mother_tongue'] : null,
                'medical_condition' => !empty($input['medical_condition']) ? $input['medical_condition'] : null,
                'date_of_registration' => !empty($input['date_of_registration']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['date_of_registration'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'form_no' => !empty($input['form_no']) ? intval($input['form_no']) : null,
                'is_physically_disabled' => !empty($input['is_physically_disabled']) ? $input['is_physically_disabled'] : 0,
                'is_special_child' => !empty($input['is_special_child']) ? $input['is_special_child'] : 0,
                'conomically_weaker_section' => !empty($input['conomically_weaker_section']) ? $input['conomically_weaker_section'] : 0,
                'is_have_sibling' => !empty($input['is_have_sibling']) ? $input['is_have_sibling'] : 0,
                'is_transport_availed' => !empty($input['is_transport_availed']) ? $input['is_transport_availed'] : 0,
                'reference_by_parent' => !empty($input['reference_by_parent']) ? $input['reference_by_parent'] : null,
                'registration_no' => $registrationNo,

                //refer person Previous School Details info.
                'school_name' => !empty($input['school_name']) ? $input['school_name'] : null,
                'school_class' => !empty($input['school_class']) ? $input['school_class'] : null,
                'school_year' => !empty($input['school_year']) ? $input['school_year'] : null,
                'tc_no' => !empty($input['tc_no']) ? $input['tc_no'] : null,
                'referred_by' => !empty($input['referred_by']) ? $input['referred_by'] : null,

                //present info
                'present_address' => !empty($input['present_address']) ? $input['present_address'] : null,
                'landmark' => !empty($input['landmark']) ? $input['landmark'] : null,
                'present_state' => !empty($input['present_state']) ? intval($input['present_state']) : null,
                'city' => !empty($input['city']) ? $input['city'] : null,
                'district' => !empty($input['district']) ? $input['district'] : null,
                'taluka' => !empty($input['taluka']) ? $input['taluka'] : null,
                'pin_code' => !empty($input['pin_code']) ? $input['pin_code'] : null,

                //permanent info
                'permanent_address' => !empty($input['permanent_address']) ? $input['permanent_address'] : null,
                'permanent_state' => !empty($input['permanent_state']) ? intval($input['permanent_state']) : null,
                'permanent_city' => !empty($input['permanent_city']) ? $input['permanent_city'] : null,
                'permanent_district' => !empty($input['permanent_district']) ? $input['permanent_district'] : null,
                'permanent_taluka' => !empty($input['permanent_taluka']) ? $input['permanent_taluka'] : null,
                'permanent_pin_code' => !empty($input['permanent_pin_code']) ? $input['permanent_pin_code'] : null,

                //siblings info.
                'sibling_name' => !empty($input['sibling_name']) ? $input['sibling_name'] : null,
                'sibling_std' => !empty($input['sibling_std']) ? $input['sibling_std'] : null,
                'sibling_adm_no' => !empty($input['sibling_adm_no']) ? $input['sibling_adm_no'] : null,
                'sibling_year' => !empty($input['sibling_year']) ? $input['sibling_year'] : null,
                'is_enquiry' => false,
                'enquiry_type' => EnquiryType::REGISTRATION,
                'registration_status' => RegistrationStatus::NEW,
                'status' => Status::ACTIVE,
                'registration_mode' => RegistrationMode::ERP
            );

            $admissionForm = $this->admissionRepository->createEnquiry($dataArray);

            if (!empty($admissionForm->id)) {
                // enquery fee
                $nextFeeReceiptNumber = $this->feePaymentMethodRepository->getNextRegistrationFeeReceiptNumber();

                $enqueryFeeArr = [
                    'school_id' => getUserSchoolId(),
                    'enquiry_id' => $admissionForm->id,
                    'academic_fee' => !empty($input['academic_fee']) ? $input['academic_fee'] : null,
                    'payment_mode' => !empty($input['payment_mode']) ? $input['payment_mode'] : null,
                    'payment_note' => !empty($input['payment_note']) ? $input['payment_note'] : null,
                    'cheque_no' => intval($input['cheque_no']),
                    'cheque_date' => !empty($input['cheque_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['cheque_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                    'bank_id' => !empty($input['bank_id']) ? intval($input['bank_id']) : null,
                    'bank_account_id' => !empty($input['bank_account_id']) ? intval($input['bank_account_id']) : null,
                    'paytm_ref_no' => !empty($input['paytm_ref_no']) ? intval($input['paytm_ref_no']) : null,
                    'paytm_mobile' => !empty($input['paytm_mobile']) ? intval($input['paytm_mobile']) : null,
                    'neft_number' => !empty($input['neft_number']) ? intval($input['neft_number']) : null,
                    'neft_desc' => !empty($input['neft_desc']) ? $input['neft_desc'] : null,
                    'upi_number' => !empty($input['upi_number']) ? intval($input['upi_number']) : null,
                    'upi_description' => !empty($input['upi_description']) ? $input['upi_description'] : null,
                    'created_by' => auth()->user()->id,
                    'payment_date' => !empty($input['payment_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['payment_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                    'receipt_no' => (int) $nextFeeReceiptNumber,
                ];

                $this->feeRepository->createEnquiryFee($enqueryFeeArr);

                $receiptNumberSetting = getSiteSettingData('fee_is_registration_seed_no_enabled');
                $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";

                if ($receiptNumberEnabaled) {
                    $currentSeedNo = getCurrentRegistrationFeeReceiptSeedNumber();
                    setSiteSettingData('Fee', 'fee_registration_seed_no', $currentSeedNo + 1);
                }

                //father info
                $enqueryGuardianArr = [
                    'school_id' => getUserSchoolId(),
                    'enquiry_id' => $admissionForm->id,
                    'father_first_name' => !empty($input['father_first_name']) ? $input['father_first_name'] : null,
                    'father_middle_name' => !empty($input['father_middle_name']) ? $input['father_middle_name'] : null,
                    'father_last_name' => !empty($input['father_last_name']) ? $input['father_last_name'] : null,
                    'father_email' => !empty($input['father_email']) ? $input['father_email'] : null,
                    'father_mobile' => !empty($input['father_mobile']) ? $input['father_mobile'] : null,
                    'father_sms_number' => !empty($input['father_sms_number']) ? $input['father_sms_number'] : null,
                    'father_occupation' => !empty($input['father_occupation']) ? $input['father_occupation'] : null,
                    'father_highest_qualification' => !empty($input['father_highest_qualification']) ? $input['father_highest_qualification'] : null,
                    'father_aadhar_card_no' => !empty($input['father_aadhar_card_no']) ? $input['father_aadhar_card_no'] : null,
                    'father_income_per_year' => !empty($input['father_income_per_year']) ? $input['father_income_per_year'] : null,
                    'father_department' => !empty($input['father_department']) ? $input['father_department'] : null,
                    'father_designation' => !empty($input['father_designation']) ? $input['father_designation'] : null,
                    'father_pan_card_no' => !empty($input['father_pan_card_no']) ? $input['father_pan_card_no'] : null,
                    'father_company_name' => !empty($input['father_company_name']) ? $input['father_company_name'] : null,
                    'father_office_address' => !empty($input['father_office_address']) ? $input['father_office_address'] : null,
                    //mother info
                    'mother_first_name' => !empty($input['mother_first_name']) ? $input['mother_first_name'] : null,
                    'mother_middle_name' => !empty($input['mother_middle_name']) ? $input['mother_middle_name'] : null,
                    'mother_last_name' => !empty($input['mother_last_name']) ? $input['mother_last_name'] : null,
                    'mother_email' => !empty($input['mother_email']) ? $input['mother_email'] : null,
                    'mother_mobile' => !empty($input['mother_mobile']) ? $input['mother_mobile'] : null,
                    'mother_highest_qualification' => !empty($input['mother_highest_qualification']) ? $input['mother_highest_qualification'] : null,
                    'mother_occupation' => !empty($input['mother_occupation']) ? $input['mother_occupation'] : null,
                    'mother_income_per_year' => !empty($input['mother_income_per_year']) ? $input['mother_income_per_year'] : null,
                    'mother_department' => !empty($input['mother_department']) ? $input['mother_department'] : null,
                    'mother_designation' => !empty($input['mother_designation']) ? $input['mother_designation'] : null,
                    'mother_aadhar_card_no' => !empty($input['mother_aadhar_card_no']) ? $input['mother_aadhar_card_no'] : null,
                    'mother_pan_card_no' => !empty($input['mother_pan_card_no']) ? $input['mother_pan_card_no'] : null,
                    'mother_company_name' => !empty($input['mother_company_name']) ? $input['mother_company_name'] : null,
                    'mother_office_address' => !empty($input['mother_office_address']) ? $input['mother_office_address'] : null,
                ];

                $this->guardianRepository->createEnquiryGuardian($enqueryGuardianArr);

                if (!empty($input['is_have_sibling']) && $input['is_have_sibling'] == true && !empty($input['sibling_id'])) {
                    $studentSibling = array(
                        'school_id'  => getUserSchoolId(),
                        'enquiry_id' => $admissionForm->id,
                        'sibling_id' => $input['sibling_id'],
                        'status' => Status::ACTIVE,
                    );

                    $this->admissionRepository->createEnquerySibling($studentSibling);
                }
                // if (!empty($input['selectedSibling'])) {
                //     foreach ($input['selectedSibling'] as $sibling) {
                //         $studentSibling = array(
                //             'school_id'  => getUserSchoolId(),
                //             'enquiry_id' => $admissionForm['id'] ?? null,
                //             'sibling_id' => $sibling['id'] ?? null,
                //             'status' => Status::ACTIVE,
                //         );
                //         $this->admissionRepository->createEnquerySibling($studentSibling);
                //     }
                // }
            }

            // student image
            if (!empty($request->file('student_image'))) {
                $image_url = $this->_upload->uploadImage($request, 'student_image', 'student_image');

                $dataImage = array(
                    'school_id' => getUserSchoolId(),
                    'imageable_type' => Enquiry::class,
                    'imageable_id' => $admissionForm['id'],
                    'name' => 'student_image',
                    'path' => !empty($image_url) ? $image_url : NULL,
                    'status' => Status::ACTIVE,
                );

                $this->imageRepository->morphCreate($dataImage, $admissionForm['id']);
            }

            // Father Profile image
            if (!empty($request->file('father_image'))) {
                $image_url = $this->_upload->uploadImage($request, 'father_image', 'student_image');

                $dataImage = array(
                    'school_id' => getUserSchoolId(),
                    'imageable_type' => Enquiry::class,
                    'imageable_id' => $admissionForm['id'],
                    'name' => 'father_image',
                    'path' => !empty($image_url) ? $image_url : NULL,
                    'status' => Status::ACTIVE,
                );

                $this->imageRepository->morphCreate($dataImage, $admissionForm['id']);
            }


            // Mother Profile
            if (!empty($request->file('mother_image'))) {
                $image_url = $this->_upload->uploadImage($request, 'mother_image', 'student_image');

                $dataImage = array(
                    'school_id' => getUserSchoolId(),
                    'imageable_type' => Enquiry::class,
                    'imageable_id' => $admissionForm['id'],
                    'name' => 'mother_image',
                    'path' => !empty($image_url) ? $image_url : NULL,
                    'status' => Status::ACTIVE,
                );

                $this->imageRepository->morphCreate($dataImage, $admissionForm['id']);
            }

            // Guardian profile
            if (!empty($request->file('guardian_image'))) {
                $image_url = $this->_upload->uploadImage($request, 'guardian_image', 'student_image');

                $dataImage = array(
                    'school_id' => getUserSchoolId(),
                    'imageable_type' => Enquiry::class,
                    'imageable_id' => $admissionForm['id'],
                    'name' => 'guardian_image',
                    'path' => !empty($image_url) ? $image_url : NULL,
                    'status' => Status::ACTIVE,
                );

                $this->imageRepository->morphCreate($dataImage, $admissionForm['id']);
            }

            // enquiry custom field
            if (!empty($input['custom_fields'])) {
                $this->createBulkEnquiryCustomField($admissionForm->id, $input['custom_fields']);
            }

            DB::commit();

            return redirect()->route('admission.registration_list')->with('message', 'Your Registration Form submitted successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /*
    * create bulk enquiry custom field
    */
    protected function createBulkEnquiryCustomField(int $enquiryId, array $customFields)
    {
        $schoolId = getUserSchoolId();
        $dataArray = [];

        foreach ($customFields as $customField) {
            $dataArray[] = [
                'school_id' => $schoolId,
                'enquiry_id' => $enquiryId,
                'custom_field_id' => $customField['id'] ?? null,
                'value' => $customField['value'] ?? null,
                'status' => Status::ACTIVE,
                'created_at' => now(),
                'updated_at' => now()
            ];
        }

        $this->customFieldRepository->insertEnquiryCustomField($dataArray);
    }

    /*
    * update or create bulk enquiry custom field
    */
    protected function updateOrCreateBulkEnquiryCustomField(int $enquiryId, array $customFields)
    {
        $schoolId = getUserSchoolId();

        foreach ($customFields as $customField) {
            $atributesToCheck = [
                'school_id' => $schoolId,
                'enquiry_id' => $enquiryId,
                'custom_field_id' => $customField['id'] ?? null
            ];

            $valuesToUpdate = [
                'value' => $customField['value'] ?? null,
                'status' => Status::ACTIVE,
                'created_at' => now(),
                'updated_at' => now()
            ];

            $this->customFieldRepository->updateOrCreateEnquiryCustomField($atributesToCheck, $valuesToUpdate);
        }
    }

    /**
     * save student info from admission form
     */
    public function registrationSaveOld(AdmissionEnquiryRequest $request): RedirectResponse
    {
        $input = $request->all();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => intval($input['academic_year_id']),
            'classroom_id' => intval($input['classroom_id']),
            'enquiry_date_at' => !empty($input['enquiry_date_at']) ? \Carbon\Carbon::parse($input['enquiry_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'category_id' => !empty($input['category_id']) ? intval($input['category_id']) : null,
            'user_id' => !empty($input['user_id']) ? intval($input['user_id']) : null,
            'source_id' => !empty($input['source_id']) ? intval($input['source_id']) : null,
            'state_id' => !empty($input['state_id']) ? intval($input['state_id']) : null,
            'first_name' => $input['first_name'],
            'middle_name' => !empty($input['middle_name']) ? $input['middle_name'] : null,
            'last_name' => !empty($input['last_name']) ? $input['last_name'] : null,
            'date_of_birth' => !empty($input['date_of_birth']) ? \Carbon\Carbon::parse($input['date_of_birth'])->format('Y-m-d') : date('Y-m-d'),
            'gender' =>  $input['gender'],
            'boarding_scholar' => !empty($input['boarding_scholar']) ? $input['boarding_scholar'] : null,
            'contact_name' => !empty($input['contact_name']) ? $input['contact_name'] : null,
            'reference_by' => !empty($input['reference_by']) ? $input['reference_by'] : null,
            'employment_category_id' => !empty($input['employment_category_id']) ? $input['employment_category_id'] : null,
            'enquiry_detail' => !empty($input['enquiry_detail']) ? $input['enquiry_detail'] : null,
            'contact_number' => !empty($input['contact_number']) ? $input['contact_number'] : null,
            'contact_email' => !empty($input['contact_email']) ? $input['contact_email'] : null,
            'person_to_meet' => !empty($input['person_to_meet']) ? $input['person_to_meet'] : null,
            'in_time' => !empty($input['in_time']) ? \Carbon\Carbon::parse($input['in_time'])->format('H:i:s') : date('H:i:s'),
            'refer_mobile' => !empty($input['refer_mobile']) ? $input['refer_mobile'] : null,
            'blood_group' => !empty($input['blood_group']) ? $input['blood_group'] : null,
            'religion' => !empty($input['religion']) ? $input['religion'] : null,
            'nationality' => !empty($input['nationality']) ? $input['nationality'] : null,
            'aadhar_card_no' => !empty($input['aadhar_card_no']) ? $input['aadhar_card_no'] : null,
            'srn_no' => !empty($input['srn_no']) ? $input['srn_no'] : null,
            'child_id' => !empty($input['child_id']) ? $input['child_id'] : null,
            'samagra_id' => !empty($input['samagra_id']) ? $input['samagra_id'] : null,
            'mother_tongue' => !empty($input['mother_tongue']) ? $input['mother_tongue'] : null,
            'medical_condition' => !empty($input['medical_condition']) ? $input['medical_condition'] : null,
            'date_of_registration' => !empty($input['date_of_registration']) ? \Carbon\Carbon::parse($input['date_of_registration'])->format('Y-m-d') : date('Y-m-d'),
            'form_no' => !empty($input['form_no']) ? intval($input['form_no']) : null,
            'is_physically_disabled' => !empty($input['is_physically_disabled']) ? $input['is_physically_disabled'] : 0,
            'is_special_child' => !empty($input['is_special_child']) ? $input['is_special_child'] : 0,
            'conomically_weaker_section' => !empty($input['conomically_weaker_section']) ? $input['conomically_weaker_section'] : 0,
            'is_have_sibling' => !empty($input['is_have_sibling']) ? $input['is_have_sibling'] : 0,
            'is_transport_availed' => !empty($input['is_transport_availed']) ? $input['is_transport_availed'] : 0,
            'reference_by_parent' => !empty($input['reference_by_parent']) ? $input['reference_by_parent'] : null,

            //refer person Previous School Details info.
            'school_name' => !empty($input['school_name']) ? $input['school_name'] : null,
            'school_class' => !empty($input['school_class']) ? $input['school_class'] : null,
            'school_year' => !empty($input['school_year']) ? $input['school_year'] : null,
            'tc_no' => !empty($input['tc_no']) ? $input['tc_no'] : null,
            'referred_by' => !empty($input['referred_by']) ? $input['referred_by'] : null,

            //present info
            'present_address' => !empty($input['present_address']) ? $input['present_address'] : null,
            'landmark' => !empty($input['landmark']) ? $input['landmark'] : null,
            'present_state' => !empty($input['present_state']) ? intval($input['present_state']) : null,
            'city' => !empty($input['city']) ? $input['city'] : null,
            'district' => !empty($input['district']) ? $input['district'] : null,
            'taluka' => !empty($input['taluka']) ? $input['taluka'] : null,
            'pin_code' => !empty($input['pin_code']) ? $input['pin_code'] : null,

            //permanent info
            'permanent_address' => !empty($input['permanent_address']) ? $input['permanent_address'] : null,
            'permanent_state' => !empty($input['permanent_state']) ? intval($input['permanent_state']) : null,
            'permanent_city' => !empty($input['permanent_city']) ? $input['permanent_city'] : null,
            'permanent_district' => !empty($input['permanent_district']) ? $input['permanent_district'] : null,
            'permanent_taluka' => !empty($input['permanent_taluka']) ? $input['permanent_taluka'] : null,
            'permanent_pin_code' => !empty($input['permanent_pin_code']) ? $input['permanent_pin_code'] : null,

            //siblings info.
            'sibling_name' => !empty($input['sibling_name']) ? $input['sibling_name'] : null,
            'sibling_std' => !empty($input['sibling_std']) ? $input['sibling_std'] : null,
            'sibling_adm_no' => !empty($input['sibling_adm_no']) ? $input['sibling_adm_no'] : null,
            'sibling_year' => !empty($input['sibling_year']) ? $input['sibling_year'] : null,
            'enquiry_type' => EnquiryType::ADMISSION,
            'status' => Status::ACTIVE,

        );

        $admissionForm = $this->admissionRepository->createEnquery($dataArray);

        if (!empty($admissionForm->id)) {
            // enquery fee
            $enqueryFeeArr = [
                'school_id' => getUserSchoolId(),
                'enquiry_id' => $admissionForm->id,
                'academic_fee' => !empty($input['academic_fee']) ? $input['academic_fee'] : null,
                'payment_mode' => !empty($input['payment_mode']) ? $input['payment_mode'] : null,
                'payment_note' => !empty($input['payment_note']) ? $input['payment_note'] : null,
                'cheque_no' => intval($input['cheque_no']),
                'cheque_date' => !empty($input['cheque_date']) ? \Carbon\Carbon::parse($input['cheque_date'])->format('Y-m-d') : date('Y-m-d'),
                'bank_id' => !empty($input['bank_id']) ? intval($input['bank_id']) : null,
                'bank_account_id' => !empty($input['bank_account_id']) ? intval($input['bank_account_id']) : null,
                'paytm_ref_no' => !empty($input['paytm_ref_no']) ? intval($input['paytm_ref_no']) : null,
                'paytm_mobile' => !empty($input['paytm_mobile']) ? intval($input['paytm_mobile']) : null,
                'neft_number' => !empty($input['neft_number']) ? intval($input['neft_number']) : null,
                'neft_desc' => !empty($input['neft_desc']) ? $input['neft_desc'] : null,
                'upi_number' => !empty($input['upi_number']) ? intval($input['upi_number']) : null,
                'upi_description' => !empty($input['upi_description']) ? $input['upi_description'] : null,
            ];
            $this->feeRepository->createEnquiryFee($enqueryFeeArr);


            //father info
            $enqueryGuardianArr = [
                'school_id' => getUserSchoolId(),
                'enquiry_id' => $admissionForm->id,
                'father_first_name' => !empty($input['father_first_name']) ? $input['father_first_name'] : null,
                'father_middle_name' => !empty($input['father_middle_name']) ? $input['father_middle_name'] : null,
                'father_last_name' => !empty($input['father_last_name']) ? $input['father_last_name'] : null,
                'father_email' => !empty($input['father_email']) ? $input['father_email'] : null,
                'father_mobile' => !empty($input['father_mobile']) ? $input['father_mobile'] : null,
                'father_sms_number' => !empty($input['father_sms_number']) ? $input['father_sms_number'] : null,
                'father_occupation' => !empty($input['father_occupation']) ? $input['father_occupation'] : null,
                'father_highest_qualification' => !empty($input['father_highest_qualification']) ? $input['father_highest_qualification'] : null,
                'father_aadhar_card_no' => !empty($input['father_aadhar_card_no']) ? $input['father_aadhar_card_no'] : null,
                'father_income_per_year' => !empty($input['father_income_per_year']) ? $input['father_income_per_year'] : null,
                'father_department' => !empty($input['father_department']) ? $input['father_department'] : null,
                'father_designation' => !empty($input['father_designation']) ? $input['father_designation'] : null,
                'father_pan_card_no' => !empty($input['father_pan_card_no']) ? $input['father_pan_card_no'] : null,
                'father_company_name' => !empty($input['father_company_name']) ? $input['father_company_name'] : null,
                'father_office_address' => !empty($input['father_office_address']) ? $input['father_office_address'] : null,
                //mother info
                'mother_first_name' => !empty($input['mother_first_name']) ? $input['mother_first_name'] : null,
                'mother_middle_name' => !empty($input['mother_middle_name']) ? $input['mother_middle_name'] : null,
                'mother_last_name' => !empty($input['mother_last_name']) ? $input['mother_last_name'] : null,
                'mother_email' => !empty($input['mother_email']) ? $input['mother_email'] : null,
                'mother_mobile' => !empty($input['mother_mobile']) ? $input['mother_mobile'] : null,
                'mother_highest_qualification' => !empty($input['mother_highest_qualification']) ? $input['mother_highest_qualification'] : null,
                'mother_occupation' => !empty($input['mother_occupation']) ? $input['mother_occupation'] : null,
                'mother_income_per_year' => !empty($input['mother_income_per_year']) ? $input['mother_income_per_year'] : null,
                'mother_department' => !empty($input['mother_department']) ? $input['mother_department'] : null,
                'mother_designation' => !empty($input['mother_designation']) ? $input['mother_designation'] : null,
                'mother_aadhar_card_no' => !empty($input['mother_aadhar_card_no']) ? $input['mother_aadhar_card_no'] : null,
                'mother_pan_card_no' => !empty($input['mother_pan_card_no']) ? $input['mother_pan_card_no'] : null,
                'mother_company_name' => !empty($input['mother_company_name']) ? $input['mother_company_name'] : null,
                'mother_office_address' => !empty($input['mother_office_address']) ? $input['mother_office_address'] : null,
            ];
            $enqueryGuardian = $this->guardianRepository->createEnquiryGuardian($enqueryGuardianArr);

            foreach ($input['selectedSibling'] as $sibling) {
                $studentSibling = array(
                    'school_id'  => getUserSchoolId(),
                    'enquiry_id' => $admissionForm['id'] ?? null,
                    'sibling_id' => $sibling['id'] ?? null,
                    'status' => Status::ACTIVE,
                );
                $this->admissionRepository->createEnquerySibling($studentSibling);
            }
        }

        // student image
        if (!empty($request->file('student_image'))) {

            $image_url = $this->_upload->uploadImage($request, 'student_image', 'student_image');

            $dataImage = array(
                'school_id' => getUserSchoolId(),
                'imageable_type' => Enquery::class,
                'imageable_id' => $admissionForm['id'],
                'name' => 'student_image',
                'path' => !empty($image_url) ? $image_url : NULL,
                'status' => Status::ACTIVE,
            );

            $image = $this->imageRepository->morphCreate($dataImage, $admissionForm['id']);
        }

        // Father Profile image
        if (!empty($request->file('father_image'))) {

            $image_url = $this->_upload->uploadImage($request, 'father_image', 'student_image');

            $dataImage = array(
                'school_id' => getUserSchoolId(),
                'imageable_type' => Enquery::class,
                'imageable_id' => $admissionForm['id'],
                'name' => 'father_image',
                'path' => !empty($image_url) ? $image_url : NULL,
                'status' => Status::ACTIVE,
            );

            $image = $this->imageRepository->morphCreate($dataImage, $admissionForm['id']);
        }


        // Mother Profile
        if (!empty($request->file('mother_image'))) {

            $image_url = $this->_upload->uploadImage($request, 'mother_image', 'student_image');

            $dataImage = array(
                'school_id' => getUserSchoolId(),
                'imageable_type' => Enquery::class,
                'imageable_id' => $admissionForm['id'],
                'name' => 'mother_image',
                'path' => !empty($image_url) ? $image_url : NULL,
                'status' => Status::ACTIVE,
            );

            $image = $this->imageRepository->morphCreate($dataImage, $admissionForm['id']);
        }

        // Guardian profile
        if (!empty($request->file('guardian_image'))) {

            $image_url = $this->_upload->uploadImage($request, 'guardian_image', 'student_image');

            $dataImage = array(
                'school_id' => getUserSchoolId(),
                'imageable_type' => Enquery::class,
                'imageable_id' => $admissionForm['id'],
                'name' => 'guardian_image',
                'path' => !empty($image_url) ? $image_url : NULL,
                'status' => Status::ACTIVE,
            );

            $image = $this->imageRepository->morphCreate($dataImage, $admissionForm['id']);
        }

        if (!$admissionForm) {
            return redirect()->route('admission.registration_list')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('admission.registration_list')->with('message', 'Your Admission Form submitted successfully.');
    }


    /**
     * Display the registration edit form.
     */
    public function editRegistration(int $id, Request $request): Response
    {
        $housesData = $this->houseRepository->getActiveNameAndId();
        $admissionNumbersData = $this->admissionRepository->getActiveAdmissionNumberAndId();
        $categoryData = $this->categoryRepository->getActiveNameAndId();
        $catEmpData = $this->categoryRepository->getActiveNameIdStudentEmployment();
        $bloodGroupData = $this->bloodGroupRepository->getActiveNameAndId();
        $religionData = $this->religionRepository->getActiveNameAndId();
        $countryData = $this->countryRepository->getActiveNameAndId();
        $bankData = $this->bankRepository->getActiveNameAndId();
        $stateData = $this->stateRepository->getActiveNameAndId();
        $admissionNo = $this->studentRepository->getNextAdmissionNo();
        $userData = $this->userRepository->getActiveAdminUser();
        $admissionSourceData = $this->admissionRepository->getSchoolWiseActiveAllEnquerySource();
        $staffData = $this->staffRepository->getActiveNameId();

        $admissionSources = $admissionSourceData->map(fn($admissionSource) => ['id' => $admissionSource->id, 'title' => $admissionSource->title])->all();
        $users = $userData->map(function ($user) {
            $fullName = $user?->first_name . " " . $user?->middle_name . " " . $user?->last_name;

            return [
                'id' => $user->id,
                'title' => $fullName
            ];
        })->all();
        $academicYears = getAcademicYearsAll();
        $houses = $housesData->map(fn($house) => ['id' => $house->id, 'title' => $house->name])->all();
        $admissionNumbers = $admissionNumbersData->map(fn($admissionNumber) => ['id' => $admissionNumber->id,  'title' => "{$admissionNumber->admission_number}"])->all();
        $categories = $categoryData->map(fn($category) => ['id' => $category->id, 'title' => $category->title])->all();
        $bloodGroups = $bloodGroupData->map(fn($bloodGroup) => ['id' => $bloodGroup->id, 'title' => $bloodGroup->name])->all();
        $religions = $religionData->map(fn($religion) => ['id' => $religion->id, 'title' => $religion->name])->all();
        $countries = $countryData->map(fn($country) => ['id' => $country->id, 'title' => $country->name])->all();
        $catEmps = $catEmpData->map(fn($catEmp) => ['id' => $catEmp->id, 'title' => $catEmp->title])->all();
        $banks = $bankData->map(fn($bank) => ['id' => $bank->id, 'title' => $bank->name])->all();
        $states = $stateData->map(fn($state) => ['id' => $state->id, 'title' => $state->name])->all();
        $staffs = $staffData->map(fn($staff) => ['id' => $staff->id, 'title' => $staff->first_name . ' ' . $staff->last_name])->all();

        $registrationData = $this->admissionRepository->getEnqueryRelationObjById($id);

        if ($registrationData == null || $registrationData?->enquiry_type == EnquiryType::ADMISSION->value) {
            abort(404);
        }

        $registrationData->loadMissing(['enquiryCustomFields', 'studentImage', 'fatherImage', 'motherImage', 'sibling' => function ($query) {
            $query->with([
                'father',
                'classroom',
                'promotedClassroom',
                'classroomRoll' => function ($query) {
                    $query->where('academic_year_id', getAcademicYearId());
                }
            ]);
        }]);

        if ($registrationData?->sibling != null) {
            if ($registrationData?->sibling?->promotedClassroom != null) {
                if (!empty($registrationData['sibling']['classroom'])) {
                    unset($registrationData['sibling']['classroom']);
                }

                $registrationData['sibling']['classroom'] = $registrationData?->sibling?->promotedClassroom;
                $registrationData['sibling']['classroom_id'] = $registrationData?->sibling?->promotedClassroom?->id;
            }
        }

        // type
        $schBoaType = ScholarBoardingType::cases();
        $schBoaArr = array();
        foreach ($schBoaType as $sbType) {
            array_push($schBoaArr, ['id' => $sbType->value, 'title' => $sbType->value]);
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

        // payment mode
        $paymentModeData = PaymentMode::cases();
        $paymentMode = array();
        foreach ($paymentModeData as $dt) {
            array_push($paymentMode, ['id' => $dt->value, 'title' => $dt->value]);
        }

        // payment mode
        $referenceType = ReferenceType::cases();
        $referenceTypeArr = array();
        foreach ($referenceType as $rt) {
            array_push($referenceTypeArr, ['id' => $rt->value, 'title' => $rt->value]);
        }

        // payment mode
        $alumniType = AlumniType::cases();
        $alumniTypeArr = array();
        foreach ($alumniType as $alt) {
            array_push($alumniTypeArr, ['id' => $alt->value, 'title' => $alt->value]);
        }

        $students = [];
        $classNames = [];
        $admissionProcess = null;
        $academicYearId = $registrationData?->admission_academic_year_id;

        if ($request->isMethod('POST')) {
            $academicYearId = $request->academic_year_id ?? null;
            $studentAdmissionNo = $request->admission_no ?? null;
            $studentFirstName = $request->student_first_name ?? null;
            $fatherFirstName = $request->father_first_name ?? null;
            $fatherMobile = $request->father_mobile ?? null;

            if ($studentAdmissionNo != null || $studentFirstName != null || $fatherFirstName != null || $fatherMobile != null) {
                $students = $this->studentRepository->filterSiblingStudents($studentAdmissionNo, $studentFirstName, $fatherFirstName, $fatherMobile);

                if (count($students) > 0) {
                    $students = $students->map(function ($student) {
                        if ($student?->promotedClassroom != null) {
                            if (!empty($student['classroom'])) {
                                unset($student['classroom']);
                            }

                            $student['classroom'] = $student?->promotedClassroom;
                            $student['classroom_id'] = $student?->promotedClassroom?->id;
                        }

                        return $student;
                    });
                }
            }
        }

        if (!empty($academicYearId)) {
            $admissionProcess = $this->admissionRepository->getAdmissionByAcademicYearId($academicYearId);

            if ($admissionProcess != null) {
                $classNames = $this->classroomRepository->getActiveClassNameAllByAcademicYearId($academicYearId);
            }
        }

        // enquiry custom fields
        $enquiryCustomFields = $registrationData->enquiryCustomFields;

        // custom fields
        $customFields = $this->customFieldRepository->getCustomFieldsByType(StudentStaffFieldType::REGISTERFORSTUDENT->value);

        if (count($customFields) > 0) {
            $customFields = $customFields->map(function ($customField) use ($enquiryCustomFields) {
                $value = '';

                foreach ($enquiryCustomFields as $enquiryCustomField) {
                    if ($enquiryCustomField?->custom_field_id == $customField?->id) {
                        $value = $enquiryCustomField->value ?? '';
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

        return Inertia::render('Admission/EditAdmissionForm', [
            'classNames' => $classNames,
            'houses' => $houses,
            'admissionNumbers' => $admissionNumbers,
            'schBoaArr' => $schBoaArr,
            'genderArr' => $genderArr,
            'categories' => $categories,
            'bloodGroups' => $bloodGroups,
            'religions' => $religions,
            'countries' => $countries,
            'catEmps' => $catEmps,
            'accountArr' => $accountArr,
            'banks' => $banks,
            'admissionNo' => $admissionNo,
            'states' => $states,
            'academicYears' => $academicYears,
            'users' => $users,
            'admissionSources' => $admissionSources,
            'paymentMode' => $paymentMode,
            'referenceTypeArr' => $referenceTypeArr,
            'alumniTypeArr' => $alumniTypeArr,
            'staffs' => $staffs,
            'registrationData' => $registrationData,
            'admissionProcess' => $admissionProcess,
            'students' => $students,
            'customFields' => $customFields,
        ]);
    }

    /**
     * Display the registration form.
     */
    public function editRegistrationOld(int $id): Response
    {

        $classNamesData = $this->classroomRepository->getActiveNameAndId();
        $housesData = $this->houseRepository->getActiveNameAndId();
        $admissionNumbersData = $this->admissionRepository->getActiveAdmissionNumberAndId();
        $categoryData = $this->categoryRepository->getActiveNameAndId();
        $catEmpData = $this->categoryRepository->getActiveNameIdStudentEmployment();
        $bloodGroupData = $this->bloodGroupRepository->getActiveNameAndId();
        $religionData = $this->religionRepository->getActiveNameAndId();
        $countryData = $this->countryRepository->getActiveNameAndId();
        $bankData = $this->bankRepository->getActiveNameAndId();
        $stateData = $this->stateRepository->getActiveNameAndId();
        $admissionNo = $this->studentRepository->getNextAdmissionNo();
        $academicYearData = $this->admissionRepository->findAcademicYear();
        $userData = $this->userRepository->getActiveUserNameAndId();
        $admissionSourceData = $this->admissionRepository->getActiveTitleAndId();
        $staffData = $this->staffRepository->getActiveNameId();

        $admissionSources = $admissionSourceData->map(fn($admissionSource) => ['id' => $admissionSource->id, 'title' => $admissionSource->title])->all();
        $users = $userData->map(fn($user) => ['id' => $user->id, 'title' => $user->username])->all();
        $academicYears = $academicYearData->map(fn($academicYear) => ['id' => $academicYear->id, 'title' => $academicYear->academic_session])->all();
        $classNames = $classNamesData->map(fn($className) => ['id' => $className->id, 'title' => $className->title])->all();
        $houses = $housesData->map(fn($house) => ['id' => $house->id, 'title' => $house->name])->all();
        $admissionNumbers = $admissionNumbersData->map(fn($admissionNumber) => ['id' => $admissionNumber->id,  'title' => "{$admissionNumber->admission_number}"])->all();
        $categories = $categoryData->map(fn($category) => ['id' => $category->id, 'title' => $category->title])->all();
        $bloodGroups = $bloodGroupData->map(fn($bloodGroup) => ['id' => $bloodGroup->id, 'title' => $bloodGroup->name])->all();
        $religions = $religionData->map(fn($religion) => ['id' => $religion->id, 'title' => $religion->name])->all();
        $countries = $countryData->map(fn($country) => ['id' => $country->id, 'title' => $country->name])->all();
        $catEmps = $catEmpData->map(fn($catEmp) => ['id' => $catEmp->id, 'title' => $catEmp->title])->all();
        $banks = $bankData->map(fn($bank) => ['id' => $bank->id, 'title' => $bank->name])->all();
        $states = $stateData->map(fn($state) => ['id' => $state->id, 'title' => $state->name])->all();
        $staffs = $staffData->map(fn($staff) => ['id' => $staff->id, 'title' => $staff->first_name . ' ' . $staff->last_name])->all();

        $registrationData = $this->admissionRepository->getEnqueryRelationObjById($id);

        // type
        $schBoaType = ScholarBoardingType::cases();
        $schBoaArr = array();
        foreach ($schBoaType as $sbType) {
            array_push($schBoaArr, ['id' => $sbType->value, 'title' => $sbType->value]);
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

        // payment mode
        $paymentModeData = PaymentMode::cases();
        $paymentMode = array();
        foreach ($paymentModeData as $dt) {
            array_push($paymentMode, ['id' => $dt->value, 'title' => $dt->value]);
        }

        // payment mode
        $referenceType = ReferenceType::cases();
        $referenceTypeArr = array();
        foreach ($referenceType as $rt) {
            array_push($referenceTypeArr, ['id' => $rt->value, 'title' => $rt->value]);
        }

        // payment mode
        $alumniType = AlumniType::cases();
        $alumniTypeArr = array();
        foreach ($alumniType as $alt) {
            array_push($alumniTypeArr, ['id' => $alt->value, 'title' => $alt->value]);
        }

        return Inertia::render('Admission/EditAdmissionForm', [
            'classNames' => $classNames,
            'houses' => $houses,
            'admissionNumbers' => $admissionNumbers,
            'schBoaArr' => $schBoaArr,
            'genderArr' => $genderArr,
            'categories' => $categories,
            'bloodGroups' => $bloodGroups,
            'religions' => $religions,
            'countries' => $countries,
            'catEmps' => $catEmps,
            'accountArr' => $accountArr,
            'banks' => $banks,
            'admissionNo' => $admissionNo,
            'states' => $states,
            'academicYears' => $academicYears,
            'users' => $users,
            'admissionSources' => $admissionSources,
            'paymentMode' => $paymentMode,
            'referenceTypeArr' => $referenceTypeArr,
            'alumniTypeArr' => $alumniTypeArr,
            'staffs' => $staffs,
            'registrationData' => $registrationData,
        ]);
    }

    /**
     * save student info from admission form
     */
    public function updateRegistration(AdmissionEnquiryRequest $request, $id): RedirectResponse
    {
        $input = $request->all();

        DB::beginTransaction();

        try {
            $enquery = $this->admissionRepository->getEnqueryById($id);

            if ($enquery?->enquiry_type == EnquiryType::ADMISSION->value) {
                return redirect()->back()->with('error', 'Cannot be updated.');
            }

            $dataArray = array(
                'admission_academic_year_id' => !empty($input['academic_year_id']) ? $input['academic_year_id'] : null,
                'class_name_id' => !empty($input['class_name_id']) ? $input['class_name_id'] : null,
                'enquiry_date_at' => !empty($input['enquiry_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['enquiry_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'category_id' => !empty($input['category_id']) ? intval($input['category_id']) : null,
                'user_id' => !empty($input['user_id']) ? intval($input['user_id']) : null,
                'source_id' => !empty($input['source_id']) ? intval($input['source_id']) : null,
                'state_id' => !empty($input['state_id']) ? intval($input['state_id']) : null,
                'first_name' => $input['first_name'],
                'middle_name' => !empty($input['middle_name']) ? $input['middle_name'] : null,
                'last_name' => !empty($input['last_name']) ? $input['last_name'] : null,
                'date_of_birth' => !empty($input['date_of_birth']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['date_of_birth'])->timezone(getSchoolTimeZone())->toDateString() : null,
                'gender' =>  $input['gender'],
                'boarding_scholar' => !empty($input['boarding_scholar']) ? $input['boarding_scholar'] : null,
                'contact_name' => !empty($input['contact_name']) ? $input['contact_name'] : null,
                'reference_by' => !empty($input['reference_by']) ? $input['reference_by'] : null,
                'employment_category_id' => !empty($input['employment_category_id']) ? $input['employment_category_id'] : null,
                'enquiry_detail' => !empty($input['enquiry_detail']) ? $input['enquiry_detail'] : null,
                'contact_number' => !empty($input['contact_number']) ? $input['contact_number'] : null,
                'contact_email' => !empty($input['contact_email']) ? $input['contact_email'] : null,
                'person_to_meet' => !empty($input['person_to_meet']) ? $input['person_to_meet'] : null,
                'in_time' => !empty($input['in_time']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['in_time'])->timezone(getSchoolTimeZone())->format('H:i:s') : date('H:i:s'),
                'refer_mobile' => !empty($input['refer_mobile']) ? $input['refer_mobile'] : null,
                'blood_group' => !empty($input['blood_group']) ? $input['blood_group'] : null,
                'religion' => !empty($input['religion']) ? $input['religion'] : null,
                'country_id' => !empty($input['country_id']) ? $input['country_id'] : null,
                'aadhar_card_no' => !empty($input['aadhar_card_no']) ? $input['aadhar_card_no'] : null,
                'srn_no' => !empty($input['srn_no']) ? $input['srn_no'] : null,
                'child_id' => !empty($input['child_id']) ? $input['child_id'] : null,
                'samagra_id' => !empty($input['samagra_id']) ? $input['samagra_id'] : null,
                'mother_tongue' => !empty($input['mother_tongue']) ? $input['mother_tongue'] : null,
                'medical_condition' => !empty($input['medical_condition']) ? $input['medical_condition'] : null,
                'date_of_registration' => !empty($input['date_of_registration']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['date_of_registration'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'form_no' => !empty($input['form_no']) ? intval($input['form_no']) : null,
                'is_physically_disabled' => !empty($input['is_physically_disabled']) ? $input['is_physically_disabled'] : 0,
                'is_special_child' => !empty($input['is_special_child']) ? $input['is_special_child'] : 0,
                'conomically_weaker_section' => !empty($input['conomically_weaker_section']) ? $input['conomically_weaker_section'] : 0,
                'is_have_sibling' => !empty($input['is_have_sibling']) ? $input['is_have_sibling'] : 0,
                'is_transport_availed' => !empty($input['is_transport_availed']) ? $input['is_transport_availed'] : 0,
                'reference_by_parent' => !empty($input['reference_by_parent']) ? $input['reference_by_parent'] : null,

                //refer person Previous School Details info.
                'school_name' => !empty($input['school_name']) ? $input['school_name'] : null,
                'school_class' => !empty($input['school_class']) ? $input['school_class'] : null,
                'school_year' => !empty($input['school_year']) ? $input['school_year'] : null,
                'tc_no' => !empty($input['tc_no']) ? $input['tc_no'] : null,
                'referred_by' => !empty($input['referred_by']) ? $input['referred_by'] : null,

                //present info
                'present_address' => !empty($input['present_address']) ? $input['present_address'] : null,
                'landmark' => !empty($input['landmark']) ? $input['landmark'] : null,
                'present_state' => !empty($input['present_state']) ? intval($input['present_state']) : null,
                'city' => !empty($input['city']) ? $input['city'] : null,
                'district' => !empty($input['district']) ? $input['district'] : null,
                'taluka' => !empty($input['taluka']) ? $input['taluka'] : null,
                'pin_code' => !empty($input['pin_code']) ? $input['pin_code'] : null,

                //permanent info
                'permanent_address' => !empty($input['permanent_address']) ? $input['permanent_address'] : null,
                'permanent_state' => !empty($input['permanent_state']) ? intval($input['permanent_state']) : null,
                'permanent_city' => !empty($input['permanent_city']) ? $input['permanent_city'] : null,
                'permanent_district' => !empty($input['permanent_district']) ? $input['permanent_district'] : null,
                'permanent_taluka' => !empty($input['permanent_taluka']) ? $input['permanent_taluka'] : null,
                'permanent_pin_code' => !empty($input['permanent_pin_code']) ? $input['permanent_pin_code'] : null,

                //siblings info.
                'sibling_name' => !empty($input['sibling_name']) ? $input['sibling_name'] : null,
                'sibling_std' => !empty($input['sibling_std']) ? $input['sibling_std'] : null,
                'sibling_adm_no' => !empty($input['sibling_adm_no']) ? $input['sibling_adm_no'] : null,
                'sibling_year' => !empty($input['sibling_year']) ? $input['sibling_year'] : null,
            );

            $this->admissionRepository->updateEnquery($id, $dataArray);

            if (!empty($input['enquery_fee_id'])) {
                // enquery fee
                $enqueryFeeArr = [
                    'academic_fee' => !empty($input['academic_fee']) ? $input['academic_fee'] : null,
                    'payment_mode' => !empty($input['payment_mode']) ? $input['payment_mode'] : null,
                    'payment_note' => !empty($input['payment_note']) ? $input['payment_note'] : null,
                    'cheque_no' => intval($input['cheque_no']),
                    'cheque_date' => !empty($input['cheque_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['cheque_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                    'bank_id' => !empty($input['bank_id']) ? intval($input['bank_id']) : null,
                    'bank_account_id' => !empty($input['bank_account_id']) ? intval($input['bank_account_id']) : null,
                    'paytm_ref_no' => !empty($input['paytm_ref_no']) ? intval($input['paytm_ref_no']) : null,
                    'paytm_mobile' => !empty($input['paytm_mobile']) ? intval($input['paytm_mobile']) : null,
                    'neft_number' => !empty($input['neft_number']) ? intval($input['neft_number']) : null,
                    'neft_desc' => !empty($input['neft_desc']) ? $input['neft_desc'] : null,
                    'upi_number' => !empty($input['upi_number']) ? intval($input['upi_number']) : null,
                    'upi_description' => !empty($input['upi_description']) ? $input['upi_description'] : null,
                    'payment_date' => !empty($input['payment_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['payment_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                ];
                $this->feeRepository->updateEnquiryFee($input['enquery_fee_id'], $enqueryFeeArr);
            }

            if (!empty($input['enquiry_guardian_id'])) {
                //father info
                $enqueryGuardianArr = [
                    'school_id' => getUserSchoolId(),
                    'father_first_name' => !empty($input['father_first_name']) ? $input['father_first_name'] : null,
                    'father_middle_name' => !empty($input['father_middle_name']) ? $input['father_middle_name'] : null,
                    'father_last_name' => !empty($input['father_last_name']) ? $input['father_last_name'] : null,
                    'father_email' => !empty($input['father_email']) ? $input['father_email'] : null,
                    'father_mobile' => !empty($input['father_mobile']) ? $input['father_mobile'] : null,
                    'father_sms_number' => !empty($input['father_sms_number']) ? $input['father_sms_number'] : null,
                    'father_occupation' => !empty($input['father_occupation']) ? $input['father_occupation'] : null,
                    'father_highest_qualification' => !empty($input['father_highest_qualification']) ? $input['father_highest_qualification'] : null,
                    'father_aadhar_card_no' => !empty($input['father_aadhar_card_no']) ? $input['father_aadhar_card_no'] : null,
                    'father_income_per_year' => !empty($input['father_income_per_year']) ? $input['father_income_per_year'] : null,
                    'father_department' => !empty($input['father_department']) ? $input['father_department'] : null,
                    'father_designation' => !empty($input['father_designation']) ? $input['father_designation'] : null,
                    'father_pan_card_no' => !empty($input['father_pan_card_no']) ? $input['father_pan_card_no'] : null,
                    'father_company_name' => !empty($input['father_company_name']) ? $input['father_company_name'] : null,
                    'father_office_address' => !empty($input['father_office_address']) ? $input['father_office_address'] : null,
                    //mother info
                    'mother_first_name' => !empty($input['mother_first_name']) ? $input['mother_first_name'] : null,
                    'mother_middle_name' => !empty($input['mother_middle_name']) ? $input['mother_middle_name'] : null,
                    'mother_last_name' => !empty($input['mother_last_name']) ? $input['mother_last_name'] : null,
                    'mother_email' => !empty($input['mother_email']) ? $input['mother_email'] : null,
                    'mother_mobile' => !empty($input['mother_mobile']) ? $input['mother_mobile'] : null,
                    'mother_highest_qualification' => !empty($input['mother_highest_qualification']) ? $input['mother_highest_qualification'] : null,
                    'mother_occupation' => !empty($input['mother_occupation']) ? $input['mother_occupation'] : null,
                    'mother_income_per_year' => !empty($input['mother_income_per_year']) ? $input['mother_income_per_year'] : null,
                    'mother_department' => !empty($input['mother_department']) ? $input['mother_department'] : null,
                    'mother_designation' => !empty($input['mother_designation']) ? $input['mother_designation'] : null,
                    'mother_aadhar_card_no' => !empty($input['mother_aadhar_card_no']) ? $input['mother_aadhar_card_no'] : null,
                    'mother_pan_card_no' => !empty($input['mother_pan_card_no']) ? $input['mother_pan_card_no'] : null,
                    'mother_company_name' => !empty($input['mother_company_name']) ? $input['mother_company_name'] : null,
                    'mother_office_address' => !empty($input['mother_office_address']) ? $input['mother_office_address'] : null,
                ];
                $enqueryGuardian = $this->guardianRepository->updateEnquiryGuardian($input['enquiry_guardian_id'], $enqueryGuardianArr);

                // foreach ($input['selectedSibling'] as $sibling) {
                //     $studentSibling = array(
                //         'school_id'  => getUserSchoolId(),
                //         'enquiry_id' => $admissionForm['id'] ?? null,
                //         'sibling_id' => $sibling['id'] ?? null,
                //         'status' => Status::ACTIVE,
                //     );
                //     $this->admissionRepository->createEnquerySibling($studentSibling);
                // }
            }

            if (empty($input['is_have_sibling']) || (!empty($input['is_have_sibling']) && $input['is_have_sibling'] == false)) {
                $this->admissionRepository->deleteEnquerySibling($enquery->id);
            } else if (!empty($input['is_have_sibling']) && $input['is_have_sibling'] == true && !empty($input['sibling_id'])) {
                $attributesToCheck = array(
                    'school_id'  => getUserSchoolId(),
                    'enquiry_id' => $enquery->id,
                );

                $valuesToUpdate = array(
                    'sibling_id' => $input['sibling_id'],
                    'status' => Status::ACTIVE,
                );

                $this->admissionRepository->updateOrCreateEnquerySibling($attributesToCheck, $valuesToUpdate);
            }

            // student image
            if (!empty($request->file('student_image'))) {
                $image_url = $this->_upload->uploadImage($request, 'student_image', 'student_image');

                $dataImage = array(
                    'school_id' => getUserSchoolId(),
                    'imageable_type' => Enquiry::class,
                    'imageable_id' => $enquery?->id,
                    'name' => 'student_image',
                    'path' => !empty($image_url) ? $image_url : NULL,
                    'status' => Status::ACTIVE,
                );

                $this->imageRepository->morphCreate($dataImage, $enquery?->id);
            }

            // Father Profile image
            if (!empty($request->file('father_image'))) {
                $image_url = $this->_upload->uploadImage($request, 'father_image', 'student_image');

                $dataImage = array(
                    'school_id' => getUserSchoolId(),
                    'imageable_type' => Enquiry::class,
                    'imageable_id' => $enquery?->id,
                    'name' => 'father_image',
                    'path' => !empty($image_url) ? $image_url : NULL,
                    'status' => Status::ACTIVE,
                );

                $this->imageRepository->morphCreate($dataImage, $enquery?->id);
            }


            // Mother Profile
            if (!empty($request->file('mother_image'))) {
                $image_url = $this->_upload->uploadImage($request, 'mother_image', 'student_image');

                $dataImage = array(
                    'school_id' => getUserSchoolId(),
                    'imageable_type' => Enquiry::class,
                    'imageable_id' => $enquery?->id,
                    'name' => 'mother_image',
                    'path' => !empty($image_url) ? $image_url : NULL,
                    'status' => Status::ACTIVE,
                );

                $this->imageRepository->morphCreate($dataImage, $enquery?->id);
            }

            // enquiry custom field
            if (!empty($input['custom_fields'])) {
                $this->updateOrCreateBulkEnquiryCustomField($enquery->id, $input['custom_fields']);
            }

            DB::commit();

            return redirect()->route('admission.registration_list')->with('message', 'Updated successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->route('admission.registration_list')->with('error', 'Something goes wrong.');
        }
    }


    /**
     * save student info from admission form
     */
    public function updateRegistrationOld(AdmissionEnquiryRequest $request, $id): RedirectResponse
    {

        $input = $request->all();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => intval($input['academic_year_id']),
            'classroom_id' => intval($input['classroom_id']),
            'enquiry_date_at' => !empty($input['enquiry_date_at']) ? \Carbon\Carbon::parse($input['enquiry_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'category_id' => !empty($input['category_id']) ? intval($input['category_id']) : null,
            'user_id' => !empty($input['user_id']) ? intval($input['user_id']) : null,
            'source_id' => !empty($input['source_id']) ? intval($input['source_id']) : null,
            'state_id' => !empty($input['state_id']) ? intval($input['state_id']) : null,
            'first_name' => $input['first_name'],
            'middle_name' => !empty($input['middle_name']) ? $input['middle_name'] : null,
            'last_name' => !empty($input['last_name']) ? $input['last_name'] : null,
            'date_of_birth' => !empty($input['date_of_birth']) ? \Carbon\Carbon::parse($input['date_of_birth'])->format('Y-m-d') : date('Y-m-d'),
            'gender' =>  $input['gender'],
            'boarding_scholar' => !empty($input['boarding_scholar']) ? $input['boarding_scholar'] : null,
            'contact_name' => !empty($input['contact_name']) ? $input['contact_name'] : null,
            'reference_by' => !empty($input['reference_by']) ? $input['reference_by'] : null,
            'employment_category_id' => !empty($input['employment_category_id']) ? $input['employment_category_id'] : null,
            'enquiry_detail' => !empty($input['enquiry_detail']) ? $input['enquiry_detail'] : null,
            'contact_number' => !empty($input['contact_number']) ? $input['contact_number'] : null,
            'contact_email' => !empty($input['contact_email']) ? $input['contact_email'] : null,
            'person_to_meet' => !empty($input['person_to_meet']) ? $input['person_to_meet'] : null,
            'in_time' => !empty($input['in_time']) ? \Carbon\Carbon::parse($input['in_time'])->format('H:i:s') : date('H:i:s'),
            'refer_mobile' => !empty($input['refer_mobile']) ? $input['refer_mobile'] : null,
            'blood_group' => !empty($input['blood_group']) ? $input['blood_group'] : null,
            'religion' => !empty($input['religion']) ? $input['religion'] : null,
            'country_id' => !empty($input['country_id']) ? $input['country_id'] : null,
            'aadhar_card_no' => !empty($input['aadhar_card_no']) ? $input['aadhar_card_no'] : null,
            'srn_no' => !empty($input['srn_no']) ? $input['srn_no'] : null,
            'child_id' => !empty($input['child_id']) ? $input['child_id'] : null,
            'samagra_id' => !empty($input['samagra_id']) ? $input['samagra_id'] : null,
            'mother_tongue' => !empty($input['mother_tongue']) ? $input['mother_tongue'] : null,
            'medical_condition' => !empty($input['medical_condition']) ? $input['medical_condition'] : null,
            'date_of_registration' => !empty($input['date_of_registration']) ? \Carbon\Carbon::parse($input['date_of_registration'])->format('Y-m-d') : date('Y-m-d'),
            'form_no' => !empty($input['form_no']) ? intval($input['form_no']) : null,
            'is_physically_disabled' => !empty($input['is_physically_disabled']) ? $input['is_physically_disabled'] : 0,
            'is_special_child' => !empty($input['is_special_child']) ? $input['is_special_child'] : 0,
            'conomically_weaker_section' => !empty($input['conomically_weaker_section']) ? $input['conomically_weaker_section'] : 0,
            'is_have_sibling' => !empty($input['is_have_sibling']) ? $input['is_have_sibling'] : 0,
            'is_transport_availed' => !empty($input['is_transport_availed']) ? $input['is_transport_availed'] : 0,
            'reference_by_parent' => !empty($input['reference_by_parent']) ? $input['reference_by_parent'] : null,

            //refer person Previous School Details info.
            'school_name' => !empty($input['school_name']) ? $input['school_name'] : null,
            'school_class' => !empty($input['school_class']) ? $input['school_class'] : null,
            'school_year' => !empty($input['school_year']) ? $input['school_year'] : null,
            'tc_no' => !empty($input['tc_no']) ? $input['tc_no'] : null,
            'referred_by' => !empty($input['referred_by']) ? $input['referred_by'] : null,

            //present info
            'present_address' => !empty($input['present_address']) ? $input['present_address'] : null,
            'landmark' => !empty($input['landmark']) ? $input['landmark'] : null,
            'present_state' => !empty($input['present_state']) ? intval($input['present_state']) : null,
            'city' => !empty($input['city']) ? $input['city'] : null,
            'district' => !empty($input['district']) ? $input['district'] : null,
            'taluka' => !empty($input['taluka']) ? $input['taluka'] : null,
            'pin_code' => !empty($input['pin_code']) ? $input['pin_code'] : null,

            //permanent info
            'permanent_address' => !empty($input['permanent_address']) ? $input['permanent_address'] : null,
            'permanent_state' => !empty($input['permanent_state']) ? intval($input['permanent_state']) : null,
            'permanent_city' => !empty($input['permanent_city']) ? $input['permanent_city'] : null,
            'permanent_district' => !empty($input['permanent_district']) ? $input['permanent_district'] : null,
            'permanent_taluka' => !empty($input['permanent_taluka']) ? $input['permanent_taluka'] : null,
            'permanent_pin_code' => !empty($input['permanent_pin_code']) ? $input['permanent_pin_code'] : null,

            //siblings info.
            'sibling_name' => !empty($input['sibling_name']) ? $input['sibling_name'] : null,
            'sibling_std' => !empty($input['sibling_std']) ? $input['sibling_std'] : null,
            'sibling_adm_no' => !empty($input['sibling_adm_no']) ? $input['sibling_adm_no'] : null,
            'sibling_year' => !empty($input['sibling_year']) ? $input['sibling_year'] : null,
            'enquiry_type' => EnquiryType::ADMISSION,
            'status' => Status::ACTIVE,

        );

        $admissionForm = $this->admissionRepository->updateEnquery($id, $dataArray);

        if (!empty($input['enquery_fee_id'])) {
            // enquery fee
            $enqueryFeeArr = [
                'academic_fee' => !empty($input['academic_fee']) ? $input['academic_fee'] : null,
                'payment_mode' => !empty($input['payment_mode']) ? $input['payment_mode'] : null,
                'payment_note' => !empty($input['payment_note']) ? $input['payment_note'] : null,
                'cheque_no' => intval($input['cheque_no']),
                'cheque_date' => !empty($input['cheque_date']) ? \Carbon\Carbon::parse($input['cheque_date'])->format('Y-m-d') : date('Y-m-d'),
                'bank_id' => !empty($input['bank_id']) ? intval($input['bank_id']) : null,
                'bank_account_id' => !empty($input['bank_account_id']) ? intval($input['bank_account_id']) : null,
                'paytm_ref_no' => !empty($input['paytm_ref_no']) ? intval($input['paytm_ref_no']) : null,
                'paytm_mobile' => !empty($input['paytm_mobile']) ? intval($input['paytm_mobile']) : null,
                'neft_number' => !empty($input['neft_number']) ? intval($input['neft_number']) : null,
                'neft_desc' => !empty($input['neft_desc']) ? $input['neft_desc'] : null,
                'upi_number' => !empty($input['upi_number']) ? intval($input['upi_number']) : null,
                'upi_description' => !empty($input['upi_description']) ? $input['upi_description'] : null,
            ];
            $this->feeRepository->updateEnquiryFee($input['enquery_fee_id'], $enqueryFeeArr);
        }

        if (!empty($input['enquiry_guardian_id'])) {
            //father info
            $enqueryGuardianArr = [
                'school_id' => getUserSchoolId(),
                'father_first_name' => !empty($input['father_first_name']) ? $input['father_first_name'] : null,
                'father_middle_name' => !empty($input['father_middle_name']) ? $input['father_middle_name'] : null,
                'father_last_name' => !empty($input['father_last_name']) ? $input['father_last_name'] : null,
                'father_email' => !empty($input['father_email']) ? $input['father_email'] : null,
                'father_mobile' => !empty($input['father_mobile']) ? $input['father_mobile'] : null,
                'father_sms_number' => !empty($input['father_sms_number']) ? $input['father_sms_number'] : null,
                'father_occupation' => !empty($input['father_occupation']) ? $input['father_occupation'] : null,
                'father_highest_qualification' => !empty($input['father_highest_qualification']) ? $input['father_highest_qualification'] : null,
                'father_aadhar_card_no' => !empty($input['father_aadhar_card_no']) ? $input['father_aadhar_card_no'] : null,
                'father_income_per_year' => !empty($input['father_income_per_year']) ? $input['father_income_per_year'] : null,
                'father_department' => !empty($input['father_department']) ? $input['father_department'] : null,
                'father_designation' => !empty($input['father_designation']) ? $input['father_designation'] : null,
                'father_pan_card_no' => !empty($input['father_pan_card_no']) ? $input['father_pan_card_no'] : null,
                'father_company_name' => !empty($input['father_company_name']) ? $input['father_company_name'] : null,
                'father_office_address' => !empty($input['father_office_address']) ? $input['father_office_address'] : null,
                //mother info
                'mother_first_name' => !empty($input['mother_first_name']) ? $input['mother_first_name'] : null,
                'mother_middle_name' => !empty($input['mother_middle_name']) ? $input['mother_middle_name'] : null,
                'mother_last_name' => !empty($input['mother_last_name']) ? $input['mother_last_name'] : null,
                'mother_email' => !empty($input['mother_email']) ? $input['mother_email'] : null,
                'mother_mobile' => !empty($input['mother_mobile']) ? $input['mother_mobile'] : null,
                'mother_highest_qualification' => !empty($input['mother_highest_qualification']) ? $input['mother_highest_qualification'] : null,
                'mother_occupation' => !empty($input['mother_occupation']) ? $input['mother_occupation'] : null,
                'mother_income_per_year' => !empty($input['mother_income_per_year']) ? $input['mother_income_per_year'] : null,
                'mother_department' => !empty($input['mother_department']) ? $input['mother_department'] : null,
                'mother_designation' => !empty($input['mother_designation']) ? $input['mother_designation'] : null,
                'mother_aadhar_card_no' => !empty($input['mother_aadhar_card_no']) ? $input['mother_aadhar_card_no'] : null,
                'mother_pan_card_no' => !empty($input['mother_pan_card_no']) ? $input['mother_pan_card_no'] : null,
                'mother_company_name' => !empty($input['mother_company_name']) ? $input['mother_company_name'] : null,
                'mother_office_address' => !empty($input['mother_office_address']) ? $input['mother_office_address'] : null,
            ];
            $enqueryGuardian = $this->guardianRepository->updateEnquiryGuardian($input['enquiry_guardian_id'], $enqueryGuardianArr);

            // foreach ($input['selectedSibling'] as $sibling) {
            //     $studentSibling = array(
            //         'school_id'  => getUserSchoolId(),
            //         'enquiry_id' => $admissionForm['id'] ?? null,
            //         'sibling_id' => $sibling['id'] ?? null,
            //         'status' => Status::ACTIVE,
            //     );
            //     $this->admissionRepository->createEnquerySibling($studentSibling);
            // }
        }

        // student image
        if (!empty($request->file('student_image'))) {

            $image_url = $this->_upload->uploadImage($request, 'student_image', 'student_image');

            $dataImage = array(
                'school_id' => getUserSchoolId(),
                'imageable_type' => Enquery::class,
                'imageable_id' => $admissionForm['id'],
                'name' => 'student_image',
                'path' => !empty($image_url) ? $image_url : NULL,
                'status' => Status::ACTIVE,
            );

            $image = $this->imageRepository->morphCreate($dataImage, $admissionForm['id']);
        }

        // Father Profile image
        if (!empty($request->file('father_image'))) {

            $image_url = $this->_upload->uploadImage($request, 'father_image', 'student_image');

            $dataImage = array(
                'school_id' => getUserSchoolId(),
                'imageable_type' => Enquery::class,
                'imageable_id' => $admissionForm['id'],
                'name' => 'father_image',
                'path' => !empty($image_url) ? $image_url : NULL,
                'status' => Status::ACTIVE,
            );

            $image = $this->imageRepository->morphCreate($dataImage, $admissionForm['id']);
        }


        // Mother Profile
        if (!empty($request->file('mother_image'))) {

            $image_url = $this->_upload->uploadImage($request, 'mother_image', 'student_image');

            $dataImage = array(
                'school_id' => getUserSchoolId(),
                'imageable_type' => Enquery::class,
                'imageable_id' => $admissionForm['id'],
                'name' => 'mother_image',
                'path' => !empty($image_url) ? $image_url : NULL,
                'status' => Status::ACTIVE,
            );

            $image = $this->imageRepository->morphCreate($dataImage, $admissionForm['id']);
        }

        // Guardian profile
        if (!empty($request->file('guardian_image'))) {

            $image_url = $this->_upload->uploadImage($request, 'guardian_image', 'student_image');

            $dataImage = array(
                'school_id' => getUserSchoolId(),
                'imageable_type' => Enquery::class,
                'imageable_id' => $admissionForm['id'],
                'name' => 'guardian_image',
                'path' => !empty($image_url) ? $image_url : NULL,
                'status' => Status::ACTIVE,
            );

            $image = $this->imageRepository->morphCreate($dataImage, $admissionForm['id']);
        }

        if (!$admissionForm) {
            return redirect()->route('admission.registration_list')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('admission.registration_list')->with('message', 'Updated successfully.');
    }

    public function enquiryStudentSave(Request $request)
    {
        $input = $request->all();
        $admission_no = $this->studentRepository->getNextAdmissionNo();
        $dataArray = array(
            'admission_no' =>  $admission_no,
            'school_id' => getUserSchoolId(),
            'user_id' => $request->input('user_id') ?? null,
            'classroom_id' => $request->input('classroom_id') ?? null,
            'class_name_id' => $request->input('class_name_id') ?? null,
            'first_name' => $request->input('first_name') ?? null,
            'middle_name' => $request->input('middle_name') ?? null,
            'last_name' => $request->input('last_name') ?? null,
            'phone' => $request->input('contact_number') ?? null,
            'email' => $request->input('contact_email') ?? null,
            'boarding_type' => $request->input('boarding_type') ?? null,
            'gender' => $request->input('gender') ?? null,
            'is_computer_option' => null,
            'is_class_change' => null,
            'is_social_studies_option' => null,
            'height' => null,
            'weight' => null,
            'is_physical_disabled' => null,
            'is_economically_weaker' => null,
            'is_spacial_child' => null,
            'student_status' => $request->input('enquiry_status') ?? null,
            'status' => Status::ACTIVE,
        );

        $student = $this->studentRepository->create($dataArray);

        if (!empty($student['id'])) {

            // father
            if ($request->input('father') == 'Father') {
                $fatherData = array(
                    'school_id'  => getUserSchoolId(),
                    'user_id' => $request->input('user_id') ?? null,
                    'student_id' => $student['id'] ?? '',
                    'guardian_type' => 'Father',
                    'first_name' => $request->input('father_first_name') ?? null,
                    'middle_name' => $request->input('father_middle_name') ?? null,
                    'last_name' => $request->input('father_last_name') ?? null,
                    'phone' => $request->input('father_mobile') ?? null,
                    'email' => $request->input('father_email') ?? null,
                    'occupation' => $request->input('father_occupation') ?? null,
                    'is_inactive' => 0,
                    'status' => Status::ACTIVE
                );
                $this->guardianRepository->create($fatherData);
            }


            // mother
            if ($input['mother_type'] == 'Mother') {
                $motherData = array(
                    'school_id'  => getUserSchoolId(),
                    'student_id' => $student['id'] ?? '',
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
                $this->guardianRepository->create($motherData);


                // guardian
                if ($input['guardian_type'] == 'Guardian') {
                    $guardianData = array(
                        'school_id'  => getUserSchoolId(),
                        'student_id' => $student['id'] ?? '',
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
                    $this->guardianRepository->create($guardianData);
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
            };

            if (!$student) {
                return redirect()->route('student.list')->with('errors', 'Something goes wrong.');
            }
            return redirect()->route('student.list')->with('message', 'Student created successfully.');
            if (!$student) {
                return redirect()->back()->with('error', 'Something goes wrong.');
            }
            return redirect()->back()->with('message', 'Student form submited successfully.');
        }
    }
}
