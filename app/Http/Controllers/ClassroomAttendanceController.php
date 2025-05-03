<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\MonthFull;
use App\Enums\ContextStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IStudentRepository;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\StudentNoteRequest;
use App\Repositories\IAcademicRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IStudentNoteRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Repositories\IWorkingBonusDayRepository;
use App\Http\Requests\ClassroomAttendanceRequest;
use App\Http\Requests\WorkingBonusDayStudentRequest;
use App\Repositories\IClassroomAttendanceRepository;
use App\Http\Requests\WorkingBonusDayClassroomRequest;

class ClassroomAttendanceController extends Controller
{

    public function __construct(
        private IClassroomAttendanceRepository $classroomAttendanceRepository,
        private IStudentRepository $studentRepository,
        private IClassroomRepository $classroomRepository,
        private IWorkingBonusDayRepository $workingBonusDayRepository,
        private IAcademicRepository $academicRepository,
        private IStudentNoteRepository $studentNoteRepository,
    ) {
        $this->middleware('permission:view attendance student', ['only' => ['takeAttendance']]);
        $this->middleware('permission:add attendance student', ['only' => ['takeAttendanceSave', 'saveStudentNote', 'setClassWorking',
            'setClassWorkingSave', 'setSectionWorking', 'setSectionWorkingSave', 'setStudentWorking', 'setStudentWorkingSave' 
        ]]);
    }

