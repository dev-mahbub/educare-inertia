<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\HomeworkType;
use Illuminate\Http\Request;
use App\Enums\AssessmentStatus;
use App\Services\StudentService;
use Illuminate\Support\Facades\Auth;
use App\Repositories\IFileRepository;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\HomeworkRequest;
use App\Http\Requests\ClassworkRequest;
use App\Repositories\SubjectRepository;
use App\Repositories\HomeworkRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\ISubjectRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ClassroomRepository;
use App\Repositories\IHomeworkRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IAssessmentRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Repositories\IClassroomSubjectRepository;

class HomeworkController extends Controller
{
    private $_upload;
    public function __construct(
        private IHomeworkRepository $homeworkRepository,
        private ISubjectRepository $subjectRepository,
        private IClassroomRepository $classroomRepository,
        private IClassroomSubjectRepository $classroomSubjectRepository,
        private IAssessmentRepository $assessmentRepository,
        private IStudentRepository $studentRepository,
        private IFileRepository $fileRepository,
        private StudentService  $studentService
    )
    {
        $this->_upload = new UploadFileController();
        $this->middleware('permission:view homework', ['only' => ['index']]);
        $this->middleware('permission:add homework', ['only' => ['create', 'save', 'homeworkActivity']]);
        $this->middleware('permission:edit homework', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete homework', ['only' => ['destroy', 'homeworkActivityDelete']]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $homeWorks = $this->homeworkRepository->getActiveAll();

        return Inertia::render('Homework/Show', [
            'homeWorks' => $homeWorks,
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
                $subjectsData = $this->classroomSubjectRepository->getActiveAllClassSubjectByClassId($request->class_name_id);
                $classroomData = $this->classroomRepository->getClassroomsFromClassId($request->class_name_id);
            }
        }
        
        
        $classNames = $classNamesData->map(fn($className) => ['id' => $className->id, 'title' => $className->title])->all();
        $homeworkTypeData = HomeworkType::cases();
        
        $homeworkTypes = array();
        foreach($homeworkTypeData as $type) {
            array_push($homeworkTypes, ['id' => $type->value, 'title' => $type->value]);
        }

        return Inertia::render('Homework/Create', [
            'subjects' => $subjectsData,
            'classNames' => $classNames,
            'classRoom' => $classroomData,
            'homeworkTypes' => $homeworkTypes
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(HomeworkRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $file_url = null;
        // class image
        if (!empty($request->file('home_file'))) {
            $file_url = $this->_upload->uploadImage($request, 'home_file', 'homework_image', $request->schoolKey);
        }
        if (!empty($request->file('homeCameraFile'))) {
            $cameraFileArray = $this->_upload->uploadSingleFile($request, 'homeCameraFile', 'homework', $request->schoolKey);
        }
        if (!empty($request->file('homeDocFile'))) {
            $docFileArray = $this->_upload->uploadSingleFile($request, 'homeDocFile', 'homework', $request->schoolKey);
        }

        $dataArray = array(
            'user_id' => auth()->user()->id,
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'title' => $input['title'] ?? '',
            'class_subject_id' => $input['subject_id'] ?? null,
            'class_name_id' => $input['class_name_id'] ?? null,
            'description' => $input['description'] ?? '',
            'start_date_at' => !empty($input['start_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date_at'])->timezone(getSchoolTimeZone())->format('Y-m-d') : date('Y-m-d'),
            'end_date_at' => !empty($input['end_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_date_at'])->timezone(getSchoolTimeZone())->format('Y-m-d') : date('Y-m-d'),
            'type' => $input['type'] ?? '',
            'assigned_to_class' => $input['assigned_to_class'] ?? 0,
            'allow_submission' => $input['allow_submission'] ?? 0,
            'home_file' => $file_url,
            'home_camera_file' => !empty($cameraFileArray['path']) ? $cameraFileArray['path'] : null,
            'home_doc_file' => !empty($docFileArray['path']) ? $docFileArray['path'] : null,
            'home_file_url' => $input['home_file_url'] ?? null,
            'status' => Status::ACTIVE->value,
        );

        $homework = $this->homeworkRepository->create($dataArray);
        if( isset($homework) ) {
            $existingClassroomIds = $this->homeworkRepository->geClassroomFromClassNameId(null, null, $homework->id);
            // deleted existing classwork classrooms before creating.
            if( !empty($existingClassroomIds) ) {
                foreach($existingClassroomIds as $existObj) {
                    $this->homeworkRepository->deleteClassworkClassroom($existObj->id);
                }
            }
            // created classwork classroom
            if( !empty($input['classroom_ids']) ) {
                $classroomIdsArray = $input['classroom_ids'];
                foreach($classroomIdsArray as $classroomId) {
                    $dataArray = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'homework_id' => $homework->id,
                        'classroom_id' => $classroomId,
                    ];
                    $this->homeworkRepository->createClassworkClassroom($dataArray);
                }
            }
            // Create Folder
            // $dataArray = [
            //     'school_id' => $request->schoolId,
            //     'class_name_id' => $request->organizeClassNameId,
            //     'classroom_id' => null,
            //     'subject_id' => $request->organizeClassSubjectId, //organizeFolderId
            //     'topic_id' => $request->organizeTopicId,
            //     'folderable_type' => \App\Models\Homework::class,
            //     'folderable_id' => $homework->id,
            //     'name' => '',
            //     'description' => '',
            // ];
            // $this->organizeFolderRepository->create($dataArray);
        }
        else {
            return redirect()->route('homework.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('homework.list')->with('message', 'Homework created successfully.');
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request,string $id): Response
    {
        $homeWork = $this->homeworkRepository->getById($id);
        $classNamesData = $this->classroomRepository->getActiveClassNameAll();

        $subjectsData = $this->classroomSubjectRepository->getActiveAllClassSubjectByClassId($homeWork->class_name_id);
        $classroomData = $this->classroomRepository->getClassroomsFromClassId($homeWork->class_name_id);
        if ($request->isMethod('POST')) {
            if (!empty($request->class_name_id)) {
                $subjectsData = $this->classroomSubjectRepository->getActiveAllClassSubjectByClassId($request->class_name_id);
                $classroomData = $this->classroomRepository->getClassroomsFromClassId($request->class_name_id);
            }
        }
        $homeworkTypeData = HomeworkType::cases();

        $classNames = $classNamesData->map(fn($className) => ['id' => $className->id, 'title' => $className->title])->all();
        if (!empty($subjectsData)) {
            $subjectsData = $subjectsData->map(fn($subject) => ['id' => $subject->id, 'title' => $subject->title])->all();
        }
        if (!empty($classroomData)) {
            $classroomData = $classroomData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();
        }
        $homeworkTypes = array();
        foreach($homeworkTypeData as $type) {
            array_push($homeworkTypes, ['id' => $type->value, 'title' => $type->value]);
        }

        return Inertia::render('Homework/Edit', [
            'homeWork' => $homeWork,
            'subjects' => $subjectsData,
            'classNames' => $classNames,
            'classroomData' => $classroomData,
            'homeworkTypes' => $homeworkTypes
        ]);
    }

    /**
     * Update the homework information.
     */
    public function update(HomeworkRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();

        $file_url = null;
        // class image
        if (!empty($request->file('homeFile'))) {
            $file_url = $this->_upload->uploadImage($request, 'homeFile', 'homework_image', $request->schoolKey);
        }
        if (!empty($request->file('homeCameraFile'))) {
            $cameraFileArray = $this->_upload->uploadSingleFile($request, 'homeCameraFile', 'homework', $request->schoolKey);
        }
        if (!empty($request->file('homeDocFile'))) {
            $docFileArray = $this->_upload->uploadSingleFile($request, 'homeDocFile', 'homework', $request->schoolKey);
        }

        $dataArray = array(
            'title' => $input['title'] ?? '',
            'class_subject_id' => $input['subject_id'] ?? '',
            'class_name_id' => $input['class_name_id'] ?? '',
            'description' => $input['description'] ?? '',
            'start_date_at' => !empty($input['start_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date_at'])->timezone(getSchoolTimeZone())->format('Y-m-d') : date('Y-m-d'),
            'end_date_at' => !empty($input['end_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_date_at'])->timezone(getSchoolTimeZone())->format('Y-m-d') : date('Y-m-d'),
            'assigned_to_class' => $input['assigned_to_class'] ?? 0,
            'type' => $input['type'] ?? '',
            'allow_submission' => $input['allow_submission'] ?? 0,
            'home_file' => $file_url,
            'home_camera_file' => !empty($cameraFileArray['path']) ? $cameraFileArray['path'] : null,
            'home_doc_file' => !empty($docFileArray['path']) ? $docFileArray['path'] : null,
            'home_file_url' => $input['home_file_url'] ?? null,
        );

        $homework = $this->homeworkRepository->update($id, $dataArray);
        
        if( isset($homework) ) {
            $existingClassroomIds = $this->homeworkRepository->geClassroomFromClassNameId(null, null, $id);
            if( !empty($existingClassroomIds) ) {
                foreach($existingClassroomIds as $existObj) {
                    $this->homeworkRepository->deleteClassworkClassroom($existObj->id);
                }
            }
            // created classwork classroom
            if( !empty($input['classroom_ids']) ) {
                $classroomIdsArray = $input['classroom_ids'];
                foreach($classroomIdsArray as $classroomId) {
                    $dataArray = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'homework_id' => $id,
                        'classroom_id' => $classroomId,
                    ];
                    $this->homeworkRepository->createClassworkClassroom($dataArray);
                }
            }
            // Create Folder
            // $dataArray = [
            //     'school_id' => $request->schoolId,
            //     'class_name_id' => $request->organizeClassNameId,
            //     'classroom_id' => null,
            //     'subject_id' => $request->organizeClassSubjectId, //organizeFolderId
            //     'topic_id' => $request->organizeTopicId,
            //     'folderable_type' => \App\Models\Homework::class,
            //     'folderable_id' => $homework->id,
            //     'name' => '',
            //     'description' => '',
            // ];
            // $this->organizeFolderRepository->create($dataArray);
        }
        else {
            return redirect()->route('homework.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('homework.list')->with('message', 'Homework Updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(string $id): RedirectResponse
    {
        $homeWork = $this->homeworkRepository->getById($id);
        if (!$homeWork) {
            return redirect()->route('homework.list')->with('errors', 'Something goes wrong.');
        }
        $homeWork->delete($id);
        return redirect()->route('homework.list')->with('message', 'Homework deleted successfully.');
    }

    /**
     * Homework Activity Show
     */
    public function homeworkActivity(Request $request, int $id): Response
    {
        $assessmentTypes = [];
        $comments = [];

        foreach(AssessmentStatus::cases() as $assessmentType) {
            array_push($assessmentTypes, ['id' => $assessmentType->value, 'title' => $assessmentType->value]);
        }

        if ($request->isMethod('POST')) {
            $comments = $this->homeworkRepository->getHomeworkStudentAssessmentComments(null, null, $id, $request->current_student_id);
        }

        $assessment = $this->homeworkRepository->getById($id);
        $students = $this->studentRepository->getStudentsByAssessmentClassroomIds($assessment->classrooms->map(fn($classroom) => $classroom->id), $assessment->id );
        
        return Inertia::render('Homework/Activity', [
            'assessment' => $assessment,
            'students' => $students,
            'assessmentTypes' => $assessmentTypes,
            'comments' => $comments
        ]);
    }

    /**
     * Assessment Activity Comment.
     */
    public function homeworkActivityCommentSave(Request $request): RedirectResponse
    {
        $request->validate([
            'current_student_id' => 'required',
            'homework_id' => 'required',
            'enter_mark_desc' => 'required',
            'select_status' => 'required',
            'mark_file' => 'nullable|mimes:jpeg,jpg,png,bmp,pdf,doc,docx,ppt|max:2048',
            'commented_by' => 'nullable',
            'user_id' => 'nullable'
        ],
        [
            'select_status.required' => 'The status field is required.',
            'enter_mark_desc.required' => 'The comment field is required.',
            'mark_file.mimes' => 'The file must be a file of type: jpeg, jpg, png, bmp, pdf, doc, docx, ppt.'
        ]);
        $input = $request->all();
        $ass_file = null;
        // file upload
        if (!empty($request->file('mark_file'))) {
            $ass_file = $this->_upload->uploadImage($request, 'mark_file', 'homework_image', 'homework_file');
        }

        $arrayData = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'homework_id' => $input['homework_id'] ?? '',
            'student_id' => $input['current_student_id'] ?? '',
            'comment' => $input['enter_mark_desc'] ?? '',
            'assessment_status' => $input['select_status'] ?? '',
            'user_id' => !empty($input['user_id']) ? $input['user_id'] : auth()->user()->id,
            'status' => Status::ACTIVE,
            'ass_file' => $ass_file,
            'commented_by' => $input['commented_by'] ?? ''
        );

        $this->homeworkRepository->createAssessmentActivityComment($arrayData);
        return redirect()->back()->with('message', 'Homework Activity Comment created successfully.');
    }
    
    /**
     * Homework Activity Delete.
     */
    public function homeworkActivityDelete(Request $request, int $id): RedirectResponse
    {
        $homeworkActivityComment = $this->homeworkRepository->getActivityCommentById($id);
        if (!$homeworkActivityComment) {
            return redirect()->back()->with('errors', 'Something goes wrong.');
        }
        $homeworkActivityComment->delete($id);
        return redirect()->back()->with('message', 'Homework Activity Comment deleted successfully.');
    }

    /**
     * Student View Homeworks
    */

    public function studentViewHomeworks(Request $request): Response
    {
        $userRoles = getUserRoleArray() ?? [];
        $studentId = getStudentId();
        $students = $this->studentService->getParentStudents($userRoles);
        $homeWorks = collect([]);

        if ($request->isMethod('POST')) {
            $studentId = $request->student_id;
        }

        if (!empty($studentId)) {
            $selectedStudent = $this->studentService->getEnhancedStudentById($studentId);
            
            if (!empty($selectedStudent?->promotedClassroom?->id)) {
                $homeWorksData = $this->homeworkRepository->getHomeworksByClassroomId($selectedStudent->promotedClassroom->id);
                $homeWorks = $homeWorksData->map(function ($homeworkSingle) {
                    return $homeworkSingle->homework;
                });
            }
        }


        return Inertia::render('Homework/StudentView', [
            'students' => $students,
            'studentId' => $studentId,
            'homeWorks' => $homeWorks,
        ]);
    }

    public function studentViewHomeworks_old(Request $request): Response
    {
        $userRoles = getUserRoleArray() ?? [];
        $students = [];
        $studentId = getStudentId();
        $homeWorks = [];

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
                $homeWorksData = $this->homeworkRepository->getHomeworksByClassroomId($student->promotedClassroom->id);
                $homeWorks = $homeWorksData->map(function ($homeWorkSingle) {
                    $homeWork = $homeWorkSingle->homework;
                    $homeWork['start_date_at'] = Carbon::parse($homeWork->start_date_at)->format('Y-m-d');
                    $homeWork['end_date_at'] = Carbon::parse($homeWork->end_date_at)->format('Y-m-d');
                    return $homeWork;
                });
              }
        };


        return Inertia::render('Homework/StudentView', [
            'students' => $students,
            'studentId' => $studentId,
            'homeWorks' => $homeWorks,
        ]);
    }

    /**
     * Student Homework Show
    */
    public function studentHomeworkShow(Request $request,int $student_id ,int $homework_id): Response
    {
        $homework = $this->homeworkRepository->getById($homework_id);

        $assessmentTypes = [];
        $comments = [];

        foreach(AssessmentStatus::cases() as $assessmentType) {
            array_push($assessmentTypes, ['id' => $assessmentType->value, 'title' => $assessmentType->value]);
        }

        if(!empty($homework_id) && !empty($student_id)) {
            $comments = $this->homeworkRepository->getHomeworkStudentAssessmentComments(null, null, $homework_id, $student_id);
        }
        
        $homeworkStudent = $this->homeworkRepository->getHomeworkFromStudentId($homework_id, getStudentId());
        $assessment = $this->homeworkRepository->getById($homework_id);

        
        return Inertia::render('Homework/StudentWork', [
            'homework' => $homework,
            'assessment' => $assessment,
            'homeworkStudent' => $homeworkStudent,
            'assessmentTypes' => $assessmentTypes,
            'comments' => $comments,
            'studentId' => $student_id,
            'teacherId' => $assessment->user_id 
        ]);
    }
}
