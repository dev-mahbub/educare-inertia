<?php

namespace App\Repositories;

use App\Enums\CategoryType;
use App\Enums\Status;
use App\Models\AccountGroup;

class AccountGroupRepository implements IRepository, IAccountGroupRepository
{
    public function getAll()
    {
        return AccountGroup::all()->latest()->get();
    }

    public function getById($id)
    {
        return AccountGroup::findOrFail($id);
    }

    public function delete($id)
    {
        AccountGroup::destroy($id);
    }

    public function deleteSubCat($id)
    {
        return AccountGroup::where('parent_id', $id)->delete();
    }

    public function create(array $arrayData)
    {
        return AccountGroup::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return AccountGroup::whereId($id)
            ->update($arrayData);
    }

    public function getActiveAll()
    {
        return AccountGroup::leftJoin('account_groups as parent', 'account_groups.parent_id', '=', 'parent.id')
            ->select('account_groups.*', 'parent.title as parent_title')
            ->where('account_groups.status', Status::ACTIVE)
            ->where(function ($query) {
                $query->whereNull('account_groups.school_id')
                    ->orWhere('account_groups.school_id', getUserSchoolId());
            })
            ->latest()
            ->get();
    }

    public function getParentNameAndId()
    {
        return AccountGroup::where('status', Status::ACTIVE)
            ->where(function ($query) {
                $query->whereNull('school_id')
                    ->orWhere('school_id', getUserSchoolId());
            })
            ->whereNull('parent_id')
            ->select('id', 'title')
            ->latest()
            ->get();
    }

    public function getSubNameAndId()
    {
        return AccountGroup::where('status', Status::ACTIVE)
            ->where(function ($query) {
                $query->whereNull('school_id')
                    ->orWhere('school_id', getUserSchoolId());
            })
            ->whereNotNull('parent_id')
            ->select('id', 'title')
            ->latest()
            ->get();
    }

    public function getActiveNameAndId()
    {
        return AccountGroup::where('status', Status::ACTIVE)
            ->where(function ($query) {
                $query->whereNull('school_id')
                    ->orWhere('school_id', getUserSchoolId());
            })
            ->select('id', 'title')
            ->latest()
            ->get();
    }

    public function getActiveNameAndIdLedgerGroup()
    {
        return AccountGroup::where('account_groups.status', Status::ACTIVE)
            ->where(function ($query) {
                $query->whereNull('account_groups.school_id')
                    ->orWhere('account_groups.school_id', getUserSchoolId());
            })
            ->join('ledgers', 'account_groups.id', '=', 'ledgers.account_group_id')
            ->select('account_groups.id', 'account_groups.title')
            ->distinct()
            ->get();
    }

    public function getRegisterAll()
    {
        return AccountGroup::where('status', Status::ACTIVE)->latest()->get();
    }