    /**
     * Display the schools.
     */
    public function takeAttendance(Request $request): Response
    {
        $classroomId = '';
        $searchValue = '';
        $attendanceDateAt = '';

        if ($request->isMethod('post')) {
            $classroomId = $request->input('classroom_id');
            $searchValue = $request->input('search_value');
            $attendanceDateAt = !empty($request->input('attendance_date_at')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('attendance_date_at'))->timezone(getSchoolTimeZone())->toDateString() : '';
        }

        $classroomAttendances = $this->classroomAttendanceRepository->getAttendanceList($attendanceDateAt, $classroomId)->toArray();

        $students = $this->studentRepository->getStudentForAttendance($classroomId, $searchValue)->map(function ($student) {
            if (count($student->student_notes) > 0) {
                $student['student_notes'] = $student?->student_notes?->map(function ($note) {
                    $note['added_on'] = Carbon::parse($note->created_at)->format('d-M-Y');
                    return $note;
                });
            }

            return $student;
        })->toArray();

        $absentStudents = array();
        $presentStudents = array();

        if (!empty($classroomAttendances)) {
            $attendanceStudents = json_decode($classroomAttendances[0]['students'], true);
            foreach ($attendanceStudents as $student) {
                if (isset($student['attendance_status']) && $student['attendance_status'] === 'present') {
                    $presentStudents[] = $student['student_id'];
                } else if (isset($student['attendance_status']) && $student['attendance_status'] === 'absent') {
                    $absentStudents[] = $student['student_id'];
                }
            }
        }

        $classroomsData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomsData->map(fn ($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

        return Inertia::render('ClassroomAttendance/TakeAttendance', [
            'classrooms' => $classrooms,
            'students' => $students,
            'classroomAttendances' => $classroomAttendances,
            'absentStudents' => $absentStudents,
            'presentStudents' => $presentStudents,
        ]);
    }

    /**
     * takeAttendanceSave
     */
    public function takeAttendanceSave(Request $request)
    {
        $userId = getAuthUser()->id;
        $toDay = date('Y-m-d');

        $academicYearId = getAcademicYearId();
        $classroomId = $request->input('classroom_id');
        $attendanceDateAt = !empty($request->attendance_date_at) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->attendance_date_at)->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d');

        $isCurrentDate = ($toDay === $attendanceDateAt) ? true : false;

        $checkAlreadyAttendance = $this->classroomAttendanceRepository->checkAlreadyAttendance($classroomId,  $attendanceDateAt);

        if (!empty($checkAlreadyAttendance)) {
            if (!empty($request->input('attendance_note'))) {
                if (!empty($request->input('students'))) {
                    $dataArrayUpdate = [
                        'is_current_date' => false,
                        'is_attendance_allowed_on_back_date' => true,
                        'students' => json_encode($request->input('students')),
                    ];

                    $takeAttendance =  $this->classroomAttendanceRepository->update($checkAlreadyAttendance->id, $dataArrayUpdate);

                    if ($takeAttendance) {
                        $takeAttendance = $this->classroomAttendanceRepository->getById($checkAlreadyAttendance->id);

                        $takeAttendance->activities()->create([
                            'school_id' => getUserSchoolId(),
                            'user_id' => auth()->user()->id,
                            'activitiesable_id' => $takeAttendance->id,
                            'activitiesable_type' => $takeAttendance->getMorphClass(),
                        ]);

                        $this->classroomAttendanceRepository->createClassroomAttendanceNote([
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => $academicYearId,
                            'user_id' => $userId ?? '',
                            'classroom_attendance_id' => $takeAttendance->id,
                            'attendance_note' =>  $request->input('attendance_note'),
                            'status' => Status::ACTIVE->value,
                        ]);

                        return redirect()->route('classroom_attendance.take_attendance')->with('message', 'Class attendance taken');
                    }
                } else {
                    return redirect()->route('classroom_attendance.take_attendance')->with('error', 'Please select student');
                }
            } else {
                return redirect()->route('classroom_attendance.take_attendance')->with('error', 'Please fill required field');
            }
        } else {
            if (!empty($request->input('students'))) {
                $dataArray = [
                    'school_id' => getUserSchoolId(),
                    'classroom_id' => $classroomId,
                    'academic_year_id' => $academicYearId,
                    'taken_by_id' => $userId ?? '',
                    'holiday_title' => $request->input('holiday_title') ?? '',
                    'is_attendance_taken' => true,
                    'is_current_date' => $isCurrentDate,
                    'is_attendance_allowed_on_back_date' => false,
                    'attendance_date_at' => $attendanceDateAt,
                    'attendance_time_at' => date("H:i:s"),
                    'students' => json_encode($request->input('students')),
                    'status' => Status::ACTIVE->value,
                ];
                $takeAttendance =  $this->classroomAttendanceRepository->create($dataArray);
                if ($takeAttendance) {
                    $takeAttendance->activities()->create([
                        'school_id' => getUserSchoolId(),
                        'user_id' => auth()->user()->id,
                        'activitiesable_id' => $takeAttendance->id,
                        'activitiesable_type' => $takeAttendance->getMorphClass(),
                    ]);

                    return redirect()->route('classroom_attendance.take_attendance')->with('message', 'Class attendance taken');
                }
            } else {
                return redirect()->route('classroom_attendance.take_attendance')->with('error', 'Please select student');
            }
        }
    }

    /**
     * save student attendance note
     */
    public function saveStudentNote(StudentNoteRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'created_by' => auth()->user()->id,
                'student_id' => $input['student_id'],
                'context' => $input['context'],
                'notes' => $input['notes'],
                'note_status' => ContextStatus::OPEN,
                'status' => Status::ACTIVE,
            );

            $studentNote = $this->studentNoteRepository->create($dataArray);

            $studentNote->activities()->create([
                'school_id' => getUserSchoolId(),
                'user_id' => auth()->user()->id,
                'activitiesable_id' => $studentNote->id,
                'activitiesable_type' => $studentNote->getMorphClass(),
            ]);

            DB::commit();

            return redirect()->back()->with('message', 'Note added successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /**
     * Display setClassWorking
     */
    public function setClassWorking(Request $request): Response
    {
        $monthId = !empty($_GET['month']) ? $_GET['month'] : getCurrentMonthNumber();
        $yearId = !empty($_GET['year']) ? $_GET['year'] : getAcademicYearId();
        $classNamesDetails = [];

        if ($request->isMethod('post')) {
            $monthId = $request->input('month_id');
            $yearId = $request->input('academic_year_id');
        }

        // Academic session
        $sessionData = $this->academicRepository->getActiveSessionAndId();
        $academicSession = $sessionData->map(fn ($session) => ['id' => $session->id, 'title' => $session->academic_session])->all();

        // month list
        $monthArr = array();
        foreach (MonthFull::cases() as $key => $month) {
            array_push($monthArr, ['id' => ++$key, 'title' => $month->value]);
        }

        $getWorkingBonusData = $this->workingBonusDayRepository->getByMonthYear($monthId, $yearId)->toArray();
        $classNameData = $this->classroomRepository->getActiveClassNameAll();
        $classNameData->load(['classrooms']);
        $classNames = $classNameData->toArray();

        foreach ($classNames as $className) {
            $workingDays = '';
            $bonusDays = '';
            foreach ($getWorkingBonusData as $workingBonus) {
                if ($workingBonus['class_name_id'] == $className['id']) {
                    $workingDays = $workingBonus['working_days'];
                    $bonusDays = $workingBonus['bonus_days'];
                }
            }
            $classNamesDetails[] = [
                'class_name' => $className['title'],
                'class_name_id' => $className['id'],
                'working_days' => $workingDays,
                'bonus_days' => $bonusDays,
            ];
        }

        return Inertia::render('ClassroomAttendance/SetClassWorking', [
            'classNames' => $classNamesDetails,
            'academicSession' => $academicSession,
            'monthArr' => $monthArr,
            'academicYearId' => $yearId,
            'monthId' => $monthId,
        ]);
    }

    /**
     * setClassWorkingSave
     */
    public function setClassWorkingSave(Request $request)
    {
        if ($request->isMethod('post')) {
            $academicYearId = $request->input('academic_year_id');
            $monthId = $request->input('month_id');
            $classNameId = $request->input('class_name_id');
            $workingDay = $request->input('working_day');
            $bonusDay = $request->input('bonus_day');

            if (!empty($academicYearId) && !empty($monthId) && !empty($workingDay) && !empty($workingDay)) {
                $classrooms = $this->classroomRepository->getActiveNameAndIdByClassNameId($classNameId)->toArray();
                $exitingData = $this->workingBonusDayRepository->getDataByClassNameYearMonth($academicYearId, $monthId, $classNameId);

                if (!empty($exitingData)) {
                    $getWorkingClassrooms = $this->workingBonusDayRepository->getAllWorkingBonusDayClassroomByClassId($exitingData->id)->toArray();
                    $dataArr2 = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => $academicYearId,
                        'class_name_id' => $classNameId,
                        'month_id' => $monthId,
                        'working_days' => $workingDay,
                        'bonus_days' => $bonusDay,
                        'status' => Status::ACTIVE->value ?? '',
                    ];

                    $workingBonus = $this->workingBonusDayRepository->update($exitingData->id, $dataArr2);
                    if ($workingBonus) {
                        // updateWorkingBonusDayClassroom
                        foreach ($getWorkingClassrooms as $workingClassroom) {
                            $exitWorkingStudents = $this->workingBonusDayRepository->getByMonthYearClassNameClassroom($workingClassroom['month_id'], $workingClassroom['academic_year_id'], $workingClassroom['class_name_id'], $workingClassroom['classroom_id'])->toArray();
                            $workingClassroomArr = [
                                'working_days' => $workingDay,
                                'bonus_days' => $bonusDay,
                            ];
                            $this->workingBonusDayRepository->updateWorkingBonusDayClassroom($workingClassroom['id'], $workingClassroomArr);
                            if (!empty($exitWorkingStudents)) {
                                foreach ($exitWorkingStudents as $exitStudent) {
                                    $workingStudentArr = [
                                        'working_days' => $workingDay,
                                        'bonus_days' => $bonusDay,
                                    ];
                                    $this->workingBonusDayRepository->updateWorkingBonusDayStudent($exitStudent['id'], $workingStudentArr);
                                }
                            }
                        }
                        return redirect()->route('classroom_attendance.set_class_working', ['month' => $monthId, 'year' => $academicYearId])->with('message', 'Successfully set days');
                    } else {
                        return redirect()->route('classroom_attendance.set_class_working')->with('error', 'Please select month and year');
                    }
                } else {
                    $dataArr = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => $academicYearId,
                        'class_name_id' => $classNameId,
                        'month_id' => $monthId,
                        'working_days' => $workingDay,
                        'bonus_days' => $bonusDay,
                        'status' => Status::ACTIVE->value ?? '',
                    ];
                    $workingBonus = $this->workingBonusDayRepository->create($dataArr);
                    if ($workingBonus) {
                        // createWorkingBonusDayClassroom
                        foreach ($classrooms as $classroomId) {
                            $studentsByYearClassClassroom = $this->studentRepository->getStudentByYearIdClassNameIdClassroomId($academicYearId, $classNameId, $classroomId['id'])->toArray();
                            $workingClassroomArr = [
                                'school_id' => getUserSchoolId(),
                                'academic_year_id' => $academicYearId,
                                'class_name_id' => $classNameId,
                                'classroom_id' => $classroomId['id'],
                                'working_bonus_day_class_id' => $workingBonus->id,
                                'month_id' => $monthId,
                                'working_days' => $workingDay,
                                'bonus_days' => $bonusDay,
                                'status' => Status::ACTIVE->value ?? '',
                            ];
                            $workingBonusClassroom = $this->workingBonusDayRepository->createWorkingBonusDayClassroom($workingClassroomArr);
                            if (!empty($workingBonusClassroom) && !empty($studentsByYearClassClassroom)) {
                                foreach ($studentsByYearClassClassroom as $studentByYearClassClassroom) {
                                    $workingStudentArr = [
                                        'school_id' => getUserSchoolId(),
                                        'student_id' => $studentByYearClassClassroom['id'],
                                        'classroom_id' => $studentByYearClassClassroom['classroom_id'],
                                        'class_name_id' => $studentByYearClassClassroom['class_name_id'],
                                        'academic_year_id' => $studentByYearClassClassroom['academic_year_id'],
                                        'month_id' => $monthId,
                                        'working_days' => $workingDay,
                                        'bonus_days' => $bonusDay,
                                        'status' => Status::ACTIVE->value ?? '',
                                    ];
                                    $this->workingBonusDayRepository->createWorkingBonusDayStudent($workingStudentArr);
                                }
                            }
                        }
                        return redirect()->route('classroom_attendance.set_class_working', ['month' => $monthId, 'year' => $academicYearId])->with('message', 'Successfully set days');
                    } else {
                        return redirect()->route('classroom_attendance.set_class_working')->with('error', 'Please select month and year');
                    }
                }
            } else {
                return redirect()->route('classroom_attendance.set_class_working')->with('error', 'Please fill required field');
            }
        }
    }

