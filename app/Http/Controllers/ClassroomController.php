<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\UserRole;
use App\Models\ClassName;
use Illuminate\Http\Request;
use App\Enums\SchoolShiftType;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IStaffRepository;
use App\Http\Requests\ClassNameRequest;
use App\Http\Requests\ClassroomRequest;
use App\Http\Requests\TimetableRequest;
use App\Repositories\SectionRepository;
use App\Repositories\StudentRepository;
use App\Repositories\SubjectRepository;
use App\Repositories\TeacherRepository;
use App\Repositories\GuardianRepository;
use App\Repositories\ISectionRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\ISubjectRepository;
use App\Repositories\ITeacherRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ClassroomRepository;

use App\Repositories\IGuardianRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\ClassroomRollRepository;
use App\Repositories\IClassroomRollRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Repositories\ClassroomSubjectRepository;
use App\Repositories\IClassroomSubjectRepository;

class ClassroomController extends Controller
{

    public function __construct(
        private ITeacherRepository $teacherRepository,
        private IClassroomRepository $classroomRepository,
        private IClassroomSubjectRepository $classroomSubjectRepository,
        private ISectionRepository $sectionRepository,
        private IStudentRepository $studentRepository,
        private IGuardianRepository $guardianRepository,
        private IClassroomRollRepository $classroomRollRepository,
        private ISubjectRepository $subjectRepository,
        private IStaffRepository $staffRepository,
    ) {
        $this->middleware('permission:view classes', ['only' => ['index', 'classIndex', 'className']]);
        $this->middleware('permission:add classes', ['only' => [
            'create',
            'save',
            'createAssignOrder',
            'saveAssignOrder',
            'createAssignRoll',
            'assignDisplayOrder',
            'assignClassTeacher',
            'assignClassTeacherSave',
            'assignStudentRollSave',
            'assignClassMonitor',
            'createTimetable',
            'saveTimetable',
            'saveClassName',
            'saveClassTeacher'
        ]]);
        $this->middleware('permission:edit classes', ['only' => ['editTimeTable', 'updateTimeTable', 'classNameEdit', 'classNameUpdate']]);
        $this->middleware('permission:delete classes', ['only' => ['destroyTimeTable', 'classNameDestroy']]);
    }

