<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\UserRole;
use App\Enums\MonthFull;
use Illuminate\Http\Request;
use App\Enums\ScholarBoardingType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IStaffRepository;
use App\Repositories\StudentRepository;
use App\Repositories\IStudentRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ClassroomRepository;
use App\Repositories\IAcademicRepository;
use App\Repositories\IClassroomRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Repositories\IWorkingBonusDayRepository;
use App\Http\Requests\ClassroomAttendanceRequest;
use App\Repositories\ClassroomAttendanceRepository;
use App\Repositories\IClassroomAttendanceRepository;

class ClassroomAttendanceReportController extends Controller
{

    public function __construct(
        private IClassroomAttendanceRepository $classroomAttendanceRepository,
        private IStudentRepository $studentRepository,
        private IClassroomRepository $classroomRepository,
        private IAcademicRepository $academicRepository,
        private IWorkingBonusDayRepository $workingBonusDayRepository,
        private IStaffRepository $staffRepository,
    ) {
        $this->middleware('permission:view attendance student', ['only' => ['todayAttendance', 'registerView',
            'absentReport', 'backDateReport', 'classWiseDailyAttendanceReport', 'dateWiseClassAttendanceReport',
            'monthReport', 'sendSMSToPresentStudents', 'studentWiseAttendance'
        ]]);
    }

    /**
     * Display the today attendance.
     */
    public function todayAttendance(Request $request): Response
    {

        $toDay = date('Y-m-d');
        if ($request->isMethod('post')) {
            $toDay = !empty($request->input('select_date')) ? \Carbon\Carbon::parse($request->input('select_date'))->format('Y-m-d') : '';
        }

        $getTodayClassroomAttendanceData = $this->classroomAttendanceRepository->getTodayClassroomAttendance($toDay);
        $getTodayClassroomAttendanceData->load(['classroomData', 'takenUserData', 'classroomAttendanceNote.userData', 'updatedUserData', 'updatedBy.user' => function ($query) {
            $query->select('username', 'id');
        }]);
        $getTodayClassroomAttendance = $getTodayClassroomAttendanceData->toArray();

        $classroomIds = array();
        if (!empty($getTodayClassroomAttendance)) {
            foreach ($getTodayClassroomAttendance as $classroomId) {
                array_push($classroomIds, $classroomId['classroom_id']);
            }
        }

        $classroomsData = $this->classroomRepository->getActiveClassroomForTodayAtt($classroomIds);
        $classrooms = $classroomsData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        return Inertia::render('ClassroomAttendanceReport/TodayAttendance', [
            'getTodayAttendanceClassroom' => $getTodayClassroomAttendance,
            'classrooms' => $classrooms,
        ]);
    }

    /**
     * Display the register view.
     */
    public function registerView(Request $request): Response
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;

