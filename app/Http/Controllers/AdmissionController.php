<?php

namespace App\Http\Controllers;

use Mpdf\Tag\Em;
use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Gender;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\UserRole;
use App\Models\Enquery;
use App\Models\Enquiry;
use App\Models\Student;
use App\Enums\EwsStatus;
use App\Enums\EnquiryType;
use App\Enums\GuardianType;
use Illuminate\Support\Str;
use App\Enums\AdmissionType;
use App\Enums\EnquiryStatus;
use App\Enums\StudentStatus;
use Illuminate\Http\Request;
use App\Enums\LedgerAmountType;
use App\Enums\RegistrationMode;
use App\Enums\RegistrationStatus;
use App\Enums\AdmissionExamStatus;
use App\Enums\ScholarBoardingType;
use Illuminate\Support\Facades\DB;
use App\Enums\PhysicalConditionType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Repositories\IUserRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IHouseRepository;
use App\Repositories\IImageRepository;
use App\Repositories\IStateRepository;
use App\Http\Requests\AdmissionRequest;
use App\Repositories\ILedgerRepository;
use App\Repositories\IStudentRepository;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\StudentTypeRequest;
use App\Repositories\AdmissionRepository;
use App\Repositories\ClassroomRepository;
use App\Repositories\ICategoryRepository;
use App\Repositories\IGuardianRepository;
use App\Repositories\IReligionRepository;
use App\Http\Requests\AddAdmissionRequest;
use App\Repositories\IAdmissionRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IBloodGroupRepository;
use App\Repositories\ISiteSettingRepository;
use App\Repositories\IAccountGroupRepository;
use App\Repositories\IFeeStructureRepository;
use App\Repositories\IStudentHouseRepository;
use App\Http\Requests\AdmissionProcessRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Repositories\IClassFeeStudentAmountRepository;

class AdmissionController extends Controller
{
    private $_upload;

    public function __construct(
        private IAdmissionRepository $admissionRepository,
        private IClassroomRepository $classroomRepository,
        private IStudentRepository $studentRepository,
        private IStateRepository $stateRepository,
        private IHouseRepository $houseRepository,
        private ICategoryRepository $categoryRepository,
        private IBloodGroupRepository $bloodGroupRepository,
        private IReligionRepository $religionRepository,
        private IUserRepository $userRepository,
        private IStudentHouseRepository $studentHouseRepository,
        private IGuardianRepository $guardianRepository,
        private IImageRepository $imageRepository,
        private IFeeStructureRepository $feeStructureRepository,
        private IClassFeeStudentAmountRepository $classFeeStudentAmountRepository,
        private ISiteSettingRepository $siteSettingRepository,
        private IAccountGroupRepository $accountGroupRepository,
        private ILedgerRepository $ledgerRepository,
    ) {
        $this->_upload = new UploadFileController();

        $this->middleware('permission:view admission', ['only' => [
            'misReport',
            'getSessionWiseRegistrationSummaryReport',
            'getLast7DaysRegistrationAnalysis',
            'getLast7DaysCollectionAnalysis',
            'getClassWiseRegistrationSummaryReport',
            'getClassRoomByAcy',
            'registrations',
            'updateAdmissionRegistrarionStatus',
            'dashboard',
            'viewAdmission',
            'formatAdmissionData',
            'getMonthEnquiryByAcy',
            'getRegAmountByAcy',
            'getDailyAdmissionRepo',
            'studentType',
            'registrationSetting',
            'enquiryReportDateWiseActivity',
            'getActivityDateWiseReport',
            'enquiryReportDateWiseFollow',
            'enquiryStatusSummary',
            'classWiseSummary',
            'registrationSourceReport'
        ]]);
        $this->middleware('permission:add admission', ['only' => [
            'process',
            'processSave',
            'addAdmission',
            'formatFeeStructureData',
            'addAdmissionSave',
            'assignFeeToNewStudent',
            'getEnquiryByAcy',
            'studentTypeSave',
            'studentTypeEdit',
            'registrationSettingSave'
        ]]);
        $this->middleware('permission:edit admission', ['only' => [
            'updateAdmissionRegistrarionStatus',
            'update',
            'updateFormNumber',
            'updateRegistrationNumber',
            'studentTypeUpdate'
        ]]);
        $this->middleware('permission:delete admission', ['only' => ['deleteRegistrations', 'studentTypedestroy']]);
    }

    /**
     * Display admission report
     */
    public function misReport(): Response
    {
        $totalAdmissions = $this->admissionRepository->totalAdmissions();
        $todayAdmissions = $this->admissionRepository->todayAdmissions();
        $todayRegistrations = $this->admissionRepository->todayRegistrations();
        $totalRegistrations = $this->admissionRepository->totalRegistrations();
        $classWiseRegistrationSummary = $this->getClassWiseRegistrationSummaryReport();
        $sessionWiseRegistrations = $this->getSessionWiseRegistrationSummaryReport();
        $last7DaysRegistrationAnalysis = $this->getLast7DaysRegistrationAnalysis();
        $last7DaysCollectionAnalysis = $this->getLast7DaysCollectionAnalysis();

        return Inertia::render('Admission/MisReport', [
            'totalAdmissions' => $totalAdmissions,
            'todayRegistrations' => $todayRegistrations,
            'todayAdmissions' => $todayAdmissions,
            'totalRegistrations' => $totalRegistrations,
            'sessionWiseRegistrations' => $sessionWiseRegistrations,
            'last7DaysRegistrationAnalysis' => $last7DaysRegistrationAnalysis,
            'last7DaysCollectionAnalysis' => $last7DaysCollectionAnalysis,
            'classWiseRegistrationSummary' => $classWiseRegistrationSummary
        ]);
    }


    /*
    * helper method to get session wise registration summary report
    */
    protected function getSessionWiseRegistrationSummaryReport()
    {
        $sessionWiseRegistrations = [];

        $academicYears = getAcademicYearsAll();

        if (count($academicYears) > 0) {
            $registrations = $this->admissionRepository->getsessionWiseRegistrations();

            foreach ($academicYears as $academicYear) {
                $academicYearId = $academicYear?->id;

                if (!isset($sessionWiseRegistrations[$academicYearId])) {
                    $sessionWiseRegistrations[$academicYearId] = [
                        'academic_session' => $academicYear?->title,
                        'total_registration' => 0
                    ];
                }

                if (count($registrations) > 0) {
                    foreach ($registrations as $registration) {
                        if ($academicYearId == $registration->admission_academic_year_id) {
                            $sessionWiseRegistrations[$academicYearId]['total_registration'] = ($sessionWiseRegistrations[$academicYearId]['total_registration'] ?? 0) + 1;
                        }
                    }
                }
            }
        }

        return $sessionWiseRegistrations;
    }

    /*
    * helper method to get last 7 days registration analysis
    */
    protected function getLast7DaysRegistrationAnalysis()
    {
        $last7DaysRegistrationAnalysis = [];

        $registrations = $this->admissionRepository->getLast7DaysRegistrationAnalysis();

        if (count($registrations) > 0) {
            foreach ($registrations as $registration) {
                if (!empty($registration->date_of_registration)) {
                    $registrationDate = Carbon::parse($registration->date_of_registration)->format('d-M');

                    if (!isset($last7DaysRegistrationAnalysis[$registrationDate])) {
                        $last7DaysRegistrationAnalysis[$registrationDate] = [
                            'registration_date' => $registrationDate,
                        ];
                    }

                    $last7DaysRegistrationAnalysis[$registrationDate]['total_registration'] = ($last7DaysRegistrationAnalysis[$registrationDate]['total_registration'] ?? 0) + 1;
                }
            }
        }

        return $last7DaysRegistrationAnalysis;
    }


    /*
    * helper method to get last 7 days collection analysis
    */
    protected function getLast7DaysCollectionAnalysis()
    {
        $last7DaysCollectionAnalysis = [];

        $registrations = $this->admissionRepository->getLast7DaysCollectionAnalysis();

        if (count($registrations) > 0) {
            foreach ($registrations as $registration) {
                if (!empty($registration->date_of_registration)) {
                    $registrationDate = Carbon::parse($registration->date_of_registration)->format('d-M');
                    $feeAmount = $registration?->fee_amount ?? 0;

                    if (!isset($last7DaysCollectionAnalysis[$registrationDate])) {
                        $last7DaysCollectionAnalysis[$registrationDate] = [
                            'registration_date' => $registrationDate,
                        ];
                    }

                    $last7DaysCollectionAnalysis[$registrationDate]['total_fee'] = ($last7DaysCollectionAnalysis[$registrationDate]['total_fee'] ?? 0) + $feeAmount;
                }
            }
        }

        return $last7DaysCollectionAnalysis;
    }

    /*
    * helper method to get class wise registration summary report
    */
    protected function getClassWiseRegistrationSummaryReport()
    {
        $classWiseRegistration = [
            'reports' => [],
            'total_registration' => 0,
            'total_admission' => 0,
            'total_fee' => 0,
        ];

        $registrations = $this->admissionRepository->getClassWiseRegistrationSummary();

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

        return $classWiseRegistration;
    }


    /**
     * Display the schools.
     */
    public function misReportOld(Request $request): Response
    {
        $admissions = $this->admissionRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();

        $totalAdmission = $this->studentRepository->totalAdmission();
        $todayRegistrations = $this->admissionRepository->todayRegistrations();
        $todayAdmissions = $this->studentRepository->todayAdmissions();
        $totalRegistrations = $this->admissionRepository->totalRegistrations();
        $getClassWiseReg = $this->classroomRepository->getClassWiseReg();
        $getTotalRegistrationsPerSession = $this->admissionRepository->getTotalRegistrationsPerSession();
        $getLast7DaysRegistrationAnalysis = $this->admissionRepository->getLast7DaysRegistrationAnalysis();

        $getClassWiseReg->map(function ($item) {
            $totalFee = $item->enquiries->sum(function ($enquery) {
                return $enquery->registration_fee ? $enquery->registration_fee->fee_amount : 0;
            });

            $item['total_fee'] = $totalFee;
            return $item;
        });

        return Inertia::render('Admission/MisReport', [
            'admissions' => $admissions,
            'classrooms' => $classrooms,

            'totalAdmission' => $totalAdmission,
            'todayRegistrations' => $todayRegistrations,
            'todayAdmissions' => $todayAdmissions,
            'totalRegistrations' => $totalRegistrations,
            'getClassWiseReg' => $getClassWiseReg,
            'getTotalRegistrationsPerSession' => $getTotalRegistrationsPerSession,
            'getLast7DaysRegistrationAnalysis' => $getLast7DaysRegistrationAnalysis['detailed'],

        ]);
    }

