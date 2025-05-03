<?php

namespace App\Http\Controllers;

use Exception;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Enums\ClassSubjectType;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use App\Enums\ClassSubjectGradeType;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\SubjectRequest;
use Illuminate\Http\RedirectResponse;
use App\Repositories\SubjectRepository;
use App\Repositories\TeacherRepository;
use App\Repositories\AcademicRepository;
use App\Repositories\ISubjectRepository;
use App\Repositories\ITeacherRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ClassroomRepository;
use App\Repositories\IAcademicRepository;
use App\Http\Requests\ClassSubjectRequest;
use App\Repositories\IClassroomRepository;
use App\Http\Requests\SubjectAssignRequest;
use App\Http\Requests\ClassroomSubjectRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Repositories\ClassroomSubjectRepository;
use App\Repositories\IClassroomSubjectRepository;

class SubjectController extends Controller
{
    public function __construct(
        private ITeacherRepository $teacherRepository,
        private IClassroomSubjectRepository $classroomSubjectRepository,
        private IClassroomRepository $classroomRepository,
        private ISubjectRepository $subjectRepository,
        private IAcademicRepository $academicRepository,
    ) {
        $this->middleware('permission:view classes', ['only' => ['index', 'assignTeacher']]);
        $this->middleware('permission:add classes', ['only' => ['saveAssignTeacher', 'syncSubjectToClass', 'assignToClass', 'assignToClassSave',
            'create', 'save', 'assignToClassNewDesign', 'assignToClassNewDesignSave']]);
        $this->middleware('permission:edit classes', ['only' => ['edit', 'update', 'assignToClassUpdate', 'assignToClassNewDesignUpdate', 'assignToClassSubjectBulk']]);
        $this->middleware('permission:delete classes', ['only' => ['destroy', 'assignSubjectDestroy', 'assignToClassNewDesignDelete']]);
    }

    /**
     * subjects.
     */
    public function index(Request $request): Response
    {
        $subjects = $this->subjectRepository->getActiveAll();
        $eLearningSubjects = $this->subjectRepository->getActiveELearningSubjectNameAndId();

        return Inertia::render('Subject/Show', [
            'subjects' => $subjects,
            'eLearningSubjects' => $eLearningSubjects,
        ]);
    }

    /**
     * Form assign teacher in subject.
     */
    public function assignTeacher(Request $request, $id): Response
    {
        // dd($id);
        $subjects = array();

        $teachers = $this->teacherRepository->getActiveAll();
        $classroomSubjects = $this->classroomSubjectRepository->getSubjectsFromClassId($id);

        $teacherArray = $teachers->map(fn ($teacher) => [
            'id' => $teacher->id,
            'title' => getCocatenationTitle($teacher->first_name, $teacher->middle_name, $teacher->last_name)
        ])->all();
        $selectedTeachers = array(); // $classroomSubjects->map(fn ($classroom) => ['id' => $classroom->id, 'title' => $classroom->first_name . ' ' . $classroom->middle_name . ' ' . $classroom->last_name, 'subject_id' => $classroom->subject_id])->all();
        $tempTArray = array();
        foreach ($classroomSubjects as $classSubject) {
            $jsonTeachers = !empty($classSubject->teachers_data) ? json_decode($classSubject->teachers_data) : Null;
            if (!empty($jsonTeachers)) {

                foreach ($jsonTeachers as $teacherKey => $teacher) {
                    $tempArray = array(
                        'id' => $teacher->teacher_id ?? null,
                        'title' => $teacher->teacher_name ?? null,
                        'subject_id' => $classSubject->subject_id
                    );
                    array_push($selectedTeachers, $tempArray);
                    array_push($tempTArray, $teacher->teacher_id);
                }
            }

            $temp2Array = array(
                'id' => $classSubject->subject_id ?? null,
                'subject_id' => $classSubject->subject_id ?? null,
                'title' => $classSubject->title ?? null,
                'teacher_id' => $tempTArray
            );
            array_push($subjects, $temp2Array);
        }

        return Inertia::render('Subject/AssignSubjectTeacher', [
            'subjects' => $subjects,
            'teachers' => $teacherArray,
            'selectedTeachers' => $selectedTeachers,
            'id' => $id
        ]);
    }