    /**
     * Display the schools.
     */
    public function setSectionWorking(Request $request)
    {

        $monthId = !empty($_GET['month']) ? $_GET['month'] : getCurrentMonthNumber();
        $yearId = !empty($_GET['year']) ? $_GET['year'] : getAcademicYearId();
        $class_id = !empty($_GET['class_id']) ? $_GET['class_id'] : '';
        $classroomDetails = [];

        if ($request->isMethod('post')) {
            $monthId = $request->input('month_id');
            $yearId = $request->input('academic_year_id');
            $class_id = $request->input('class_name_id');
        }

        // Academic session
        $sessionData = $this->academicRepository->getActiveSessionAndId();
        $academicSession = $sessionData->map(fn ($session) => ['id' => $session->id, 'title' => $session->academic_session])->all();

        // month list
        $monthArr = array();
        foreach (MonthFull::cases() as $key => $month) {
            array_push($monthArr, ['id' => ++$key, 'title' => $month->value]);
        }

        // class names
        $classNames = $this->classroomRepository->getClassNameForWorkingClassroom()->toArray();

        // working classroom
        $workingBonusClassrooms = $this->workingBonusDayRepository->getWorkingClassroomByMonthYearClassId($monthId, $yearId, $class_id)->toArray();
        $classrooms = $this->classroomRepository->getClassroomForWorkingClassroom($yearId, $class_id)->toArray();

        if (!empty($classrooms)) {
            foreach ($classrooms as $classroom) {
                $workingDays = '';
                $bonusDays = '';
                foreach ($workingBonusClassrooms as $workingBonusClassroom) {
                    if ($workingBonusClassroom['classroom_id'] == $classroom['id']) {
                        $workingDays = $workingBonusClassroom['working_days'];
                        $bonusDays = $workingBonusClassroom['bonus_days'];
                    }
                }
                $classroomDetails[] = [
                    'classroom_id' => $classroom['id'],
                    'classroom_title' => $classroom['title'],
                    'working_days' => $workingDays,
                    'bonus_days' => $bonusDays,
                ];
            }
        }

        return Inertia::render('ClassroomAttendance/SetSectionWorking', [
            'workingClassroom' => $classroomDetails,
            'academicSession' => $academicSession,
            'monthArr' => $monthArr,
            'academicYearId' => $yearId,
            'monthId' => $monthId,
            'classId' => $class_id,
            'classNames' => $classNames,
        ]);
    }

