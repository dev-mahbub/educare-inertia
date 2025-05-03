<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\Status;
use App\Http\Controllers\Api\ControllerApi;
use App\Models\State;
use App\Models\School;
use App\Repositories\ISchoolRepository;
use App\Repositories\IStateRepository;
use Illuminate\Http\Request;

class StateApiController extends ControllerApi
{
    public function __construct(
        private IStateRepository $stateRepository,
        private ISchoolRepository $schoolRepository
    ) {
        //
    }
    
    /**
     * @OA\Get(
     *    path="/states/all",
     *    operationId="indexState",
     *    tags={"State"},
     *    summary="Get all states",
     *    description="Get all states",
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
    public function indexState(Request $request)
    {
        $states = $this->stateRepository->getStatesByCountry($request->countryId);
        return response()->json([
            'success' => true,
            'count' => $states->count(),
            'data' => $states,
        ], 200);
    }

    /**
     * @OA\Get(
     *    path="/state/cities",
     *    operationId="cities",
     *    tags={"State"},
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
    public function cities(Request $request)
    {
        $schools = $this->schoolRepository->getCitiesByStateId($request->stateId);
        return response()->json([
            'success' => true,
            'count' => $schools->count(),
            'data' => $schools,
        ], 200);
    }
}
