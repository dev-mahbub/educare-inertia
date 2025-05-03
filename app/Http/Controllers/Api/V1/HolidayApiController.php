<?php

namespace App\Http\Controllers\Api\V1;

use Carbon\Carbon;

use App\Enums\Status;
use App\Http\Controllers\Api\ControllerApi;
use App\Repositories\IHolidayRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class HolidayApiController extends ControllerApi
{
    public function __construct(
        private IHolidayRepository $holidayRepository
    ) {
        // do something
    }
    
    /**
     * @OA\Get(
     *    path="/holidays/all",
     *    operationId="indexHoliday",
     *    tags={"Holiday"},
     *    summary="Get all Holiday",
     *    description="Get all Holiday",
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
    public function indexHoliday(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $holidays = $this->holidayRepository->getActiveAll($request->schoolId);
            return response()->json([
                'success' => true,
                'data' => $holidays
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
     * path="/holidays/save",
     * summary="Save Holiday",
     * description="Save Holiday",
     * operationId="saveHoliday",
     * tags={"Holiday"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Save Holiday",
     *    @OA\JsonContent(
     *       required={"schoolId", "name","startDateAt","endDateAt"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="name", type="string", example=""),
     *       @OA\Property(property="startDateAt", type="string", example="2024-05-01"),
     *       @OA\Property(property="endDateAt", type="string", example="2024-05-03"),
     *       @OA\Property(property="holidayType", type="string", example=""),
     *       @OA\Property(property="details", type="string", example=""),
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
    public function saveHoliday(Request $request)
    {
        if (!empty($request->schoolId) && !empty($request->name)) {
            DB::beginTransaction();
            try {
                $dataArray = array(
                    'school_id' => $request->schoolId,
                    'name' => $request->name,
                    'holiday_type' => $request->holidayType ?? "",
                    'start_date_at' => !empty($request->startDateAt) ? \Carbon\Carbon::parse($request->startDateAt)->format('Y-m-d') : null,
                    'end_date_at' => !empty($request->endDateAt) ? \Carbon\Carbon::parse($request->endDateAt)->format('Y-m-d') : null,
                    'details' => $request->details ?? "",
                    'status' => Status::ACTIVE,
                );
                $holiday = $this->holidayRepository->create($dataArray);
                DB::commit();
                return response()->json([
                    'success' => true,
                    'message' => 'created successfully',
                    'data' => $holiday
                ], 200);
            } catch (\Throwable $th) {
                return response()->json([
                    'error' => true,
                    'message' => 'Please try again',
                    'data' => $th
                ], 200);
            }
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
     *    path="/holidays/show/{id}",
     *    operationId="showHoliday",
     *    tags={"Holiday"},
     *    summary="Show Holiday Details",
     *    description="Show Holiday Details",
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
    public function showHoliday(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $holiday = $this->holidayRepository->getById($id);
            return response()->json([
                'success' => true,
                'data' => $holiday,
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
     * @OA\Put(
     * path="/holidays/update/{id}",
     * summary="Update Holiday",
     * description="Update Holiday",
     * operationId="updateHoliday",
     * tags={"Holiday"},
     *    @OA\Parameter(
     *    in="path",
     *    name="id",
     *    required=true,
     *    description="Update Holiday",
     *    @OA\Schema(type="string"),
     *    @OA\Examples(example="int", value="1", summary="An int value."),
     * ),
     * @OA\RequestBody(
     *    required=true,
     *    description="Update Admission",
     *    @OA\JsonContent(
     *       required={"schoolId", "name","startDateAt","endDateAt"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="name", type="string", example=""),
     *       @OA\Property(property="startDateAt", type="string", example="2024-05-01"),
     *       @OA\Property(property="endDateAt", type="string", example="2024-05-03"),
     *       @OA\Property(property="holidayType", type="string", example=""),
     *       @OA\Property(property="details", type="string", example=""),
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
    public function updateHoliday(Request $request, int $id)
    {
        if (!empty($request->schoolId) && !empty($request->name)) {
            DB::beginTransaction();
            try {
                $dataArray = array(
                    'school_id' => $request->schoolId,
                    'name' => $request->name,
                    'holiday_type' => $request->holidayType ?? "",
                    'start_date_at' => !empty($request->startDateAt) ? \Carbon\Carbon::parse($request->startDateAt)->format('Y-m-d') : null,
                    'end_date_at' => !empty($request->endDateAt) ? \Carbon\Carbon::parse($request->endDateAt)->format('Y-m-d') : null,
                    'details' => $request->details ?? "",
                    'status' => Status::ACTIVE,
                );
                $holiday = $this->holidayRepository->update($id, $dataArray);
                DB::commit();
                return response()->json([
                    'success' => true,
                    'message' => 'created successfully',
                    'data' => $holiday
                ], 200);
            } catch (\Throwable $th) {
                return response()->json([
                    'error' => true,
                    'message' => 'Please try again',
                    'data' => $th
                ], 200);
            }
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
     * @OA\Delete(
     *     path="/holidays/delete/{id}",
     *     tags={"Holiday"},
     *     summary="Delete Holiday",
     *     operationId="deleteHoliday",
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
    public function deleteHoliday(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $holiday = $this->holidayRepository->delete($id);
            return response()->json([
                'success' => true,
                'message' => 'Deleted successfully',
                'data' => $holiday
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
     *    path="/holidays/student/view",
     *    operationId="viewStudentHoliday",
     *    tags={"Holiday"},
     *    summary="Get all Holiday",
     *    description="Get all Holiday",
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
    public function viewStudentHoliday(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $holidays = $this->holidayRepository->getStudentActiveAll($request->schoolId);
            return response()->json([
                'success' => true,
                'data' => $holidays
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