    public function setSectionWorkingSave(WorkingBonusDayClassroomRequest $request)
    {
        $input = $request->validated();
        $condition = [
            'classroom_id' => $input['classroom_id'],
            'class_name_id' => $input['class_name_id'],
            'academic_year_id' => $input['academic_year_id'],
            'month_id' => $input['month_id'],
        ];
        $dataArr = [
            'school_id' => getUserSchoolId(),
            'classroom_id' => $input['classroom_id'],
            'class_name_id' => $input['class_name_id'],
            'academic_year_id' => $input['academic_year_id'],
            'month_id' => $input['month_id'],
            'working_days' => $input['working_days'],
            'bonus_days' => $input['bonus_days'],
            'status' => Status::ACTIVE->value ?? '',
        ];
        $workingBonusClassroom = $this->workingBonusDayRepository->updateOrCreateWorkingBonusDayClassroom($condition, $dataArr);
        if ($workingBonusClassroom) {

            $conditionStudent = [
                'classroom_id' => $workingBonusClassroom['classroom_id'],
                'class_name_id' => $workingBonusClassroom['class_name_id'],
                'academic_year_id' => $workingBonusClassroom['academic_year_id'],
                'month_id' => $workingBonusClassroom['month_id'],
            ];

            $students = $this->studentRepository->getStudentByYearIdClassNameIdClassroomId($input['academic_year_id'],  $input['class_name_id'], $input['classroom_id'])->toArray();
            if (!empty($students)) {
                foreach ($students as $std) {
                    $conditionStudent['student_id'] = $std['id'];
                    $dataArrStudent = [
                        'school_id' => getUserSchoolId(),
                        'classroom_id' => $input['classroom_id'],
                        'class_name_id' => $input['class_name_id'],
                        'academic_year_id' => $input['academic_year_id'],
                        'month_id' => $input['month_id'],
                        'working_days' => $input['working_days'],
                        'bonus_days' => $input['bonus_days'],
                        'status' => Status::ACTIVE->value ?? '',
                        'student_id' => $std['id'],
                    ];
                    $this->workingBonusDayRepository->updateOrCreateWorkingBonusDayStudent($conditionStudent, $dataArrStudent);
                }
            }

            return redirect()->route(
                'classroom_attendance.set_section_working',
                ['month' => $input['month_id'], 'year' => $input['academic_year_id'], 'class_id' => $input['class_name_id']]
            )->with('message', 'Successful save');
        } else {
            return redirect()->route('classroom_attendance.set_section_working', ['month' => $input['month_id'], 'year' => $input['academic_year_id'], 'class_id' => $input['class_name_id']])->with('error', 'Something error');
        }
    }
    /**
     * Display the schools.
     */
    public function setStudentWorking(Request $request): Response
    {

        $monthId = !empty($_GET['month']) ? $_GET['month'] : getCurrentMonthNumber();
        $yearId = !empty($_GET['year']) ? $_GET['year'] : getAcademicYearId();
        $classNameId = !empty($_GET['class_id']) ? $_GET['class_id'] : '';
        $classroomId = !empty($_GET['classroom_id']) ? $_GET['classroom_id'] : '';
        $studentDetails = [];

        if ($request->isMethod('post')) {
            $classNameId = $request->input('class_name_id');
            $classroomId = $request->input('classroom_id');
            $yearId = $request->input('academic_year_id');
            $monthId = $request->input('month_id');
        }

        // Academic session
        $sessionData = $this->academicRepository->getActiveSessionAndId();
        $academicSession = $sessionData->map(fn ($session) => ['id' => $session->id, 'title' => $session->academic_session])->all();

        // month list
        $monthArr = array();
        foreach (MonthFull::cases() as $key => $month) {
            array_push($monthArr, ['id' => ++$key, 'title' => $month->value]);
        }

        // $className
        $classNameData = $this->classroomRepository->getActiveClassNameAll();
        $classNames = $classNameData->map(fn ($className) => ['id' => $className->id, 'title' => $className->title])->all();

        // classroom
        $classroomData = $this->classroomRepository->getActiveNameAndId();
        $classrooms = $classroomData->map(fn ($classroom) => ['id' => $classroom->id, 'title' => $classroom->title, 'class_name_id' => $classroom->class_name_id])->all();

        // student details
        $studentData = $this->studentRepository->getStudentByYearIdClassNameIdClassroomId($yearId, $classNameId, $classroomId);
        $studentData->load(['father', 'classroomRoll']);
        $students = $studentData->toArray();
        $getWorkingBonusStudentData = $this->workingBonusDayRepository->getByMonthYearClassNameClassroom($monthId, $yearId, $classNameId, $classroomId)->toArray();

        if (!empty($students)) {
            foreach ($students as $student) {
                $workingDays = '';
                $bonusDays = '';
                foreach ($getWorkingBonusStudentData as $workingStudent) {
                    if ($workingStudent['class_name_id'] === $student['class_name_id'] && $workingStudent['classroom_id'] === $student['classroom_id'] && $workingStudent['student_id'] === $student['id']) {
                        $workingDays = $workingStudent['working_days'];
                        $bonusDays = $workingStudent['bonus_days'];
                    }
                }
                $classroomRoll = isset($student['classroom_roll']['roll_no']) ? $student['classroom_roll']['roll_no'] : 'N/A';
                $fatherName = isset($student['father']) ? $student['father']['first_name'] . ' ' . $student['father']['middle_name'] . ' ' . $student['father']['last_name'] : 'N/A';

                $studentDetails[] = [
                    'student_id' => $student['id'],
                    'class_name_id' => $student['class_name_id'],
                    'classroom_id' => $student['classroom_id'],
                    'working_days' => $workingDays,
                    'bonus_days' => $bonusDays,
                    'student_name' => $student['first_name'] . ' ' . $student['middle_name'] . ' ' . $student['last_name'],
                    'father_name' => $fatherName,
                    'classroom_roll' => $classroomRoll,
                    'admission_no' => $student['admission_no'],
                ];
            }
        }

        return Inertia::render('ClassroomAttendance/SetStudentWorking', [
            'studentDetails' => $studentDetails,
            'academicSession' => $academicSession,
            'monthArr' => $monthArr,
            'classNames' => $classNames,
            'classrooms' => $classrooms,
            'academicYearId' => $yearId,
            'monthId' => $monthId,
            'classId' => $classNameId,
            'classroomId' => $classroomId,
        ]);
    }

