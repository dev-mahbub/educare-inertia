<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\Language;
use App\Enums\UserRole;
use Illuminate\Http\Request;
use App\Enums\DifficultyLevel;
use App\Enums\PublishStatus;
use App\Enums\ShareAudienceType;
use App\Enums\VirtualAssetType;
use App\Enums\VirtualExamMode;
use App\Enums\VirtualQuestionType;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IStaffRepository;
use App\Http\Requests\OnlineExamRequest;
use App\Http\Requests\VirtualAssetRequest;
use App\Http\Requests\VirtualQuestionBankRequest;
use App\Http\Requests\VirtualQuestionRequest;
use App\Repositories\ISubjectRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IImageRepository;
use App\Repositories\IOnlineTopicRepository;
use App\Repositories\IVirtualExamRepository;
use Symfony\Component\HttpKernel\Debug\VirtualRequestStack;

class OnlineExamController extends Controller
{
    private $_upload;
    public function __construct(
        private IVirtualExamRepository $virtualExamRepository,
        private IClassroomRepository $classroomRepository,
        private ISubjectRepository $subjectRepository,
        private IStaffRepository $staffRepository,
        private IOnlineTopicRepository $onlineTopicRepository,
        private IImageRepository $imageRepository,
    ) {
        $this->_upload = new UploadFileController();
        $this->middleware('permission:view online exam', ['only' => [
            'index',
            'assetList',
            'questionList',
            'examList',
            'examSchedules',
            'questionBank',
            'previewQuestion',
            'examDetails',
        ]]);
        $this->middleware('permission:add online exam', ['only' => [
            'createAsset',
            'saveAsset',
            'createQuestion',
            'importQuestion',
            'createExam',
            'assignExamQuestion',
            'assignExamGrade',
            'examFinished',
            'assignQuestionBankQuestion',
            'buyQuestion',
            'saveExam',
            'previewQuestion',
            'saveAssignExamGrade',
            'saveAssignExamQuestion',
            'saveQuestion',
            'publishExam',
            'saveQuestionBank',
        ]]);
    }

    /*
    *   Display Courses
    */
    public function index(Request $request): Response
    {
        return Inertia::render('OnlineExam/Show', []);
    }

    /*
    *   Asset Lists
    */
    public function assetList(Request $request): Response
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classNameId = null;
        $subjectId = null;
        $onlineTopicId = null;
        $subjects = [];
        $classNames = [];
        $onlineTopics = [];
        $examAssets = $this->virtualExamRepository->getFilteredVirtualAssets();

        if ($request->isMethod('POST')) {
            $classNameId = $request->class_name_id ?? null;
            $subjectId = $request->subject_id ?? null;
            $onlineTopicId = $request->online_topic_id ?? null;

            $examAssets = $this->virtualExamRepository->getFilteredVirtualAssets($classNameId, $subjectId, $onlineTopicId);
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classNames = $this->classroomRepository->getActiveClassNameAll();

            if (!empty($classNameId)) {
                $subjects = $this->subjectRepository->getSubjectsByClassNameId($classNameId);
            }
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classNames = $this->classroomRepository->getTeacherClassNames($teacherId);

            if (!empty($classNameId)) {
                $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassNameId($teacherId, $classNameId);
            }
        }

        if (!empty($classNameId) && !empty($subjectId)) {
            $onlineTopics = $this->onlineTopicRepository->getOnlineDiscussionsByClassNameIdAndSubjectId($classNameId, $subjectId);
        }

