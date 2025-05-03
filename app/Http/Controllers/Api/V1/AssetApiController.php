<?php

namespace App\Http\Controllers\Api\V1;

use Carbon\Carbon;
use App\Enums\Status;
use Illuminate\Http\Request;
use App\Enums\UserRole;
use App\Enums\ResourceType;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use App\Repositories\IFileRepository;
use App\Repositories\IAssetRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\ITopicRepository;
use Illuminate\Support\Facades\Storage;
use App\Repositories\ISubjectRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IOnlineTopicRepository;
use App\Http\Requests\LearningMaterialRequest;
use App\Repositories\ILearningMaterialRepository;
use App\Http\Requests\LearningMaterialGroupRequest;
use App\Http\Requests\ClassroomLearningMaterialRequest;
use App\Http\Controllers\Api\ControllerApi;

class AssetApiController extends ControllerApi
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
        $this->_upload = new \App\Http\Controllers\UploadFileController();
    }

    /**
     * @OA\Get(
     *    path="/assets/list",
     *    operationId="indexAsset",
     *    tags={"LearningMaterial"},
     *    summary="Get all learning materials",
     *    description="Get all learning materials",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function indexAsset(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->userId) && !empty($request->role) ) { 
            $role = $request->role;
            $userId = $request->userId;
            $teacher = $this->staffRepository->getTeacherByUserId($userId, $request->schoolId);
            $teacherId = $teacher?->id;
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $classNames = $this->classroomRepository->getActiveClassNameAndId($request->schoolId, $academicYearId);
            $subjects = $this->subjectRepository->getActiveAll($request->schoolId);

            $learningMaterialGroups = [];
            $onlineTopics = [];
            $studentClassNames = [];
            $classrooms = [];
            $classSubjects = [];
            $shareLearningMaterialGroups = [];

            $shareClassId = $request->class_id ?? null;
            $studentClassNameId = $request->student_class_name_id ?? null;
            $classNameId = $request->class_name_id ?? null;
            $subjectId = $request->subject_id ?? null;

            if (!empty($classNameId) && !empty($subjectId)) {
                $learningMaterialGroups = $this->learningMaterialRepository->getLearningMaterialGroupsByClassNameIdAndSubjectId($classNameId, $subjectId, $request->schoolId, $academicYearId);
                $onlineTopics = $this->onlineTopicRepository->getOnlineDiscussionsByClassNameIdAndSubjectId($classNameId, $subjectId, $request->schoolId, $academicYearId);
            }

            if (!empty($studentClassNameId)) {
                if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
                    $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId, $studentClassNameId, $request->schoolId, $academicYearId);
                    $classSubjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassNameId($teacherId, $studentClassNameId, $request->schoolId, $academicYearId);
                } else {
                    $classrooms = $this->classroomRepository->getByClassNameId($studentClassNameId, $request->schoolId, $academicYearId);
                    $classSubjects = $this->subjectRepository->getSubjectsByClassNameId($studentClassNameId, $request->schoolId, $academicYearId);
                }
            }

            if (!empty($shareClassId)) {
                $materialGroups = $this->learningMaterialRepository->getLearningMaterialGroupsForShare($shareClassId, $request->schoolId, $academicYearId);

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
            

            if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
                $studentClassNames = $this->classroomRepository->getActiveClassNameAll($request->schoolId, $academicYearId);
            } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
                $studentClassNames = $this->classroomRepository->getTeacherClassNames($teacherId, $request->schoolId, $academicYearId);
            }

            $resourceTypes = [];

            foreach (ResourceType::cases() as $case) {
                array_push($resourceTypes, ['id' => $case->value, 'title' => $case->value]);
            }

            return response()->json([
                'success' => true,
                'data' => $learningMaterialGroups,
                // 'data2' => [
                //     'classNames' => $classNames,
                //     'subjects' => $subjects,
                //     'learningMaterialGroups' => $learningMaterialGroups,
                //     'onlineTopics' => $onlineTopics,
                //     'studentClassNames' => $studentClassNames,
                //     'classrooms' => $classrooms,
                //     'classSubjects' => $classSubjects,
                //     'shareLearningMaterialGroups' => $shareLearningMaterialGroups
                // ]
            ], 200);
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => []
            ], 200);
        }
    }

    /**
     * @OA\Get(
     *    path="/assets/resource-types/list",
     *    operationId="getResourceTypes",
     *    tags={"LearningMaterial"},
     *    summary="Get all resource types",
     *    description="Get all resource types",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function getResourceTypes(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $resourceTypes = [];
            foreach (ResourceType::cases() as $case) {
                array_push($resourceTypes, ['id' => $case->value, 'title' => $case->value]);
            }
            
            return response()->json([
                'success' => true,
                'data' => !empty($resourceTypes) ? $resourceTypes : null
            ], 200);
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => []
            ], 200);
        }
    }

    /**
     * @OA\Post(
     * path="/assets/folder/save",
     * summary="Save Leanring Material Group",
     * description="Save Leanring Material Group",
     * operationId="saveFolderOrMaterialGroup",
     * tags={"LearningMaterial"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Save Leanring Material Group",
     *    @OA\JsonContent(
     *       required={"schoolId", "userId", "title","class_name_id","subject_id"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="class_name_id", type="interger", example="demo"),
     *       @OA\Property(property="subject_id", type="interger", example=""),
     *       @OA\Property(property="userId", type="interger", example=""),
     *       @OA\Property(property="title", type="string", example=""),
     *    ),
     * ),
     * @OA\Response(
     *    response=422,
     *    description="Error response",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, Can't Create")
     *        )
     *     )
     * )
     */
    public function saveFolderOrMaterialGroup(LearningMaterialGroupRequest $request)
    {
        if ( !empty($request->schoolId) && !empty($request->userId) && !empty($request->title) ) { 
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $input = $request->validated();
            $dataArray = [
                'school_id' => $request->schoolId,
                'academic_year_id' => $academicYearId,
                'class_name_id' => $input['class_name_id'] ?? null,
                'subject_id' => $input['subject_id'] ?? null,
                'user_id' => $request->userId,
                'title' => $input['title'] ?? "",
                'description' => $input['description'] ?? null,
                'status' => Status::ACTIVE,
            ];
            $learningMaterialGroup = $this->learningMaterialRepository->createLearningMaterialGroup($dataArray);
            return response()->json([
                'success' => true,
                'message' => 'Created Successfully',
                'data' => $learningMaterialGroup
            ], 200);
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => []
            ], 200);
        }

    }


    /**
     * @OA\Post(
     * path="/assets/learning-material/save",
     * summary="Save Leanring Material",
     * description="Save Leanring Material",
     * operationId="saveLearnMaterial",
     * tags={"LearningMaterial"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Save Leanring Material",
     *    @OA\JsonContent(
     *       required={"schoolId", "userId", "title","learning_material_group_id","online_topic_id"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="learning_material_group_id", type="interger", example="demo"),
     *       @OA\Property(property="online_topic_id", type="interger", example=""),
     *       @OA\Property(property="userId", type="interger", example=""),
     *       @OA\Property(property="title", type="string", example=""),
     *       @OA\Property(property="content", type="string", example=""),
     *    ),
     * ),
     * @OA\Response(
     *    response=422,
     *    description="Error response",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, Can't Create")
     *        )
     *     )
     * )
     */
    public function saveLearnMaterial(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->userId) && !empty($request->title) ) { 
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $input = $request->all();
            DB::beginTransaction();
            try {
                $dataArray = [
                    'school_id' => $request->schoolId,
                    'academic_year_id' => $academicYearId,
                    'learning_material_group_id' => $input['learning_material_group_id'] ?? null,
                    'online_topic_id' => $input['online_topic_id'] ?? null,
                    'user_id' => $request->userId,
                    'title' => $input['title'] ?? "",
                    'content' => $input['content'] ?? null,
                    'status' => Status::ACTIVE,
                ];
                $learningMaterial = $this->learningMaterialRepository->create($dataArray);
                if (!empty($input['learning_material_group_id'])) {
                    $learningMaterial->learningMaterialGroups()->attach($input['learning_material_group_id']);
                }
            
                DB::commit();

                $learningMaterialUpdate = $this->learningMaterialRepository->getLearningMaterialById($learningMaterial->id, $request->schoolId, $academicYearId);

                return response()->json([
                    'success' => true,
                    'message' => 'Created Successfully',
                    'data' => $learningMaterialUpdate
                ], 200);

            } 
            catch (\Throwable $th) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Can not Create',
                    'data' => null
                ], 200);
            }
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => null
            ], 200);
        }
    }

    /**
     * @OA\Post(
     * path="/assets/learning-material/resource/save",
     * summary="Save resource",
     * description="Save resource",
     * operationId="saveLearnMaterialResources",
     * tags={"LearningMaterial"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Save resource",
     *    @OA\JsonContent(
     *       required={"schoolId", "schoolKey", "userId", "title","learning_material_id","online_topic_id"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="learning_material_id", type="interger", example="demo"),
     *       @OA\Property(property="online_topic_id", type="interger", example=""),
     *       @OA\Property(property="userId", type="interger", example=""),
     *       @OA\Property(property="title", type="string", example=""),
     *       @OA\Property(property="description", type="string", example=""),
     *    ),
     * ),
     * @OA\Response(
     *    response=422,
     *    description="Error response",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, Can't Create")
     *        )
     *     )
     * )
     */
    public function saveLearnMaterialResources(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->learning_material_id) && !empty($request->title) && !empty($request->schoolKey) ) { 
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $input = $request->all();
            DB::beginTransaction();
            try {
    
                $resourceType = $input['resourse_type'] ?? "";
                $link = null;

                if ($resourceType == ResourceType::LINK->value) {
                    $link = $input['link'] ?? null;
                } 
                else if ($resourceType == ResourceType::YOUTUBE->value) {
                    $link = $input['youtube_link'] ?? null;
                }

                $dataArray = [
                    'school_id' => $request->schoolId,
                    'academic_year_id' => $academicYearId,
                    'learning_material_id' => $input['learning_material_id'],
                    'type' => $resourceType,
                    'title' => $input['title'] ?? null,
                    'description' => $input['description'] ?? null,
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
                if (!empty($fieldName) && !empty($input[$fieldName])) {
                    $uploadedFile = $this->_upload->uploadSingleFile($request, $fieldName, 'resource', $request->schoolKey);
                    if (!empty($uploadedFile)) {
                        $dataArray = [
                            'school_id' => $request->schoolId,
                            'academic_year_id' => $academicYearId,
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

                DB::commit();

                $resource = $this->learningMaterialRepository->getLearningMaterialResourceById($learningMaterialResource->id, $request->schoolId, $academicYearId);

                return response()->json([
                    'success' => true,
                    'message' => 'Created Successfully',
                    'data' => $resource
                ], 200);

            } 
            catch (\Throwable $th) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Can not Create',
                    'data' => null
                ], 200);
            }
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => null
            ], 200);
        }
    }

    

    /**
     * Update Learning Material Group
     */
    public function updateLearnMaterial(int $id, Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->title) ) { 
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $input = $request->all();
            DB::beginTransaction();

            try {
                $dataArray = [
                    'online_topic_id' => $input['online_topic_id'] ?? null,
                    'title' => $input['title'] ?? "",
                    'content' => $input['content'] ?? null,
                    'status' => Status::ACTIVE,
                ];
                $learningMaterial = $this->learningMaterialRepository->update($id, $dataArray);
          
                DB::commit();

                $learningMaterialUpdate = $this->learningMaterialRepository->getLearningMaterialById($id, $request->schoolId, $academicYearId);

                return response()->json([
                    'success' => true,
                    'message' => 'updated Successfully',
                    'data' => $learningMaterialUpdate
                ], 200);
            } 
            catch (\Throwable $th) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Can not Create',
                    'data' => null
                ], 200);
            }
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => null
            ], 200);
        }
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

    /**
     * @OA\Delete(
     *     path="/assets/learning-material/resource/delete/{id}",
     *     tags={"LearningMaterial"},
     *     summary="Delete resource",
     *     operationId="deleteLearnMaterialResources",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="id to delete",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         ),
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid ID supplied",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Resource not found",
     *     ),
     *     security={ {"sanctum": {} }},
     * )
     */
    public function deleteLearnMaterialResources(int $id, Request $request)
    {
        if ( !empty($request->schoolId) ) {
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $resource = $this->learningMaterialRepository->getLearningMaterialResourceById($id, $request->schoolId, $academicYearId);
            if( !empty($resource->id) ) {
                $resourceDelete = $this->learningMaterialRepository->deleteLearningMaterialResource($id);
            }
            return response()->json([
                'success' => true,
                'message' => 'Deleted successfully',
                'data' => $resource
            ], 200); 
        }
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => ['id' => $id]
            ], 200);
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
     * @OA\Post(
     * path="/assets/classroom-learning-material/save",
     * summary="Assigned Classroom to Leanring Material",
     * description="Assigned Classroom to Leanring Material",
     * operationId="saveAssignClassroomLearningMaterial",
     * tags={"LearningMaterial"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Assigned Classroom to Leanring Material",
     *    @OA\JsonContent(
     *       required={"schoolId", "classroom_ids", "class_subject_id","type"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="classroom_ids", type="interger", example="demo"),
     *       @OA\Property(property="class_subject_id", type="interger", example=""),
     *       @OA\Property(property="type", type="string", example="all_group"),
     *    ),
     * ),
     * @OA\Response(
     *    response=422,
     *    description="Error response",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, Can't Create")
     *        )
     *     )
     * )
     */
    public function saveAssignClassroomLearningMaterial(ClassroomLearningMaterialRequest $request)
    {
        if ( !empty($request->schoolId) && !empty($request->type) ) { 
            $input = $request->validated();
            DB::beginTransaction();
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            try {
                // assign all learning material group
                if ($input['type'] == 'all_group' && !empty($input['class_name_id']) && !empty($input['subject_id'])) {
                    $learningMaterialGroups = $this->learningMaterialRepository->getLearningMaterialGroupsByClassNameIdAndSubjectId($input['class_name_id'], $input['subject_id'], $request->schoolId, $academicYearId);

                    if (count($learningMaterialGroups) > 0) {
                        foreach ($learningMaterialGroups as $learningMaterialGroup) {
                            $attributesToCheck = [
                                'school_id' => $request->schoolId,
                                'academic_year_id' => $academicYearId,
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
                    $learningMaterialGroup = $this->learningMaterialRepository->getLearningMaterialGroupById($input['learning_material_group_id'], $request->schoolId, $academicYearId);
                    if ($learningMaterialGroup?->learningMaterials?->count() > 0) {
                        $attributesToCheck = [
                            'school_id' => $request->schoolId,
                            'academic_year_id' => $academicYearId,
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
                    $learningMaterial = $this->learningMaterialRepository->getLearningMaterialById($input['learning_material_id'], $request->schoolId, $academicYearId);
                    if ($learningMaterial != null) {
                        $attributesToCheck = [
                            'school_id' => $request->schoolId,
                            'academic_year_id' => $academicYearId,
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
                return response()->json([
                    'success' => true,
                    'message' => 'Save Successfully',
                    'data' => $learningMaterialGroups
                ], 200);
            } 
            catch (\Throwable $th) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Can not Create',
                    'data' => null
                ], 200);
            }
            return response()->json([
                'success' => false,
                'message' => 'Can not Create',
                'data' => null
            ], 200);
        }
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => null
            ], 200);
        }
    }

    /**
     * @OA\Post(
     * path="/assets/share-learning-material/save",
     * summary="Save Share Leanring Material",
     * description="Save Share Leanring Material",
     * operationId="saveShareLearningMaterial",
     * tags={"LearningMaterial"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Save Share Leanring Material",
     *    @OA\JsonContent(
     *       required={"schoolId", "learning_material_id", "learning_material_group_ids"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="learning_material_id", type="interger", example="demo"),
     *       @OA\Property(property="learning_material_group_ids", type="interger", example=""),
     *    ),
     * ),
     * @OA\Response(
     *    response=422,
     *    description="Error response",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, Can't Create")
     *        )
     *     )
     * )
     */
    public function saveShareLearningMaterial(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->learning_material_id) && !empty($request->learning_material_group_ids) ) 
        { 
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $input = $request->validate([
                'learning_material_id' => ['required', 'integer'],
                'learning_material_group_ids' => ['required', 'array'],
            ]);

            DB::beginTransaction();

            try {
                $learningMaterial = $this->learningMaterialRepository->getLearningMaterialById($input['learning_material_id'], $request->schoolId, $academicYearId);
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

                return response()->json([
                    'success' => true,
                    'message' => 'Save Succsssfully',
                    'data' => $learningMaterial
                ], 200);

            } 
            catch (\Throwable $th) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Can not Create',
                    'data' => null
                ], 200);
            }
        }
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => null
            ], 200);
        }
    }

}