    /**
     * Display the classes.
     */
    public function classIndex(Request $request): Response
    {
        // search
        $classNameId = !empty($_GET['class_id']) ? (int)$_GET['class_id'] : null;
        $subjectId = !empty($_GET['subject_id']) ? (int)$_GET['subject_id'] : null;
        $students = array();
        $students2 = array();

        // $tempParentArray = array();

        if (is_int($classNameId) || is_int($subjectId)) {
            $classrooms = $this->classroomRepository->getClasses($classNameId, $subjectId);
        } else {
            $classrooms = $this->classroomRepository->getClasses();
        }

        // classroom
        if (!empty($classrooms)) {
            foreach ($classrooms as $key => $classroom) {

                $tempSortArray = array();
                $tempSortArray2 = array();
                // if (!empty($classroom->students)) {

                //     foreach ($classroom->students as $std) {
                //         if($std?->status?->value == 'Active') {
                //             $std->load(['father', 'classroomRoll' => function ($query) use ($classroom) {
                //                 $query->where('classroom_id', $classroom->id);
                //             }]);
                //             $stdSerialNo = !empty($std?->classroomRoll?->roll_no) ? intval($std?->classroomRoll?->roll_no) : rand(1000, 9999);
                //             $tempSortArray[$stdSerialNo][] = array(
                //                 'id' => $std->id,
                //                 'title' => $std->first_name . ' ' . $std->middle_name . ' ' . $std->last_name,
                //                 'admission_no' => $std->admission_no,
                //                 'roll' => $std?->classroomRoll?->roll_no,
                //                 'parent' => $std?->father?->first_name . ' ' . $std?->father?->middle_name . ' ' . $std?->father?->last_name,
                //             );

                //             $tempSortArray2[] = array(
                //                 'id' => $std->id,
                //                 'title' => $std->first_name . ' ' . $std->middle_name . ' ' . $std->last_name,
                //                 'admission_no' => $std->admission_no,
                //                 'roll' => $std?->classroomRoll?->roll_no,
                //                 'parent' => $std?->father?->first_name . ' ' . $std?->father?->middle_name . ' ' . $std?->father?->last_name
                //             );
                //         }
                //     }
                // }
                // promoted students

                if (!empty($classroom->classroomPromotedStudents)) {
                    foreach ($classroom->classroomPromotedStudents as $std) {
                        $std->load(['student.father', 'student.classroomRoll' => function ($query) use ($classroom) {
                            $query->where('classroom_id', $classroom->id);
                        }]);

                        if ($std?->student?->status?->value == 'Active') {
                            $stdSerialNo = !empty($std?->student?->classroomRoll?->roll_no) ? intval($std?->student?->classroomRoll?->roll_no) : rand(1000, 99999);
                            $tempSortArray[$stdSerialNo][] = array(
                                'id' => $std?->student?->id,
                                'title' => $std?->student?->first_name . ' ' . $std?->student?->middle_name . ' ' . $std?->student?->last_name,
                                'admission_no' => $std?->student?->admission_no,
                                'roll' => $std?->student?->classroomRoll?->roll_no,
                                'parent' => $std?->student?->father?->first_name . ' ' . $std?->student?->father?->middle_name . ' ' . $std?->student?->father?->last_name
                            );

                            $tempSortArray2[] = array(
                                'id' => $std?->student?->id,
                                'title' => $std?->student?->first_name . ' ' . $std?->student?->middle_name . ' ' . $std?->student?->last_name,
                                'admission_no' => $std?->student?->admission_no,
                                'roll' => $std?->student?->classroomRoll?->roll_no,
                                'parent' => $std?->student?->father?->first_name . ' ' . $std?->student?->father?->middle_name . ' ' . $std?->student?->father?->last_name
                            );
                        }
                    }
                }

                ksort($tempSortArray);
                $tempArray = array_values($tempSortArray);
                $tempArray2 = array_values($tempSortArray2);
                $students[$classroom->id] = $tempArray;
                $students2[$classroom->id] = $tempArray2;
            }
        }

        $classNameData = $this->classroomRepository->getActiveClassNameAndId();
        $classTitles = $classNameData->map(fn($classTitle) => ['id' => $classTitle->id, 'title' => $classTitle->title])->all();

        $subjectData = $this->subjectRepository->getActiveNameAndId();
        $subjectTitles = $subjectData->map(fn($subjectTitle) => ['id' => $subjectTitle->id, 'title' => $subjectTitle->title])->all();

        return Inertia::render('Classroom/Show', [
            'classrooms' => $classrooms,
            'students' => $students,
            'students2' => $students2,
            'classTitles' => $classTitles,
            'subjectTitles' => $subjectTitles,
            'classId' => $classNameId,
            'subjectId' => $subjectId,
        ]);
    }

    /**
     * form of assign order.
     */
    public function createAssignOrder(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();
        return Inertia::render('Classroom/ClassOrderSave', [
            'classrooms' => $classrooms,
        ]);
    }

    /**
     * save of assign order.
     */
    public function saveAssignOrder(Request $request)
    {
        if (!empty($request->input('classroom_ids'))) {
            foreach ($request->input('classroom_ids') as $classroom) {
                $dataArray = array(
                    'display_order' => $classroom['order'],
                );

                $result = $this->classroomRepository->update($classroom['id'], $dataArray);
            }
            if ($result) {
                return redirect()->route('classroom.time_table_list')->with('message', 'Assign roll successfully.');
            }
        }
    }