        return Inertia::render('OnlineExam/AssetList', [
            'subjects' => $subjects,
            'classNames' => $classNames,
            'onlineTopics' => $onlineTopics,
            'examAssets' => $examAssets,
        ]);
    }

    /*
    *   Asset Lists
    */
    public function createAsset(Request $request): Response
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classNameId = null;
        $subjectId = null;
        $subjects = [];
        $classNames = [];
        $onlineTopics = [];

        if ($request->isMethod('POST')) {
            $classNameId = $request->class_name_id ?? null;
            $subjectId = $request->subject_id ?? null;
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classNames = $this->classroomRepository->getActiveClassNameAll();

            if (!empty($classNameId)) {
                $subjects = $this->subjectRepository->getSubjectsByClassNameId($classNameId);
            }
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classNames = $this->classroomRepository->getTeacherClassNames($teacherId);

            if (!empty($classNameId)) {
                $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassNameId($teacherId, $classNameId);
            }
        }

        if (!empty($classNameId) && !empty($subjectId)) {
            $onlineTopics = $this->onlineTopicRepository->getOnlineDiscussionsByClassNameIdAndSubjectId($classNameId, $subjectId);
        }

        // types
        $virtualAssetTypes = buildEnumOptionsArray(VirtualAssetType::cases());

        return Inertia::render('OnlineExam/CreateAsset', [
            'subjects' => $subjects,
            'classNames' => $classNames,
            'onlineTopics' => $onlineTopics,
            'virtualAssetTypes' => $virtualAssetTypes,
        ]);
    }

    /*
    *   Save Asset
    */
    public function saveAsset(VirtualAssetRequest $request): RedirectResponse //
    {
        $input = $request->all();
        $dataArray = [
            'school_id' => getUserSchoolId(),
            'class_name_id' => $input['class_name_id'] ?? null,
            'created_by' => auth()->user()->id,
            'subject_id' => $input['subject_id'] ?? null,
            'online_topic_id' => $input['online_topic_id'] ?? null,
            'title' => $input['title'] ?? 'No Title',
            'description' => $input['description'] ?? '',
            'asset_type' => $input['asset_type'] ?? '',
            'video_link' => $input['video_link'] ?? '',
            'is_publish' => $input['is_publish'] ?? 0,
            'status' => Status::ACTIVE
        ];

        $asset = $this->virtualExamRepository->createVirtualAsset($dataArray);

        // upload news image
        if (!empty($input['image_file'])) {
            $imageUrl = $this->_upload->uploadImage($request, 'image_file', 'image_file');

            if (!empty($imageUrl)) {
                $dataImage = array(
                    'school_id' => getUserSchoolId(),
                    'imageable_type' => $asset->getMorphClass(),
                    'imageable_id' => $asset->id,
                    'name' => "asset_image",
                    'path' => $imageUrl,
                    'status' => Status::ACTIVE,
                );

                $this->imageRepository->morphCreate($dataImage, $asset->id);
            }
        }

        if (!$asset) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->route('online_exam.asset_list')->with('message', 'Created successfully');
    }

    /*
    *   Asset edit
    */
    public function editAsset(Request $request): Response
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classNameId = null;
        $subjectId = null;
        $subjects = [];
        $classNames = [];
        $onlineTopics = [];
        $asset = [];

        if ($request->isMethod('POST')) {
            $id = $request->id ?? null;

            $asset = $this->virtualExamRepository->getVirtualAssetById($id);

            if (empty($request->class_name_id) && empty($request->subject_id)) {
                $classNameId = $asset?->class_name_id;
                $subjectId = $asset?->subject_id;
            } else {
                $classNameId = $request->class_name_id ?? null;
                $subjectId = $request->subject_id ?? null;
            }
        } else {
            die;
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classNames = $this->classroomRepository->getActiveClassNameAll();

            if (!empty($classNameId)) {
                $subjects = $this->subjectRepository->getSubjectsByClassNameId($classNameId);
            }
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classNames = $this->classroomRepository->getTeacherClassNames($teacherId);

            if (!empty($classNameId)) {
                $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassNameId($teacherId, $classNameId);
            }
        }

        if (!empty($classNameId) && !empty($subjectId)) {
            $onlineTopics = $this->onlineTopicRepository->getOnlineDiscussionsByClassNameIdAndSubjectId($classNameId, $subjectId);
        }

        // types
        $virtualAssetTypes = buildEnumOptionsArray(VirtualAssetType::cases());

        return Inertia::render('OnlineExam/EditAsset', [
            'subjects' => $subjects,
            'classNames' => $classNames,
            'onlineTopics' => $onlineTopics,
            'virtualAssetTypes' => $virtualAssetTypes,
            'asset' => $asset
        ]);
    }

    /*
    *   Update Asset
    */
    public function updateAsset(int $id, VirtualAssetRequest $request): RedirectResponse
    {
        $virtualAsset = $this->virtualExamRepository->getVirtualAssetById($id);

        $input = $request->validated();

        $dataArray = [
            'class_name_id' => $input['class_name_id'] ?? null,
            'created_by' => auth()->user()->id,
            'subject_id' => $input['subject_id'] ?? null,
            'online_topic_id' => $input['online_topic_id'] ?? null,
            'title' => $input['title'] ?? 'No Title',
            'description' => $input['description'] ?? '',
            'asset_type' => $input['asset_type'] ?? '',
            'video_link' => $input['video_link'] ?? '',
            'is_publish' => $input['is_publish'] ?? 0,
        ];

        $updateVirtualAsset = $this->virtualExamRepository->updateVirtualAsset($id, $dataArray);

        // upload news image
        if (!empty($input['image_file'])) {
            $imageUrl = $this->_upload->uploadImage($request, 'image_file', 'image_file');

            if (!empty($imageUrl)) {
                $attributesToCheck = array(
                    'school_id' => getUserSchoolId(),
                    'imageable_type' => $virtualAsset->getMorphClass(),
                    'imageable_id' => $virtualAsset->id,
                    'name' => "asset_image"
                );

                $valuesToUpdate = array(
                    'path' => $imageUrl,
                    'status' => Status::ACTIVE,
                );

                $this->imageRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
            }
        }

        if (!$updateVirtualAsset) {
            return redirect()->route('online_exam.asset_list')->with('error', 'Something goes wrong');
        }

        return redirect()->route('online_exam.asset_list')->with('message', 'Updated successfully');
    }

    /*
    *  Update Asset Publish Status
    */
    public function updateAssetPublishStatus(int $id, Request $request): RedirectResponse
    {
        $virtualAsset = $this->virtualExamRepository->getVirtualAssetById($id);

        $dataArray = [
            'is_publish' => $request->is_publish ?? false
        ];

        $updateStatus = $this->virtualExamRepository->updateVirtualAsset($virtualAsset->id, $dataArray);

        if (!$updateStatus) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Asset status updated successfully');
    }

    /**
     * delete asset
     */
    public function deleteAsset(int $id)
    {
        $deleteAsset = $this->virtualExamRepository->deleteVirtualAsset($id);

        if (!$deleteAsset) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Deleted Successfully.');
    }

    /*
    *   Display Questions
    */
    public function questionList(Request $request): Response
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classNameId = null;
        $subjectId = null;
        $onlineTopicId = null;
        $virtualAssetId = null;
        $questionType = '';
        $difficultyLevel = '';
        $language = '';
        $publishStatus = '';
        $status = '';
        $subjects = [];
        $classNames = [];
        $onlineTopics = [];
        $virtualAssets = [];
        $virtualQuestions = [];

        if ($request->isMethod('POST')) {
            $classNameId = $request->class_name_id ?? null;
            $subjectId = $request->subject_id ?? null;
            $onlineTopicId = $request->online_topic_id ?? null;
            $virtualAssetId = $request->virtual_asset_id ?? null;
            $questionType = $request->question_type ?? '';
            $difficultyLevel = $request->difficulty_level ?? '';
            $language = $request->language ?? '';
            $publishStatus = $request->publish_status ?? '';
            $status = $request->status ?? '';
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classNames = $this->classroomRepository->getActiveClassNameAll();

            if (!empty($classNameId)) {
                $subjects = $this->subjectRepository->getSubjectsByClassNameId($classNameId);
            }
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classNames = $this->classroomRepository->getTeacherClassNames($teacherId);

            if (!empty($classNameId)) {
                $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassNameId($teacherId, $classNameId);
            }
        }

        if (!empty($classNameId) && !empty($subjectId)) {
            $onlineTopics = $this->onlineTopicRepository->getOnlineDiscussionsByClassNameIdAndSubjectId($classNameId, $subjectId);
            $virtualAssets = $this->virtualExamRepository->getFilteredVirtualAssets($classNameId, $subjectId, null, VirtualAssetType::PASSAGE->value, true);
            $virtualQuestions = $this->virtualExamRepository->getFilteredVirtualQuestions(
                $classNameId,
                $subjectId,
                $onlineTopicId,
                $virtualAssetId,
                $questionType,
                $difficultyLevel,
                $language,
                $publishStatus,
                $status
            );
        }

        // question types
        $questionTypes = buildEnumOptionsArray(VirtualQuestionType::cases());

        // difficulty levels
        $difficultyLevels = buildEnumOptionsArray(DifficultyLevel::cases());

        // languages
        $languages = buildEnumOptionsArray(Language::cases());

        // status types
        $statusTypes = [];

        foreach (Status::cases() as $case) {
            if (in_array($case, [Status::ACTIVE, Status::INACTIVE])) {
                array_push($statusTypes, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        // publish status types
        $publishStatusTypes = buildEnumOptionsArray(PublishStatus::cases());

        return Inertia::render('OnlineExam/QuestionList', [
            'subjects' => $subjects,
            'classNames' => $classNames,
            'onlineTopics' => $onlineTopics,
            'questionTypes' => $questionTypes,
            'difficultyLevels' => $difficultyLevels,
            'languages' => $languages,
            'virtualAssets' => $virtualAssets,
            'virtualQuestions' => $virtualQuestions,
            'statusTypes' => $statusTypes,
            'publishStatusTypes' => $publishStatusTypes
        ]);
    }

    /*
    *  Preview Question
    */
    public function previewQuestion(int $id): Response
    {
        $virtualQuestion = $this->virtualExamRepository->getVirtualQuestionById($id);

        abort_if($virtualQuestion == null, 404);

        $virtualQuestion['answer_options'] = !empty($virtualQuestion->answer_options) ? json_decode($virtualQuestion->answer_options) : [];
        $virtualQuestion['created_on'] = !empty($virtualQuestion->created_at) ? Carbon::parse($virtualQuestion->created_at)->format('d-M-Y') : '';
        $virtualQuestion['updated_on'] = !empty($virtualQuestion->updated_at) ? Carbon::parse($virtualQuestion->updated_at)->format('d-M-Y') : '';

        return Inertia::render('OnlineExam/PreviewQuestion', [
            'virtualQuestion' => $virtualQuestion
        ]);
    }

    /*
    *   Create Question
    */
    public function createQuestion(Request $request): Response
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classNameId = null;
        $subjectId = null;
        $subjects = [];
        $classNames = [];
        $onlineTopics = [];
        $virtualAssets = [];

        if ($request->isMethod('POST')) {
            $classNameId = $request->class_name_id ?? null;
            $subjectId = $request->subject_id ?? null;
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classNames = $this->classroomRepository->getActiveClassNameAll();

            if (!empty($classNameId)) {
                $subjects = $this->subjectRepository->getSubjectsByClassNameId($classNameId);
            }
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classNames = $this->classroomRepository->getTeacherClassNames($teacherId);

            if (!empty($classNameId)) {
                $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassNameId($teacherId, $classNameId);
            }
        }

        if (!empty($classNameId) && !empty($subjectId)) {
            $onlineTopics = $this->onlineTopicRepository->getOnlineDiscussionsByClassNameIdAndSubjectId($classNameId, $subjectId);
            $virtualAssets = $this->virtualExamRepository->getFilteredVirtualAssets($classNameId, $subjectId, null, VirtualAssetType::PASSAGE->value, true);
        }

        // question types
        $questionTypes = buildEnumOptionsArray(VirtualQuestionType::cases());

        // difficulty levels
        $difficultyLevels = buildEnumOptionsArray(DifficultyLevel::cases());

        // languages
        $languages = buildEnumOptionsArray(Language::cases());

        // share audience types
        $shareAudienceTypes = buildEnumOptionsArray(ShareAudienceType::cases());

        return Inertia::render('OnlineExam/CreateQuestion', [
            'subjects' => $subjects,
            'classNames' => $classNames,
            'onlineTopics' => $onlineTopics,
            'questionTypes' => $questionTypes,
            'difficultyLevels' => $difficultyLevels,
            'languages' => $languages,
            'virtualAssets' => $virtualAssets,
            'shareAudienceTypes' => $shareAudienceTypes,
        ]);
    }

    /*
    *  Save Question
    */
    public function saveQuestion(VirtualQuestionRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'created_by' => auth()->user()->id,
            'class_name_id' => $input['class_name_id'] ?? null,
            'subject_id' => $input['subject_id'] ?? null,
            'language' => $input['language'] ?? '',
            'question_type' => $input['question_type'] ?? '',
            'difficulty_level' => $input['difficulty_level'] ?? '',
            'online_topic_id' => $input['online_topic_id'] ?? null,
            'virtual_asset_id' => $input['virtual_asset_id'] ?? null,
            'question' => $input['question'] ?? '',
            'answer_options' => !empty($input['answer_options']) ? json_encode($input['answer_options']) : null,
            'answer_explanation' => $input['answer_explanation'] ?? null,
            'mark' => $input['mark'] ?? null,
            'share_with' => $input['share_with'] ?? null,
            'is_published' => $input['is_published'] ?? false,
            'is_active' => true,
            'status' => Status::ACTIVE
        ];

        $virtualQuestion = $this->virtualExamRepository->createVirtualQuestion($dataArray);

        if (!$virtualQuestion) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Question created successfully');
    }

    /*
    *  Edit Question
    */
    public function editQuestion(int $id, Request $request): Response
    {
        $virtualQuestion = $this->virtualExamRepository->getVirtualQuestionById($id);

        abort_if($virtualQuestion == null, 404);

        $virtualQuestion['answer_options'] = !empty($virtualQuestion->answer_options) ? json_decode($virtualQuestion->answer_options) : [];

        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classNameId = $virtualQuestion?->class_name_id;
        $subjectId = $virtualQuestion?->subject_id;
        $subjects = [];
        $classNames = [];
        $onlineTopics = [];
        $virtualAssets = [];

        if ($request->isMethod('POST')) {
            $classNameId = $request->class_name_id ?? null;
            $subjectId = $request->subject_id ?? null;
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classNames = $this->classroomRepository->getActiveClassNameAll();

            if (!empty($classNameId)) {
                $subjects = $this->subjectRepository->getSubjectsByClassNameId($classNameId);
            }
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classNames = $this->classroomRepository->getTeacherClassNames($teacherId);

            if (!empty($classNameId)) {
                $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassNameId($teacherId, $classNameId);
            }
        }

        if (!empty($classNameId) && !empty($subjectId)) {
            $onlineTopics = $this->onlineTopicRepository->getOnlineDiscussionsByClassNameIdAndSubjectId($classNameId, $subjectId);
            $virtualAssets = $this->virtualExamRepository->getFilteredVirtualAssets($classNameId, $subjectId, null, VirtualAssetType::PASSAGE->value, true);
        }

        // question types
        $questionTypes = buildEnumOptionsArray(VirtualQuestionType::cases());

        // difficulty levels
        $difficultyLevels = buildEnumOptionsArray(DifficultyLevel::cases());

        // languages
        $languages = buildEnumOptionsArray(Language::cases());

        // share audience types
        $shareAudienceTypes = buildEnumOptionsArray(ShareAudienceType::cases());

        return Inertia::render('OnlineExam/EditQuestion', [
            'subjects' => $subjects,
            'classNames' => $classNames,
            'onlineTopics' => $onlineTopics,
            'questionTypes' => $questionTypes,
            'difficultyLevels' => $difficultyLevels,
            'languages' => $languages,
            'virtualAssets' => $virtualAssets,
            'shareAudienceTypes' => $shareAudienceTypes,
            'virtualQuestion' => $virtualQuestion
        ]);
    }

    /*
    *  Update Question
    */
    public function updateQuestion(int $id, VirtualQuestionRequest $request): RedirectResponse
    {
        $virtualQuestion = $this->virtualExamRepository->getVirtualQuestionById($id);

        abort_if($virtualQuestion == null, 404);

        $input = $request->validated();

        $dataArray = [
            'updated_by' => auth()->user()->id,
            'class_name_id' => $input['class_name_id'] ?? null,
            'subject_id' => $input['subject_id'] ?? null,
            'language' => $input['language'] ?? '',
            'question_type' => $input['question_type'] ?? '',
            'difficulty_level' => $input['difficulty_level'] ?? '',
            'online_topic_id' => $input['online_topic_id'] ?? null,
            'virtual_asset_id' => $input['virtual_asset_id'] ?? null,
            'question' => $input['question'] ?? '',
            'answer_options' => !empty($input['answer_options']) ? json_encode($input['answer_options']) : null,
            'answer_explanation' => $input['answer_explanation'] ?? null,
            'mark' => $input['mark'] ?? null,
            'share_with' => $input['share_with'] ?? null,
            'is_published' => $input['is_published'] ?? false,
            // 'is_active' => $input['is_active'] ?? false,
            // 'status' => $input['is_active'] == false ? Status::INACTIVE : Status::ACTIVE
        ];

        $updateQuestion = $this->virtualExamRepository->updateVirtualQuestion($id, $dataArray);

        if (!$updateQuestion) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Question updated successfully');
    }

    /*
    *  Update Question Publish Status
    */
    public function updateQuestionPublishStatus(int $id, Request $request): RedirectResponse
    {
        $virtualQuestion = $this->virtualExamRepository->getVirtualQuestionById($id);

        abort_if($virtualQuestion == null, 404);

        $dataArray = [
            'is_published' => $request->is_published ?? false
        ];

        $updateStatus = $this->virtualExamRepository->updateVirtualQuestion($id, $dataArray);

        if (!$updateStatus) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Question status updated successfully');
    }

    /*
    *  Update Bulk Question Status
    */
    public function updateBulkQuestionStatus(Request $request): RedirectResponse
    {
        $input = $request->validate(
            [
                'class_name_id' => ['required', 'integer'],
                'subject_id' => ['nullable', 'integer'],
                'status' => ['required', 'string']
            ]
        );

        $dataArray = [
            'updated_by' => auth()->user()->id,
            'status' => $input['status'] ?? Status::ACTIVE,
            'is_active' => $input['status'] == Status::ACTIVE->value
        ];

        $updateStatus = $this->virtualExamRepository->updateBulkVirtualQuestionStatus($dataArray, $input['class_name_id'], $input['subject_id']);

        if (!$updateStatus) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Question status updated successfully');
    }

    /*
    *  Delete Question
    */
    public function deleteQuestion(int $id): RedirectResponse
    {
        $virtualQuestion = $this->virtualExamRepository->getVirtualQuestionById($id);

        abort_if($virtualQuestion == null, 404);

        $deleteQuestion = $this->virtualExamRepository->deleteVirtualQuestion($id);

        if (!$deleteQuestion) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Question deleted successfully');
    }

    /*
    *   Import Question
    */
    public function importQuestion(Request $request): Response
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classNameId = null;
        $subjectId = null;
        $subjects = [];
        $classNames = [];
        $onlineTopics = [];

        if ($request->isMethod('POST')) {
            $classNameId = $request->class_name_id ?? null;
            $subjectId = $request->subject_id ?? null;
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classNames = $this->classroomRepository->getActiveClassNameAll();

            if (!empty($classNameId)) {
                $subjects = $this->subjectRepository->getSubjectsByClassNameId($classNameId);
            }
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classNames = $this->classroomRepository->getTeacherClassNames($teacherId);

            if (!empty($classNameId)) {
                $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassNameId($teacherId, $classNameId);
            }
        }

        if (!empty($classNameId) && !empty($subjectId)) {
            $onlineTopics = $this->onlineTopicRepository->getOnlineDiscussionsByClassNameIdAndSubjectId($classNameId, $subjectId);
        }

        // languages
        $languages = buildEnumOptionsArray(Language::cases());

        return Inertia::render('OnlineExam/ImportQuestion', [
            'subjects' => $subjects,
            'classNames' => $classNames,
            'onlineTopics' => $onlineTopics,
            'languages' => $languages
        ]);
    }

    /*
    *   Display Exams
    */
    public function examList(Request $request): Response
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classNameId = null;
        $classNames = [];
        $subjects = [];
        $virtualExams = [];

        if ($request->isMethod('POST')) {
            $classNameId = $request->class_name_id ?? null;
            $subjectId = $request->subject_id ?? null;
            $examMode = $request->exam_mode ?? '';

            $virtualExams = $this->virtualExamRepository->getFilteredVirtualExams(
                $classNameId,
                $subjectId,
                $examMode
            )?->map(function ($virtualExam) {
                $virtualExam['start_date'] = !empty($virtualExam->start_date_at) ? Carbon::parse($virtualExam->start_date_at)->format('d-m-Y') : '';
                $virtualExam['end_date'] = !empty($virtualExam->end_date_at) ? Carbon::parse($virtualExam->end_date_at)->format('d-m-Y') : '';
                $virtualExam['start_time'] = !empty($virtualExam->start_time_at) ? Carbon::parse($virtualExam->start_time_at)->format('H:i:s') : '';
                $virtualExam['end_time'] = !empty($virtualExam->end_time_at) ? Carbon::parse($virtualExam->end_time_at)->format('H:i:s') : '';

                return $virtualExam;
            });
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classNames = $this->classroomRepository->getActiveClassNameAll();

            if (!empty($classNameId)) {
                $subjects = $this->subjectRepository->getSubjectsByClassNameId($classNameId);
            }
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classNames = $this->classroomRepository->getTeacherClassNames($teacherId);

            if (!empty($classNameId)) {
                $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassNameId($teacherId, $classNameId);
            }
        }

        // exam modes
        $virtualExamModes = buildEnumOptionsArray(VirtualExamMode::cases());

        return Inertia::render('OnlineExam/ExamList', [
            'virtualExams' => $virtualExams,
            'virtualExamModes' => $virtualExamModes,
            'classNames' => $classNames,
            'subjects' => $subjects
        ]);
    }

    /*
    * Exam Details
    */
    public function examDetails(int $id): Response
    {
        $virtualExam = $this->virtualExamRepository->getVirtualExamById($id);

        abort_if($virtualExam == null, 404);

        // assigned questions
        $assignedQuestions = [];

        if (!empty($virtualExam->questions)) {
            $questions = json_decode($virtualExam->questions);

            $virtualQuestionIds = collect($questions)->pluck('virtual_question_id')->toArray();

            $assignedQuestions = $this->virtualExamRepository->getVirtualQuestionsByIds($virtualQuestionIds);

            if (count($assignedQuestions) > 0) {
                $assignedQuestions = $assignedQuestions->map(function ($assignedQuestion) use ($questions) {
                    $question = collect($questions)->filter(function ($question) use ($assignedQuestion) {
                        return $question->virtual_question_id == $assignedQuestion->id;
                    })->first();

                    $assignedQuestion['display_order'] = $question->display_order ?? '';

                    return $assignedQuestion;
                });
            }
        }

        // assigned classrooms
        $classroomTitles = "";

        if (!empty($virtualExam->classrooms)) {
            $classrooms = $this->classroomRepository->getClassroomsByIds(json_decode($virtualExam->classrooms));

            if (count($classrooms) > 0) {
                $classroomTitles = implode(', ', $classrooms->pluck('title')->toArray());
            }
        }

        $virtualExam['virtual_questions'] = $assignedQuestions;
        $virtualExam['classroom_titles'] = $classroomTitles;
        $virtualExam['start_date'] = !empty($virtualExam->start_date_at) ? Carbon::parse($virtualExam->start_date_at)->format('d-m-Y') : '';
        $virtualExam['end_date'] = !empty($virtualExam->end_date_at) ? Carbon::parse($virtualExam->end_date_at)->format('d-m-Y') : '';
        $virtualExam['start_time'] = !empty($virtualExam->start_time_at) ? Carbon::parse($virtualExam->start_time_at)->format('H:i:s') : '';
        $virtualExam['end_time'] = !empty($virtualExam->end_time_at) ? Carbon::parse($virtualExam->end_time_at)->format('H:i:s') : '';

        return Inertia::render('OnlineExam/ExamDetails', [
            'virtualExam' => $virtualExam
        ]);
    }

    /*
    *   Create Exam
    */
    public function createExam(Request $request): Response
    {
        $virtualExam = null;
        $virtualExamId = $request->query('id') ?? null;

        if ($virtualExamId != null) {
            $virtualExam = $this->virtualExamRepository->getVirtualExamById($virtualExamId);
        }

        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classNameId = $virtualExam?->class_name_id;
        $subjects = [];
        $classNames = [];

        if ($request->isMethod('POST')) {
            $classNameId = $request->class_name_id ?? null;
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classNames = $this->classroomRepository->getActiveClassNameAll();

            if (!empty($classNameId)) {
                $subjects = $this->subjectRepository->getSubjectsByClassNameId($classNameId);
            }
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classNames = $this->classroomRepository->getTeacherClassNames($teacherId);

            if (!empty($classNameId)) {
                $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassNameId($teacherId, $classNameId);
            }
        }

        // exam modes
        $virtualExamModeEnum = VirtualExamMode::cases();
        $virtualExamModes = collect($virtualExamModeEnum)->map(fn($mode) => ['id' => $mode?->value, 'title' => $mode?->value])->all();

        return Inertia::render('OnlineExam/CreateExam', [
            'virtualExamModes' => $virtualExamModes,
            'classNames' => $classNames,
            'subjects' => $subjects,
            'virtualExam' => $virtualExam,
        ]);
    }

    /*
    *   Save Exam
    */
    public function saveExam(OnlineExamRequest $request): RedirectResponse
    {
        $input = $request->all();

        $startDateAt = Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date_at'])->timezone(getSchoolTimeZone())->format('Y-m-d');
        $endDateAt = Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_date_at'])->timezone(getSchoolTimeZone())->format('Y-m-d');
        $dataArray = [
            'school_id' => getUserSchoolId(),
            'created_by' => auth()->user()->id,
            'title' => $input['title'] ?? 'No Title',
            'exam_code' => $input['exam_code'] ?? '',
            'exam_mode' => $input['exam_mode'] ?? '',
            'class_name_id' => $input['class_name_id'] ?? null,
            'subject_id' => $input['subject_id'] ?? null,
            'start_date_at' => !empty($input['start_date_at']) ? $startDateAt  : date('Y-m-d'),
            'end_date_at' => !empty($input['end_date_at']) ? $endDateAt : date('Y-m-d'),
            'start_time_at' => !empty($input['start_time_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_time_at'])->timezone(getSchoolTimeZone())->format('H:i:s') : null,
            'end_time_at' => !empty($input['end_time_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_time_at'])->timezone(getSchoolTimeZone())->format('H:i:s') : null,
            'duration_hour' => intval($input['duration_hour']),
            'duration_minute' => intval($input['duration_minute']),
            'instruction_hour' => intval($input['instruction_hour']),
            'instruction_minute' => intval($input['instruction_minute']),
            'instruction_details' => $input['instruction_details'] ?? '',
            'total_mark' => $input['total_mark'] ?? '',
            'pass_mark' => $input['pass_mark'] ?? '',
            'display_order' => $input['display_order'] ?? 1,
            'is_schedule_exam' => (strtotime($endDateAt) > strtotime($startDateAt)) ? 1 : 0,
            'is_shuffle_question' => $input['is_shuffle_question'] ?? 0,
            'live_link' => $input['live_link'] ?? '',
            'status' => Status::ACTIVE
        ];

        $virtualExam = $this->virtualExamRepository->create($dataArray);

        if (!$virtualExam) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->route('online_exam.assign_exam_question', $virtualExam->id)->with('message', 'Exam created successfully');
    }

    /*
    *   Update Exam
    */
    public function updateExam(int $id, OnlineExamRequest $request): RedirectResponse
    {
        $virtualExam = $this->virtualExamRepository->getVirtualExamById($id);

        abort_if($virtualExam == null, 404);

        if ($virtualExam?->is_published == true) {
            return redirect()->back()->with('error', "Published exam could not be updated.");
        }

        $input = $request->all();

        $dataArray = [
            'title' => $input['title'] ?? 'No Title',
            'exam_code' => $input['exam_code'] ?? '',
            'exam_mode' => $input['exam_mode'] ?? '',
            'class_name_id' => $input['class_name_id'] ?? null,
            'subject_id' => $input['subject_id'] ?? null,
            'start_date_at' => !empty($input['start_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date_at'])->timezone(getSchoolTimeZone())->format('Y-m-d') : date('Y-m-d'),
            'end_date_at' => !empty($input['end_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_date_at'])->timezone(getSchoolTimeZone())->format('Y-m-d') : date('Y-m-d'),
            'start_time_at' => !empty($input['start_time_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_time_at'])->timezone(getSchoolTimeZone())->format('H:i:s') : null,
            'end_time_at' => !empty($input['end_time_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_time_at'])->timezone(getSchoolTimeZone())->format('H:i:s') : null,
            'duration_hour' => intval($input['duration_hour']),
            'duration_minute' => intval($input['duration_minute']),
            'instruction_hour' => intval($input['instruction_hour']),
            'instruction_minute' => intval($input['instruction_minute']),
            'instruction_details' => $input['instruction_details'] ?? '',
            'total_mark' => $input['total_mark'] ?? '',
            'pass_mark' => $input['pass_mark'] ?? '',
            'display_order' => $input['display_order'] ?? 1,
            'is_shuffle_question' => $input['is_shuffle_question'] ?? 0,
            'live_link' => $input['live_link'] ?? '',
        ];

        $updateVirtualExam = $this->virtualExamRepository->update($id, $dataArray);

        if (!$updateVirtualExam) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->route('online_exam.assign_exam_question', $id)->with('message', 'Exam updated successfully');
    }

    /*
    *   Publish Exam
    */
    public function publishExam(int $id, Request $request): RedirectResponse
    {
        $virtualExam = $this->virtualExamRepository->getVirtualExamById($id);

        abort_if($virtualExam == null, 404);

        $totalQuestionMark = 0;

        if (!empty($virtualExam->questions)) {
            $totalQuestionMark = collect(json_decode($virtualExam->questions))->sum('mark') ?? 0;
        }

        if ($virtualExam?->total_mark != $totalQuestionMark) {
            return redirect()->back()->with('error', "Assigned question's marks did not matched to exam's total marks.");
        }

        $input = $request->all();

        $dataArray = [
            'is_published' => $input['is_published'] ?? false,
        ];

        $updateVirtualExam = $this->virtualExamRepository->update($id, $dataArray);

        // TODO: send web message and app notification is selected

        if (!$updateVirtualExam) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Exam published successfully');
    }

    /*
    *   Delete Virtual Exam
    */
    public function deleteVirtualExam(int $id): RedirectResponse
    {
        $virtualExam = $this->virtualExamRepository->getVirtualExamById($id);

        abort_if($virtualExam == null, 404);

        if ($virtualExam?->is_published == true) {
            return redirect()->back()->with('error', "Published exam could not be deleted.");
        }

        $deleteVirtualExam = $this->virtualExamRepository->delete($id);

        if (!$deleteVirtualExam) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Exam deleted successfully');
    }

    /*
    *   Exam Shcedules
    */
    public function examSchedules(Request $request): Response
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classNameId = null;
        $classNames = [];
        $subjects = [];
        $virtualExams = [];

        if ($request->isMethod('POST')) {
            $classNameId = $request->class_name_id ?? null;
            $subjectId = $request->subject_id ?? null;
            $examMode = $request->exam_mode ?? '';
            $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->start_date)->timezone(getSchoolTimeZone())->format('Y-m-d') : '';
            $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->end_date)->timezone(getSchoolTimeZone())->format('Y-m-d') : '';

            $virtualExams = $this->virtualExamRepository->getFilteredVirtualExams(
                $classNameId,
                $subjectId,
                $examMode,
                $startDate,
                $endDate
            )?->map(function ($virtualExam) {
                $virtualExam['start_date'] = !empty($virtualExam->start_date_at) ? Carbon::parse($virtualExam->start_date_at)->format('d-m-Y') : '';
                $virtualExam['end_date'] = !empty($virtualExam->end_date_at) ? Carbon::parse($virtualExam->end_date_at)->format('d-m-Y') : '';
                $virtualExam['start_time'] = !empty($virtualExam->start_time_at) ? Carbon::parse($virtualExam->start_time_at)->format('H:i:s') : '';
                $virtualExam['end_time'] = !empty($virtualExam->end_time_at) ? Carbon::parse($virtualExam->end_time_at)->format('H:i:s') : '';

                return $virtualExam;
            });
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classNames = $this->classroomRepository->getActiveClassNameAll();

            if (!empty($classNameId)) {
                $subjects = $this->subjectRepository->getSubjectsByClassNameId($classNameId);
            }
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classNames = $this->classroomRepository->getTeacherClassNames($teacherId);

            if (!empty($classNameId)) {
                $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassNameId($teacherId, $classNameId);
            }
        }

        // exam modes
        $virtualExamModes = buildEnumOptionsArray(VirtualExamMode::cases());

        return Inertia::render('OnlineExam/ExamSchedule', [
            'virtualExams' => $virtualExams,
            'virtualExamModes' => $virtualExamModes,
            'classNames' => $classNames,
            'subjects' => $subjects
        ]);
    }

    /*
    *   Assign Exam Question
    */
    public function assignExamQuestion(int $virtualExamId, Request $request): Response
    {
        $virtualExam = $this->virtualExamRepository->getVirtualExamById($virtualExamId);

        abort_if($virtualExam == null, 404);

        $classNameId = $virtualExam?->class_name_id;
        $subjectId = $virtualExam?->subject_id;
        $onlineTopicId = null;
        $virtualAssetId = null;
        $questionType = '';
        $difficultyLevel = '';
        $language = '';
        $onlineTopics = [];
        $virtualAssets = [];
        $virtualQuestions = [];
        $assignedQuestions = [];
        $virtualQuestionIds = [];

        if ($request->isMethod('POST')) {
            $onlineTopicId = $request->online_topic_id ?? null;
            $virtualAssetId = $request->virtual_asset_id ?? null;
            $questionType = $request->question_type ?? '';
            $difficultyLevel = $request->difficulty_level ?? '';
            $language = $request->language ?? '';
        }

        // assigned questions
        if (!empty($virtualExam->questions)) {
            $questions = json_decode($virtualExam->questions, true);

            $virtualExam['questions'] = $questions;

            $virtualQuestionIds = collect($questions)->pluck('virtual_question_id')->toArray();

            $assignedQuestions = $this->virtualExamRepository->getVirtualQuestionsByIds($virtualQuestionIds);
        }

        if (!empty($classNameId) && !empty($subjectId)) {
            $onlineTopics = $this->onlineTopicRepository->getOnlineDiscussionsByClassNameIdAndSubjectId($classNameId, $subjectId);
            $virtualAssets = $this->virtualExamRepository->getFilteredVirtualAssets($classNameId, $subjectId, null, VirtualAssetType::PASSAGE->value, true);
            $virtualQuestions = $this->virtualExamRepository->getFilteredVirtualQuestions(
                $classNameId,
                $subjectId,
                $onlineTopicId,
                $virtualAssetId,
                $questionType,
                $difficultyLevel,
                $language
            )?->map(function ($virtualQuestion) use ($virtualQuestionIds) {
                $virtualQuestion['is_assigned'] = in_array($virtualQuestion->id, $virtualQuestionIds);

                return $virtualQuestion;
            });
        }

        // question types
        $questionTypes = buildEnumOptionsArray(VirtualQuestionType::cases());

        // difficulty levels
        $difficultyLevels = buildEnumOptionsArray(DifficultyLevel::cases());

        // languages
        $languages = buildEnumOptionsArray(Language::cases());

        return Inertia::render('OnlineExam/AssignExamQuestion', [
            'virtualExam' => $virtualExam,
            'onlineTopics' => $onlineTopics,
            'virtualAssets' => $virtualAssets,
            'questionTypes' => $questionTypes,
            'difficultyLevels' => $difficultyLevels,
            'languages' => $languages,
            'virtualQuestions' => $virtualQuestions,
            'assignedQuestions' => $assignedQuestions
        ]);
    }

    /*
    *   Save Assign Exam Question
    */
    public function saveAssignExamQuestion(int $virtualExamId, Request $request): RedirectResponse
    {
        $virtualExam = $this->virtualExamRepository->getVirtualExamById($virtualExamId);

        abort_if($virtualExam == null, 404);

        $input = $request->validate([
            'questions' => ['required', 'array']
        ]);

        $dataArray = [
            'questions' => !empty($input['questions']) ? json_encode($input['questions']) : null,
        ];

        $updateVirtualExam = $this->virtualExamRepository->update($virtualExamId, $dataArray);

        if (!$updateVirtualExam) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->route('online_exam.assign_exam_grade', $virtualExamId)->with('message', 'Question assigned successfully');
    }

    /*
    *   Assign Exam Grade
    */
    public function assignExamGrade(int $virtualExamId): Response
    {
        $virtualExam = $this->virtualExamRepository->getVirtualExamById($virtualExamId);

        abort_if($virtualExam == null, 404);

        $virtualExam['classrooms'] = !empty($virtualExam->classrooms) ? json_decode($virtualExam->classrooms) : [];

        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classrooms = [];

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classrooms = $this->classroomRepository->getActiveAll();
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId);
        }

        return Inertia::render('OnlineExam/AssignExamGrade', [
            'virtualExam' => $virtualExam,
            'classrooms' => $classrooms
        ]);
    }

    /*
    *   Save Assign Exam Grade
    */
    public function saveAssignExamGrade(int $virtualExamId, Request $request): RedirectResponse
    {
        $virtualExam = $this->virtualExamRepository->getVirtualExamById($virtualExamId);

        abort_if($virtualExam == null, 404);

        $input = $request->validate([
            'classroom_ids' => ['required', 'array']
        ]);

        $dataArray = [
            'classrooms' => !empty($input['classroom_ids']) ? json_encode($input['classroom_ids']) : null,
        ];

        $updateVirtualExam = $this->virtualExamRepository->update($virtualExamId, $dataArray);

        if (!$updateVirtualExam) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->route('online_exam.exam_finished', $virtualExamId)->with('message', 'Class assigned successfully');
    }

    /*
    *   Create Exam
    */
    public function examFinished(int $virtualExamId): Response
    {
        $virtualExam = $this->virtualExamRepository->getVirtualExamById($virtualExamId);

        abort_if($virtualExam == null, 404);

        return Inertia::render('OnlineExam/ExamFinished', [
            'virtualExam' => $virtualExam
        ]);
    }

    /*
    *   Question Bank
    */
    public function questionBank(Request $request): Response
    {
        $search = null;
        if ($request->isMethod('POST')) {
            $search = $request->input('search') ?? null;
        }

        $virtualQuestionBanks = $this->virtualExamRepository->getVirtualQuestionBanks(null, $search);
        return Inertia::render('OnlineExam/QuestionBank', [
            'virtualQuestionBanks' => $virtualQuestionBanks
        ]);
    }

    /*
    *  Save Question Bank
    */
    public function saveQuestionBank(VirtualQuestionBankRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'created_by' => auth()->user()->id,
            'title' => $input['title'] ?? 'No Title',
            'description' => $input['description'] ?? '',
            'status' => Status::ACTIVE
        ];

        $virtualQuestionBank = $this->virtualExamRepository->createVirtualQuestionBank($dataArray);

        if (!$virtualQuestionBank) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Question Bank created successfully');
    }

    /**
     * Update Question Bank
     */
    public function updateQuestionBank(int $id, VirtualQuestionBankRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $virtualQuestionBank = $this->virtualExamRepository->getVirtualQuestionBankById($id);

        abort_if($virtualQuestionBank == null, 404);


        $dataArray = [
            'title' => $input['title'] ?? '',
            'description' => $input['description'] ?? '',
        ];

        $updateQuestionBank = $this->virtualExamRepository->updateVirtualQuestionBank($id, $dataArray);

        if (!$updateQuestionBank) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Question Bank updated successfully');
    }

    /**
     * Delete Question Bank
     */
    public function deleteQuestionBank(int $id): RedirectResponse
    {
        $virtualQuestionBank = $this->virtualExamRepository->getVirtualQuestionBankById($id);

        abort_if($virtualQuestionBank == null, 404);

        $deleteQuestionBank = $this->virtualExamRepository->deleteVirtualQuestionBank($id);

        if (!$deleteQuestionBank) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Question Bank deleted successfully');
    }

    /*
    *   Assign Question Bank Question
    */
    public function assignQuestionBankQuestion(int $id, Request $request): Response
    {
        $virtualQuestionBank = $this->virtualExamRepository->getVirtualQuestionBankById($id);
        abort_if($virtualQuestionBank == null, 404);

        $virtualAssignedQusetionsIds = [];

        if (!empty($virtualQuestionBank->questions)) {
            $virtualAssignedQusetionsIds = json_decode($virtualQuestionBank->questions) ?? [];
        }
        $virtualQuestions = $this->virtualExamRepository->getVirtualQuestions();

        return Inertia::render('OnlineExam/AssignQuestionBankQuestion', [
            'virtualQuestions' => $virtualQuestions,
            'virtualAssignedQusetionsIds' => $virtualAssignedQusetionsIds,
        ]);
    }

    /*
    *   Update Assign Question Bank Question
    */
    public function updateQuestionBankQuestions(int $id, Request $request): RedirectResponse
    {
        $virtualQuestionBank = $this->virtualExamRepository->getVirtualQuestionBankById($id);
        abort_if($virtualQuestionBank == null, 404);

        $input = $request->validate([
            'questionCheck' => ['nullable', 'array']
        ]);

        $dataArray = [
            'questions' => !empty($input['questionCheck']) ? json_encode($input['questionCheck']) : null,
        ];

        $virtualQuestionBankQuestion = $this->virtualExamRepository->updateVirtualQuestionBank($id, $dataArray);

        if (!$virtualQuestionBankQuestion) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Question assigned successfully');
    }

    /*
    *   Buy Question
    */
    public function buyQuestion(Request $request): Response
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;
        $classNameId = null;
        $subjectId = null;
        $classNames = [];
        $subjects = [];

        if ($request->isMethod('POST')) {
            $classNameId = $request->class_name_id ?? null;
            $subjectId = $request->subject_id ?? null;
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classNames = $this->classroomRepository->getActiveClassNameAll();

            if (!empty($classNameId)) {
                $subjects = $this->subjectRepository->getSubjectsByClassNameId($classNameId);
            }
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classNames = $this->classroomRepository->getTeacherClassNames($teacherId);

            if (!empty($classNameId)) {
                $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassNameId($teacherId, $classNameId);
            }
        }

        return Inertia::render('OnlineExam/BuyQuestion', [
            'classNames' => $classNames,
            'subjects' => $subjects,
        ]);
    }
}