    public function getClassRoomByAcy(Request $request)
    {
        $academicYearId = $request->input('id');
        if (!empty($academicYearId) && is_numeric($academicYearId)) {
            $classroomData = $this->classroomRepository->getByAcy($academicYearId);
            return redirect()->back()->with([
                'customData' => $classroomData
            ]);
        }
    }

    /**
     * Display the registration list.
     */
    public function registrations(Request $request): Response
    {
        $registrations = [];
        $academicYears = getAcademicYearsAll();
        $classNames = [];
        $registrationStatusArray = [];
        $statusArray = [];
        $regModeArray = [];
        $admissionExamStatusArray = [];
        $physicalConditionArray = [];
        $ewsStatusArray = [];

        foreach (RegistrationStatus::cases() as $case) {
            if (
                in_array($case->value, [RegistrationStatus::REGISTRATION_REJECTED->value, RegistrationStatus::ON_HOLD->value, RegistrationStatus::CANCELLED->value])
            ) {
                array_push($registrationStatusArray, ['title' => $case->value, 'value' => $case->value]);
            }
        }

        foreach (RegistrationStatus::cases() as $case) {
            if (!in_array($case->value, [RegistrationStatus::REGISTRATION_TAKEN->value])) {
                array_push($statusArray, ['title' => $case->value, 'value' => $case->value]);
            }
        }

        foreach (RegistrationMode::cases() as $case) {
            array_push($regModeArray, ['title' => $case->value, 'value' => $case->value]);
        }

        foreach (AdmissionExamStatus::cases() as $case) {
            array_push($admissionExamStatusArray, ['title' => $case->value, 'value' => $case->value]);
        }

        foreach (PhysicalConditionType::cases() as $case) {
            array_push($physicalConditionArray, ['title' => $case->value, 'value' => $case->value]);
        }

        foreach (EwsStatus::cases() as $case) {
            array_push($ewsStatusArray, ['title' => $case->value, 'value' => $case->value]);
        }

        $academicYearId = getAcademicYearId();
        $classNameId = null;
        $examStatus = "";
        $ewsStatus = "";
        $physicalCondition = "";
        $registrationStatus = "";
        $registrationMode = "";
        $fromDate = "";
        $toDate = "";
        $search = "";

        if ($request->isMethod('POST')) {
            $academicYearId = $request?->academic_year_id ?? null;
            $classNameId = $request?->class_name_id ?? null;
            $examStatus = $request->exam_status ?? "";
            $ewsStatus = $request->ews_status ?? "";
            $physicalCondition = $request->physical_condition ?? "";
            $registrationStatus = $request->registration_status ?? "";
            $registrationMode = $request->registration_mode ?? "";
            $fromDate = !empty($request->from_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->from_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $toDate = !empty($request->to_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->to_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $search = $request->search ?? "";
        }

        if (!empty($academicYearId)) {
            $classNames = $this->classroomRepository->getActiveClassNameAllByAcademicYearId($academicYearId);

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
                $search
            );

            if (count($registrations) > 0) {
                $registrations->loadMissing(['student']);

                $registrations = $registrations->map(function ($registration) {
                    $birthDate = !empty($registration?->date_of_birth) ? Carbon::parse($registration->date_of_birth)->format('d-M-Y') : "";
                    $registrationDate = !empty($registration?->date_of_registration) ? Carbon::parse($registration->date_of_registration)->format('d-M-Y') : "";

                    $registration['birth_date'] = $birthDate;
                    $registration['registration_date'] = $registrationDate;

                    return $registration;
                });
            }
        }

        return Inertia::render('Admission/Registrations', [
            'registrations' => $registrations,
            'registrationStatusArray' => $registrationStatusArray,
            'statusArray' => $statusArray,
            'regModeArray' => $regModeArray,
            'academicYears' => $academicYears,
            'classNames' => $classNames,
            'ewsStatusArray' => $ewsStatusArray,
            'admissionExamStatusArray' => $admissionExamStatusArray,
            'physicalConditionArray' => $physicalConditionArray,
            'academicYearId' => $academicYearId,
        ]);
    }


    /**
     * Display the registration list.
     */
    public function registrationsOld(Request $request): Response
    {
        $registrationData = $this->admissionRepository->getActiveAllAdmissions();
        $registrationStatusArray = [];

        foreach (EnquiryStatus::cases() as $data) {
            array_push($registrationStatusArray, ['title' => $data->value, 'value' => $data->value]);
        }

        return Inertia::render('Admission/Registrations', [
            'registrationData' => $registrationData,
            'registrationStatusArray' => $registrationStatusArray,
        ]);
    }


    public function updateAdmissionRegistrarionStatus(int $id, Request $request)
    {
        $input = $request->validate([
            'registration_status' => ['required', 'string'],
        ]);

        $dataArray = [
            'registration_status' => $input['registration_status'],
        ];

        $enquery = $this->admissionRepository->getEnqueryById($id);

        if ($enquery?->enquiry_type == EnquiryType::ADMISSION->value) {
            return redirect()->back()->with('error', 'Cannot be updated.');
        }

        $updateStatus = $this->admissionRepository->updateEnquery($enquery->id, $dataArray);

        if (!$updateStatus) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Registration status updated successfully.');
    }

    public function updateAdmissionRegistrarionStatusOld(int $id, Request $request)
    {
        $input = $request->validate([
            'enquiry_status' => ['required', 'string'],
        ]);

        $dataArray = [
            'enquiry_status' => $input['enquiry_status'],
        ];

        $enquery = $this->admissionRepository->getEnqueryById($id);

        $updateStatus = $this->admissionRepository->updateEnquery($enquery->id, $dataArray);

        if (!$updateStatus) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Registration status updated successfully.');
    }

    // update Form Number
    public function updateFormNumber(int $id, Request $request)
    {
        $input = $request->validate([
            'form_no' => ['required', 'string'],
        ]);

        $dataArray = [
            'form_no' => $input['form_no'],
        ];

        $enquery = $this->admissionRepository->getEnqueryById($id);
        $updateFormNo = $this->admissionRepository->updateEnquery($enquery->id, $dataArray);

        if (!$updateFormNo) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Form number updated successfully.');
    }

    // update Registraion Number
    public function updateRegistrationNumber(int $id, Request $request)
    {
        $input = $request->validate([
            'registration_no' => ['required', 'string'],
        ]);

        $dataArray = [
            'registration_no' => $input['registration_no'],
        ];

        $enquery = $this->admissionRepository->getEnqueryById($id);
        $updateFormNo = $this->admissionRepository->updateEnquery($enquery->id, $dataArray);

        if (!$updateFormNo) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Registraion number updated successfully.');
    }

    /**
     * Total Admission
     */
    // public function registrationsSave(Request $request)
    // {
    //     $input = $request->all();
    //     $admission_no = $this->studentRepository->getNextAdmissionNo();
    //     $dataArray = array(
    //         'admission_no' =>  $admission_no,
    //         'school_id' => getUserSchoolId(),
    //         'user_id' => $request->input('user_id') ?? null,
    //         'classroom_id' => $request->input('classroom_id') ?? null,
    //         'class_name_id' => $request->input('class_name_id') ?? null,
    //         'first_name' => $request->input('first_name') ?? null,
    //         'middle_name' => $request->input('middle_name') ?? null,
    //         'last_name' => $request->input('last_name') ?? null,
    //         'phone' => $request->input('contact_number') ?? null,
    //         'email' => $request->input('contact_email') ?? null,
    //         'boarding_type' => $request->input('boarding_scholar') ?? null,
    //         'gender' => $request->input('gender') ?? null,
    //         'is_computer_option' =>null,
    //         'is_class_change' =>null,
    //         'is_social_studies_option'=>null,
    //         'height'=>null,
    //         'weight'=>null,
    //         'is_physical_disabled'=>$request->input('is_physically_disabled') ?? 0,
    //         'is_economically_weaker'=>$request->input('conomically_weaker_section') ?? 0,
    //         'is_spacial_child'=>$request->input('is_spacial_child') ?? 0,
    //         'student_status'=>$request->input('enquiry_type') ?? null,
    //         'status' => Status::ACTIVE,
    //     );

    //     $student = $this->studentRepository->create($dataArray);

    //     if (!empty($student['id'])) {

    //         // father
    //         if ($request->input('father') == 'Father') {
    //             $fatherData = array(
    //                 'school_id'  => getUserSchoolId(),
    //                 'user_id' => $request->input('user_id') ?? null,
    //                 'student_id' => $student['id'] ?? '',
    //                 'guardian_type' => 'Father',
    //                 'first_name' => $request->input('father_first_name') ?? null,
    //                 'middle_name'=> $request->input('father_middle_name') ?? null,
    //                 'last_name' => $request->input('father_last_name') ?? null,
    //                 'phone' => $request->input('father_mobile') ?? null,
    //                 'email' => $request->input('father_email') ?? null,
    //                 'occupation' => $request->input('father_occupation') ?? null,
    //                 'is_inactive' => 0,
    //                 'status' => Status::ACTIVE
    //             );
    //             $this->guardianRepository->create($fatherData);
    //         }

    //     }

    // }

    /*
    *  delete registration
    */
    public function deleteRegistrations(int $id): RedirectResponse
    {
        $enquiry = $this->admissionRepository->getEnqueryById($id);

        if ($enquiry?->enquiry_type == EnquiryType::ADMISSION->value) {
            return redirect()->back()->with('error', 'Cannot be deleted.');
        }

        if (!$enquiry) {
            return redirect()->route('admission.registration_list')->with('error', 'Not found.');
        }

        DB::beginTransaction();

        try {
            // new code
            $enquiry->update([
                'status' => Status::DELETED
            ]);

            if (!empty($enquiry->enquiry_fee)) {
                $enquiry->enquiry_fee->update([
                    'status' => Status::DELETED,
                ]);
            }

            // old code
            // if ($enquiry?->enquiryFollows?->count() > 0) {
            //     $enquiry->enquiryFollows->each(function ($enquiryFollow) {
            //         $enquiryFollow->delete();
            //     });
            // }

            // if ($enquiry?->enquiry_fee != null) {
            //     $enquiry->enquiry_fee->delete();
            // }

            // if ($enquiry?->guardian != null) {
            //     $enquiry->guardian->delete();
            // }

            // $this->admissionRepository->deleteEnquery($id);

            DB::commit();

            return redirect()->back()->with('message', 'Registration deleted successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    public function DeleteRegistrationsOld(int $id): RedirectResponse
    {
        $enquery = $this->admissionRepository->getEnqueryById($id);
        if (!$enquery) {
            return redirect()->route('admission.registration_list')->with('error', 'Not found.');
        }
        $this->admissionRepository->deleteEnquery($id);
        return redirect()->route('admission.registration_list')->with('message', 'Registration deleted successfully.');
    }

    /**
     * Display add admission form.
     */
    public function addAdmission(int $id): Response
    {
        $enquiry = $this->admissionRepository->getRegistrationEnquiryById($id);

        $enquiry->load(['guardian', 'admissionAcademicYear', 'className']);

        $enquiry['date_of_registration'] = !empty($enquiry['date_of_registration']) ? Carbon::parse($enquiry['date_of_registration'])->format('d M, Y') : "";

        $classrooms = $this->admissionRepository->getClassroomsWithStudentCount($enquiry?->class_name_id, $enquiry?->academic_year_id,);

        $admissionProcess = $this->admissionRepository->getAdmissionByAcademicYearId($enquiry?->admission_academic_year_id);

        $states = $this->stateRepository->getActiveNameAndId()
            ->map(fn($state) => ['id' => $state->id, 'title' => $state->name])
            ->all();
        $houses = $this->houseRepository->getActiveNameAndId()
            ->map(fn($house) => ['id' => $house->id, 'title' => $house->name])
            ->all();
        $categories = $this->categoryRepository->getActiveNameAndId()
            ->map(fn($category) => ['id' => $category->id, 'title' => $category->title])
            ->all();
        $bloodGroups = $this->bloodGroupRepository->getActiveNameAndId()
            ->map(fn($bloodGroup) => ['id' => $bloodGroup->id, 'title' => $bloodGroup->name])
            ->all();
        $religions = $this->religionRepository->getActiveNameAndId()
            ->map(fn($religion) => ['id' => $religion->id, 'title' => $religion->name])
            ->all();

        $genderArr = array();

        foreach (Gender::cases() as $gType) {
            array_push($genderArr, ['id' => $gType->value, 'title' => $gType->value]);
        }

        $admissionType = array();

        foreach (AdmissionType::cases() as $case) {
            array_push($admissionType, ['id' => $case->value, 'title' => $case->value]);
        }

        $isFeeStructureWithTemplate = getSiteSettingData('fee_is_structure_with_template')?->value ?? "No";
        $feeStructures = [];
        $feeStructure = null;

        if ($isFeeStructureWithTemplate === "Yes") {
            $feeStructures = $this->feeStructureRepository->getFeeStructuresByClassNameId($enquiry?->class_name_id);

            $feeStructures = $feeStructures->map(function ($feeStructure) {
                $formatteData = $this->formatFeeStructureData($feeStructure);

                return $formatteData;
            });
        } else {
            $classNameId = $enquiry?->class_name_id;
            $feeStructure =  $this->feeStructureRepository->getFeeStructureByClassNameId($classNameId);

            if (!empty($feeStructure)) {
                $feeStructure->loadMissing(['class_fee_structure_amounts' => function ($query) use ($classNameId) {
                    $query->where('class_name_id', $classNameId)
                        ->with(['fee:id,title']);
                }]);

                $feeStructure = $this->formatFeeStructureData($feeStructure);
            }
        }

        return Inertia::render('Admission/AddAdmissionForm', [
            'registrationData' => $enquiry,
            'states' => $states,
            'houses' => $houses,
            'categories' => $categories,
            'bloodGroups' => $bloodGroups,
            'religions' => $religions,
            'genderArr' => $genderArr,
            'admissionType' => $admissionType,
            'admissionProcess' => $admissionProcess,
            'classrooms' => $classrooms,
            'isFeeStructureWithTemplate' => $isFeeStructureWithTemplate,
            'feeStructures' => $feeStructures,
            'feeStructure' => $feeStructure,
        ]);
    }

    /*
    * helper method to format fee structure data
    */
    protected function formatFeeStructureData(object $feeStructure)
    {
        $formattedata = [];
        $feeInstallments = [];

        // format fee installmnets data
        if ($feeStructure?->class_fee_structure_amounts?->count() > 0) {
            $comulative_amount = 0;

            $feeStructureAmounts = $feeStructure->class_fee_structure_amounts->sortBy('fee_id')->groupBy('fee_id');

            foreach ($feeStructureAmounts as $feeInstallmentId => $groupedFeeInstallments) {
                $total_fee_amount = 0;

                foreach ($groupedFeeInstallments as $feeInstallment) {
                    $fee_amount = $feeInstallment['semester'] != null ? (float) $feeInstallment['amount'] * $feeInstallment['semester'] : (float) $feeInstallment['amount'];
                    $total_fee_amount += $fee_amount;
                }

                $comulative_amount += $total_fee_amount;

                $feeInstallments[$feeInstallmentId] = [
                    'title' => $groupedFeeInstallments?->first()?->fee?->title,
                    'amount' =>  $total_fee_amount,
                    'comulative_amount' =>  $comulative_amount
                ];
            }
        }

        $formattedata =  [
            'id' => $feeStructure->id,
            'title' => $feeStructure->title,
            'fee_installments' => $feeInstallments,
        ];

        return  $formattedata;
    }

    /**
     * take admission.
     */
    public function addAdmissionSave(int $id, AddAdmissionRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $enquiry = $this->admissionRepository->getRegistrationEnquiryById($id);

            $enquiry->load(['guardian', 'studentImage', 'fatherImage', 'motherImage']);

            $date_of_admission = !empty($input['date_of_admission']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['date_of_admission'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d');

            $attachedDocument = !empty($input['document_attached']) ? json_encode($input['document_attached']) : null;

            $enquiry->update([
                'registration_status' => RegistrationStatus::ADMISSION_TAKEN,
                'enquiry_type' => EnquiryType::ADMISSION,
                'admission_type' => $input['admission_type'] ?? "",
                'date_of_admission' => $date_of_admission,
                'document_attached' => $attachedDocument,
                'classroom_id' => $input['classroom_id'] ?? null,
            ]);

            $inputEmail = "";

            if (!empty($input['first_name'])) {
                if (!empty($enquiry?->contact_email)) {
                    $inputEmail = $enquiry->contact_email;
                    $username = strtolower($input['first_name'])  . rand(1000, 9999);
                } else {
                    $username = strtolower($input['first_name'])  . rand(1000, 9999);
                    $inputEmail = $username . '@educarestudy.in';
                }

                $userArray = [
                    'school_id' => getUserSchoolId(),
                    'username' => $username,
                    'first_name' => $input['first_name'] ?? null,
                    'middle_name' =>  $input['middle_name'] ?? null,
                    'last_name' => $input['last_name'] ?? null,
                    'phone' => $input['contact_number'] ?? null,
                    'email' => $inputEmail,
                    'role' => UserRole::SITE_STUDENT,
                    'password' => Hash::make($input['first_name']),
                    'status' => Status::ACTIVE
                ];

                $studentUser = $this->userRepository->create($userArray);
                // assign student role, here student role id: 15
                $studentUser->assignRole(15);
            }

            $academicYearId = $enquiry?->admission_academic_year_id;
            $classNameId = $enquiry?->class_name_id;

            // $admissionProcess = $this->admissionRepository->getAdmissionByAcademicYearId($academicYearId);

            $className = $this->classroomRepository->getClassNameByIdAndAcademicYearId($classNameId, $academicYearId);

            $admissionClass = $className?->title ?? "";

            $admissionNo = $this->studentRepository->getNextAdmissionNo();

            $studentData = array(
                'enquiry_id' => $enquiry?->id ?? null,
                'user_id' => $studentUser?->id ?? null,
                'school_id' => getUserSchoolId(),
                'classroom_id' => $input['classroom_id'] ?? null,
                'academic_year_id' => $academicYearId,
                'class_name_id' => $classNameId,
                'employment_cat_id' => $enquiry?->employment_category_id,
                'country_id' => $enquiry?->country_id,
                'is_have_sibling' => $enquiry?->is_have_sibling ?? false,
                'sibling_student_id' => !empty($input['sibling_student_id']) ? $input['sibling_student_id'] : null,
                'admission_no' => $admissionNo,
                'admission_date_at' => $date_of_admission,
                'first_name' => $input['first_name'] ?? '',
                'middle_name' => $input['middle_name'] ?? '',
                'last_name' => $input['last_name'] ?? '',
                'phone' => $input['contact_number'] ?? '',
                'email' => $inputEmail,
                'boarding_type' => $enquiry?->boarding_scholar ?? '',
                'caste_type' => $input['caste_type'] ?? '',
                'is_computer_option' => $input['is_computer_option'] ?? 0,
                'is_social_studies_option' => $input['is_social_studies_option'] ?? 0,
                'gender' => $input['gender'] ?? '',
                'aadhar_card_no' => $input['aadhar_card_no'] ?? '',
                'blood_group' => $input['blood_group'] ?? '',
                'religion' => $input['religion'] ?? '',
                'srn_no' => $enquiry?->srn_no ?? '',
                'child_id' => $enquiry?->child_id ?? '',
                'samagra_id' => $enquiry?->samagra_id ?? '',
                'birth_place' => $input['birth_place'] ?? '',
                'caste' => $input['caste'] ?? '',
                'sub_caste' => $input['sub_caste'] ?? '',
                'admission_class' => $admissionClass,
                'mother_tongue' => $enquiry?->mother_tongue ?? '',
                'medical_condition' => $enquiry?->medical_condition ?? '',
                'notes' => $input['notes'] ?? '',
                'birth_date_at' => !empty($input['date_of_birth']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['date_of_birth'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'height' => $input['height'] ?? '0.00',
                'weight' => $input['weight'] ?? '0.00',
                'present_address' => $input['present_address'] ?? '',
                'present_state' => $input['present_state'] ?? '',
                'present_city' => $input['city'] ?? '',
                'present_taluka' => $enquiry?->taluka ?? '',
                'present_district' => $enquiry?->district ?? '',
                'present_pin_code' => $input['pin_code'] ?? '',
                'permanent_address' => $input['permanent_address'] ?? '',
                'permanent_state' => $input['permanent_state'] ?? '',
                'permanent_city' => $input['permanent_city'] ?? '',
                'permanent_taluka' => $enquiry?->permanent_taluka ?? '',
                'permanent_district' => $enquiry?->permanent_district ?? '',
                'permanent_pin_code' => $input['permanent_pin_code'] ?? '',
                'is_physical_disabled' =>  $enquiry?->is_physical_disabled ?? 0,
                'is_economically_weaker' =>  $enquiry?->conomically_weaker_section ?? 0,
                'is_spacial_child' =>  $enquiry?->is_spacial_child ?? 0,
                'prev_school_name' =>  $enquiry?->school_name ?? '',
                'prev_school_class' =>  $enquiry?->school_class ?? '',
                'prev_school_year' =>  $enquiry?->school_year ?? '',
                'prev_school_note' =>  $input['school_note'] ?? '',
                'prev_school_tc_no' =>  $enquiry?->tc_no ?? '',
                'student_status' => 'New',
                'document_attached' => $attachedDocument,
                'status' => Status::ACTIVE
            );

            $student = $this->studentRepository->create($studentData);

            if (!empty($student['id'])) {
                // student classroom
                if (!empty($input['classroom_id'])) {
                    $studentClassroomData = array(
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => $enquiry?->admission_academic_year_id ?? null,
                        'class_name_id' => $enquiry?->class_name_id,
                        'classroom_id' => $input['classroom_id'],
                        'student_id' => $student['id'],
                        'academic_year_id_from' => null,
                        'classroom_id_from' => null,
                        'promoted_date_at' => null,
                        'user_id' => Auth::user()->id,
                        'status' => Status::ACTIVE->value,
                    );

                    $this->studentRepository->createClassroomStudent($studentClassroomData);
                }

                // user activity
                $userActivityArr = [
                    'school_id' => getUserSchoolId(),
                    'user_id' => auth()->user()->id,
                    'activitiesable_id' => $student['id'],
                    'activitiesable_type' => \App\Models\Student::class,
                    'status' => Status::ACTIVE->value,
                ];

                $this->userRepository->createUserActivity($userActivityArr, $student['id']);

                if (!empty($input['selectedSibling'])) {
                    foreach ($input['selectedSibling'] as $sibling) {
                        $studentSibling = array(
                            'school_id'  => getUserSchoolId(),
                            'student_id' => $student['id'] ?? null,
                            'sibling_id' => $sibling['id'] ?? null,
                        );

                        $this->studentRepository->createSibling($studentSibling);
                    }
                }

                // student category
                if (!empty($input['category_id'])) {
                    $studentCategory = array(
                        'school_id'  => getUserSchoolId(),
                        'student_id' => $student['id'] ?? null,
                        'category_id' => $input['category_id']
                    );

                    $this->categoryRepository->createStudentCategory($studentCategory);
                }


                // student house
                if (!empty($input['house_id'])) {
                    $houseData = array(
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => $enquiry?->admission_academic_year_id,
                        'student_id' => $student['id'] ?? null,
                        'house_id' => $input['house_id'] ?? null,
                        'status' => Status::ACTIVE
                    );

                    $this->studentHouseRepository->create($houseData);
                }

                // create user for father
                if (!empty($input['father_first_name'])) {
                    if (!empty($input['father_email'])) {
                        $inputEmailF = $input['father_email'];
                        $username = strtolower($input['father_first_name'])  . rand(1000, 9999);
                    } else {
                        $username = strtolower($input['father_first_name'])  . rand(1000, 9999);
                        $inputEmailF = $username . '@educarestudy.in';
                    }

                    $haveFather = $this->userRepository->getFatherByEmail($input['father_email']);

                    $userArray = [
                        'school_id' => getUserSchoolId(),
                        'username' => $username,
                        'first_name' => $input['father_first_name'] ?? null,
                        'middle_name' =>  $input['father_middle_name'] ?? null,
                        'last_name' => $input['father_last_name'] ?? null,
                        'phone' => $input['father_mobile'] ?? null,
                        'email' => $inputEmailF,
                        'role' => UserRole::SITE_PARENT,
                        'password' => Hash::make(Str::random(10)),
                        'status' => Status::ACTIVE
                    ];

                    if (!empty($haveFather)) {
                        $user = $this->userRepository->updateOrCreate(['id' => $haveFather->id], $userArray);
                    } else {
                        $user = $this->userRepository->create($userArray);
                    }

                    // father
                    if (!empty($user->id)) {
                        $fatherData = array(
                            'school_id'  => getUserSchoolId(),
                            'user_id' => $user->id ?? null,
                            'student_id' => $student['id'] ?? '',
                            'guardian_type' => GuardianType::FATHER->value,
                            'first_name' => $input['father_first_name'] ?? '',
                            'middle_name' => $input['father_middle_name'] ?? '',
                            'last_name' => $input['father_last_name'] ?? '',
                            'religion' => $input['father_religion'] ?? '',
                            'relation' => null,
                            'phone' => $input['father_mobile'] ?? '',
                            'email' => $inputEmailF,
                            'sms_phone' => $input['sms_number'] ?? '',
                            'highest_qualification' => $input['father_highest_qualification'] ?? '',
                            'occupation' => $input['father_occupation'] ?? '',
                            'income_per_year' => $input['father_income_per_year'] ?? '',
                            'department' => $enquiry?->guardian?->father_department ?? '',
                            'designation' => $enquiry?->guardian?->father_designation ?? '',
                            'aadhar_card_no' => $input['father_aadhar_card_no'] ?? '',
                            'pan_card_no' => $input['father_pan_card_no'] ?? '',
                            'company_name' => $enquiry?->guardian?->father_company_name ?? '',
                            'city' => $input['father_city'] ?? '',
                            'address' => $input['father_address'] ?? '',
                            'office_address' => $enquiry?->guardian?->father_office_address ?? '',
                            'is_inactive' => 0,
                            'status' => Status::ACTIVE
                        );

                        $this->guardianRepository->create($fatherData);
                    }
                }

                // mother
                if (!empty($input['mother_first_name'])) {
                    $motherData = array(
                        'school_id'  => getUserSchoolId(),
                        'student_id' => $student['id'] ?? '',
                        'guardian_type' => GuardianType::MOTHER->value,
                        'first_name' => $input['mother_first_name'] ?? '',
                        'middle_name' => $input['mother_middle_name'] ?? '',
                        'last_name' => $input['mother_last_name'] ?? '',
                        'religion' => $input['mother_religion'] ?? '',
                        'relation' => null,
                        'phone' => $input['mother_mobile'] ?? '',
                        'email' => $input['mother_email'] ?? '',
                        'sms_phone' => $input['mother_sms_phone'] ?? '',
                        'highest_qualification' => $input['mother_highest_qualification'] ?? '',
                        'occupation' => $input['mother_occupation'] ?? '',
                        'income_per_year' => $input['mother_income_per_year'] ?? '',
                        'department' => $enquiry?->guardian?->mother_department ?? '',
                        'designation' => $enquiry?->guardian?->mother_designation ?? '',
                        'aadhar_card_no' => $input['mother_aadhar_card_no'] ?? '',
                        'pan_card_no' => $input['mother_pan_card_no'] ?? '',
                        'company_name' => $enquiry?->guardian?->mother_company_name ?? '',
                        'city' => $input['mother_city'] ?? '',
                        'address' => $input['mother_address'] ?? '',
                        'office_address' => $enquiry?->guardian?->mother_office_address ?? '',
                        'is_inactive' => 0,
                        'status' => Status::ACTIVE
                    );

                    $this->guardianRepository->create($motherData);
                }

                // profile image
                if (!empty($enquiry?->studentImage)) {
                    $image_url = $enquiry?->studentImage?->path;

                    $dataImage = array(
                        'school_id' => getUserSchoolId(),
                        'imageable_type' => \App\Models\Student::class,
                        'imageable_id' => $student['id'],
                        'name' => 'student_profile_image',
                        'path' => !empty($image_url) ? $image_url : 'no image',
                        'status' => Status::ACTIVE,
                    );

                    $this->imageRepository->morphCreate($dataImage, $student['id']);
                }

                // Father Profile image
                if (!empty($enquiry?->fatherImage)) {
                    $image_url = $enquiry?->fatherImage?->path;

                    $dataImage = array(
                        'school_id' => getUserSchoolId(),
                        'imageable_type' => \App\Models\Student::class,
                        'imageable_id' => $student['id'],
                        'name' => 'student_father_profile_image',
                        'path' => !empty($image_url) ? $image_url : 'no image',
                        'status' => Status::ACTIVE,
                    );

                    $this->imageRepository->morphCreate($dataImage, $student['id']);
                }

                // Mother Profile
                if (!empty($enquiry?->motherImage)) {
                    $image_url = $enquiry?->motherImage?->path;

                    $dataImage = array(
                        'school_id' => getUserSchoolId(),
                        'imageable_type' => \App\Models\Student::class,
                        'imageable_id' => $student['id'],
                        'name' => 'student_mother_profile_image',
                        'path' => !empty($image_url) ? $image_url : 'no image',
                        'status' => Status::ACTIVE,
                    );

                    $this->imageRepository->morphCreate($dataImage, $student['id']);
                }

                // assign fee to student
                if (!empty($classNameId)) {
                    $feeStructureId = !empty($input['fee_structure_id']) ? $input['fee_structure_id'] : null;

                    $this->assignFeeToNewStudent($student['id'], $classNameId, $feeStructureId);
                }

                // sync student to ledger
                $registrationIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_registration_integrated');
                $isReistrationIntegratedWithAccount = $registrationIntegratedWithAccountSetting?->value == 'Yes' ? true : false;

                if ($isReistrationIntegratedWithAccount) {
                    $accountGroup = $this->accountGroupRepository->getDefaultAccountGroupByTitle('Sundry Debtors');

                    $title = "{$student?->first_name} {$student?->middle_name} {$student?->last_name}";

                    $dataArray = [
                        'school_id' => getUserSchoolId(),
                        'account_group_id' => $accountGroup->id ?? null,
                        'student_id' => $student?->id,
                        'title' => $title,
                        'amount_type' => LedgerAmountType::DEBIT,
                        'is_system_default' => true,
                        'status' => Status::ACTIVE,
                    ];

                    $this->ledgerRepository->create($dataArray);
                }
            };

            DB::commit();

            return redirect()->back()->with('message', 'Admission taken successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /*
    *  assign fee to new student
    */
    protected function assignFeeToNewStudent($studentId, $classNameId, $feeStructureId = null)
    {
        $student = $this->studentRepository->getByStudentId($studentId);

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

    /**
     * Display add admission form.
     */
    public function viewAdmission(int $id): Response
    {
        $enquiry = $this->admissionRepository->getAdmissionEnquiryById($id);

        $enquiry->load([
            'guardian',
            'admissionAcademicYear',
            'className',
            'bloodGroup',
            'religionName',
            'category',
            'student' => function ($query) {
                $query->select(
                    'id',
                    'admission_no',
                    'enquiry_id',
                );
            }
        ]);

        $admissionData = $this->formatAdmissionData($enquiry);

        $states = $this->stateRepository->getActiveNameAndId()
            ->map(fn($state) => ['id' => $state->id, 'title' => $state->name])
            ->all();
        $houses = $this->houseRepository->getActiveNameAndId()
            ->map(fn($house) => ['id' => $house->id, 'title' => $house->name])
            ->all();

        $genderArr = array();

        foreach (Gender::cases() as $gType) {
            array_push($genderArr, ['id' => $gType->value, 'title' => $gType->value]);
        }

        $admissionType = array();

        foreach (AdmissionType::cases() as $case) {
            array_push($admissionType, ['id' => $case->value, 'title' => $case->value]);
        }

        return Inertia::render('Admission/ViewAdmissionForm', [
            'admissionData' => $admissionData,
            'states' => $states,
            'houses' => $houses,
            'genderArr' => $genderArr,
            'admissionType' => $admissionType,
        ]);
    }


    /*
    * helper method to format enquiry admission data
    */
    public function formatAdmissionData(object $enquiry)
    {
        $date_of_registration = !empty($enquiry['date_of_registration']) ? Carbon::parse($enquiry['date_of_registration'])->format('d M, Y') : "";
        $date_of_admission = !empty($enquiry['date_of_admission']) ? Carbon::parse($enquiry['date_of_admission'])->format('d M, Y') : "";
        $date_of_birth = !empty($enquiry['birth_date_at']) ? Carbon::parse($enquiry['birth_date_at'])->format('d M, Y') : "";

        $admissionData = [
            'id' => $enquiry?->id,
            'registration_no' => $enquiry?->registration_no,
            'date_of_registration' => $date_of_registration,
            'date_of_admission' => $date_of_admission,
            'class' => $enquiry?->className?->title,
            'academic_session' => $enquiry?->admissionAcademicYear?->academic_session,
            'admission_type' => $enquiry?->admission_type,
            'boarding_scholar' => $enquiry?->boarding_scholar,
            'house_id' => $enquiry?->house_id,
            'first_name' => $enquiry?->first_name,
            'middle_name' => $enquiry?->middle_name,
            'last_name' => $enquiry?->last_name,
            'admission_no' => $enquiry?->student?->admission_no,
            'gender' => $enquiry?->gender,
            'phone' => $enquiry?->contact_number,
            'blood_group' => $enquiry?->bloodGroup?->name,
            'date_of_birth' => $date_of_birth,
            'category' => $enquiry?->category?->title,
            'religion' => $enquiry?->religionName?->name,
            'aadhar_card_no' => $enquiry?->aadhar_card_no,
            'document_attached' => $enquiry?->document_attached,
            'father_first_name' => $enquiry?->guardian?->father_first_name,
            'father_middle_name' => $enquiry?->guardian?->father_middle_name,
            'father_last_name' => $enquiry?->guardian?->father_last_name,
            'father_email' => $enquiry?->guardian?->father_email,
            'father_mobile' => $enquiry?->guardian?->father_mobile,
            'father_sms_no' => $enquiry?->guardian?->father_sms_number,
            'father_highest_qualification' => $enquiry?->guardian?->father_highest_qualification,
            'father_occupation' => $enquiry?->guardian?->father_occupation,
            'father_income_per_year' => $enquiry?->guardian?->father_income_per_year,
            'father_aadhar_card_no' => $enquiry?->guardian?->father_aadhar_card_no,
            'father_pan_card_no' => $enquiry?->guardian?->father_pan_card_no,
            'mother_first_name' => $enquiry?->guardian?->mother_first_name,
            'mother_middle_name' => $enquiry?->guardian?->mother_middle_name,
            'mother_last_name' => $enquiry?->guardian?->mother_last_name,
            'mother_email' => $enquiry?->guardian?->mother_email,
            'mother_mobile' => $enquiry?->guardian?->mother_mobile,
            'mother_highest_qualification' => $enquiry?->guardian?->mother_highest_qualification,
            'mother_occupation' => $enquiry?->guardian?->mother_occupation,
            'mother_income_per_year' => $enquiry?->guardian?->mother_income_per_year,
            'mother_aadhar_card_no' => $enquiry?->guardian?->mother_aadhar_card_no,
            'mother_pan_card_no' => $enquiry?->guardian?->pan_card_no,
            'present_address' => $enquiry?->present_address,
            'present_state' => $enquiry?->present_state,
            'present_city' => $enquiry?->city,
            'present_pin_code' => $enquiry?->pin_code,
            'permanent_address' => $enquiry?->permanent_address,
            'permanent_state' => $enquiry?->permanent_state,
            'permanent_city' => $enquiry?->permanent_city,
            'permanent_pin_code' => $enquiry?->permanent_pin_code,
        ];

        return $admissionData;
    }

    /**
     * Display the schools.
     */
    public function dashboard(Request $request): Response
    {
        $admissions = $this->admissionRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('Admission/Dashboard', [
            'admissions' => $admissions,
            'classrooms' => $classrooms,
        ]);
    }

    /**
     * admission process---------
     */
    public function process(Request $request): Response
    {
        $admissionDataDetails = [];
        $admissionClassroomDetails = [];
        $academicYearId = '';

        if ($request->isMethod('post')) {
            $academicYearId = $request->input('academic_year_id');

            if (!empty($academicYearId) && is_numeric($academicYearId)) {

                $admissionDataDetails = [
                    'academic_year_id' => $academicYearId,
                ];

                $admissionData = $this->admissionRepository->getActiveByAcyId($academicYearId);
                $admissionData?->load(['admissionClassrooms']);

                $admissionClassroomsData = $admissionData?->admissionClassrooms;

                if (!empty($admissionData)) {
                    $admissionDataDetails = [
                        'academic_year_id' => $academicYearId,
                        'title' => $admissionData?->title,
                        'registration_seed' => $admissionData?->registration_seed,
                        'start_date_at' => $admissionData?->start_date_at,
                        'end_date_at' => $admissionData?->end_date_at,
                        'contact_email' => $admissionData?->contact_email,
                        'contact_mobile' => $admissionData?->contact_mobile,
                        'is_open_or_close' => $admissionData?->is_open_or_close ? 'open' : 'close',
                        'is_current' => $admissionData?->is_current,
                        'is_online_registration' => $admissionData?->is_online_registration,
                    ];
                }
                $classNames = $this->classroomRepository->getActiveClassNameAllByAcademicYearId($academicYearId);

                if (!empty($classNames)) {
                    foreach ($classNames as $className) {
                        $min_age = '';
                        $max_age = '';
                        $on_date_at = '';
                        $reg_fee = '';
                        $reg_limit = '';
                        $adm_limit = '';
                        $adm_postfix = '';
                        $adm_prefix = '';
                        $is_open_offline = '';
                        $is_open_online = '';
                        $is_result = '';

                        if (!empty($admissionClassroomsData)) {
                            foreach ($admissionClassroomsData as $classroomAdmData) {
                                if ($className?->id === $classroomAdmData?->class_name_id) {
                                    $min_age = $classroomAdmData?->min_age;
                                    $max_age = $classroomAdmData?->max_age;
                                    $on_date_at = $classroomAdmData?->on_date_at;
                                    $reg_fee = $classroomAdmData?->reg_fee;
                                    $reg_limit = $classroomAdmData?->reg_limit;
                                    $adm_limit = $classroomAdmData?->adm_limit;
                                    $adm_prefix = $classroomAdmData?->adm_prefix;
                                    $adm_postfix = $classroomAdmData?->adm_postfix;
                                    $is_open_offline = $classroomAdmData?->is_open_offline;
                                    $is_open_online = $classroomAdmData?->is_open_online;
                                    $is_result = $classroomAdmData?->is_result;
                                }
                            }
                        }
                        $admissionClassroomDetails[] = [
                            'class_name_id' =>  $className->id,
                            'class_title' => $className->title,
                            'min_age' => $min_age,
                            'max_age' => $max_age,
                            'on_date_at' => $on_date_at,
                            'reg_fee' => $reg_fee,
                            'reg_limit' => $reg_limit,
                            'adm_limit' => $adm_limit,
                            'adm_prefix' => $adm_prefix,
                            'adm_postfix' => $adm_postfix,
                            'is_open_offline' => $is_open_offline,
                            'is_open_online' => $is_open_online,
                            'is_result' => $is_result,
                        ];
                    }
                }
            }
        }

        $academicYears = getAcademicYearsAll();

        return Inertia::render('Admission/Process', [
            'academicYears' => $academicYears,
            'admissionDataDetails' => $admissionDataDetails,
            'admissionClassroomDetails' => $admissionClassroomDetails,
            'academicYearId' => $academicYearId,
        ]);
    }

    /**
     * admission process---------
     */
    public function processOld(Request $request): Response
    {
        $admissionDataDetails = [];
        $admissionClassroomDetails = [];
        $academicYearId = '';

        if ($request->isMethod('post')) {
            $academicYearId = $request->input('academic_year_id');

            if (!empty($academicYearId) && is_numeric($academicYearId)) {

                $admissionDataDetails = [
                    'academic_year_id' => $academicYearId,
                ];

                $admissionData = $this->admissionRepository->getActiveByAcyId($academicYearId)?->load(['admissionClassrooms']);
                $admissionClassroomsData = $admissionData?->admissionClassrooms;
                if (!empty($admissionData)) {
                    $admissionDataDetails = [
                        'academic_year_id' => $academicYearId,
                        'title' => $admissionData?->title,
                        'registration_seed' => $admissionData?->registration_seed,
                        'start_date_at' => $admissionData?->start_date_at,
                        'end_date_at' => $admissionData?->end_date_at,
                        'contact_email' => $admissionData?->contact_email,
                        'contact_mobile' => $admissionData?->contact_mobile,
                        'is_open_or_close' => $admissionData?->is_open_or_close ? 'open' : 'close',
                        'is_current' => $admissionData?->is_current,
                        'is_online_registration' => $admissionData?->is_online_registration,
                    ];
                }
                $classroomsNames = $this->classroomRepository->getByAcy($academicYearId);
                if (!empty($classroomsNames)) {
                    foreach ($classroomsNames as $classroomsName) {
                        $min_age = '';
                        $max_age = '';
                        $on_date_at = '';
                        $reg_fee = '';
                        $reg_limit = '';
                        $adm_limit = '';
                        $adm_postfix = '';
                        $adm_prefix = '';
                        $is_open_offline = '';
                        $is_open_online = '';
                        $is_result = '';

                        if (!empty($admissionClassroomsData)) {
                            foreach ($admissionClassroomsData as $classroomAdmData) {
                                if ($classroomsName?->id === $classroomAdmData?->classroom_id) {
                                    $min_age = $classroomAdmData?->min_age;
                                    $max_age = $classroomAdmData?->max_age;
                                    $on_date_at = $classroomAdmData?->on_date_at;
                                    $reg_fee = $classroomAdmData?->reg_fee;
                                    $reg_limit = $classroomAdmData?->reg_limit;
                                    $adm_limit = $classroomAdmData?->adm_limit;
                                    $adm_prefix = $classroomAdmData?->adm_prefix;
                                    $adm_postfix = $classroomAdmData?->adm_postfix;
                                    $is_open_offline = $classroomAdmData?->is_open_offline;
                                    $is_open_online = $classroomAdmData?->is_open_online;
                                    $is_result = $classroomAdmData?->is_result;
                                }
                            }
                        }
                        $admissionClassroomDetails[] = [
                            'classroom_id' =>  $classroomsName->id,
                            'classroom_title' => $classroomsName->title,
                            'min_age' => $min_age,
                            'max_age' => $max_age,
                            'on_date_at' => $on_date_at,
                            'reg_fee' => $reg_fee,
                            'reg_limit' => $reg_limit,
                            'adm_limit' => $adm_limit,
                            'adm_prefix' => $adm_prefix,
                            'adm_postfix' => $adm_postfix,
                            'is_open_offline' => $is_open_offline,
                            'is_open_online' => $is_open_online,
                            'is_result' => $is_result,
                        ];
                    }
                }
            }
        }

        $academicYears = getAcademicYearsAll();

        return Inertia::render('Admission/Process', [
            'academicYears' => $academicYears,
            'admissionDataDetails' => $admissionDataDetails,
            'admissionClassroomDetails' => $admissionClassroomDetails,
            'academicYearId' => $academicYearId,
        ]);
    }

    //admission process save
    public function processSave(AdmissionProcessRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $conditionArr = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => $input['academic_year_id'] ?? null,
            );

            $dataArray = array(
                'start_date_at' => !empty($input['start_date_at']) ? \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') : date('Y-m-d'),
                'end_date_at' => !empty($input['end_date_at']) ? \Carbon\Carbon::parse($input['end_date_at'])->format('Y-m-d') : date('Y-m-d'),
                // 'start_date_at' => !empty($input['start_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                // 'end_date_at' => !empty($input['end_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'admission_type' => !empty($input['admission_type']) ? $input['admission_type'] : null,
                'admission_number' => !empty($input['admission_number']) ? $input['admission_number'] : null,
                'title' => !empty($input['title']) ? $input['title'] : null,
                'registration_seed' => !empty($input['registration_seed']) ? $input['registration_seed'] : null,
                'contact_email' => !empty($input['contact_email']) ? $input['contact_email'] : null,
                'contact_mobile' => !empty($input['contact_mobile']) ? $input['contact_mobile'] : null,
                'is_current' => !empty($input['is_current']) ? $input['is_current'] : 0,
                'is_online_registration' => !empty($input['is_online_registration']) ? $input['is_online_registration'] : 0,
                'is_open_or_close' => !empty($input['is_open_or_close']) && $input['is_open_or_close'] === 'open' ? true : false,
                'status' => Status::ACTIVE,
            );

            $admission = $this->admissionRepository->updateOrCreate($conditionArr, $dataArray);

            if (!empty($admission->id)) {
                if (isset($input['items'])) {
                    $admissionClassrooms = $input['items'];

                    foreach ($admissionClassrooms as $classroom) {
                        $conditionArrTwo = array(
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => !empty($input['academic_year_id']) ? $input['academic_year_id'] : null,
                            'admission_id' => $admission->id,
                            'class_name_id' => !empty($classroom['class_name_id']) ? $classroom['class_name_id'] : null,
                        );

                        $admissionClassroomArr = [
                            'min_age' => !empty($classroom['min_age']) ? intval($classroom['min_age']) : null,
                            'max_age' => !empty($classroom['max_age']) ? intval($classroom['max_age']) : null,
                            'on_date_at' => !empty($classroom['on_date_at']) ? \Carbon\Carbon::parse($classroom['on_date_at'])->format('Y-m-d') : null,
                            'reg_fee' => !empty($classroom['reg_fee']) ? $classroom['reg_fee'] : null,
                            'reg_limit' => !empty($classroom['reg_limit']) ? intval($classroom['reg_limit']) : null,
                            'adm_limit' => !empty($classroom['adm_limit']) ? intval($classroom['adm_limit']) : null,
                            'adm_prefix' => !empty($classroom['adm_prefix']) ? $classroom['adm_prefix'] : null,
                            'adm_postfix' => !empty($classroom['adm_postfix']) ? $classroom['adm_postfix'] : null,
                            'reg_fee' => !empty($classroom['reg_fee']) ? $classroom['reg_fee'] : null,
                            'is_open_offline' => !empty($classroom['is_open_offline']) ? $classroom['is_open_offline'] : false,
                            'is_open_online' => !empty($classroom['is_open_online']) ? $classroom['is_open_online'] : false,
                            'is_result' => !empty($classroom['is_result']) ? $classroom['is_result'] : false,
                            'status' => Status::ACTIVE,
                        ];

                        $this->admissionRepository->updateOrCreateAdmissionClassroom($conditionArrTwo, $admissionClassroomArr);
                    }
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Saved Successfully.');
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    //admission process save
    public function processSaveOld(AdmissionProcessRequest $request)
    {
        // dd($request);
        $input = $request->validated();

        $conditionArr = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => $input['academic_year_id'],
        );

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'start_date_at' => !empty($input['start_date_at']) ? \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'end_date_at' => !empty($input['end_date_at']) ? \Carbon\Carbon::parse($input['end_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'academic_year_id' => !empty($input['academic_year_id']) ? $input['academic_year_id'] : null,
            'admission_type' => !empty($input['admission_type']) ? $input['admission_type'] : null,
            'admission_number' => !empty($input['admission_number']) ? $input['admission_number'] : null,
            'title' => !empty($input['title']) ? $input['title'] : null,
            'registration_seed' => !empty($input['registration_seed']) ? $input['registration_seed'] : null,
            'contact_email' => !empty($input['contact_email']) ? $input['contact_email'] : null,
            'contact_mobile' => !empty($input['contact_mobile']) ? $input['contact_mobile'] : null,
            'is_current' => !empty($input['is_current']) ? $input['is_current'] : 0,
            'is_online_registration' => !empty($input['is_online_registration']) ? $input['is_online_registration'] : 0,
            'is_open_or_close' => !empty($input['is_open_or_close'] === 'open') ? true : false,
            'status' => Status::ACTIVE,
        );
        $admission = $this->admissionRepository->updateOrCreate($conditionArr, $dataArray);

        if (!empty($admission->id)) {
            if (isset($input['items'])) {
                $admissionClassrooms = $input['items'];
                foreach ($admissionClassrooms as $classroom) {
                    $conditionArrTwo = array(
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => !empty($input['academic_year_id']) ? $input['academic_year_id'] : null,
                        'admission_id' => $admission->id,
                        'classroom_id' => !empty($classroom['classroom_id']) ? $classroom['classroom_id'] : null,
                    );

                    $admissionClassroomArr = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => !empty($input['academic_year_id']) ? $input['academic_year_id'] : null,
                        'admission_id' => $admission->id,
                        'classroom_id' => !empty($classroom['classroom_id']) ? $classroom['classroom_id'] : null,
                        'min_age' => !empty($classroom['min_age']) ? intval($classroom['min_age']) : null,
                        'max_age' => !empty($classroom['max_age']) ? intval($classroom['max_age']) : null,
                        'on_date_at' => !empty($classroom['on_date_at']) ? \Carbon\Carbon::parse($classroom['on_date_at'])->format('Y-m-d') : null,
                        'reg_fee' => !empty($classroom['reg_fee']) ? $classroom['reg_fee'] : null,
                        'reg_limit' => !empty($classroom['reg_limit']) ? intval($classroom['reg_limit']) : null,
                        'adm_limit' => !empty($classroom['adm_limit']) ? intval($classroom['adm_limit']) : null,
                        'adm_prefix' => !empty($classroom['adm_prefix']) ? $classroom['adm_prefix'] : null,
                        'adm_postfix' => !empty($classroom['adm_postfix']) ? $classroom['adm_postfix'] : null,
                        'reg_fee' => !empty($classroom['reg_fee']) ? $classroom['reg_fee'] : null,
                        'is_open_offline' => !empty($classroom['is_open_offline']) ? $classroom['is_open_offline'] : false,
                        'is_open_online' => !empty($classroom['is_open_online']) ? $classroom['is_open_online'] : false,
                        'is_result' => !empty($classroom['is_result']) ? $classroom['is_result'] : false,
                        'status' => Status::ACTIVE,
                    ];
                    $admissionClassroom = $this->admissionRepository->updateOrCreateAdmissionClassroom($conditionArrTwo, $admissionClassroomArr);
                }
            }
            return redirect()->back()->with('message', 'Admission Process Submitted.');
        }
    }

    public function getEnquiryByAcy(Request $request)
    {
        $academicYearId = (int) $request->input('academic_year_id');

        if (!empty($academicYearId) && is_numeric($academicYearId)) {
            $enquiryData = $this->admissionRepository->academicYearEnquiries($academicYearId);
            $enquiryData->map(function ($item) {
                $totalFee = $item->enquiries->sum(function ($enquery) {
                    return $enquery->enquiry_fee ? $enquery->enquiry_fee->fee_amount : 0;
                });

                $item['total_fee'] = $totalFee;
                $item['total_enquiries_count'] = $item->enquiries->count();
                return $item;
            });

            $enquiryData->makeHidden('enquiries');

            $getDailyRegistrationAnalysis = $this->admissionRepository->getDailyRegistrationAnalysis($academicYearId);

            return redirect()->back()->with([
                'enquiryByAcademicYearReport' => [
                    'enquiryData' =>  $enquiryData,
                    'getDailyRegistrationAnalysis' =>  $getDailyRegistrationAnalysis,
                ]
            ]);
        }
    }


    public function getMonthEnquiryByAcy(Request $request)
    {
        $academicYear = (int) $request->input('academic_year_id');

        $enquiryMonthData = [];

        if (!empty($academicYear) && is_numeric($academicYear)) {
            $enquiryMonthData = $this->admissionRepository->academicYearEnquiriesForMonth($academicYear);
        }

        $groupedData = [];

        if ($enquiryMonthData !== null) {
            // Group data by month
            $groupedData = collect($enquiryMonthData)->groupBy(function ($item) {
                return Carbon::parse($item->enquiry_date_at)->format('F');
            });
        }

        return redirect()->back()->with([
            'enquiryMonthData' => $groupedData,
        ])->withSuccess('Enquiry data fetched successfully.');
    }

    public function getRegAmountByAcy(Request $request)
    {
        $academicYear = (int) $request->input('academic_year_id');

        $enquiryRegAmountData = [];

        if (!empty($academicYear) && is_numeric($academicYear)) {
            $enquiryRegAmountData = $this->admissionRepository->academicYearRegAmountData($academicYear);
        }

        return redirect()->back()->with([
            'enquiryRegAmountData' => $enquiryRegAmountData,
        ]);
    }

    public function getDailyAdmissionRepo(Request $request)
    {
        $academicYear = (int) $request->input('academic_year_id');

        $startDate = $request->start_date;
        $endDate = $request->end_date;

        $admissionDailyRepo = [];

        if (!empty($academicYear) && is_numeric($academicYear)) {
            $admissionDailyRepo = $this->admissionRepository->academicYearDailyData($academicYear, $startDate, $endDate);
        }

        return redirect()->back()->with([
            'getDailyAdmissionRepo' => $admissionDailyRepo,
        ]);
    }

    /**
     * Display the admission student type.
     */
    public function studentType(): Response
    {
        $studentsType = $this->admissionRepository->getSchoolWiseActiveAllStudentType();

        // ScholarBoardingType
        $scholarBoardingTypeData = ScholarBoardingType::cases();
        $scholarBoardingType = array();

        foreach ($scholarBoardingTypeData as $dt) {
            array_push($scholarBoardingType, ['id' => $dt->value, 'title' => $dt->value]);
        }

        return Inertia::render('Admission/StudentType', [
            'scholarBoardingType' => $scholarBoardingType,
            'studentType' => $studentsType,
        ]);
    }

    public function studentTypeSave(StudentTypeRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'title' => $input['title'] ?? "",
            'student_type' => $input['student_type'] ?? "",
            'description' => !empty($input['description']) ? $input['description'] : null,
            'status' => Status::ACTIVE,
        );

        $studentType = $this->admissionRepository->createStudentType($dataArray);

        if (!$studentType) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Student Type created successfully.');
    }

    public function studentTypeEdit(int $id): Response
    {
        $studentsType = $this->admissionRepository->getSchoolWiseActiveAllStudentType();
        $studentsTypeId = $this->admissionRepository->getSchoolWiseStudentTypeById($id);

        // ScholarBoardingType
        $scholarBoardingTypeData = ScholarBoardingType::cases();
        $scholarBoardingType = array();

        foreach ($scholarBoardingTypeData as $dt) {
            array_push($scholarBoardingType, ['id' => $dt->value, 'title' => $dt->value]);
        }

        return Inertia::render('Admission/EditStudentType', [
            'scholarBoardingType' => $scholarBoardingType,
            'studentsType' => $studentsType,
            'studentsTypeId' => $studentsTypeId
        ]);
    }

    public function studentTypeUpdate(StudentTypeRequest $request, int $id): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'title' => $input['title'] ?? "",
            'student_type' => $input['student_type'] ?? "",
            'description' => !empty($input['description']) ? $input['description'] : null,
        );

        $studentType = $this->admissionRepository->updateStudentType($id, $dataArray);

        if (!$studentType) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->route('admission.student_type')->with('message', 'Student Type updated successfully.');
    }

    public function studentTypedestroy(int $id): RedirectResponse
    {
        $studentType = $this->admissionRepository->getSchoolWiseStudentTypeById($id);

        if (!$studentType) {
            return redirect()->route('admission.student_type')->with('error', 'Source not found.');
        }

        $this->admissionRepository->deleteStudentType($id);

        return redirect()->route('admission.student_type')->with('message', 'Student Type deleted successfully.');
    }

    /**
     * Display registration Setting.
     */
    public function registrationSetting(Request $request): Response
    {
        $siteSettingsRegistration = getSiteSettingDataByType('Registration');
        $siteSettingsAccount = getSiteSettingDataByType('Account');
        $siteSettingsPayment = getSiteSettingDataByType('Payment Gateway');
        $siteSettingsAdmission = getSiteSettingDataByType('Admission Content');
        return Inertia::render('Admission/RegistrationSetting', [
            'siteSettingsRegistration' => !empty($siteSettingsRegistration['Registration']) ? $siteSettingsRegistration['Registration'] : [],
            'siteSettingsAccount' => !empty($siteSettingsAccount['Account']) ? $siteSettingsAccount['Account'] : [],
            'siteSettingsPayment' => !empty($siteSettingsPayment['Payment Gateway']) ? $siteSettingsPayment['Payment Gateway'] : [],
            'siteSettingsAdmission' => !empty($siteSettingsAdmission['Admission Content']) ? $siteSettingsAdmission['Admission Content'] : [],

        ]);
    }

    public function registrationSettingSave(Request $request)
    {
        $inputArray = $request->all();
        try {
            foreach ($inputArray['key_value_array'] as $input) {
                setSiteSettingData($input['type'], $input['key'], $input['value']);
            }
            return redirect()->route('admission.registration_settings')->with('message', 'Setting successfully.');
        } catch (\Throwable $th) {

            throw $th;

            return redirect()->route('admission.registration_settings')->with('error', 'Something goes wrong.');
        }
    }


    /**
     * Display Enquiry Report Date Wise Activity - Admission Enquiry
     */
    // public function enquiryReportDateWiseActivity(Request $request): Response
    // {
    //     $admissions = $this->admissionRepository->getActiveAll();
    //     $classrooms = $this->classroomRepository->getActiveAll();
    //     dd($admissions, $classrooms);
    //     return Inertia::render('Admission/EnquiryReportDateWiseActivity', [
    //         'admissions' => $admissions,
    //         'classrooms' => $classrooms,
    //     ]);




    // }

    public function enquiryReportDateWiseActivity(Request $request): Response
    {

        if ($request->isMethod('post')) {
            $startDate      = !empty($request->input('start_date')) ? Carbon::parse($request->input('start_date'))->format('Y-m-d') : '';

            $enqueryReportList  = $this->admissionRepository->getActiveAllEnqueryFilterDataDayWise($startDate);
            // dd($enqueryReportList);
        } else {
            $enqueryReportList  = $this->admissionRepository->getActiveAllEnquery();
        }

        $landmarkData       = $this->admissionRepository->getActiveLandmark();
        $landmark           = $landmarkData->map(fn($landmark) => ['id' => $landmark->id, 'title' => $landmark->landmark])->all();

        $classData          = $this->admissionRepository->getActiveClass();
        $class              = $classData->map(fn($class) => ['id' => $class->id, 'title' => $class->class])->all();

        $statusData         = $this->admissionRepository->getActiveStatus();
        $status             = $statusData->map(fn($status) => ['id' => $status->id, 'title' => $status->status])->all();

        $adminData          = $this->admissionRepository->getSchoolAdmin();
        $admins             = $adminData->map(fn($admin) => ['id' => $admin->id, 'title' => $admin->user_id])->all();

        return Inertia::render('Admission/EnquiryReportDateWiseActivity', [
            'enqueryReportList' => $enqueryReportList,
            'landmarks' => $landmark,
            'classes' => $class,
            'status' => $status,
            'schoolAdmin' => $admins,
        ]);
    }

    public function getActivityDateWiseReport(Request $request): Response
    {
        // Assuming you have a date range in the request, you can extract it like this:
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        // Fetching data from the database based on the date range
        $reportData = Enquiry::whereBetween('created_at', [$startDate, $endDate])
            ->leftJoin('enquiry_guardians', 'enquiry_guardians.enquiry_id', '=', 'enquiries.id')
            ->select(
                'enquiry_guardians.father_first_name as name',
                'enquiry_guardians.father_email as email',
                'enquiry_guardians.father_mobile as phone'
            )
            ->get();

        // Returning the data to the view for rendering the report
        return Inertia::render('Reports/ActivityDateWiseReport', [
            'reportData' => $reportData,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ]);
    }


    /**
     * Display enquiry Report Date Wise Follow - Admission Enquiry
     */
    public function enquiryReportDateWiseFollow(Request $request): Response
    {
        $admissions = $this->admissionRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();

        if ($request->isMethod('post')) {
            $startDate      = !empty($request->input('start_date')) ? Carbon::parse($request->input('start_date'))->format('Y-m-d') : '';

            $dateWiseReport = $this->admissionRepository->getDataWiseReportFilterDateWise($startDate);
        } else {
            $dateWiseReport = $this->admissionRepository->getDataWiseReport();
        }



        // dd($dateWiseReport);

        return Inertia::render('Admission/EnquiryReportDateWiseFollow', [
            'admissions'        => $admissions,
            'classrooms'        => $classrooms,
            'dateWiseReport'    => $dateWiseReport,
        ]);
    }

    /**
     * Display Enquiry Status Summary - Admission Enquiry
     */
    public function enquiryStatusSummary(): Response
    {
        $admissionStatusSummaryReport = [];

        $enquiries = $this->admissionRepository->getAdmissionStatusSummaryReport();

        if (count($enquiries) > 0) {
            foreach ($enquiries as $enquiry) {
                $enquiryStatus = $enquiry?->enquiry_status;

                if (!isset($admissionStatusSummaryReport[$enquiryStatus])) {
                    $admissionStatusSummaryReport[$enquiryStatus] = [
                        'enquiry_status' => $enquiryStatus,
                        'total_enquiry' => 0
                    ];
                }

                $admissionStatusSummaryReport[$enquiryStatus]['total_enquiry'] = ($admissionStatusSummaryReport[$enquiryStatus]['total_enquiry'] ?? 0) + 1;

                $studentName = ($enquiry?->first_name ?? "") . " " . ($enquiry?->middle_name ?? "") . " " . ($enquiry?->last_name ?? "");
                $fatherName = ($enquiry?->father_first_name ?? "") . " " . ($enquiry?->father_middle_name ?? "") . " " . ($enquiry?->father_last_name ?? "");

                $dateOfRegistration = !empty($enquiry?->date_of_registration) ? Carbon::parse($enquiry->date_of_registration)->format('d-M-Y') : "";

                $enquiryData = [
                    'id' => $enquiry?->id,
                    'student_name' => $studentName,
                    'class_title' => $enquiry?->class_title,
                    'registration_no' => $enquiry?->registration_no,
                    'registration_date' => $dateOfRegistration,
                    'father_name' => $fatherName,
                    'father_mobile' => $enquiry?->father_mobile,
                ];

                $admissionStatusSummaryReport[$enquiryStatus]['enquiries'][] = $enquiryData;
            }
        }

        return Inertia::render('Admission/EnquiryStatusSummary', [
            'admissionStatusSummaryReport' => $admissionStatusSummaryReport,
        ]);
    }

    /**
     * Display Class Wise Summary - Admission Enquiry
     */
    public function classWiseSummary(): Response
    {
        $classWiseAdmissionSummary = [];

        $enquiries = $this->admissionRepository->getClassWiseAdmissionSummaryReport();

        if (count($enquiries) > 0) {
            foreach ($enquiries as $enquiry) {
                $classNameId = $enquiry?->class_name_id;
                $enquiryStatus = $enquiry?->enquiry_status;
                $registrationStatus = $enquiry?->registration_status;

                if (!isset($classWiseAdmissionSummary[$classNameId])) {
                    $classWiseAdmissionSummary[$classNameId] = [
                        'class_title' => $enquiry?->class_title,
                    ];
                }

                $studentName = ($enquiry?->first_name ?? "") . " " . ($enquiry?->middle_name ?? "") . " " . ($enquiry?->last_name ?? "");
                $fatherName = ($enquiry?->father_first_name ?? "") . " " . ($enquiry?->father_middle_name ?? "") . " " . ($enquiry?->father_last_name ?? "");

                $dateOfRegistration = !empty($enquiry?->date_of_registration) ? Carbon::parse($enquiry->date_of_registration)->format('d-M-Y') : "";

                $enquiryData = [
                    'id' => $enquiry?->id,
                    'student_name' => $studentName,
                    'class_title' => $enquiry?->class_title,
                    'registration_no' => $enquiry?->registration_no,
                    'registration_date' => $dateOfRegistration,
                    'father_name' => $fatherName,
                    'father_mobile' => $enquiry?->father_mobile,
                ];

                $classWiseAdmissionSummary[$classNameId]['total_enquiry'] = ($classWiseAdmissionSummary[$classNameId]['total_enquiry'] ?? 0) + 1;

                $classWiseAdmissionSummary[$classNameId]['enquiries'][] = $enquiryData;

                if ($enquiryStatus == EnquiryStatus::REGISTRATION_TAKEN->value) {
                    $classWiseAdmissionSummary[$classNameId]['total_registration'] = ($classWiseAdmissionSummary[$classNameId]['total_registration'] ?? 0) + 1;

                    $classWiseAdmissionSummary[$classNameId]['registrations'][] = $enquiryData;
                }

                if ($registrationStatus == RegistrationStatus::ADMISSION_TAKEN->value) {
                    $classWiseAdmissionSummary[$classNameId]['total_admission'] = ($classWiseAdmissionSummary[$classNameId]['total_admission'] ?? 0) + 1;

                    $classWiseAdmissionSummary[$classNameId]['admissions'][] = $enquiryData;
                }
            }
        }

        return Inertia::render('Admission/ClassWiseSummary', [
            'classWiseAdmissionSummary' => $classWiseAdmissionSummary,
        ]);
    }

    /**
     * Display RegistrationSourceReport - Admission Enquiry
     */
    public function registrationSourceReport(): Response
    {
        $registrationByReport = [];
        $sourceByReport = [];

        $registrations = $this->admissionRepository->getRegistrationSourceSummaryReport();

        if (count($registrations) > 0) {
            foreach ($registrations as $registration) {
                $userId = $registration?->user_id;
                $sourceId = $registration?->source_id;
                $userName = ($registration?->user_first_name ?? "") . " " . ($registration?->user_middle_name ?? "") . " " . ($registration?->user_middle_name ?? "");
                $studentName = ($registration?->first_name ?? "") . " " . ($registration?->middle_name ?? "") . " " . ($registration?->last_name ?? "");
                $fatherName = ($registration?->father_first_name ?? "") . " " . ($registration?->father_middle_name ?? "") . " " . ($registration?->last_name ?? "");

                $registrationData = [
                    'id' => $registration?->id,
                    'student_name' => $studentName,
                    'class_title' => $registration?->class_title,
                    'registration_no' => $registration?->registration_no,
                    'father_name' => $fatherName,
                    'father_mobile' => $registration?->father_mobile,
                    'registration_status' => $registration?->registration_status,
                ];

                if (!isset($registrationByReport[$userId])) {
                    $registrationByReport[$userId] = [
                        'user_name' => $userName,
                    ];
                }

                if (!isset($sourceByReport[$sourceId])) {
                    $sourceByReport[$sourceId] = [
                        'source_title' => $registration?->source_title,
                    ];
                }

                $registrationByReport[$userId]['total_registration'] = ($registrationByReport[$userId]['total_registration'] ?? 0) + 1;
                $registrationByReport[$userId]['registrations'][] = $registrationData;

                $sourceByReport[$sourceId]['total_registration'] = ($sourceByReport[$sourceId]['total_registration'] ?? 0) + 1;
                $sourceByReport[$sourceId]['registrations'][] = $registrationData;
            }
        }

        return Inertia::render('Admission/RegistrationSourceReport', [
            'registrationByReport' => $registrationByReport,
            'sourceByReport' => $sourceByReport,
        ]);
    }

    /**
     * Display RegistrationSourceReport - Admission Enquiry
     */
    public function registrationSourceReportOld(Request $request): Response
    {
        $studentsData = $this->admissionRepository->getActiveAllEnquery();

        $groupedStudentsData =  $studentsData->groupBy('source_id');
        $source = !empty($_GET['source']) ? $_GET['source'] : '';
        $sources = $this->admissionRepository->getActiveAllEnquerySource($source);

        $groupedRegisterData =  $studentsData->groupBy('user_id')->map(function ($group) {
            return [
                'user_id' => $group[0]['user_id'],
                'user_name' => $group[0]['user_name'],
                'count' => $group->count()
            ];
        });

        return Inertia::render('Admission/RegistrationSourceReport', [
            'groupedStudentsData' => $groupedStudentsData,
            'groupedRegisterData' => $groupedRegisterData,
            'studentsData' => $studentsData,
            'sources' => $sources,

        ]);
    }
}
