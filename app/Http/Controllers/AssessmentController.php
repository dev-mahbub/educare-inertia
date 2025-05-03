<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Enums\AssessmentStatus;
use App\Services\StudentService;
use Illuminate\Support\Facades\Auth;
use App\Repositories\IFileRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\SubjectRepository;
use App\Http\Requests\AssessmentRequest;
use App\Repositories\IStudentRepository;
use App\Repositories\ISubjectRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ClassroomRepository;
use App\Repositories\AssessmentRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IAssessmentRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Repositories\IClassroomSubjectRepository;

class AssessmentController extends Controller
{

    private $_upload;
    public function __construct(
        private IAssessmentRepository $assessmentRepository,
        private ISubjectRepository $subjectRepository,
        private IClassroomRepository $classroomRepository,
        private IClassroomSubjectRepository $classroomSubjectRepository,
        private IStudentRepository $studentRepository,
        private IFileRepository $fileRepository,
        private StudentService $studentService
    ) {
        $this->_upload = new UploadFileController();
        $this->middleware('permission:view assessment', ['only' => ['index', 'assessmentActivity', '']]);
        $this->middleware('permission:add assessment', ['only' => ['create', 'save', 'assessmentActivityMarkSave']]);
        $this->middleware('permission:edit assessment', ['only' => ['edit','update']]);
        $this->middleware('permission:delete assessment', ['only' => ['destroy', 'assessmentActivityDelete']]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request)
    {
        $assessments = $this->assessmentRepository->getActiveAll();
        $class_name_id = null;

        if ($request->isMethod('post')) {
            $class_name_id = $request->assessment_class_id ?? null;
            $subject_id = $request->assessment_subject_id ?? null;
            $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->start_date)->timezone(getSchoolTimeZone())->format('Y-m-d') : '';
            $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->end_date)->timezone(getSchoolTimeZone())->format('Y-m-d') : '';

            $assessments = $this->assessmentRepository->getFilteredActiveAll($class_name_id, $subject_id, $startDate, $endDate);
        }

        $classrooms = $this->classroomRepository->getActiveClassNameAll();
        $subjects = $this->classroomSubjectRepository->getActiveAllClassSubjectByClassId($class_name_id)
        ->map(fn($subject) => ['id' => $subject->subject_id, 'title' => $subject->title]);

