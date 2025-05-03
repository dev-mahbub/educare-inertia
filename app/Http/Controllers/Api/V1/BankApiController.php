<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\AccountType;
use App\Http\Controllers\Api\ControllerApi;
use App\Repositories\IBankRepository;
use Illuminate\Http\Request;

class BankApiController extends ControllerApi
{
    
    public function __construct(
        private IBankRepository $bankRepository
    ) {
        //
    }
    
    /**
     * @OA\Get(
     *    path="/banks/all",
     *    operationId="indexBank",
     *    tags={"Bank"},
     *    summary="Get all banks",
     *    description="Get all banks",
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
    public function indexBank(Request $request)
    {
        if (!empty($request->schoolId)) {
            $bankData = $this->bankRepository->getActiveNameAndId($request->schoolId);
            $accountType = AccountType::cases();
            $accounts = collect($accountType)->map(fn ($type) => ['id' => $type?->value, 'title' => $type?->value])->all();
            
            return response()->json([
                'success' => true,
                'data' => [
                    'banks' => $bankData,
                    'accountTypes' => $accounts
                ],
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
