<?php

namespace App\Http\Controllers;

use Exception;
use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\ExamStatus;
use App\Enums\EnquiryStatus;
use Illuminate\Http\Request;
use App\Enums\RegistrationStatus;
use App\Enums\AdmissionExamStatus;
use App\Enums\ScholarBoardingType;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\SalaryRequest;
use Illuminate\Support\Facades\Auth;
use App\Repositories\IExamRepository;
use App\Repositories\StaffRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IAssetRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\SalaryRepository;
use App\Repositories\ISalaryRepository;
use App\Repositories\TeacherRepository;
use App\Repositories\ITeacherRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\AdmissionRepository;
use App\Repositories\IAdmissionRepository;
use App\Repositories\IClassroomRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\RegistrationExamMarkRequest;

class AdmissionExamController extends Controller
{
    public function __construct(
        private ISalaryRepository $salaryRepository,
        private IStaffRepository $staffRepository,
        private ITeacherRepository $teacherRepository,
        private IAdmissionRepository $admissionRepository,
        private IClassroomRepository $classroomRepository,
        private IExamRepository $examRepository,

    ) {
        $this->middleware('permission:view exam', ['only' => ['classwiseReport', 'admissionExamSummary',
            'registrationExamReport', 'getRegistrationExamReportData'
        ]]);
        $this->middleware('permission:add exam', ['only' => ['setExamDate', 'sendStudentMessage', 'registrationMarksEntry',
            'registrationMarksEntrySave', 'calculatePercentage'
        ]]);
        $this->middleware('permission:edit exam', ['only' => ['changeSelectedStatus']]);
    }

    /**
     * set admission exam date
     */
    public function setExamDate(Request $request): Response
    {
        $academicYears = getAcademicYearsAll();
        $classNames = [];
        $registrations = [];

        $academicYearId = getAcademicYearId();
        $classNameId = null;

        if ($request->isMethod('POST')) {
            $academicYearId = $request?->academic_year_id ?? null;
            $classNameId = $request?->class_name_id ?? null;
        }

        if (!empty($academicYearId)) {
            $classNames = $this->classroomRepository->getActiveClassNameAllByAcademicYearId($academicYearId);

            if (!empty($classNameId)) {
                $registrations = $this->admissionRepository->getEnquiriesByAcademicYearIdAndClassNameId($academicYearId, $classNameId);

                if (count($registrations) > 0) {
                    $registrations = $registrations->map(function ($registration) {
                        $registration['test_date'] = !empty($registration?->test_date) ? Carbon::parse($registration?->test_date)->format('d M, Y') : "";
                        $registration['test_time'] = !empty($registration?->test_time) ? Carbon::parse($registration?->test_time)->format('H:i A') : "";

                        return $registration;
                    });
                }
            }
        }

        return Inertia::render('AdmissionExam/SetExamDate', [
            'academicYears' => $academicYears,
            'classNames' => $classNames,
            'registrations' => $registrations,
            'academicYearId' => $academicYearId
        ]);
    }

    /**
     * Display the classroomWiseData.
     */
    public function classwiseReport(Request $request)
    {
        $academicYearId = $request->input('academic_year_id');
        $classroomId = $request->input('classroom_id');

        $classroomWiseData = $this->admissionRepository->getByClass($academicYearId, $classroomId);

        return redirect()->back()->with([
            'classroomWiseData' => $classroomWiseData
        ]);
    }

