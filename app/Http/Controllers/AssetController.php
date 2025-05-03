<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\UserRole;
use App\Enums\ResourceType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\AssetRequest;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Auth;
use App\Repositories\AssetRepository;
use App\Repositories\IFileRepository;
use App\Repositories\TopicRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IAssetRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\ITopicRepository;
use App\Repositories\SubjectRepository;
use Illuminate\Support\Facades\Storage;
use App\Repositories\ISubjectRepository;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\OnlineTopicRequest;
use App\Repositories\ClassroomRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IOnlineTopicRepository;
use App\Http\Requests\LearningMaterialRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Repositories\ILearningMaterialRepository;
use App\Http\Requests\LearningMaterialGroupRequest;
use App\Http\Requests\ClassroomLearningMaterialRequest;

class AssetController extends Controller
{
    private $_upload;

    public function __construct(
        private IAssetRepository $assetRepository,
        private ISubjectRepository $subjectRepository,
        private IClassroomRepository $classroomRepository,
        private ITopicRepository $topicRepository,
        private ILearningMaterialRepository $learningMaterialRepository,
        private IOnlineTopicRepository $onlineTopicRepository,
        private IFileRepository $fileRepository,
        private IStaffRepository $staffRepository
    ) {
        $this->_upload = new UploadFileController();
        $this->middleware('permission:view academic content', ['only' => ['index', 'assessmentActivity', 'downloadLearningMaterialResourceFile']]);
        $this->middleware('permission:add academic content', ['only' => ['create', 'saveLearningMaterialGroup', 'saveLearningMaterial', 
            'saveOnlineTopic', 'save', 'assignClassroomLearningMaterial', 'shareLearningMaterial'
        ]]);
        $this->middleware('permission:edit academic content', ['only' => ['edit', 'update', 'updateLearningMaterialGroup', 'updateLearningMaterial',
            'updateOnlineTopic'
        ]]);
        $this->middleware('permission:delete academic content', ['only' => ['destroy', 'assessmentActivityDelete', 
            'deleteLearningMaterialGroup', 'deleteLearningMaterial', 'deleteLearningMaterialResource', 'destroy'
        ]]);
    }

