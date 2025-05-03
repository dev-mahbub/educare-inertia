<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\UserRole;
use App\Enums\ChoiceType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Repositories\TopicRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IStaffRepository;
use App\Repositories\ITopicRepository;
use App\Repositories\StudentRepository;
use App\Repositories\SubjectRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\ISubjectRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ClassroomRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IOnlineTopicRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\ClassroomDiscussionRequest;
use App\Repositories\ClassroomDiscussionRepository;
use App\Repositories\IClassroomDiscussionRepository;

class ClassroomDiscussionController extends Controller
{

    public function __construct(
        private IClassroomDiscussionRepository $classroomDiscussionRepository,
        private IStudentRepository $studentRepository,
        private ITopicRepository $topicRepository,
        private ISubjectRepository $subjectRepository,
        private IClassroomRepository $classroomRepository,
        private IStaffRepository $staffRepository,
        private IOnlineTopicRepository $onlineTopicRepository,
    ) {
        $this->middleware('permission:view classes', ['only' => ['index']]);
        $this->middleware('permission:add classes', ['only' => ['save']]);
        $this->middleware('permission:edit classes', ['only' => ['update']]);
        $this->middleware('permission:delete classes', ['only' => ['destroy']]);
    }

    /**
     * Classroom Discussions
     */
    public function index(Request $request): Response
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classroomId = null;
        $subjectId = null;
        $classrooms = [];
        $subjects = [];
        $onlineTopics = [];
        $class_discussion = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $subjectId = $request->subject_id ?? null;

            if (!empty($classroomId) && !empty($subjectId)) {
                $onlineTopics = $this->onlineTopicRepository->getOnlineDiscussionsByClassroomIdAndSubjectId($classroomId, $subjectId);
                $class_discussion = $this->classroomDiscussionRepository->getClassroomDiscussionsByClassroomIdAndSubjectId($classroomId, $subjectId);

                if (count($class_discussion) > 0) {
                    $class_discussion = $class_discussion->map(function ($discussion) {

                        if ($discussion?->user?->role == UserRole::SITE_STUDENT->value) {
                            $student = $this->studentRepository->getStudentById($discussion?->user_id);
                            if ($student != null) {
                                $student->loadMissing('studentImage');
                            }

                            $discussion['user']['profile_image'] = $student?->studentImage?->path ?? "";
                        } else {
                            $staff = $this->staffRepository->getStaffByUserId($discussion?->user_id);

                            if ($staff != null) {
                                $staff->loadMissing('staffProfileImage');
                            }

                            $discussion['user']['profile_image'] = $staff?->staffProfileImage?->path ?? "";
                        }

                        $discussion['discussion_date'] = !empty($discussion->created_at) ? Carbon::parse($discussion->created_at)->format('d-m-Y H:i A') : "";

                        return $discussion;
                    });
                }
            }
        }

        if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId);

            if (!empty($classroomId) && !empty($teacherId)) {
                $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassroomId($teacherId, $classroomId);
            }
        } else {
            $classrooms = $this->classroomRepository->getActiveAll();

            if (!empty($classroomId)) {
                $subjects = $this->subjectRepository->getSubjectsByClassroomId($classroomId);
            }
        }

        //get choice type
        $choice_type = ChoiceType::cases();
        $choice_types = array();
        foreach ($choice_type as $c_type) {
            array_push($choice_types, ['id' => $c_type->value, 'title' => $c_type->value]);
        }

        return Inertia::render('ClassroomDiscussion/Show', [
            'choices' => $choice_types,
            'class_discussion' => $class_discussion,
            'classrooms' => $classrooms,
            'subjects' => $subjects,
            'onlineTopics' => $onlineTopics
        ]);
    }


    /**
     * Save Classroom Discussion
     */
    public function save(ClassroomDiscussionRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'classroom_id' => $input['classroom_id'] ?? null,
            'subject_id' => $input['subject_id'] ?? null,
            'online_topic_id' => $input['topic_id'] ?? null,
            'user_id' => auth()->user()->id,
            'title' => $input['title'] ?? '',
            'choice' => $input['choice'] ?? null,
            'description' => $input['description'] ?? null,
            'status' => Status::ACTIVE,
        ];

        $discussion_class = $this->classroomDiscussionRepository->create($dataArray);

        if (!$discussion_class) {
            return redirect()->route('classroom_discussion.list')->with('errors', 'Something goes wrong.');
        }

        return redirect()->route('classroom_discussion.list')->with('message', 'Discussion class created successfully.');
    }

    /**
     * Update the user's profile information.
     */
    public function update(ClassroomDiscussionRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = [
            'subject_id' => $input['subject_id'] ?? '',
            'topic_id' => $input['topic_id'] ?? '',
            'title' => $input['title'] ?? '',
            'grade' => $input['grade'] ?? '',
            'choice' => $input['choice'] ?? '',
            'start_date_at' => !empty($input['start_date_at']) ? \Carbon\Carbon::parse($input['start_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'end_date_at' => !empty($input['end_date_at']) ? \Carbon\Carbon::parse($input['end_date_at'])->format('Y-m-d') : date('Y-m-d'),
            'description' => $input['description'] ?? ''
        ];

        $discussion_class = $this->classroomDiscussionRepository->update($id, $dataArray);
        if (!$discussion_class) {
            return redirect()->route('classroom_discussion.list')->with('errors', 'Something goes wrong.');
        }
        return redirect()->route('classroom_discussion.list')->with('message', 'Discussion class update successfully.');
    }

    /**
     * Delete Classroom Discussion
     */
    public function destroy(int $id): RedirectResponse
    {
        $discussion_class = $this->classroomDiscussionRepository->getById($id);
        if (!$discussion_class) {
            return redirect()->route('classroom_discussion.list')->with('errors', 'Something goes wrong.');
        }
        $discussion_class->delete($id);
        return redirect()->route('classroom_discussion.list')->with('message', 'Class discussion deleted successfully.');
    }
}
