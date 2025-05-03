<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\SiteSetting;
use App\Models\LedgerReceipt;
use App\Models\LedgerPaymentItem;
use App\Models\LedgerReceiptItem;

class ReceiptRepository implements IRepository, IReceiptRepository
{
    public function getAll()
    {
        return LedgerReceipt::all();
    }

    public function getById($id)
    {
        return LedgerReceipt::findOrFail($id);
    }

    public function getBySchoolId($id)
    {
        return LedgerReceipt::where('school_id', $id)->first();
    }

    public function delete($id)
    {
        LedgerReceipt::destroy($id);
    }

    public function create(array $arrayData)
    {
        return LedgerReceipt::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return LedgerReceipt::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return LedgerReceipt::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getRegisterAll()
    {
        return LedgerReceipt::where('status', Status::ACTIVE);
    }

    public function getActiveList($search, $ledgerId, $startDate, $endDate, $schoolId = null)
    {
        $query = LedgerReceipt::query();
        $query->where('school_id', '=', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('is_cancelled', false);

        if (!empty($search)) {
            $query->where(function ($subQuery) use ($search) {
                $subQuery->where('receipt_no', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%')
                    ->orWhere('total', 'like', '%' . $search . '%');
            });
        }

        if (!empty($ledgerId)) {
            $query->where('bank_ledger_id', '=', $ledgerId);
        }

        if (!empty($startDate)) {
            $query->whereDate('receipt_date_at', '>=', $startDate);
        }

        if (!empty($endDate)) {
            $query->whereDate('receipt_date_at', '<=', $endDate);
        }

        $query->with(['ledger_receipt_items.ledger', 'bankLedger']);

        return $query->get();
    }

    public function getCanceledLedgerReceipts(string $startDate = '', string $endDate = '', int $schoolId = null)
    {
        return LedgerReceipt::where('school_id', '=', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('is_cancelled', true)
            ->where(function ($query) use ($startDate, $endDate) {
                if (!empty($startDate)) {
                    $query->whereDate('receipt_date_at', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $query->whereDate('receipt_date_at', '<=', $endDate);
                }
            })
            ->with(['ledger_receipt_items.ledger', 'bankLedger'])
            ->get();
    }

    public function getActiveListOld($search, $ledgerId, $receiptDate)
    {
        $query = LedgerReceipt::query();
        $query->where('school_id', '=', getUserSchoolId())
            ->where('status', Status::ACTIVE);

        if (!empty($search)) {
            $query->where(function ($subQuery) use ($search) {
                $subQuery->where('receipt_no', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%')
                    ->orWhere('total', 'like', '%' . $search . '%');
            });
        }

        // if (!empty($ledgerId)) {
        //     $query->where('ledger_id', '=', $ledgerId);
        // }

        if (!empty($receiptDate)) {
            $query->whereDate('receipt_date_at', '=', $receiptDate);
        }

        return $query->get();
    }

    public function getLedgerReceiptBetweenDates($startDate, $endDate, $schoolId = null)
    {
        $query = LedgerReceipt::query();
        $query->where('school_id', '=', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('status', Status::ACTIVE);
        if (!empty($startDate) && !empty($endDate)) {
            $query->whereBetween('receipt_date_at', [$startDate, $endDate]);
        } else if (!empty($startDate) && empty($endDate)) {
            $query->whereDate('receipt_date_at', '=', $startDate);
        }
        return $query->with(['account_group', 'ledger_receipt_items.ledger'])->get();
    }

    public function getNextReceiptNo(int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        $receiptNumberSetting = getSiteSettingData('voucher_is_enable_receipt');
        $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";

        if ($receiptNumberEnabaled) {
            $saleLedgerReceiptSeed = SiteSetting::where('status', Status::ACTIVE)
                ->where('school_id', $schoolId)
                ->where('academic_year_id', $academicYearId)
                ->where('type', 'Voucher')
                ->where('key_name', 'voucher_receipt_voucher_receipt_seed_no')
                ->first();

            if ($saleLedgerReceiptSeed != null) {
                $nextReceiptNo = ($saleLedgerReceiptSeed?->value ?? 0) + 1;
            } else {
                $saleLedgerReceiptSeed = setSiteSettingData('Voucher', 'voucher_receipt_voucher_receipt_seed_no', 1);
                $nextReceiptNo = $saleLedgerReceiptSeed?->value ?? 1;
            }
        } else {
            $ledgerReceipt = LedgerReceipt::where('school_id', getUserSchoolId())
                ->select('id', 'receipt_no')
                ->orderBy('id', 'desc')
                ->first();

            $nextReceiptNo = ($ledgerReceipt->receipt_no ?? 0) + 1;
        }

        return $nextReceiptNo;
    }

    public function getReceiptsByBankLedgerId(int $bankLedgerId, bool $isLedgerAmountSessionWise = false)
    {
        return LedgerReceipt::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->when($isLedgerAmountSessionWise == true, function ($query) {
                $query->where('academic_year_id', getAcademicYearId());
            })
            ->where('bank_ledger_id', $bankLedgerId)
            ->where('is_cancelled', false)
            ->select('id', 'bank_ledger_id', 'total')
            ->get();
    }

    public function getActiveLedgerReceiptById(int $id)
    {
        return LedgerReceipt::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->where('is_cancelled', false)
            ->select(
                'id',
                'receipt_no',
                'receipt_date_at',
                'description',
                'total',
                'created_by',
                'bank_ledger_id'
            )
            ->first();
    }

    public function getCancelledLedgerReceiptById(int $id)
    {
        return LedgerReceipt::where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->where('is_cancelled', true)
            ->select(
                'id',
                'receipt_no',
                'receipt_date_at',
                'description',
                'total',
                'created_by',
                'bank_ledger_id'
            )
            ->first();
    }

    public function getLedgerReceiptById(int $id)
    {
        return LedgerReceipt::where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->select(
                'id',
                'receipt_no',
                'receipt_date_at',
                'description',
                'total',
                'created_by',
                'bank_ledger_id'
            )
            ->first();
    }

    public function getCancelledReport(string $startDate = '', string $endDate = '')
    {
        return LedgerReceipt::where('school_id', '=', getUserSchoolId())
            ->where('is_cancelled', true)
            ->where(function ($query) use ($startDate, $endDate) {
                if (!empty($startDate)) {
                    $query->whereDate('receipt_date_at', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $query->whereDate('receipt_date_at', '<=', $endDate);
                }
            })->with([
                'ledger_receipt_items.ledger',
                'bankLedger'
            ])->select(
                'id',
                'receipt_no',
                'receipt_date_at',
                'description',
                'total',
                'bank_ledger_id'
            )
            ->orderBy('receipt_date_at', 'desc')
            ->get();
    }

    public function ledgerReceiptExists(int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return LedgerReceipt::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('is_cancelled', false)
            ->exists();
    }


    // ledger receipt item

    public function createLedgerReceiptItem(array $arrayData)
    {
        return LedgerReceiptItem::create($arrayData);
    }

    public function getFilteredLedgerReceiptItems(string $startDate = '', string $endDate = '', int $ledgerId = null)
    {
        return LedgerReceiptItem::where('status', Status::ACTIVE)
            ->where('school_id', '=', getUserSchoolId())
            ->whereHas('ledgerReceipt', function ($query) use ($startDate, $endDate, $ledgerId) {
                $query->where('status', Status::ACTIVE)
                    ->where('is_cancelled', false)
                    ->where(function ($query) use ($startDate, $endDate, $ledgerId) {
                        if (!empty($startDate)) {
                            $query->whereDate('receipt_date_at', '>=', $startDate);
                        }

                        if (!empty($endDate)) {
                            $query->whereDate('receipt_date_at', '<=', $endDate);
                        }

                        if (!empty($ledgerId)) {
                            $query->where('bank_ledger_id', $ledgerId);
                        }
                    });
            })
            ->with([
                'ledgerReceipt',
                'ledger'
            ])
            ->get();
    }
}