    /**
     * Display the classes with teacher save.
     */
    public function createAssignRoll(int $id): Response
    {
        $classroom = $this->classroomRepository->getByIdForAssignRoll($id);
        $students = $this->studentRepository->getAllByClassroomId($id);
        $rollData = $this->classroomRollRepository->getRollsFromClassroomId($id);
        $rollArray = $rollData->map(fn($roll) => ['studentId' => $roll->student_id, 'studentRoll' => $roll->roll_no])->all();
        $rollTempArray = array();
        if (!empty($rollData)) {
            foreach ($rollData as $roll) {
                $rollTempArray[$roll->student_id] = $roll->roll_no;
            }
        }

        $tempSortArray = array();
        if (!empty($students)) {
            foreach ($students as $std) {
                $stdSerialNo = !empty($rollTempArray[$std->id]) ? $rollTempArray[$std->id] : rand(1000, 9999);
                $tempSortArray[$stdSerialNo][] = $std;
            }
        }
        ksort($tempSortArray);
        $studentsSortData = array_values($tempSortArray);

        return Inertia::render('Classroom/AssignRollSave', [
            'classroom' => $classroom,
            'studentsSortData' => $studentsSortData,
            'students' => $students,
            'rolls' => $rollArray,
        ]);
    }

    /**
     * assign display order
     */
    public function assignDisplayOrder(Request $request)
    {
        if (!empty($request->input('classroom_ids'))) {
            foreach ($request->input('classroom_ids') as $classroom) {
                $dataArray = array(
                    'display_order' => $classroom['value'] ?? 0,
                );
                $assignOrder = $this->classroomRepository->update($classroom['id'], $dataArray);
            }
            if ($assignOrder) {
                return redirect()->route('classroom.time_table_list')->with('message', 'Assign order successfully.');
            }
        }
    }


