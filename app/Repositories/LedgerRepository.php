<?php

namespace App\Repositories;

use App\Enums\CategoryType;
use App\Enums\Status;
use App\Models\AccountGroup;
use App\Models\Ledger;

class LedgerRepository implements IRepository, ILedgerRepository
{
    public function getAll()
    {
        return Ledger::all()->latest()->get();
    }

    public function getById($id)
    {
        return Ledger::findOrFail($id);
    }

    public function delete($id)
    {
        Ledger::destroy($id);
    }

    public function deleteSubCat($id)
    {
        return Ledger::where('parent_id', $id)->delete();
    }

    public function create(array $arrayData)
    {
        return Ledger::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Ledger::whereId($id)
            ->update($arrayData);
    }

    public function updateOrCreate(array $attributesToCheck, array $valuesToUpdate)
    {
        return Ledger::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function getActiveAll()
    {
        return Ledger::where('ledgers.status', Status::ACTIVE)
            ->where('account_groups.school_id', getUserSchoolId())
            ->leftJoin('account_groups', 'ledgers.account_group_id', '=', 'account_groups.id')
            ->select('ledgers.*', 'account_groups.title as group_title')
            ->latest()
            ->get();
    }

    public function getActiveList($accountId = '', $search = '')
    {
        $query = Ledger::query();
        $query->where('ledgers.status', Status::ACTIVE)
            // ->where('account_groups.school_id', getUserSchoolId())
            ->where(function ($query) {
                $query->where('ledgers.school_id', getUserSchoolId());
            })
            ->where(function ($query) {
                $query->where('account_groups.school_id', getUserSchoolId())
                    ->orWhereNull('account_groups.school_id');
            })
            ->leftJoin('account_groups', 'ledgers.account_group_id', '=', 'account_groups.id')
            ->select('ledgers.*', 'account_groups.title as group_title');

        if (!empty($accountId)) {
            $query->where('ledgers.account_group_id', '=', $accountId);
        }

        if (!empty($search)) {
            $query->where(function ($subQuery) use ($search) {
                $subQuery->where('ledgers.title', 'like', '%' . $search . '%')
                    ->orWhere('ledgers.mobile', 'like', '%' . $search . '%')
                    ->orWhere('ledgers.alt_mobile', 'like', '%' . $search . '%')
                    ->orWhere('ledgers.email', 'like', '%' . $search . '%');
            });
        }

        return $query->latest()->get();
    }

    public function getActiveAllReport($accountId = '', $search = '', $schoolId = null)
    {
        $query = Ledger::query();
        $query->where('ledgers.status', Status::ACTIVE)
            ->where('account_groups.school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->leftJoin('account_groups', 'ledgers.account_group_id', '=', 'account_groups.id')
            ->select('ledgers.*', 'account_groups.title as group_title');

        if (!empty($accountId)) {
            $query->where('ledgers.account_group_id', '=', $accountId);
        }

        if (!empty($search)) {
            $query->where(function ($subQuery) use ($search) {
                $subQuery->where('ledgers.title', 'like', '%' . $search . '%')
                    ->orWhere('ledgers.mobile', 'like', '%' . $search . '%')
                    ->orWhere('ledgers.alt_mobile', 'like', '%' . $search . '%')
                    ->orWhere('ledgers.email', 'like', '%' . $search . '%');
            });
        }

        return $query->latest()->get();
    }

    public function getRegisterAll()
    {
        return Ledger::where('status', Status::ACTIVE)->latest()->get();
    }

    public function getActiveNameAndId($schoolId = null)
    {
        return Ledger::where('status', Status::ACTIVE)
            ->where('school_id', '=', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->select(
                'id',
                'title',
                'account_group_id',
                'amount_type',
                'opening_balance'
            )
            ->latest()
            ->get();
    }

    public function getLedgersByAccountGroupTitle(string $title)
    {
        return Ledger::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('accountGroup', function ($query) use ($title) {
                $query->where('title', $title);
            })
            ->select('id', 'title')
            ->get();
    }

    public function getLedgersByAccountGroupTitles(array $titles, $schoolId = null)
    {
        return Ledger::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->whereHas('accountGroup', function ($query) use ($titles) {
                $query->whereIn('title', $titles);
            })
            ->select('id', 'title')
            ->get();
    }

    public function getLedgerByLedgerId(int $id)
    {
        return Ledger::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->select(
                'id',
                'title',
                'account_group_id',
                'amount_type',
                'opening_balance'
            )
            ->first();
    }

    public function getLedgerByLedgerTitle(string $title)
    {
        return Ledger::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('title', $title)
            ->select(
                'id',
                'title',
                'account_group_id',
                'amount_type',
                'opening_balance'
            )
            ->first();
    }


    public function getLedgerReportData(int $id, string $startDate = "", string $endDate = "", $schoolId = null, $academicYearId = null)
    {
        $ledgerAmountSetting = getSiteSettingData('account_is_ledger_amount_based', $schoolId, $academicYearId);
        $isLedgerAmountSessionWise = $ledgerAmountSetting?->value != null && strtolower($ledgerAmountSetting->value) == 'yes';

        return Ledger::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('id', $id)
            ->with([
                'ledgerPaymentItems' => function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise, $academicYearId) {
                    $query->whereHas('ledgerPayment', function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise, $academicYearId) {
                        if (!empty($startDate)) {
                            $query->whereDate('payment_date_at', '>=', $startDate);
                        }

                        if (!empty($endDate)) {
                            $query->whereDate('payment_date_at', '<=', $endDate);
                        }

                        if ($isLedgerAmountSessionWise == true) {
                            $query->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId());
                        }

                        $query->where('is_cancelled', false);
                    })->with(['ledgerPayment.bankLedger']);
                },
                'partyPurchases' => function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise, $academicYearId) {
                    if (!empty($startDate)) {
                        $query->whereDate('purchase_date_at', '>=', $startDate);
                    }

                    if (!empty($endDate)) {
                        $query->whereDate('purchase_date_at', '<=', $endDate);
                    }

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId());
                    }

                    $query->where('is_cancelled', false)
                        ->with(['ledger']);
                },
                'purchases' => function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise, $academicYearId) {
                    if (!empty($startDate)) {
                        $query->whereDate('purchase_date_at', '>=', $startDate);
                    }

                    if (!empty($endDate)) {
                        $query->whereDate('purchase_date_at', '<=', $endDate);
                    }

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId());
                    }

                    $query->where('is_cancelled', false)
                        ->with(['partyAccount']);
                }
            ])
            ->select('id', 'title', 'account_group_id')
            ->first();
    }

    public function getLedgersByAccountGroupId(int $accountGroupId)
    {
        return Ledger::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('account_group_id', $accountGroupId)
            ->select(
                'id',
                'account_group_id',
                'title',
                'opening_balance',
                'amount_type'
            )
            ->get();
    }

    public function getCashBookReportData(string $date, bool $isLedgerAmountSessionWise = false)
    {
        return Ledger::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where(function ($query) use ($date, $isLedgerAmountSessionWise) {
                $query->whereHas('ledgerPayments', function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereDate('payment_date_at', $date)
                        ->where('is_cancelled', false);

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                })->orWhereHas('ledgerPaymentItems', function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereHas('ledgerPayment', function ($query) use ($date, $isLedgerAmountSessionWise) {
                        $query->whereDate('payment_date_at', $date)
                            ->where('is_cancelled', false);

                        if ($isLedgerAmountSessionWise == true) {
                            $query->where('academic_year_id', getAcademicYearId());
                        }
                    });
                })->orWhereHas('ledgerReceipts', function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereDate('receipt_date_at', $date)
                        ->where('is_cancelled', false);

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                })->orWhereHas('ledgerReceiptItems', function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereHas('ledgerReceipt', function ($query) use ($date, $isLedgerAmountSessionWise) {
                        $query->whereDate('receipt_date_at', $date)
                            ->where('is_cancelled', false);

                        if ($isLedgerAmountSessionWise == true) {
                            $query->where('academic_year_id', getAcademicYearId());
                        }
                    });
                })->orWhereHas('partyPurchases', function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereDate('purchase_date_at', $date)
                        ->where('is_cancelled', false);

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                })->orWhereHas('purchases', function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereDate('purchase_date_at', $date)
                        ->where('is_cancelled', false);

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                })->orWhereHas('saleLedgers', function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereDate('sale_date_at', $date)
                        ->where('is_cancelled', false);

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                })->orWhereHas('saleLedgerReturns', function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereDate('return_date_at', $date)
                        ->where('is_cancelled', false);

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                });
            })
            ->with([
                'ledgerPayments' => function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereDate('payment_date_at', $date)
                        ->where('is_cancelled', false);

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                },
                'ledgerPaymentItems' => function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereHas('ledgerPayment', function ($query) use ($date, $isLedgerAmountSessionWise) {
                        $query->whereDate('payment_date_at', $date)
                            ->where('is_cancelled', false);

                        if ($isLedgerAmountSessionWise == true) {
                            $query->where('academic_year_id', getAcademicYearId());
                        }
                    });
                },
                'ledgerReceipts' => function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereDate('receipt_date_at', $date)
                        ->where('is_cancelled', false);

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                },
                'ledgerReceiptItems' => function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereHas('ledgerReceipt', function ($query) use ($date, $isLedgerAmountSessionWise) {
                        $query->whereDate('receipt_date_at', $date)
                            ->where('is_cancelled', false);

                        if ($isLedgerAmountSessionWise == true) {
                            $query->where('academic_year_id', getAcademicYearId());
                        }
                    });
                },
                'partyPurchases' => function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereDate('purchase_date_at', $date)
                        ->where('is_cancelled', false);

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                },
                'purchases' => function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereDate('purchase_date_at', $date)
                        ->where('is_cancelled', false);

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                },
                'saleLedgers' => function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereDate('sale_date_at', $date)
                        ->where('is_cancelled', false);

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                },
                'saleLedgerReturns' => function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereDate('return_date_at', $date)
                        ->where('is_cancelled', false);

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                }
            ])
            ->select('id', 'title', 'opening_balance', 'amount_type')
            ->get();
    }

    public function getPreviousDayCashBookReportData(string $date, bool $isLedgerAmountSessionWise = false)
    {
        return Ledger::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where(function ($query) use ($date, $isLedgerAmountSessionWise) {
                $query->whereHas('ledgerPayments', function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereDate('payment_date_at', '<', $date)
                        ->where('is_cancelled', false);

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                })->orWhereHas('ledgerPaymentItems', function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereHas('ledgerPayment', function ($query) use ($date, $isLedgerAmountSessionWise) {
                        $query->whereDate('payment_date_at', '<', $date)
                            ->where('is_cancelled', false);

                        if ($isLedgerAmountSessionWise == true) {
                            $query->where('academic_year_id', getAcademicYearId());
                        }
                    });
                })->orWhereHas('ledgerReceipts', function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereDate('receipt_date_at', '<', $date)
                        ->where('is_cancelled', false);

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                })->orWhereHas('ledgerReceiptItems', function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereHas('ledgerReceipt', function ($query) use ($date, $isLedgerAmountSessionWise) {
                        $query->whereDate('receipt_date_at', '<', $date)
                            ->where('is_cancelled', false);

                        if ($isLedgerAmountSessionWise == true) {
                            $query->where('academic_year_id', getAcademicYearId());
                        }
                    });
                })->orWhereHas('partyPurchases', function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereDate('purchase_date_at', '<', $date)
                        ->where('is_cancelled', false);

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                })->orWhereHas('purchases', function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereDate('purchase_date_at', '<', $date)
                        ->where('is_cancelled', false);

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                })->orWhereHas('saleLedgers', function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereDate('sale_date_at', '<', $date)
                        ->where('is_cancelled', false);

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                })->orWhereHas('saleLedgerReturns', function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereDate('return_date_at', '<', $date)
                        ->where('is_cancelled', false);

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                });
            })
            ->with([
                'ledgerPayments' => function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereDate('payment_date_at', '<', $date)
                        ->where('is_cancelled', false);

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                },
                'ledgerPaymentItems' => function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereHas('ledgerPayment', function ($query) use ($date, $isLedgerAmountSessionWise) {
                        $query->whereDate('payment_date_at', '<', $date)
                            ->where('is_cancelled', false);

                        if ($isLedgerAmountSessionWise == true) {
                            $query->where('academic_year_id', getAcademicYearId());
                        }
                    });
                },
                'ledgerReceipts' => function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereDate('receipt_date_at', '<', $date)
                        ->where('is_cancelled', false);

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                },
                'ledgerReceiptItems' => function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereHas('ledgerReceipt', function ($query) use ($date, $isLedgerAmountSessionWise) {
                        $query->whereDate('receipt_date_at', '<', $date)
                            ->where('is_cancelled', false);

                        if ($isLedgerAmountSessionWise == true) {
                            $query->where('academic_year_id', getAcademicYearId());
                        }
                    });
                },
                'partyPurchases' => function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereDate('purchase_date_at', '<', $date)
                        ->where('is_cancelled', false);

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                },
                'purchases' => function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereDate('purchase_date_at', '<', $date)
                        ->where('is_cancelled', false);

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                },
                'saleLedgers' => function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereDate('sale_date_at', '<', $date)
                        ->where('is_cancelled', false);

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                },
                'saleLedgerReturns' => function ($query) use ($date, $isLedgerAmountSessionWise) {
                    $query->whereDate('return_date_at', '<', $date)
                        ->where('is_cancelled', false);

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                }
            ])
            ->select('id', 'title', 'opening_balance', 'amount_type')
            ->get();
    }
}
