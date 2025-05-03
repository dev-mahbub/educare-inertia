<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Account;
use App\Models\Purchase;
use App\Models\SaleLedger;
use App\Models\PartyAccount;
use App\Models\LedgerPayment;
use App\Models\PurchaseProduct;
use App\Models\SaleLedgerReturn;
use App\Models\SaleLedgerProduct;
use Illuminate\Support\Facades\DB;
use App\Models\SaleLedgerProductReturn;

class AccountRepository implements IRepository, IAccountRepository
{
    public function getAll()
    {
        return Account::all();
    }

    public function getById($id)
    {
        return Account::findOrFail($id);
    }

    public function delete($id)
    {
        Account::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Account::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Account::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Account::where('status', Status::ACTIVE)->get();
    }

    public function getRegisterAll()
    {
        return Account::where('status', Status::ACTIVE)->get();
    }

    // party account
    public function getActivePartyAccountNameAndId()
    {
        return PartyAccount::where('status', Status::ACTIVE)->select('id', 'title')->latest()->get();
    }

    // start - Mis Report
    /*================ Start Sale & Sale Product ================= */

    // Monthly paid Sale
    public function getMonthlyPaidSaleSum()
    {
        return SaleLedger::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('paid_type', '=', 'Paid')
            ->where('is_cancelled', false)
            ->whereBetween(DB::raw('DATE(transaction_date)'), getStartEndDateOfMonth())
            ->sum('total');
    }

    // Total paid Sale
    public function getTotalPaidSaleSum()
    {
        return SaleLedger::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('paid_type', '=', 'Paid')
            ->where('is_cancelled', false)
            ->sum('total');
    }

    // Monthly unpaid Sale
    public function getMonthlyUnpaidSaleSum()
    {
        return SaleLedger::where('school_id', getUserSchoolId())
            ->where('paid_type', '=', 'Unpaid')
            ->where('status', Status::ACTIVE)
            ->where('is_cancelled', false)
            ->whereBetween(DB::raw('DATE(sale_date_at)'), getStartEndDateOfMonth())
            ->sum('total');
    }

    // Total unpaid Sale
    public function getTotalUnpaidSaleSum()
    {
        return SaleLedger::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('paid_type', '=', 'Paid')
            ->where('is_cancelled', false)
            ->sum('total');
    }

    public function getMonthlySaleSum()
    {
        return SaleLedger::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('is_cancelled', false)
            ->whereBetween(DB::raw('DATE(sale_date_at)'), getStartEndDateOfMonth())
            ->sum('total');
    }

    public function getMonthWiseSaleLedgerReportData()
    {
        return SaleLedger::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('is_cancelled', false)
            ->select(
                'id',
                'total',
                'paid_amount',
                'sale_date_at'
            )
            ->get();
    }

    public function getTotalSaleSum()
    {
        return SaleLedger::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('is_cancelled', false)
            ->sum('total');
    }


    public function getMonthlySaleReturnSum()
    {
        return SaleLedgerReturn::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('is_cancelled', false)
            ->whereBetween(DB::raw('DATE(return_date_at)'), getStartEndDateOfMonth())
            ->sum('total');
    }

    public function getTotalSaleReturnSum()
    {
        return SaleLedgerReturn::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('is_cancelled', false)
            ->sum('total');
    }

    public function getMonthWiseSaleLedgerReturnReportData()
    {
        return SaleLedgerReturn::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('is_cancelled', false)
            ->select(
                'id',
                'return_date_at',
                'total'
            )
            ->get();
    }




    /*================ End Sale & Sale Product ================= */

    /*================ Start Purchase & Purchase Product ================= */

    public function getTotalPurchaseSum()
    {
        return Purchase::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('is_cancelled', false)
            ->sum('total');
    }

    public function getMonthlyPurchaseSum()
    {
        return Purchase::where('school_id', getUserSchoolId())
            ->whereBetween('purchase_date_at', getStartEndDateOfMonth())
            ->where('status', Status::ACTIVE)
            ->where('is_cancelled', false)
            ->sum('total');
    }

    public function getMonthWisePurchaseReportData()
    {
        return Purchase::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('is_cancelled', false)
            ->select(
                'id',
                'purchase_date_at',
                'total'
            )
            ->get();
    }

    public function getMonthlyPurchaseProductSum()
    {
        return PurchaseProduct::where('school_id', getUserSchoolId())
            ->whereBetween(DB::raw('DATE(created_at)'), getStartEndDateOfMonth())
            ->where('status', Status::ACTIVE)
            ->whereHas('purchase', function ($query) {
                $query->where('is_cancelled', false);
            })
            ->sum('total');
    }


    /*================ End Purchase & Purchase Product ================= */

    /*================ Start Ledger Payment ================= */

    public function getTotalPaymentSum()
    {
        return LedgerPayment::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('status', Status::ACTIVE)
            ->where('is_cancelled', false)
            ->sum('total');
    }

    public function getMonthlyPaymentSum()
    {
        return LedgerPayment::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereBetween('payment_date_at', getStartEndDateOfMonth())
            ->where('status', Status::ACTIVE)
            ->where('is_cancelled', false)
            ->sum('total');
    }

    public function getMonthWiseLedgerPaymentReportData()
    {
        return LedgerPayment::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('status', Status::ACTIVE)
            ->where('is_cancelled', false)
            ->select(
                'id',
                'payment_date_at',
                'total'
            )
            ->get();
    }


    /*================ End Ledger Payment ================= */
}
