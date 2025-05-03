<?php

namespace App\Http\Controllers\Api\V1;


use App\Enums\Status;
use App\Http\Controllers\Api\ControllerApi;
use App\Repositories\IImageRepository;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Enums\WebmessageAudienceType;
use App\Http\Requests\WebmessageRequest;
use App\Repositories\IStudentRepository;
use App\Repositories\IWebmessageRepository;

class WebmessageApiController extends ControllerApi
{
    private $_upload;

    public function __construct(
        private IWebmessageRepository $webmessageRepository,
        private IStudentRepository $studentRepository,
        private IImageRepository $imageRepository,
    ) {
        $this->_upload = new \App\Http\Controllers\UploadFileController();
    }
    
    /**
     * @OA\Get(
     *    path="/webmessages/inbox",
     *    operationId="inboxWebmessage",
     *    tags={"Webmessage"},
     *    summary="Get inbox messages",
     *    description="Get inbox messages",
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
    public function inboxWebmessage(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->userId) ) { 
            //$academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $messages = $this->webmessageRepository->getMessageInbox($request->schoolId, $request->userId);
            return response()->json([
                'success' => true,
                'data' => $messages
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
     *    path="/webmessages/sent",
     *    operationId="sentWebmessage",
     *    tags={"Webmessage"},
     *    summary="Get sent messages",
     *    description="Get sent messages",
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
    public function sentWebmessage(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->userId) ) { 
            //$academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $messages = $this->webmessageRepository->getMessageSent($request->schoolId, $request->userId);
            return response()->json([
                'success' => true,
                'data' => $messages
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
     * path="/webmessages/save",
     * summary="Save web messages",
     * description="Save web messages",
     * operationId="saveWebmessage",
     * tags={"Webmessage"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Create Syllabus",
     *    @OA\JsonContent(
     *       required={"schoolId", "schoolKey", "subject","sender_id","audience_type","body"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="schoolKey", type="interger", example="demo"),
     *       @OA\Property(property="subject", type="interger", example="demo"),
     *       @OA\Property(property="sender_id", type="interger", example="demo"),
     *       @OA\Property(property="audience_type", type="string", example=""),
     *       @OA\Property(property="body", type="string", example=""),
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
    public function saveWebmessage(Request $request)
    {
        if (!empty($request->schoolKey) && !empty($request->schoolId) && !empty($request->subject) && !empty($request->sender_id) && !empty($request->audience_type) ) {
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $recipientIds = [];
            if($request->audience_type == WebmessageAudienceType::PARENTS->value) {
                $classroomtIds = json_decode($request->recipientIds);
                if(!empty($classroomtIds[0])) {
                    foreach($classroomtIds as $cId) {
                        $userIds = $this->studentRepository->getActiveAll($cId, null, null, $request->schoolId, $academicYearId)->map(function($student) {
                            return $student->fatherUserId;
                        })->toArray();
                        $recipientIds = @array_merge($recipientIds, $userIds);
                    }
                }
            }
            elseif($request->audience_type == WebmessageAudienceType::TEACHERS->value) {
                $recipientIds = json_decode($request->recipientIds);
            }

            $audience_data_json = json_encode([
                'audience_type' => $request->audience_type ?? null,
                'enable_type' => 'Assign To Classes Wise',
                'all_selected' => null,
                'ids' => $recipientIds
            ]);

            // class image
            if ( !empty($request->file('messageFile')) ) {
                $image_url = $this->_upload->uploadImage($request, 'messageFile', 'message_image', $request->schoolKey);
            }

            $dataArray = array(
                'school_id' => $request->schoolId,
                'sender_id' => $request->sender_id,
                'audience_type' => $request->audience_type,
                'audience_data' => $audience_data_json ?? null,
                'subject' => $request->subject,
                'image' => !empty($image_url) ? $image_url : null,
                'body' => !empty($request->body) ? $request->body : "",
                'read_at' => !empty($input['read_at']) ? Carbon::parse($request->read_at)->toDateString() : null,
                'status' => Status::ACTIVE,
            );

            $message = $this->webmessageRepository->create($dataArray);
            if( !empty($recipientIds[0]) ) {
                $message->recipients()->attach($recipientIds);
            }
            return response()->json([
                'success' => true,
                'message' => 'created successfully',
                'data' => $message
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
     *    path="/webmessages/show/{id}",
     *    operationId="showWebmessage",
     *    tags={"Webmessage"},
     *    summary="Show Webmessage Details",
     *    description="Show Webmessage Details",
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
    public function showWebmessage(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $message = $this->webmessageRepository->getById($id);
            $message->load(['sender', 'recipients' => function($q) {
                $q->withPivot('read_at');
            }]);

            return response()->json([
                'success' => true,
                'data' => $message,
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
     *     path="/webmessages/delete/{id}",
     *     tags={"Webmessage"},
     *     summary="Delete webmessage",
     *     operationId="deleteWebmessage",
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
     *         description="Data not found",
     *     ),
     *     security={ {"sanctum": {} }},
     * )
     */
    public function deleteWebmessage(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $message =  $this->webmessageRepository->delete($id);
            return response()->json([
                'success' => true,
                'message' => 'Deleted successfully',
                'data' => $message
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