    /**
     * Admission Exam Status
     */
    public function changeSelectedStatus(Request $request): Response
    {
        $academicYears = getAcademicYearsAll();
        $classNames = [];
        $registrations = [];
        $examStatusArray = [];

        foreach (AdmissionExamStatus::cases() as $status) {
            array_push($examStatusArray, ['id' => $status->value, 'title' => $status->value]);
        }

        $academicYearId = getAcademicYearId();
        $classNameId = null;
        $fromDate = "";
        $toDate = "";
        $examStatus = "";

        if ($request->isMethod('POST')) {
            $academicYearId = $request?->academic_year_id ?? null;
            $classNameId = $request?->class_name_id ?? null;
            $fromDate = !empty($request->from_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->from_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $toDate = !empty($request->to_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->to_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $examStatus = $request->exam_status ?? "";
        }

        if (!empty($academicYearId)) {
            $classNames = $this->classroomRepository->getActiveClassNameAllByAcademicYearId($academicYearId);

            if (!empty($classNameId)) {
                $registrations = $this->admissionRepository->getEnquiriesByAcademicYearIdAndClassNameId($academicYearId, $classNameId, $fromDate, $toDate, $examStatus);

                if (count($registrations) > 0) {
                    $classroomIds = $this->classroomRepository->getClassroomsByAcademicYearIdAndClassNameId($academicYearId, $classNameId)
                        ->pluck('id')
                        ->toArray();

                    $registrations->loadMissing(['admissionExamMarks' => function ($query) use ($classNameId, $academicYearId, $classroomIds) {
                        $query->where('admission_exam_marks.class_name_id', $classNameId)
                            ->where('admission_exam_marks.academic_year_id', $academicYearId)
                            ->with(['subject.classroomSubjects' => function ($query) use ($classroomIds) {
                                $query->whereIn('classroom_id', $classroomIds)
                                    ->with(['examRoasters']);
                            }]);
                    }]);

                    $registrations = $registrations->map(function ($registration) {
                        $percentage = "";

                        if (count($registration?->admissionExamMarks) > 0) {
                            $totalFullMark = 0;
                            $totalObtainedMark = 0;

                            foreach ($registration?->admissionExamMarks as $examMark) {
                                $examId = $examMark?->exam_id;
                                $subject = $examMark?->subject;
                                $classroomSubject = $subject?->classroomSubjects?->first();
                                $examRoaster = $classroomSubject?->examRoasters?->where('exam_id', $examId)?->first();

                                $totalFullMark += (float) $examRoaster?->full_mark ?? 0;
                                $totalObtainedMark += (float) $examMark?->mark ?? 0;

                                $markData[$subject?->id] = [
                                    'subject_title' => $subject?->title,
                                    'full_mark' => $examRoaster?->full_mark,
                                    'pass_mark' => $examRoaster?->pass_mark,
                                    'obtained_mark' => (float) $examMark?->mark,
                                    'result' => $examMark?->mark >= $examRoaster?->pass_mark ? "Pass" : "Fail",
                                ];
                            }

                            $percentage = $this->calculatePercentage($totalObtainedMark, $totalFullMark);
                        }

                        if ($percentage != null) {
                            $percentage = $percentage . "%";
                        }

                        $registration['result'] = $percentage;
                        $registration['test_date'] = !empty($registration?->test_date) ? Carbon::parse($registration?->test_date)->format('d M, Y') : "";

                        return $registration;
                    });
                }
            }
        }

        return Inertia::render('AdmissionExam/ChangeSelectedStatus', [
            'examStatusArray' => $examStatusArray,
            'academicYears' => $academicYears,
            'classNames' => $classNames,
            'registrations' => $registrations,
            'academicYearId' => $academicYearId,
        ]);
    }

    /**
     * Display the schools.
     */
    public function changeSelectedStatusOld(Request $request): Response
    {
        $academicYearData = $this->admissionRepository->findAcademicYear();
        $academicYear = $academicYearData->map(fn ($academicYear) => ['id' => $academicYear->id, 'title' => $academicYear->academic_session])->all();

        $classrooms = $this->classroomRepository->getByAcyIds($academicYearData->pluck('id')->toArray());

        $examStatus = [];

        foreach (AdmissionExamStatus::cases() as $status) {
            array_push($examStatus, ['id' => $status->value, 'title' => $status->value]);
        }


        if ($request->isMethod('post')) {
            // dd($request->all());
            $academicYearId = $request->input('academic_year_id') ?? null;
            $classroomId = $request->input('classroom_id') ?? null;
            $search = $request->input('search') ?? '';
            $fromDate = !empty($request->input('from_date')) ? Carbon::parse($request->input('from_date'))->format('Y-m-d') : '';
            $toDate = !empty($request->input('to_date')) ? Carbon::parse($request->input('to_date'))->format('Y-m-d') : '';
            $examStatus = $request->input('exam_status') ?? null;

            $enquiries = $this->admissionRepository->getActiveAllEnquiries($academicYearId, $classroomId, $fromDate, $toDate, $examStatus, $search);
            // dd($enquiries );
        } else {
            $enquiries = $this->admissionRepository->getActiveAllEnquiries();
        }



        // dd($examStatus);

        return Inertia::render('AdmissionExam/ChangeSelectedStatus', [
            'examStatus' => $examStatus,
            'academicYear' => $academicYear,
            'classrooms' => $classrooms,
            'enquiries' => $enquiries,
        ]);
    }

    /**
     * Admission Exam Summary.
     */
    public function admissionExamSummary(Request $request): Response
    {
        $boarding = [];

        foreach (ScholarBoardingType::cases() as $boardingStatus) {
            array_push($boarding, ['id' => $boardingStatus->value, 'title' => $boardingStatus->value]);
        }

        $admissionExamSummary = [];
        $registrations = [];

        $fromDate = "";
        $toDate = "";
        $examStatus = "";
        $boardingType = "";

        $admissionExamSummaryData = $this->admissionRepository->getAdmissionExamSummaryData();

        if (count($admissionExamSummaryData) > 0) {
            foreach ($admissionExamSummaryData as $data) {
                $admissionExamStatus =  $data?->exam_status ?? "Pending";

                if (!isset($admissionExamSummary[$admissionExamStatus])) {
                    $admissionExamSummary[$admissionExamStatus] = [
                        'exam_status' => $admissionExamStatus,
                        'student_count' => 0
                    ];
                }

                $admissionExamSummary[$admissionExamStatus]['student_count'] = ($admissionExamSummary[$admissionExamStatus]['student_count'] ?? 0) + 1;
            }
        }

        if ($request->isMethod('POST')) {
            $fromDate = !empty($request->from_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->from_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $toDate = !empty($request->to_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->to_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $boardingType = $request->boarding_type ?? "";
            $examStatus = $request->exam_status ?? "";
        }

        if (!empty($examStatus)) {
            $registrations = $this->admissionRepository->getAdmissionExamStatusWiseEnquiries($examStatus, $fromDate, $toDate, $boardingType);

            if (count($registrations) > 0) {
                $registrations = $registrations->map(function ($registration) {
                    $registration['registration_date'] = !empty($registration?->date_of_registration) ? Carbon::parse($registration?->date_of_registration)->format('d-M-Y') : "";

                    return $registration;
                });
            }
        }

        return Inertia::render('AdmissionExam/AdmissionExamSummary', [
            'boarding' => $boarding,
            'admissionExamSummary' => $admissionExamSummary,
            'registrations' => $registrations,
        ]);
    }

    /**
     * Display the schools.
     */
    public function admissionExamSummaryOld(Request $request): Response
    {

        if ($request->isMethod('post')) {
            $examStatus = $request->input('exam_status') ?? '';
            $searchAdmission = $request->input('search_admission') ?? '';
            $startDate = !empty($request->input('start_date')) ? Carbon::parse($request->input('start_date'))->format('Y-m-d') : '';
            $endDate = !empty($request->input('end_date')) ? Carbon::parse($request->input('end_date'))->format('Y-m-d') : '';
            $boardingType = $request->input('boarding_type') ?? '';

            $admissionExamEnquiryStatus = $this->admissionRepository->getDataFromEnquiryStatus($examStatus, $searchAdmission, $startDate, $endDate, $boardingType);
        } else {
            $admissionExamEnquiryStatus = $this->admissionRepository->getDataFromEnquiryStatusAll();
        }

        $enquiryGroupedData = [];

        foreach ($this->admissionRepository->getDataFromEnquiryStatusAll()->groupBy('exam_status') as $status => $admissionExamEnquiries) {
            $enquiryGroupedData[$status] = [
                'exam_status' => $admissionExamEnquiries->first()->exam_status,
                'total_count' => count($admissionExamEnquiries),
            ];
        }

        $boarding = [];

        foreach (ScholarBoardingType::cases() as $boardingStatus) {
            array_push($boarding, ['id' => $boardingStatus->value, 'title' => $boardingStatus->value]);
        }

        return Inertia::render('AdmissionExam/AdmissionExamSummary', [
            'boarding' => $boarding,
            'admissionExamEnquiryStatus' => $admissionExamEnquiryStatus,
            'enquiryGroupedData' => $enquiryGroupedData,
        ]);
    }

    /**
     * Display the schools.
     */
    public function sendStudentMessage(Request $request): Response
    {

        if ($request->isMethod('post')) {
            $typeToSearch           = $request->input('type_to_search') ?? '';
            $academicID             = $request->input('academic_year_id') ?? "";
            $classroomID            = $request->input('classroom_id') ?? "";
            $registrationStatusID   = $request->input('registration_status_id') ?? "";
            $examStatusID           = $request->input('exam_status') ?? "";

            $sendMessageData = $this->admissionRepository->getDataFromEnquiryBased($typeToSearch, $academicID, $classroomID, $registrationStatusID, $examStatusID);
            // dd($sendMessageData);
        } else {
            $sendMessageData = $this->admissionRepository->getDataFromEnquiryBasedOnExamStatusAll();
        }



        $academicYearData = $this->admissionRepository->findAcademicYear();
        $academicYear = $academicYearData->map(fn ($academicYear) => ['id' => $academicYear->id, 'title' => $academicYear->academic_session])->all();


        $classRoomName = $this->admissionRepository->findClassName();

        $enquiryStatus = [];

        foreach (EnquiryStatus::cases() as $status) {
            array_push($enquiryStatus, ['id' => $status->value, 'title' => $status->value]);
        };

        $examStatus = [];

        foreach (AdmissionExamStatus::cases() as $status) {
            array_push($examStatus, ['id' => $status->value, 'title' => $status->value]);
        }

        return Inertia::render('AdmissionExam/SendStudentMessage', [
            'academicYear'      => $academicYear,
            'classRoomName'     => $classRoomName,
            'statusPrimary'     => $enquiryStatus,
            'enquiryStatus'     => $examStatus,
            'sendMessageData'   => $sendMessageData,
        ]);
    }

    /**
     * registration exam marks.
     */
    public function registrationMarksEntry(Request $request): Response
    {
        $academicYears = getAcademicYearsAll();
        $classNames = [];
        $enquiries = [];
        $exams = [];
        $studentRegistrationMarks = [];

        $academicYearId = getAcademicYearId();
        $classNameId = null;
        $enquiryId = null;
        $examId = null;

        if ($request->isMethod('POST')) {
            $academicYearId = $request?->academic_year_id ?? null;
            $classNameId = $request?->class_name_id ?? null;
            $enquiryId = $request?->enquiry_id ?? null;
            $examId = $request?->exam_id ?? null;
        }

        if (!empty($academicYearId)) {
            $classNames = $this->classroomRepository->getActiveClassNameAllByAcademicYearId($academicYearId);

            if (!empty($classNameId)) {
                $enquiries = $this->admissionRepository->getEnquiriesForRegistrationMark($academicYearId, $classNameId);

                if (count($enquiries) > 0) {
                    $enquiries = $enquiries->map(function ($enquiry) {
                        return [
                            'id' => $enquiry?->id,
                            'title' => $enquiry?->first_name . " " . $enquiry?->middle_name . " " . $enquiry?->last_name . ", " . $enquiry?->registration_no,
                        ];
                    });
                }

                $exams = $this->examRepository->getRegistrationExamsByClassNameId($classNameId);

                if (!empty($enquiryId) && !empty($examId)) {
                    $studentRegistrationMarks = $this->admissionRepository->getStudentRegistrationMarks($classNameId, $enquiryId, $examId, $academicYearId);

                    if (count($studentRegistrationMarks) > 0) {
                        $studentRegistrationMarks = $studentRegistrationMarks->filter(function ($studentMark) {
                            return $studentMark?->full_mark != null && $studentMark?->pass_mark != null;
                        })->toArray();
                    }
                }
            }
        }

        return Inertia::render('AdmissionExam/RegistrationMarksEntry', [
            'academicYears' => $academicYears,
            'classNames' => $classNames,
            'enquiries' => $enquiries,
            'exams' => $exams,
            'academicYearId' => $academicYearId,
            'studentRegistrationMarks' => $studentRegistrationMarks,
        ]);
    }

    /**
     * save registration exam marks
     */
    public function registrationMarksEntrySave(RegistrationExamMarkRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $attributesToCheck = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => $input['academic_year_id'],
                'class_name_id' => $input['class_name_id'],
                'enquiry_id' => $input['enquiry_id'],
                'exam_id' => $input['exam_id'],
            ];

            foreach ($input['marks'] as $studentMark) {
                $attributesToCheck['subject_id'] = $studentMark['subject_id'];

                $valuesToUpdate = [
                    'mark' => isset($studentMark['mark']) ? $studentMark['mark'] : null,
                    'status' => Status::ACTIVE,
                ];

                $this->examRepository->updateOrCreateRegistrationExamMark($attributesToCheck, $valuesToUpdate);
            }

            DB::commit();

            return redirect()->back()->with('message', 'Marks saved successfully!');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }


    /**
     * registration exam report
     */
    public function registrationExamReport(Request $request): Response
    {
        $registrationExamReport = [];
        $academicYears = getAcademicYearsAll();
        $classNames = [];
        $statusArray = [];
        $academicYearId = getAcademicYearId();
        $classNameId = null;
        $fromDate = "";
        $toDate = "";
        $registrationStatus = "";

        foreach (RegistrationStatus::cases() as $case) {
            if (!in_array($case->value, [RegistrationStatus::REGISTRATION_TAKEN->value])) {
                array_push($statusArray, ['title' => $case->value, 'value' => $case->value]);
            }
        }

        if ($request->isMethod('POST')) {
            $fromDate = !empty($request->from_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->from_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $toDate = !empty($request->to_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->to_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $registrationStatus = $request->registration_status ?? "";
            $academicYearId = $request->academic_year_id ?? null;
            $classNameId = $request->class_name_id ?? null;
        }

        if (!empty($academicYearId)) {
            $classNames = $this->classroomRepository->getActiveClassNameAllByAcademicYearId($academicYearId);

            if (!empty($classNameId)) {
                $registrationExamReport = $this->getRegistrationExamReportData($academicYearId, $classNameId, $fromDate, $toDate, $registrationStatus);
            }
        }

        return Inertia::render('AdmissionExam/RegistrationExamReport', [
            'statusArray' => $statusArray,
            'academicYears' => $academicYears,
            'classNames' => $classNames,
            'academicYearId' => $academicYearId,
            'registrationExamReport' => $registrationExamReport
        ]);
    }

    /*
    * helper method to calculate mark percentage
    */
    protected function calculatePercentage($marksObtained, $totalMarks)
    {
        $marksObtained = is_string($marksObtained) ? intval($marksObtained) : $marksObtained;
        $totalMarks = is_string($totalMarks) ? intval($totalMarks) : $totalMarks;

        if ($totalMarks == 0) {
            return 0; // Return 0 if total marks is 0
        }

        // Calculate percentage
        $percentage = ($marksObtained / $totalMarks) * 100;

        // Round the percentage to two decimal places
        return round($percentage, 2);
    }


    /*
    * helper method to get registration exam report data
    */
    protected function getRegistrationExamReportData(
        int $academicYearId,
        int $classNameId,
        string $fromDate = "",
        string $toDate = "",
        string $registrationStatus = ""
    ) {
        $registrationExamReport = [];

        $registrations = $this->admissionRepository->getRegistrationExamReport($academicYearId, $classNameId, $fromDate, $toDate, $registrationStatus);

        if (count($registrations) > 0) {
            foreach ($registrations as $registration) {
                if (count($registration?->admissionExamMarks) > 0) {
                    $registrationId = $registration?->id;

                    $studentName = $registration?->first_name . " " . $registration?->middle_name . " " . $registration?->last_name;
                    $fatherName = $registration?->father_first_name . " " . $registration?->father_middle_name . " " . $registration?->father_last_name;
                    $testDate = !empty($registration?->test_date) ? Carbon::parse($registration->test_date)->format('d-M-Y') : "";

                    $markData = [];
                    $totalFullMark = 0;
                    $totalObtainedMark = 0;

                    foreach ($registration?->admissionExamMarks as $examMark) {
                        $examId = $examMark?->exam_id;
                        $subject = $examMark?->subject;
                        $classroomSubject = $subject?->classroomSubjects?->first();
                        $examRoaster = $classroomSubject?->examRoasters?->where('exam_id', $examId)?->first();

                        $totalFullMark += (float) $examRoaster?->full_mark ?? 0;
                        $totalObtainedMark += (float) $examMark?->mark ?? 0;

                        $markData[$subject?->id] = [
                            'subject_title' => $subject?->title,
                            'full_mark' => $examRoaster?->full_mark,
                            'pass_mark' => $examRoaster?->pass_mark,
                            'obtained_mark' => (float) $examMark?->mark,
                            'result' => $examMark?->mark >= $examRoaster?->pass_mark ? "Pass" : "Fail",
                        ];
                    }

                    $percentage = $this->calculatePercentage($totalObtainedMark, $totalFullMark);

                    if ($percentage != null) {
                        $percentage = $percentage . "%";
                    }

                    $tempArr = [
                        'registration_status' => $registration?->registration_status,
                        'registration_no' => $registration?->registration_no,
                        'student_name' => $studentName,
                        'test_date' => $testDate,
                        'parent_name' => $fatherName,
                        'contact_no' => $registration?->father_mobile,
                        'percentage' => $percentage,
                        'marks' => $markData,
                    ];

                    $registrationExamReport[$registrationId] = $tempArr;
                }
            }
        }

        return $registrationExamReport;
    }
}
