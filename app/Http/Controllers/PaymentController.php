<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use App\Enums\PaymentMode;
use Illuminate\Http\Request;
use App\Enums\LedgerAmountType;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IAssetRepository;
use App\Repositories\ITopicRepository;
use App\Repositories\ILedgerRepository;
use Illuminate\Support\Facades\Session;
use App\Repositories\IPaymentRepository;
use App\Repositories\IReceiptRepository;
use App\Repositories\IClassroomRepository;
use App\Http\Requests\LedgerPaymentRequest;
use App\Repositories\IEarningTypeRepository;
use App\Repositories\ISiteSettingRepository;
use App\Repositories\IAccountGroupRepository;
use App\Http\Requests\CancelLedgerPaymentRequest;
use App\Repositories\IFeePaymentMethodRepository;
use App\Repositories\IStaffSalaryPaymentRepository;
use App\Repositories\IStaffAdvancePaymentRepository;
use App\Repositories\IFeePaymentRefundMethodRepository;
use App\Http\Requests\LedgerPaymentDetailsUpdateRequest;

class PaymentController extends Controller
{

    public function __construct(
        private IAccountGroupRepository $accountGroupRepository,
        private ILedgerRepository $ledgerRepository,
        private IPaymentRepository $paymentRepository,
        private IFeePaymentMethodRepository $feePaymentMethodRepository,
        private ISiteSettingRepository $siteSettingRepository,
        private IReceiptRepository $receiptRepository,
        private IStaffSalaryPaymentRepository $staffSalaryPaymentRepository,
        private IStaffAdvancePaymentRepository $staffAdvancePaymentRepository,
        private IEarningTypeRepository $earningTypeRepository,
        private IFeePaymentRefundMethodRepository $feePaymentRefundMethodRepository,
    ) {
        $this->middleware('permission:view ledger', ['only' => ['ledgerPayment', 'ledgerPaymentReport']]);
        $this->middleware('permission:add ledger', ['only' => ['ledgerPaymentSave', 'cancelLedgerPayment']]);
        $this->middleware('permission:edit ledger', ['only' => ['updateLedgerPaymentDetails']]);
    }