    /**
     * Display the schools.
     */
    public function index(Request $request): Response
    {
        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('Asset/Show', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;

        $classNames = $this->classroomRepository->getActiveClassNameAndId();
        $subjects = $this->subjectRepository->getActiveAll();
        $learningMaterialGroups = [];
        $onlineTopics = [];
        $studentClassNames = [];
        $classrooms = [];
        $classSubjects = [];
        $shareLearningMaterialGroups = [];

        if ($request->isMethod('POST')) {
            $shareClassId = $request->class_id ?? null;
            $studentClassNameId = $request->student_class_name_id ?? null;
            $classNameId = $request->class_name_id ?? null;
            $subjectId = $request->subject_id ?? null;

            if (!empty($classNameId) && !empty($subjectId)) {
                $learningMaterialGroups = $this->learningMaterialRepository->getLearningMaterialGroupsByClassNameIdAndSubjectId($classNameId, $subjectId);
                $onlineTopics = $this->onlineTopicRepository->getOnlineDiscussionsByClassNameIdAndSubjectId($classNameId, $subjectId);
            }

            if (!empty($studentClassNameId)) {
                if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
                    $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId, $studentClassNameId);
                    $classSubjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassNameId($teacherId, $studentClassNameId);
                } else {
                    $classrooms = $this->classroomRepository->getByClassNameId($studentClassNameId);
                    $classSubjects = $this->subjectRepository->getSubjectsByClassNameId($studentClassNameId);
                }
            }

            if (!empty($shareClassId)) {
                $materialGroups = $this->learningMaterialRepository->getLearningMaterialGroupsForShare($shareClassId);

                if (count($materialGroups) > 0) {
                    foreach ($materialGroups as $materialGroup) {
                        $subjectId = $materialGroup->subject_id;

                        if (!isset($shareLearningMaterialGroups[$subjectId])) {
                            $shareLearningMaterialGroups[$subjectId] = [
                                'subject_title' => $materialGroup?->subject?->title,
                                'learning_material_groups' => [],
                            ];
                        }

                        $shareLearningMaterialGroups[$subjectId]['learning_material_groups'][] = [
                            'id' => $materialGroup->id,
                            'title' => $materialGroup->title,
                        ];
                    }
                }

                $shareLearningMaterialGroups = !empty($shareLearningMaterialGroups) ? array_values($shareLearningMaterialGroups) : [];
            }
        }

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $studentClassNames = $this->classroomRepository->getActiveClassNameAll();
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $studentClassNames = $this->classroomRepository->getTeacherClassNames($teacherId);
        }

        $resourceTypes = [];

        foreach (ResourceType::cases() as $case) {
            array_push($resourceTypes, ['id' => $case->value, 'title' => $case->value]);
        }

        return Inertia::render('Asset/Create', [
            'classNames' => $classNames,
            'subjects' => $subjects,
            'learningMaterialGroups' => $learningMaterialGroups,
            'onlineTopics' => $onlineTopics,
            'resourceTypes' => $resourceTypes,
            'studentClassNames' => $studentClassNames,
            'classrooms' => $classrooms,
            'classSubjects' => $classSubjects,
            'shareLearningMaterialGroups' => $shareLearningMaterialGroups
        ]);
    }

    /**
     * Save Learning Material Group
     */
    public function saveLearningMaterialGroup(LearningMaterialGroupRequest $request)
    {
        $input = $request->validated();

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'class_name_id' => $input['class_name_id'] ?? null,
            'subject_id' => $input['subject_id'] ?? null,
            'user_id' => auth()->user()->id,
            'title' => $input['title'] ?? "",
            'description' => $input['description'] ?? null,
            'status' => Status::ACTIVE,
        ];

        $learningMaterialGroup = $this->learningMaterialRepository->createLearningMaterialGroup($dataArray);

        if (!$learningMaterialGroup) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Group created successfully');
    }

    /**
     * Update Learning Material Group
     */
    public function updateLearningMaterialGroup(int $id, LearningMaterialGroupRequest $request)
    {
        $input = $request->validated();

        $dataArray = [
            'title' => $input['title'] ?? "",
            'description' => $input['description'] ?? null,
        ];

        $updateLearningMaterialGroup = $this->learningMaterialRepository->updateLearningMaterialGroup($id, $dataArray);

        if (!$updateLearningMaterialGroup) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Group created successfully');
    }


    /**
     * Save Learning Material
     */
    public function saveLearningMaterial(LearningMaterialRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'learning_material_group_id' => $input['learning_material_group_id'] ?? null,
                'online_topic_id' => $input['online_topic_id'] ?? null,
                'user_id' => auth()->user()->id,
                'title' => $input['title'] ?? "",
                'content' => $input['content'] ?? null,
                'status' => Status::ACTIVE,
            ];

            $learningMaterial = $this->learningMaterialRepository->create($dataArray);

            if (!empty($input['learning_material_group_id'])) {
                $learningMaterial->learningMaterialGroups()->attach($input['learning_material_group_id']);
            }

            // save learning material resources
            if (!empty($input['resources'])) {
                foreach ($input['resources'] as $index => $resource) {
                    $resourceType = $resource['resourse_type'] ?? "";
                    $link = null;

                    if ($resourceType == ResourceType::LINK->value) {
                        $link = $resource['link'] ?? null;
                    } else if ($resourceType == ResourceType::YOUTUBE->value) {
                        $link = $resource['youtube_link'] ?? null;
                    }

                    $dataArray = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'learning_material_id' => $learningMaterial->id,
                        'type' => $resourceType,
                        'title' => $resource['title'] ?? null,
                        'description' => $resource['description'] ?? null,
                        'link' => $link,
                        'status' => Status::ACTIVE,
                    ];

                    $learningMaterialResource = $this->learningMaterialRepository->createLearningMaterialResource($dataArray);

                    // get file field name
                    switch ($resourceType) {
                        case ResourceType::WORKSHEET->value:
                            $fieldName = "worksheet";
                            break;

                        case ResourceType::DOCUMENT->value:
                            $fieldName = "document";
                            break;

                        case ResourceType::PICTURE->value:
                            $fieldName = "upload_picture";
                            break;

                        case ResourceType::AUDIO->value:
                            $fieldName = "upload_audio";
                            break;

                        default:
                            $fieldName = "";
                            break;
                    }

                    // upload file
                    if (!empty($fieldName) && !empty($resource[$fieldName])) {
                        $uploadedFile = $this->_upload->uploadResourceFile($request, $index, $fieldName, 'resource');

                        if (!empty($uploadedFile)) {
                            $dataArray = [
                                'school_id' => getUserSchoolId(),
                                'academic_year_id' => getAcademicYearId(),
                                'fileable_type' => $learningMaterialResource->getMorphClass(),
                                'fileable_id' => $learningMaterialResource->id,
                                'name' => $uploadedFile['name'] ?? null,
                                'file_name' => $uploadedFile['file_name'] ?? null,
                                'path' => $uploadedFile['path'] ?? "",
                                'status' => Status::ACTIVE,
                            ];

                            $this->fileRepository->morphCreate($dataArray);
                        }
                    }
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Learning material created successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }

    /**
     * Update Learning Material
     */
    public function updateLearningMaterial(int $id, LearningMaterialRequest $request)
    {
        $learningMaterial = $this->learningMaterialRepository->getLearningMaterialById($id);

        abort_if(empty($learningMaterial), 404);

        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = [
                'online_topic_id' => $input['online_topic_id'] ?? null,
                'title' => $input['title'] ?? "",
                'content' => $input['content'] ?? null
            ];

            $this->learningMaterialRepository->update($id, $dataArray);

            // save learning material resources
            if (!empty($input['resources'])) {
                foreach ($input['resources'] as $index => $resource) {
                    $resourceType = $resource['resourse_type'] ?? "";
                    $link = null;

                    if ($resourceType == ResourceType::LINK->value) {
                        $link = $resource['link'] ?? null;
                    } else if ($resourceType == ResourceType::YOUTUBE->value) {
                        $link = $resource['youtube_link'] ?? null;
                    }

                    $dataArray = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'learning_material_id' => $learningMaterial->id,
                        'type' => $resourceType,
                        'title' => $resource['title'] ?? null,
                        'description' => $resource['description'] ?? null,
                        'link' => $link,
                        'status' => Status::ACTIVE,
                    ];

                    $learningMaterialResource = $this->learningMaterialRepository->createLearningMaterialResource($dataArray);

                    // get file field name
                    switch ($resourceType) {
                        case ResourceType::WORKSHEET->value:
                            $fieldName = "worksheet";
                            break;

                        case ResourceType::DOCUMENT->value:
                            $fieldName = "document";
                            break;

                        case ResourceType::PICTURE->value:
                            $fieldName = "upload_picture";
                            break;

                        case ResourceType::AUDIO->value:
                            $fieldName = "upload_audio";
                            break;

                        default:
                            $fieldName = "";
                            break;
                    }

                    // upload file
                    if (!empty($fieldName) && !empty($resource[$fieldName])) {
                        $uploadedFile = $this->_upload->uploadResourceFile($request, $index, $fieldName, 'resource');

                        if (!empty($uploadedFile)) {
                            $dataArray = [
                                'school_id' => getUserSchoolId(),
                                'academic_year_id' => getAcademicYearId(),
                                'fileable_type' => $learningMaterialResource->getMorphClass(),
                                'fileable_id' => $learningMaterialResource->id,
                                'name' => $uploadedFile['name'] ?? null,
                                'file_name' => $uploadedFile['file_name'] ?? null,
                                'path' => $uploadedFile['path'] ?? "",
                                'status' => Status::ACTIVE,
                            ];

                            $this->fileRepository->morphCreate($dataArray);
                        }
                    }
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Learning material updated successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }

    /**
     * Save Learning Material Group
     */
    public function saveOnlineTopic(OnlineTopicRequest $request)
    {
        $input = $request->validated();

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'class_name_id' => $input['class_name_id'] ?? null,
            'subject_id' => $input['subject_id'] ?? null,
            'title' => $input['title'] ?? "",
            'status' => Status::ACTIVE,
        ];

        $onlineTopic = $this->onlineTopicRepository->create($dataArray);

        if (!$onlineTopic) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Topic added successfully');
    }


    /**
     * Update Learning Material Group
     */
    public function updateOnlineTopic(int $id, OnlineTopicRequest $request)
    {
        $input = $request->validated();

        $dataArray = [
            'title' => $input['title'] ?? "",
        ];

        $onlineTopic = $this->onlineTopicRepository->update($id, $dataArray);

        if (!$onlineTopic) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Topic updated successfully');
    }

    /*
    *   download learning material resource file
    */
    public function downloadLearningMaterialResourceFile(int $id)
    {
        try {
            $file = $this->fileRepository->getFileById($id);

            abort_if(empty($file), 404);

            $path = !empty($file->path) ? explode('/', $file->path) : [];
            $fileName = end($path);
            $filePath = getUserSchoolKey() . '/' . config('upload.directories.' . $file->name) . $file?->fileable?->learningMaterial?->user_id . "/" . $fileName;

            $disk = Storage::disk('s3');
            $stream = $disk->readStream($filePath);

            return response()->stream(function () use ($stream) {
                fpassthru($stream);
            }, 200, [
                'Content-Type' => $disk->mimeType($filePath),
                'Content-Length' => $disk->size($filePath),
                'Content-Disposition' => 'attachment; filename="' . basename($filePath) . '"',
            ]);
        } catch (\Throwable $th) {
            return redirect()->to(URL::previous())->with('error', 'Something goes wrong.');
        }
    }

    /*
    *   delete learning material group
    */
    public function deleteLearningMaterialGroup(int $id)
    {
        $learningMaterialGroup = $this->learningMaterialRepository->getLearningMaterialGroupById($id);

        abort_if(empty($learningMaterialGroup), 404);

        $learningMaterialGroup->loadMissing('classroomLearningMaterials');

        DB::beginTransaction();

        try {
            if ($learningMaterialGroup?->classroomLearningMaterials?->count() > 0) {
                return redirect()->back()->with('error', "Item cannot be deleted, It's in use.");
            }

            if ($learningMaterialGroup?->user_id != auth()->user()->id) {
                return redirect()->back()->with('error', 'Something goes wrong.');
            }

            if ($learningMaterialGroup?->materials?->count() > 0) {
                $learningMaterialGroup->materials->each(function ($learningMaterial) {
                    if ($learningMaterial?->learningMaterialResources?->count() > 0) {
                        $learningMaterial->learningMaterialResources->each(function ($learningMaterialResource) {
                            $filePath = "";

                            if ($learningMaterialResource?->file != null) {
                                $file = $learningMaterialResource->file;
                                $path = !empty($file->path) ? explode('/', $file->path) : [];
                                $fileName = end($path);
                                $filePath = getUserSchoolKey() . '/' . config('upload.directories.' . $file->name) . $file?->fileable?->learningMaterial?->user_id . "/" . $fileName;

                                $learningMaterialResource->file->delete();
                            }

                            $deleteResource = $this->learningMaterialRepository->deleteLearningMaterialResource($learningMaterialResource->id);

                            if ($deleteResource && $filePath != "" && Storage::disk('s3')->exists($filePath)) {
                                Storage::disk('s3')->delete($filePath);
                            }
                        });
                    }

                    if ($learningMaterial?->classroomLearningMaterials?->count() > 0) {
                        $learningMaterial->classroomLearningMaterials->each(function ($classroomLearningMaterial) {
                            $classroomLearningMaterial->delete();
                        });
                    }

                    $this->learningMaterialRepository->delete($learningMaterial->id);
                });
            }

            $this->learningMaterialRepository->deleteLearningMaterialGroup($id);

            DB::commit();

            return redirect()->back()->with('message', 'Group deleted successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /*
    *   delete learning material
    */
    public function deleteLearningMaterial(int $id)
    {
        $learningMaterial = $this->learningMaterialRepository->getLearningMaterialById($id);

        abort_if(empty($learningMaterial), 404);

        $learningMaterial->loadMissing(['learningMaterialResources.file', 'classroomLearningMaterials']);

        DB::beginTransaction();

        try {
            if ($learningMaterial?->user_id != auth()->user()->id) {
                return redirect()->back()->with('error', 'Something goes wrong.');
            }

            if ($learningMaterial?->learningMaterialResources?->count() > 0) {
                $learningMaterial->learningMaterialResources->each(function ($learningMaterialResource) {
                    $filePath = "";

                    if ($learningMaterialResource?->file != null) {
                        $file = $learningMaterialResource->file;
                        $path = !empty($file->path) ? explode('/', $file->path) : [];
                        $fileName = end($path);
                        $filePath = getUserSchoolKey() . '/' . config('upload.directories.' . $file->name) . $file?->fileable?->learningMaterial?->user_id . "/" . $fileName;

                        $learningMaterialResource->file->delete();
                    }

                    $deleteResource = $this->learningMaterialRepository->deleteLearningMaterialResource($learningMaterialResource->id);

                    if ($deleteResource && $filePath != "" && Storage::disk('s3')->exists($filePath)) {
                        Storage::disk('s3')->delete($filePath);
                    }
                });
            }

            if ($learningMaterial?->classroomLearningMaterials?->count() > 0) {
                $learningMaterial->classroomLearningMaterials->each(function ($classroomLearningMaterial) {
                    $classroomLearningMaterial->delete();
                });
            }

            $this->learningMaterialRepository->delete($id);

            DB::commit();

            return redirect()->back()->with('message', 'Learning Material deleted successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /*
    *   delete learning material resource
    */
    public function deleteLearningMaterialResource(int $id)
    {
        $learningMaterialResource = $this->learningMaterialRepository->getLearningMaterialResourceById($id);

        abort_if(empty($learningMaterialResource), 404);

        DB::beginTransaction();

        try {
            if ($learningMaterialResource?->learningMaterial?->user_id != auth()->user()->id) {
                return redirect()->back()->with('error', 'Something goes wrong.');
            }

            $filePath = "";

            if ($learningMaterialResource?->file != null) {
                $file = $learningMaterialResource->file;
                $path = !empty($file->path) ? explode('/', $file->path) : [];
                $fileName = end($path);
                $filePath = getUserSchoolKey() . '/' . config('upload.directories.' . $file->name) . $file?->fileable?->learningMaterial?->user_id . "/" . $fileName;

                $learningMaterialResource->file->delete();
            }

            $learningMaterialResource->delete();

            if ($filePath != "" && Storage::disk('s3')->exists($filePath)) {
                Storage::disk('s3')->delete($filePath);
            }

            DB::commit();

            return redirect()->back()->with('message', 'Resource deleted successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /**
     * Assign Classroom Learning Material
     */
    public function assignClassroomLearningMaterial(ClassroomLearningMaterialRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            // assign all learning material group
            if ($input['type'] == 'all_group' && !empty($input['class_name_id']) && !empty($input['subject_id'])) {
                $learningMaterialGroups = $this->learningMaterialRepository->getLearningMaterialGroupsByClassNameIdAndSubjectId($input['class_name_id'], $input['subject_id']);

                if (count($learningMaterialGroups) > 0) {
                    foreach ($learningMaterialGroups as $learningMaterialGroup) {
                        $attributesToCheck = [
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => getAcademicYearId(),
                            'learning_material_group_id' => $learningMaterialGroup->id,
                            'subject_id' => $input['class_subject_id'] ?? null,
                        ];

                        $valuesToUpdate = [
                            'status' => Status::ACTIVE,
                        ];

                        if ($learningMaterialGroup?->learningMaterials?->count() > 0) {

                            foreach ($learningMaterialGroup?->learningMaterials as $learningMaterial) {
                                $attributesToCheck['learning_material_id'] = $learningMaterial?->id;

                                if (!empty($input['classroom_ids'])) {
                                    foreach ($input['classroom_ids'] as $classroomId) {
                                        $attributesToCheck['classroom_id'] = $classroomId;

                                        $this->learningMaterialRepository->updateOrCreateClassroomLearningMaterial($attributesToCheck, $valuesToUpdate);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // assign single learning material group
            if ($input['type'] == 'single_group' && !empty($input['learning_material_group_id'])) {
                $learningMaterialGroup = $this->learningMaterialRepository->getLearningMaterialGroupById($input['learning_material_group_id']);

                if ($learningMaterialGroup?->learningMaterials?->count() > 0) {
                    $attributesToCheck = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'learning_material_group_id' => $learningMaterialGroup->id,
                        'subject_id' => $input['class_subject_id'] ?? null,
                    ];

                    $valuesToUpdate = [
                        'status' => Status::ACTIVE,
                    ];

                    foreach ($learningMaterialGroup?->learningMaterials as $learningMaterial) {
                        $attributesToCheck['learning_material_id'] = $learningMaterial?->id;

                        if (!empty($input['classroom_ids'])) {
                            foreach ($input['classroom_ids'] as $classroomId) {
                                $attributesToCheck['classroom_id'] = $classroomId;

                                $this->learningMaterialRepository->updateOrCreateClassroomLearningMaterial($attributesToCheck, $valuesToUpdate);
                            }
                        }
                    }
                }
            }

            //assign single learning material
            if ($input['type'] == 'single_material' && !empty($input['learning_material_id'])) {
                $learningMaterial = $this->learningMaterialRepository->getLearningMaterialById($input['learning_material_id']);

                if ($learningMaterial != null) {
                    $attributesToCheck = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'learning_material_group_id' => $input['learning_material_group_id'],
                        'learning_material_id' => $learningMaterial?->id,
                        'subject_id' => $input['class_subject_id'] ?? null,
                    ];

                    $valuesToUpdate = [
                        'status' => Status::ACTIVE,
                    ];

                    if (!empty($input['classroom_ids'])) {
                        foreach ($input['classroom_ids'] as $classroomId) {
                            $attributesToCheck['classroom_id'] = $classroomId;

                            $this->learningMaterialRepository->updateOrCreateClassroomLearningMaterial($attributesToCheck, $valuesToUpdate);
                        }
                    }
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Item assigned successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }

    /**
     * Share Learning Material
     */
    public function shareLearningMaterial(Request $request)
    {
        $input = $request->validate([
            'learning_material_id' => ['required', 'integer'],
            'learning_material_group_ids' => ['required', 'array'],
        ]);

        DB::beginTransaction();

        try {
            $learningMaterial = $this->learningMaterialRepository->getLearningMaterialById($input['learning_material_id']);
            $learningMaterial->loadMissing('learningMaterialGroups');

            $existingGroups = $learningMaterial->learningMaterialGroups()->pluck('is_shared', 'learning_material_group_id')->toArray();

            // Determine groups to remove (those not in the new list and are shared)
            $groupsToRemove = array_filter(
                array_diff(array_keys($existingGroups), $input['learning_material_group_ids']),
                fn($groupId) => $existingGroups[$groupId]
            );

            // Determine new groups to attach (those not in existing groups)
            $newGroupIds = array_diff($input['learning_material_group_ids'], array_keys($existingGroups));
            $groupsToAttach = array_fill_keys($newGroupIds, ['is_shared' => true]);

            // Remove old shared groups
            $learningMaterial->learningMaterialGroups()->detach($groupsToRemove);

            // Attach new groups with shared status
            $learningMaterial->learningMaterialGroups()->attach($groupsToAttach);

            DB::commit();

            return redirect()->back()->with('message', 'Item shared successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }

    /**
     * Update the user's profile information.
     */
    public function save(AssetRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = array(
            'title' => $input['title'],
            'affiliation_no' => !empty($input['affiliation_no']) ? $input['affiliation_no'] : "",
            'school_number' => !empty($input['school_number']) ? $input['school_number'] : "",
            'description' => !empty($input['description']) ? $input['description'] : "",
            'parent_id' => !empty($input['parent_id']) ? intval($input['parent_id']) : 0,
            'board_id' => !empty($input['board_id']) ? intval($input['board_id']) : 0,
            'country_id' => !empty($input['country_id']) ? intval($input['country_id']) : 0,
            'state_id' => !empty($input['state_id']) ? intval($input['state_id']) : 0,
            'timezone_id' => !empty($input['timezone_id']) ? intval($input['timezone_id']) : 0,
            'city' => !empty($input['city']) ? $input['city'] : "",
            'zip' => !empty($input['zip']) ? $input['zip'] : "",
            'phone' => !empty($input['phone']) ? $input['phone'] : "",
            'phone_2' => !empty($input['phone_2']) ? $input['phone_2'] : "",
            'mail' => !empty($input['mail']) ? $input['mail'] : "",
            'udise_code' => !empty($input['udise_code']) ? $input['udise_code'] : "",
            'display_name_board' => !empty($input['display_name_board']) ? $input['display_name_board'] : "",
            'established_at' => !empty($input['established_at']) ? $input['established_at'] : "",
            'medium' => !empty($input['medium']) ? $input['medium'] : "",
            'android_app_url' => !empty($input['android_app_url']) ? $input['android_app_url'] : "",
            'google_business_url' => !empty($input['google_business_url']) ? $input['google_business_url'] : "",
            'street_address' => !empty($input['street_address']) ? $input['street_address'] : "",
            'status' => Status::ACTIVE,
        );

        $school = $this->schoolRepository->create();

        return Redirect::route('asset.list');
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Asset/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(AssetRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        // return Redirect::route('asset.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
