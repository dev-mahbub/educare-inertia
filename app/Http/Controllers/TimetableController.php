<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\UserRole;
use App\Enums\TimetableDay;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Repositories\IStaffRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\ISubjectRepository;
use App\Repositories\ITeacherRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\ITimetableRepository;
use App\Repositories\IAssessmentRepository;
use App\Repositories\ISchoolShiftRepository;
use App\Repositories\ISchoolPeriodRepository;
use App\Http\Requests\ClassroomTimetableRequest;
use App\Repositories\IClassroomPeriodRepository;
use App\Repositories\IClassroomSubjectRepository;

class TimetableController extends Controller
{
    public function __construct(
        private ISchoolPeriodRepository $schoolPeriodRepository,
        private IClassroomPeriodRepository $classroomPeriodRepository,
        private ISchoolShiftRepository $schoolShiftRepository,
        private IStaffRepository $staffRepository,
        private IClassroomRepository $classroomRepository,
        private ISubjectRepository $subjectRepository,
        private ITeacherRepository $teacherRepository,
        private ITimetableRepository $timetableRepository,
        private IStudentRepository $studentRepository,
        private IAssessmentRepository $assessmentRepository,
        private IClassroomSubjectRepository $classroomSubjectRepository,
    ) {
        // do something
    }

    /**
     * Create Timetable
     */
    public function create(Request $request): Response
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classroomId = null;
        $schoolShiftId = null;
        $classroomPeriods = [];
        $classrooms = [];
        $subjects = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $schoolShiftId = $request->school_shift_id ?? null;

            if (!empty($classroomId) && !empty($schoolShiftId)) {
                // class periods
                $classroomPeriods = $this->classroomPeriodRepository->getClassroomPeriodsByClassroomIdAndSchoolShiftId($classroomId, $schoolShiftId);

                if (count($classroomPeriods) > 0) {
                    $classroomPeriods->loadMissing(['classroomTimetables']);

                    $classroomPeriods = $classroomPeriods->map(function ($classroomPeriod) {
                        return [
                            'id' => $classroomPeriod->id,
                            'type' => $classroomPeriod->type,
                            'school_shift_id' => $classroomPeriod->school_shift_id,
                            'classroom_id' => $classroomPeriod->classroom_id,
                            'school_period_id' => $classroomPeriod->school_period_id,
                            'start_time' => $classroomPeriod?->schoolPeriod?->start_time_at,
                            'end_time' => $classroomPeriod?->schoolPeriod?->end_time_at,
                            'classroomTimetables' => $classroomPeriod?->classroomTimetables ?? []
                        ];
                    })->all();
                }
            }
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classrooms = $this->classroomRepository->getActiveAll();