        return Inertia::render('Assessment/Show', [
            'classrooms' => $classrooms,
            'subjects' => $subjects,
            'assessments' => $assessments
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {
        $subjectsData = [];
        $classroomData = [];
        $classNamesData = $this->classroomRepository->getActiveClassNameAll();
        if ($request->isMethod('POST')) {
            if (!empty($request->class_name_id)) {
                $subjectsData = $this->classroomSubjectRepository->getActiveAllClassSubjectByClassId($request->class_name_id)
                    ->map(fn($subject) => ['id' => $subject->subject_id, 'title' => $subject->title]);

                $classroomData = $this->classroomRepository->getClassroomsFromClassId($request->class_name_id);
            }
        }

        return Inertia::render('Assessment/Create', [
            'subjects' => $subjectsData,
            'classNames' => $classNamesData,
            'classRoom' => $classroomData
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(AssessmentRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $file_url = null;
        if (!empty($request->file('ass_file'))) {
            $file_url = $this->_upload->uploadImage($request, 'ass_file', 'assessment_image', $request->schoolKey);
        }
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'title' => $input['title'] ?? '',
            'subject_id' => $input['subject_id'] ?? '',
            'class_name_id' => $input['class_name_id'] ?? '',
            'description' => $input['description'] ?? '',
            'start_date_at' => !empty($input['start_date_at']) ? \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'end_date_at' => !empty($input['end_date_at']) ? \Carbon\Carbon::parse($input['end_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'duration' => $input['duration'] ?? '',
            'type' => $input['type'] ?? '',
            'max_mark' => $input['max_mark'] ?? '',
            'pass_mark' => $input['pass_mark'] ?? '',
            'assigned_to_class' => $input['assigned_to_class'] ?? 0,
            'allow_submission' => $input['allow_submission'] ?? 0,
            'ass_file' => $file_url ?? '',
            'user_id' => auth()->user()->id,
            'status' => Status::ACTIVE,
        );

        $assessment = $this->assessmentRepository->create($dataArray);
        if (isset($assessment)) {
            $existingClassroomIds = $this->assessmentRepository->geClassroomFromClassNameId(null, null, $assessment->id);

            if (!empty($existingClassroomIds)) {
                foreach ($existingClassroomIds as $existingClassroomId) {
                    $this->assessmentRepository->deleteAssessmentClassroom($existingClassroomId->id);
                }
            }

            // created Assessment classroom
            $classRoomIds = $request->classroom_ids;
            if (!empty($classRoomIds)) {
                foreach ($classRoomIds as $classroomId) {
                    $dataArray = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'assessment_id' => $assessment->id,
                        'classroom_id' => $classroomId,
                    ];
                    $this->assessmentRepository->createAssessmentClassroom($dataArray);
                }
            }
        } else {
            return redirect()->route('assessment.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('assessment.list')->with('message', 'Assessment created successfully.');
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request, String $id): Response
    {
        $assessment = $this->assessmentRepository->getById($id);
        $subjectsData = $this->classroomSubjectRepository->getActiveAllClassSubjectByClassId($assessment->class_name_id);
        $classroomData = $this->classroomRepository->getClassroomsFromClassId($assessment->class_name_id);
        $classNamesData = $this->classroomRepository->getActiveClassNameAll();
        if ($request->isMethod('POST')) {
            if (!empty($request->class_name_id)) {
                $subjectsData = $this->classroomSubjectRepository->getActiveAllClassSubjectByClassId($request->class_name_id);
                $classroomData = $this->classroomRepository->getClassroomsFromClassId($request->class_name_id);
            }
        }

        $classNames = $classNamesData->map(fn($className) => ['id' => $className->id, 'title' => $className->title])->all();
        if (!empty($subjectsData)) {
            $subjectsData = $subjectsData->map(fn($subject) => ['id' => $subject->id, 'title' => $subject->title])->all();
        }
        if (!empty($classroomData)) {
            $classroomData = $classroomData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();
        }
        
        return Inertia::render('Assessment/Edit', [
            'assessment' => $assessment,
            'subjects' => $subjectsData,
            'classNames' => $classNamesData,
            'classRoom' => $classroomData
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(AssessmentRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $file_url = null;
        if (!empty($request->file('ass_file'))) {
            $file_url = $this->_upload->uploadImage($request, 'ass_file', 'assessment_image', $request->schoolKey);
        }
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'title' => $input['title'] ?? '',
            'subject_id' => $input['subject_id'] ?? '',
            'class_name_id' => $input['class_name_id'] ?? '',
            'description' => $input['description'] ?? '',
            'start_date_at' => !empty($input['start_date_at']) ? \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'end_date_at' => !empty($input['end_date_at']) ? \Carbon\Carbon::parse($input['end_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'duration' => $input['duration'] ?? '',
            'type' => $input['type'] ?? '',
            'max_mark' => $input['max_mark'] ?? '',
            'pass_mark' => $input['pass_mark'] ?? '',
            'assigned_to_class' => $input['assigned_to_class'] ?? 0,
            'allow_submission' => $input['allow_submission'] ?? 0,
            'user_id' => auth()->user()->id,
            'ass_file' => $file_url ?? '',
        );

        $assessment = $this->assessmentRepository->update($id, $dataArray);
        if ($assessment) {
            $existingClassroomIds = $this->assessmentRepository->geClassroomFromClassNameId(null, null, $id);

            if (!empty($existingClassroomIds)) {
                foreach ($existingClassroomIds as $existingClassroomId) {
                    $this->assessmentRepository->deleteAssessmentClassroom($existingClassroomId->id);
                }
            }

            // created Assessment classroom
            $classRoomIds = $request->classroom_ids;
            if (!empty($classRoomIds)) {
                foreach ($classRoomIds as $classroomId) {
                    $dataArray = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'assessment_id' => $id,
                        'classroom_id' => $classroomId,
                    ];
                    $this->assessmentRepository->createAssessmentClassroom($dataArray);
                }
            }
        } else {
            return redirect()->route('assessment.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('assessment.list')->with('message', 'Assessment updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(String $id): RedirectResponse
    {
        $assessment = $this->assessmentRepository->getById($id);
        if (!$assessment) {
            return redirect()->route('assessment.list')->with('errors', 'Something goes wrong.');
        }
        $assessment->delete($id);
        return redirect()->route('assessment.list')->with('message', 'Assessment deleted successfully.');
    }

    /**
     * Assessment Activity.
    */
    public function assessmentActivity(Request $request, int $id): Response
    {
        $assessmentTypes = [];
        $comments = [];

        foreach(AssessmentStatus::cases() as $assessmentType) {
            array_push($assessmentTypes, ['id' => $assessmentType->value, 'title' => $assessmentType->value]);
        }

        if ($request->isMethod('POST')) {
            $comments = $this->assessmentRepository->getStudentAssessmentComments($id, $request->current_student_id);
        }

        $assessment = $this->assessmentRepository->getById($id);
        $students = $this->studentRepository->getStudentsByAssessmentClassroomIds($assessment->classrooms->map(fn($classroom) => $classroom->id), $assessment->id );

        return Inertia::render('Assessment/Activity', [
            'assessment' => $assessment,
            'students' => $students,
            'assessmentTypes' => $assessmentTypes,
            'comments' => $comments
        ]);
    }

    /**
     * Assessment Activity Save.
     */
    public function assessmentActivityMarkSave(Request $request): RedirectResponse
    {
        $request->validate([
            'current_student_id' => 'required',
            'assessment_id' => 'required',
            'enter_mark' => 'required|numeric|min:0|max:100',
        ]);
        $input = $request->all();
        $attributesToCheck = [
            'student_id' => $input['current_student_id'],
            'assessment_id' => $input['assessment_id'],
        ];
        $valuesToUpdate = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'mark' => $input['enter_mark'] ?? '',
            'status' => Status::ACTIVE,
        );

        $assessmentActivityMark = $this->assessmentRepository->createAssessmentActivityMark($attributesToCheck, $valuesToUpdate);
        if ($assessmentActivityMark) {
            return redirect()->back()->with('message', 'Assessment Activity created successfully.');
        } else {
            return redirect()->back()->with('errors', 'Something goes wrong.');
        }
    }

    /**
     * Assessment Activity Comment.
     */
    public function assessmentActivityCommentSave(Request $request): RedirectResponse
    {
        $request->validate([
            'current_student_id' => 'required',
            'assessment_id' => 'required',
            'enter_mark_desc' => 'required',
            'select_status' => 'required',
            'mark_file' => 'nullable|mimes:jpeg,jpg,png,bmp,pdf,doc,docx,ppt|max:2048',
            'commented_by' => 'nullable',
        ],
        [
            'select_status.required' => 'The status field is required.',
            'enter_mark_desc.required' => 'The comment field is required.',
            'mark_file.mimes' => 'The file must be a file of type: jpeg, jpg, png, bmp, pdf, doc, docx, ppt.'
        ]);

        $input = $request->all();

        $arrayData = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'assessment_id' => $input['assessment_id'] ?? '',
            'student_id' => $input['current_student_id'] ?? '',
            'comment' => $input['enter_mark_desc'] ?? '',
            'assessment_status' => $input['select_status'] ?? '',
            'user_id' => !empty($input['user_id']) ? $input['user_id'] : auth()->user()->id,
            'status' => Status::ACTIVE,
            'commented_by' => $input['commented_by'] ?? ''
        );

        $assessmentActivityComment = $this->assessmentRepository->createAssessmentActivityComment($arrayData);

        if (!empty($assessmentActivityComment['id']) && !empty($request->file('mark_file'))) {
            $file_url = $this->_upload->uploadSingleFile($request, 'mark_file', 'assessment');

            $dataFile = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'fileable_type' => \App\Models\StudentAssessmentComment::class,
                'fileable_id' => $assessmentActivityComment['id'],
                'name' => $file_url['name'],
                'file_name' => $file_url['file_name'],
                'path' => !empty($file_url['path']) ? $file_url['path'] : null,
            );

            $this->fileRepository->morphCreate($dataFile);
        }
        return redirect()->back()->with('message', 'Assessment Activity Comment created successfully.');
    }

    /**
     * Assessment Activity Delete.
     */
    public function assessmentActivityDelete(Request $request, int $id): RedirectResponse
    {
        $assessmentActivityComment = $this->assessmentRepository->getCommentById($id);
        if (!$assessmentActivityComment) {
            return redirect()->back()->with('errors', 'Something goes wrong.');
        }
        $assessmentActivityComment->delete($id);
        return redirect()->back()->with('message', 'Assessment Activity Comment deleted successfully.');
    }

    /**
     * Student View Assessmeent
     */
    public function studentViewAssessmeent(Request $request): Response
    {
        $userRoles = getUserRoleArray() ?? [];
        $studentId = getStudentId();
        $students = $this->studentService->getParentStudents($userRoles);
        $assessments = collect([]);

        if ($request->isMethod('POST')) {
            $studentId = $request->student_id;
        }

        if (!empty($studentId)) {
            $selectedStudent = $this->studentService->getEnhancedStudentById($studentId);
            
            if (!empty($selectedStudent?->promotedClassroom?->id)) {
                $assessmentData = $this->assessmentRepository->getAssessmentByClassroomId($selectedStudent->promotedClassroom->id);
                $assessments = $assessmentData->map(function ($assessmentSingle) {
                    return $assessmentSingle->assessment;
                });
            }
        }


        return Inertia::render('Assessment/StudentView', [
            'students' => $students,
            'studentId' => $studentId,
            'assessments' => $assessments,
        ]);
    }

    public function studentViewAssessmeent_old(Request $request): Response
    {
        $userRoles = getUserRoleArray() ?? [];
        $students = [];
        $studentId = getStudentId();
        $assessments = [];

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
        
           if(!empty($student->promotedClassroom->id)){
                $assessmentData = $this->assessmentRepository->getAssessmentByClassroomId($student->promotedClassroom->id);
                $assessments = $assessmentData->map(function ($assessmentSingle) {
                    $assessment = $assessmentSingle->assessment;
                    return $assessment;
                });
            }
        };


        return Inertia::render('Assessment/StudentView', [
            'students' => $students,
            'studentId' => $studentId,
            'assessments' => $assessments,
        ]);
    }

    /**
     * Student View Assessmeent Show
     */
    public function studentAssessmeentShow(Request $request, int $student_id, int $assessment_id): Response
    {
        $assessment = $this->assessmentRepository->getById($assessment_id);

        $assessmentTypes = [];
        $comments = [];

        foreach(AssessmentStatus::cases() as $assessmentType) {
            array_push($assessmentTypes, ['id' => $assessmentType->value, 'title' => $assessmentType->value]);
        }

        if(!empty($assessment_id) && !empty($student_id)) {
            $comments = $this->assessmentRepository->getStudentAssessmentComments($assessment_id, $student_id, null, null);
        }
        
        $assessmentStudent = $this->assessmentRepository->getAssessmentFromStudentId($assessment_id, getStudentId());
        
        return Inertia::render('Assessment/StudentWork', [
            'assessment' => $assessment,
            'assessmentStudent' => $assessmentStudent,
            'assessmentTypes' => $assessmentTypes,
            'comments' => $comments,
            'studentId' => $student_id,
            'teacherId' => $assessment->user_id 
        ]);
    }
}
