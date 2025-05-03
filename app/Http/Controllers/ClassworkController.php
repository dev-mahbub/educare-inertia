<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Enums\ClassworkStatus;
use App\Services\StudentService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\ClassworkRequest;
use App\Repositories\SubjectRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\ISubjectRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ClassroomRepository;
use App\Repositories\ClassworkRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IClassworkRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Repositories\IClassroomSubjectRepository;

class ClassworkController extends Controller
{
    private $_upload;
    public function __construct(
        private IClassworkRepository $classworkRepository,
        private ISubjectRepository $subjectRepository,
        private IStudentRepository $studentRepository,
        private IClassroomRepository $classroomRepository,
        private IClassroomSubjectRepository $classroomSubjectRepository,
        private StudentService  $studentService
    )
    {
        $this->_upload = new UploadFileController();
        $this->middleware('permission:view classwork', ['only' => ['index']]);
        $this->middleware('permission:add classwork', ['only' => ['create','save']]);
        $this->middleware('permission:edit classwork', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete classwork', ['only' => ['destroy']]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $classWorks = [];
        $class_name_id = null;
        $subject_id = null;
        $startDate = "";
        $endDate = "";

        if ($request->isMethod('post')) {
            $class_name_id = $request->classwork_class_id ?? null;
            $subject_id = $request->classwork_subject_id ?? null;
            $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->start_date)->timezone(getSchoolTimeZone())->format('Y-m-d') : '';
            $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->end_date)->timezone(getSchoolTimeZone())->format('Y-m-d') : '';
        }

        $classWorks = $this->classworkRepository->getFilteredActiveAll($class_name_id, $subject_id, $startDate, $endDate);
        
        $classrooms = $this->classroomRepository->getActiveClassNameAll();
        $subjects = $this->classroomSubjectRepository->getActiveAllClassSubjectByClassId($class_name_id)
        ->map(fn($subject) => ['id' => $subject->subject_id, 'title' => $subject->title]);