        if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId);
        } else {
            $classrooms = $this->classroomRepository->getActiveAll();
        }

        $classroomAttendances = $this->classroomAttendanceRepository->getActiveAll();
        // $students = $this->studentRepository->getActiveAll();
        // $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('ClassroomAttendanceReport/RegisterView', [
            'classroomAttendances' => $classroomAttendances,
            // 'students' => $students,
            'classrooms' => $classrooms,
        ]);
    }

    /**
     * Display the absent report.
     */
    public function absentReport(Request $request): Response
    {
        $toDay = date('Y-m-d');
        $classroomId = '';
        $boarding = '';
        $absentStudents = [];

        if ($request->isMethod('post')) {
            $classroomId =  $request->input('classroom_id') ?? '';
            $boarding =  $request->input('boarding_type') ?? '';
            $toDay = !empty($request->input('select_date')) ? \Carbon\Carbon::parse($request->input('select_date'))->format('Y-m-d') : '';
        }

        // class names
        $classNameData = $this->classroomRepository->getActiveClassNameAll();
        $classNames = $classNameData->map(fn($className) => ['id' => $className->id, 'title' => $className->title])->all();

        // classrooms
        $classroomsData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomsData->map(fn($classroom) => ['id' => $classroom->id, 'class_name_id' => $classroom->class_name_id, 'title' => $classroom->title])->all();

        $boardingType = ScholarBoardingType::cases();
        $boardingTypeArr = array();
        foreach ($boardingType as $boardingT) {
            array_push($boardingTypeArr, ['id' => $boardingT->value, 'title' => $boardingT->value]);
        }

        $classroomAttendanceData = $this->classroomAttendanceRepository->getClassroomAttendance($toDay);

        $allStudents = array();
        if (!empty($classroomAttendanceData)) {
            foreach ($classroomAttendanceData as $classAtt) {
                $stuDecode = json_decode($classAtt['students']);
                foreach ($stuDecode as $std) {
                    if (!empty($std->student_id) && $std->attendance_status == 'absent')
                        array_push($allStudents, $std->student_id);
                }
            }
        }

        if (!empty($allStudents)) {
            $absentStudentData = $this->studentRepository->getByStudentsForAbsent($allStudents, $classroomId, $boarding);
            $absentStudentData->load(['classroomData', 'father']);
            $absentStudents = $absentStudentData->toArray();
        }

        return Inertia::render('ClassroomAttendanceReport/AbsentReport', [
            'absentStudents' => $absentStudents,
            'classNames' => $classNames,
            'classrooms' => $classrooms,
            'boardingTypeArr' => $boardingTypeArr,
        ]);
    }

    /**
     * Display the back date report.
     */
    public function backDateReport(Request $request): Response
    {
        $classroomAttendances = $this->classroomAttendanceRepository->getActiveAll();
        $students = $this->studentRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('ClassroomAttendanceReport/BackDateReport', [
            'classroomAttendances' => $classroomAttendances,
            'students' => $students,
            'classrooms' => $classrooms,
        ]);
    }

    /**
     * Display the class wise daily attendance report.
     */
    public function classWiseDailyAttendanceReport(Request $request): Response
    {
        $toDay = date('Y-m-d');
        $totalStudentsSum = '';
        $presentCountSum = '';
        $absentCountSum = '';
        $classWiseAttendance = [];

        if ($request->isMethod('post')) {
            $toDay = !empty($request->input('select_date')) ? \Carbon\Carbon::parse($request->input('select_date'))->format('Y-m-d') : '';
        }
        $attendanceDaily = $this->classroomAttendanceRepository->getAttendanceByClassWiseDaily($toDay)->toArray();

        if (!empty($attendanceDaily)) {
            foreach ($attendanceDaily as $attendance) {
                foreach ($attendance as $record) {
                    $classroomId = $record['classroom_id'];
                    $classroomName = $record['classroom_data']['title'];

                    // Initialize counters if the class is not encountered yet
                    if (!isset($classWiseAttendance[$classroomId])) {
                        $classWiseAttendance[$classroomId] = [
                            'classroom_title' => $classroomName,
                            'totalStudents' => 0,
                            'presentCount' => 0,
                            'absentCount' => 0,
                            'leaveCount' => 0,
                        ];
                    }

                    // Increment total student count
                    $classWiseAttendance[$classroomId]['totalStudents'] += count(json_decode($record['students'], true));

                    // Iterate through students and update present and absent counts
                    foreach (json_decode($record['students'], true) as $student) {
                        if ($student['attendance_status'] == 'present') {
                            $classWiseAttendance[$classroomId]['presentCount']++;
                        } elseif ($student['attendance_status'] == 'absent') {
                            $classWiseAttendance[$classroomId]['absentCount']++;
                            $classWiseAttendance[$classroomId]['leaveCount']++;
                        }
                    }
                }
            }
        }

        $totalStudentsSum = collect($classWiseAttendance)->sum('totalStudents');
        $presentCountSum = collect($classWiseAttendance)->sum('presentCount');
        $absentCountSum = collect($classWiseAttendance)->sum('absentCount');
        $leaveCountSum = collect($classWiseAttendance)->sum('absentCount');

        return Inertia::render('ClassroomAttendanceReport/ClassWiseDailyAttendanceReport', [
            'classWiseAttendance' => $classWiseAttendance,
            'totalStudentsSum' => $totalStudentsSum,
            'presentCountSum' => $presentCountSum,
            'absentCountSum' => $absentCountSum,
            'leaveCountSum' => $leaveCountSum,
        ]);
    }

    /**
     * Display the date wise class attendance report.
     */
    public function dateWiseClassAttendanceReport(Request $request): Response
    {
        $classroomId = '';
        $startDate = '';
        $endDate = '';
        $attendanceDetails = [];

        if ($request->isMethod('post')) {
            $classroomId = $request->input('classroom_id');
            $startDate = !empty($request->input('start_date')) ? \Carbon\Carbon::parse($request->input('start_date'))->format('Y-m-d') : '';
            $endDate = !empty($request->input('end_date')) ? \Carbon\Carbon::parse($request->input('end_date'))->format('Y-m-d') : '';

            $allStudentData = $this->studentRepository->getActiveDataByClassroomId($classroomId);
            $allStudentData->load(['classroomData', 'classroomRoll']);
            $allStudents = $allStudentData->toArray();
            $dateWiseStudent = $this->classroomAttendanceRepository->getAttendanceByDateWise($startDate,  $endDate)->toArray();
            // Initialize an associative array to store attendance details for each student
            $attendanceDetails = [];
            foreach ($allStudents as $student) {
                // Initialize counters for each student
                $presentCount = 0;
                $absentCount = 0;

                foreach ($dateWiseStudent as $attendance) {
                    $studentsAttendance = json_decode($attendance['students'], true);

                    foreach ($studentsAttendance as $attendanceRecord) {
                        if (!empty($attendanceRecord['student_id']) && $student['id'] == $attendanceRecord['student_id']) {
                            // Match found, update counters based on attendance status
                            if ($attendanceRecord['attendance_status'] == 'present') {
                                $presentCount++;
                            } elseif ($attendanceRecord['attendance_status'] == 'absent') {
                                $absentCount++;
                            }
                        }
                    }
                }

                // Calculate percentage for each student
                $totalAttendance = $presentCount + $absentCount;

                if ($totalAttendance > 0) {
                    $percentagePresent = ($presentCount / $totalAttendance) * 100;
                    $percentageAbsent = ($absentCount / $totalAttendance) * 100;
                } else {
                    $percentagePresent = 0;
                    $percentageAbsent = 0;
                }

                // Get classroom roll and name with error handling
                $classroomRoll = isset($student['classroom_roll']['roll_no']) ? $student['classroom_roll']['roll_no'] : 'N/A';
                $classroomName = isset($student['classroom_data']['title']) ? $student['classroom_data']['title'] : 'N/A';

                // Store attendance details for each student
                $attendanceDetails[] = [
                    'id' => $student['id'],
                    'full_name' => $student['first_name'] . ' ' . $student['middle_name'] . ' ' . $student['last_name'],
                    'classroom_roll' => $classroomRoll,
                    'classroom_name' => $classroomName,
                    'presentCount' => $presentCount,
                    'absentCount' => $absentCount,
                    'percentagePresent' => round($percentagePresent, 2),
                    'percentageAbsent' => $percentageAbsent,
                ];
            }
        }

        // classrooms
        $classroomsData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomsData->map(fn($classroom) => ['id' => $classroom->id, 'class_name_id' => $classroom->class_name_id, 'title' => $classroom->title])->all();

        return Inertia::render('ClassroomAttendanceReport/DateWiseClassAttendanceReport', [
            // 'classroomAttendances' => $classroomAttendances,
            // 'students' => $students,
            'classrooms' => $classrooms,
            'attendanceDetails' => $attendanceDetails,
        ]);
    }

    /**
     * Display the Month report.
     */
    public function monthReport(Request $request): Response
    {
        $allStudentIds = [];
        $studentCounts = [];
        $students = [];
        $classrooms = [];
        $academicSession = [];
        $monthArr = [];
        $classroomId = '';
        $monthNo = '';
        $sessionId = '';

        if ($request->isMethod('post')) {
            $classroomId = $request->input('classroom_id');
            $monthNo = $request->input('select_month');
            $sessionId = $request->input('academic_year_id');
        }

        // classroom
        $classroomsData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomsData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        // Academic session
        $sessionData = $this->academicRepository->getActiveSessionAndId();
        $academicSession = $sessionData->map(fn($session) => ['id' => $session->id, 'title' => $session->academic_session])->all();

        // month list
        $monthArr = array();
        foreach (MonthFull::cases() as $key => $month) {
            array_push($monthArr, ['id' => ++$key, 'title' => $month->value]);
        }

        $classroomAttendances = $this->classroomAttendanceRepository->getAttendanceByMonthWise($classroomId, $monthNo, $sessionId);

        if (!empty($classroomAttendances)) {
            foreach ($classroomAttendances as $classAtt) {
                $attStudents = json_decode($classAtt['students']);
                foreach ($attStudents as $attStu) {
                    if (!empty($attStu)) {
                        $studentId = $attStu->student_id;
                        $attendanceStatus = $attStu->attendance_status;

                        if (!isset($studentCounts[$studentId])) {
                            $studentCounts[$studentId] = [
                                'present' => 0,
                                'absent' => 0,
                            ];
                        }

                        // Increment count based on attendance status
                        if ($attendanceStatus === 'present') {
                            $studentCounts[$studentId]['present']++;
                        } elseif ($attendanceStatus === 'absent') {
                            $studentCounts[$studentId]['absent']++;
                        }

                        $allStudentIds[] = $attStu->student_id;
                    }
                }
            }
        }

        $studentsArray = $this->studentRepository->getStudentForMonthReport($allStudentIds)->toArray();

        if (!empty($studentsArray)) {
            foreach ($studentsArray as $student) {
                $studentId = $student['id'];

                // Initialize the combined array
                $students[$studentId] = [
                    'id' => $studentId,
                    'admission_no' => $student['admission_no'],
                    'first_name' => $student['first_name'],
                    'middle_name' => $student['middle_name'],
                    'last_name' => $student['last_name'],
                    'classroom_roll' => $student['classroom_roll'],
                    'attendance_status' => [
                        'present' => $studentCounts[$studentId]['present'],
                        'absent' => $studentCounts[$studentId]['absent'],
                        'percentage' => 0,
                    ],
                ];

                // Calculate attendance percentage
                $totalAttendance = $students[$studentId]['attendance_status']['present'] + $students[$studentId]['attendance_status']['absent'];
                $attendancePercentage = ($totalAttendance > 0) ? (($students[$studentId]['attendance_status']['present'] / $totalAttendance) * 100) : 0;

                $students[$studentId]['attendance_status']['percentage'] = round($attendancePercentage, 2);
            }
        }

        return Inertia::render('ClassroomAttendanceReport/MonthReport', [
            'students' => $students,
            'classrooms' => $classrooms,
            'academicSession' => $academicSession,
            'monthArr' => $monthArr,
        ]);
    }


    /**
     * Display the send SMS Present Students.
     */
    public function sendSMSToPresentStudents(Request $request): Response
    {
        $classroomAttendances = $this->classroomAttendanceRepository->getActiveAll();
        $students = $this->studentRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('ClassroomAttendanceReport/SendSMSToPresentStudents', [
            'classroomAttendances' => $classroomAttendances,
            'students' => $students,
            'classrooms' => $classrooms,
        ]);
    }

    /**
     * Display the student wise attendance.
     */
    public function studentWiseAttendance(Request $request): Response
    {
        // Function to extract month from a date
        function getMonthFromDate($date)
        {
            return date('Y-m', strtotime($date));
        }

        $studentId = '';
        $classroomId = '';
        $attendanceByMonth = [];

        if ($request->isMethod('post')) {
            $classroomId = $request->input('classroom_id');
            $studentId = $request->input('student_id');

            $attendanceData = $this->classroomAttendanceRepository->getAttendanceByClassroomId($classroomId)->toArray();

            foreach ($attendanceData as $record) {
                $students = json_decode($record['students'], true);

                $studentExists = false;
                foreach ($students as $student) {
                    if (!empty($student['student_id']) && $student['student_id'] == $studentId) {
                        $studentExists = true;
                        break;
                    }
                }

                // If the student exists in this attendance record, process it
                if ($studentExists) {
                    $attendanceDate = $record['attendance_date_at'];
                    $monthId = date('n', strtotime($attendanceDate));
                    $month = date('Y-m', strtotime($attendanceDate));
                    $monthName = date('F', strtotime($month . '-01'));
                    $getWorkingDays = $this->workingBonusDayRepository->getByMonthClassroomStudentId($monthId, $classroomId, $studentId);
                    if (!isset($attendanceByMonth[$month])) {
                        $attendanceByMonth[$month] = [
                            'monthNumber' => $monthId,
                            'monthName' => $monthName,
                            'totalPresent' => 0,
                            'totalAbsent' => 0,
                            'totalAttendance' => 0,
                            'attendancePercentage' => 0,
                        ];
                    }
                    $attendanceByMonth[$month]['totalAttendance']++;
                    $attendanceByMonth[$month]['working_days'] = $getWorkingDays?->working_days ?? 0;

                    foreach ($students as $student) {
                        if (!empty($student['student_id']) && $student['student_id'] == $studentId) {
                            if ($student['attendance_status'] == 'present') {
                                $attendanceByMonth[$month]['totalPresent']++;
                            } else {
                                $attendanceByMonth[$month]['totalAbsent']++;
                            }
                            break;
                        }
                    }
                }
            }
        }

        // classroom
        $classroomsData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomsData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        $studentData = $this->studentRepository->getStudentData();
        $students = $studentData->map(fn($student) => [
            'id' => $student->id,
            'classroom_id' => $student->classroom_id,
            'title' => $student->first_name . ' ' . $student->middle_name . ' ' . $student->last_name,
            'admission_no' => $student->admission_no,
        ])->all();

        return Inertia::render('ClassroomAttendanceReport/StudentWiseAttendance', [
            'classrooms' => $classrooms,
            'students' => $students,
            'attendanceByMonth' => $attendanceByMonth,
        ]);
    }
}