    public function assignStudentRollSave(Request $request)
    {
        DB::beginTransaction();

        try {
            if (!empty($request->input('student_rolls'))) {
                foreach ($request->input('student_rolls') as $roll) {
                    $checkArray = array(
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'classroom_id' => $request->input('classroom_id'),
                        'student_id' => $roll['studentId'],
                    );

                    $dataArray = array(
                        'roll_no' => $roll['studentRoll'],
                        'status' => Status::ACTIVE->value,
                    );

                    $this->classroomRollRepository->updateOrCreate($dataArray, $checkArray);
                }
            }

            DB::commit();

            return redirect()->route('classroom.time_table_list')->with('message', 'Assign roll successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    public function assignStudentRollSaveOld(Request $request)
    {

        if (!empty($request->input('student_rolls'))) {
            foreach ($request->input('student_rolls') as $roll) {
                $dataArray = array(
                    'school_id' => getUserSchoolId(),
                    'classroom_id' => $request->input('classroom_id'),
                    'student_id' => $roll['studentId'],
                    'roll_no' => $roll['studentRoll'],
                    'status' => Status::ACTIVE->value,
                    'academic_year_id' => getAcademicYearId(),
                );

                $checkArray = array(
                    'school_id' => getUserSchoolId(),
                    'classroom_id' => $request->input('classroom_id'),
                    'student_id' => $roll['studentId'],
                );

                //dd($dataArray, $checkArray);

                $assignRoll = $this->classroomRollRepository->updateOrCreate($dataArray, $checkArray);
            }
            if ($assignRoll) {
                return redirect()->route('classroom.time_table_list')->with('message', 'Assign roll successfully.');
            }
        }
    }


    public function assignClassMonitor(Request $request, int $id)
    {
        if (!empty($request->input('class_monitor_id')) && is_numeric($request->input('class_monitor_id'))) {
            $dataArray = [
                'class_monitor_id' => $request->input('class_monitor_id'),
            ];
            $classMonitor = $this->classroomRepository->update($id, $dataArray);
            if ($classMonitor) {
                return redirect()->route('classroom.time_table_list')->with('message', 'Assign monitor successfully.');
            }
        }
    }


    /**
     * Create Timeable
     */
    public function createTimetable(Request $request): Response
    {
        $dayTitles = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ];
        $classrooms = [];
        $subjects = [];

        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classroomId = null;

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;

            if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value]) && !empty($classroomId)) {
                $subjects = $this->subjectRepository->getSubjectsByClassroomId($classroomId);
            } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId) && !empty($classroomId)) {
                $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassroomId($teacherId, $classroomId);
            }
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classrooms = $this->classroomRepository->getActiveAll();
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId);
        }

        $shiftTypes = [];

        foreach (SchoolShiftType::cases() as $case) {
            if ($case->value != SchoolShiftType::NIGHT->value) {
                array_push($shiftTypes, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        return Inertia::render('Classroom/Create', [
            'classrooms' => $classrooms,
            'subjects' => $subjects,
            'dayTitles' => $dayTitles,
            'shiftTypes' => $shiftTypes
        ]);
    }

    public function createTimetableOld(Request $request): Response
    {
        $class_names = $this->classroomRepository->getAllActiveClassName();
        $student_subjects = $this->classroomRepository->getSubject();

        // get subject
        $subject_titles = [];
        foreach ($student_subjects as $subject) {
            $subject_titles[] = [
                'id' => $subject->id,
                'title' => $subject->title
            ];
        }
        // get grade
        $subject_grades = [];
        foreach ($student_subjects as $grade) {
            $subject_grades[] = [
                'id' => $grade->grade,
                'title' => $grade->grade
            ];
        }

        // get class name
        $classNames = [];
        foreach ($class_names as $className) {
            $classNames[] = [
                'id' => $className->id,
                'title' => $className->title
            ];
        }

        return Inertia::render('Classroom/Create', [
            'subject_titles' => $subject_titles,
            'subject_grades' => $subject_grades,
            'classNames' => $classNames,
        ]);
    }

    /**
     * Save Timetable
     */
    public function saveTimetable(TimetableRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $classroom = $this->classroomRepository->getClassroomById($input['classroom_id']);

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'academic_year_id' =>  $classroom?->academic_year_id ?? getAcademicYearId(),
            'classroom_id' => $input['classroom_id'] ?? null,
            'subject_id' => $input['subject_id'] ?? null,
            'user_id' => auth()->user()->id,
            'shift_type' => $input['shift_type'] ?? null,
            'start_date' => !empty($input['start_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
            'start_time' => !empty($input['start_time']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_time'])->timezone(getSchoolTimeZone())->format('H:i:s') : date('H:i:s'),
            'end_time' => !empty($input['end_time']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_time'])->timezone(getSchoolTimeZone())->format('H:i:s') : date('H:i:s'),
            'notes' => $input['notes'] ?? null,
            'repeat_date' => !empty($input['repeat_date']) ?  Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['repeat_date'])->timezone(getSchoolTimeZone())->toDateString() : null,
            'repeatable_days' => !empty($input['repeat_date']) && !empty($input['repeatable_days']) ? json_encode($input['repeatable_days']) : null,
            'status' => Status::ACTIVE,
            'type' => $input['type'] ?? null
        ];

        $timetable = $this->classroomRepository->createTimeTable($dataArray);

        if (!$timetable) {
            return redirect()->back()->with('errors', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Timetable created successfully.');
    }

    public function saveTimetableOld(ClassroomRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = [
            'school_id' => getUserSchoolId(),
            'subject_id' => $input['subject_id'] ?? '',
            'class_name_id' => $input['class_name_id'] ?? '',
            'grade' => $input['grade'] ?? '',
            'start_time_at' => !empty($input['start_time_at']) ? \Carbon\Carbon::parse($input['start_time_at'])->format('H:i:s') : date('Y-m-d'),
            'end_time_at' => !empty($input['end_time_at']) ? \Carbon\Carbon::parse($input['end_time_at'])->format('H:i:s') : date('Y-m-d'),
            'start_date_at' => !empty($input['start_date_at']) ? \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'end_date_at' => !empty($input['end_date_at']) ? \Carbon\Carbon::parse($input['end_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'live_class_url' => '',
            'class_notes' => $input['class_notes'] ?? '',
            'is_online_class' => false,
            'status' => Status::ACTIVE
        ];

        if (!empty($input['classDays'])) {
            $days = implode(", ", $input['classDays']);
            $dataArray['class_day'] = $days;
            $dataArray['title'] = \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') . ' - ' . \Carbon\Carbon::parse($input['end_date_at'])->format('Y-m-d');
            $online_class = $this->classroomRepository->create($dataArray);
        }
        if (!$online_class) {
            return redirect()->route('classroom.time_table_list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('classroom.time_table_list')->with('message', 'Class created successfully.');
    }

    /**
     * Display the user's profile form.
     */
    public function assignClassTeacher(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();
        $teachers = $this->teacherRepository->getActiveAll();
        $teacherArray = $teachers->map(fn($teacher) => ['id' => $teacher->id, 'title' => $teacher->first_name . ' ' . $teacher->middle_name . ' ' . $teacher->last_name])->all();
        $selectedTeachers = $classrooms->map(fn($classroom) => $classroom->class_teacher_id)->all();

        return Inertia::render('Classroom/AssignClassTeacher', [
            'classrooms' => $classrooms,
            'teachers' => $teacherArray,
            'selectedTeachers' => $selectedTeachers,
        ]);
    }


    /**
     * assignClassTeacherSave
     */
    public function assignClassTeacherSave(Request $request)
    {
        if (!empty($request->input('teacher_ids'))) {
            foreach ($request->input('teacher_ids') as $st) {
                $dataArray = array(
                    'class_teacher_id' => $st['id'] ?? Null,
                );

                if (!empty($st['classroom_id'])) {
                    $assignTeacher = $this->classroomRepository->update($st['classroom_id'], $dataArray);
                }
            }

            return redirect()->route('classroom.time_table_list')->with('message', 'Teacher assign successfully.');
        }
    }

    /**
     * Update the user's profile information.
     */
    public function saveClassTeacher(ClassroomRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $school = $this->classroomRepository->create();

        return Redirect::route('classroom.list');
    }

    /**
     * Display the user's profile form.
     */
    public function editTimeTable(String $id): Response
    {

        $classrooms = $this->classroomRepository->getById($id);
        $student_subjects = $this->classroomRepository->getSubject();
        $class_names = $this->classroomRepository->getAllActiveClassName();

        // get subject
        $subject_titles = [];
        foreach ($student_subjects as $subject) {
            $subject_titles[] = [
                'id' => $subject->id,
                'title' => $subject->title
            ];
        }

        // get grade
        $subject_grades = [];
        foreach ($student_subjects as $grade) {
            $subject_grades[] = [
                'id' => $grade->grade,
                'title' => $grade->grade
            ];
        }

        // get class name
        $classNames = [];
        foreach ($class_names as $className) {
            $classNames[] = [
                'id' => $className->id,
                'title' => $className->title
            ];
        }

        return Inertia::render('Classroom/Edit', [
            'subject_titles' => $subject_titles,
            'subject_grades' => $subject_grades,
            'classNames' => $classNames,
            'classrooms' => $classrooms
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function updateTimeTable(ClassroomRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = [
            'subject_id' => $input['subject_id'] ?? '',
            'class_name_id' => $input['class_name_id'] ?? '',
            'grade' => $input['grade'] ?? '',
            'start_time_at' => !empty($input['start_time_at']) ? \Carbon\Carbon::parse($input['start_time_at'])->format('H:i:s') : date('Y-m-d'),
            'end_time_at' => !empty($input['end_time_at']) ? \Carbon\Carbon::parse($input['end_time_at'])->format('H:i:s') : date('Y-m-d'),
            'start_date_at' => !empty($input['start_date_at']) ? \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'end_date_at' => !empty($input['end_date_at']) ? \Carbon\Carbon::parse($input['end_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'class_notes' => $input['class_notes'] ?? ''
        ];

        if (!empty($input['classDays'])) {
            $days = implode(", ", $input['classDays']);
            $dataArray['class_day'] = $days;
            $dataArray['title'] = \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') . ' - ' . \Carbon\Carbon::parse($input['end_date_at'])->format('Y-m-d');
            $classrooms = $this->classroomRepository->update($id, $dataArray);
        }
        if (!$classrooms) {
            return redirect()->route('classroom.time_table_list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('classroom.time_table_list')->with('message', 'Class updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroyTimeTable(string $id): RedirectResponse
    {
        $classrooms = $this->classroomRepository->getById($id);
        if (!$classrooms) {
            return redirect()->route('classroom.time_table_list')->with('errors', 'Something goes wrong.');
        }
        $classrooms->delete($id);
        return redirect()->route('classroom.time_table_list')->with('message', 'Class deleted successfully.');
    }



    /**
     * Display the class name.
     */
    public function className(Request $request): Response
    {
        $classNames = $this->classroomRepository->getAllActiveClassName();
        //use class name id as foreign key id
        $newSections = array();

        if (!empty($classNames)) {
            $classNames->loadMissing(['students2:id,class_name_id', 'promotedStudents:id,class_name_id']);

            foreach ($classNames as $class) {
                $sectionString = "";
                $clsroomArray = [];
                $sections = !empty($class->sections[0]->title) ? json_decode($class->sections[0]->title) : [];
                $sectionCount = count($sections);
                foreach ($sections as $secKey => $section) {
                    $sectionString .= ($sectionCount > ++$secKey) ? $section->title . ', ' : $section->title;
                }

                if (!empty($class->classrooms)) {
                    foreach ($class->classrooms as $clroom) {
                        array_push($clsroomArray, ['id' => $clroom->id, 'title' => $clroom->title]);
                    }
                }

                $newClassArray = array(
                    'id' => $class->id,
                    'school_id' => $class->school_id,
                    'academic_year_id' => getAcademicYearId(),
                    'title' => $class->title,
                    'sections' => $sectionString,
                    'classrooms' => $clsroomArray,
                    'can_delete' => $class?->students2?->count() == 0 && $class?->promotedStudents?->count() == 0
                );

                array_push($newSections, $newClassArray);
            }
        }

        return Inertia::render('Classroom/CreateClassName', [
            'classNames' => $newSections,
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function saveClassName(ClassNameRequest $request)
    {
        $input = $request->validated();

        // create class
        $dataArray = [
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'title' => trim($input['title']) ?? '',
            'description' => $input['description'] ?? '',
            'status' => Status::ACTIVE,
        ];
        $className = $this->classroomRepository->classNameCreate($dataArray);

        // create sections
        if (!empty($input['sections'])) {
            $jsonTitles = array();
            foreach ($input['sections'] as $sKey => $title) {
                array_push($jsonTitles, ['order_id' => ++$sKey, 'title' => trim($title)]);

                // create classroom
                $crArray = array(
                    'school_id' => getUserSchoolId(),
                    'class_name_id' => $className->id,
                    'academic_year_id' => getAcademicYearId(),
                    'class_monitor_id' => null,
                    'class_teacher_id' => null,
                    'title' => trim($input['title']) . ' ' .  trim($title),
                    'section_title' => trim($title),
                    'status' => Status::ACTIVE,
                );
                $this->classroomRepository->create($crArray);
            }

            // create section
            $sectionArray = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'class_name_id' => $className->id,
                'title' =>  json_encode($jsonTitles),
                'description' => $input['description'] ?? '',
                'display_order' => 0,
                'status' => Status::ACTIVE,
            ];
            $className = $this->sectionRepository->create($sectionArray);
        } else {
            // crreate classroom
            $crArray = array(
                'school_id' => getUserSchoolId(),
                'class_name_id' => $className->id,
                'academic_year_id' => getAcademicYearId(),
                'class_monitor_id' => null,
                'class_teacher_id' => null,
                'title' => trim($input['title']),
                'section_title' => "",
                'status' => Status::ACTIVE,
            );
            $this->classroomRepository->create($crArray);
        }

        if (!$className) {
            return redirect()->route('class_name.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('class_name.list')->with('message', 'Class name created successfully.');
    }

    public function classNameEdit(string $id)
    {
        $classNames = $this->classroomRepository->getAllActiveClassName();

        $newSections = array();

        if (!empty($classNames)) {
            foreach ($classNames as $class) {
                $sectionString = "";
                $sections = !empty($class->sections[0]->title) ? json_decode($class->sections[0]->title) : [];
                $sectionCount = count($sections);
                foreach ($sections as $secKey => $section) {
                    $sectionString .= ($sectionCount > ++$secKey) ? $section->title . ', ' : $section->title;
                }

                $newClassArray = array(
                    'id' => $class->id,
                    'school_id' => $class->school_id,
                    'title' => $class->title,
                    'sections' => $sectionString
                );

                array_push($newSections, $newClassArray);
            }
        }

        $className = $this->classroomRepository->getActiveClassNameById($id);
        $sections = array();

        if (!empty($className->sections)) {
            foreach ($className->sections as $section) {
                $titleArray = json_decode($section->title);
                if (!empty($titleArray)) {
                    foreach ($titleArray as $obj) {
                        array_push($sections, $obj->title);
                    }
                }
            }
        }

        // dd($className);

        return Inertia::render('Classroom/EditClassName', [
            'classNames' => $newSections,
            'className' => $className,
            'dataSections' => $sections
        ]);
    }

    // update class name
    public function classNameUpdate(ClassNameRequest $request, $id)
    {
        $input = $request->validated();
        // update class name
        $jsonTitles = array();
        $dataArray = [
            'title' => trim($input['title']) ?? '',
            'description' => $input['description'] ?? '',
            'status' => Status::ACTIVE,
        ];
        $className = $this->classroomRepository->classNameModelUpdate($id, $dataArray);

        $oldSections = !empty($input['old_sections']) ? $input['old_sections'] : [];
        $newSections = !empty($input['sections']) ? $input['sections'] : [];

        $mergeSections = array_unique(array_merge($newSections, $oldSections));

        $loopCount = 0;
        foreach ($mergeSections as $sKey => $title) {
            // get existing classroom
            $existingClassroom = $this->classroomRepository->getByClassNameParams(
                getUserSchoolId(),
                intval($id),
                getAcademicYearId(),
                $input['old_title'] . ' ' .  trim($title)
            );

            // check in new sections
            if (in_array($title, $newSections)) {

                array_push($jsonTitles, ['order_id' => ++$loopCount, 'title' => $title]);
                // update classroom
                if (!empty($existingClassroom->id)) {
                    $crArray = array(
                        'title' => trim($input['title']) . ' ' .  trim($title),
                        'section_title' => trim($title),
                    );
                    $this->classroomRepository->update($existingClassroom->id, $crArray);
                } else {
                    // create classroom
                    $crArray = array(
                        'school_id' => getUserSchoolId(),
                        'class_name_id' => $id,
                        'academic_year_id' => getAcademicYearId(),
                        'class_monitor_id' => null,
                        'class_teacher_id' => null,
                        'title' => trim($input['title']) . ' ' .  trim($title),
                        'section_title' => trim($title),
                        'status' => Status::ACTIVE,
                    );
                    $this->classroomRepository->create($crArray);
                }
            }
            // check in old sections
            else if (!empty($existingClassroom->id) && in_array($title, $oldSections)) {
                $existStudent = $this->studentRepository->existStudentFromClassId($existingClassroom->id);

                if ($existStudent > 0)
                    array_push($jsonTitles, ['order_id' => ++$loopCount, 'title' => $title]);
                else
                    $this->classroomRepository->delete($existingClassroom->id);
            }
        }

        // update section
        asort($jsonTitles);
        $sectionArray = [
            'school_id' => getUserSchoolId(),
            'class_name_id' => $id,
            'title' =>  json_encode($jsonTitles),
            'details' => '',
            'display_order' => 0,
            'status' => Status::ACTIVE,
        ];
        // check sections
        $existSection = $this->sectionRepository->existSectionsByClassId($id);
        if ($existSection > 0) {
            $sectionName = $this->sectionRepository->updateByClassNameId($id, $sectionArray);
        } else {
            $sectionName = $this->sectionRepository->create($sectionArray);
        }

        if (!$className) {
            return redirect()->route('class_name.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('class_name.list')->with('message', 'Class name updated successfully.');
    }

    /**
     * Class name delete
     */
    public function classNameDestroy(string $id): RedirectResponse
    {
        $this->sectionRepository->deleteFromClassId($id);
        $className = $this->classroomRepository->classNameDelete($id);
        if (!$className) {
            return redirect()->route('class_name.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('class_name.list')->with('message', 'Class name deleted successfully.');
    }

    /**
     * Class Timetable
     */
    public function viewClassTimetable(Request $request): Response
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $shiftTypes = [];
        $classrooms = [];

        foreach (SchoolShiftType::cases() as $case) {
            if ($case->value != SchoolShiftType::NIGHT->value) {
                array_push($shiftTypes, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classrooms = $this->classroomRepository->getActiveAll();
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId);
        }

        $classroomId = null;
        $shiftType = "";

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $shiftType = $request->shift_type ?? "";
        }

        $timetables = $this->classroomRepository->getTimeTableActiveAll($shiftType, $classroomId);

        $teacherIds = $timetables->flatMap(function ($period) {
            return collect($period->subject->classroomSubjects ?? [])
                ->flatMap(function ($subject) {
                    $teachersData = json_decode($subject->teachers_data, true);
                    return collect($teachersData)->pluck('teacher_id');
                });
        })->unique()->values()->toArray();

        $teachers = $this->teacherRepository->getByIds($teacherIds)
            ->keyBy('id');

        $timeTablesWithTeachers = $timetables->map(function ($period) use ($teachers) {
            $periodData = $period->toArray();

            if (isset($period->subject->classroomSubjects)) {
                $teachersData = collect($period->subject->classroomSubjects)
                    ->map(function ($subject) use ($teachers) {
                        $teacherJson = json_decode($subject->teachers_data, true);

                        return collect($teacherJson)->map(function ($teacherData) use ($teachers) {
                            $teacherId = $teacherData['teacher_id'];
                            return array_merge(
                                $teacherData,
                                ['teacher_details' => $teachers[$teacherId] ?? null]
                            );
                        });
                    })->flatten(1);

                $periodData['teachers'] = $teachersData;
            }

            return $periodData;
        });

        return Inertia::render('ClassTimetable/Show', [
            'shiftTypes' => $shiftTypes,
            'classrooms' => $classrooms,
            'timetables' => $timeTablesWithTeachers,
        ]);
    }

    /**
     * Class Timetable
     */
    public function viewTeacherTimetable(Request $request): Response
    {
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $shiftTypes = [];

        foreach (SchoolShiftType::cases() as $case) {
            if ($case->value != SchoolShiftType::NIGHT->value) {
                array_push($shiftTypes, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        $shiftType = "";

        if ($request->isMethod('POST')) {
            $shiftType = $request->shift_type ?? "";
        }

        $timetables = $this->classroomRepository->getTeacherTimeTableActiveAll($shiftType);

        $teacherIds = $timetables->flatMap(function ($period) {
            return collect($period->subject->classroomSubjects ?? [])
                ->flatMap(function ($subject) {
                    $teachersData = json_decode($subject->teachers_data, true);
                    return collect($teachersData)->pluck('teacher_id');
                });
        })->unique()->values()->toArray();

        $teachers = $this->teacherRepository->getByIds($teacherIds)
            ->keyBy('id');

        $timeTablesWithTeachers = $timetables->map(function ($period) use ($teachers) {
            $periodData = $period->toArray();

            if (isset($period->subject->classroomSubjects)) {
                $teachersData = collect($period->subject->classroomSubjects)
                    ->map(function ($subject) use ($teachers) {
                        $teacherJson = json_decode($subject->teachers_data, true);

                        return collect($teacherJson)->map(function ($teacherData) use ($teachers) {
                            $teacherId = $teacherData['teacher_id'];
                            return array_merge(
                                $teacherData,
                                ['teacher_details' => $teachers[$teacherId] ?? null]
                            );
                        });
                    })->flatten(1);

                $periodData['teachers'] = $teachersData;
            }

            return $periodData;
        });

        return Inertia::render('TeacherTimetable/Show', [
            'shiftTypes' => $shiftTypes,
            'timetables' => $timeTablesWithTeachers,
        ]);
    }
}