            if (!empty($classroomId)) {
                $subjects = $this->subjectRepository->getSubjectsByClassroomId($classroomId);
            }
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId);

            if (!empty($classroomId)) {
                $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassroomId($teacherId, $classroomId);
            }
        }

        // teachers
        $teachers = $this->teacherRepository->getActiveTeachersAll()?->map((function ($teacher) {
            $teacher['title'] = trim(implode(' ', [$teacher->first_name, $teacher->middle_name, $teacher->last_name]));

            return $teacher;
        }));

        // timetable days
        $timetableDays = buildEnumOptionsArray(TimetableDay::cases());

        // school shifts
        $schoolShifts = $this->schoolShiftRepository->getActiveAll();

        return Inertia::render('Timetable/Create', [
            'classrooms' => $classrooms,
            'schoolShifts' => $schoolShifts,
            'classroomPeriods' => $classroomPeriods,
            'timetableDays' => $timetableDays,
            'subjects' => $subjects,
            'teachers' => $teachers
        ]);
    }

    /**
     * Save Timetable
     *
     */
    public function save(ClassroomTimetableRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $classroomId = $input['classroom_id'];
            $schoolShiftId = $input['school_shift_id'];

            // delete previous timetables
            $this->timetableRepository->deleteClassroomTimetablesByClassroomIdAndSchoolShiftId($classroomId, $schoolShiftId);

            // create timetables
            if (!empty($input['timetables'])) {
                foreach ($input['timetables'] as $timetable) {
                    if (!empty($timetable['period_data'])) {
                        $attributesToCheck = [
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => getAcademicYearId(),
                            'created_by' => auth()->user()->id,
                            'classroom_id' => $classroomId,
                            'school_shift_id' => $schoolShiftId,
                            'day' => $timetable['day'] ?? '',
                        ];

                        $valuesToUpdate = [
                            'status' => Status::ACTIVE
                        ];

                        foreach ($timetable['period_data'] as $period) {
                            $attributesToCheck['classroom_period_id'] = $period['classroom_period_id'] ?? null;
                            $attributesToCheck['subject_id'] = $period['subject_id'] ?? null;
                            $attributesToCheck['staff_id'] = $period['staff_id'] ?? null;
                            $valuesToUpdate['type'] = $period['type'] ?? '';

                            $this->timetableRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
                        }
                    }
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Timetable created successfully!');
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with('error', 'Something goes wrong!');
        }
    }

    /**
     *  Class Timetable
     */
    public function classroomTimetable(Request $request): Response
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classroomId = null;
        $schoolShiftId = null;
        $classroomPeriods = [];
        $classrooms = [];
        $timetables = [];

        // timetable days
        $timetableDays = buildEnumOptionsArray(TimetableDay::cases());

        foreach ($timetableDays as $day) {
            $timetables[$day['title']] = [
                'day' => $day['title'],
                'period_data' => []
            ];
        }

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $schoolShiftId = $request->school_shift_id ?? null;

            if (!empty($classroomId) && !empty($schoolShiftId)) {
                // classroom periods
                $classroomPeriods = $this->classroomPeriodRepository->getClassroomPeriodsByClassroomIdAndSchoolShiftId($classroomId, $schoolShiftId);

                if (count($classroomPeriods) > 0) {
                    $classroomPeriods = $classroomPeriods->map(function ($classroomPeriod) {
                        return [
                            'id' => $classroomPeriod->id,
                            'type' => $classroomPeriod->type,
                            'school_shift_id' => $classroomPeriod->school_shift_id,
                            'classroom_id' => $classroomPeriod->classroom_id,
                            'school_period_id' => $classroomPeriod->school_period_id,
                            'start_time' => $classroomPeriod?->schoolPeriod?->start_time_at,
                            'end_time' => $classroomPeriod?->schoolPeriod?->end_time_at,
                            // 'start_time' => !empty($classroomPeriod?->schoolPeriod?->start_time_at) ? Carbon::parse($classroomPeriod->schoolPeriod->start_time_at)->format('H:i A') : '',
                            // 'end_time' => !empty($classroomPeriod?->schoolPeriod?->end_time_at) ? Carbon::parse($classroomPeriod->schoolPeriod->end_time_at)->format('H:i A') : ''
                        ];
                    })->all();

                    // classroom timetables
                    $classroomTimetables = $this->timetableRepository->getClassroomTimetablesByClassroomIdAndSchoolShiftId($classroomId, $schoolShiftId);

                    if (count($classroomTimetables) > 0) {
                        foreach ($classroomTimetables as $timetable) {
                            $timetables[$timetable->day]['period_data'][$timetable->classroom_period_id][] = [
                                'classroom_period_id' => $timetable?->classroom_period_id,
                                'subject_title' => $timetable?->subject?->title,
                                'teacher_name' => trim(implode(' ', [$timetable?->staff?->first_name, $timetable?->staff?->middle_name, $timetable?->staff?->last_name])),
                            ];
                        }
                    }
                }
            }
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classrooms = $this->classroomRepository->getActiveAll();
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId);
        }

        // school shifts
        $schoolShifts = $this->schoolShiftRepository->getActiveAll();

        return Inertia::render('Timetable/ClassroomTimetable', [
            'classrooms' => $classrooms,
            'schoolShifts' => $schoolShifts,
            'classroomPeriods' => $classroomPeriods,
            'timetables' => !empty($timetables) ? array_values($timetables) : []
        ]);
    }

    /**
     *  Teacher Timetable
     */
    public function teacherTimetable(Request $request): Response
    {
        $staffId = null;
        $schoolShiftId = null;
        $schoolPeriods = [];
        $timetables = [];

        // teachers
        $teachers = $this->teacherRepository->getActiveTeachersAll()?->map((function ($teacher) {
            $teacher['title'] = trim(implode(' ', [$teacher->first_name, $teacher->middle_name, $teacher->last_name]));

            return $teacher;
        }));

        // school shifts
        $schoolShifts = $this->schoolShiftRepository->getActiveAll();

        // timetable days
        $timetableDays = buildEnumOptionsArray(TimetableDay::cases());

        foreach ($timetableDays as $day) {
            $timetables[$day['title']] = [
                'day' => $day['title'],
                'period_data' => []
            ];
        }

        if ($request->isMethod('POST')) {
            $staffId = $request->staff_id ?? null;
            $schoolShiftId = $request->school_shift_id ?? null;

            if (!empty($staffId) && !empty($schoolShiftId)) {
                // school periods
                $schoolPeriods = $this->schoolPeriodRepository->getSchoolPeriodsBySchoolShiftId($schoolShiftId);

                if (count($schoolPeriods) > 0) {
                    $schoolPeriods = $schoolPeriods->map(function ($schoolPeriod) {
                        return [
                            'id' => $schoolPeriod->id,
                            'type' => $schoolPeriod->type,
                            'school_shift_id' => $schoolPeriod->school_shift_id,
                            'start_time' => $schoolPeriod?->start_time_at,
                            'end_time' => $schoolPeriod?->end_time_at
                        ];
                    })->all();

                    // classroom timetables
                    $classroomTimetables = $this->timetableRepository->getClassroomTimetablesByStaffIdAndSchoolShiftId($staffId, $schoolShiftId);

                    if (count($classroomTimetables) > 0) {
                        foreach ($classroomTimetables as $timetable) {
                            $schoolPeriodId = $timetable?->classroomPeriod?->school_period_id;

                            $timetables[$timetable->day]['period_data'][$schoolPeriodId][] = [
                                'school_period_id' => $schoolPeriodId,
                                'subject_title' => $timetable?->subject?->title,
                                'classroom_title' => $timetable?->classroom?->title,
                            ];
                        }
                    }
                }
            }
        }

        return Inertia::render('Timetable/TeacherTimetable', [
            'teachers' => $teachers,
            'schoolShifts' => $schoolShifts,
            'schoolPeriods' => $schoolPeriods,
            'timetables' => !empty($timetables) ? array_values($timetables) : []
        ]);
    }

    /**
     *  Teacher Allocation
     */
    public function teacherAllocation(Request $request): Response
    {
        return Inertia::render('Timetable/Create', []);
    }

    /**
     *  Vacant Teacher
     */
    public function vacantTeachers(Request $request): Response
    {
        // current date
        $currentDate = date('l M d Y');

        // school shifts
        $schoolShifts = $this->schoolShiftRepository->getActiveAll();

        $schoolPeriods = [];
        $teachers = [];

        if ($request->isMethod('POST')) {
            $schoolShiftId = $request->school_shift_id ?? null;
            $schoolPeriodId = $request->school_period_id ?? null;

            if (!empty($schoolShiftId)) {
                // school periods
                $schoolPeriods = $this->schoolPeriodRepository->getSchoolPeriodsBySchoolShiftId($schoolShiftId);

                if (count($schoolPeriods) > 0) {
                    $schoolPeriods = $schoolPeriods->map(function ($schoolPeriod) {
                        $startTime = !empty($schoolPeriod->start_time_at) ? Carbon::parse($schoolPeriod?->start_time_at)->format('H:i A') : '';
                        $endTime = !empty($schoolPeriod->end_time_at) ? Carbon::parse($schoolPeriod?->end_time_at)->format('H:i A') : '';

                        return [
                            'id' => $schoolPeriod->id,
                            'school_shift_id' => $schoolPeriod->school_shift_id,
                            'title' => $startTime . ' - ' . $endTime,
                            'start_time' => $schoolPeriod?->start_time_at,
                            'end_time' => $schoolPeriod?->end_time_at
                        ];
                    })->all();
                }

                if (!empty($schoolPeriodId)) {
                    $currentDay = date('l');

                    // vacant teachers
                    $teachers = $this->staffRepository->getVacantTeachers($schoolShiftId, $schoolPeriodId, $currentDay);

                    if (count($teachers) > 0) {
                        $teachers->transform(function ($teacher) {
                            $classroomSubjects = $this->classroomSubjectRepository->getClassroomSubjectsByTeacherId($teacher->id);

                            $teacher['classroom_subjects'] = $classroomSubjects?->map(function ($classroomSubject) {
                                return [
                                    'classroom_title' => $classroomSubject?->classroom?->title,
                                    'subject_title' => $classroomSubject?->subject?->title,
                                ];
                            })->all();

                            return $teacher;
                        });
                    }
                }
            }
        }

        return Inertia::render('Timetable/VacantTeachers', [
            'schoolShifts' => $schoolShifts,
            'schoolPeriods' => $schoolPeriods,
            'currentDate' => $currentDate,
            'teachers' => $teachers,
        ]);
    }

    /**
     *  Allotment
     */
    public function allotment(Request $request): Response
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classNames = [];
        $schoolPeriods = [];
        $schoolShiftId = null;
        $classNameId = null;
        $timetables = [];
        $classrooms = [];

        // current date
        $currentDate = date('l M d Y');

        // class names
        $classNames = $this->classroomRepository->getActiveClassNameAll();

        // school shifts
        $schoolShifts = $this->schoolShiftRepository->getActiveAll();

        if ($request->isMethod('POST')) {
            $schoolShiftId = $request->school_shift_id ?? null;
            $classNameId = $request->class_name_id ?? null;
        }

        if (!empty($classNameId)) {
            $classrooms = $this->classroomRepository->getClassroomsByClassNameId($classNameId);
        } else {
            $classrooms = $this->classroomRepository->getActiveAll();
        }

        if (count($classrooms) > 0) {
            foreach ($classrooms as $classroom) {
                $timetables[$classroom->id] = [
                    'classroom_title' => $classroom->title,
                    'period_data' => []
                ];
            }

            if (!empty($schoolShiftId)) {
                $classroomIds = $classrooms?->pluck('id')?->toArray();

                // school periods
                $schoolPeriods = $this->schoolPeriodRepository->getSchoolPeriodsBySchoolShiftId($schoolShiftId);

                if (count($schoolPeriods) > 0) {
                    $schoolPeriods = $schoolPeriods->map(function ($schoolPeriod) {
                        $startTime = !empty($schoolPeriod->start_time_at) ? Carbon::parse($schoolPeriod?->start_time_at)->format('H:i A') : '';
                        $endTime = !empty($schoolPeriod->end_time_at) ? Carbon::parse($schoolPeriod?->end_time_at)->format('H:i A') : '';

                        return [
                            'id' => $schoolPeriod->id,
                            'school_shift_id' => $schoolPeriod->school_shift_id,
                            'start_time' => $startTime,
                            'end_time' => $endTime
                        ];
                    })->all();
                }

                // classroom timetables
                $classroomTimetables = $this->timetableRepository->getTodayAllotmentClassroomTimetables($schoolShiftId, $classroomIds);

                if (count($classroomTimetables) > 0) {
                    foreach ($classroomTimetables as $timetable) {
                        $schoolPeriodId = $timetable?->classroomPeriod?->school_period_id;

                        $timetables[$timetable?->classroom_id]['period_data'][$schoolPeriodId][] = [
                            'school_period_id' => $schoolPeriodId,
                            'subject_title' => $timetable?->subject?->title,
                            'teacher_name' => trim(implode(' ', [$timetable?->staff?->first_name, $timetable?->staff?->middle_name, $timetable?->staff?->last_name])),
                        ];
                    }
                }
            }
        }

        // classNames
        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classNames = $this->classroomRepository->getActiveClassNameAll();
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classNames = $this->classroomRepository->getTeacherClassNames($teacherId);
        }

        return Inertia::render('Timetable/Allotment', [
            'currentDate' => $currentDate,
            'schoolShifts' => $schoolShifts,
            'schoolPeriods' => $schoolPeriods,
            'classNames' => $classNames,
            'timetables' => !empty($timetables) ? array_values($timetables) : [],
        ]);
    }

    /**
     *  Student Titme Table
    */
    public function studentTimetable(Request $request): Response
    {
        // Initialize basic variables
        $userRoles = getUserRoleArray() ?? [];
        $students = [];
        $studentId = null;
        $schoolShiftId = 0;
        $classroomPeriods = [];

        if($request->isMethod("POST")){
            $studentId = $request->student_id;
            $schoolShiftId = $request->shift_id ?? 0;
        }
        
        // Initialize timetable structure based on enum days
        $timetables = [];
        $timetableDays = buildEnumOptionsArray(TimetableDay::cases());
        foreach ($timetableDays as $day) {
            $timetables[$day['title']] = [
                'day' => $day['title'],
                'period_data' => []
            ];
        }
        
        // Handle parent role specific logic
        if (in_array('Parent', $userRoles)) {
            $students = $this->studentRepository->getStudentsByParentUserId(auth()->user()->id);
            
            if (count($students) > 0) {
                $students = $students->map(function ($student) {
                    // Process student classroom data
                    if ($student?->latestClassroomStudent?->classroom != null) {
                        if (!empty($student['classroom'])) {
                            unset($student['classroom']);
                        }

                        if ($student?->promotedClassroom != null) {
                            $student['classroom_id'] = $student?->promotedClassroom?->id;
                            $student['classTitle'] = $student?->promotedClassroom?->title;
                        }

                        $student['classroom_id'] = $student?->latestClassroomStudent?->classroom?->id;
                        $student['classroom'] = $student?->latestClassroomStudent?->classroom;
                    }

                    // Load classroom roll data
                    $classroomId = $student?->classroom_id;
                    $student->loadMissing([
                        'classroomRoll' => function ($query) use ($classroomId) {
                            $query->where('classroom_id', $classroomId)
                                ->select('id', 'student_id', 'roll_no');
                        },
                    ]);

                    // Set full student name
                    $student['title'] = trim(implode(" ", [
                        $student->first_name ?? "",
                        $student->middle_name ?? "",
                        $student->last_name ?? ""
                    ]));

                    return $student;
                });
            }
        }
        
        // Process timetable data for either first student (parent view) or selected student
        $targetStudent = null;
        
        if (!empty($studentId)) {
            // Get selected student
            $targetStudent = $this->studentRepository->getStudentById($studentId);
            if ($targetStudent?->promotedClassroom != null) {
                if (!empty($targetStudent['classroom'])) {
                    unset($targetStudent['classroom']);
                }
                $targetStudent['classroom_id'] = $targetStudent?->promotedClassroom?->id;
                $targetStudent['classroom'] = $targetStudent?->promotedClassroom;
            }
        } elseif (count($students) > 0) {
            // Use first student for parent view
            $targetStudent = $students->first();
        }
        
        // Process classroom periods and timetables if we have a valid student
        if ($targetStudent && $targetStudent?->promotedClassroom?->id) {
            $classroomId = $targetStudent->promotedClassroom->id;
            
            // Get and process classroom periods
            $periods = $this->classroomPeriodRepository
                ->getClassroomPeriodsByClassroomIdAndSchoolShiftId($classroomId, $schoolShiftId);
            
            if (count($periods) > 0) {
                // Map classroom periods
                $classroomPeriods = $periods->map(function ($classroomPeriod) {
                    return [
                        'id' => $classroomPeriod->id,
                        'type' => $classroomPeriod->type,
                        'school_shift_id' => $classroomPeriod->school_shift_id,
                        'classroom_id' => $classroomPeriod->classroom_id,
                        'school_period_id' => $classroomPeriod->school_period_id,
                        'start_time' => $classroomPeriod?->schoolPeriod?->start_time_at,
                        'end_time' => $classroomPeriod?->schoolPeriod?->end_time_at,
                    ];
                })->all();
                
                // Process timetables
                $classroomTimetables = $this->timetableRepository
                    ->getClassroomTimetablesByClassroomIdAndSchoolShiftId($classroomId, $schoolShiftId);
                
                if (count($classroomTimetables) > 0) {
                    foreach ($classroomTimetables as $timetable) {
                        $timetables[$timetable->day]['period_data'][$timetable->classroom_period_id][] = [
                            'classroom_period_id' => $timetable?->classroom_period_id,
                            'subject_title' => $timetable?->subject?->title,
                            'teacher_name' => trim(implode(' ', [
                                $timetable?->staff?->first_name,
                                $timetable?->staff?->middle_name,
                                $timetable?->staff?->last_name
                            ])),
                        ];
                    }
                }
            }
        }
        
        // Return Inertia view with compiled data
        return Inertia::render('Timetable/StudentTimetable', [
            'students' => $students,
            'studentId' => $studentId,
            'schoolShifts' => $this->schoolShiftRepository->getActiveAll(),
            'classroomPeriods' => $classroomPeriods,
            'timetables' => !empty($timetables) ? array_values($timetables) : []
        ]);
    }

    public function studentTitmetable_old(Request $request): Response
    {

        $userRoles = getUserRoleArray() ?? [];
        $students = [];
        $studentId = getStudentId();
        $schoolShiftId = 0;
        $classroomPeriods = [];
        $timetables = [];

         // timetable days
         $timetableDays = buildEnumOptionsArray(TimetableDay::cases());

         foreach ($timetableDays as $day) {
             $timetables[$day['title']] = [
                 'day' => $day['title'],
                 'period_data' => []
             ];
         }

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

                        $student['classroom_id'] = $student?->latestClassroomStudent?->classroom?->id;
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
                $innerClassroomId = $firstStudent?->promotedClassroom?->id;
                if (!empty($innerClassroomId) && !empty($schoolShiftId)) {
                    // classroom periods
                    $classroomPeriods = $this->classroomPeriodRepository->getClassroomPeriodsByClassroomIdAndSchoolShiftId($innerClassroomId, $schoolShiftId);
    
                    if (count($classroomPeriods) > 0) {
                        $classroomPeriods = $classroomPeriods->map(function ($classroomPeriod) {
                            return [
                                'id' => $classroomPeriod->id,
                                'type' => $classroomPeriod->type,
                                'school_shift_id' => $classroomPeriod->school_shift_id,
                                'classroom_id' => $classroomPeriod->classroom_id,
                                'school_period_id' => $classroomPeriod->school_period_id,
                                'start_time' => $classroomPeriod?->schoolPeriod?->start_time_at,
                                'end_time' => $classroomPeriod?->schoolPeriod?->end_time_at,
                                // 'start_time' => !empty($classroomPeriod?->schoolPeriod?->start_time_at) ? Carbon::parse($classroomPeriod->schoolPeriod->start_time_at)->format('H:i A') : '',
                                // 'end_time' => !empty($classroomPeriod?->schoolPeriod?->end_time_at) ? Carbon::parse($classroomPeriod->schoolPeriod->end_time_at)->format('H:i A') : ''
                            ];
                        })->all();
    
                        // classroom timetables
                        $classroomTimetables = $this->timetableRepository->getClassroomTimetablesByClassroomIdAndSchoolShiftId($innerClassroomId, $schoolShiftId);
    
                        if (count($classroomTimetables) > 0) {
                            foreach ($classroomTimetables as $timetable) {
                                $timetables[$timetable->day]['period_data'][$timetable->classroom_period_id][] = [
                                    'classroom_period_id' => $timetable?->classroom_period_id,
                                    'subject_title' => $timetable?->subject?->title,
                                    'teacher_name' => trim(implode(' ', [$timetable?->staff?->first_name, $timetable?->staff?->middle_name, $timetable?->staff?->last_name])),
                                ];
                            }
                        }
                    }
                }
            }
        }

        if ($request->isMethod('POST')) {
            $studentId = $request->student_id;
            $schoolShiftId = $request->school_shift_id;
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
        
           if(!empty($student->promotedClassroom->id)){
                $innerClassroomId = $student->promotedClassroom->id;
                if (!empty($innerClassroomId) && !empty($schoolShiftId)) {
                    // classroom periods
                    $classroomPeriods = $this->classroomPeriodRepository->getClassroomPeriodsByClassroomIdAndSchoolShiftId($innerClassroomId, $schoolShiftId);
    
                    if (count($classroomPeriods) > 0) {
                        $classroomPeriods = $classroomPeriods->map(function ($classroomPeriod) {
                            return [
                                'id' => $classroomPeriod->id,
                                'type' => $classroomPeriod->type,
                                'school_shift_id' => $classroomPeriod->school_shift_id,
                                'classroom_id' => $classroomPeriod->classroom_id,
                                'school_period_id' => $classroomPeriod->school_period_id,
                                'start_time' => $classroomPeriod?->schoolPeriod?->start_time_at,
                                'end_time' => $classroomPeriod?->schoolPeriod?->end_time_at,
                                // 'start_time' => !empty($classroomPeriod?->schoolPeriod?->start_time_at) ? Carbon::parse($classroomPeriod->schoolPeriod->start_time_at)->format('H:i A') : '',
                                // 'end_time' => !empty($classroomPeriod?->schoolPeriod?->end_time_at) ? Carbon::parse($classroomPeriod->schoolPeriod->end_time_at)->format('H:i A') : ''
                            ];
                        })->all();
    
                        // classroom timetables
                        $classroomTimetables = $this->timetableRepository->getClassroomTimetablesByClassroomIdAndSchoolShiftId($innerClassroomId, $schoolShiftId);
    
                        if (count($classroomTimetables) > 0) {
                            foreach ($classroomTimetables as $timetable) {
                                $timetables[$timetable->day]['period_data'][$timetable->classroom_period_id][] = [
                                    'classroom_period_id' => $timetable?->classroom_period_id,
                                    'subject_title' => $timetable?->subject?->title,
                                    'teacher_name' => trim(implode(' ', [$timetable?->staff?->first_name, $timetable?->staff?->middle_name, $timetable?->staff?->last_name])),
                                ];
                            }
                        }
                    }
                }

            }
        };

        // school shifts
        $schoolShifts = $this->schoolShiftRepository->getActiveAll();

        return Inertia::render('Timetable/StudentTimetable', [
            'students' => $students,
            'studentId' => $studentId,
            'schoolShifts' => $schoolShifts,
            'classroomPeriods' => $classroomPeriods,
            'timetables' => !empty($timetables) ? array_values($timetables) : []
        ]);
    }

}