        return Inertia::render('Classwork/Show', [
            'classrooms' => $classrooms,
            'subjects' => $subjects,
            'classWorks' => $classWorks,
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
        if (!empty($subjectsData)) {
            $subjectsData = $subjectsData->map(fn($subject) => ['id' => $subject->id, 'title' => $subject->title])->all();
        }
        if (!empty($classroomData)) {
            $classroomData = $classroomData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();
        }

        return Inertia::render('Classwork/Create', [
            'subjects' => $subjectsData,
            'classNames' => $classNames,
            'classRoom' => $classroomData,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function save(ClassworkRequest $request): RedirectResponse
    {
      
        $input = $request->validated();
        $file_url = null;
        // classwork image
        if (!empty($request->file('class_file'))) {
            $file_url = $this->_upload->uploadImage($request, 'class_file', 'classwork_image');
        }
        if (!empty($request->file('class_camera_file'))) {
            $cameraFileArray = $this->_upload->uploadSingleFile($request, 'class_camera_file', 'classwork');
        }
        if (!empty($request->file('class_doc_file'))) {
            $docFileArray = $this->_upload->uploadSingleFile($request, 'class_doc_file', 'classwork');
        }
        $dataArray = array(
            'user_id' => auth()->user()->id,
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'title' => $input['title'] ?? '',
            'sub_title' => '',
            'class_subject_id' => $input['subject_id'] ?? '',
            'class_name_id' => $input['class_name_id'] ?? '',
            'description' => $input['description'] ?? '',
            'start_date_at' => !empty($input['start_date_at']) ? \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'end_date_at' => !empty($input['end_date_at']) ? \Carbon\Carbon::parse($input['end_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'assigned_to_class' => $input['assigned_to_class'] ?? 0,
            'class_va' => $input['class_va'] ?? 0,
            'class_vb' => $input['class_vb'] ?? 0,
            'allow_submission' => $input['allow_submission'] ?? 0,
            'class_file' => $file_url,
            'class_camera_file' => !empty($cameraFileArray['path']) ? $cameraFileArray['path'] : null,
            'class_doc_file' => !empty($docFileArray['path']) ? $docFileArray['path'] : null,
            'class_file_url' => $input['classFileUrl'] ?? null,
            'status' => Status::ACTIVE,
        );
       
        $classwork = $this->classworkRepository->create($dataArray);
        if( isset($classwork) ) {
            $existingClassroomIds = $this->classworkRepository->geClassroomFromClassNameId(getUserSchoolId(), getAcademicYearId(), $classwork->id);
            // deleted existing classwork classrooms before creating.
            if( !empty($existingClassroomIds) ) {
                foreach($existingClassroomIds as $existObj) {
                    $this->classworkRepository->deleteClassworkClassroom($existObj->id);
                }
            }
            // created classwork classroom
            $classRoomIds = $request->classroom_ids;
            if( !empty($classRoomIds) ) {
                $classroomIdsArray = $classRoomIds;
                foreach($classroomIdsArray as $classroomId) {
                    $dataArray = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'classwork_id' => $classwork->id,
                        'classroom_id' => $classroomId,
                    ];
                    $this->classworkRepository->createClassworkClassroom($dataArray);
                }
            }
            // Create Folder
            /*
            $dataArray = [
                'school_id' => $request->schoolId,
                'class_name_id' => $request->organizeClassNameId,
                'classroom_id' => null,
                'subject_id' => $request->organizeClassSubjectId, //organizeFolderId
                'topic_id' => $request->organizeTopicId,
                'folderable_type' => \App\Models\Classwork::class,
                'folderable_id' => $classwork->id,
                'name' => '',
                'description' => '',
            ];
            $this->organizeFolderRepository->create($dataArray); */
        }
        else {
            return redirect()->route('classwork.list')->with('errors', 'Something goes wrong.');
        }
        
        return redirect()->route('classwork.list')->with('message', 'Classwork created successfully.');
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request, string $id): Response
    {
        $classWork = $this->classworkRepository->getById($id);
        $subjectsData = $this->classroomSubjectRepository->getActiveAllClassSubjectByClassId($classWork->class_name_id);
        $classroomData = $this->classroomRepository->getClassroomsFromClassId($classWork->class_name_id);
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

        return Inertia::render('Classwork/Edit', [
            'classWork' => $classWork,
            'subjects' => $subjectsData,
            'classNames' => $classNames,
            'classRoom' => $classroomData,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ClassworkRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $file_url = null;
        // classwork image
        if (!empty($request->file('class_file'))) {
            $file_url = $this->_upload->uploadImage($request, 'class_file', 'classwork_image');
        }
        if (!empty($request->file('class_camera_file'))) {
            $cameraFileArray = $this->_upload->uploadSingleFile($request, 'class_camera_file', 'classwork');
        }
        if (!empty($request->file('class_doc_file'))) {
            $docFileArray = $this->_upload->uploadSingleFile($request, 'class_doc_file', 'classwork');
        }


        $dataArray = array(
            'user_id' => auth()->user()->id,
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'title' => $input['title'] ?? '',
            'class_subject_id' => $input['subject_id'] ?? '',
            'class_name_id' => $input['class_name_id'] ?? '',
            'description' => $input['description'] ?? '',
            'start_date_at' => !empty($input['start_date_at']) ? \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'end_date_at' => !empty($input['end_date_at']) ? \Carbon\Carbon::parse($input['end_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'assigned_to_class' => $input['assigned_to_class'] ?? 0,
            'allow_submission' => $input['allow_submission'] ?? 0,
            'class_file' => $file_url,
            'class_camera_file' => !empty($cameraFileArray['path']) ? $cameraFileArray['path'] : null,
            'class_doc_file' => !empty($docFileArray['path']) ? $docFileArray['path'] : null,
            'class_file_url' => $input['classFileUrl'] ?? null,
        );

        $classwork = $this->classworkRepository->update($id, $dataArray);
        if (!$classwork) {
            return redirect()->route('classwork.list')->with('errors', 'Something goes wrong.');
        }
        if( isset($classwork) ) {
            $existingClassroomIds = $this->classworkRepository->geClassroomFromClassNameId(getUserSchoolId(), getAcademicYearId(), $id);
            // deleted existing classwork classrooms before creating.
            if( !empty($existingClassroomIds) ) {
                foreach($existingClassroomIds as $existObj) {
                    $this->classworkRepository->deleteClassworkClassroom($existObj->id);
                }
            }
            // created classwork classroom
            if( !empty($input['classroom_ids']) ) {
                $classroomIdsArray = $input['classroom_ids'];
                foreach($classroomIdsArray as $classroomId) {
                    $dataArray = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'classwork_id' => $id,
                        'classroom_id' => $classroomId,
                    ];
                    $this->classworkRepository->createClassworkClassroom($dataArray);
                }
            }
            // Create Folder
            /*
            $dataArray = [
                'school_id' => $request->schoolId,
                'class_name_id' => $request->organizeClassNameId,
                'classroom_id' => null,
                'subject_id' => $request->organizeClassSubjectId, //organizeFolderId
                'topic_id' => $request->organizeTopicId,
                'folderable_type' => \App\Models\Classwork::class,
                'folderable_id' => $classwork->id,
                'name' => '',
                'description' => '',
            ];
            $this->organizeFolderRepository->create($dataArray); */
        }else{
            return redirect()->route('classwork.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('classwork.list')->with('message', 'Classwork updated successfully.');

    }

    /**
     * Delete the user's account.
     */
    public function destroy(string $id): RedirectResponse
    {
        $classwork = $this->classworkRepository->getById($id);
        if (!$classwork) {
            return redirect()->route('classwork.list')->with('errors', 'Something goes wrong.');
        }
        $classwork->delete($id);
        return redirect()->route('classwork.list')->with('message', 'Classwork deleted successfully.');
    }

    /**
     * Homework Activity Show
     */
    public function classworkActivity(Request $request, int $id): Response
    {
        $classworkTypes = [];
        $comments = [];

        foreach(ClassworkStatus::cases() as $classworkType) {
            array_push($classworkTypes, ['id' => $classworkType->value, 'title' => $classworkType->value]);
        }

        if ($request->isMethod('POST')) {
            $comments = $this->classworkRepository->getClassworkStudentAssessmentComments(null, null, $id, $request->current_student_id);
        }

        $assessment = $this->classworkRepository->getById($id);
        $students = $this->studentRepository->getStudentsByAssessmentClassroomIds($assessment->classrooms->map(fn($classroom) => $classroom->id), $assessment->id );
        
        return Inertia::render('Classwork/Activity', [
            'assessment' => $assessment,
            'students' => $students,
            'classworkTypes' => $classworkTypes,
            'comments' => $comments
        ]);
    }

    /**
     * Assessment Activity Comment.
     */
    public function classworkActivityCommentSave(Request $request): RedirectResponse
    {
        $request->validate([
            'current_student_id' => 'required',
            'classwork_id' => 'required',
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
            $ass_file = $this->_upload->uploadImage($request, 'mark_file', 'classwork_image');
        }

        $arrayData = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'classwork_id' => $input['classwork_id'] ?? '',
            'student_id' => $input['current_student_id'] ?? '',
            'comment' => $input['enter_mark_desc'] ?? '',
            'assessment_status' => $input['select_status'] ?? '',
            'user_id' => !empty($input['user_id']) ? $input['user_id'] : auth()->user()->id,
            'status' => Status::ACTIVE,
            'ass_file' => $ass_file,
            'commented_by' => $input['commented_by'] ?? ''
        );
   
        $this->classworkRepository->createClassworkActivityComment($arrayData);
        return redirect()->back()->with('message', 'Classwork Activity Comment created successfully.');
    }
    
    /**
     * Classwork Activity Delete.
     */
    public function classworkActivityDelete(Request $request, int $id): RedirectResponse
    {
        $classworkActivityComment = $this->classworkRepository->getActivityCommentById($id);
        if (!$classworkActivityComment) {
            return redirect()->back()->with('errors', 'Something goes wrong.');
        }
        $classworkActivityComment->delete($id);
        return redirect()->back()->with('message', 'Classwork Activity Comment deleted successfully.');
    }

    /**
     * Student View Classworks
    */

    public function studentViewclassworks(Request $request): Response
    {
        $userRoles = getUserRoleArray() ?? [];
        $studentId = getStudentId();
        $students = $this->studentService->getParentStudents($userRoles);
        $classWorks = collect([]);

        if ($request->isMethod('POST')) {
            $studentId = $request->student_id;
        }

        if (!empty($studentId)) {
            $selectedStudent = $this->studentService->getEnhancedStudentById($studentId);
            
            if (!empty($selectedStudent?->promotedClassroom?->id)) {
                $classWorksData = $this->classworkRepository->getClassworksByClassroomId($selectedStudent->promotedClassroom->id);
                $classWorks = $classWorksData->map(function ($classworkSingle) {
                    return $classworkSingle->classwork;
                });
            }
        }

        return Inertia::render('Classwork/StudentView', [
            'students' => $students,
            'studentId' => $studentId,
            'classWorks' => $classWorks,
        ]);
    }

    /**
    * Student Classwork Show
    */
    public function studentclassworkShow(Request $request,int $student_id ,int $classwork_id): Response
    {
        $classwork = $this->classworkRepository->getById($classwork_id);

        $classworkTypes = [];
        $comments = [];

        foreach(ClassworkStatus::cases() as $classworkType) {
            array_push($classworkTypes, ['id' => $classworkType->value, 'title' => $classworkType->value]);
        }

        if(!empty($classwork_id) && !empty($student_id)) {
            $comments = $this->classworkRepository->getClassworkStudentAssessmentComments(null, null, $classwork_id, $student_id);
        }
        
        $classworkStudent = $this->classworkRepository->getClassworkFromStudentId($classwork_id, getStudentId());
        $assessment = $this->classworkRepository->getById($classwork_id);

        
        return Inertia::render('Classwork/StudentWork', [
            'classwork' => $classwork,
            'assessment' => $assessment,
            'classworkStudent' => $classworkStudent,
            'classworkTypes' => $classworkTypes,
            'comments' => $comments,
            'studentId' => $student_id,
            'teacherId' => $assessment->user_id
        ]);
    }
}
