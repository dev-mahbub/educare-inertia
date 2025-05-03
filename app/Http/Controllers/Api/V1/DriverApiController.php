<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\Status;
use App\Http\Controllers\Api\ControllerApi;
use App\Models\SchoolSetting;
use App\Repositories\IDriverRepository;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DriverApiController extends ControllerApi
{
    public function __construct(
        private IDriverRepository $driverRepository,
    ) {
         // do something!
    }
    
    /**
     * @OA\Get(
     *    path="/drivers/all",
     *    operationId="indexDriver",
     *    tags={"Driver"},
     *    summary="Get all Driver",
     *    description="Get all Driver",
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
    public function indexDriver(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $drivers = $this->driverRepository->getActiveAll();
            return response()->json([
                'success' => true,
                'data' => $drivers
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
     * path="/drivers/create",
     * summary="Create Driver",
     * description="Create Driver",
     * operationId="createDriver",
     * tags={"Driver"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Create Driver",
     *    @OA\JsonContent(
     *       required={"schoolId", "userId", "title","DriverType","startDateAt","endDateAt"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="userId", type="interger", example="1"),
     *       @OA\Property(property="title", type="string", example=""),
     *       @OA\Property(property="DriverType", type="string", example=""),
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
    public function createDriver(Request $request)
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
                'Driver_type' => $request->DriverType,
                'title' => $request->title,
                'description' => $request->description,
                'start_date_at' => $startDateAt,
                'end_date_at' => $endDateAt,
                'is_approved' => $request->isApproved,
                'status' => Status::ACTIVE->value,
            ];

            $Driver =  $this->driverRepository->create($dataArray);
            return response()->json([
                'success' => true,
                'message' => 'created successfully',
                'data' => $Driver
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
     * path="/drivers/update/{id}",
     * summary="Update Driver",
     * description="Update Driver",
     * operationId="updateDriver",
     * tags={"Driver"},
     *    @OA\Parameter(
     *    in="path",
     *    name="id",
     *    required=true,
     *    description="Update Driver",
     *    @OA\Schema(type="string"),
     *    @OA\Examples(example="int", value="1", summary="An int value."),
     * ),
     * @OA\RequestBody(
     *    required=true,
     *    description="Update Driver",
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
    public function updateDriver(Request $request, int $id)
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
                'Driver_type' => $request->DriverType,
                'title' => $request->title,
                'description' => $request->description,
                'start_date_at' => $startDateAt,
                'end_date_at' => $endDateAt,
                'is_approved' => $request->isApproved,
                'status' => Status::ACTIVE->value,
            ];

            $Driver =  $this->driverRepository->update($id, $dataArray);
            return response()->json([
                'success' => true,
                'message' => 'Updated successfully',
                'data' => $Driver
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
     *    path="/drivers/show/{id}",
     *    operationId="showDriver",
     *    tags={"Driver"},
     *    summary="Show Driver Details",
     *    description="Show Driver Details",
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
    public function showDriver(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $Driver = $this->driverRepository->getById($id);
            return response()->json([
                'success' => true,
                'data' => $Driver,
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
     *     path="/drivers/delete/{id}",
     *     tags={"Driver"},
     *     summary="Delete Driver",
     *     operationId="deleteDriver",
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
    public function deleteDriver(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $Driver =  $this->driverRepository->delete($id);
            return response()->json([
                'success' => true,
                'message' => 'Deleted successfully',
                'data' => $Driver
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