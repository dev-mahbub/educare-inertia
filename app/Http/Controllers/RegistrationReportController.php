<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Enums\Month;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Models\Enquiry;
use App\Models\Classroom;
use App\Enums\EnquiryStatus;
use App\Enums\EnquiryType;
use Illuminate\Http\Request;
use App\Http\Requests\SalaryRequest;
use Illuminate\Support\Facades\Auth;
use App\Repositories\StaffRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IStaffRepository;
use App\Repositories\SalaryRepository;
use App\Repositories\ISalaryRepository;
use App\Repositories\TeacherRepository;
use App\Repositories\ITeacherRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\AdmissionRepository;
use App\Repositories\IAdmissionRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class RegistrationReportController extends Controller
{

    public function __construct(
        private ISalaryRepository $salaryRepository,
        private IStaffRepository $staffRepository,
        private ITeacherRepository $teacherRepository,
        private IAdmissionRepository $admissionRepository,
    ) {
        $this->middleware('permission:view admission', ['only' => ['registrationReport', 'registrationDailyCollection', 'formatRegistrationDailyCollectionReport', 
            'registrationMonthlyCollection', 'dailyAdmissionReport']]);
        $this->middleware('permission:add admission', ['only' => ['dueRegistrationAmount']]);
        $this->middleware('permission:delete admission', ['only' => ['deletedRegistration']]);
    }

    /**
     * Display the schools.
     */
    public function registrationReport(Request $request): Response
    {
        $academicYears = getAcademicYearsAll();
        $classWiseReports = [
            'reports' => [],
            'total_registration' => 0,
            'total_admission' => 0,
            'total_fee' => 0,
        ];
        $dayWiseReports = [];
        $months = [];

        foreach (Month::cases() as $month_mood) {
            array_push($months, ['id' => $month_mood->value, 'title' => $month_mood->value]);
        }

        if ($request->isMethod('POST')) {
            $academicYearId = $request->academic_year_id ?? null;

            if (!empty($academicYearId)) {
                $registrations = $this->admissionRepository->getRegistrationReportDataByAcademicYearId($academicYearId);

                if (count($registrations) > 0) {
                    $classWiseReports = $this->formatClassWiseRegistrationReportData($registrations);
                    $dayWiseReports = $this->formatDayWiseRegistrationReportData($registrations);
                }
            }
        }

        return Inertia::render('RegistrationReport/RegistrationReport', [
            'academicYears'  => $academicYears,
            'months' => $months,
            'classWiseReports' => $classWiseReports,
            'dayWiseReports' => $dayWiseReports,
        ]);
    }

    /*
    * helper method to format class wise registration report data
    */
    protected function formatClassWiseRegistrationReportData(object $registrations)
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
    protected function formatDayWiseRegistrationReportData(object $registrations)
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


    /**
     * Display registration daily collection report.
     */
    public function registrationDailyCollection(Request $request): Response
    {
        $registrationReport = [];

        if ($request->isMethod('POST')) {
            $academicYearId = $request->input('academic_year_id') ?? null;
            $startDate = !empty($request->input('start_date')) ? Carbon::parse($request->input('start_date'))->format('Y-m-d') : "";
            $endDate = !empty($request->input('end_date')) ? Carbon::parse($request->input('end_date'))->format('Y-m-d') : "";

            $registrationReport = $this->admissionRepository->getRegistrationDailyColectionReportData($academicYearId, $startDate, $endDate);
        } else {
            $registrationReport = $this->admissionRepository->getRegistrationDailyColectionReportData();
        }

        if (count($registrationReport) > 0) {
            $registrationReport = $this->formatRegistrationDailyCollectionReport($registrationReport);
        }

        $academicYears = getAcademicYearsAll();

        return Inertia::render('RegistrationReport/RegistrationDailyCollection', [
            'academicYears' => $academicYears,
            'registrationReport' => $registrationReport,
        ]);
    }


    /*
    *  helper method to format registration daily collection report data
    */
    protected function formatRegistrationDailyCollectionReport(object $registrations)
    {
        $registrationReport = $registrations->map(function ($registration) {
            $studentName = ($registration?->first_name ?? "") . " " . ($registration?->middle_name ?? "") . " " . ($registration?->last_name ?? "");

            return [
                'id' => $registration?->id,
                'registration_no' => $registration?->registration_no,
                'student_name' => $studentName,
                'class' => $registration?->class_title,
                'amount' => (float) $registration?->academic_fee ?? 0,
                'date' => !empty($registration?->date_of_registration) ? Carbon::parse($registration?->date_of_registration)->format('d M, Y') : "",
                'payment_mode' => $registration?->payment_mode,
                'registration_mode' => $registration?->registration_mode,
                'receipt_no' => $registration?->receipt_no,
            ];
        })->toArray();

        return $registrationReport;
    }

    /**
     * Display registration monthly collection report.
     */
    public function registrationMonthlyCollection(Request $request): Response
    {
        $academicYears = getAcademicYearsAll();

        $monthWiseRegistrationReport = [];

        if ($request->isMethod('POST')) {
            $academicYearId = $request->input('academic_year_id') ?? null;

            if (!empty($academicYearId)) {
                $monthWiseRegistrations = $this->admissionRepository->getMonthWiseRegistrationReportByAcademicYearId($academicYearId);

                if (count($monthWiseRegistrations) > 0) {
                    $monthWiseRegistrationReport = $this->formatMonthWiseRegistrationReportData($monthWiseRegistrations);
                }
            }
        }

        return Inertia::render('RegistrationReport/RegistrationMonthlyCollection', [
            'academicYears' => $academicYears,
            'monthWiseRegistrationReport' => $monthWiseRegistrationReport
        ]);
    }

    /*
    *  helper method to format month wise registration report data
    */
    protected function formatMonthWiseRegistrationReportData(object $registrations)
    {
        $monthWiseRegistrationReport = [];

        foreach ($registrations as $registration) {
            $month = !empty($registration?->date_of_registration) ? Carbon::parse($registration?->date_of_registration)->format('F') : "";
            $studentName = ($registration?->first_name ?? "") . " " . ($registration?->middle_name ?? "") . " " . ($registration?->last_name ?? "");

            $monthWiseRegistrationReport[$month][$registration?->id] =  [
                'id' => $registration?->id,
                'registration_no' => $registration?->registration_no,
                'student_name' => $studentName,
                'class_title' => $registration?->class_title,
                'fee_amount' => (float) $registration?->academic_fee ?? 0,
                'payment_date' => !empty($registration?->payment_date) ? Carbon::parse($registration?->payment_date)->format('d M, Y') : "",
                'payment_mode' => $registration?->payment_mode,
                'registration_mode' => $registration?->registration_mode,
                'receipt_no' => $registration?->receipt_no,
            ];
        }

        return $monthWiseRegistrationReport;
    }

    /**
     * Display deleted registrations.
     */
    public function deletedRegistration(Request $request): Response
    {
        $registrations = [];

        if ($request->isMethod('post')) {
            $academicYearId = $request->input('academic_year_id') ?? null;

            if (!empty($academicYearId)) {
                $registrations = $this->admissionRepository->deletedRegistrationsByAcademicYearId($academicYearId);

                if (count($registrations) > 0) {
                    $registrations = $registrations->map(function ($registration) {
                        $dateOfRegistration = !empty($registration->date_of_registration) ? Carbon::parse($registration->date_of_registration)->format('d-M-Y') : "";

                        $registration->date_of_registration = $dateOfRegistration;

                        return $registration;
                    });
                }
            }
        }

        $academicYears = getAcademicYearsAll();

        return Inertia::render('RegistrationReport/DeletedRegistration', [
            'registrations' => $registrations,
            'academicYears' => $academicYears,
        ]);
    }


    /**
     * Display the schools.
     */
    public function dueRegistrationAmount(Request $request): Response
    {
        $salaries = $this->salaryRepository->getActiveAll();
        $staffs = $this->staffRepository->getActiveAll();
        $teachers = $this->teacherRepository->getActiveAll();

        $academicYearData = $this->admissionRepository->findAcademicYear();
        $academicYear = $academicYearData->map(fn ($academicYear) => ['id' => $academicYear->id, 'title' => $academicYear->academic_session])->all();

        // dd($academicYear);

        return Inertia::render('RegistrationReport/DueRegistrationAmount', [
            'salaries'      => $salaries,
            'staffs'        => $staffs,
            'teachers'      => $teachers,
            'academicYear'  => $academicYear
        ]);
    }

    /**
     * Display daily admission report.
     */
    public function dailyAdmissionReport(Request $request): Response
    {
        $dailyAdmissionReport = [];

        if ($request->isMethod('POST')) {
            $studentSearch = $request->input('student_search') ?? "";
            $startDate = $request->input('start_date') ?? "";
            $endDate = $request->input('end_date') ?? "";
            $academicYearId = $request->input('academic_year_id') ?? null;

            $dailyAdmissionReportData = $this->admissionRepository->getDailyAdmissionReport($academicYearId, $startDate, $endDate, $studentSearch);
        } else {
            $dailyAdmissionReportData = $this->admissionRepository->getDailyAdmissionReport();
        }

        $academicYears = getAcademicYearsAll();

        if (count($dailyAdmissionReportData) > 0) {
            $dailyAdmissionReport = $this->formatDailyAdmissionReport($dailyAdmissionReportData);
        }

        return Inertia::render('RegistrationReport/DailyAdmissionReport', [
            'academicYears' => $academicYears,
            'dailyAdmissionReport' => $dailyAdmissionReport,
        ]);
    }

    /*
    *  helper method to format daily admission report data
    */
    protected function formatDailyAdmissionReport(object $registrations)
    {
        $dailyAdmissionReport = $registrations->map(function ($registration) {
            $studentName = ($registration?->first_name ?? "") . " " . ($registration?->middle_name ?? "") . " " . ($registration?->last_name ?? "");
            $fatherName = ($registration?->father_first_name ?? "") . " " . ($registration?->father_middle_name ?? "") . " " . ($registration?->father_last_name ?? "");
            $takenBy = ($registration?->user_first_name ?? "") . " " . ($registration?->user_middle_name ?? "") . " " . ($registration?->user_last_name ?? "");

            return [
                'id' => $registration?->id,
                'student_id' => $registration?->student_id,
                'registration_no' => $registration?->registration_no,
                'student_name' => $studentName,
                'father_name' => $fatherName,
                'class' => $registration?->classroom_title,
                'registration_date' => !empty($registration?->date_of_registration) ? Carbon::parse($registration?->date_of_registration)->format('d M, Y') : "",
                'admission_date' => !empty($registration?->date_of_admission) ? Carbon::parse($registration?->date_of_admission)->format('d M, Y') : "",
                'admission_no' => $registration?->admission_no,
                'taken_by' => $takenBy,
            ];
        })->toArray();

        return $dailyAdmissionReport;
    }

}
