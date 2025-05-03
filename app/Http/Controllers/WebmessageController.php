<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\UserRole;
use App\Events\MessageSent;
use Illuminate\Http\Request;
use App\Events\WebMessageSent;
use App\Services\StudentService;
use Illuminate\Support\Facades\Auth;
use App\Enums\WebmessageAudienceType;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IStaffRepository;
use App\Http\Requests\WebmessageRequest;
use App\Repositories\IStudentRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\IClassroomRepository;
use App\Repositories\IWebmessageRepository;
use App\Enums\WebmessageStudentAudienceType;
use App\Repositories\IClassroomSubjectRepository;

class WebmessageController extends Controller
{
    private $_upload;
    public function __construct( 
        private IClassroomRepository $classroomRepository,
        private IStudentRepository $studentRepository,
        private IStaffRepository $staffRepository,
        private IWebmessageRepository $webmessageRepository,
        private StudentService $studentService,
        private IClassroomSubjectRepository $classroomSubjectRepository,
    ) 
    {
        $this->_upload = new UploadFileController();
        // do something - 
        // $this->middleware('permission:view message', ['only' => ['index', 'inbox', 'compose', 'sent']]);
        // $this->middleware('permission:add message', ['only' => ['create', 'save']]);
        // $this->middleware('permission:edit message', ['only' => ['edit', 'update']]);
        // $this->middleware('permission:delete message', ['only' => ['destroy']]);
    }
    
    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $webmessages = $this->webmessageRepository->getActiveAll();

