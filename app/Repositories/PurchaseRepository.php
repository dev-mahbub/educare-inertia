<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Purchase;
use App\Models\SiteSetting;
use App\Models\PurchaseProduct;
use Illuminate\Support\Facades\DB;

class PurchaseRepository implements IRepository, IPurchaseRepository
{
    public function getAll()
    {
        return Purchase::all()->latest()->get();
    }

    public function getById($id)
    {
        return Purchase::findOrFail($id);
    }

    public function delete($id)
    {
        Purchase::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Purchase::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Purchase::whereId($id)
            ->update($arrayData);
    }

    public function getActiveAll()
    {
        return Purchase::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return Purchase::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getNextReceiptNo(int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        $receiptNumberSetting = getSiteSettingData('voucher_is_enable_purchase');
        $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";

        if ($receiptNumberEnabaled) {
            $saleLedgerReceiptSeed = SiteSetting::where('status', Status::ACTIVE)
                ->where('school_id', $schoolId)
                ->where('academic_year_id', $academicYearId)
                ->where('type', 'Voucher')
                ->where('key_name', 'voucher_purchase_voucher_receipt_seed_no')
                ->first();

            if ($saleLedgerReceiptSeed != null) {
                $nextReceiptNo = ($saleLedgerReceiptSeed?->value ?? 0) + 1;
            } else {
                $saleLedgerReceiptSeed = setSiteSettingData('Voucher', 'voucher_purchase_voucher_receipt_seed_no', 1);
                $nextReceiptNo = $saleLedgerReceiptSeed?->value ?? 1;
            }
        } else {
            $purchase = Purchase::where('school_id', getUserSchoolId())
                ->select('id', 'receipt_no')
                ->orderBy('id', 'DESC')
                ->first();

            $nextReceiptNo = ($purchase->receipt_no ?? 0) + 1;
        }

        return $nextReceiptNo;
    }

    public function getActiveAllForReport($partyAccountId, $startDate, $endDate)
    {
        $query = Purchase::query();
        $query->where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('is_cancelled', false)
            ->with([
                'purchaseProducts',
                'purchaseProducts.product:id,title',
                'partyLedger:id,title',
                'partyAccount:id,title',
                'ledger:id,title'
            ]);
        $query->where(function ($q) use ($partyAccountId, $startDate, $endDate) {
            if (!empty($partyAccountId)) {
                $q->where('purchases.party_ledger_id', '=', $partyAccountId);
            }
            if (!empty($startDate)) {
                $q->where('purchases.purchase_date_at', '>=', $startDate);
            }
            if (!empty($endDate)) {
                $q->whereDate('purchases.purchase_date_at', '<=', $endDate);
            }
        });
        return $query->latest()->get();
    }

    public function getActiveAllForPurchaseSummary()
    {
        return Purchase::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('is_cancelled', false)
            ->with([
                'purchaseProducts:id,purchase_id,product_id,amount,rate,quantity',
                'purchaseProducts.product:id,title',
                'partyLedger:id,title',
                'ledger:id,title'
            ])
            ->select(
                'id',
                'party_ledger_id',
                'ledger_id',
                'total',
                'purchase_date_at',
                'sub_total',
                'discount_type',
                'discount_value',
                'discount_amount',
                'tax_amount',
                'total'
            )
            ->orderBy('purchase_date_at', 'asc')
            ->get();
    }

    public function getFilteredPurchases(string $startDate = '', string $endDate = '', $schoolId = null)
    {
        return Purchase::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('is_cancelled', false)
            ->where(function ($query) use ($startDate, $endDate) {
                if (!empty($startDate)) {
                    $query->whereDate('purchase_date_at', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $query->whereDate('purchase_date_at', '<=', $endDate);
                }
            })
            ->with(['partyLedger:id,title'])
            ->select(
                'id',
                'party_ledger_id',
                'purchase_date_at',
                'description',
                'total',
                'receipt_no'
            )
            ->get();
    }

    public function getActivePurchaseById(int $id)
    {
        return Purchase::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('is_cancelled', false)
            ->where('id', $id)
            ->select(
                'id',
                'party_ledger_id',
                'purchase_date_at',
                'description',
                'sub_total',
                'discount_amount',
                'tax_amount',
                'total',
                'created_by',
                'receipt_no'
            )
            ->first();
    }

    public function getPurchaseById(int $id)
    {
        return Purchase::where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->select(
                'id',
                'party_ledger_id',
                'purchase_date_at',
                'description',
                'sub_total',
                'discount_amount',
                'tax_amount',
                'total',
                'created_by',
                'receipt_no'
            )
            ->first();
    }

    public function purchaseExists(int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return Purchase::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('is_cancelled', false)
            ->exists();
    }

    // Purchase product
    public function createProduct(array $arrayData)
    {
        return PurchaseProduct::create($arrayData);
    }

    public function getActiveAllTransactionPurchase($productId, $startDate, $endDate)
    {
        $query = PurchaseProduct::query();
        $query->where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->with([
                // 'product:id,title,opening_stock',
                'purchase' => function ($query) {
                    $query->with([
                        'partyLedger:id,title'
                    ])->select(
                        'id',
                        'purchase_date_at',
                        'party_ledger_id'
                    );
                }
            ]);

        if (!empty($productId)) {
            $query->where('product_id', '=', $productId);
        }

        $query->whereHas('purchase', function ($q) use ($startDate, $endDate) {
            if (!empty($startDate)) {
                $q->where('purchase_date_at', '>=', $startDate);
            }

            if (!empty($endDate)) {
                $q->whereDate('purchase_date_at', '<=', $endDate);
            }

            $q->where('is_cancelled', false);
        });


        return $query->latest()->get();
    }

    //get total purchase amount in  january
    function getTotalPurchasesAmountInJanuary(): float
    {
        $januaryPurchasesTotal = Purchase::whereYear('purchase_date_at', '=', now()->year)
            ->whereMonth('purchase_date_at', '=', 1) // January
            ->sum('total');

        return $januaryPurchasesTotal;
    }

    //Total Purchase
    function getTotalPurchaseAmount()
    {
        $totalAmount = PurchaseProduct::sum('amount');

        return $totalAmount;
    }
}
