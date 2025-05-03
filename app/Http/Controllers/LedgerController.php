<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Enums\LedgerAmountType;
use App\Http\Requests\LedgerRequest;
use Illuminate\Http\RedirectResponse;
use App\Repositories\ILedgerRepository;
use App\Repositories\IAccountGroupRepository;

class LedgerController extends Controller
{

    public function __construct(
        private IAccountGroupRepository $accountGroupRepository,
        private ILedgerRepository $ledgerRepository
    ) {
        $this->middleware('permission:view ledger', ['only' => ['show', 'showSearch', 'ledgerReport']]);
        $this->middleware('permission:add ledger', ['only' => ['save']]);
        $this->middleware('permission:edit ledger', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete ledger', ['only' => ['destroy']]);
    }

    /**
     * display form and list
     */
    public function show(Request $request): Response
    {
        // filter data
        $accountId = !empty($_GET['account_id']) ? $_GET['account_id'] : '';
        $search = !empty($_GET['search']) ? $_GET['search'] : '';

        // ledgers
        $ledgers = $this->ledgerRepository->getActiveList($accountId, $search);

        // account titles
        $accountGroupData = $this->accountGroupRepository->getActiveNameAndId();
        $accountGroupTitles = $accountGroupData->map(fn($at) => ['id' => $at->id, 'title' => $at->title])->all();

        // types
        $ledgerAmountType = LedgerAmountType::cases();
        $ledgerAmountArr = array();
        foreach ($ledgerAmountType as $ld) {
            array_push($ledgerAmountArr, ['id' => $ld->value, 'title' => $ld->value]);
        }

        return Inertia::render('Inventory/CreateLedger', [
            'ledgers' => $ledgers,
            'accountGroupTitles' => $accountGroupTitles,
            'ledgerAmountArr' => $ledgerAmountArr,
            'accountId' => $accountId,
            'search' => $search,
        ]);
    }


    /**
     * display list
     */
    public function showSearch(Request $request): Response
    {
        // filter data
        $accountId = !empty($_GET['account_id']) ? $_GET['account_id'] : '';
        $search = !empty($_GET['search']) ? $_GET['search'] : '';

        // ledgers
        $ledgers = $this->ledgerRepository->getActiveList($accountId, $search);

        // account titles
        $accountGroupData = $this->accountGroupRepository->getActiveNameAndId();
        $accountGroupTitles = $accountGroupData->map(fn($at) => ['id' => $at->id, 'title' => $at->title])->all();

        // types
        $ledgerAmountType = LedgerAmountType::cases();
        $ledgerAmountArr = array();
        foreach ($ledgerAmountType as $ld) {
            array_push($ledgerAmountArr, ['id' => $ld->value, 'title' => $ld->value]);
        }

        return Inertia::render('Inventory/LedgerSearch', [
            'ledgers' => $ledgers,
            'accountGroupTitles' => $accountGroupTitles,
            'ledgerAmountArr' => $ledgerAmountArr,
            'accountId' => $accountId,
            'search' => $search,
        ]);
    }


    /**
     * save
     */
    public function save(LedgerRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'account_group_id' => intval($input['account_group_id']) ?? null,
            'title' => $input['title'] ?? null,
            'mobile' => $input['mobile'] ?? null,
            'alt_mobile' => $input['alt_mobile'] ?? null,
            'email' => $input['email'] ?? null,
            'address' => $input['address'] ?? null,
            'opening_balance' => intval($input['opening_balance']) ?? null,
            'amount_type' => $input['amount_type'] ?? null,
            'description' => $input['description'] ?? null,
            'is_system_default' => true,
            'status' => Status::ACTIVE,
        );

        $ledger = $this->ledgerRepository->create($dataArray);
        if (!$ledger) {
            return redirect()->route('ledger.list')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('ledger.list')->with('message', 'Ledger created successfully.');
    }


    /**
     * Display edit form and list
     */
    public function edit(Request $request): Response|RedirectResponse
    {
        $id = $request->input('id');

        if (empty($id) || $request->isMethod('GET')) {
            return redirect()->route('ledger.list');
        }

        // ledger
        $ledger = $this->ledgerRepository->getById($id);
        $ledgers = $this->ledgerRepository->getActiveList();

        // account titles
        $accountGroupData = $this->accountGroupRepository->getActiveNameAndId();
        $accountGroupTitles = $accountGroupData->map(fn($at) => ['id' => $at->id, 'title' => $at->title])->all();

        // types
        $ledgerAmountType = LedgerAmountType::cases();
        $ledgerAmountArr = array();
        foreach ($ledgerAmountType as $ld) {
            array_push($ledgerAmountArr, ['id' => $ld->value, 'title' => $ld->value]);
        }

        return Inertia::render('Inventory/EditLedger', [
            'ledger' => $ledger,
            'ledgers' => $ledgers,
            'accountGroupTitles' => $accountGroupTitles,
            'ledgerAmountArr' => $ledgerAmountArr,
        ]);
    }

    /**
     * Update
     */
    public function update(LedgerRequest $request, $id): RedirectResponse
    {
        $input = $request->validated();
        $dataArray = array(
            'account_group_id' => intval($input['account_group_id']) ?? null,
            'title' => $input['title'] ?? null,
            'mobile' => $input['mobile'] ?? null,
            'alt_mobile' => $input['alt_mobile'] ?? null,
            'email' => $input['email'] ?? null,
            'address' => $input['address'] ?? null,
            'opening_balance' => intval($input['opening_balance']) ?? null,
            'amount_type' => $input['amount_type'] ?? null,
            'description' => $input['description'] ?? null,
            'status' => Status::ACTIVE,
        );

        $ledger = $this->ledgerRepository->update($id, $dataArray);
        if (!$ledger) {
            return redirect()->route('ledger.list')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('ledger.list')->with('message', 'Ledger updated successfully.');
    }

    /**
     * Delete ledger
     */
    public function destroy(String $id): RedirectResponse
    {
        $ledger = $this->ledgerRepository->getById($id);
        if (!$ledger) {
            return redirect()->route('ledger.list')->with('error', 'Data not found.');
        }
        $this->ledgerRepository->delete($id);
        return redirect()->route('ledger.list')->with('message', 'Ledger deleted successfully.');
    }

    /**
     * ledgerReport
     */
    public function ledgerReport(Request $request): Response
    {
        $ledgerReport = [];
        $openingBalance = 0;
        $amountType = '';

        $ledgers = $this->ledgerRepository->getActiveNameAndId();

        if ($request->isMethod('POST')) {
            $ledgerId = $request->ledger_id ?? null;
            $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->start_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->end_date)->timezone(getSchoolTimeZone())->toDateString() : "";

            if ($ledgerId != null) {
                $ledger = $this->ledgerRepository->getLedgerReportData($ledgerId, $startDate, $endDate);

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
                $this->sortLedgerReport($ledgerReport, 'timestamp');
            }
        }

        return Inertia::render('Inventory/LedgerReport', [
            'ledgers' => $ledgers,
            'ledgerReport' => $ledgerReport,
            'openingBalance' => $openingBalance,
            'amountType' => $amountType,
        ]);
    }

    /*
    * Helper method to sort ledger report
    */
    private function sortLedgerReport(array &$array, string $key)
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
