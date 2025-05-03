<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\ControllerApi;
use Illuminate\Http\Request;
use App\Events\MessageSent;
use App\Models\ChatMessage;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class ChatApiController extends ControllerApi
{
    
    public function __construct() {
        // do something
    }
    
    /**
     * @OA\Post(
     * path="/chat/classrooms",
     * summary="save classrooms chat",
     * description="save classrooms chat",
     * operationId="saveChatMessage",
     * tags={"Chat"},
     * @OA\RequestBody(
     *    required=true,
     *    description="save classrooms chat",
     *    @OA\JsonContent(
     *       required={"schoolId", "sender_id","receiver_id","message"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="sender_id", type="interger", example="demo"),
     *       @OA\Property(property="receiver_id", type="interger", example=""),
     *       @OA\Property(property="message", type="string", example=""),
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
    public function saveChatMessage(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->sender_id) && !empty($request->receiver_id) && !empty($request->message) ) { 
            //$academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $user = User::find($request->receiver_id);
            $message = ChatMessage::create([
                'school_id' => $request->schoolId,
                'sender_id' => $request->sender_id,
                'receiver_id' => $request->receiver_id,
                'text' => $request->message,
            ]);
            broadcast(new MessageSent($user, $message))->toOthers();
            return response()->json([
                'success' => true,
                'message' => 'Sent Successfully',
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
}