    public function setStudentWorkingSave(WorkingBonusDayStudentRequest $request)
    {
        $input = $request->validated();

        $condition = [
            'student_id' => $input['student_id'],
            'classroom_id' => $input['classroom_id'],
            'class_name_id' => $input['class_name_id'],
            'academic_year_id' => $input['academic_year_id'],
            'month_id' => $input['month_id'],
        ];

        $dataArr = [
            'school_id' => getUserSchoolId(),
            'student_id' => $input['student_id'],
            'classroom_id' => $input['classroom_id'],
            'class_name_id' => $input['class_name_id'],
            'academic_year_id' => $input['academic_year_id'],
            'month_id' => $input['month_id'],
            'working_days' => $input['working_days'],
            'bonus_days' => $input['bonus_days'],
            'status' => Status::ACTIVE->value ?? '',
        ];

        $workingBonusStudent = $this->workingBonusDayRepository->updateOrCreateWorkingBonusDayStudent($condition, $dataArr);
        if ($workingBonusStudent) {
            return redirect()->route(
                'classroom_attendance.set_student_working',
                [
                    'month' => $input['month_id'],
                    'year' => $input['academic_year_id'],
                    'class_id' => $input['class_name_id'],
                    'classroom_id' => $input['classroom_id'],
                ]
            )->with('message', 'Successful save');
        } else {
            return redirect()->route(
                'classroom_attendance.set_student_working',
                [
                    'month' => $input['month_id'],
                    'year' => $input['academic_year_id'],
                    'class_id' => $input['class_name_id'],
                    'classroom_id' => $input['classroom_id'],
                ]
            )->with('error', 'Something error');
        }
    }

}
