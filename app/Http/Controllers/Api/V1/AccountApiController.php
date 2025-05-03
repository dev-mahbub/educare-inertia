<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\Status;
use App\Http\Controllers\Api\ControllerApi;
use App\Models\SchoolSetting;
use App\Repositories\IFeePaymentMethodRepository;
use App\Repositories\ILedgerRepository;
use App\Repositories\IPaymentRepository;
use App\Repositories\IPurchaseRepository;
use App\Repositories\IReceiptRepository;
use App\Repositories\ISaleGroupRepository;
use App\Repositories\ISaleRepository;
use App\Repositories\ISiteSettingRepository;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AccountApiController extends ControllerApi
{
    public function __construct(
        private IPaymentRepository $paymentRepository,
        private IReceiptRepository $receiptRepository,
        private ISaleGroupRepository $saleGroupRepository,
        private ILedgerRepository $ledgerRepository,
        private ISaleRepository $saleRepository,
        private ISiteSettingRepository $siteSettingRepository,
        private IFeePaymentMethodRepository $feePaymentMethodRepository,
        private IPurchaseRepository $purchaseRepository,

        
    ) {
         // do something!
    }
    
    /**
     * @OA\Get(
     *    path="/accounts/payments",
     *    operationId="accountPayment",
     *    tags={"Account"},
     *    summary="Get all payments",
     *    description="Get all payments",
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
    public function accountPayment(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->startDate) ) { 
            $startDate = !empty($request->startDate) ? \Carbon\Carbon::parse($request->startDate)->format('Y-m-d') : '';
            $endDate = !empty($request->endDate) ? \Carbon\Carbon::parse($request->endDate)->format('Y-m-d') : '';
            $paymentReport = $this->paymentRepository->getLedgerPaymentBetweenDates($startDate, $endDate, $request->schoolId);
            $totalAmount = $paymentReport->sum('total');
            return response()->json([
                'success' => true,
                'data' => [
                    'payments' => $paymentReport,
                    'totalPayment' => $totalAmount,
                ]
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
     *    path="/accounts/receipts",
     *    operationId="accountReceipt",
     *    tags={"Account"},
     *    summary="Get all receipts",
     *    description="Get all receipts",
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
    public function accountReceipt(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->startDate) ) { 
            $startDate = !empty($request->startDate) ? \Carbon\Carbon::parse($request->startDate)->format('Y-m-d') : '';
            $endDate = !empty($request->endDate) ? \Carbon\Carbon::parse($request->endDate)->format('Y-m-d') : '';
            $receiptReport = $this->receiptRepository->getLedgerReceiptBetweenDates($startDate, $endDate, $request->schoolId);
            $totalAmount = $receiptReport->sum('total');
            return response()->json([
                'success' => true,
                'data' => [
                    'receipts' => $receiptReport,
                    'totalReceipt' => $totalAmount,
                ]
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
     *    path="/accounts/receipts/report",
     *    operationId="accountReceiptReport",
     *    tags={"Account"},
     *    summary="Get all receipts report",
     *    description="Get all receipts report",
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
    public function accountReceiptReport(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->startDate) ) { 
            $search =  '';
            $ledgerId =  '';
            $startDate = !empty($request->startDate) ? \Carbon\Carbon::parse($request->startDate)->format('Y-m-d') : '';
            $endDate = !empty($request->endDate) ? \Carbon\Carbon::parse($request->endDate)->format('Y-m-d') : '';
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            // ledger titles
            $ledgerTitles = $this->ledgerRepository->getLedgersByAccountGroupTitles(['Bank Account', 'Cash-in-Hand'], $request->schoolId)
                ->map(function ($ledger) {
                    return [
                        'id' => $ledger->id,
                        'title' => $ledger->title
                    ];
                })->toArray();

            $receiptReport = [];
            $totalAmount = 0;
            // ledger receipts
            $ledgerReceipts = $this->apiLedgerReceiptReportData($search, $ledgerId, $startDate, $endDate, $request->schoolId);
            if (count($ledgerReceipts) > 0) {
                $receiptReport = array_merge($receiptReport, $ledgerReceipts);
            }

            // sale ledger due payments
            $saleLedgerPayments = $this->apiSaleLedgerPaymentReportData($search, $ledgerId, $startDate, $endDate, $request->schoolId);
            if (count($saleLedgerPayments) > 0) {
                $receiptReport = array_merge($receiptReport, $saleLedgerPayments);
            }

            // account settngs
            $feeIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_fee_integrated', $request->schoolId, $academicYearId);
            $isFeeIntegratedWithAccount = $feeIntegratedWithAccountSetting?->value == 'Yes' ? true : false;
            $registrationIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_registration_integrated', $request->schoolId, $academicYearId);
            $isRegistrationIntegratedWithAccount = $registrationIntegratedWithAccountSetting?->value == 'Yes' ? true : false;
            $paymentMode = '';

            if (($isFeeIntegratedWithAccount || $isRegistrationIntegratedWithAccount) && !empty($ledgerId)) {
                $ledger = $this->ledgerRepository->getLedgerByLedgerId($ledgerId, $request->schoolId);
                $paymentMode = $ledger->title ?? '';
            }

            // fee payments
            if ($isFeeIntegratedWithAccount) {
                $feePayments = $this->apiFeePaymentReportData($search, $paymentMode, $startDate, $endDate, $request->schoolId);
                
                if (count($feePayments) > 0) {
                    $receiptReport = array_merge($receiptReport, $feePayments);
                }
            }

            // registration fee payments
            if ($isRegistrationIntegratedWithAccount) {
                $registrationFees = $this->apiRegistrationFeeReportData($search, $paymentMode, $startDate, $endDate, $request->schoolId);
                if (count($registrationFees) > 0) {
                    $receiptReport = array_merge($receiptReport, $registrationFees);
                }
            }

            if (count($receiptReport) > 0) {
                // sort by date
                $receiptReport = collect($receiptReport)->sortByDesc(function ($report) {
                    return $report['timestamp'];
                })->values()->toArray();
            }

            $totalAmount = collect($receiptReport)->sum('total');
            return response()->json([
                'success' => true,
                'data' => [
                    'ledgerTitles' => $ledgerTitles,
                    'receipts' => $receiptReport,
                    'totalReceipt' => $totalAmount,
                ]
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
     *    path="/accounts/daybook/report",
     *    operationId="accountDaybookReport",
     *    tags={"Account"},
     *    summary="Get daybook report",
     *    description="Get daybook report",
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
    public function accountDaybookReport(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->startDate) ) { 
            $startDate = !empty($request->startDate) ? \Carbon\Carbon::parse($request->startDate)->format('Y-m-d') : date('Y-m-d');
            $endDate = !empty($request->endDate) ? \Carbon\Carbon::parse($request->endDate)->format('Y-m-d') : date('Y-m-d');
            $dayBookReport = [];
 
            // ledger payments
            $ledgerPaymentReport = $this->apiLedgerPaymentReportData($startDate, $endDate, $request->schoolId);
            if (!empty($ledgerPaymentReport)) {
                $dayBookReport = array_merge($dayBookReport, $ledgerPaymentReport);
            }

            //purchases
            $purchaseReport = $this->apiPurchaseReportData($startDate, $endDate, $request->schoolId);
            if (!empty($purchaseReport)) {
                $dayBookReport = array_merge($dayBookReport, $purchaseReport);
            }

            //sale returns
            $saleReturnReport = $this->apiSaleReturnReportData($startDate, $endDate, $request->schoolId);
            if (!empty($saleReturnReport)) {
                $dayBookReport = array_merge($dayBookReport, $saleReturnReport);
            }

            // ledger sales
            $ledgerSaleReport = $this->apiLedgerSaleReportData($startDate, $endDate, $request->schoolId);
            if (!empty($ledgerSaleReport)) {
                $dayBookReport = array_merge($dayBookReport, $ledgerSaleReport);
            }

            // ledger receipts
            $ledgerReceiptReport = $this->apiLedgerReceiptReportData('', '', $startDate, $endDate, $request->schoolId);
            if (!empty($ledgerReceiptReport)) {
                $dayBookReport = array_merge($dayBookReport, $ledgerReceiptReport);
            }

            // fee payments
            $feePaymentReport = $this->apiFeePaymentReportData('', '', $startDate, $endDate, $request->schoolId);
            if (!empty($feePaymentReport)) {
                $dayBookReport = array_merge($dayBookReport, $feePaymentReport);
            }

            if (count($dayBookReport) > 0) {
                // sort report by date
                usort($dayBookReport, function ($a, $b) {
                    $dateA = $a['timestamp'] ?? null;
                    $dateB = $b['timestamp'] ?? null;

                    if ($dateA == $dateB) {
                        return 0;
                    }

                    // If $dateA is null, move it to the end
                    if ($dateA == null) {
                        return 1;
                    }

                    // If $dateB is null, move it to the end
                    if ($dateB == null) {
                        return -1;
                    }

                    return ($dateA < $dateB) ? -1 : 1;
                });
            }

            $totalDebit = collect($dayBookReport)->sum('debit');
            $totalCash = collect($dayBookReport)->sum('total');
            $totalCredit = collect($dayBookReport)->sum('credit');
            return response()->json([
                'success' => true,
                'data' => [
                    'dayBookPayments' => $dayBookReport,
                    'totalDebit' => $totalDebit,
                    'totalCredit' => $totalCredit + $totalCash,
                    'netBalance' => $totalCredit + $totalCash - $totalDebit,
                ]
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
     *    path="/accounts/ledger/report",
     *    operationId="accountLedgerReport",
     *    tags={"Account"},
     *    summary="Get all ledger report",
     *    description="Get all ledger report",
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
    public function accountLedgerReport(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->startDate) && !empty($request->ledger_id) ) { 
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $ledgerId = $request->ledger_id;
            $startDate = !empty($request->startDate) ? \Carbon\Carbon::parse($request->startDate)->format('Y-m-d') : '';
            $endDate = !empty($request->endDate) ? \Carbon\Carbon::parse($request->endDate)->format('Y-m-d') : '';
            
            $ledgerReport = [];
            $openingBalance = 0;
            $amountType = '';

            $ledgers = $this->ledgerRepository->getActiveNameAndId($request->schoolId);
            if ($ledgerId != null) {
                $ledger = $this->ledgerRepository->getLedgerReportData($ledgerId, $startDate, $endDate, $request->schoolId, $academicYearId);

                if ($ledger != null) {
                    $openingBalance = $ledger->opening_balance ?? 0;
                    $amountType = $ledger->amount_type ?? '';

                    // ledger purchase
                    if ($ledger->partyPurchases->count() > 0) {
                        foreach ($ledger->partyPurchases as $purchase) {
                            $date = !empty($purchase->purchase_date_at) ? Carbon::parse($purchase->purchase_date_at)->format('d-M-Y') : '';
                            $credit = $purchase->total ?? 0;

                            $ledgerReport[] = [
                                'timestamp' => !empty($purchase->purchase_date_at) ? Carbon::parse($purchase->purchase_date_at)->getTimestamp() : 0,
                                'date' => $date,
                                'ledger_title' => $purchase?->ledger?->title,
                                'voucher_type' => 'Purchase',
                                'receipt_no' => $purchase?->receipt_no,
                                'description' => $purchase?->description,
                                'debit' => 0,
                                'credit' => $credit
                            ];
                        }
                    }

                    if ($ledger->purchases->count() > 0) {
                        foreach ($ledger->purchases as $purchase) {
                            $date = !empty($purchase->purchase_date_at) ? Carbon::parse($purchase->purchase_date_at)->format('d-M-Y') : '';
                            $debit = $purchase->total ?? 0;

                            $ledgerReport[] = [
                                'timestamp' => !empty($purchase->purchase_date_at) ? Carbon::parse($purchase->purchase_date_at)->getTimestamp() : 0,
                                'date' => $date,
                                'ledger_title' => $purchase?->ledger?->title,
                                'voucher_type' => 'Purchase',
                                'receipt_no' => $purchase?->receipt_no,
                                'description' => $purchase?->description,
                                'debit' => $debit,
                                'credit' => 0
                            ];
                        }
                    }

                    // ledger payment
                    if ($ledger->ledgerPaymentItems->count() > 0) {
                        $ledgerPaymentIds = [];

                        foreach ($ledger->ledgerPaymentItems as $ledgerPaymentItem) {
                            $ledgerPaymentId = $ledgerPaymentItem->ledger_payment_id;
                            $ledgerPayment = $ledgerPaymentItem->ledgerPayment;

                            if (!in_array($ledgerPaymentId, $ledgerPaymentIds)) {
                                array_push($ledgerPaymentIds, $ledgerPaymentId);

                                $date = !empty($ledgerPayment->payment_date_at) ? Carbon::parse($ledgerPayment->payment_date_at)->format('d-M-Y') : '';
                                $debit = $ledger->ledgerPaymentItems->where('ledger_payment_id', $ledgerPaymentId)->sum('amount') ?? 0;

                                $ledgerReport[] = [
                                    'timestamp' => !empty($ledgerPayment->payment_date_at) ? Carbon::parse($ledgerPayment->payment_date_at)->getTimestamp() : 0,
                                    'date' => $date,
                                    'ledger_title' => $ledgerPayment?->bankLedger?->title,
                                    'voucher_type' => 'Payment',
                                    'receipt_no' => $ledgerPayment?->receipt_no,
                                    'description' => $ledgerPayment?->description,
                                    'debit' => $debit,
                                    'credit' => 0
                                ];
                            }
                        }
                    }
                }

                // sort ledger report by date
                $this->apiSortLedgerReport($ledgerReport, 'timestamp');
            }
        
            $totalDebit = collect($ledgerReport)->sum('debit');
            $totalCredit = collect($ledgerReport)->sum('credit');
            return response()->json([
                'success' => true,
                'data' => [
                    'ledgers' => $ledgers,
                    'ledgerReport' => $ledgerReport,
                    'openingBalance' => $openingBalance,
                    'amountType' => $amountType,
                    'totalDebit' => $totalDebit,
                    'totalCredit' => $totalCredit,
                    'closingBalance' => $totalDebit - $totalCredit,
                ]
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
     *    path="/accounts/route-wise/transports",
     *    operationId="routeWiseTransports",
     *    tags={"Transport"},
     *    summary="Get all Transport",
     *    description="Get all Transport",
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
    public function routeWiseTransports(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $routes = $this->transportRepository->getRoutesAllFromSession($request->schoolId, $setting?->academic_year_id);
            $routes->loadMissing([
              //  'vehicle',
                'students' => function ($query) {
                    $query->where('is_current', 1);
                   // $query->select('is_current', 'school_id', 'student_id', 'academic_year_id', 'transport_route_id', 'transport_stoppage_id', 'student_id');
                },
                'students.student' => function ($query) {
                    $query->select('id', 'first_name', 'middle_name', 'last_name', 'admission_no', 'classroom_id');
                },
                'students.student.classroom' => function ($query) {
                    $query->select('id', 'title');
                },
                'students.student.promotedClassroom' => function ($query) {
                    $query->select('classrooms.id', 'classrooms.title');
                },
                'students.student.father' => function ($query) {
                    $query->select('id', 'first_name', 'middle_name', 'last_name', 'phone', 'student_id');
                },
                'students.transportStoppage' => function ($query) {
                    $query->select('id', 'stoppage');
                },
                'students.transportRoute' => function ($query) {
                    $query->select('id', 'name', 'vehicle_id', 'school_id');
                },
                'students.transportRoute.vehicle' => function ($query) {
                    $query->select('id', 'vehicle_number', 'registration_number', 'total_seat');
                }
            ]);
            return response()->json([
                'success' => true,
                'data' => $routes
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
     *    path="/accounts/stoppage-wise/routes",
     *    operationId="stoppageWiseRoutes",
     *    tags={"Transport"},
     *    summary="Get all Transport",
     *    description="Get all Transport",
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
    public function stoppageWiseRoutes(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $routes = $this->transportRepository->getActiveTransportAll($request->schoolId); 
            $routes->loadMissing([
                'students' => function ($query) {
                    $query->where('is_current', 1);
                   // $query->select('is_current', 'school_id', 'student_id', 'academic_year_id', 'transport_route_id', 'transport_stoppage_id', 'student_id');
                },
                'students.student' => function ($query) {
                    $query->select('id', 'first_name', 'middle_name', 'last_name', 'admission_no', 'classroom_id');
                },
                'students.student.classroom' => function ($query) {
                    $query->select('id', 'title');
                },
                'students.student.promotedClassroom' => function ($query) {
                    $query->select('classrooms.id', 'classrooms.title');
                },
                'students.student.father' => function ($query) {
                    $query->select('id', 'first_name', 'middle_name', 'last_name', 'phone', 'student_id');
                },
                'students.transportStoppage' => function ($query) {
                    $query->select('id', 'stoppage');
                },
                'students.transportRoute' => function ($query) {
                    $query->select('id', 'name', 'vehicle_id', 'school_id');
                },
                'students.transportRoute.vehicle' => function ($query) {
                    $query->select('id', 'vehicle_number', 'registration_number', 'total_seat');
                }
            ]); 

            return response()->json([
                'success' => true,
                'data' => $routes
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
     *    path="/accounts/class-wise/routes",
     *    operationId="classWiseRoutes",
     *    tags={"Transport"},
     *    summary="Get Class Wise Routes",
     *    description="Get Class Wise Routes",
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
    public function classWiseRoutes(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $classrooms = $this->transportRepository->getClassroomsWithStudentsAllocate($request->schoolId, $setting?->academic_year_id);
            $classrooms->loadMissing([
                'transportStudents' => function ($query) {
                    $query->where('allocate_transports.is_current', 1);
                },
                'transportStudents.student' => function ($query) {
                    $query->select('id', 'first_name', 'middle_name', 'last_name', 'admission_no', 'classroom_id');
                },
                'transportStudents.student.classroom' => function ($query) {
                    $query->select('id', 'title');
                },
                'transportStudents.student.promotedClassroom' => function ($query) {
                    $query->select('classrooms.id', 'classrooms.title');
                },
                'transportStudents.student.father' => function ($query) {
                    $query->select('id', 'first_name', 'middle_name', 'last_name', 'phone', 'student_id');
                },
                'transportStudents.transportStoppage' => function ($query) {
                    $query->select('id', 'stoppage');
                },
                'transportStudents.transportRoute' => function ($query) {
                    $query->select('id', 'name', 'vehicle_id', 'school_id');
                },
                'transportStudents.transportRoute.vehicle' => function ($query) {
                    $query->select('id', 'vehicle_number', 'registration_number', 'total_seat');
                } 
            ]);
            return response()->json([
                'success' => true,
                'data' => $classrooms
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
     * path="/accounts/create",
     * summary="Create Transport",
     * description="Create Transport",
     * operationId="createTransport",
     * tags={"Transport"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Create Transport",
     *    @OA\JsonContent(
     *       required={"schoolId", "userId", "title","TransportType","startDateAt","endDateAt"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="userId", type="interger", example="1"),
     *       @OA\Property(property="title", type="string", example=""),
     *       @OA\Property(property="TransportType", type="string", example=""),
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
    public function createTransport(Request $request)
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
                'Transport_type' => $request->TransportType,
                'title' => $request->title,
                'description' => $request->description,
                'start_date_at' => $startDateAt,
                'end_date_at' => $endDateAt,
                'is_approved' => $request->isApproved,
                'status' => Status::ACTIVE->value,
            ];

            $transport =  $this->transportRepository->create($dataArray);
            return response()->json([
                'success' => true,
                'message' => 'created successfully',
                'data' => $transport
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
     * path="/accounts/update/{id}",
     * summary="Update Transport",
     * description="Update Transport",
     * operationId="updateTransport",
     * tags={"Transport"},
     *    @OA\Parameter(
     *    in="path",
     *    name="id",
     *    required=true,
     *    description="Update Transport",
     *    @OA\Schema(type="string"),
     *    @OA\Examples(example="int", value="1", summary="An int value."),
     * ),
     * @OA\RequestBody(
     *    required=true,
     *    description="Update Transport",
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
    public function updateTransport(Request $request, int $id)
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
                'Transport_type' => $request->TransportType,
                'title' => $request->title,
                'description' => $request->description,
                'start_date_at' => $startDateAt,
                'end_date_at' => $endDateAt,
                'is_approved' => $request->isApproved,
                'status' => Status::ACTIVE->value,
            ];

            $transport =  $this->transportRepository->update($id, $dataArray);
            return response()->json([
                'success' => true,
                'message' => 'Updated successfully',
                'data' => $transport
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
     *    path="/accounts/show/{id}",
     *    operationId="showTransport",
     *    tags={"Transport"},
     *    summary="Show Transport Details",
     *    description="Show Transport Details",
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
    public function showTransport(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $transport = $this->transportRepository->getById($id);
            return response()->json([
                'success' => true,
                'data' => $transport,
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
     *     path="/accounts/delete/{id}",
     *     tags={"Transport"},
     *     summary="Delete Transport",
     *     operationId="deleteTransport",
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
    public function deleteTransport(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $transport =  $this->transportRepository->delete($id);
            return response()->json([
                'success' => true,
                'message' => 'Deleted successfully',
                'data' => $transport
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


    /*
    * Helper method to get ledger receipt report data
    */
    private function apiLedgerReceiptReportData($search, $ledgerId, $startDate, $endDate, $schoolId = null)
    {
        $ledgerReceiptReport = [];

        $ledgerReceipts = $this->receiptRepository->getActiveList($search, $ledgerId, $startDate, $endDate, $schoolId);

        if (count($ledgerReceipts) > 0) {
            foreach ($ledgerReceipts as $ledgerReceipt) {
                $timestamp = !empty($ledgerReceipt?->receipt_date_at) ? Carbon::parse($ledgerReceipt->receipt_date_at)->getTimestamp() : 0;
                $receiptDate = !empty($ledgerReceipt->receipt_date_at) ? Carbon::parse($ledgerReceipt->receipt_date_at)->format('d-M-Y') : '';
                $description = $ledgerReceipt?->description;

                $receiptItems = [];

                if ($ledgerReceipt?->ledger_receipt_items?->count() > 0) {
                    foreach ($ledgerReceipt->ledger_receipt_items as $receiptItem) {
                        $receiptItems[] = [
                            'id' => $receiptItem->id,
                            'title' => $receiptItem?->ledger?->title,
                            'amount' => $receiptItem->amount ?? 0,
                            'description' => ''
                        ];
                    }
                }

                $ledgerReceiptReport[] = [
                    'id' => $ledgerReceipt->id,
                    'receipt_no' => $ledgerReceipt->receipt_no,
                    'payment_mode' => $ledgerReceipt?->bankLedger?->title,
                    'receipt_date' => $receiptDate,
                    'description' => $description,
                    'total' => $ledgerReceipt->total ?? 0,
                    'payment_items' => $receiptItems,
                    'receipt_type' => 'ledger_receipt',
                    'timestamp' => $timestamp
                ];
            }
        }

        return $ledgerReceiptReport;
    }


    /*
    * Helper method to get sale ledger payment report data
    */
    private function apiSaleLedgerPaymentReportData($search, $ledgerId, $startDate, $endDate, $schoolId = null)
    {
        $saleLedgerPaymentReport = [];

        $saleLedgerPayments =  $this->saleRepository->getActiveSaleLedgerPayments($search, $ledgerId, $startDate, $endDate, $schoolId);

        if (count($saleLedgerPayments) > 0) {
            foreach ($saleLedgerPayments as $saleLedgerPayment) {
                $timestamp = !empty($saleLedgerPayment->payment_date) ? Carbon::parse($saleLedgerPayment->payment_date)->getTimestamp() : 0;
                $paymentDate = !empty($saleLedgerPayment->payment_date) ? Carbon::parse($saleLedgerPayment->payment_date)->format('d-M-Y') : '';
                $description = $saleLedgerPayment->description;

                $title = '';

                if ($saleLedgerPayment->sale_type_for == 'Student') {
                    $title = ($saleLedgerPayment?->student?->first_name ?? '') . ' ' . ($saleLedgerPayment?->student?->middle_name ?? '') . ' ' . ($saleLedgerPayment?->student?->last_name ?? '');
                } else if ($saleLedgerPayment->sale_type_for == 'Teacher') {
                    $title = ($saleLedgerPayment?->staff?->first_name ?? '') . ' ' . ($saleLedgerPayment?->staff?->middle_name ?? '') . ' ' . ($saleLedgerPayment?->staff?->last_name ?? '');
                }

                $receiptItems[] = [
                    'id' => $saleLedgerPayment->id,
                    'title' => $title,
                    'amount' => $saleLedgerPayment?->paid_amount ?? 0,
                    'description' => "Transaction No: {$saleLedgerPayment->transaction_no}, Details: {$saleLedgerPayment->transaction_details}, Date: " . (!empty($saleLedgerPayment->transaction_date) ? Carbon::parse($saleLedgerPayment->transaction_date)->format('d-M-Y') : '')
                ];

                $saleLedgerPaymentReport[] = [
                    'id' => $saleLedgerPayment->id,
                    'receipt_no' => $saleLedgerPayment->receipt_no,
                    'payment_mode' => $saleLedgerPayment?->bankLedger?->title,
                    'receipt_date' => $paymentDate,
                    'description' => $description,
                    'total' => $saleLedgerPayment->paid_amount ?? 0,
                    'payment_items' => $receiptItems,
                    'receipt_type' => 'sale_ledger_payment',
                    'timestamp' => $timestamp
                ];
            }
        }

        return $saleLedgerPaymentReport;
    }

    /*
    * Helper method to get fee payment report data
    */
    private function apiFeePaymentReportData($search, $paymentMode, $startDate, $endDate, $schoolId = null)
    {
        $feePaymentReport = [];

        $feePayments = $this->feePaymentMethodRepository->getFeePaymentsForAccountReceiptReport($search, $paymentMode, $startDate, $endDate, $schoolId);

        if (count($feePayments) > 0) {
            foreach ($feePayments as $feePayment) {
                $timestamp = !empty($feePayment?->payment_date) ? Carbon::parse($feePayment->payment_date)->getTimestamp() : 0;
                $paymentDate = !empty($feePayment->payment_date) ? Carbon::parse($feePayment->payment_date)->format('d-M-Y') : '';
                $description = '';
                $studentName = "";

                if ($feePayment?->student != null) {
                    $studentName = "{$feePayment->student?->first_name} {$feePayment->student?->middle_name} {$feePayment->student?->last_name}";
                }

                $firstFeeInstallment = $feePayment?->fee_payments?->sortBy(function ($payment) {
                    return $payment?->fee?->id;
                })?->first()?->fee;

                $description = "Fee Payment of {$studentName}, Payment for {$firstFeeInstallment?->title}";

                if ($feePayment?->fee_payments?->count() > 1) {
                    $lastFeeInstallment = $feePayment?->fee_payments?->sortByDesc(function ($payment) {
                        return $payment?->fee?->id;
                    })?->first()?->fee;

                    if ($lastFeeInstallment?->id != $firstFeeInstallment?->id) {
                        $description .= " to {$lastFeeInstallment?->title}";
                    }
                }

                $description .= ", Note - {$feePayment?->payment_note}, SchoolReceiptNo - {$feePayment?->school_receipt_no}";

                $paymentItems = [];

                if ($feePayment?->fee_payments?->count() > 0) {
                    foreach ($feePayment->fee_payments as $paymentItem) {
                        $paymentItems[] = [
                            'id' => $paymentItem->id,
                            'title' => $paymentItem?->feeType?->fee_type,
                            'amount' => $paymentItem->paid_amount ?? 0,
                            'description' => ''
                        ];
                    }
                }

                $feePaymentReport[] = [
                    'id' => $feePayment->id,
                    'receipt_no' => $feePayment->receipt_no,
                    'payment_mode' => $feePayment->payment_mode,
                    'receipt_date' => $paymentDate,
                    'description' => $description,
                    'total' => $feePayment?->fee_payments?->sum('paid_amount') ?? 0,
                    'payment_items' => $paymentItems,
                    'receipt_type' => 'fee_payment',
                    'timestamp' => $timestamp
                ];
            }
        }

        return $feePaymentReport;
    }

    /*
    * Helper method to get registration fee report data
    */
    private function apiRegistrationFeeReportData($search, $paymentMode, $startDate, $endDate, $schoolId = null)
    {
        $registrationFeeReport = [];

        $registrationFees = $this->feePaymentMethodRepository->getRegistrationFeesForReceiptReport($search, $paymentMode, $startDate, $endDate, $schoolId);

        if (count($registrationFees) > 0) {
            foreach ($registrationFees as $registrationFee) {
                $timestamp = !empty($registrationFee->payment_date) ? Carbon::parse($registrationFee->payment_date)->getTimestamp() : 0;
                $paymentDate = !empty($registrationFee->payment_date) ? Carbon::parse($registrationFee->payment_date)->format('d-M-Y') : '';
                $description = "Registration Payment of {$registrationFee?->enquiry?->first_name} {$registrationFee?->enquiry?->middle_name} {$registrationFee?->enquiry?->last_name}, RegNo- {$registrationFee?->enquiry?->registration_no}";

                $receiptItems[] = [
                    'id' => $registrationFee->id,
                    'title' => 'Registration Fee',
                    'amount' => $registrationFee->fee_amount ?? 0,
                    'description' => ''
                ];

                $registrationFeeReport[] = [
                    'id' => $registrationFee->id,
                    'receipt_no' => $registrationFee->receipt_no,
                    'payment_mode' => $registrationFee?->payment_mode,
                    'receipt_date' => $paymentDate,
                    'description' => $description,
                    'total' => $registrationFee->fee_amount ?? 0,
                    'payment_items' => $receiptItems,
                    'receipt_type' => 'registration_fee_payment',
                    'timestamp' => $timestamp
                ];
            }
        }

        return $registrationFeeReport;
    }

    /*
    * Helper method to get ledger payment report data
    */
    private function apiLedgerPaymentReportData(string $startDate = '', string $endDate = '', $schoolId = null)
    {
        $ledgerPaymentReport = [];

        $ledgerPaymentItems = $this->paymentRepository->getFilteredLedgerPaymentItems($startDate, $endDate, null, $schoolId);

        if (count($ledgerPaymentItems) > 0) {
            foreach ($ledgerPaymentItems as $ledgerPaymentItem) {
                $paymentDate = !empty($ledgerPaymentItem->ledgerPayment->payment_date_at) ? Carbon::parse($ledgerPaymentItem->ledgerPayment->payment_date_at)->format('d-m-Y') : '';
                $timestamp = !empty($ledgerPaymentItem->ledgerPayment->payment_date_at) ? Carbon::parse($ledgerPaymentItem->ledgerPayment->payment_date_at)->getTimestamp() : 0;

                $ledgerPaymentReport[] = [
                    'timestamp' => $timestamp,
                    'date' => $paymentDate,
                    'particulars' => $ledgerPaymentItem?->ledger?->title,
                    'voucher_type' => 'Payment',
                    'voucher_no' => $ledgerPaymentItem?->ledgerPayment?->receipt_no,
                    'narration' => $ledgerPaymentItem?->ledgerPayment?->description,
                    'debit' => $ledgerPaymentItem->amount ?? 0,
                    'credit' => null,
                ];
            }
        }

        return $ledgerPaymentReport;
    }

    /*
    * Helper method to get purchase report data
    */
    private function apiPurchaseReportData(string $startDate = '', string $endDate = '', $schoolId = null)
    {
        $purchaseReport = [];
        $purchases = $this->purchaseRepository->getFilteredPurchases($startDate, $endDate, $schoolId);
        if (count($purchases) > 0) {
            foreach ($purchases as $purchase) {
                $purchaseDate = !empty($purchase->purchase_date_at) ? Carbon::parse($purchase->purchase_date_at)->format('d-m-Y') : '';
                $timestamp = !empty($purchase->purchase_date_at) ? Carbon::parse($purchase->purchase_date_at)->getTimestamp() : 0;

                $purchaseReport[] = [
                    'timestamp' => $timestamp,
                    'date' => $purchaseDate,
                    'particulars' => $purchase?->partyLedger?->title,
                    'voucher_type' => 'Purchase',
                    'voucher_no' => $purchase?->receipt_no,
                    'narration' => $purchase?->description,
                    'debit' => $purchase->total ?? 0,
                    'credit' => null,
                ];
            }
        }

        return $purchaseReport;
    }

    /*
    * Helper method to get sale return report data
    */
    private function apiSaleReturnReportData(string $startDate = '', string $endDate = '', $schoolId = null)
    {
        $saleReturnReport = [];

        $saleReturns = $this->saleRepository->getFilteredSaleReturns($startDate, $endDate, $schoolId);

        if (count($saleReturns) > 0) {
            foreach ($saleReturns as $saleReturn) {
                $returnDate = !empty($saleReturn->return_date_at) ? Carbon::parse($saleReturn->return_date_at)->format('d-m-Y') : '';
                $timestamp = !empty($saleReturn->return_date_at) ? Carbon::parse($saleReturn->return_date_at)->getTimestamp() : 0;
                $particulars = "";

                if ($saleReturn?->return_type_for == 'Student' && $saleReturn?->student != null) {
                    $particulars = "{$saleReturn->student?->first_name} {$saleReturn->student?->middle_name} {$saleReturn->student?->last_name}";
                } else if ($saleReturn?->return_type_for == 'Teacher' && $saleReturn?->staff != null) {
                    $particulars = "{$saleReturn->staff?->first_name} {$saleReturn->staff?->middle_name} {$saleReturn->staff?->last_name}";
                }

                $saleReturnReport[] = [
                    'timestamp' => $timestamp,
                    'date' => $returnDate,
                    'particulars' => $particulars,
                    'voucher_type' => 'Sale Return',
                    'voucher_no' => $saleReturn?->receipt_no,
                    'narration' => $saleReturn?->description,
                    'debit' => $saleReturn->total ?? 0,
                    'credit' => null,
                ];
            }
        }

        return $saleReturnReport;
    }

    /*
    * Helper method to get ledger sale report data
    */
    private function apiLedgerSaleReportData(string $startDate = '', string $endDate = '', $schoolId = null)
    {
        $ledgerSaleReport = [];

        $ledgerSales = $this->saleRepository->getFilteredLedgerSales($startDate, $endDate, $schoolId);

        if (count($ledgerSales) > 0) {
            foreach ($ledgerSales as $ledgerSale) {
                $returnDate = !empty($ledgerSale->sale_date_at) ? Carbon::parse($ledgerSale->sale_date_at)->format('d-m-Y') : '';
                $timestamp = !empty($ledgerSale->sale_date_at) ? Carbon::parse($ledgerSale->sale_date_at)->getTimestamp() : 0;
                $particulars = "";

                if ($ledgerSale?->sale_type_for == 'Student' && $ledgerSale?->student != null) {
                    $particulars = "{$ledgerSale->student?->first_name} {$ledgerSale->student?->middle_name} {$ledgerSale->student?->last_name}";
                } else if ($ledgerSale?->sale_type_for == 'Teacher' && $ledgerSale?->staff != null) {
                    $particulars = "{$ledgerSale->staff?->first_name} {$ledgerSale->staff?->middle_name} {$ledgerSale->staff?->last_name}";
                }

                $ledgerSaleReport[] = [
                    'timestamp' => $timestamp,
                    'date' => $returnDate,
                    'particulars' => $particulars,
                    'voucher_type' => 'Sale',
                    'voucher_no' => $ledgerSale?->receipt_no,
                    'narration' => $ledgerSale?->description,
                    'debit' => null,
                    'credit' => $ledgerSale->total ?? 0,
                ];
            }
        }

        return $ledgerSaleReport;
    }

    /*
    * Helper method to sort ledger report
    */
    private function apiSortLedgerReport(array &$array, string $key)
    {
        usort($array, function ($a, $b) use ($key) {
            $dateA = $a[$key] ?? null;
            $dateB = $b[$key] ?? null;

            if ($dateA == $dateB) {
                return 0;
            }

            // If $dateA is null, move it to the end
            if ($dateA == null) {
                return 1;
            }

            // If $dateB is null, move it to the end
            if ($dateB == null) {
                return -1;
            }

            return ($dateA < $dateB) ? -1 : 1;
        });
    }

}