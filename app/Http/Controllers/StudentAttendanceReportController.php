<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Services\StudentService;
use Illuminate\Support\Collection;
use App\Repositories\IStudentRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IClassroomSubjectRepository;
use App\Repositories\IClassroomAttendanceRepository;

class StudentAttendanceReportController extends Controller
{
    public function __construct(
        private IClassroomRepository $classroomRepository,
        private IClassroomSubjectRepository $classroomSubjectRepository,
        private IClassroomAttendanceRepository $classroomAttendanceRepository,
        private IStudentRepository $studentRepository,
        private StudentService  $studentService
    ) {}
    
    private const STATUS_COLORS = [
        'present' => '#28a745',
        'absent' => '#dc3545',
        'holiday' => '#ffc107',
        'leave' => '#17a2b8'
    ];

    /**
     * Show the student attendance report List.
     *
     * @return Response
     */

    public function attendanceList(Request $request)
    {
        $userRoles = getUserRoleArray() ?? [];
        $studentId = getStudentId();
        $students = $this->studentService->getParentStudents($userRoles);
        $monthlyReport = [];

        if ($request->isMethod('POST')) {
            $studentId = $request->student_id;
        }

        if (!empty($studentId)) {
            $selectedStudent = $this->studentService->getEnhancedStudentById($studentId);
            
            if (!empty($selectedStudent?->promotedClassroom?->id)) {
                $attendancesData = $this->classroomAttendanceRepository->getAttendanceByClassroomIdAndDate($selectedStudent->promotedClassroom->id);
                $monthlyReport = $this->generateStudentReport($attendancesData, $studentId);
            }
        }

        return Inertia::render('Student/AttendanceList', [
            'students' => $students,
            'studentId' => $studentId,
            'monthlyReport' => $monthlyReport,
        ]);
    }

    /**
     * Show the student attendance report.
     *
     * @return Response
     */
    public function attendanceCalendar(Request $request)
    {
        $userRoles = getUserRoleArray() ?? [];
        $students = [];
        $studentId = getStudentId();
        $calendarData = [];

        if (in_array('Parent', $userRoles)) {
            $students = $this->studentRepository->getStudentsByParentUserId(auth()->user()->id);

            if (count($students) > 0) {
                $students = $students->map(function ($student) {
                    if ($student?->latestClassroomStudent?->classroom != null) {
                        if (!empty($student['classroom'])) {
                            unset($student['classroom']);
                        }

                        if ($student?->promotedClassroom != null) {
                            $student['classroom_id'] = $student?->promotedClassroom?->id;
                            $student['classTitle'] = $student?->promotedClassroom?->title;
                        }

                        $student['classroom_id'] = $student?->latestClassroomStudent?->id;
                        $student['classroom'] = $student?->latestClassroomStudent?->classroom;
                    }

                    $classroomId = $student?->classroom_id;

                    $student->loadMissing([
                        'classroomRoll' => function ($query) use ($classroomId) {
                            $query->where('classroom_id', $classroomId)
                                ->select(
                                    'id',
                                    'student_id',
                                    'roll_no',
                                );
                        },
                    ]);

                    $student['title'] = ($student->first_name ?? "") . " " . ($student->middle_name ?? "") . " " . ($student->last_name ?? "");

                    return $student;
                });
            }
        }

        if (count($students) > 0 && empty($studentId)) {
            $firstStudent = $students->first();

            if ($firstStudent?->promotedClassroom != null) {
                $attendancesData = $this->classroomAttendanceRepository->getAttendanceByClassroomIdAndDate($firstStudent?->promotedClassroom->id);
                $calendarData = $this->getConsolidatedCalendarData($attendancesData, $studentId);
            }
        }

        if ($request->isMethod('POST')) {
            $studentId = $request->student_id;
        }

        if (!empty($studentId)) {
            $selectedStudent = $this->studentRepository->getStudentById($studentId);
            $student = $selectedStudent;
            if ($selectedStudent?->promotedClassroom != null) {
                if (!empty($student['classroom'])) {
                    unset($student['classroom']);
                }

                $student['classroom_id'] = $student?->promotedClassroom?->id;
                $student['classroom'] = $student?->promotedClassroom;
            }

            if (!empty($student?->promotedClassroom?->id)) {
                $attendancesData = $this->classroomAttendanceRepository->getAttendanceByClassroomIdAndDate($student->promotedClassroom->id);
                $calendarData = $this->getConsolidatedCalendarData($attendancesData, $studentId);
            }
        };
       
        $presents = $calendarData['presents'] ?? [];
        // $presents = $this->getPresentsData();
        // absents
        $absents = $calendarData['absents'] ?? [];
        // holidays
        $holidays = $calendarData['holidays'] ?? [];

        return Inertia::render('Student/Calendar', [
            'presents' => $presents,
            'absents' => $absents,
            'holidays' => $holidays
        ]);
    }