    /**
     * Save assign teacher in subject.
     */
    public function saveAssignTeacher(Request $request, $id)
    {
        if (!empty($request->input('teacher_ids'))) {
            $teacherArray = array();
            $dataArray = array();
            //prepare data
            foreach ($request->input('teacher_ids') as $st) {

                if (!empty($teacherArray[$st['subject_id']])) {
                    array_push($teacherArray[$st['subject_id']], array('teacher_id' => $st['id'], 'teacher_name' => $st['title']));
                } else {
                    $teacherArray[$st['subject_id']][] = array('teacher_id' => $st['id'], 'teacher_name' => $st['title']);
                }
            }

            if (!empty($request->input('teacher_ids'))) {

                // dd($request->input('teacher_ids'));

                //prepare data
                foreach ($request->input('teacher_ids') as  $st) {
                    $dataArray = array(
                        'school_id' => getUserSchoolId(),
                        'classroom_id' => $id,
                        'subject_id' => $st['subject_id'],
                        'teachers_data' => !empty($teacherArray[$st['subject_id']]) ? json_encode($teacherArray[$st['subject_id']]) : Null,
                    );

                    $checkArray = array(
                        'school_id' => getUserSchoolId(),
                        'classroom_id' => $id,
                        'subject_id' => $st['subject_id'],
                    );

                    $this->classroomSubjectRepository->updateOrCreateClassroomSubject($checkArray, $dataArray);
                }

                return redirect()->route('classroom.time_table_list')->with('message', 'Teacher assign successfully.');
            }


            return redirect()->route('classroom.time_table_list')->with('message', 'Teacher assign successfully.');
        }
    }

    /**
     * Display sync subjects.
     */
    public function syncSubjectToClass(Request $request): Response
    {
        $subjects = $this->subjectRepository->getActiveAll();
        $teachers = $this->teacherRepository->getActiveAll();
        $teacherArray = $teachers->map(fn ($teacher) => ['id' => $teacher->id, 'title' => $teacher->first_name . ' ' . $teacher->middle_name . ' ' . $teacher->last_name])->all();

        return Inertia::render('Subject/SyncSubjectsToClass', [
            'subjects' => $subjects,
            'teachers' => $teacherArray,
        ]);
    }

    /**
     * assign subject to class.
     */
    public function assignToClass(Request $request): Response
    {

        $classId = !empty($_GET['class']) ? $_GET['class'] : null;

        if ($request->isMethod('post')) {
            $classId = $request->input('classroom_id');
        }

        // subject type
        $classSubjectType = ClassSubjectType::cases();
        $classSubjectTypes = array();
        foreach ($classSubjectType as $type) {
            array_push($classSubjectTypes, ['id' => $type->value, 'title' => $type->value]);
        }

        // subject type
        $classGradeType = ClassSubjectGradeType::cases();
        $classGradeTypes = array();
        foreach ($classGradeType as $gType) {
            array_push($classGradeTypes, ['id' => $gType->value, 'title' => $gType->value]);
        }

        $academic_grades =  $this->academicRepository->getActiveAllGradeNameId();

        $academic_grade_data = $academic_grades->map(fn ($academic_grade) => ['id' => $academic_grade->id, 'title' => $academic_grade->scale_name])->all();

        $subjects = $this->subjectRepository->getActiveAll();
        $dataArray = $this->classroomSubjectRepository->getSubjectsFromClassId($classId);
        $classrooms = $this->classroomRepository->getActiveAll();

        $assignedSubjects = $this->classroomSubjectRepository->getClassroomSubjectsByClassroomId($classId);

        return Inertia::render('Subject/AssignToClass', [
            'dataArray' => $dataArray,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'assignedSubjects' => $assignedSubjects,
            'classId' => $classId,
            'classSubjectTypes' => $classSubjectTypes,
            'academic_grade_data' => $academic_grade_data,
        ]);
    }


