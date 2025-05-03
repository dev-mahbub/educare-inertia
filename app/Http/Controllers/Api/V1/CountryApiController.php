<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\Status;
use App\Http\Controllers\Api\ControllerApi;
use App\Models\School;
use App\Repositories\ISchoolRepository;
use Illuminate\Http\Request;

class CountryApiController extends ControllerApi
{
    
    public function __construct(
        private ISchoolRepository $schoolRepository
    ) {
        //
    }
    
    /**
     * @OA\Get(
     *    path="/schools",
     *    operationId="index",
     *    tags={"School"},
     *    summary="Get all schools",
     *    description="Get all schools",
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
    public function index(Request $request)
    {
        $schools = $this->schoolRepository->getSchoolsByCityAndState($request->cityName, $request->stateId);
        $schoolCount = $this->schoolRepository->countSchoolsByCityAndState($request->cityName, $request->stateId);
        return response()->json([
            'success' => true,
            'count' => $schoolCount,
            'data' => $schools,
        ], 200);
    }
}
