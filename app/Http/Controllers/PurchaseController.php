<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\PurchaseRequest;
use App\Repositories\ILedgerRepository;
use Illuminate\Support\Facades\Session;
use App\Repositories\IAccountRepository;
use App\Repositories\IProductRepository;
use App\Repositories\IPurchaseRepository;
use App\Http\Requests\CancelPurchaseRequest;

class PurchaseController extends Controller
{

    public function __construct(
        private IProductRepository $productRepository,
        private IPurchaseRepository $purchaseRepository,
        private IAccountRepository $accountRepository,
        private ILedgerRepository $ledgerRepository

    ) {
        $this->middleware('permission:view product', ['only' => ['productPurchaseShow', 'purchaseReport', 'purchaseSummaryReport']]);
        $this->middleware('permission:add product', ['only' => ['productPurchaseSave']]);
        $this->middleware('permission:delete product', ['only' => ['cancelPurchase']]);
    }

    /**
     * Display purchase form
     */
    public function productPurchaseShow(): Response
    {
        // ledger amount setting
        $ledgerAmountSetting = getSiteSettingData('account_is_ledger_amount_based');
        $isLedgerAmountSessionWise = $ledgerAmountSetting?->value != null && strtolower($ledgerAmountSetting->value) == 'yes';

        // party account
        $partyAccountData = $this->ledgerRepository->getLedgersByAccountGroupTitle('Sundry Creditors');
        $partyAccountData?->loadMissing(['ledgerPaymentItems' => function ($query) use ($isLedgerAmountSessionWise) {
            if ($isLedgerAmountSessionWise == true) {
                $query->where('academic_year_id', getAcademicYearId());
            }
        }, 'partyPurchases' => function ($query) use ($isLedgerAmountSessionWise) {
            if ($isLedgerAmountSessionWise == true) {
                $query->where('academic_year_id', getAcademicYearId());
            }
        }]);

        $partyAccountNames = $partyAccountData->map(function ($pa) {
            $credit = $pa?->partyPurchases->sum('total') ?? 0;
            $debit = $pa?->ledgerPaymentItems->sum('amount') ?? 0;

            return [
                'id' => $pa->id,
                'label' => $pa->title,
                'credit' => $credit,
                'debit' => $debit,
            ];
        })->all();

        // ledger
        $ledgerData = $this->ledgerRepository->getLedgersByAccountGroupTitle('Purchase Accounts');
        $ledgerNames = $ledgerData->map(fn($pa) => ['id' => $pa->id, 'title' => $pa->title])->all();

        // product
        $productData = $this->productRepository->getActiveNameAndId();
        $productNames = $productData->map(fn($product) => ['id' => $product->id, 'title' => $product->title])->all();

        // get next receipt no
        $receiptNo = $this->purchaseRepository->getNextReceiptNo();

        return Inertia::render('Inventory/CreateProductPurchase', [
            'productNames' => $productNames,
            'ledgerNames' => $ledgerNames,
            'partyAccountNames' => $partyAccountNames,
            'receiptNo' => $receiptNo,
        ]);
    }