    private function getPresentsData()
    {
        return [
            [
                'title' => 'Present',
                'start' => '2024-12-01',
                'end' => '2024-12-02',
                'color' => '#28a745',
            ],
            [
                'title' => 'Present',
                'start' => '2024-12-03',
                'end' => '2024-12-04',
                'color' => '#28a745',
            ],
            [
                'title' => 'Present',
                'start' => '2024-12-05',
                'end' => '2024-12-06',
                'color' => '#28a745',
            ],
            [
                'title' => 'Present',
                'start' => '2024-12-07',
                'end' => '2024-12-08',
                'color' => '#28a745',
            ],
            [
                'title' => 'Present',
                'start' => '2024-12-09',
                'end' => '2024-12-10',
                'color' => '#28a745',
            ],
            [
                'title' => 'Present',
                'start' => '2024-12-11',
                'end' => '2024-12-12',
                'color' => '#28a745',
            ],
            [
                'title' => 'Present',
                'start' => '2024-12-13',
                'end' => '2024-12-14',
                'color' => '#28a745',
            ],
            [
                'title' => 'Present',
                'start' => '2024-12-15',
                'end' => '2024-12-16',
                'color' => '#28a745',
            ],
        ];
        // Get the presents data.
    }

    /**
     * Generate monthly attendance report for a specific student
     *
     * @param Collection $attendances
     * @param int $studentId
     * @return array
     */
    public function generateStudentReport(Collection $attendances, int $studentId = null): array
    {
        $studentReport = [];

        // Group attendances by month with a proper key format
        $attendancesByMonth = $attendances->groupBy(function ($attendance) {
            $date = Carbon::parse($attendance->attendance_date_at);
            return $date->format('M') . '_' . $date->format('Y');
        });

        foreach ($attendancesByMonth as $yearMonth => $monthAttendances) {
            // Split the month and year from the key
            [$month, $year] = explode('_', $yearMonth);
            
            $studentMonthlyStats = $this->calculateStudentMonthlyStats(
                $monthAttendances,
                $studentId
            );

            $studentReport[$month] = array_merge(
                ['year' => $year],
                $studentMonthlyStats
            );
        }

        // Add summary across all months
        $studentReport['summary'] = $this->calculateOverallSummary($studentReport);

        // Sort months chronologically
        $months = collect(array_filter(array_keys($studentReport), function($key) {
            return $key !== 'summary';
        }))->sort(function($a, $b) {
            $months = ['Jan' => 1, 'Feb' => 2, 'Mar' => 3, 'Apr' => 4, 
                      'May' => 5, 'Jun' => 6, 'Jul' => 7, 'Aug' => 8, 
                      'Sep' => 9, 'Oct' => 10, 'Nov' => 11, 'Dec' => 12];
            return $months[$a] <=> $months[$b];
        });

        // Rebuild the array in sorted order
        $sortedReport = ['summary' => $studentReport['summary']];
        foreach ($months as $month) {
            $sortedReport[$month] = $studentReport[$month];
        }

        return $sortedReport;
    }

    /**
     * Calculate monthly statistics for a specific student
     *
     * @param Collection $monthAttendances
     * @param int $studentId
     * @return array
     */
    private function calculateStudentMonthlyStats(Collection $monthAttendances, int $studentId = null): array
    {
        $totalDays = 0;
        $present = 0;
        $absent = 0;
        $leave = 0;
        $holidays = 0;

        foreach ($monthAttendances as $attendance) {
            if ($attendance->is_holiday) {
                $holidays++;
                continue;
            }

            $students = json_decode($attendance->students, true);
            $studentRecord = collect($students)->firstWhere('student_id', $studentId);

            if ($studentRecord) {
                $totalDays++;
                
                if ($studentRecord['is_leave']) {
                    $leave++;
                } elseif ($studentRecord['attendance_status'] === 'present') {
                    $present++;
                } elseif ($studentRecord['attendance_status'] === 'absent') {
                    $absent++;
                }
            }
        }

        return [
            'total_days' => $totalDays,
            'present_days' => $present,
            'absent_days' => $absent,
            'leave_days' => $leave,
            'holidays' => $holidays,
            'attendance_percentage' => $totalDays > 0 
                ? round(($present / $totalDays) * 100, 2)
                : 0,
            'dates' => $this->getDetailedDates($monthAttendances, $studentId)
        ];
    }

