<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Illuminate\Http\Request;
use App\Enums\LedgerAmountType;
use Illuminate\Support\Facades\DB;
use App\Repositories\ISaleRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\ILedgerRepository;
use Illuminate\Support\Facades\Session;
use App\Repositories\IPaymentRepository;
use App\Repositories\IReceiptRepository;
use App\Http\Requests\LedgerPaymentRequest;
use App\Http\Requests\LedgerReceiptRequest;
use App\Repositories\ISiteSettingRepository;
use App\Repositories\IAccountGroupRepository;
use App\Http\Requests\CancelLedgerReceiptRequest;
use App\Repositories\IFeePaymentMethodRepository;
use App\Http\Requests\LedgerReceiptDetailsUpdateRequest;

class ReceiptController extends Controller
{

    public function __construct(
        private IAccountGroupRepository $accountGroupRepository,
        private ILedgerRepository $ledgerRepository,
        private IReceiptRepository $receiptRepository,
        private IPaymentRepository $paymentRepository,
        private IFeePaymentMethodRepository $feePaymentMethodRepository,
        private ISiteSettingRepository $siteSettingRepository,
        private ISaleRepository $saleRepository,
    ) {
        $this->middleware('permission:view ledger', ['only' => ['ledgerReceipt', 'ledgerReceiptReport']]);
        $this->middleware('permission:add ledger', ['only' => ['ledgerReceiptSave']]);
        $this->middleware('permission:edit ledger', ['only' => ['updateLedgerReceiptDetails']]);
        $this->middleware('permission:delete ledger', ['only' => ['cancelLedgerReceipt']]);
    }

    /**
     * Display receipt form.
     */
    public function ledgerReceipt(Request $request)
    {
        // ledger amount setting
        $ledgerAmountSetting = getSiteSettingData('account_is_ledger_amount_based');
        $isLedgerAmountSessionWise = $ledgerAmountSetting?->value != null && strtolower($ledgerAmountSetting->value) == 'yes';

        // payment modes
        $paymentModes = $this->ledgerRepository->getLedgersByAccountGroupTitles(['Bank Account', 'Cash-in-Hand'])
            ->map(function ($ledger) {
                return [
                    'id' => $ledger->id,
                    'title' => $ledger->title,
                    'credit' => 0,
                    'debit' => 0
                ];
            })->toArray();

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
        $nextReceiptNo = $this->receiptRepository->getNextReceiptNo();

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

        return Inertia::render('Inventory/LedgerReceipt', [
            'ledgerGroupTitles' => $ledgerGroupTitles,
            'ledgerTitles' => $ledgerTitles,
            'paymentModes' => $paymentModes,
            'nextReceiptNo' => $nextReceiptNo
        ]);
    }