    /**
     * Display payment form.
     */
    public function ledgerPayment(Request $request)
    {
        // payment modes
        // $paymentModes = [];

        // foreach (PaymentMode::cases() as $case) {
        //     if (!in_array($case, [
        //         PaymentMode::CARDSWAP,
        //         PaymentMode::HDFC,
        //         PaymentMode::ONLINEBACKOFFICE,
        //         PaymentMode::UPI,
        //         PaymentMode::EMPLOYEEWARD,
        //         PaymentMode::RTGS,
        //     ])) {
        //         array_push($paymentModes, ['id' => $case->value, 'title' => $case->value, 'credit' => 0, 'debit' => 0]);
        //     }
        // }

        // ledger amount setting
        $ledgerAmountSetting = getSiteSettingData('account_is_ledger_amount_based');
        $isLedgerAmountSessionWise = $ledgerAmountSetting?->value != null && strtolower($ledgerAmountSetting->value) == 'yes';

        $paymentModes = $this->ledgerRepository->getLedgersByAccountGroupTitles(['Bank Account', 'Cash-in-Hand'])
            ->map(function ($ledger) {
                return [
                    'id' => $ledger->id,
                    'title' => $ledger->title,
                    'credit' => 0,
                    'debit' => 0
                ];
            })->toArray();

        // account titles
        $accountGroupData = $this->accountGroupRepository->getActiveNameAndId();
        $accountGroupTitles = $accountGroupData->map(fn($agd) => ['id' => $agd->id, 'label' => $agd->title])->all();

        // ledger titles
        $ledgerTitleData = $this->ledgerRepository->getActiveNameAndId();
        $ledgerTitleData?->loadMissing(['ledgerPaymentItems' => function ($query) use ($isLedgerAmountSessionWise) {
            if ($isLedgerAmountSessionWise == true) {
                $query->where('academic_year_id', getAcademicYearId());
            }
        }, 'partyPurchases' => function ($query) use ($isLedgerAmountSessionWise) {
            if ($isLedgerAmountSessionWise == true) {
                $query->where('academic_year_id', getAcademicYearId());
            }
        }, 'purchases' => function ($query) use ($isLedgerAmountSessionWise) {
            if ($isLedgerAmountSessionWise == true) {
                $query->where('academic_year_id', getAcademicYearId());
            }
        }, 'ledgerReceiptItems' => function ($query) use ($isLedgerAmountSessionWise) {
            if ($isLedgerAmountSessionWise == true) {
                $query->where('academic_year_id', getAcademicYearId());
            }
        }]);

        $ledgerTitles = $ledgerTitleData->map(function ($ltd) {
            $credit = ($ltd?->amount_type == LedgerAmountType::CREDIT->value ? ($ltd->opening_balance ?? 0) : 0) + ($ltd?->partyPurchases?->sum('total') ?? 0);
            $debit = (($ltd?->amount_type == LedgerAmountType::DEBIT->value ? ($ltd->opening_balance ?? 0) : 0) + ($ltd?->ledgerPaymentItems?->sum('amount') ?? 0) + ($ltd?->purchases?->sum('total') ?? 0) + ($ltd?->ledgerReceiptItems?->sum('total') ?? 0));

            return [
                'id' => $ltd->id,
                'label' => $ltd->title,
                'account_group_id' => $ltd->account_group_id,
                'credit' => $credit,
                'debit' => $debit,
            ];
        })->all();

        // ledger group titles
        $ledgerGroupData = $this->accountGroupRepository->getActiveNameAndIdLedgerGroup();
        $ledgerGroupTitles = $ledgerGroupData->map(fn($lgd) => ['id' => $lgd->id, 'label' => $lgd->title])->all();

        // next receipt no
        $nextReceiptNo = $this->paymentRepository->getLedgerPaymentNextReceiptNo();

        if ($request->isMethod('POST')) {
            $bankLedgerId = $request->bank_ledger_id ?? null;
            $ledger = null;

            if ($bankLedgerId != null) {
                $ledger = $this->ledgerRepository->getLedgerByLedgerId($bankLedgerId);
            }

            $paymentMode = $ledger->title ?? "";

            if (!empty($paymentMode) && count($paymentModes) > 0) {
                $credit = $ledger?->amount_type == LedgerAmountType::CREDIT->value ? ($ledger->opening_balance ?? 0) : 0;
                $debit = $ledger?->amount_type == LedgerAmountType::DEBIT->value ? ($ledger->opening_balance ?? 0) : 0;

                $feeIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_fee_integrated');
                $isFeeIntegratedWithAccount = $feeIntegratedWithAccountSetting?->value == 'Yes' ? true : false;

                // calculate debit
                if ($isFeeIntegratedWithAccount) {
                    $feePayments = $this->feePaymentMethodRepository->getPaymentsByPaymentMode($paymentMode, $isLedgerAmountSessionWise);

                    if (count($feePayments) > 0) {
                        foreach ($feePayments as $feePayment) {
                            $debit += $feePayment?->fee_payments?->sum('paid_amount') ?? 0;
                        }
                    }
                }

                // calculate credit
                // $ledgerPayments = $this->paymentRepository->getPaymentsByPaymentMode($paymentMode);
                $ledgerPayments = $this->paymentRepository->getPaymentsByBankLedgerId($bankLedgerId, $isLedgerAmountSessionWise);

                if (count($ledgerPayments) > 0) {
                    foreach ($ledgerPayments as $ledgerPayment) {
                        $credit += $ledgerPayment?->total ?? 0;
                    }
                }

                $ledgerReceipts = $this->receiptRepository->getReceiptsByBankLedgerId($bankLedgerId, $isLedgerAmountSessionWise);

                if (count($ledgerReceipts) > 0) {
                    foreach ($ledgerReceipts as $ledgerReceipt) {
                        $credit += $ledgerReceipt?->total ?? 0;
                    }
                }

                $paymentModes = array_map(function ($mode) use ($bankLedgerId, $credit, $debit) {
                    if ($mode['id'] == $bankLedgerId) {
                        $mode['credit'] = $credit;
                        $mode['debit'] = $debit;
                    }

                    return $mode;
                }, $paymentModes);
            }
        }

        return Inertia::render('Inventory/LedgerPayment', [
            'accountGroupTitles' => $accountGroupTitles,
            'ledgerGroupTitles' => $ledgerGroupTitles,
            'ledgerTitles' => $ledgerTitles,
            'paymentModes' => $paymentModes,
            'nextReceiptNo' => $nextReceiptNo
        ]);
    }