    /**
     * assignToClassSave
     */
    public function assignToClassSave(SubjectAssignRequest $request)
    {
        $input = $request->validated();
        $subject = $this->subjectRepository->getById($input['subject_id']);

        DB::beginTransaction();

        try {
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'classroom_id' => $input['classroom_id'] ?? null,
                'subject_id' => $input['subject_id'] ?? null,
                'academic_grade_id' => $input['academic_grade_id'] ?? null,
                'grade_scale' => $input['academic_grade_id'] ?? "",
                'title' => !empty($subject->title) ? $subject->title : "",
                'type' => $input['type'] ?? "",
                'display_order' => intval($input['display_order']) ?? null,
                'is_marking' => $input['is_marking'] ?? false,
                'status' => Status::ACTIVE,
            );

            $checkArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'classroom_id' => intval($input['classroom_id']) ?? null,
                'subject_id' => intval($input['subject_id']) ?? null,
            );

            $this->classroomSubjectRepository->updateOrCreateClassroomSubject($checkArray, $dataArray);

            DB::commit();

            return redirect()->route('subject.assign_to_class', ['class' => $input['classroom_id'], 'id' => $input['classroom_id']])->with('message', 'Subject assign successfully.');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()->route('subject.assign_to_class', ['class' => $input['classroom_id'], 'id' => $input['classroom_id']])->with('error', 'Something goes wrong.');
        }
    }



    /**
     * assignSubjectDestroy
     */
    public function assignSubjectDestroy(int $id): RedirectResponse
    {
        DB::beginTransaction();

        try {
            $classroomSubject = $this->classroomSubjectRepository->getById($id);

            $classroomSubject->loadMissing(['examDate']);

            if ($classroomSubject?->examDate != null) {
                return redirect()->back()->with('error', 'Subject cannot be removed at this stage!');
            }

            $classroomSubject->delete();

            // $this->classroomSubjectRepository->delete($id);

            DB::commit();

            return redirect()->back()->with('message', 'Deleted successfully.');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }


    /**
     * assignToClassUpdate
     */
    public function assignToClassUpdate(SubjectAssignRequest $request)
    {

        $input = $request->validated();
        $subject = $this->subjectRepository->getById($input['subject_id']);
        try {
            DB::beginTransaction();
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'classroom_id' => $input['classroom_id'] ?? null,
                'subject_id' => $input['subject_id'] ?? null,
                'academic_grade_id' => $input['academic_grade_id'] ?? null,
                'grade_scale' => $input['academic_grade_id'] ?? "",
                'title' => !empty($subject->title) ? $subject->title : "",
                'type' => $input['type'] ?? "",
                'display_order' => intval($input['display_order']) ?? null,
                'is_marking' => $input['is_marking'] ?? false,
                'status' => Status::ACTIVE,
            );

            $this->classroomSubjectRepository->update($input['id'], $dataArray);
            DB::commit();

            return redirect()->route('subject.assign_to_class', ['class' => $input['classroom_id']])->with('message', 'Update successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('subject.assign_to_class', ['class' => $input['classroom_id']])->with('error', 'Something goes wrong.');
        }
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Subject/Create', [
            'status' => session('status'),
        ]);
    }

    /**
     * subject save.
     */
    public function save(SubjectRequest $request): RedirectResponse
    {
        $input = $request->validated();
        try {
            DB::beginTransaction();
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'e_learning_subject_id' => $input['e_learning_subject_id'] ?? null,
                'title' => $input['title'] ?? null,
                'grade' => $input['grade'] ?? null,
                'short_title' => $input['short_title'] ?? null,
                'is_practical_paper' => $input['is_practical_paper'],
                'is_co_scholastic' => $input['is_co_scholastic'],
                'status' => Status::ACTIVE,
            );
            $this->subjectRepository->updateOrCreate(['id' => $input['id']], $dataArray);
            DB::commit();
            return redirect()->route('subject.list')->with('message', 'Save successfully.');
        } catch (Exception $e) {
            DB::rollback();
            return redirect()->route('subject.list')->with('errors', 'Something goes wrong.');
        }
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Subject/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(SubjectRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'title' => $input['title'] ?? "",
            'grade' => $input['grade'] ?? "",
            'short_title' => $input['short_title'] ?? "",
        );
        $subject = $this->subjectRepository->update($id, $dataArray);
        if (!$subject) {
            return redirect()->route('subject.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('subject.list')->with('message', 'Subject updated successfully.');
    }

    /**
     * Delete subject.
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            DB::beginTransaction();
            $this->subjectRepository->delete($id);
            DB::commit();
            return redirect()->route('subject.list')->with('message', 'Deleted successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('subject.list')->with('error', 'Something goes wrong.');
        }
    }

    /**
     * Assign New subjects to class.
     */
    public function assignToClassNewDesign(Request $request): Response
    {
        $classSubjects = [];
        $classNameId = !empty($_GET['class']) ? $_GET['class'] : null;

        if ($request->isMethod('post')) {
            $classNameId = $request->input('class_name_id');

            if (!empty($classNameId)) {
                $classSubjects = $this->classroomSubjectRepository->getActiveAllClassSubjectByClassId($classNameId);
            }
        }

        $subjects = $this->subjectRepository->getActiveAll();
        $classnames = $this->classroomRepository->getActiveClassNameAndId();
        $subjectGroup = $this->subjectRepository->getActiveSubjectGroupNameAndId();

        // subject type
        $classSubjectType = ClassSubjectType::cases();
        $classSubjectTypes = array();
        foreach ($classSubjectType as $type) {
            array_push($classSubjectTypes, ['id' => $type->value, 'title' => $type->value]);
        }

        //grade type
        $gradeScaleData = $this->academicRepository->getActiveAllGradeNameId();

        $grades = $gradeScaleData->map(fn ($gradeScale) => [
            'id' => $gradeScale->id,
            'title' => $gradeScale->scale_name,
        ])->all();

        return Inertia::render('Subject/ShowNewDesign', [
            'subjects' => $subjects,
            'classSubjectTypes' => $classSubjectTypes,
            'grades' => $grades,
            'classSubjects' => $classSubjects,
            'classnames' => $classnames,
            'subjectGroup' => $subjectGroup,
            'classNameId' => $classNameId,
        ]);
    }

    /**
     * Assign New subjects to class.
     */
    public function assignToClassNewDesignOld(Request $request): Response
    {
        $classSubjects = [];
        $classNameId = !empty($_GET['class']) ? $_GET['class'] : null;

        if ($request->isMethod('post')) {
            $classNameId = $request->input('class_name_id');
        }

        $classSubjects = $this->classroomSubjectRepository->getActiveAllClassSubjectByClassId($classNameId);

        $subjects = $this->subjectRepository->getActiveAll();
        $classnames = $this->classroomRepository->getActiveClassNameAndId();
        $subjectGroup = $this->subjectRepository->getActiveSubjectGroupNameAndId();

        // subject type
        $classSubjectType = ClassSubjectType::cases();
        $classSubjectTypes = array();
        foreach ($classSubjectType as $type) {
            array_push($classSubjectTypes, ['id' => $type->value, 'title' => $type->value]);
        }

        //grade type
        $gradeScaleData = $this->academicRepository->getActiveAllGradeNameId();

        $grades = $gradeScaleData->map(fn ($gradeScale) => [
            'id' => $gradeScale->id,
            'title' => $gradeScale->scale_name,
        ])->all();

        return Inertia::render('Subject/ShowNewDesign', [
            'subjects' => $subjects,
            'classSubjectTypes' => $classSubjectTypes,
            'grades' => $grades,
            'classSubjects' => $classSubjects,
            'classnames' => $classnames,
            'subjectGroup' => $subjectGroup,
            'classNameId' => $classNameId,
        ]);
    }

    /**
     * assign to class
     */
    public function assignToClassNewDesignSave(ClassSubjectRequest $request)
    {
        $input = $request->validated();

        $classNameId = $input['class_name_id'] ?? null;
        $classrooms = [];


        DB::beginTransaction();

        try {
            // get classrooms by class id
            if (!empty($classNameId)) {
                $classrooms = $this->classroomRepository->getClassroomsFromClassId($classNameId);
            }

            $subject = $this->subjectRepository->getById($input['subject_id']);

            // create class subject
            $checkArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'class_name_id' => $input['class_name_id'] ?? null,
                'subject_id' => $input['subject_id'] ?? null,
            );

            $dataArray = array(
                'academic_grade_id' => $input['academic_grade_id'] ?? null,
                'subject_group_id' => $input['subject_group_id'] ?? null,
                'title' => !empty($subject->title) ? $subject->title : "",
                'type' => $input['type'] ?? "",
                'display_order' => intval($input['display_order']) ?? null,
                'is_marking' => $input['is_marking'] ?? false,
                'status' => Status::ACTIVE->value,
            );

            $this->classroomSubjectRepository->updateOrCreateClassSubject($checkArray, $dataArray);

            // create classroom subject
            if (!empty($classrooms)) {
                foreach ($classrooms as $classroom) {
                    $checkArray = array(
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'classroom_id' => $classroom?->id,
                        'subject_id' => $input['subject_id'] ?? null,
                    );

                    $dataArray = array(
                        'academic_grade_id' => $input['academic_grade_id'] ?? null,
                        'parent_subject_id' => $input['subject_group_id'] ?? null,
                        'title' => !empty($subject->title) ? $subject->title : "",
                        'type' => $input['type'] ?? "",
                        'display_order' => intval($input['display_order']) ?? null,
                        'is_marking' => $input['is_marking'] ?? false,
                        'status' => Status::ACTIVE->value,
                    );

                    $this->classroomSubjectRepository->updateOrCreateClassroomSubject($checkArray, $dataArray);
                }
            }

            DB::commit();

            return redirect()->route('subject.assign_to_class_new_design', ['class' => $input['class_name_id']])->with('message', 'Subject assign successfully.');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()->route('subject.assign_to_class_new_design', ['class' => $input['class_name_id']])->with('error', 'Something goes wrong.');
        }
    }


    /**
     * assign to class
     */
    public function assignToClassNewDesignSaveOld(ClassSubjectRequest $request)
    {
        $input = $request->validated();
        $subject = $this->subjectRepository->getById($input['subject_id']);
        try {
            DB::beginTransaction();
            $checkArray = array(
                'id' => $input['id'] ?? null,
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'class_name_id' => $input['class_name_id'] ?? null,
                'subject_id' => $input['subject_id'] ?? null,
            );

            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'class_name_id' => $input['class_name_id'] ?? null,
                'subject_id' => $input['subject_id'] ?? null,
                'academic_grade_id' => $input['academic_grade_id'] ?? null,
                'subject_group_id' => $input['subject_group_id'] ?? null,
                'title' => !empty($subject->title) ? $subject->title : "",
                'type' => $input['type'] ?? "",
                'display_order' => intval($input['display_order']) ?? null,
                'is_marking' => $input['is_marking'] ?? false,
                'status' => Status::ACTIVE->value,
            );

            $this->classroomSubjectRepository->updateOrCreateClassSubject($checkArray, $dataArray);
            DB::commit();

            return redirect()->route('subject.assign_to_class_new_design', ['class' => $input['class_name_id']])->with('message', 'Subject assign successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('subject.assign_to_class_new_design', ['class' => $input['class_name_id']])->with('error', 'Something goes wrong.');
        }
    }


    /**
     * delete classroom subject
     */
    public function assignToClassNewDesignDelete(int $id): RedirectResponse
    {
        DB::beginTransaction();

        try {
            $classSubject = $this->classroomSubjectRepository->getClassSubjectById($id);

            $classroomSubjects = $this->classroomSubjectRepository->getClassroonSubjectByClassNameIdAndSubjectId($classSubject->class_name_id, $classSubject->subject_id);

            if ($classroomSubjects->whereNotNull('examDate')->count() > 0) {
                return redirect()->back()->with('error', 'Subject cannot be removed at this stage!');
            }

            $classroomSubjects->each(function ($classroomSubject) {
                $classroomSubject->delete();
            });

            $classSubject->delete();

            DB::commit();

            return redirect()->back()->with('message', 'Deleted successfully.');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /**
     * delete classroom subject
     */
    public function assignToClassNewDesignDeleteOld(int $id): RedirectResponse
    {
        try {
            DB::beginTransaction();
            $this->classroomSubjectRepository->deleteClassSubject($id);
            DB::commit();
            return redirect()->back()->with('message', 'Deleted successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /**
     * update class subject
     */
    public function assignToClassNewDesignUpdate(ClassSubjectRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $classNameId = $request->class_name_id ?? null;
        $classrooms = [];

        DB::beginTransaction();

        try {
            // get classrooms by class id
            if (!empty($classNameId)) {
                $classrooms = $this->classroomRepository->getClassroomsFromClassId($classNameId);
            }

            $subject = $this->subjectRepository->getById($input['subject_id']);

            $dataArray = array(
                'subject_id' => $input['subject_id'] ?? null,
                'academic_grade_id' => $input['academic_grade_id'] ?? null,
                'subject_group_id' => $input['subject_group_id'] ?? null,
                'title' => !empty($subject->title) ? $subject->title : "",
                'type' => $input['type'] ?? "",
                'display_order' => intval($input['display_order']) ?? null,
                'is_marking' => $input['is_marking'] ?? false,
                'status' => Status::ACTIVE->value,
            );

            $this->classroomSubjectRepository->updateClassSubject($input['id'], $dataArray);

            // create classroom subject
            if (!empty($classrooms)) {
                foreach ($classrooms as $classroom) {
                    $checkArray = array(
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'classroom_id' => $classroom?->id,
                        'subject_id' => $input['subject_id'] ?? null,
                    );

                    $dataArray = array(
                        'academic_grade_id' => $input['academic_grade_id'] ?? null,
                        'parent_subject_id' => $input['subject_group_id'] ?? null,
                        'title' => !empty($subject->title) ? $subject->title : "",
                        'type' => $input['type'] ?? "",
                        'display_order' => intval($input['display_order']) ?? null,
                        'is_marking' => $input['is_marking'] ?? false,
                        'status' => Status::ACTIVE->value,
                    );

                    $this->classroomSubjectRepository->updateOrCreateClassroomSubject($checkArray, $dataArray);
                }
            }

            DB::commit();

            return redirect()->route('subject.assign_to_class_new_design', ['class' => $input['class_name_id']])->with('message', 'Subject updated successfully.');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()->route('subject.assign_to_class_new_design', ['class' => $input['class_name_id']])->with('errors', 'Something goes wrong.');
        }
    }


    /**
     * update class subject
     */
    public function assignToClassNewDesignUpdateOld(ClassSubjectRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $subject = $this->subjectRepository->getById($input['subject_id']);
        try {
            DB::beginTransaction();
            $input = $request->validated();
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'class_name_id' => $input['class_name_id'] ?? null,
                'subject_id' => $input['subject_id'] ?? null,
                'academic_grade_id' => $input['academic_grade_id'] ?? null,
                'subject_group_id' => $input['subject_group_id'] ?? null,
                'title' => !empty($subject->title) ? $subject->title : "",
                'type' => $input['type'] ?? "",
                'display_order' => intval($input['display_order']) ?? null,
                'is_marking' => $input['is_marking'] ?? false,
                'status' => Status::ACTIVE->value,
            );

            $this->classroomSubjectRepository->updateClassSubject($input['id'], $dataArray);
            DB::commit();
            return redirect()->route('subject.assign_to_class_new_design', ['class' => $input['class_name_id']])->with('message', 'Subject updated successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('subject.assign_to_class_new_design', ['class' => $input['class_name_id']])->with('errors', 'Something goes wrong.');
        }
    }

    /**
     * update class subject bulk
     */
    public function assignToClassSubjectBulk(Request $request)
    {
        DB::beginTransaction();

        try {
            $input = $request->validate(
                [
                    'class_name_id' => ['required', 'integer'],
                    'subject_ids' => ['required', 'array'],
                    'class_name_ids' => ['required', 'array'],
                ]
            );

            $grade = $this->academicRepository->getGradeOneTitleId();

            $classCheckArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
            );

            $classDataArray = array(
                'academic_grade_id' => $grade['id'] ?? null,
                'subject_group_id' =>  null,
                'type' => ClassSubjectType::COMPULSORY->value,
                'is_marking' => false,
                'status' => Status::ACTIVE->value,
            );

            if (count($input['class_name_ids']) > 0 && count($input['subject_ids']) > 0) {
                $classNameIds = [];

                foreach ($input['class_name_ids'] as $className) {
                    $classCheckArray['class_name_id'] = $className['class_name_id'];

                    foreach ($input['subject_ids'] as $subject) {

                        $subjectTitle = $this->subjectRepository->getById($subject['subject_id']);

                        $classCheckArray['subject_id'] = $subject['subject_id'];
                        $classDataArray['title'] = !empty($subjectTitle->title) ? $subjectTitle->title : null;
                        $classDataArray['display_order'] = random_int(1, 50);

                        $this->classroomSubjectRepository->updateOrCreateClassSubject($classCheckArray, $classDataArray);
                    }

                    array_push($classNameIds, $className['class_name_id']);
                }

                $classroomIds = $this->classroomRepository->getClassroomIdsByClassNameIds($classNameIds);

                $checkArray = array(
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                );

                $dataArray = array(
                    'academic_grade_id' => $grade['id'] ?? null,
                    'parent_subject_id' =>  null,
                    'type' => ClassSubjectType::COMPULSORY->value,
                    'is_marking' => false,
                    'status' => Status::ACTIVE->value,
                );

                if (!empty($classroomIds)) {
                    foreach ($classroomIds as $classroomId) {
                        $checkArray['classroom_id'] = $classroomId;

                        foreach ($input['subject_ids'] as $subject) {
                            $subjectTitle = $this->subjectRepository->getById($subject['subject_id']);

                            $checkArray['subject_id'] = $subject['subject_id'];
                            $dataArray['title'] = !empty($subjectTitle->title) ? $subjectTitle->title : null;
                            $dataArray['display_order'] = random_int(1, 50);

                            $this->classroomSubjectRepository->updateOrCreateClassroomSubject($checkArray, $dataArray);
                        }
                    }
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Save successfully.');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()->back()->with('errors', 'Something goes wrong.');
        }
    }

    /**
     * update class subject bulk
     */
    public function assignToClassSubjectBulkOld(Request $request)
    {
        try {
            DB::beginTransaction();
            $input = $request->validate(
                [
                    'class_name_id' => ['required', 'integer'],
                    'subject_ids' => ['required', 'array'],
                    'class_name_ids' => ['required', 'array'],
                ]
            );

            $grade = $this->academicRepository->getGradeOneTitleId();

            $checkArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
            );

            $dataArray = array(
                'academic_grade_id' => $grade['id'] ?? null,
                'subject_group_id' =>  null,
                'type' => ClassSubjectType::COMPULSORY->value,
                'is_marking' => false,
                'status' => Status::ACTIVE->value,
            );

            if (count($input['class_name_ids']) > 0 && count($input['subject_ids']) > 0) {
                foreach ($input['class_name_ids'] as $className) {

                    $checkArray['class_name_id'] = $className['class_name_id'];
                    $dataArray['class_name_id'] = $className['class_name_id'];

                    foreach ($input['subject_ids'] as $subject) {

                        $subjectTitle = $this->subjectRepository->getById($subject['subject_id']);

                        $checkArray['subject_id'] = $subject['subject_id'];
                        $dataArray['subject_id'] = $subject['subject_id'];
                        $dataArray['title'] = !empty($subjectTitle->title) ? $subjectTitle->title : null;
                        $dataArray['display_order'] = random_int(1, 50);

                        $this->classroomSubjectRepository->updateOrCreateClassSubject($checkArray, $dataArray);
                        DB::commit();
                    }
                }
                return redirect()->back()->with('message', 'Save successfully.');
            }
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('errors', 'Something goes wrong.');
        }
    }
}