    /**
     * Get detailed attendance dates for a student
     *
     * @param Collection $monthAttendances
     * @param int $studentId
     * @return array
     */
    private function getDetailedDates(Collection $monthAttendances, int $studentId = null): array
    {
        $dates = [];

        foreach ($monthAttendances as $attendance) {
            $students = json_decode($attendance->students, true);
            $studentRecord = collect($students)->firstWhere('student_id', $studentId);

            if ($studentRecord) {
                $dateKey = Carbon::parse($attendance->attendance_date_at)->format('d');
                $dates[$dateKey] = [
                    'status' => $studentRecord['attendance_status'],
                    'is_leave' => $studentRecord['is_leave'],
                    'is_holiday' => $attendance->is_holiday,
                    'holiday_title' => $attendance->holiday_title,
                    'notes' => $attendance->notes,
                    'attendance_time_at' => $attendance->attendance_time_at
                ];
            }
        }

        ksort($dates); // Sort dates numerically
        return $dates;
    }

    /**
     * Calculate overall summary across all months
     *
     * @param array $studentReport
     * @return array
     */
    private function calculateOverallSummary(array $studentReport): array
    {
        $totalDays = 0;
        $totalPresent = 0;
        $totalAbsent = 0;
        $totalLeave = 0;
        $totalHolidays = 0;

        foreach ($studentReport as $month => $stats) {
            if ($month === 'summary') continue;
            
            $totalDays += $stats['total_days'];
            $totalPresent += $stats['present_days'];
            $totalAbsent += $stats['absent_days'];
            $totalLeave += $stats['leave_days'];
            $totalHolidays += $stats['holidays'];
        }

        return [
            'total_days' => $totalDays,
            'total_present_days' => $totalPresent,
            'total_absent_days' => $totalAbsent,
            'total_leave_days' => $totalLeave,
            'total_holidays' => $totalHolidays,
            'overall_attendance_percentage' => $totalDays > 0 
                ? round(($totalPresent / $totalDays) * 100, 2)
                : 0,
            'months_tracked' => count($studentReport) - 1
        ];
    }

    /**
     * Attendance report in calendar view
     */

     /**
     * Generate calendar events from attendance data
     *
     * @param Collection $attendances
     * @param int $studentId
     * @return array
     */

    public function generateCalendarEvents(Collection $attendances, int $studentId): array
    {
        $calendarData = [
            'presents' => [],
            'absents' => [],
            'holidays' => [],
            'leaves' => []
        ];

        foreach ($attendances as $attendance) {
            $date = Carbon::parse($attendance->attendance_date_at)->format('Y-m-d');
            
            if ($attendance->is_holiday) {
                $calendarData['holidays'][] = $this->formatEvent(
                    'Holiday',
                    $date,
                    $date,
                    self::STATUS_COLORS['holiday'],
                );
                continue;
            }

            $students = json_decode($attendance->students, true);
            $studentRecord = collect($students)->firstWhere('student_id', $studentId);

            if ($studentRecord) {
                if ($studentRecord['is_leave']) {
                    $calendarData['leaves'][] = $this->formatEvent(
                        'Leave',
                        $date,
                        $date,
                        self::STATUS_COLORS['leave']
                    );
                } elseif ($studentRecord['attendance_status'] === 'present') {
                    $calendarData['presents'][] = $this->formatEvent(
                        'Present',
                        $date,
                        $date,
                        self::STATUS_COLORS['present']
                    );
                } elseif ($studentRecord['attendance_status'] === 'absent') {
                    $calendarData['absents'][] = $this->formatEvent(
                        'Absent',
                        $date,
                        $date,
                        self::STATUS_COLORS['absent']
                    );
                }
            }
        }

        return $calendarData;
    }

    /**
     * Format a calendar event
     *
     * @param string $title
     * @param string $start
     * @param string $end
     * @param string $color
     * @param string|null $description
     * @param string|null $time
     * @return array
     */
    private function formatEvent(
        string $title,
        string $start,
        string $end,
        string $color,
        ?string $description = null,
        ?string $time = null
    ): array {
        return [
            'title' => $title,
            'start' => $start,
            'end' => $end,
            'color' => $color,
        ];
    }

    /**
     * Get consolidated calendar data
     *
     * @param Collection $attendances
     * @param int $studentId
     * @return array
     */
    public function getConsolidatedCalendarData(Collection $attendances, int $studentId): array
    {
        $eventsData = $this->generateCalendarEvents($attendances, $studentId);
        
        return [
            // 'events' => array_merge(
            //     $eventsData['presents'],
            //     $eventsData['absents'],
            //     $eventsData['holidays'],
            //     $eventsData['leaves']
            // ),
            'presents' => $eventsData['presents'],
            'absents' => $eventsData['absents'],
            'holidays' => $eventsData['holidays'],
            'leaves' => $eventsData['leaves'],
            'statistics' => [
                'total_present' => count($eventsData['presents']),
                'total_absent' => count($eventsData['absents']),
                'total_holidays' => count($eventsData['holidays']),
                'total_leaves' => count($eventsData['leaves'])
            ]
        ];
    }
}