    /**
     * ledgerPaymentSave
     */
    public function ledgerPaymentSave(LedgerPaymentRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            if (empty($input['receipt_no'])) {
                $nextReceiptNo = $this->paymentRepository->getLedgerPaymentNextReceiptNo();
            } else {
                $nextReceiptNo = $input['receipt_no'];
            }

            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'created_by' => auth()->user()->id,
                // 'account_group_id' => intval($input['account_group_id']) ?? null,
                'payment_mode' => $input['payment_mode'] ?? '',
                'bank_ledger_id' => $input['bank_ledger_id'] ?? null,
                'payment_date_at' => !empty($input['payment_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['payment_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'receipt_no' => $nextReceiptNo,
                'total' => $input['total'] ?? null,
                'description' => $input['description'] ?? null,
                'status' => Status::ACTIVE,
            );

            $paymentLedger = $this->paymentRepository->create($dataArray);

            if (!empty($paymentLedger->id)) {
                $itemArray = $input['items'];
                foreach ($itemArray as $iData) {
                    $iDataArray = array(
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'ledger_payment_id' => $paymentLedger->id,
                        'ledger_id' => $iData['ledger_id'] ?? null,
                        // 'ledger_group_id' => $iData['ledger_group']['id'] ?? null,
                        'amount' => $iData['amount'] ?? null,
                        'description' => $iData['description'] ?? null,
                        'status' => Status::ACTIVE,
                    );
                    $this->paymentRepository->createLedgerPaymentItem($iDataArray);
                }
            }

            // generate receipt no
            $receiptNumberSetting = getSiteSettingData('voucher_is_enable_payment');
            $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";

            if ($receiptNumberEnabaled) {
                setSiteSettingData('Voucher', 'voucher_payment_voucher_receipt_seed_no', $nextReceiptNo + 1);
            }

            Session::put('ledger_payment_id', $paymentLedger->id);

            DB::commit();

            return redirect()->route('ledger_payment')->with('message', 'Ledger created successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->route('ledger_payment')->with('error', 'Something goes wrong.');
        }
    }

    /**
     * update ledger payment details
     */
    public function updateLedgerPaymentDetails(int $id, LedgerPaymentDetailsUpdateRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $leadgerPayment = $this->paymentRepository->getActiveLedgerPaymentById($id);

        abort_if(empty($leadgerPayment), 404);

        $dataArray = [
            'description' => $input['description'] ?? null,
            'payment_date_at' => !empty($input['payment_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['payment_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
        ];

        $updatePayment = $this->paymentRepository->update($id, $dataArray);

        if (!$updatePayment) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Payment details updated successfully.');
    }


    /**
     * Display payment report list
     */
    public function ledgerPaymentReport(Request $request)
    {
        // $search =  "";
        $bankLedgerId = null;
        $startDate = date('Y-m-d');
        $endDate = date('Y-m-d');
        $paymentReport = [];

        // salary setting
        $salaryIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_salary_integrated');
        $isSalaryIntegratedWithAccount = $salaryIntegratedWithAccountSetting?->value == 'Yes' ? true : false;

        // fee setting
        $feeIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_fee_integrated');
        $isFeeIntegratedWithAccount = $feeIntegratedWithAccountSetting?->value == 'Yes' ? true : false;

        if ($request->isMethod('POST')) {
            // $search = $request->input('search_query') ?? '';
            $bankLedgerId = $request->input('bank_ledger_id') ?? null;
            $startDate = !empty($request->input('start_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : '';
            $endDate = !empty($request->input('end_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : '';
        }

        // ledger payments
        $ledgerPaymentData = $this->getLedgerPaymentReportData($bankLedgerId, $startDate, $endDate);

        if (!empty($ledgerPaymentData)) {
            $paymentReport = array_merge($paymentReport, $ledgerPaymentData);
        }

        // if salary is integrated with account then merge salary payment report
        if ($isSalaryIntegratedWithAccount) {
            // staff salary payments
            $staffSalaryPaymentData = $this->getStaffSalaryPaymentReportData($bankLedgerId, $startDate, $endDate);

            if (!empty($staffSalaryPaymentData)) {
                $paymentReport = array_merge($paymentReport, $staffSalaryPaymentData);
            }

            // staff advance payments
            $staffAdvancePaymentData = $this->getStaffAdvancePaymentReportData($bankLedgerId, $startDate, $endDate);

            if (!empty($staffAdvancePaymentData)) {
                $paymentReport = array_merge($paymentReport, $staffAdvancePaymentData);
            }
        }

        // if fee is integrated with account then merge fee refund report
        if ($isFeeIntegratedWithAccount) {
            // fee payment refunds
            $feePaymentRefundData = $this->getFeePaymentRefundReportData($bankLedgerId, $startDate, $endDate);

            if (!empty($feePaymentRefundData)) {
                $paymentReport = array_merge($paymentReport, $feePaymentRefundData);
            }
        }

        // if not empty then sort by date
        if (!empty($paymentReport)) {
            usort($paymentReport, function ($a, $b) {
                return ($a['timestamp'] ?? 0) < ($b['timestamp'] ?? 0);
            });
        }

        // payment modes
        $paymentModes = $this->ledgerRepository->getLedgersByAccountGroupTitles(['Bank Account', 'Cash-in-Hand'])
            ->map(function ($ledger) {
                return [
                    'id' => $ledger->id,
                    'title' => $ledger->title
                ];
            })->toArray();

        return Inertia::render('Inventory/PaymentReport', [
            'paymentReport' => $paymentReport,
            'paymentModes' => $paymentModes
        ]);
    }

    public function ledgerPaymentReport_old(Request $request)
    {
        $search =  "";
        // $paymentMode =  "";
        $bankLedgerId = null;
        $startDate = date('Y-m-d');
        $endDate = date('Y-m-d');

        if ($request->isMethod('POST')) {
            $search = $request->input('search_query') ?? '';
            // $paymentMode = $request->input('payment_mode') ?? '';
            $bankLedgerId = $request->input('bank_ledger_id') ?? null;
            $startDate = !empty($request->input('start_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : '';
            $endDate = !empty($request->input('end_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : '';
        }

        // $paymentReport = $this->paymentRepository->getActiveList($search, $paymentMode, $startDate, $endDate);
        $paymentReport = $this->paymentRepository->getActiveList($search, $bankLedgerId, $startDate, $endDate);

        if (count($paymentReport) > 0) {
            $paymentReport = $paymentReport->map(function ($payment) {
                $payment['payment_date'] = !empty($payment->payment_date_at) ? Carbon::parse($payment->payment_date_at)->format('d-M-Y') : '';

                return $payment;
            });
        }

        // payment modes
        // $paymentModes = [];

        // foreach (PaymentMode::cases() as $case) {
        //     if (!in_array($case, [
        //         PaymentMode::CARDSWAP,
        //         PaymentMode::HDFC,
        //         PaymentMode::ONLINEBACKOFFICE,
        //         PaymentMode::UPI,
        //         PaymentMode::EMPLOYEEWARD,
        //         PaymentMode::RTGS,
        //     ])) {
        //         array_push($paymentModes, ['id' => $case->value, 'title' => $case->value]);
        //     }
        // }
        $paymentModes = $this->ledgerRepository->getLedgersByAccountGroupTitles(['Bank Account', 'Cash-in-Hand'])
            ->map(function ($ledger) {
                return [
                    'id' => $ledger->id,
                    'title' => $ledger->title
                ];
            })->toArray();

        return Inertia::render('Inventory/PaymentReport', [
            'paymentReport' => $paymentReport,
            'paymentModes' => $paymentModes
        ]);
    }

    /**
     * helper method to get ledger payment data
     *
     */
    protected function getLedgerPaymentReportData(int $ledgerId = null, string $startDate = '', string $endDate = '')
    {
        $paymentReport = [];

        // ledger payments
        $ledgerPayments = $this->paymentRepository->getActiveList('', $ledgerId, $startDate, $endDate);

        if (count($ledgerPayments) > 0) {
            foreach ($ledgerPayments as $ledgerPayment) {
                $paymentItems = [];

                if ($ledgerPayment?->ledger_payment_items?->count() > 0) {
                    foreach ($ledgerPayment->ledger_payment_items as $ledgerPaymentItem) {
                        $paymentItems[] = [
                            'ledger_title' => $ledgerPaymentItem?->ledger?->title,
                            'amount' => $ledgerPaymentItem->amount ?? 0
                        ];
                    }
                }

                $paymentReport[] = [
                    'id' => $ledgerPayment->id,
                    'report_type' => 'ledger_payment',
                    'receipt_no' => $ledgerPayment->receipt_no,
                    'ledger_title' => $ledgerPayment?->bankLedger?->title,
                    'description' => $ledgerPayment->description,
                    'total_amount' => $ledgerPayment->total ?? 0,
                    'payment_date' => !empty($ledgerPayment->payment_date_at) ? Carbon::parse($ledgerPayment->payment_date_at)->format('d-M-Y') : '',
                    'timestamp' => !empty($ledgerPayment->payment_date_at) ? Carbon::parse($ledgerPayment->payment_date_at)->timestamp : '',
                    'payment_items' => $paymentItems
                ];
            }
        }

        return $paymentReport;
    }
    /**
     * helper method to get staff salary payment data
     *
     */
    protected function getStaffSalaryPaymentReportData(int $ledgerId = null, string $startDate = '', string $endDate = '')
    {
        $paymentReport = [];

        // staff salary payments
        $staffSalaryPayments = $this->staffSalaryPaymentRepository->getFilteredPublishedStaffSalaryPayments($ledgerId, $startDate, $endDate);

        if (count($staffSalaryPayments) > 0) {
            foreach ($staffSalaryPayments as $staffSalaryPayment) {
                $paymentItems = [];

                // earnings
                if ($staffSalaryPayment?->staffSalaryPaymentEarnings?->count() > 0) {
                    foreach ($staffSalaryPayment->staffSalaryPaymentEarnings as $earning) {
                        $paymentItems[] = [
                            'ledger_title' => $earning?->earningType?->title . '(Earning)',
                            'amount' => $earning->amount ?? 0
                        ];
                    }
                }

                // deductions
                if ($staffSalaryPayment?->staffSalaryPaymentDeductions?->count() > 0) {
                    foreach ($staffSalaryPayment->staffSalaryPaymentDeductions as $deduction) {
                        $paymentItems[] = [
                            'ledger_title' => $deduction?->deductionType?->title . '(Deduction)',
                            'amount' => $deduction->amount ?? 0
                        ];
                    }
                }

                $staffName = trim(implode(' ', [$staffSalaryPayment?->staff?->first_name, $staffSalaryPayment?->staff?->middle_name, $staffSalaryPayment?->staff?->last_name]));
                $paymentMonth = $staffSalaryPayment?->paymentMonth?->title;
                $paymentNote = $staffSalaryPayment->payment_note ?? '';
                $description = "Salary Payment of {$staffName} for the month of {$paymentMonth}, Note - {$paymentNote}";

                $paymentReport[] = [
                    'id' => $staffSalaryPayment->id,
                    'report_type' => 'staff_salary_payment',
                    'receipt_no' => $staffSalaryPayment->receipt_no,
                    'ledger_title' => $staffSalaryPayment?->ledger?->title,
                    'description' => $description,
                    'total_amount' => $staffSalaryPayment->paid_amount ?? 0,
                    'payment_date' => !empty($staffSalaryPayment->payment_date) ? Carbon::parse($staffSalaryPayment->payment_date)->format('d-M-Y') : '',
                    'timestamp' => !empty($staffSalaryPayment->payment_date) ? Carbon::parse($staffSalaryPayment->payment_date)->timestamp : '',
                    'payment_items' => $paymentItems
                ];
            }
        }

        return $paymentReport;
    }
    /**
     * helper method to get staff advance payment data
     *
     */
    protected function getStaffAdvancePaymentReportData(int $ledgerId = null, string $startDate = '', string $endDate = '')
    {
        $paymentReport = [];

        // staff advance payments
        $staffAdvancePayments = $this->staffAdvancePaymentRepository->getStaffAdvancePaymentsForPaymentReport($ledgerId, $startDate, $endDate);

        if (count($staffAdvancePayments) > 0) {
            foreach ($staffAdvancePayments as $staffAdvancePayment) {
                $paymentItems = [];

                // earning type
                $earningType = $this->earningTypeRepository->getEarningTypeByTitle('Advance Payment');

                $paidAmount = $staffAdvancePayment->paid_amount ?? 0;

                $paymentItems[] = [
                    'ledger_title' => $earningType?->title . '(Earning)',
                    'amount' => $paidAmount
                ];

                $staffName = trim(implode(' ', [$staffAdvancePayment?->staff?->first_name, $staffAdvancePayment?->staff?->middle_name, $staffAdvancePayment?->staff?->last_name]));
                $paymentMonth = $staffAdvancePayment?->paymentMonth?->title;
                $description = "Extra/Advance Payment of {$staffName} for the month of {$paymentMonth}";

                $paymentReport[] = [
                    'id' => $staffAdvancePayment->id,
                    'report_type' => 'staff_advance_payment',
                    'receipt_no' => $staffAdvancePayment->receipt_no,
                    'ledger_title' => $staffAdvancePayment?->ledger?->title,
                    'description' => $description,
                    'total_amount' => $paidAmount,
                    'payment_date' => !empty($staffAdvancePayment->payment_date) ? Carbon::parse($staffAdvancePayment->payment_date)->format('d-M-Y') : '',
                    'timestamp' => !empty($staffAdvancePayment->payment_date) ? Carbon::parse($staffAdvancePayment->payment_date)->timestamp : '',
                    'payment_items' => $paymentItems
                ];
            }
        }

        return $paymentReport;
    }
    /**
     * helper method to get fee payment refund data
     *
     */
    protected function getFeePaymentRefundReportData(int $ledgerId = null, string $startDate = '', string $endDate = '')
    {
        $paymentReport = [];

        // ledger
        $ledger = null;

        if (!empty($ledgerId)) {
            $ledger = $this->ledgerRepository->getLedgerByLedgerId($ledgerId);
        }

        $refundMode = $ledger?->title ?? '';

        // fee payment refunds
        $feePaymentRefunds = $this->feePaymentRefundMethodRepository->getActiveFeeRefunds($refundMode, $startDate, $endDate);

        if (count($feePaymentRefunds) > 0) {
            foreach ($feePaymentRefunds as $feePaymentRefund) {
                $paymentItems = [];

                $refundAmount = $feePaymentRefund?->refund_amounts?->sum('refund_amount') ?? 0;
                $ledgerTitle = $feePaymentRefund?->refund_mode;

                $paymentItems[] = [
                    'ledger_title' => $ledgerTitle,
                    'amount' => $refundAmount
                ];

                $studentName = trim(implode(' ', [$feePaymentRefund?->student?->first_name, $feePaymentRefund?->student?->middle_name, $feePaymentRefund?->student?->last_name]));
                $description = "Fee Refund of {$studentName}";

                $paymentReport[] = [
                    'id' => $feePaymentRefund->id,
                    'report_type' => 'fee_payment_refund',
                    'receipt_no' => $feePaymentRefund->receipt_no,
                    'ledger_title' => '',
                    'description' => $description,
                    'total_amount' => $refundAmount,
                    'payment_date' => !empty($feePaymentRefund->refund_date) ? Carbon::parse($feePaymentRefund->refund_date)->format('d-M-Y') : '',
                    'timestamp' => !empty($feePaymentRefund->refund_date) ? Carbon::parse($feePaymentRefund->refund_date)->timestamp : '',
                    'payment_items' => $paymentItems
                ];
            }
        }

        return $paymentReport;
    }

    /*
    * Cancel Ledger Payment
    */
    public function cancelLedgerPayment(int $id, CancelLedgerPaymentRequest $request)
    {
        $input = $request->validated();

        $ledgerPayment = $this->paymentRepository->getActiveLedgerPaymentById($id);

        abort_if(empty($ledgerPayment), 404);

        $dataArray = [
            'cancel_reason' => $input['cancel_reason'] ?? null,
            'is_cancelled' => true
        ];

        $cancelPayment = $this->paymentRepository->update($ledgerPayment->id, $dataArray);

        if (!$cancelPayment) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Payment cancelled successfully');
    }
}
