<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Requests\AssetRequest;
use Illuminate\Support\Facades\Auth;
use App\Repositories\AssetRepository;
use App\Repositories\TopicRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IAssetRepository;
use App\Repositories\ITopicRepository;
use App\Repositories\SubjectRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\ISubjectRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ClassroomRepository;
use App\Repositories\IGuardianRepository;
use App\Repositories\IAdmissionRepository;
use App\Repositories\IClassroomRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class StudentReportController extends Controller
{

    public function __construct(
        private IAssetRepository $assetRepository,
        private ISubjectRepository $subjectRepository,
        private IClassroomRepository $classroomRepository,
        private ITopicRepository $topicRepository,
        private IGuardianRepository $guardianRepository,
        private IStudentRepository $studentRepository,
        private IAdmissionRepository $admissionRepository,
    ) {
        $this->middleware('permission:view student', ['only' => ['customDownload', 'predefinedDownload', 'parentIncome', 'ewsReport',
            'studentAgeReport', 'studentDocumentReport', 'monthlyAdmission', 'studentPromotedReport'
        ]]);
        $this->middleware('permission:add student', ['only' => ['parentMonthlyIncome']]);
        $this->middleware('permission:edit student', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete student', ['only' => ['destroy']]);
    }

    /**
     * Display the custom download.
     */
    public function customDownload(Request $request): Response
    {
        $academicYears = getAcademicYearsAll();
        $classNames = [];
        $classrooms = [];
        $statusArray = [];

        foreach (Status::cases() as $case) {
            if ($case == Status::ACTIVE || $case == Status::INACTIVE) {
                array_push($statusArray, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        array_push($statusArray, ['id' => 'TC', 'title' => 'TC']);

        $attributes = [
            'student_name' => 'Student Name',
            'student_first_name' => 'Student First Name',
            'student_middle_name' => 'Student Middle Name',
            'student_last_name' => 'Student Last Name',
            'admission_number' => 'Admission Number',
            'admission_date' => 'Admission Date',
            'class' => 'Class',
            'status' => 'Status',
            'section' => 'Section',
            'roll_number' => 'Roll Number',
            'tc_number' => 'Tc Number',
            'gender' => 'Gender',
            'date_of_birth' => 'Date of birth',
            'city' => 'City',
            'state' => 'State',
            'address' => 'Address',
            'pin' => 'Pin',
            'email' => 'Email',
            'house_name' => 'House Name',
            'blood_group' => 'Blood Group',
            'student_type' => 'Student Type',
            'category' => 'Category',
            'religion' => 'Religion',
            'student_aadhar_card_no' => 'Student Aadharcard No.',
            'child_id' => 'Child Id',
            'srn_no' => 'SRN No.',
            'caste' => 'Caste',
            'admission_class' => 'Admission Class',
            'student_height' => 'Height',
            'student_weight' => 'Weight',
            'father_first_name' => 'Father First Name',
            'father_middle_name' => 'Father Middle Name',
            'father_last_name' => 'Father Last Name',
            'father_phone' => 'Father Phone',
            'sms_no' => 'SmsNo',
            'father_email' => 'Father Email',
            'father_qualification' => 'Father Qualification',
            'father_occupation' => 'Father Occupation',
            'father_income_per_year' => 'Father IncomePerYear',
            'father_designation' => 'Father Designation',
            'father_pan_card' => 'Father Pancard',
            'father_aadhar_card' => 'Father Aadharcard',
            'father_company' => 'Father Company',
            'father_office_address' => 'Father Office Address',
            'mother_name' => 'Mother Name',
            'mother_phone' => 'Mother Phone',
            'mother_email' => 'Mother Email',
            'mother_qualification' => 'Mother Qualification',
            'mother_occupation' => 'Mother Occupation',
            'mother_income_per_year' => 'Mother IncomePerYear',
            'mother_designation' => 'Mother Designation',
            'mother_pan_card' => 'Mother Pancard',
            'mother_aadhar_card' => 'Mother Aadharcard',
            'mother_company' => 'Mother Company',
            'mother_office_address' => 'Mother Office Address',
            'mother_tongue' => 'Mother Tongue',
            'permanent_city' => 'Permanent City',
            'permanent_state' => 'Permanent State',
            'permanent_address' => 'Permanent Address',
            'permanent_pin' => 'Permanent Pin',
            'previous_school_name' => 'Previous School Name',
            'previous_school_class' => 'Previous School Class',
            'previous_school_year' => 'Previous School Year',
            'student_status' => 'New/Promoted Students',
            'previous_tc_no' => 'Previous Tc No.',
            'user_name' => 'User Name',
            'user_password' => 'User Password',
            'route' => 'Route',
            // 'upgraded_student' => 'Upgraded/NonUpgraded Students',
            'bank_name' => 'Bank Name',
            'account_number' => 'Account Number',
            'ifsc' => 'IFSC',
            // 'registration_number' => 'Registration Number',
            'employment_category' => 'Employment Category',
            // 'admission_form_no' => 'Admission Form No',
            // 'pen' => 'PEN',
            'samagra_id' => 'Samagra ID',
        ];

        if ($request->isMethod('POST')) {
            $academicYearId = $request->academic_year_id ?? null;

            if (!empty($academicYearId)) {
                $classNames = $this->classroomRepository->getClassNamesByAcademicYearId($academicYearId);
                $classrooms = $this->classroomRepository->getClassroomsByAcademicYearId($academicYearId);
            }
        }

        return Inertia::render('StudentReport/CustomDownload', [
            'classrooms' => $classrooms,
            'classNames' => $classNames,
            'academicYears' => $academicYears,
            'statusArray' => $statusArray,
            'attributes' => $attributes,
        ]);
    }

    /**
     * Display the pre download.
     */
    public function predefinedDownload(Request $request): Response
    {
        $statusArray = [];

        foreach (Status::cases() as $case) {
            if ($case == Status::ACTIVE || $case == Status::INACTIVE) {
                array_push($statusArray, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        array_push($statusArray, ['id' => 'TC', 'title' => 'TC']);

        $classrooms = $this->classroomRepository->getActiveAll();
        $classNames = $this->classroomRepository->getSessionWiseActiveClassNameAll();

        return Inertia::render('StudentReport/PredefinedDownload', [
            'classNames' => $classNames,
            'classrooms' => $classrooms,
            'statusArray' => $statusArray,
        ]);
    }

    /**
     * Display the parent income.
     */
    public function parentIncome(Request $request): Response
    {
        $parentIncomeReport = [];
        $guardians = [];

        if ($request->isMethod('post')) {
            $range = !empty($request->input('range')) ? intval($request->input('range')) : 0;

            $parentIncomeReport = $this->guardianRepository->getParentByIncomeRange($range);

            if (!empty($request->guardian_ids)) {
                $guardians = $this->guardianRepository->getParentByIds($request->guardian_ids);
            }
        }

        return Inertia::render('StudentReport/ParentIncome', [
            'parentIncomeReport' => $parentIncomeReport,
            'guardians' => $guardians,
        ]);
    }

    /**
     * Display the pre download.
     */
    public function parentMonthlyIncome(Request $request): Response
    {
        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('StudentReport/ParentMonthlyIncome', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
        ]);
    }

    /**
     * Display the pre download.
     */
    public function ewsReport(Request $request): Response
    {
        $ewsReports = [];
        $classrooms = $this->classroomRepository->getActiveAll();

        $classroomData = $classrooms->map(function ($classroom) {
            return [
                'id' => $classroom->id,
                'title' => $classroom->title,
            ];
        })->toArray();

        array_unshift($classroomData, ['id' => 'all_class', 'title' => 'All classes']);

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;

            if (!empty($classroomId)) {
                $ewsReports = $this->studentRepository->getEwsReportData($classroomId);
            }

            if (!empty($ewsReports)) {
                $ewsReports = $ewsReports->map(function ($student) {
                    if ($student?->promotedClassroom != null) {
                        if (!empty($student['classroom'])) {
                            unset($student['classroom']);
                        }

                        $student['classroom'] = $student?->promotedClassroom;
                        $student['classroom_id'] = $student?->promotedClassroom?->id;
                    }

                    $studentName = ($student?->first_name) . " " . ($student?->middle_name) . " " . ($student?->last_name);

                    $fatherName = "";

                    if ($student?->father != null) {
                        $fatherName = ($student?->father?->first_name) . " " . ($student?->father?->middle_name) . " " . ($student?->father?->last_name);
                    }

                    return [
                        'student_id' => $student->id,
                        'admission_no' => $student->admission_no,
                        'birth_date' => !empty($student->birth_date_at) ? Carbon::parse($student->birth_date_at)->format('d-M-Y') : '',
                        'roll_no' => $student?->classroomRoll?->roll_no,
                        'classroom_title' => $student?->classroom?->title,
                        'student_name' => $studentName,
                        'father_name' => $fatherName,
                        'father_phone' => $student?->father?->phone,
                    ];
                });
            }
        }

        return Inertia::render('StudentReport/EwsReport', [
            'classrooms' => $classroomData,
            'ewsReports' => $ewsReports,
        ]);
    }

    /**
     * Display the pre download.
     */
    public function studentAgeReport(Request $request): Response
    {
        $selectedDate = now();
        $minAge = 0;
        $maxAge = 10;

        if ($request->isMethod('post')) {
            $selectedDate = !empty($request->input('selected_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('selected_date'))->timezone(getSchoolTimeZone())->toDateString() : '';
            $minAge = $request->input('min_age') ?? 0;
            $maxAge = $request->input('max_age') ?? 0;
        }

        $students = $this->studentRepository->getActiveListForAgeReport($selectedDate, $minAge, $maxAge);

        $studentData = $students->map(function ($student) {
            if ($student?->promotedClassroom != null) {
                if (!empty($student['classroom'])) {
                    unset($student['classroom']);
                }

                $student['classroom_id'] = $student?->promotedClassroom?->id;
                $student['classroom'] = $student?->promotedClassroom;
            }

            return $student;
        })->toArray();

        return Inertia::render('StudentReport/StudentAgeReport', [
            'studentData' => $studentData,
        ]);
    }

    /**
     * Display the pre download.
     */
    public function studentDocumentReport(Request $request): Response
    {
        $studentData = [];

        $documentTitles = ['Pan card', 'Voter card', 'Passport', 'Aadhaar card'];

        if ($request->isMethod('post')) {
            $classroomId = $request->input('classroom_id') ?? null;

            if (!empty($classroomId)) {
                $studentData = $this->studentRepository->getActiveListForDocument($classroomId)
                    ->map(function ($student) use ($documentTitles) {
                        if ($student?->promotedClassroom != null) {
                            if (!empty($student['classroom'])) {
                                unset($student['classroom']);
                            }

                            $student['classroom_id'] = $student?->promotedClassroom?->id;
                            $student['classroom'] = $student?->promotedClassroom;
                        }

                        $attachedDocuments = [];

                        if ($student?->document_attached != null) {
                            $documentAttached = json_decode($student->document_attached);

                            if (count($documentAttached) > 0) {
                                foreach ($documentAttached as $document) {
                                    if ($document?->is_have == true) {
                                        $attachedDocuments[] = $document?->title;
                                    }
                                }
                            }
                        }

                        $unattachedDocuments = array_diff($documentTitles, $attachedDocuments);

                        $unattachedDocumentTitles = implode(', ', $unattachedDocuments);
                        $attachedDocumentTitles = implode(', ', $attachedDocuments);

                        $student['attached_documents'] = $attachedDocumentTitles;
                        $student['unattached_documents'] = $unattachedDocumentTitles;

                        return $student;
                    })->toArray();
            }
        }

        $classroomData = $this->classroomRepository->getActiveNameAndId();

        $classrooms = $classroomData->map(fn ($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        return Inertia::render('StudentReport/StudentDocumentReport', [
            'students' => $studentData,
            'classrooms' => $classrooms,
        ]);
    }

    /**
     * Display the pre download.
     */
    public function monthlyAdmission(Request $request): Response
    {
        $academicYears = getAcademicYearsAll();
        $monthlyAdmissionReports = [];
        $academicYearId = null;

        if ($request->isMethod('POST')) {
            $academicYearId = $request->academic_year_id ?? null;
        }

        $admissionReportData = $this->admissionRepository->getMonthlyAdmissionReportData($academicYearId);

        if (count($admissionReportData) > 0) {
            foreach ($admissionReportData as $report) {
                if (!empty($report?->enquiry_date_at)) {
                    $month = Carbon::parse($report?->enquiry_date_at)->format('m');

                    if (empty($monthlyAdmissionReports[$month]['month'])) {
                        $monthlyAdmissionReports[$month]['month'] = Carbon::parse($report?->enquiry_date_at)->format('M');
                    }

                    $monthlyAdmissionReports[$month]['total_admission_count'] = ($monthlyAdmissionReports[$month]['total_admission_count'] ?? 0) + 1;
                }
            }
        }

        ksort($monthlyAdmissionReports);

        return Inertia::render('StudentReport/MonthlyAdmission', [
            'academicYears' => $academicYears,
            'monthlyAdmissionReports' => $monthlyAdmissionReports,
        ]);
    }

    /**
     * Display the pre download.
     */
    public function studentPromotedReport(Request $request): Response
    {
        $classroomId = '';
        $searchValue = '';
        $startDate = Carbon::now()->format('Y-m-d');
        $endDate = Carbon::now()->format('Y-m-d');

        if ($request->isMethod('post')) {
            $searchValue = $request->input('search_value');
            $classroomId = $request->input('classroom_id');
            $startDate = !empty($request->input('start_date')) ? \Carbon\Carbon::parse($request->input('start_date'))->format('Y-m-d') : '';
            $endDate = !empty($request->input('end_date')) ? \Carbon\Carbon::parse($request->input('end_date'))->format('Y-m-d') : '';
        }

        // classroom
        $classroomData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomData->map(fn ($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        $students = $this->studentRepository->getActivePromotedReport($searchValue, $classroomId,  $startDate, $endDate);

        if (count($students) > 0) {
            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroomData'])) {
                        unset($student['classroomData']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroomData'] = $student?->promotedClassroom;
                }

                return $student;
            })->toArray();
        }

        return Inertia::render('StudentReport/StudentPromotedReport', [
            'students' => $students,
            'classrooms' => $classrooms,
        ]);
    }

}