    /**
     * ledgerReceiptSave
     */
    public function ledgerReceiptSave(LedgerReceiptRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            if (empty($input['receipt_no'])) {
                $nextReceiptNo = $this->receiptRepository->getNextReceiptNo();
            } else {
                $nextReceiptNo = $input['receipt_no'];
            }

            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'created_by' => auth()->user()->id,
                'payment_mode' => $input['payment_mode'] ?? '',
                'bank_ledger_id' => $input['bank_ledger_id'] ?? null,
                'receipt_date_at' => !empty($input['receipt_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['receipt_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'receipt_no' => $nextReceiptNo,
                'total' => $input['total'] ?? null,
                'description' => $input['description'] ?? null,
                'status' => Status::ACTIVE,
            );

            $ledgerReceipt = $this->receiptRepository->create($dataArray);

            if (!empty($input['items'])) {
                foreach ($input['items'] as $iData) {
                    $iDataArray = array(
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'ledger_receipt_id' => $ledgerReceipt->id,
                        'ledger_id' => $iData['ledger_id'] ?? null,
                        'amount' => $iData['amount'] ?? null,
                        'description' => $iData['description'] ?? null,
                        'status' => Status::ACTIVE,
                    );

                    $this->receiptRepository->createLedgerReceiptItem($iDataArray);
                }
            }

            // generate receipt no
            $receiptNumberSetting = getSiteSettingData('voucher_is_enable_receipt');
            $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";

            if ($receiptNumberEnabaled) {
                setSiteSettingData('Voucher', 'voucher_receipt_voucher_receipt_seed_no', $nextReceiptNo + 1);
            }

            Session::put('ledger_receipt_id', $ledgerReceipt->id);

            DB::commit();

            return redirect()->route('ledger_receipt')->with('message', 'Receipt created successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->route('ledger_receipt')->with('error', 'Something goes wrong.');
        }
    }

    /**
     * Display Receipt report list
     */
    public function ledgerReceiptReport(Request $request)
    {
        $search =  '';
        $ledgerId =  '';
        $startDate = date('Y-m-d');
        $endDate = date('Y-m-d');

        if ($request->isMethod('post')) {
            $search = $request->input('search_query') ?? '';
            $ledgerId = $request->input('ledger_id') ?? '';
            $startDate = !empty($request['start_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request['start_date'])->timezone(getSchoolTimeZone())->toDateString() : '';
            $endDate = !empty($request['end_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request['end_date'])->timezone(getSchoolTimeZone())->toDateString() : '';
        }

        // ledger titles
        $ledgerTitles = $this->ledgerRepository->getLedgersByAccountGroupTitles(['Bank Account', 'Cash-in-Hand'])
            ->map(function ($ledger) {
                return [
                    'id' => $ledger->id,
                    'title' => $ledger->title
                ];
            })->toArray();

        $receiptReport = [];

        // ledger receipts
        $ledgerReceipts = $this->getLedgerReceiptReportData($search, $ledgerId, $startDate, $endDate);

        if (count($ledgerReceipts) > 0) {
            $receiptReport = array_merge($receiptReport, $ledgerReceipts);
        }

        // sale ledger due payments
        $saleLedgerPayments = $this->getSaleLedgerPaymentReportData($search, $ledgerId, $startDate, $endDate);

        if (count($saleLedgerPayments) > 0) {
            $receiptReport = array_merge($receiptReport, $saleLedgerPayments);
        }

        // account settngs
        $feeIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_fee_integrated');
        $isFeeIntegratedWithAccount = $feeIntegratedWithAccountSetting?->value == 'Yes' ? true : false;
        $registrationIntegratedWithAccountSetting = $this->siteSettingRepository->getSiteSettingByTypeAndKey('Account', 'account_is_registration_integrated');
        $isRegistrationIntegratedWithAccount = $registrationIntegratedWithAccountSetting?->value == 'Yes' ? true : false;

        $paymentMode = '';

        if (($isFeeIntegratedWithAccount || $isRegistrationIntegratedWithAccount) && !empty($ledgerId)) {
            $ledger = $this->ledgerRepository->getLedgerByLedgerId($ledgerId);
            $paymentMode = $ledger->title ?? '';
        }

        // fee payments
        if ($isFeeIntegratedWithAccount) {
            $feePayments = $this->getFeePaymentReportData($search, $paymentMode, $startDate, $endDate);

            if (count($feePayments) > 0) {
                $receiptReport = array_merge($receiptReport, $feePayments);
            }
        }

        // registration fee payments
        if ($isRegistrationIntegratedWithAccount) {
            $registrationFees = $this->getRegistrationFeeReportData($search, $paymentMode, $startDate, $endDate);

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

        return Inertia::render('Inventory/ReceiptReport', [
            'receiptReport' => $receiptReport,
            'ledgerTitles' => $ledgerTitles,
        ]);
    }


    /**
     * update ledger receipt details
     */
    public function updateLedgerReceiptDetails(int $id, LedgerReceiptDetailsUpdateRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $ledgerReceipt = $this->receiptRepository->getActiveLedgerReceiptById($id);

        abort_if(empty($ledgerReceipt), 404);

        $dataArray = [
            'description' => $input['description'] ?? null,
            'receipt_date_at' => !empty($input['receipt_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['receipt_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
        ];

        $updateReceipt = $this->receiptRepository->update($id, $dataArray);

        if (!$updateReceipt) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Receipt details updated successfully.');
    }

    /*
    * Cancel Ledger Receipt
    */
    public function cancelLedgerReceipt(int $id, CancelLedgerReceiptRequest $request)
    {
        $input = $request->validated();

        $ledgerReceipt = $this->receiptRepository->getActiveLedgerReceiptById($id);

        abort_if(empty($ledgerReceipt), 404);

        $dataArray = [
            'cancel_reason' => $input['cancel_reason'] ?? null,
            'is_cancelled' => true
        ];

        $cancelReceipt = $this->receiptRepository->update($ledgerReceipt->id, $dataArray);

        if (!$cancelReceipt) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Receipt cancelled successfully');
    }

    /*
    * Helper method to get ledger receipt report data
    */
    private function getLedgerReceiptReportData($search, $ledgerId, $startDate, $endDate)
    {
        $ledgerReceiptReport = [];

        $ledgerReceipts = $this->receiptRepository->getActiveList($search, $ledgerId, $startDate, $endDate);

        if (count($ledgerReceipts) > 0) {
            foreach ($ledgerReceipts as $ledgerReceipt) {
                $timestamp = !empty($ledgerReceipt?->receipt_date_at) ? Carbon::parse($ledgerReceipt->receipt_date_at)->getTimestamp() : 0;
                $receiptDate = !empty($ledgerReceipt->receipt_date_at) ? Carbon::parse($ledgerReceipt->receipt_date_at)->format('d-M-Y') : '';
                $description = $ledgerReceipt?->description;

                $receiptItems = [];

                if ($ledgerReceipt?->ledger_receipt_items?->count() > 0) {
                    foreach ($ledgerReceipt->ledger_receipt_items as $receiptItem) {
                        $ledgerId = $receiptItem->ledger_id;

                        if (!isset($receiptItems[$ledgerId])) {
                            $receiptItems[$ledgerId] = [
                                'id' => $receiptItem->id,
                                'title' => $receiptItem?->ledger?->title,
                                'amount' => 0,
                                'description' => ''
                            ];
                        }

                        $receiptItems[$ledgerId]['amount'] += $receiptItem->amount ?? 0;
                    }
                }

                $ledgerReceiptReport[] = [
                    'id' => $ledgerReceipt->id,
                    'receipt_no' => $ledgerReceipt->receipt_no,
                    'payment_mode' => $ledgerReceipt?->bankLedger?->title,
                    'receipt_date' => $receiptDate,
                    'description' => $description,
                    'total' => $ledgerReceipt->total ?? 0,
                    'payment_items' => array_values($receiptItems),
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
    private function getSaleLedgerPaymentReportData($search, $ledgerId, $startDate, $endDate)
    {
        $saleLedgerPaymentReport = [];

        $saleLedgerPayments =  $this->saleRepository->getActiveSaleLedgerPayments($search, $ledgerId, $startDate, $endDate);

        if (count($saleLedgerPayments) > 0) {
            foreach ($saleLedgerPayments as $saleLedgerPayment) {
                $timestamp = !empty($saleLedgerPayment->payment_date) ? Carbon::parse($saleLedgerPayment->payment_date)->getTimestamp() : 0;
                $paymentDate = !empty($saleLedgerPayment->payment_date) ? Carbon::parse($saleLedgerPayment->payment_date)->format('d-M-Y') : '';
                $description = $saleLedgerPayment->description;
                $receiptItems = [];
                $title = '';

                if ($saleLedgerPayment?->saleLedger?->sale_type_for == 'Student') {
                    // $title = ($saleLedgerPayment?->saleLedger?->student?->first_name ?? '') . ' ' . ($saleLedgerPayment?->saleLedger?->student?->middle_name ?? '') . ' ' . ($saleLedgerPayment?->saleLedger?->student?->last_name ?? '');
                    $title = $saleLedgerPayment?->saleLedger?->student?->ledger?->title ?? ($saleLedgerPayment?->saleLedger?->student?->first_name ?? '') . ' ' . ($saleLedgerPayment?->saleLedger?->student?->middle_name ?? '') . ' ' . ($saleLedgerPayment?->saleLedger?->student?->last_name ?? '');
                } else if ($saleLedgerPayment?->saleLedger?->sale_type_for == 'Teacher') {
                    // $title = ($saleLedgerPayment?->saleLedger?->staff?->first_name ?? '') . ' ' . ($saleLedgerPayment?->saleLedger?->staff?->middle_name ?? '') . ' ' . ($saleLedgerPayment?->saleLedger?->staff?->last_name ?? '');
                    $title = $saleLedgerPayment?->saleLedger?->staff?->ledger?->title ?? ($saleLedgerPayment?->saleLedger?->staff?->first_name ?? '') . ' ' . ($saleLedgerPayment?->saleLedger?->staff?->middle_name ?? '') . ' ' . ($saleLedgerPayment?->saleLedger?->staff?->last_name ?? '');
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
    private function getFeePaymentReportData($search, $paymentMode, $startDate, $endDate)
    {
        $feePaymentReport = [];

        $feePayments = $this->feePaymentMethodRepository->getFeePaymentsForAccountReceiptReport($search, $paymentMode, $startDate, $endDate);

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
                        $feeTypeId = $paymentItem->fee_type_id;

                        if (!isset($paymentItems[$feeTypeId])) {
                            $paymentItems[$feeTypeId] = [
                                'id' => $paymentItem->id,
                                'title' => $paymentItem?->feeType?->fee_type,
                                'amount' => 0,
                                'description' => ''
                            ];
                        }

                        $paymentItems[$feeTypeId]['amount'] += $paymentItem->paid_amount ?? 0;
                    }
                }

                $feePaymentReport[] = [
                    'id' => $feePayment->id,
                    'receipt_no' => $feePayment->receipt_no,
                    'payment_mode' => $feePayment->payment_mode,
                    'receipt_date' => $paymentDate,
                    'description' => $description,
                    'total' => $feePayment?->fee_payments?->sum('paid_amount') ?? 0,
                    'payment_items' => array_values($paymentItems),
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
    private function getRegistrationFeeReportData($search, $paymentMode, $startDate, $endDate)
    {
        $registrationFeeReport = [];

        $registrationFees = $this->feePaymentMethodRepository->getRegistrationFeesForReceiptReport($search, $paymentMode, $startDate, $endDate);

        if (count($registrationFees) > 0) {
            foreach ($registrationFees as $registrationFee) {
                $receiptItems = [];
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
}