        return Inertia::render('Webmessage/Show', [
            'webmessages' => $webmessages,
        ]);
    }

    /**
     * Display the schools.
     */
    public function inbox(Request $request): Response
    {
        $startDate = "";
        $endDate = "";
        $search = "";
        
        if($request->isMethod('post')) {
            $startDate = $request->start_date;
            $endDate = $request->end_date;
            $search = $request->search; 
        }

        $webmessages = $this->webmessageRepository->getActiveAllDataForInbox(null, Auth::id(), $startDate, $endDate, $search)->map(function($message) {
            $message->load(['recipients' => function($q) {
                $q->withPivot('read_at');
            }]);
            $audience_data = json_decode($message->audience_data, true);
            $message->audience_data = $audience_data;

            if(!empty($audience_data)) {
                if($message?->audience_type == WebmessageAudienceType::PARENTS->value) {
                    if($audience_data['enable_type'] == "Assign To Classes Wise"){
                        $classrooms = $this->classroomRepository->getActiveNameAndIdByClassRoomIds($audience_data['classroom_ids'] ?? []);
                       
                        $message->classrooms = $classrooms;
                    }else{
                        $students = $this->studentRepository->getStudentByIds($audience_data['student_ids'] ?? []);
                        $message->students = $students;
                    }
                } elseif($message?->audience_type == WebmessageAudienceType::TEACHERS->value) {
                    $teachers = $this->staffRepository->getTeachersByIds($audience_data['teacher_ids'] ?? []);
                    $message->teachers = $teachers;
                }
            }
            return $message;

        });    

        return Inertia::render('Webmessage/Inbox', [
            'webmessages' => $webmessages,
        ]);
    }

    /**
     * Display the schools.
     */
    public function compose(Request $request): Response
    {
        $audienceTypes = [];
        
        if(auth()->user()->role == UserRole::SITE_PARENT->value || auth()->user()->role == UserRole::SITE_STUDENT->value) {
            $audienceTypes = buildEnumOptionsArray(WebmessageStudentAudienceType::cases());
        } else {
            $audienceTypes = buildEnumOptionsArray(WebmessageAudienceType::cases());
        }

        $classrooms = [];
        $students = [];
        $teachers = [];
        $admins = [];
        $studentId = getStudentId();
        $promotedClassroomId = null;
        $classTeacher = null;
        $subjectTeachers = [];

        if (!empty($studentId)) {
            $selectedStudent = $this->studentService->getEnhancedStudentById($studentId);
            
            if (!empty($selectedStudent?->promotedClassroom?->id)) {
                $promotedClassroomId = $selectedStudent?->promotedClassroom?->id;
            }
        }


        $classroomData = $this->classroomRepository->getActiveNameAndId();

        if ($request->isMethod('post')) {
            $audience_type = $request->audience_type ?? null;
            $classroom_id = $request->classroom_id ?? null;

            if ($audience_type == WebmessageAudienceType::PARENTS->value) {
                $classrooms = $classroomData->map(fn($classroom) => ['id' => $classroom->id, 'title' => $classroom->title])->all();

                if(!empty($classroom_id)) {
                    $students = $this->studentRepository->getActiveAll($classroom_id)->map(function($student) {
                        return [
                            'id' => $student->id,
                            'title' => $student->admission_no . ' - ' . $student->first_name . ' ' . $student->middle_name . ' ' . $student->last_name,
                        ];
                    });
                }


            } elseif ($audience_type == WebmessageAudienceType::TEACHERS->value) {
                $teachers = $this->staffRepository->getActiveTeacherName();
            } elseif ($audience_type == WebmessageStudentAudienceType::ADMIN->value) {
                $admins = $this->staffRepository->getActiveAdminStaffs();
            } elseif ($audience_type == WebmessageStudentAudienceType::CLASS_TEACHERS->value) {
                $classTeacher = $this->classroomRepository->getClassTeacherByClassRoomId($promotedClassroomId);
            } elseif ($audience_type == WebmessageStudentAudienceType::SUBJECT_TEACHERS->value) {
                $subjectTeachers = $this->classroomSubjectRepository->getTeacherByClassroomId($promotedClassroomId);
                $uniqueTeachers = $subjectTeachers->flatMap(function($subject) {
                    $teachersData = json_decode($subject->teachers_data, true);
                    $teacherIds = collect($teachersData)->pluck('teacher_id')->unique()->toArray();
                    return $this->staffRepository->getTeachersByIds($teacherIds);
                })->unique('id')->values()->map(function($teacher) {
                    return [
                        'id' => $teacher->id,
                        'title' => $teacher->first_name . ' ' . $teacher->middle_name . ' ' . $teacher->last_name,
                    ];
                });

                $subjectTeachers = $uniqueTeachers;
            }
        }

        return Inertia::render('Webmessage/Compose', [
            'audienceTypes' => $audienceTypes,
            'classrooms' => $classrooms,
            'students' => $students,
            'teachers' => $teachers,
            'admins' => $admins,
            'classTeacher' => $classTeacher ?? null,
            'subjectTeachers' => $subjectTeachers,
        ]);
    }

    /**
     * Update the user's profile information.
     */

    public function save(WebmessageRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $recipientIds = [];

        if(!empty($input['student_ids'])) {
            $studentsUserIds = $this->studentRepository->getStudentByIds($input['student_ids'])->map(function($student) {
                return $student?->father?->user_id;
            });
            
            $recipientIds = array_merge($recipientIds, $studentsUserIds->toArray());
        }

        if(!empty($input['teacher_ids'])) {
            $teachersUserIds = $this->staffRepository->getTeachersByIds($input['teacher_ids'])->map(function($teacher) {
                return $teacher?->user_id;
            });

            $recipientIds = array_merge($recipientIds, $teachersUserIds->toArray());
        }

        if(!empty($input['classroom_ids'])) {
            $students = $this->studentRepository->getByClassroomIds($input['classroom_ids'])->map(function($student) {
                return $student?->father_user_id;
            });

            $recipientIds = array_unique(array_merge($recipientIds, $students->toArray()));
        }

        if(!empty($input['admin_ids'])){
            $admins = $this->staffRepository->getAdminStaffsByIds($input['admin_ids'])->map(function($admin) {
                return $admin?->user_id;
            });

            $recipientIds = array_unique(array_merge($recipientIds, $admins->toArray()));
        }

        if(!empty($input['class_teacher_ids'])){
            $classTeacher = $this->staffRepository->getTeachersByIds($input['class_teacher_ids'])->map(function($teacher) {
                return $teacher?->user_id;
            });

            $recipientIds = array_unique(array_merge($recipientIds, $classTeacher->toArray()));
        }

        if(!empty($input['subject_teacher_ids'])){
            $subjectTeachers = $this->staffRepository->getTeachersByIds($input['subject_teacher_ids'])->map(function($teacher) {
                return $teacher?->user_id;
            });

            $recipientIds = array_unique(array_merge($recipientIds, $subjectTeachers->toArray()));
        }

        $image_url = null;
        if (!empty($request->file('messageFile'))) {
            $image_url = $this->_upload->uploadImage($request, 'messageFile', 'message_image');
        }


        $allIds = [];
        if ($input['audience_type'] == WebmessageAudienceType::PARENTS->value) {
            if ($input['enable_type'] == 'Assign To Classes Wise') {
                $allIds = $input['classroom_ids'] ?? [];
            } else {
                $allIds = $input['student_ids'] ?? [];
            }
        } elseif ($input['audience_type'] == WebmessageAudienceType::TEACHERS->value) {
            $allIds = $input['teacher_ids'] ?? [];
        }elseif ($input['audience_type'] == WebmessageStudentAudienceType::ADMIN->value) {
            $allIds = $input['admin_ids'] ?? [];
        }elseif ($input['audience_type'] == WebmessageStudentAudienceType::CLASS_TEACHERS->value) {
            $allIds = $input['class_teacher_ids'] ?? [];
        }elseif ($input['audience_type'] == WebmessageStudentAudienceType::SUBJECT_TEACHERS->value) {
            $allIds = $input['subject_teacher_ids'] ?? [];
        }
        

        $audience_data_json = json_encode([
            'audience_type' => $input['audience_type'] ?? null,
            'enable_type' => $input['enable_type'] ?? null,
            'all_selected' => $input['all_selected'] ?? null,
            'ids' => $allIds ?? [],
        ]);

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'sender_id' => Auth::id(),
            'parent_id' => null,
            'audience_type' => !empty($input['audience_type']) ? $input['audience_type'] : null,
            'audience_data' => $audience_data_json ?? null,
            'subject' => $input['subject'],
            'image' => $image_url,
            'body' => !empty($input['body']) ? $input['body'] : "",
            'read_at' => !empty($input['read_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['read_at'])->timezone(getSchoolTimeZone())->toDateString() : null,
            'status' => Status::ACTIVE,
        );

        $message = $this->webmessageRepository->create($dataArray);

        if( !empty($recipientIds) ) {
            $message->recipients()->attach($recipientIds);

            // broadcast(new WebMessageSent($recipientIds, $message));
            
        }

        // broadcast(new WebMessageSent([1592], "Test message"))->toOthers();
        // return Redirect::route('webmessage.list');
        return redirect()->back()->with('message', 'Message sent successfully');
    }

    
    /**
     * Display the schools.
     */
    public function sent(Request $request): Response
    {
        $webmessages = $this->webmessageRepository->getMessageSent(null, Auth::id())->map(function($message) {
            $message->load(['recipients' => function($q) {
                $q->withPivot('read_at');
            }]);
            $audience_data = json_decode($message->audience_data, true);

            $message->audience_data = $audience_data;

            if(!empty($audience_data)) {
                if($message?->audience_type == WebmessageAudienceType::PARENTS->value) {
                    if($audience_data['enable_type'] == "Assign To Classes Wise"){
                        $classrooms = $this->classroomRepository->getActiveNameAndIdByClassRoomIds($audience_data['ids'] ?? []);
                       
                        $message->classrooms = $classrooms;
                    }else{
                        $students = $this->studentRepository->getStudentByIds($audience_data['ids'] ?? []);
                        $message->students = $students;
                    }
                } elseif($message?->audience_type == WebmessageAudienceType::TEACHERS->value) {
                    $teachers = $this->staffRepository->getTeachersByIds($audience_data['ids'] ?? []);
                    $message->teachers = $teachers;
                }
            }
            return $message;
        });

        return Inertia::render('Webmessage/Sent', [
            'webmessages' => $webmessages,
        ]);
    }


    public function show($id): Response
    {
        $message = $this->webmessageRepository->show($id, Auth::id());
        $message->load(['sender', 'recipients' => function($q) {
            $q->withPivot('read_at');
        }]);

        return Inertia::render('Messages/Show', [
            'message' => $message,
        ]);
    }
    
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Webmessage/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(WebmessageRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

      //  return Redirect::route('webmessage.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(int $id): RedirectResponse
    {
        $webmessage = $this->webmessageRepository->getById($id);

        if(empty($webmessage)){
            return redirect()->back()->with('error', 'Webmessage not found');
        }

        $webmessage->recipients()->detach();
        $this->webmessageRepository->delete($id);
        
        return redirect()->back()->with('message', 'Webmessage deleted successfully');
    }
}
