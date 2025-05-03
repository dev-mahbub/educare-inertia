<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\SiteSetting;
use App\Models\LedgerPayment;
use App\Models\LedgerPaymentItem;
use Illuminate\Support\Facades\DB;

class PaymentRepository implements IRepository, IPaymentRepository
{
    public function getAll()
    {
        return LedgerPayment::all();
    }

    public function getById($id)
    {
        return LedgerPayment::findOrFail($id);
    }

    public function getBySchoolId($id)
    {
        return LedgerPayment::where('school_id', $id)->first();
    }

    public function delete($id)
    {
        return LedgerPayment::destroy($id);
    }

    public function create(array $arrayData)
    {
        return LedgerPayment::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return LedgerPayment::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return LedgerPayment::where('status', Status::ACTIVE)
            ->get();
    }

    // public function getActiveList(string $search = '', string $paymentMode = '', string $startDate = '', string $endDate = '')
    public function getActiveList(string $search = '', int $bankLedgerId = null, string $startDate = '', string $endDate = '')
    {
        $query = LedgerPayment::query();
        $query->where('school_id', '=', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('is_cancelled', false);

        if (!empty($bankLedgerId)) {
            $query->where('bank_ledger_id', $bankLedgerId);
        }

        if (!empty($startDate)) {
            $query->whereDate('payment_date_at', '>=', $startDate);
        }

        if (!empty($endDate)) {
            $query->whereDate('payment_date_at', '<=', $endDate);
        }

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

        // if (!empty($paymentDate)) {
        //     $query->whereDate('payment_date_at', '=', $paymentDate);
        // }

        return $query->with([
            'bankLedger',
            'ledger_payment_items' => function ($query) {
                $query->select(
                    'id',
                    'ledger_payment_id',
                    'ledger_id',
                    'amount'
                )->with([
                    'ledger:id,title'
                ]);
            }
        ])->select(
            'id',
            'receipt_no',
            'payment_mode',
            'payment_date_at',
            'description',
            'total',
            'bank_ledger_id'
        )->orderBy('payment_date_at', 'desc')->get();


        // return LedgerPayment::select(
        //     'ledger_payments.*',
        //     'ledger_payment_items.ledger_payment_id',
        //     'ledgers.title as ledger_title'
        // )
        // ->where('ledger_payments.status', Status::ACTIVE)
        // ->leftJoin('ledger_payment_items', 'ledger_payment_items.ledger_payment_id', '=', 'ledger_payments.id')
        // ->leftJoin('ledgers', 'ledgers.id', '=', 'ledger_payment_items.ledger_id')
        // ->get();

        // return LedgerPayment::select(
        //     'ledger_payments.*',
        //     'ledger_payment_items.ledger_payment_id',
        //     'ledgers.title as ledger_title'
        //     // Add other columns as needed
        // )
        // ->where('ledger_payments.status', Status::ACTIVE)
        // ->whereIn('ledger_payment_items.ledger_payment_id', function($query) {
        //     $query->select('ledger_payment_items.ledger_payment_id')
        //         ->from('ledger_payment_items')
        //         ->groupBy('ledger_payment_items.ledger_payment_id');
        // })
        // ->leftJoin('ledger_payment_items', 'ledger_payment_items.ledger_payment_id', '=', 'ledger_payments.id')
        // ->leftJoin('ledgers', 'ledgers.id', '=', 'ledger_payment_items.ledger_id')
        // ->get();
    }

    public function getCanceledLedgerPayments(string $startDate = '', string $endDate = '', int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return LedgerPayment::where('school_id', $schoolId)
            ->where('status', Status::ACTIVE)
            ->where('is_cancelled', true)
            ->where(function ($query) use ($startDate, $endDate) {
                if (!empty($startDate)) {
                    $query->whereDate('payment_date_at', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $query->whereDate('payment_date_at', '<=', $endDate);
                }
            })->select(
                'id',
                'receipt_no',
                'payment_mode',
                'payment_date_at',
                'description',
                'total',
                'bank_ledger_id'
            )
            ->with([
                'bankLedger',
                'ledger_payment_items' => function ($query) {
                    $query->select(
                        'id',
                        'ledger_payment_id',
                        'ledger_id',
                        'amount'
                    )->with([
                        'ledger:id,title'
                    ]);
                }
            ])
            ->orderBy('payment_date_at', 'desc')
            ->get();
    }

    public function getLedgerPaymentBetweenDates($startDate, $endDate, $schoolId = null)
    {
        $query = LedgerPayment::query();
        $query->where('school_id', '=', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('status', Status::ACTIVE);

        if (!empty($startDate) && !empty($endDate)) {
            $query->whereBetween('payment_date_at', [$startDate, $endDate]);
        } else if (!empty($startDate) && empty($endDate)) {
            $query->whereDate('payment_date_at', '=', $startDate);
        }

        return $query->with(['account_group', 'ledger_payment_items.ledger'])->get();
    }

    public function getRegisterAll()
    {
        return LedgerPayment::where('status', Status::ACTIVE);
    }

    public function getLedgerPaymentNextReceiptNo(int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        $receiptNumberSetting = getSiteSettingData('voucher_is_enable_payment');
        $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";

        if ($receiptNumberEnabaled) {
            $saleLedgerReceiptSeed = SiteSetting::where('status', Status::ACTIVE)
                ->where('school_id', $schoolId)
                ->where('academic_year_id', $academicYearId)
                ->where('type', 'Voucher')
                ->where('key_name', 'voucher_payment_voucher_receipt_seed_no')
                ->first();

            if ($saleLedgerReceiptSeed != null) {
                $nextReceiptNo = ($saleLedgerReceiptSeed?->value ?? 0) + 1;
            } else {
                $saleLedgerReceiptSeed = setSiteSettingData('Voucher', 'voucher_payment_voucher_receipt_seed_no', 1);
                $nextReceiptNo = $saleLedgerReceiptSeed?->value ?? 1;
            }
        } else {
            $ledgerPayment = LedgerPayment::where('school_id', getUserSchoolId())
                ->select('id', 'receipt_no')
                ->orderBy('id', 'desc')
                ->first();

            $nextReceiptNo = ($ledgerPayment->receipt_no ?? 0) + 1;
        }

        return $nextReceiptNo;
    }

    public function getPaymentsByPaymentMode(string $paymentMode)
    {
        return LedgerPayment::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('payment_mode', $paymentMode)
            ->where('is_cancelled', false)
            ->select('id', 'payment_mode', 'total')
            ->get();
    }

    public function getPaymentsByBankLedgerId(int $bankLedgerId, bool $isLedgerAmountSessionWise = false)
    {
        return LedgerPayment::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->when($isLedgerAmountSessionWise == true, function ($query) {
                $query->where('academic_year_id', getAcademicYearId());
            })
            ->where('bank_ledger_id', $bankLedgerId)
            ->where('is_cancelled', false)
            ->select('id', 'payment_mode', 'bank_ledger_id', 'total')
            ->get();
    }

    public function getActiveLedgerPaymentById(int $id)
    {
        return LedgerPayment::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->where('is_cancelled', false)
            ->select(
                'id',
                'receipt_no',
                'payment_mode',
                'payment_date_at',
                'description',
                'total',
                'created_by',
                'bank_ledger_id'
            )
            ->first();
    }


    public function getCancelledLedgerPaymentById(int $id)
    {
        return LedgerPayment::where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->where('is_cancelled', true)
            ->select(
                'id',
                'receipt_no',
                'payment_mode',
                'payment_date_at',
                'description',
                'total',
                'created_by',
                'bank_ledger_id'
            )
            ->first();
    }

    public function getLedgerPaymentById(int $id)
    {
        return LedgerPayment::where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->select(
                'id',
                'receipt_no',
                'payment_mode',
                'payment_date_at',
                'description',
                'total',
                'created_by',
                'bank_ledger_id'
            )
            ->first();
    }

    public function getCancelledReport(string $startDate = '', string $endDate = '')
    {
        return LedgerPayment::where('school_id', '=', getUserSchoolId())
            ->where('is_cancelled', true)
            ->where(function ($query) use ($startDate, $endDate) {
                if (!empty($startDate)) {
                    $query->whereDate('payment_date_at', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $query->whereDate('payment_date_at', '<=', $endDate);
                }
            })->with([
                'ledger_payment_items.ledger',
                'bankLedger'
            ])->select(
                'id',
                'receipt_no',
                'payment_mode',
                'payment_date_at',
                'description',
                'total',
                'bank_ledger_id'
            )
            ->orderBy('payment_date_at', 'desc')
            ->get();
    }

    public function ledgerPaymentExists(int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return LedgerPayment::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('is_cancelled', false)
            ->exists();
    }


    // ledger payment item

    public function createLedgerPaymentItem(array $arrayData)
    {
        return LedgerPaymentItem::create($arrayData);
    }
    // public function getActiveListItem()
    // {
    //     return LedgerPaymentItem::where('ledger_payment_items.status', Status::ACTIVE)
    //         ->leftJoin('ledgers', 'ledgers.id', '=', 'ledger_payment_items.ledger_id')
    //         ->select()
    //         ->get();
    // }

    public function getFilteredLedgerPaymentItems(string $startDate = '', string $endDate = '', int $ledgerId = null, $schoolId = null)
    {
        return LedgerPaymentItem::where('status', Status::ACTIVE)
            ->where('school_id', '=', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->whereHas('ledgerPayment', function ($query) use ($startDate, $endDate, $ledgerId) {
                $query->where('status', Status::ACTIVE)
                    ->where('is_cancelled', false)
                    ->where(function ($query) use ($startDate, $endDate, $ledgerId) {
                        if (!empty($startDate)) {
                            $query->whereDate('payment_date_at', '>=', $startDate);
                        }

                        if (!empty($endDate)) {
                            $query->whereDate('payment_date_at', '<=', $endDate);
                        }

                        if (!empty($ledgerId)) {
                            $query->where('bank_ledger_id', $ledgerId);
                        }
                    });
            })
            ->with([
                'ledgerPayment',
                'ledger'
            ])
            ->get();
    }
}
