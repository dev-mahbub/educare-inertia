<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\AccountType;
use App\Http\Controllers\Api\ControllerApi;
use App\Repositories\IHouseRepository;
use Illuminate\Http\Request;

class HouseApiController extends ControllerApi
{
    
    public function __construct(
        private IHouseRepository $houseRepository
    ) {
        //
    }
    
    /**
     * @OA\Get(
     *    path="/houses/all",
     *    operationId="indexHouse",
     *    tags={"House"},
     *    summary="Get all houses",
     *    description="Get all houses",
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
    public function indexHouse(Request $request)
    {
        if (!empty($request->schoolId)) {
            $housekData = $this->houseRepository->getActiveNameAndId($request->schoolId);
     
            return response()->json([
                'success' => true,
                'data' => $housekData,
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
