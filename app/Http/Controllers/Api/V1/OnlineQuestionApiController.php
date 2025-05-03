<?php

namespace App\Http\Controllers\Api\V1;


use App\Enums\Status;
use App\Http\Controllers\Api\ControllerApi;
use App\Repositories\IOnlineQuestionRepository;
use App\Repositories\IImageRepository;
use App\Repositories\IOnlineTopicRepository;
use Illuminate\Http\Request;
use Carbon\Carbon;

class OnlineQuestionApiController extends ControllerApi
{
    private $_upload;

    public function __construct(
        private IOnlineQuestionRepository $onlineQuestionRepository,
        private IOnlineTopicRepository $onlineTopicRepository,
        private IImageRepository $imageRepository,
    ) {
        $this->_upload = new \App\Http\Controllers\UploadFileController();
    }
    
    /**
     * @OA\Get(
     *    path="/online-questions/list",
     *    operationId="indexOnlineQuestion",
     *    tags={"OnlineQuestion"},
     *    summary="Get all Online Question",
     *    description="Get all Online Question",
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
    public function indexOnlineQuestion(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $online_topic_id = !empty($request->online_topic_id) ? $request->online_topic_id : null;
            $onlineQuestions = $this->onlineQuestionRepository->getActiveAll($request->class_name_id, $request->subject_id, $online_topic_id, $request->schoolId, $academicYearId);
            return response()->json([
                'success' => true,
                'data' => $onlineQuestions
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
     *    path="/online-questions/me",
     *    operationId="myOnlineQuestion",
     *    tags={"OnlineQuestion"},
     *    summary="Get my Online Question",
     *    description="Get my Online Question",
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
    public function myOnlineQuestion(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->userId) ) { 
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $online_topic_id = !empty($request->online_topic_id) ? $request->online_topic_id : null;
            $onlineQuestions = $this->onlineQuestionRepository->myActiveAll($request->userId, $request->class_name_id, $request->subject_id, $online_topic_id, $request->schoolId, $academicYearId);
            return response()->json([
                'success' => true,
                'data' => $onlineQuestions
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
     *    path="/online-questions/resolved",
     *    operationId="resolvedOnlineQuestion",
     *    tags={"OnlineQuestion"},
     *    summary="Get resolved Online Question",
     *    description="Get resolved Online Question",
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
    public function resolvedOnlineQuestion(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $online_topic_id = !empty($request->online_topic_id) ? $request->online_topic_id : null;
            $onlineQuestions = $this->onlineQuestionRepository->resolvedActiveAll($request->class_name_id, $request->subject_id, $online_topic_id, $request->schoolId, $academicYearId);
            return response()->json([
                'success' => true,
                'data' => $onlineQuestions
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
     *    path="/online-questions/new",
     *    operationId="newOnlineQuestion",
     *    tags={"OnlineQuestion"},
     *    summary="Get new Online Question",
     *    description="Get new Online Question",
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
    public function newOnlineQuestion(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $online_topic_id = !empty($request->online_topic_id) ? $request->online_topic_id : null;
            $onlineQuestions = $this->onlineQuestionRepository->newActiveAll($request->class_name_id, $request->subject_id, $online_topic_id, $request->schoolId, $academicYearId);
            return response()->json([
                'success' => true,
                'data' => $onlineQuestions
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
     *    path="/online-questions/unanswer",
     *    operationId="unanswerOnlineQuestion",
     *    tags={"OnlineQuestion"},
     *    summary="Get unanswered Online Question",
     *    description="Get unanswered Online Question",
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
    public function unanswerOnlineQuestion(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $online_topic_id = !empty($request->online_topic_id) ? $request->online_topic_id : null;
            $onlineQuestions = $this->onlineQuestionRepository->unansweredActiveAll($request->class_name_id, $request->subject_id, $online_topic_id, $request->schoolId, $academicYearId);
            return response()->json([
                'success' => true,
                'data' => $onlineQuestions
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
     *    path="/online-questions/discussions",
     *    operationId="getQuestionDiscussions",
     *    tags={"OnlineQuestion"},
     *    summary="Get all discussions of Question",
     *    description="Get all discussions of Question",
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
    public function getQuestionDiscussions(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->online_question_id) ) { 
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $type = !empty($request->type) ? $request->type : null;
            $userId = !empty($request->userId) ? $request->userId : null;
            $discussions = $this->onlineQuestionRepository->getDiscussionActiveAll($type, $request->online_question_id, $userId, $request->schoolId);
            return response()->json([
                'success' => true,
                'data' => $discussions
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
     * path="/online-questions/discussion/save",
     * summary="Save discussion Question",
     * description="Save discussion Question",
     * operationId="saveQuestionDiscussion",
     * tags={"OnlineQuestion"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Save discussion Question",
     *    @OA\JsonContent(
     *       required={"schoolId", "userId", "description", "online_question_id"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="online_question_id", type="interger", example="1"),
     *       @OA\Property(property="type", type="string", example="Reply"),
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
    public function saveQuestionDiscussion(Request $request)
    {
        if (!empty($request->description) && !empty($request->schoolId) && !empty($request->userId) ) {
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $dataArray = [
                'user_id' => $request->userId,
                'school_id' => $request->schoolId,
                'academic_year_id' => $academicYearId,
                'online_question_id' => $request->online_question_id,
                'description' => $request->description,
                'type' => $request->type ?? 'Reply',
                'status' => Status::ACTIVE->value,
            ];
            $discussion =  $this->onlineQuestionRepository->createDiscussion($dataArray);
            return response()->json([
                'success' => true,
                'message' => 'created successfully',
                'data' => $discussion
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
     * path="/online-questions/resolved/save",
     * summary="Save Resolved",
     * description="Save Resolved",
     * operationId="saveResolvedQuestion",
     * tags={"OnlineQuestion"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Save Resolved",
     *    @OA\JsonContent(
     *       required={"schoolId", "is_resolved", "id"},
     *       @OA\Property(property="id", type="interger", example="1"),
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="is_resolved", type="string", example="Resolved"),
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
    public function saveResolvedQuestion(Request $request, int $id)
    {
        if (!empty($request->is_resolved) && !empty($request->schoolId) ) {

            $dataArray = [
                'question_status' => $request->is_resolved,
            ];
            $onlineQuestion = $this->onlineQuestionRepository->update($id, $dataArray);

            return response()->json([
                'success' => true,
                'message' => 'Resolved successfully',
                'data' => $onlineQuestion
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
     * path="/online-questions/save",
     * summary="Save Online Question",
     * description="Save Online Question",
     * operationId="saveOnlineQuestion",
     * tags={"OnlineQuestion"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Save Online Question",
     *    @OA\JsonContent(
     *       required={"schoolId", "userId", "schoolKey","description"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="class_name_id", type="interger", example="1"),
     *       @OA\Property(property="subject_id", type="interger", example="1"),
     *       @OA\Property(property="schoolKey", type="interger", example="demo"),
     *       @OA\Property(property="choice", type="string", example=""),
     *       @OA\Property(property="OnlineQuestionType", type="string", example=""),
     *       @OA\Property(property="start_date_at", type="string", example=""),
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
    public function saveOnlineQuestion(Request $request)
    {
        if (!empty($request->description) && !empty($request->schoolId) && !empty($request->userId) && !empty($request->schoolKey) ) {
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $start_date_at = !empty($request->start_date_at) ? \Carbon\Carbon::parse($request->start_date_at)->format('Y-m-d H:i:s') : date('Y-m-d H:i:s');

            
            // class image
            if (!empty($request->file('file_path'))) {
                $file_url = $this->_upload->uploadImage($request, 'file_path', 'online_question_image', $request->schoolKey);
            }

            $dataArray = [
                'user_id' => $request->userId,
                'school_id' => $request->schoolId,
                'academic_year_id' => $academicYearId,
                'class_name_id' => $request->class_name_id ?? Null,
                'subject_id' => $request->subject_id ?? Null,
                'online_topic_id' => $request->online_topic_id ?? Null,
                'choice' => $request->choice ?? "",
                'description' => $request->description,
                'file_video_path' => $request->file_video_path ?? null,
                'file_audio_path' => $request->file_audio_path ?? null,
                'file_path' => $file_url ?? null,
                'start_date_at' => $start_date_at,
                'question_status' => 'New',
                'status' => Status::ACTIVE->value,
            ];

            $onlineQuestion =  $this->onlineQuestionRepository->create($dataArray);
            return response()->json([
                'success' => true,
                'message' => 'created successfully',
                'data' => $onlineQuestion
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
     * @OA\Put(
     * path="/online-questions/update/{id}",
     * summary="Update OnlineQuestion",
     * description="Update OnlineQuestion",
     * operationId="updateOnlineQuestion",
     * tags={"OnlineQuestion"},
     *    @OA\Parameter(
     *    in="path",
     *    name="id",
     *    required=true,
     *    description="Update Online Question",
     *    @OA\Schema(type="string"),
     *    @OA\Examples(example="int", value="1", summary="An int value."),
     * ),
     * @OA\RequestBody(
     *    required=true,
     *    description="Update OnlineQuestion",
     *    @OA\JsonContent(
     *       required={"schoolId", "schoolKey", "classNameId","classSubjectId","startDateAt","submissionDateAt"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="schoolKey", type="interger", example="demo"),
     *       @OA\Property(property="classNameId", type="interger", example="demo"),
     *       @OA\Property(property="classSubjectId", type="interger", example="demo"),
     *       @OA\Property(property="startDateAt", type="string", example=""),
     *       @OA\Property(property="submissionDateAt", type="string", example=""),
     *       @OA\Property(property="homeFile", type="string", example="file"),
     *       @OA\Property(property="homeCameraFile", type="string", example="file"),
     *       @OA\Property(property="homeDocFile", type="string", example="file"),
     *       @OA\Property(property="homeFileUrl", type="string", example="url"),
     *    ),
     * ),
     * @OA\Response(
     *    response=422,
     *    description="Error response",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, Can't Update")
     *        )
     *     )
     * )
     */
    public function updateOnlineQuestion(Request $request, int $id)
    {
        if (!empty($request->description) && !empty($request->schoolId) && !empty($request->userId) && !empty($request->schoolKey) ) {
            $dataArray = [
                'class_name_id' => $request->class_name_id ?? Null,
                'subject_id' => $request->subject_id ?? Null,
                'online_topic_id' => $request->online_topic_id ?? Null,
                'description' => $request->description,
                'file_video_path' => $request->file_video_path ?? null,
                'file_audio_path' => $request->file_audio_path ?? null,
                'status' => Status::ACTIVE->value,
            ];

            if (!empty($request->file('file_path'))) {
                $dataArray['file_path'] = $this->_upload->uploadImage($request, 'file_path', 'online_question_image', $request->schoolKey);
            }

            $onlineQuestion =  $this->onlineQuestionRepository->update($id, $dataArray);
            return response()->json([
                'success' => true,
                'message' => 'Updated successfully',
                'data' => $onlineQuestion
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
     *    path="/online-questions/show/{id}",
     *    operationId="showOnlineQuestion",
     *    tags={"OnlineQuestion"},
     *    summary="Show OnlineQuestion Details",
     *    description="Show OnlineQuestion Details",
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
    public function showOnlineQuestion(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $OnlineQuestion = $this->onlineQuestionRepository->getById($id);
            return response()->json([
                'success' => true,
                'data' => $OnlineQuestion,
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
    
    /**
     * @OA\Delete(
     *     path="/online-questions/delete/{id}",
     *     tags={"OnlineQuestion"},
     *     summary="Delete OnlineQuestion",
     *     operationId="destroyOnlineQuestion",
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
     *         description="Classwork not found",
     *     ),
     *     security={ {"sanctum": {} }},
     * )
     */
    public function destroyOnlineQuestion(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $onlineQuestion =  $this->onlineQuestionRepository->delete($id);
            return response()->json([
                'success' => true,
                'message' => 'Deleted successfully',
                'data' => $onlineQuestion
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

    /**
     * @OA\Get(
     *    path="/online-topics/list",
     *    operationId="indexOnlineTopic",
     *    tags={"OnlineTopic"},
     *    summary="Get all Online Topic",
     *    description="Get all Online Topic",
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
    public function indexOnlineTopic(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $online_topic_id = !empty($request->online_topic_id) ? $request->online_topic_id : null;
            $onlineQuestions = $this->onlineTopicRepository->getOnlineDiscussionsByClassNameIdAndSubjectId($request->class_name_id, $request->subject_id, $request->schoolId, $academicYearId);
            return response()->json([
                'success' => true,
                'data' => $onlineQuestions
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
     * path="/online-topics/save",
     * summary="Save Online Topic",
     * description="Save Online Topic",
     * operationId="saveOnlineTopic",
     * tags={"OnlineTopic"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Save Online Topic",
     *    @OA\JsonContent(
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="class_name_id", type="interger", example="1"),
     *       @OA\Property(property="subject_id", type="interger", example="1"),
     *       @OA\Property(property="schoolKey", type="interger", example="demo"),
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
    public function saveOnlineTopic(Request $request)
    {
        if (!empty($request->title) && !empty($request->schoolId) ) {
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $dataArray = [
                'school_id' => $request->schoolId,
                'academic_year_id' => $academicYearId,
                'class_name_id' => $request->class_name_id ?? Null,
                'subject_id' => $request->subject_id ?? Null,
                'title' => $request->title ?? "",
                'status' => Status::ACTIVE->value,
            ];

            $onlineTopic =  $this->onlineTopicRepository->create($dataArray);
            return response()->json([
                'success' => true,
                'message' => 'Created successfully',
                'data' => $onlineTopic
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
     * @OA\Put(
     * path="/online-topics/update/{id}",
     * summary="Update Online Topic",
     * description="Update Online Topic",
     * operationId="updateOnlineTopic",
     * tags={"OnlineTopic"},
     *    @OA\Parameter(
     *    in="path",
     *    name="id",
     *    required=true,
     *    description="Update Online Question",
     *    @OA\Schema(type="string"),
     *    @OA\Examples(example="int", value="1", summary="An int value."),
     * ),
     * @OA\RequestBody(
     *    required=true,
     *    description="Update OnlineQuestion",
     *    @OA\JsonContent(
     *       required={"schoolId", "schoolKey", "classNameId","classSubjectId","startDateAt","submissionDateAt"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="schoolKey", type="interger", example="demo"),
     *       @OA\Property(property="classNameId", type="interger", example="demo"),
     *       @OA\Property(property="classSubjectId", type="interger", example="demo"),
     *       @OA\Property(property="startDateAt", type="string", example=""),
     *       @OA\Property(property="submissionDateAt", type="string", example=""),
     *       @OA\Property(property="homeFile", type="string", example="file"),
     *       @OA\Property(property="homeCameraFile", type="string", example="file"),
     *       @OA\Property(property="homeDocFile", type="string", example="file"),
     *       @OA\Property(property="homeFileUrl", type="string", example="url"),
     *    ),
     * ),
     * @OA\Response(
     *    response=422,
     *    description="Error response",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, Can't Update")
     *        )
     *     )
     * )
     */
    public function updateOnlineTopic(Request $request, int $id)
    {
        if (!empty($request->description) && !empty($request->schoolId) && !empty($request->userId)) {
            $dataArray = [
                'title' => $request->title ?? "",
            ];
            $topic =  $this->onlineTopicRepository->update($id, $dataArray);
            return response()->json([
                'success' => true,
                'message' => 'Updated successfully',
                'data' => $topic
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
     *    path="/online-topics/show/{id}",
     *    operationId="showOnlineTopic",
     *    tags={"OnlineTopic"},
     *    summary="Show topic Details",
     *    description="Show topic Details",
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
    public function showOnlineTopic(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $OnlineQuestion = $this->onlineTopicRepository->getById($id);
            return response()->json([
                'success' => true,
                'data' => $OnlineQuestion,
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
    
    /**
     * @OA\Delete(
     *     path="/online-topics/delete/{id}",
     *     tags={"OnlineTopic"},
     *     summary="Delete Online Topic",
     *     operationId="deleteOnlineTopic",
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
     *         description="Classwork not found",
     *     ),
     *     security={ {"sanctum": {} }},
     * )
     */
    public function deleteOnlineTopic(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $onlineQuestion =  $this->onlineTopicRepository->delete($id);
            return response()->json([
                'success' => true,
                'message' => 'Deleted successfully',
                'data' => $onlineQuestion
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

    
}