    public function getTrialBalanceReport(string $startDate = '', string $endDate = '', bool $isLedgerAmountSessionWise = false)
    {
        return AccountGroup::where('status', Status::ACTIVE)
            ->where(function ($query) {
                $query->whereNull('school_id')
                    ->orWhere('school_id', getUserSchoolId());
            })
            ->whereHas('ledgers', function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise) {
                $query->where(function ($query) {
                    $query->whereNull('school_id')
                        ->orWhere('school_id', getUserSchoolId());
                })->whereHas('ledgerPayments', function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise) {
                    if (!empty($startDate)) {
                        $query->whereDate('payment_date_at', '>=', $startDate);
                    }

                    if (!empty($endDate)) {
                        $query->whereDate('payment_date_at', '<=', $endDate);
                    }

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }

                    $query->where('is_cancelled', false);
                })->orWhereHas('ledgerPaymentItems', function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise) {
                    $query->whereHas('ledgerPayment', function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise) {
                        if (!empty($startDate)) {
                            $query->whereDate('payment_date_at', '>=', $startDate);
                        }

                        if (!empty($endDate)) {
                            $query->whereDate('payment_date_at', '<=', $endDate);
                        }

                        if ($isLedgerAmountSessionWise == true) {
                            $query->where('academic_year_id', getAcademicYearId());
                        }

                        $query->where('is_cancelled', false);
                    });
                })->orWhereHas('ledgerReceipts', function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise) {
                    if (!empty($startDate)) {
                        $query->whereDate('receipt_date_at', '>=', $startDate);
                    }

                    if (!empty($endDate)) {
                        $query->whereDate('receipt_date_at', '<=', $endDate);
                    }

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }

                    $query->where('is_cancelled', false);
                })->orWhereHas('ledgerReceiptItems', function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise) {
                    $query->whereHas('ledgerReceipt', function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise) {
                        if (!empty($startDate)) {
                            $query->whereDate('receipt_date_at', '>=', $startDate);
                        }

                        if (!empty($endDate)) {
                            $query->whereDate('receipt_date_at', '<=', $endDate);
                        }

                        if ($isLedgerAmountSessionWise == true) {
                            $query->where('academic_year_id', getAcademicYearId());
                        }

                        $query->where('is_cancelled', false);
                    });
                })->orWhereHas('partyPurchases', function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise) {
                    if (!empty($startDate)) {
                        $query->whereDate('purchase_date_at', '>=', $startDate);
                    }

                    if (!empty($endDate)) {
                        $query->whereDate('purchase_date_at', '<=', $endDate);
                    }

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }
                })->orWhereHas('purchases', function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise) {
                    if (!empty($startDate)) {
                        $query->whereDate('purchase_date_at', '>=', $startDate);
                    }

                    if (!empty($endDate)) {
                        $query->whereDate('purchase_date_at', '<=', $endDate);
                    }

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }

                    $query->where('is_cancelled', false);
                })->orWhereHas('saleLedgers', function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise) {
                    if (!empty($startDate)) {
                        $query->whereDate('sale_date_at', '>=', $startDate);
                    }

                    if (!empty($endDate)) {
                        $query->whereDate('sale_date_at', '<=', $endDate);
                    }

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }

                    $query->where('is_cancelled', false);
                })->orWhereHas('saleLedgerReturns', function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise) {
                    if (!empty($startDate)) {
                        $query->whereDate('return_date_at', '>=', $startDate);
                    }

                    if (!empty($endDate)) {
                        $query->whereDate('return_date_at', '<=', $endDate);
                    }

                    if ($isLedgerAmountSessionWise == true) {
                        $query->where('academic_year_id', getAcademicYearId());
                    }

                    $query->where('is_cancelled', false);
                });
            })
            ->with([
                'ledgers' => function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise) {
                    $query->where(function ($query) {
                        $query->whereNull('school_id')
                            ->orWhere('school_id', getUserSchoolId());
                    })->select(
                        'id',
                        'title',
                        'account_group_id',
                        'opening_balance',
                        'amount_type'
                    )->with([
                        'ledgerPayments' => function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise) {
                            if (!empty($startDate)) {
                                $query->whereDate('payment_date_at', '>=', $startDate);
                            }

                            if (!empty($endDate)) {
                                $query->whereDate('payment_date_at', '<=', $endDate);
                            }

                            if ($isLedgerAmountSessionWise == true) {
                                $query->where('academic_year_id', getAcademicYearId());
                            }

                            $query->where('is_cancelled', false);
                        },
                        'ledgerPaymentItems' => function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise) {
                            $query->whereHas('ledgerPayment', function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise) {
                                if (!empty($startDate)) {
                                    $query->whereDate('payment_date_at', '>=', $startDate);
                                }

                                if (!empty($endDate)) {
                                    $query->whereDate('payment_date_at', '<=', $endDate);
                                }

                                if ($isLedgerAmountSessionWise == true) {
                                    $query->where('academic_year_id', getAcademicYearId());
                                }

                                $query->where('is_cancelled', false);
                            });
                        },
                        'ledgerReceipts' => function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise) {
                            if (!empty($startDate)) {
                                $query->whereDate('receipt_date_at', '>=', $startDate);
                            }

                            if (!empty($endDate)) {
                                $query->whereDate('receipt_date_at', '<=', $endDate);
                            }

                            if ($isLedgerAmountSessionWise == true) {
                                $query->where('academic_year_id', getAcademicYearId());
                            }

                            $query->where('is_cancelled', false);
                        },
                        'ledgerReceiptItems' => function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise) {
                            $query->whereHas('ledgerReceipt', function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise) {
                                if (!empty($startDate)) {
                                    $query->whereDate('receipt_date_at', '>=', $startDate);
                                }

                                if (!empty($endDate)) {
                                    $query->whereDate('receipt_date_at', '<=', $endDate);
                                }

                                if ($isLedgerAmountSessionWise == true) {
                                    $query->where('academic_year_id', getAcademicYearId());
                                }

                                $query->where('is_cancelled', false);
                            });
                        },
                        'partyPurchases' => function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise) {
                            if (!empty($startDate)) {
                                $query->whereDate('purchase_date_at', '>=', $startDate);
                            }

                            if (!empty($endDate)) {
                                $query->whereDate('purchase_date_at', '<=', $endDate);
                            }

                            if ($isLedgerAmountSessionWise == true) {
                                $query->where('academic_year_id', getAcademicYearId());
                            }

                            $query->where('is_cancelled', false);
                        },
                        'purchases' => function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise) {
                            if (!empty($startDate)) {
                                $query->whereDate('purchase_date_at', '>=', $startDate);
                            }

                            if (!empty($endDate)) {
                                $query->whereDate('purchase_date_at', '<=', $endDate);
                            }

                            if ($isLedgerAmountSessionWise == true) {
                                $query->where('academic_year_id', getAcademicYearId());
                            }

                            $query->where('is_cancelled', false);
                        },
                        'saleLedgers' => function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise) {
                            if (!empty($startDate)) {
                                $query->whereDate('sale_date_at', '>=', $startDate);
                            }

                            if (!empty($endDate)) {
                                $query->whereDate('sale_date_at', '<=', $endDate);
                            }

                            if ($isLedgerAmountSessionWise == true) {
                                $query->where('academic_year_id', getAcademicYearId());
                            }

                            $query->where('is_cancelled', false);
                        },
                        'saleLedgerReturns' => function ($query) use ($startDate, $endDate, $isLedgerAmountSessionWise) {
                            if (!empty($startDate)) {
                                $query->whereDate('return_date_at', '>=', $startDate);
                            }

                            if (!empty($endDate)) {
                                $query->whereDate('return_date_at', '<=', $endDate);
                            }

                            if ($isLedgerAmountSessionWise == true) {
                                $query->where('academic_year_id', getAcademicYearId());
                            }

                            $query->where('is_cancelled', false);
                        }
                    ]);
                }
            ])
            ->select('id', 'title')
            ->orderBy('title', 'asc')
            ->get();
    }

    public function getDefaultAccountGroupByTitle(string $title, $schoolId = null)
    {
        return AccountGroup::where('status', Status::ACTIVE)
            ->where(function ($query) use ($schoolId) {
                $query->whereNull('school_id')
                    ->orWhere('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId());
            })
            ->where('title', $title)
            ->where('is_system_default', false)
            ->select('id', 'title')
            ->first();
    }
}
