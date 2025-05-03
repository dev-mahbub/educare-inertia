<?php

namespace App\Http\Controllers\Api\V1;


use App\Enums\Status;
use App\Http\Controllers\Api\ControllerApi;
use App\Models\SchoolSetting;
use App\Repositories\ILeaveRepository;
use App\Repositories\IImageRepository;
use Illuminate\Http\Request;
use Carbon\Carbon;

class LeaveApiController extends ControllerApi
{
    private $_upload;

    public function __construct(
        private ILeaveRepository $leaveRepository,
        private IImageRepository $imageRepository,
    ) {
        $this->_upload = new \App\Http\Controllers\UploadFileController();
    }
    
    /**
     * @OA\Get(
     *    path="/leaves/all",
     *    operationId="indexLeave",
     *    tags={"Leave"},
     *    summary="Get all Leave",
     *    description="Get all Leave",
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
    public function indexLeave(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $type = !empty($request->type) ? $request->type : null;
            $leaves = $this->leaveRepository->getLeaveBySearch($type, $request->schoolId);
            return response()->json([
                'success' => true,
                'data' => $leaves
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
     *    path="/leaves/student/all",
     *    operationId="studentLeaves",
     *    tags={"Leave"},
     *    summary="Get student Leaves",
     *    description="Get student Leaves",
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
    public function studentLeaves(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->userId) ) { 
            $type = !empty($request->type) ? $request->type : null;
            $isApproved = !empty($request->isApproved) ? $request->isApproved : false;
            $isCancelled = !empty($request->isCancelled) ? $request->isCancelled : false;
            $leaves = $this->leaveRepository->getStudentLeaveBySearch($type, $request->userId, $request->schoolId, $isApproved, $isCancelled);
            return response()->json([
                'success' => true,
                'data' => $leaves
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
     * path="/leaves/create",
     * summary="Create Leave",
     * description="Create Leave",
     * operationId="createLeave",
     * tags={"Leave"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Create Leave",
     *    @OA\JsonContent(
     *       required={"schoolId", "userId", "title","leaveType","startDateAt","endDateAt"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="userId", type="interger", example="1"),
     *       @OA\Property(property="title", type="string", example=""),
     *       @OA\Property(property="leaveType", type="string", example=""),
     *       @OA\Property(property="startDateAt", type="string", example=""),
     *       @OA\Property(property="endDateAt", type="string", example=""),
     *       @OA\Property(property="description", type="string", example=""),
     *       @OA\Property(property="isApproved", type="integer", example="0"),
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
    public function createLeave(Request $request)
    {
        if (!empty($request->title) && !empty($request->schoolId) && !empty($request->userId)) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $academicYearId = $setting?->academic_year_id;
            $startDateAt = !empty($request->startDateAt) ? \Carbon\Carbon::parse($request->startDateAt)->format('Y-m-d') : date('Y-m-d');
            $endDateAt = !empty($request->endDateAt) ? \Carbon\Carbon::parse($request->endDateAt)->format('Y-m-d') : date('Y-m-d');
            $dataArray = [
                'user_id' => $request->userId,
                'school_id' => $request->schoolId,
                'academic_year_id' => $academicYearId,
                'leave_type' => $request->leaveType,
                'title' => $request->title,
                'description' => $request->description,
                'start_date_at' => $startDateAt,
                'end_date_at' => $endDateAt,
                'is_approved' => $request->isApproved,
                'status' => Status::ACTIVE->value,
            ];

            $leave =  $this->leaveRepository->create($dataArray);
            return response()->json([
                'success' => true,
                'message' => 'created successfully',
                'data' => $leave
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
     * path="/leaves/update/{id}",
     * summary="Update Leave",
     * description="Update Leave",
     * operationId="updateLeave",
     * tags={"Leave"},
     *    @OA\Parameter(
     *    in="path",
     *    name="id",
     *    required=true,
     *    description="Update Leave",
     *    @OA\Schema(type="string"),
     *    @OA\Examples(example="int", value="1", summary="An int value."),
     * ),
     * @OA\RequestBody(
     *    required=true,
     *    description="Update Leave",
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
    public function updateLeave(Request $request, int $id)
    {
        if (!empty($request->title) && !empty($request->schoolId) && !empty($request->userId)) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $academicYearId = $setting?->academic_year_id;
            $startDateAt = !empty($request->startDateAt) ? \Carbon\Carbon::parse($request->startDateAt)->format('Y-m-d') : date('Y-m-d');
            $endDateAt = !empty($request->endDateAt) ? \Carbon\Carbon::parse($request->endDateAt)->format('Y-m-d') : date('Y-m-d');
            $dataArray = [
                'user_id' => $request->userId,
                'school_id' => $request->schoolId,
                'academic_year_id' => $academicYearId,
                'leave_type' => $request->leaveType,
                'title' => $request->title,
                'description' => $request->description,
                'start_date_at' => $startDateAt,
                'end_date_at' => $endDateAt,
                'is_approved' => $request->isApproved,
                'status' => Status::ACTIVE->value,
            ];

            $leave =  $this->leaveRepository->update($id, $dataArray);
            return response()->json([
                'success' => true,
                'message' => 'Updated successfully',
                'data' => $leave
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
     *    path="/leaves/show/{id}",
     *    operationId="showLeave",
     *    tags={"Leave"},
     *    summary="Show Leave Details",
     *    description="Show Leave Details",
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
    public function showLeave(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $Leave = $this->leaveRepository->getById($id);
            return response()->json([
                'success' => true,
                'data' => $Leave,
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
     *     path="/leaves/delete/{id}",
     *     tags={"Leave"},
     *     summary="Delete Leave",
     *     operationId="deleteLeave",
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
    public function deleteLeave(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $Leave =  $this->leaveRepository->delete($id);
            return response()->json([
                'success' => true,
                'message' => 'Deleted successfully',
                'data' => $Leave
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