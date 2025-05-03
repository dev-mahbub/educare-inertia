<?php

namespace App\Http\Controllers\Api\V1;

use Carbon\Carbon;
use App\Enums\Status;
use App\Enums\EnquiryType;
use App\Enums\RegistrationMode;
use App\Enums\RegistrationStatus;
use App\Http\Controllers\Api\ControllerApi;
use App\Models\Enquiry;
use App\Models\SchoolSetting;
use App\Repositories\IAdmissionRepository;
use App\Repositories\IFeePaymentMethodRepository;
use App\Repositories\IFeeRepository;
use App\Repositories\IGuardianRepository;
use App\Repositories\IImageRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdmissionApiController extends ControllerApi
{
    private $_upload;

    public function __construct(
        private IAdmissionRepository $admissionRepository,
        private IGuardianRepository $guardianRepository,
        private IImageRepository $imageRepository,
        
        private IFeeRepository $feeRepository,
        private IFeePaymentMethodRepository $feePaymentMethodRepository,
    ) {
        $this->_upload = new \App\Http\Controllers\UploadFileController();
    }
    
    /**
     * @OA\Get(
     *    path="/admissions/all",
     *    operationId="indexAdmission",
     *    tags={"Admission"},
     *    summary="Get all Admission",
     *    description="Get all Admission",
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
    public function indexAdmission(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $registrations = [];
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $academicYearId = $setting?->academic_year_id;
            $classNameId = null;
            $examStatus = "";
            $ewsStatus = "";
            $physicalCondition = "";
            $registrationStatus = "";
            $registrationMode = "";
            $fromDate = "";
            $toDate = "";
            $search = "";

            $registrations = $this->admissionRepository->getRegistrationReport(
                $academicYearId,
                $classNameId,
                $examStatus,
                $ewsStatus,
                $physicalCondition,
                $registrationStatus,
                $registrationMode,
                $fromDate,
                $toDate,
                $search,
                $request->schoolId
            );

            if (count($registrations) > 0) {
                $registrations->loadMissing(['student']);

                $registrations = $registrations->map(function($registration){
                    $birthDate = !empty($registration?->date_of_birth) ? Carbon::parse($registration->date_of_birth)->format('d-M-Y') : "";
                    $registrationDate = !empty($registration?->date_of_registration) ? Carbon::parse($registration->date_of_registration)->format('d-M-Y') : "";
                    $registration['birth_date'] = $birthDate;
                    $registration['registration_date'] = $registrationDate;

                    return $registration;
                });
            }
            
            return response()->json([
                'success' => true,
                'data' => $registrations
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
     *    path="/admissions/class-wise-summary",
     *    operationId="classWiseAdmissionReport",
     *    tags={"Admission"},
     *    summary="Get Class Wise Admission Summary Report",
     *    description="Get Class Wise Admission Summary Report",
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
    public function classWiseAdmissionReport()
    {
        if (!empty($request->firstName) && !empty($request->schoolKey) && !empty($request->chequeNo)) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $academicYearId = $setting?->academic_year_id;
            $classWiseRegistration = [
                'reports' => [],
                'total_registration' => 0,
                'total_admission' => 0,
                'total_fee' => 0,
            ];

            $registrations = $this->admissionRepository->getClassWiseRegistrationSummary($request->schoolId);

            if (count($registrations) > 0) {
                foreach ($registrations as $registration) {
                    $classNameId = $registration?->class_name_id;
                    $registrationStatus = $registration?->registration_status;
                    $feeAmount = (float) $registration->fee_amount ?? 0;

                    if (!isset($classWiseRegistration['reports'][$classNameId])) {
                        $classWiseRegistration['reports'][$classNameId] = [
                            'class_title' => $registration?->class_title,
                        ];
                    }

                    $classWiseRegistration['reports'][$classNameId]['total_fee'] = ($classWiseRegistration['reports'][$classNameId]['total_fee'] ?? 0) + $feeAmount;

                    $classWiseRegistration['total_fee'] = ($classWiseRegistration['total_fee'] ?? 0) + $feeAmount;

                    $classWiseRegistration['reports'][$classNameId]['total_registration'] = ($classWiseRegistration['reports'][$classNameId]['total_registration'] ?? 0) + 1;

                    $classWiseRegistration['total_registration'] = ($classWiseRegistration['total_registration'] ?? 0) + 1;

                    if ($registrationStatus == RegistrationStatus::ADMISSION_TAKEN->value) {
                        $classWiseRegistration['reports'][$classNameId]['total_admission'] = ($classWiseRegistration['reports'][$classNameId]['total_admission'] ?? 0) + 1;

                        $classWiseRegistration['total_admission'] = ($classWiseRegistration['total_admission'] ?? 0) + 1;
                    }
                }
            }

            return response()->json([
                'success' => true,
                'data' => $classWiseRegistration
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
     *    path="/admissions/registration-report",
     *    operationId="registrationCollectionReport",
     *    tags={"Admission"},
     *    summary="Get Admission Report",
     *    description="Get Admission Report",
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
    public function registrationCollectionReport(Request $request)
    {
        if (!empty($request->schoolId)) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();

            $classWiseReports = [
                'reports' => [],
                'total_registration' => 0,
                'total_admission' => 0,
                'total_fee' => 0,
            ];
            $dayWiseReports = [];

            $registrations = $this->admissionRepository->getRegistrationReportDataByAcademicYearId($setting?->academic_year_id, $request->schoolId);
            if (count($registrations) > 0) {
                $classWiseReports = $this->apiFormatClassWiseRegistrationReportData($registrations);
                $dayWiseReports = $this->apiFormatDayWiseRegistrationReportData($registrations);
            }
                
            return response()->json([
                'success' => true,
                'message' => 'created successfully',
                'data' => [
                    'classWiseReports' => $classWiseReports,
                    'dayWiseReports' => $dayWiseReports,
                ]
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
     * path="/admissions/registration/save",
     * summary="Save Admission",
     * description="Save Admission",
     * operationId="saveAdmission",
     * tags={"Admission"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Save Admission",
     *    @OA\JsonContent(
     *       required={"schoolId", "userId","firstName","chequeNo"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="schoolKey", type="interger", example="demo"),
     *       @OA\Property(property="classNameId", type="interger", example=""),
     *       @OA\Property(property="userId", type="interger", example=""),
     *       @OA\Property(property="firstName", type="string", example=""),
     *       @OA\Property(property="chequeNo", type="string", example=""),
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
    public function saveAdmission(Request $request)
    {
        if (!empty($request->schoolId) && !empty($request->schoolKey) && !empty($request->firstName) ) {
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            // DB::beginTransaction();
            // try {
                $admissionProcess = $this->admissionRepository->getAdmissionByAcademicYearId($academicYearId, $request->schoolId);
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
                    'school_id' => $request->schoolId,
                    'academic_year_id' => $academicYearId,
                    'admission_academic_year_id' => $request->academicYearId ?? null,
                    'class_name_id' => $request->classNameId ?? null,
                    'enquiry_date_at' => !empty($request->enquiryDateAt) ? Carbon::parse($request->enquiryDateAt)->toDateString() : date('Y-m-d'),
                    'category_id' => !empty($request->categoryId) ? intval($request->categoryId) : null,
                    'user_id' => !empty($request->userId) ? intval($request->userId) : null,
                    'source_id' => !empty($request->sourceId) ? intval($request->sourceId) : null,
                    'state_id' => !empty($request->stateId) ? intval($request->stateId) : null,
                    'first_name' => $request->firstName,
                    'middle_name' => !empty($request->middleName) ? $request->middleName : null,
                    'last_name' => !empty($request->lastName) ? $request->lastName : null,
                    'gender' => !empty($request->gender) ? $request->gender : null,
                    'date_of_birth' => !empty($request->dateOfBirth) ? Carbon::parse($request->dateOfBirth)->toDateString() : null,
                    'boarding_scholar' => !empty($request->boardingScholar) ? $request->boardingScholar : null,
                    'contact_name' => !empty($request->contactName) ? $request->contactName : null,
                    'reference_by' => !empty($request->referenceBy) ? $request->referenceBy : null,
                    'employment_category_id' => !empty($request->employmentCategoryId) ? $request->employmentCategoryId : null,
                    'enquiry_detail' => !empty($request->enquiryDetail) ? $request->enquiryDetail : null,
                    'contact_number' => !empty($request->contactNumber) ? $request->contactNumber : null,
                    'contact_email' => !empty($request->contactEmail) ? $request->contactEmail : null,
                    'person_to_meet' => !empty($request->personToMeet) ? $request->personToMeet : null,
                    'in_time' => !empty($request->inTime) ? Carbon::parse($request->inTime)->format('H:i:s') : null,
                    'refer_mobile' => !empty($request->referMobile) ? $request->referMobile : null,
                    'blood_group' => !empty($request->bloodGroup) ? $request->bloodGroup : null,
                    'religion' => !empty($request->religion) ? $request->religion : null,
                    'country_id' => !empty($request->countryId) ? $request->countryId : null,
                    'aadhar_card_no' => !empty($request->aadharCardNo) ? $request->aadharCardNo : null,
                    'srn_no' => !empty($request->srnNo) ? $request->srnNo : null,
                    'child_id' => !empty($request->childId) ? $request->childId : null,
                    'samagra_id' => !empty($request->samagraId) ? $request->samagraId : null,
                    'mother_tongue' => !empty($request->motherTongue) ? $request->motherTongue : null,
                    'medical_condition' => !empty($request->medicalCondition) ? $request->medicalCondition : null,
                    'date_of_registration' => !empty($request->dateOfRegistration) ? Carbon::parse($request->dateOfRegistration)->toDateString() : date('Y-m-d'),
                    'form_no' => !empty($request->formNo) ? intval($request->formNo) : null,
                    'is_physically_disabled' => !empty($request->isPhysicallyDisabled) ? $request->isPhysicallyDisabled : 0,
                    'is_special_child' => !empty($request->isSpecialChild) ? $request->isSpecialChild : 0,
                    'conomically_weaker_section' => !empty($request->conomicallyWeakerSection) ? $request->conomicallyWeakerSection : 0,
                    'is_have_sibling' => !empty($request->isHaveSibling) ? $request->isHaveSibling : 0,
                    'is_transport_availed' => !empty($request->isTransportAvailed) ? $request->isTransportAvailed : 0,
                    'reference_by_parent' => !empty($request->referenceByParent) ? $request->referenceByParent : null,
                    'registration_no' => $registrationNo,

                    //refer person Previous School Details info.
                    'school_name' => !empty($request->schoolName) ? $request->schoolName : null,
                    'school_class' => !empty($request->schoolClass) ? $request->schoolClass : null,
                    'school_year' => !empty($request->schoolYear) ? $request->schoolYear : null,
                    'tc_no' => !empty($request->tcNo) ? $request->tcNo : null,
                    'referred_by' => !empty($request->referredBy) ? $request->referredBy : null,

                    //present info
                    'present_address' => !empty($request->presentAddress) ? $request->presentAddress : null,
                    'landmark' => !empty($request->landmark) ? $request->landmark : null,
                    'present_state' => !empty($request->presentState) ? intval($request->presentState) : null,
                    'city' => !empty($request->city) ? $request->city : null,
                    'district' => !empty($request->district) ? $request->district : null,
                    'taluka' => !empty($request->taluka) ? $request->taluka : null,
                    'pin_code' => !empty($request->pinCode) ? $request->pinCode : null,

                    //permanent info
                    'permanent_address' => !empty($request->permanentAddress) ? $request->permanentAddress : null,
                    'permanent_state' => !empty($request->permanentState) ? intval($request->permanentState) : null,
                    'permanent_city' => !empty($request->permanentCity) ? $request->permanentCity : null,
                    'permanent_district' => !empty($request->permanentDistrict) ? $request->permanentDistrict : null,
                    'permanent_taluka' => !empty($request->permanentTaluka) ? $request->permanentTaluka : null,
                    'permanent_pin_code' => !empty($request->permanentPinCode) ? $request->permanentPinCode : null,

                    //siblings info.
                    'sibling_name' => !empty($request->siblingName) ? $request->siblingName : null,
                    'sibling_std' => !empty($request->siblingStd) ? $request->siblingStd : null,
                    'sibling_adm_no' => !empty($request->siblingAdmNo) ? $request->siblingAdmNo : null,
                    'sibling_year' => !empty($request->siblingYear) ? $request->siblingYear : null,
                    'is_enquiry' => false,
                    'enquiry_type' => EnquiryType::REGISTRATION,
                    'registration_status' => RegistrationStatus::NEW,
                    'status' => Status::ACTIVE,
                    'registration_mode' => RegistrationMode::ERP
                );

                $admissionForm = $this->admissionRepository->createEnquiry($dataArray);

                if (!empty($admissionForm->id)) {
                    // enquery fee
                    $nextFeeReceiptNumber = $this->feePaymentMethodRepository->getNextRegistrationFeeReceiptNumber($request->schoolId);

                    $enqueryFeeArr = [
                        'school_id' => $request->schoolId,
                        'enquiry_id' => $admissionForm->id,
                        'academic_fee' => !empty($request->academicFee) ? $request->academicFee : null,
                        'payment_mode' => !empty($request->paymentMode) ? $request->paymentMode : null,
                        'payment_note' => !empty($request->paymentNote) ? $request->paymentNote : null,
                        'cheque_no' => !empty($request->chequeNo) ? $request->chequeNo : ' ',
                        'cheque_date' => !empty($request->chequeDate) ? Carbon::parse($request->chequeDate)->toDateString() : date('Y-m-d'),
                        'bank_id' => !empty($request->bankId) ? intval($request->bankId) : null,
                        'bank_account_id' => !empty($request->bankAccountId) ? intval($request->bankAccountId) : null,
                        'paytm_ref_no' => !empty($request->paytmRefNo) ? intval($request->paytmRefNo) : null,
                        'paytm_mobile' => !empty($request->paytmMobile) ? intval($request->paytmMobile) : null,
                        'neft_number' => !empty($request->neftNumber) ? intval($request->neftNumber) : null,
                        'neft_desc' => !empty($request->neftDesc) ? $request->neftDesc : null,
                        'upi_number' => !empty($request->upiNumber) ? intval($request->upiNumber) : null,
                        'upi_description' => !empty($request->upiDescription) ? $request->upiDescription : null,
                        'created_by' => $request->userId,
                        'payment_date' => !empty($request->paymentDate) ? Carbon::parse($request->paymentDate)->toDateString() : date('Y-m-d'),
                        'receipt_no' => (int) $nextFeeReceiptNumber,
                    ];
                    $this->feeRepository->createEnquiryFee($enqueryFeeArr);

                    $receiptNumberSetting = getSiteSettingData('fee_is_registration_seed_no_enabled');
                    $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";

                    if ($receiptNumberEnabaled) {
                        $currentSeedNo = getCurrentRegistrationFeeReceiptSeedNumber($request->schoolId);
                        setSiteSettingData('Fee', 'fee_registration_seed_no', $currentSeedNo + 1);
                    }

                    //father info
                    $enqueryGuardianArr = [
                        'school_id' => $request->schoolId,
                        'enquiry_id' => $admissionForm->id,
                        'father_first_name' => !empty($request->fatherFirstName) ? $request->fatherFirstName : null,
                        'father_middle_name' => !empty($request->fatherMiddleName) ? $request->fatherMiddleName : null,
                        'father_last_name' => !empty($request->fatherLastName) ? $request->fatherLastName : null,
                        'father_email' => !empty($request->fatherEmail) ? $request->fatherEmail : null,
                        'father_mobile' => !empty($request->fatherMobile) ? $request->fatherMobile : null,
                        'father_sms_number' => !empty($request->fatherSmsNumber) ? $request->fatherSmsNumber : null,
                        'father_occupation' => !empty($request->fatherOccupation) ? $request->fatherOccupation : null,
                        'father_highest_qualification' => !empty($request->fatherHighestQualification) ? $request->fatherHighestQualification : null,
                        'father_aadhar_card_no' => !empty($request->fatherAadharCardNo) ? $request->fatherAadharCardNo : null,
                        'father_income_per_year' => !empty($request->fatherIncomePerYear) ? $request->fatherIncomePerYear : null,
                        'father_department' => !empty($request->fatherDepartment) ? $request->fatherDepartment : null,
                        'father_designation' => !empty($request->fatherDesignation) ? $request->fatherDesignation : null,
                        'father_pan_card_no' => !empty($request->fatherPanCardo) ? $request->fatherPanCardo : null,
                        'father_company_name' => !empty($request->fatherCompanyName) ? $request->fatherCompanyName : null,
                        'father_office_address' => !empty($request->fatherOfficeAddress) ? $request->fatherOfficeAddress : null,
                        //mother info
                        'mother_first_name' => !empty($request->motherFirstName) ? $request->motherFirstName : null,
                        'mother_middle_name' => !empty($request->motherMiddleName) ? $request->motherMiddleName : null,
                        'mother_last_name' => !empty($request->motherLastName) ? $request->motherLastName : null,
                        'mother_email' => !empty($request->motherEmail) ? $request->motherEmail : null,
                        'mother_mobile' => !empty($request->motherMobile) ? $request->motherMobile : null,
                        'mother_highest_qualification' => !empty($request->motherHighestQualification) ? $request->motherHighestQualification : null,
                        'mother_occupation' => !empty($request->motherOccupation) ? $request->motherOccupation : null,
                        'mother_income_per_year' => !empty($request->motherIncomePerYear) ? $request->motherIncomePerYear : null,
                        'mother_department' => !empty($request->motherDepartment) ? $request->motherDepartment : null,
                        'mother_designation' => !empty($request->motherDesignation) ? $request->motherDesignation : null,
                        'mother_aadhar_card_no' => !empty($request->motherAadharCardNo) ? $request->motherAadharCardNo : null,
                        'mother_pan_card_no' => !empty($request->motherPanCardNo) ? $request->motherPanCardNo : null,
                        'mother_company_name' => !empty($request->motherCompanyName) ? $request->motherCompanyName : null,
                        'mother_office_address' => !empty($request->motherOfficeAddress) ? $request->motherOfficeAddress : null,
                    ];
                    $this->guardianRepository->createEnquiryGuardian($enqueryGuardianArr);

                    if (!empty($request->isHaveSibling) && $request->isHaveSibling == true && !empty($request->siblingId)) {
                        $studentSibling = array(
                            'school_id'  => $request->schoolId,
                            'enquiry_id' => $admissionForm->id,
                            'sibling_id' => $request->siblingId,
                            'status' => Status::ACTIVE,
                        );
                        $this->admissionRepository->createEnquerySibling($studentSibling);
                    }
          
                    // student image
                    if (!empty($request->file('studentImage'))) {
                        $image_url = $this->_upload->uploadImage($request, 'studentImage', 'student_image', $request->schoolKey);
                        $dataImage = array(
                            'school_id' => $request->schoolId,
                            'imageable_type' => Enquiry::class,
                            'imageable_id' => $admissionForm->id,
                            'name' => 'student_image',
                            'path' => !empty($image_url) ? $image_url : NULL,
                            'status' => Status::ACTIVE,
                        );
                        $this->imageRepository->morphCreate($dataImage, $admissionForm->id);
                    }
            
                    // Father Profile image
                    if (!empty($request->file('fatherImage'))) {
                        $image_url = $this->_upload->uploadImage($request, 'fatherImage', 'student_image', $request->schoolKey);
                        $dataImage = array(
                            'school_id' => $request->schoolId,
                            'imageable_type' => Enquiry::class,
                            'imageable_id' => $admissionForm->id,
                            'name' => 'father_image',
                            'path' => !empty($image_url) ? $image_url : NULL,
                            'status' => Status::ACTIVE,
                        );
                        $this->imageRepository->morphCreate($dataImage, $admissionForm->id);
                    }

                    // Mother Profile
                    if (!empty($request->file('motherImage'))) {
                        $image_url = $this->_upload->uploadImage($request, 'motherImage', 'student_image', $request->schoolKey);
                        $dataImage = array(
                            'school_id' => $request->schoolId,
                            'imageable_type' => Enquiry::class,
                            'imageable_id' => $admissionForm->id,
                            'name' => 'mother_image',
                            'path' => !empty($image_url) ? $image_url : NULL,
                            'status' => Status::ACTIVE,
                        );

                        $this->imageRepository->morphCreate($dataImage, $admissionForm->id);
                    }
                
                    // Guardian profile
                    if (!empty($request->file('guardianImage'))) {
                        $image_url = $this->_upload->uploadImage($request, 'guardianImage', 'student_image', $request->schoolKey);

                        $dataImage = array(
                            'school_id' => $request->schoolId,
                            'imageable_type' => Enquiry::class,
                            'imageable_id' => $admissionForm->id,
                            'name' => 'guardian_image',
                            'path' => !empty($image_url) ? $image_url : NULL,
                            'status' => Status::ACTIVE,
                        );

                        $this->imageRepository->morphCreate($dataImage, $admissionForm->id);
                    }
                }

                DB::commit();

                return response()->json([
                    'success' => true,
                    'message' => 'created successfully',
                    'data' => $admissionForm
                ], 200);
            // } 
            // catch (\Throwable $th) {
            //     return response()->json([
            //         'error' => true,
            //         'message' => 'Please try again',
            //         'data' => $th
            //     ], 200);
            // }
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
     * @OA\Put(
     * path="/admissions/update/{id}",
     * summary="Update Admission",
     * description="Update Admission",
     * operationId="updateAdmission",
     * tags={"Admission"},
     *    @OA\Parameter(
     *    in="path",
     *    name="id",
     *    required=true,
     *    description="Update Admission",
     *    @OA\Schema(type="string"),
     *    @OA\Examples(example="int", value="1", summary="An int value."),
     * ),
     * @OA\RequestBody(
     *    required=true,
     *    description="Update Admission",
     *    @OA\JsonContent(
     *       required={"schoolId", "schoolKey", "classNameId","classSubjectId","startDateAt","submissionDateAt"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="schoolKey", type="interger", example="demo"),
     *       @OA\Property(property="classNameId", type="interger", example="demo"),
     *       @OA\Property(property="classSubjectId", type="interger", example="demo"),
     *       @OA\Property(property="startDateAt", type="string", example=""),
     *       @OA\Property(property="submissionDateAt", type="string", example=""),
     *       @OA\Property(property="homeFile", type="string", example="file"),
     *       @OA\Property(property="homeCameraFile", type="string", example="file"),
     *       @OA\Property(property="homeDocFile", type="string", example="file"),
     *       @OA\Property(property="homeFileUrl", type="string", example="url"),
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
    public function updateAdmission(Request $request, int $id)
    {
        if (!empty($request->title) && !empty($request->schoolKey)) {
           
            
            return response()->json([
                'success' => true,
                'message' => 'Updated successfully',
                'data' => null
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
     *    path="/admissions/show/{id}",
     *    operationId="showAdmission",
     *    tags={"showAdmission"},
     *    summary="Show Admission Details",
     *    description="Show Admission Details",
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
    public function showAdmission(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
    
            return response()->json([
                'success' => true,
                'data' => null,
            ], 200);
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => ['id' => $id]
            ], 200);
        }
    }

    /**
     * @OA\Delete(
     *     path="/admissions/delete/{}",
     *     tags={"Admission"},
     *     summary="Delete Admission",
     *     operationId="deleteAdmission",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="id to delete",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         ),
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid ID supplied",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Admission not found",
     *     ),
     *     security={ {"sanctum": {} }},
     * )
     */
    public function deleteAdmission(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
 
            return response()->json([
                'success' => true,
                'message' => 'Deleted successfully',
                'data' => null
            ], 200);
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => ['id' => $id]
            ], 200);
        }
    }

    /*
    * helper method to format class wise registration report data
    */
    protected function apiFormatClassWiseRegistrationReportData(object $registrations)
    {
        $classWiseReports = [
            'reports' => [],
            'total_registration' => 0,
            'total_admission' => 0,
            'total_fee' => 0,
        ];
        $totalRegistration = 0;
        $totalAdmission = 0;
        $totalFee = 0;

        foreach ($registrations as $registration) {
            if (!isset($classWiseReports['reports'][$registration?->class_name_id])) {
                $classWiseReports['reports'][$registration?->class_name_id] = [
                    'class_name' => $registration?->class_title,
                    'total_registration' => 0,
                    'total_admisison' => 0,
                    'total_fee' => 0,
                ];
            }

            if ($registration?->enquiry_type == EnquiryType::REGISTRATION->value) {
                $classWiseReports['reports'][$registration?->class_name_id]['total_registration'] = ($classWiseReports['reports'][$registration?->class_name_id]['total_registration'] ?? 0) + 1;
                $totalRegistration++;
            } else if ($registration?->enquiry_type == EnquiryType::ADMISSION->value) {
                $classWiseReports['reports'][$registration?->class_name_id]['total_admission'] = ($classWiseReports['reports'][$registration?->class_name_id]['total_admission'] ?? 0) + 1;

                $totalAdmission++;
            }

            $feeAmount = $registration?->academic_fee ?? 0;

            $classWiseReports['reports'][$registration?->class_name_id]['total_fee'] = ($classWiseReports['reports'][$registration?->class_name_id]['total_fee'] ?? 0) + $feeAmount;

            $totalFee += $feeAmount;
        }

        $classWiseReports['total_registration'] = $totalRegistration;
        $classWiseReports['total_admission'] = $totalAdmission;
        $classWiseReports['total_fee'] = $totalFee;

        return $classWiseReports;
    }

    /*
    * helper method to format day wise registration report data
    */
    protected function apiFormatDayWiseRegistrationReportData(object $registrations)
    {
        $dayWiseReports = [];

        foreach ($registrations as $registration) {
            $dateOfRegistration = $registration?->date_of_registration;

            if (!empty($dateOfRegistration)) {
                if (!isset($dayWiseReports[$dateOfRegistration])) {
                    $dayWiseReports[$dateOfRegistration] = [
                        'month' => Carbon::parse($dateOfRegistration)->format('M'),
                        'registration_date' => Carbon::parse($dateOfRegistration)->format('d-M-Y'),
                        'total_registration' => 0,
                        'total_fee' => 0,
                    ];
                }

                $dayWiseReports[$dateOfRegistration]['total_registration'] = ($dayWiseReports[$dateOfRegistration]['total_registration'] ?? 0) + 1;

                $feeAmount = $registration?->academic_fee ?? 0;

                $dayWiseReports[$dateOfRegistration]['total_fee'] = ($dayWiseReports[$dateOfRegistration]['total_fee'] ?? 0) + $feeAmount;
            }
        }

        return $dayWiseReports;
    }
}