    /**
     * saveSingle product
     */
    public function productPurchaseSave(PurchaseRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            if (empty($input['receipt_no'])) {
                $receiptNo = $this->purchaseRepository->getNextReceiptNo();
            } else {
                $receiptNo = $input['receipt_no'];
            }

            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'party_ledger_id' => $input['party_account_id'] ?? null,
                'ledger_id' => $input['ledger_id'] ?? null,
                'receipt_no' => $receiptNo,
                'supplier_invoice_no' => $input['supplier_invoice_no'] ?? null,
                'purchase_date_at' => !empty($input['purchase_date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['purchase_date_at'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'description' => $input['description'] ?? null,
                'sub_total' => $input['sub_total'] ?? null,
                'total' => $input['grand_total'] ?? null,
                'discount_type' => $input['discount_type'] ?? null,
                'discount_value' => $input['discount_value'] ?? null,
                'discount_amount' => $input['discount_amount'] ?? null,
                'tax_amount' => $input['tax_amount'] ?? null,
                'status' => Status::ACTIVE,
                'created_by' => auth()->user()->id,
            );

            $purchase = $this->purchaseRepository->create($dataArray);

            $productsData = $input['products'];

            foreach ($productsData as $item) {
                $proDataArr = [
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'product_id' => intval($item['product_id']) ?? null,
                    'purchase_id' => $purchase->id,
                    'quantity' => $item['quantity'] ?? null,
                    'rate' => $item['rate'] ?? null,
                    'amount' => $item['amount'] ?? null,
                    'description' => $item['description'] ?? null,
                    'status' => Status::ACTIVE,
                ];

                $this->purchaseRepository->createProduct($proDataArr);
            }

            // update product stock
            $this->productRepository->updateProductAvailableStock($item['product_id'], $item['quantity'] ?? 1, 'increment');

            // generate receipt no
            $receiptNumberSetting = getSiteSettingData('voucher_is_enable_purchase');
            $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";

            if ($receiptNumberEnabaled) {
                setSiteSettingData('Voucher', 'voucher_purchase_voucher_receipt_seed_no', $receiptNo + 1);
            }

            Session::put('purchase_id', $purchase->id);

            DB::commit();

            return redirect()->route('product_purchase.list')->with('message', 'Product purchase successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->route('product_purchase.list')->with('error', 'Something goes wrong.');
        }
    }

    /**
     * PurchaseReport
     */
    public function purchaseReport(Request $request): Response
    {
        $partyAccountId =  '';
        $startDate = date('Y-m-d');
        $endDate = date('Y-m-d');

        if ($request->isMethod('post')) {
            $partyAccountId = $request->input('party_account_id') ?? '';
            $startDate = !empty($request->input('start_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date'))->timezone(getSchoolTimeZone())->toDateString() : '';
            $endDate = !empty($request->input('end_date')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date'))->timezone(getSchoolTimeZone())->toDateString() : '';
        }

        // purchase report
        $purchaseReport = $this->purchaseRepository->getActiveAllForReport($partyAccountId, $startDate, $endDate);

        // party account
        $partyAccountData = $this->ledgerRepository->getLedgersByAccountGroupTitle('Sundry Creditors');
        $partyAccountNames = $partyAccountData->map(fn($pa) => ['id' => $pa->id, 'title' => $pa->title])->all();

        return Inertia::render('Inventory/PurchaseReport', [
            'purchaseReport' => $purchaseReport,
            'partyAccountNames' => $partyAccountNames,
        ]);
    }

    /**
     * PurchaseSummaryReport
     */
    public function purchaseSummaryReport(): Response
    {
        $purchaseSummaryReport = [];

        $purchases = $this->purchaseRepository->getActiveAllForPurchaseSummary();

        if (count($purchases) > 0) {
            foreach ($purchases as $purchase) {
                $month = "";
                $date = "";
                $ledgerId = $purchase?->ledger_id;

                if (!empty($purchase->purchase_date_at)) {
                    $month = Carbon::parse($purchase->purchase_date_at)->format('F-Y');
                    $date = Carbon::parse($purchase->purchase_date_at)->format('d-M-Y');
                }

                // purchase summary
                if (!isset($purchaseSummaryReport[$month])) {
                    $purchaseSummaryReport[$month] = [
                        'month' => $month,
                        'amount' => 0
                    ];
                }

                $purchaseSummaryReport[$month]['amount'] = ($purchaseSummaryReport[$month]['amount'] ?? 0) + ($purchase->total ?? 0);

                // date wise report
                if (!isset($purchaseSummaryReport[$month]['date_wise_report'][$date])) {
                    $purchaseSummaryReport[$month]['date_wise_report'][$date] = [
                        'date' => $date,
                        'amount' => 0
                    ];
                }

                $purchaseSummaryReport[$month]['date_wise_report'][$date]['amount'] = ($purchaseSummaryReport[$month]['date_wise_report'][$date]['amount'] ?? 0) + ($purchase->total ?? 0);

                // ledger wise report
                if (!isset($purchaseSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerId])) {
                    $purchaseSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerId] = [
                        'ledger_title' => $purchase?->ledger?->title,
                        'amount' => 0
                    ];
                }

                $purchaseSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerId]['amount'] = ($purchaseSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerId]['amount'] ?? 0) + ($purchase->total ?? 0);
                $purchaseSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerId]['discount_amount'] = ($purchaseSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerId]['discount_amount'] ?? 0) + ($purchase->discount_amount ?? 0);
                $purchaseSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerId]['tax_amount'] = ($purchaseSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerId]['tax_amount'] ?? 0) + ($purchase->tax_amount ?? 0);
                $purchaseSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerId]['sub_total'] = ($purchaseSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerId]['sub_total'] ?? 0) + ($purchase->sub_total ?? 0);

                // item report
                if ($purchase?->purchaseProducts?->count() > 0) {
                    foreach ($purchase->purchaseProducts as $purchaseProduct) {
                        $productId = $purchaseProduct?->product_id;

                        if (!isset($purchaseSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerId]['item_report'][$productId])) {
                            $purchaseSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerId]['item_report'][$productId] = [
                                'product_title' => $purchaseProduct?->product?->title,
                                'quantity' => 0,
                                'rate' => 0,
                                'amount' => 0
                            ];
                        }

                        $purchaseSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerId]['item_report'][$productId]['quantity'] = ($purchaseSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerId]['item_report'][$productId]['quantity'] ?? 0) + ($purchaseProduct->quantity ?? 0);
                        $purchaseSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerId]['item_report'][$productId]['rate'] = ($purchaseSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerId]['item_report'][$productId]['rate'] ?? 0) + ($purchaseProduct->rate ?? 0);
                        $purchaseSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerId]['item_report'][$productId]['amount'] = ($purchaseSummaryReport[$month]['date_wise_report'][$date]['ledger_wise_report'][$ledgerId]['item_report'][$productId]['amount'] ?? 0) + ($purchaseProduct->amount ?? 0);
                    }
                }
            }
        }

        $purchaseSummaryReport = !empty($purchaseSummaryReport) ? array_values($purchaseSummaryReport) : [];

        return Inertia::render('Inventory/PurchaseSummaryReport', [
            'purchaseSummaryReport' => $purchaseSummaryReport,
        ]);
    }

    /*
    * Cancel Purchase
    */
    public function cancelPurchase(int $id, CancelPurchaseRequest $request)
    {
        $input = $request->validated();

        $purchase = $this->purchaseRepository->getActivePurchaseById($id);

        abort_if(empty($purchase), 404);

        $purchase->loadMissing(['purchaseProducts']);

        DB::beginTransaction();

        try {
            $dataArray = [
                'cancel_reason' => $input['cancel_reason'] ?? null,
                'is_cancelled' => true
            ];

            $this->purchaseRepository->update($purchase->id, $dataArray);

            // update product available stock
            if ($purchase?->purchaseProducts?->count() > 0) {
                foreach ($purchase->purchaseProducts as $purchaseProduct) {
                    $this->productRepository->updateProductAvailableStock($purchaseProduct?->product_id, $purchaseProduct?->quantity, 'decrement');
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Purchase cancelled successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }
}
