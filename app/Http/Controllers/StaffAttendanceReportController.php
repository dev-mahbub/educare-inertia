<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClassroomAttendanceRequest;
use App\Repositories\ClassroomRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\ClassroomAttendanceRepository;
use App\Repositories\IClassroomAttendanceRepository;
use App\Repositories\IStaffAttendanceRepository;
use App\Repositories\StudentRepository;
use App\Repositories\IStudentRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class StaffAttendanceReportController extends Controller
{

    public function __construct(
        private IClassroomAttendanceRepository $classroomAttendanceRepository,
        private IStudentRepository $studentRepository,
        private IClassroomRepository $classroomRepository,
        private IStaffAttendanceRepository $staffAttendanceRepository,
    ) {
        $this->middleware('permission:view attendance staff', ['only' => ['dayWiseStaffAttendanceReport', 'staffWiseAttendanceReport', 'monthWiseAttendanceReport', 'extraDayReport',
            'outdoorReport', 'staffAbsentReport', 'monthlyWorkDurationReport'
        ]]);
    }

    /**
     * Display the today attendance.
     */
    public function dayWiseStaffAttendanceReport(Request $request): Response
    {
        $classroomAttendances = $this->classroomAttendanceRepository->getActiveAll();
        $students = $this->studentRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('StaffAttendanceReport/DayWiseStaffAttendanceReport', [
            'classroomAttendances' => $classroomAttendances,
            'students' => $students,
            'classrooms' => $classrooms,
        ]);
    }

    /**
     * staffWiseAttendanceReport
     */
    public function staffWiseAttendanceReport(Request $request): Response
    {

        $staffAttendance =  $this->staffAttendanceRepository->getActiveAll()->toArray();

        foreach ($staffAttendance as $record) {
            $staffs = json_decode($record['staffs'], true);
            if ($staffs) {
                $attendanceDate = $record['attendance_date_at'];
                $month = date('Y-m', strtotime($attendanceDate));
                $monthName = date('F', strtotime($month . '-01'));

                if (!isset($attendanceByMonth[$month])) {
                    $attendanceByMonth[$month] = [
                        'staff_id' => '',
                        'month_name' => $monthName,
                        'total_present' => 0,
                        'total_absent' => 0,
                        'total_halfday' => 0,
                        'total_leave' => 0,
                        'total_weekly_off' => 0,
                    ];
                }

                foreach ($staffs as $staff) {
                    $attendanceByMonth[$month]['staff_id'] = $staff['staff_id'];
                    if ($staff['attendance_status'] == 'present') {
                        $attendanceByMonth[$month]['total_present']++;
                    } else if ($staff['attendance_status'] == 'absent') {
                        $attendanceByMonth[$month]['total_absent']++;
                    } else if ($staff['attendance_status'] == 'halfday') {
                        $attendanceByMonth[$month]['total_halfday']++;
                    } else if ($staff['attendance_status'] == 'onleave') {
                        $attendanceByMonth[$month]['total_leave']++;
                    } else if ($staff['attendance_status'] == 'onweek') {
                        $attendanceByMonth[$month]['total_weekly_off']++;
                    }
                    break;
                }
            }
        }
        // dd($attendanceByMonth);

        return Inertia::render('StaffAttendanceReport/StaffWiseAttendanceReport', [
            // 'classroomAttendances' => $classroomAttendances,
            // 'students' => $students,
            // 'classrooms' => $classrooms,
        ]);
    }

    /**
     * Display the absent report.
     */
    public function monthWiseAttendanceReport(Request $request): Response
    {
        $classroomAttendances = $this->classroomAttendanceRepository->getActiveAll();
        $students = $this->studentRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('StaffAttendanceReport/MonthWiseAttendanceReport', [
            'classroomAttendances' => $classroomAttendances,
            'students' => $students,
            'classrooms' => $classrooms,
        ]);
    }

    /**
     * Display the back date report.
     */
    public function extraDayReport(Request $request): Response
    {
        $classroomAttendances = $this->classroomAttendanceRepository->getActiveAll();
        $students = $this->studentRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('StaffAttendanceReport/ExtraDayReport', [
            'classroomAttendances' => $classroomAttendances,
            'students' => $students,
            'classrooms' => $classrooms,
        ]);
    }

    /**
     * Display the class wise daily attendance report.
     */
    public function outdoorReport(Request $request): Response
    {
        $classroomAttendances = $this->classroomAttendanceRepository->getActiveAll();
        $students = $this->studentRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('StaffAttendanceReport/OutdoorReport', [
            'classroomAttendances' => $classroomAttendances,
            'students' => $students,
            'classrooms' => $classrooms,
        ]);
    }

    /**
     * Display the date wise class attendance report.
     */
    public function staffAbsentReport(Request $request): Response
    {
        $classroomAttendances = $this->classroomAttendanceRepository->getActiveAll();
        $students = $this->studentRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('StaffAttendanceReport/StaffAbsentReport', [
            'classroomAttendances' => $classroomAttendances,
            'students' => $students,
            'classrooms' => $classrooms,
        ]);
    }

    /**
     * Display the date wise class attendance report.
     */
    public function monthlyWorkDurationReport(Request $request): Response
    {
        $classroomAttendances = $this->classroomAttendanceRepository->getActiveAll();
        $students = $this->studentRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('StaffAttendanceReport/MonthlyWorkDurationReport', [
            'classroomAttendances' => $classroomAttendances,
            'students' => $students,
            'classrooms' => $classrooms,
        ]);
    }
}
