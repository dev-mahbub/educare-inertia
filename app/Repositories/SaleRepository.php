<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\SaleLedger;
use App\Models\SiteSetting;
use App\Models\SaleLedgerReturn;
use App\Models\SaleLedgerPayment;
use App\Models\SaleLedgerProduct;
use App\Models\SaleLedgerProductReturn;

class SaleRepository implements IRepository, ISaleRepository
{
    public function getAll()
    {
        return SaleLedger::all()->latest()->get();
    }

    public function getById($id)
    {
        return SaleLedger::findOrFail($id);
    }

    public function delete($id)
    {
        SaleLedger::destroy($id);
    }

    public function create(array $arrayData)
    {
        return SaleLedger::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return SaleLedger::whereId($id)
            ->update($arrayData);
    }

    public function getActiveAll()
    {
        return SaleLedger::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return SaleLedger::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getActiveNameAndId()
    {
        return SaleLedger::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'title')
            ->latest()
            ->get();
    }

    public function getActiveAllForReport($search, $startDate, $endDate, $ledgerId)
    {
        $query = SaleLedger::query();

        $query->where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('is_cancelled', false)
            ->with([
                'saleLedgerProducts' => function ($query) {
                    $query->with(['product:id,title'])
                        ->select(
                            'id',
                            'sale_ledger_id',
                            'product_id',
                            'quantity',
                            'rate',
                            'discount_amount',
                            'tax_amount',
                            'total_amount'
                        );
                },
                'staff:id,first_name,middle_name,last_name',
                'student' => function ($query) {
                    $query->with([
                        'father:id,phone,guardian_type,student_id'
                    ])->select(
                        'id',
                        'first_name',
                        'middle_name',
                        'last_name'
                    );
                },
                'createdBy:id,first_name,middle_name,last_name',
                'bankLedger:id,title',
                'ledger:id,title'
            ]);

        $query->where(function ($q) use ($search) {
            if (!empty($search)) {
                $q->orWhere('sale_ledgers.sub_total', 'like', '%' . $search . '%');
                $q->orWhere('sale_ledgers.total_discount', 'like', '%' . $search . '%');
                $q->orWhere('sale_ledgers.total_tax', 'like', '%' . $search . '%');
                $q->orWhere('sale_ledgers.total', 'like', '%' . $search . '%');
            }
        });

        if (!empty($startDate)) {
            $query->where('sale_ledgers.sale_date_at', '>=', $startDate);
        }

        if (!empty($endDate)) {
            $query->whereDate('sale_ledgers.sale_date_at', '<=', $endDate);
        }

        if (!empty($ledgerId)) {
            $query->where('sale_ledgers.ledger_id', $ledgerId);
        }

        $query->select(
            'id',
            'ledger_id',
            'staff_id',
            'student_id',
            'sale_date_at',
            'sub_total',
            'total_discount',
            'total_tax',
            'total',
            'paid_amount',
            'previous_paid_amount',
            'due_amount',
            'sale_type_for',
            'transaction_no',
            'invoice_no',
            'bank_ledger_id',
            'created_by'
        );

        return $query->latest()->get();
    }

    public function getPendingSale($teacherStudentType, $classroomId, $studentId, $staffId)
    {
        $query = SaleLedger::query();

        $query->where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('sale_type_for', '=', $teacherStudentType)
            ->where('paid_type', '=', 'Unpaid')
            ->where('is_cancelled', false)
            ->with(['saleLedgerProducts.product:id,title'])
            ->select(
                'id',
                'sale_date_at',
                'total',
                'paid_amount',
                'due_amount',
                'receipt_no'
            );

        $query->where(function ($q) use ($teacherStudentType, $classroomId, $studentId, $staffId) {
            if (!empty($classroomId) && $teacherStudentType == 'Student') {
                $q->where('classroom_id', '=', $classroomId);
            }

            if (!empty($studentId) && $teacherStudentType == 'Student') {
                $q->where('student_id', '=', $studentId);
            }

            if (!empty($staffId) && $teacherStudentType == 'Teacher') {
                $q->where('staff_id', '=', $staffId);
            }
        });

        return $query->latest()->get();
    }

    public function getPaidSale($teacherStudentType, $classroomId, $studentId, $staffId)
    {
        $query = SaleLedger::query();

        $query->where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('sale_type_for', '=', $teacherStudentType)
            ->where('paid_type', '=', 'Paid')
            ->where('is_cancelled', false)
            ->with(['saleLedgerProducts.product:id,title'])
            ->select(
                'id',
                'sale_date_at',
                'total',
                'paid_amount',
                'due_amount',
                'receipt_no'
            );

        $query->where(function ($q) use ($teacherStudentType, $classroomId, $studentId, $staffId) {
            if (!empty($classroomId) && $teacherStudentType == 'Student') {
                $q->where('classroom_id', '=', $classroomId);
            }

            if (!empty($studentId) && $teacherStudentType == 'Student') {
                $q->where('student_id', '=', $studentId);
            }

            if (!empty($staffId) && $teacherStudentType == 'Teacher') {
                $q->where('staff_id', '=', $staffId);
            }
        });

        return $query->latest()->get();
    }

    public function getDueReportForStudent($search)
    {
        $query = SaleLedger::query();
        $query->where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('sale_type_for', '=', 'Student')
            ->where('paid_type', '=', 'Unpaid')
            ->where('is_cancelled', false)
            ->with([
                'student' => function ($query) {
                    $query->with([
                        'father:id,student_id,phone,guardian_type'
                    ])->select(
                        'id',
                        'admission_no',
                        'first_name',
                        'middle_name',
                        'last_name'
                    );
                },
                'classroom:id,title',
            ])
            ->select(
                'id',
                'admission_no',
                'father_phone',
                'total',
                'due_amount',
                'student_id',
                'classroom_id',
                'sale_type_for'
            );

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->whereHas('student', function ($sq) use ($search) {
                    $sq->where('first_name', 'like', '%' . $search . '%')
                        ->orWhere('middle_name', 'like', '%' . $search . '%')
                        ->orWhere('last_name', 'like', '%' . $search . '%');
                })->orWhereHas('classroom', function ($cq) use ($search) {
                    $cq->where('title', 'like', '%' . $search . '%');
                })
                    ->orWhere('admission_no', 'like', '%' . $search . '%')
                    ->orWhere('total', 'like', '%' . $search . '%')
                    ->orWhere('father_phone', 'like', '%' . $search . '%');
            });
        }

        return $query->latest()->get();
    }

    public function getPaidReportForStudent($search)
    {
        $query = SaleLedger::query();
        $query->where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('sale_type_for', '=', 'Student')
            ->where('paid_type', '=', 'Paid')
            ->where('is_cancelled', false)
            ->with([
                'student' => function ($query) {
                    $query->with([
                        'father:id,student_id,phone,guardian_type'
                    ])->select(
                        'id',
                        'admission_no',
                        'first_name',
                        'middle_name',
                        'last_name'
                    );
                },
                'classroom:id,title',
            ])
            ->select(
                'id',
                'admission_no',
                'father_phone',
                'total',
                'paid_amount',
                'student_id',
                'classroom_id',
                'sale_type_for'
            );

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->whereHas('student', function ($sq) use ($search) {
                    $sq->where('first_name', 'like', '%' . $search . '%')
                        ->orWhere('middle_name', 'like', '%' . $search . '%')
                        ->orWhere('last_name', 'like', '%' . $search . '%');
                })->orWhereHas('classroom', function ($cq) use ($search) {
                    $cq->where('title', 'like', '%' . $search . '%');
                })
                    ->orWhere('admission_no', 'like', '%' . $search . '%')
                    ->orWhere('total', 'like', '%' . $search . '%')
                    ->orWhere('father_phone', 'like', '%' . $search . '%');
            });
        }

        return $query->latest()->get();
    }

    // ledger
    public function crateSaleLedger(array $arrayData)
    {
        return SaleLedger::create($arrayData);
    }

    public function getSaleStudentNames()
    {
        return SaleLedger::where('sale_ledgers.school_id', getUserSchoolId())
            ->where('sale_ledgers.status', Status::ACTIVE)
            ->where('sale_ledgers.sale_type_for', '=', 'Student')
            ->join('students', 'sale_ledgers.student_id', '=', 'students.id')
            ->select(
                // student
                'sale_ledgers.classroom_id as classroom_id',
                'students.id as student_id',
                'students.first_name as student_first_name',
                'students.middle_name as student_middle_name',
                'students.last_name as student_last_name',
                'students.admission_no as admission_no',
            )
            ->distinct()
            ->get();
    }

    public function getSaleTeacherNames()
    {
        return SaleLedger::where('sale_ledgers.school_id', getUserSchoolId())
            ->where('sale_ledgers.status', Status::ACTIVE)
            ->where('sale_ledgers.sale_type_for', '=', 'Teacher')
            ->join('staff', 'sale_ledgers.staff_id', '=', 'staff.id')
            ->select(
                // teacher
                'staff.id as staff_id',
                'staff.first_name as staff_first_name',
                'staff.middle_name as staff_middle_name',
                'staff.last_name as staff_last_name',
                'sale_ledgers.phone as staff_phone',
            )
            ->distinct()
            ->get();
    }

    public function getSaleClassroom()
    {
        return SaleLedger::where('sale_ledgers.school_id', getUserSchoolId())
            ->where('sale_ledgers.status', Status::ACTIVE)
            ->where('sale_ledgers.sale_type_for', '=', 'Student')
            ->join('classrooms', 'sale_ledgers.classroom_id', '=', 'classrooms.id')
            ->select(
                // classrooms
                'classrooms.id as classroom_id',
                'classrooms.title as classroom_title',
            )
            ->distinct()
            ->get();
    }

    public function getActiveAllLedgerSummery(int $productId = null, string $partyType = '')
    {
        $query = SaleLedger::query();
        $query->where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('is_cancelled', false)
            ->where(function ($query) use ($partyType) {
                if ($partyType) {
                    $query->where('sale_type_for', '=', $partyType);
                }
            })
            ->whereHas('saleLedgerProducts', function ($query) use ($productId) {
                if ($productId) {
                    $query->where('product_id', '=', $productId);
                }
            })
            ->with([
                'student' => function ($query) {
                    $query->with([
                        'father:id,first_name,middle_name,last_name,student_id,phone'
                    ])->select(
                        'id',
                        'first_name',
                        'middle_name',
                        'last_name',
                        'admission_no'
                    );
                },
                'staff' => function ($query) {
                    $query->with([
                        'designation:id,name'
                    ])->select(
                        'id',
                        'first_name',
                        'middle_name',
                        'last_name',
                        'phone',
                        'designation_id'
                    );
                },
                'classroom:id,title',
                'saleLedgerProducts' => function ($query) use ($productId) {
                    if ($productId) {
                        $query->where('product_id', '=', $productId);
                    }

                    $query->select(
                        'id',
                        'sale_ledger_id',
                        'quantity',
                        'rate',
                        'discount_amount',
                        'tax_amount',
                        'total_amount'
                    );
                }
            ])
            ->select(
                'id',
                'student_id',
                'staff_id',
                'classroom_id',
                'sale_date_at'
            );

        // if (!empty($productId)) {
        //     $query->where('product_id', '=', $productId);
        // }

        // $query->whereHas('saleLedger', function ($q) use ($startDate, $endDate) {
        //     if (!empty($startDate)) {
        //         $q->where('sale_date_at', '>=', $startDate);
        //     }
        //     if (!empty($endDate)) {
        //         $q->whereDate('sale_date_at', '<=', $endDate);
        //     }
        // });

        return $query->latest()->get();
    }

    public function getActiveSaleLedgerById(int $id)
    {
        return SaleLedger::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('is_cancelled', false)
            ->where('id', $id)
            ->select(
                'id',
                'student_id',
                'classroom_id',
                'staff_id',
                'ledger_id',
                'sale_date_at',
                'total',
                'paid_type',
                'payment_type',
                'is_cancelled',
                'cancel_reason',
                'created_by',
                'invoice_no',
                'receipt_no',
                'bank_ledger_id',
                'sale_type_for',
                'description',
                'paid_amount'
            )
            ->first();
    }

    public function getSaleLedgerByInvoiceNo(int $invoiceNo, string $saleTypeFor = "")
    {
        return SaleLedger::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('invoice_no', $invoiceNo)
            ->when(!empty($saleTypeFor), function ($query) use ($saleTypeFor) {
                $query->where('sale_type_for', $saleTypeFor);
            })
            ->select(
                'id',
                'student_id',
                'classroom_id',
                'staff_id',
                'ledger_id',
                'sale_date_at',
                'total',
                'paid_type',
                'payment_type',
                'is_cancelled',
                'cancel_reason',
                'created_by',
                'invoice_no',
                'receipt_no',
                'bank_ledger_id',
                'sale_type_for',
                'description'
            )
            ->with(['saleLedgerProducts'])
            ->first();
    }

    public function getSaleLedgerNextInvoiceNo()
    {
        $saleLedger = SaleLedger::where('school_id', getUserSchoolId())
            ->select('id', 'invoice_no')
            ->orderBy('id', 'desc')
            ->first();

        return ($saleLedger->invoice_no ?? 0) + 1;
    }

    public function getSaleLedgerNextReceiptNo(int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        $receiptNumberSetting = getSiteSettingData('voucher_is_enable_sale');
        $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";

        if ($receiptNumberEnabaled) {
            $saleLedgerReceiptSeed = SiteSetting::where('status', Status::ACTIVE)
                ->where('school_id', $schoolId)
                ->where('academic_year_id', $academicYearId)
                ->where('type', 'Voucher')
                ->where('key_name', 'voucher_sale_voucher_receipt_seed_no')
                ->first();

            if ($saleLedgerReceiptSeed != null) {
                $nextReceiptNo = ($saleLedgerReceiptSeed?->value ?? 0) + 1;
            } else {
                $saleLedgerReceiptSeed = setSiteSettingData('Voucher', 'voucher_sale_voucher_receipt_seed_no', 1);
                $nextReceiptNo = $saleLedgerReceiptSeed?->value ?? 1;
            }
        } else {
            $saleLedger = SaleLedger::where('school_id', $schoolId)
                ->select('id', 'receipt_no')
                ->orderBy('id', 'desc')
                ->first();

            $saleLedgerPayment = SaleLedgerPayment::where('school_id', $schoolId)
                ->select('id', 'receipt_no')
                ->orderBy('id', 'desc')
                ->first();

            $saleLegderReceiptNo = ($saleLedger->receipt_no ?? 0) + 1;
            $saleLegderPaymentReceiptNo = ($saleLedgerPayment->receipt_no ?? 0) + 1;

            $nextReceiptNo = $saleLegderReceiptNo > $saleLegderPaymentReceiptNo ? $saleLegderReceiptNo : $saleLegderPaymentReceiptNo;
        }

        return $nextReceiptNo;
    }

    public function getFilteredLedgerSales(string $startDate = '', string $endDate = '', $schoolId = null)
    {
        return SaleLedger::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('is_cancelled', false)
            ->where(function ($q) use ($startDate, $endDate) {
                if (!empty($startDate)) {
                    $q->whereDate('sale_date_at', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $q->whereDate('sale_date_at', '<=', $endDate);
                }
            })
            ->with([
                'student:id,first_name,middle_name,last_name',
                'staff:id,first_name,middle_name,last_name'
            ])
            ->select(
                'id',
                'student_id',
                'staff_id',
                'sale_date_at',
                'receipt_no',
                'sale_type_for',
                'description',
                'total'
            )
            ->get();
    }

    public function getActiveAllForSaleSummary()
    {
        return SaleLedger::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('is_cancelled', false)
            ->with([
                'saleLedgerProducts:id,sale_ledger_id,product_id,total_amount,rate,quantity,tax_amount,discount_amount',
                'saleLedgerProducts.product:id,title',
                // 'bankLedger:id,title',
                // 'ledger:id,title',
                'student:id,first_name,middle_name,last_name',
                'staff:id,first_name,middle_name,last_name'
            ])
            ->select(
                'id',
                'bank_ledger_id',
                'ledger_id',
                'total',
                'sale_date_at',
                'staff_id',
                'student_id',
                'sale_type_for'
            )
            ->orderBy('sale_date_at', 'asc')
            ->get();
    }

    public function getConsolidatedSaleReport(string $startDate = '', string $endDate = '')
    {
        return SaleLedger::where('sale_ledgers.status', Status::ACTIVE)
            ->where('sale_ledgers.school_id', getUserSchoolId())
            ->where('sale_ledgers.is_cancelled', false)
            ->where('sale_ledgers.sale_type_for', 'Student')
            ->where(function ($query) use ($startDate, $endDate) {
                if (!empty($startDate)) {
                    $query->whereDate('sale_ledgers.sale_date_at', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $query->whereDate('sale_ledgers.sale_date_at', '<=', $endDate);
                }
            })
            ->leftJoin('sale_ledger_returns', function ($join) {
                $join->on('sale_ledger_returns.sale_invoice_no', '=', 'sale_ledgers.invoice_no')
                    ->where('sale_ledger_returns.is_cancelled', false);
            })
            ->with([
                'bankLedger:id,title',
                'student:id,first_name,middle_name,last_name,admission_no',
                'classroom:id,title'
            ])
            ->select(
                'sale_ledgers.id',
                'sale_ledgers.bank_ledger_id',
                'sale_ledgers.classroom_id',
                'sale_ledgers.total',
                'sale_ledgers.sale_date_at',
                'sale_ledgers.student_id',
                'sale_ledgers.sale_type_for',
                'sale_ledgers.invoice_no',
                'sale_ledger_returns.total as sale_return_amount'
            )
            ->orderBy('sale_date_at', 'desc')
            ->get();
    }

    public function getStudentSaleLedgers(int $studentId, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return SaleLedger::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('is_cancelled', false)
            ->where('sale_type_for', 'Student')
            ->where('student_id', $studentId)
            ->with([
                'saleLedgerProducts' => function ($query) {
                    $query->with(['product:id,title'])
                        ->select(
                            'id',
                            'product_id',
                            'sale_ledger_id',
                            'rate',
                            'quantity',
                            'tax_amount',
                            'discount_amount',
                            'total_amount'
                        );
                }
            ])
            ->select(
                'id',
                'total',
                'paid_amount',
                'due_amount',
                'sale_date_at',
                'paid_type',
                'invoice_no'
            )
            ->orderBy('sale_date_at', 'asc')
            ->get();
    }

    public function getTeacherSaleLedgers(int $staffId, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return SaleLedger::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('is_cancelled', false)
            ->where('sale_type_for', 'Teacher')
            ->where('staff_id', $staffId)
            ->with([
                'saleLedgerProducts' => function ($query) {
                    $query->with(['product:id,title'])
                        ->select(
                            'id',
                            'product_id',
                            'sale_ledger_id',
                            'rate',
                            'quantity',
                            'tax_amount',
                            'discount_amount',
                            'total_amount'
                        );
                }
            ])
            ->select(
                'id',
                'total',
                'paid_amount',
                'due_amount',
                'sale_date_at',
                'paid_type',
                'invoice_no'
            )
            ->orderBy('sale_date_at', 'asc')
            ->get();
    }

    public function saleLedgerExists(int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return SaleLedger::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('is_cancelled', false)
            ->exists();
    }

    // sale return
    public function crateSaleLedgerReturn(array $arrayData)
    {
        return SaleLedgerReturn::create($arrayData);
    }

    public function getActiveAllConsolidatedSale()
    {
        $query = SaleLedgerReturn::query();
        $query->where('sale_ledger_returns.school_id', getUserSchoolId())
            ->where('sale_ledger_returns.status', Status::ACTIVE)
            ->where('sale_ledger_returns.return_type_for', '=', 'Student')
            ->join('sale_ledgers', 'sale_ledger_returns.student_id', '=', 'sale_ledgers.student_id')
            ->with([
                'student:id,first_name,middle_name,last_name',
                'classroom:id,title',
            ])
            ->select(
                'sale_ledger_returns.*',
                'sale_ledgers.total as sale_amount'
            );

        // if (!empty($productId)) {
        //     $query->where('product_id', '=', $productId);
        // }

        // $query->whereHas('saleLedger', function ($q) use ($startDate, $endDate) {
        //     if (!empty($startDate)) {
        //         $q->where('sale_date_at', '>=', $startDate);
        //     }
        //     if (!empty($endDate)) {
        //         $q->whereDate('sale_date_at', '<=', $endDate);
        //     }
        // });

        return $query->latest()->distinct()->get();
    }

    public function getNextReceiptNo()
    {
        $lastReceipt = SaleLedgerReturn::where('school_id', getUserSchoolId())
            ->select('id', 'receipt_no')
            ->orderBy('id', 'DESC')
            ->first();
        if (!empty($lastReceipt->receipt_no)) {
            $lastNo = $lastReceipt->id + 1;
            return $lastNo;
        }
        return 1;
    }

    // product
    public function getActiveAllBySaleLedgerId($id)
    {
        return SaleLedgerProduct::where('sale_ledger_id', $id)
            ->latest()
            ->get();
    }

    public function createSaleLedgerProduct(array $arrayData)
    {
        return SaleLedgerProduct::create($arrayData);
    }

    public function getActiveAllTransactionSale($productId, $startDate, $endDate)
    {
        $query = SaleLedgerProduct::query();
        $query->where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->with([
                // 'product:id,title',
                'saleLedger' => function ($query) {
                    $query->with([
                        'staff:id,first_name,middle_name,last_name',
                        'student:id,first_name,middle_name,last_name',
                    ])->select(
                        'id',
                        'sale_date_at',
                        'sale_type_for',
                        'student_id',
                        'staff_id'
                    );
                }
            ]);

        if (!empty($productId)) {
            $query->where('product_id', '=', $productId);
        }

        $query->whereHas('saleLedger', function ($q) use ($startDate, $endDate) {
            if (!empty($startDate)) {
                $q->where('sale_date_at', '>=', $startDate);
            }
            if (!empty($endDate)) {
                $q->whereDate('sale_date_at', '<=', $endDate);
            }

            $q->where('is_cancelled', false);
        });

        return $query->latest()->get();
    }

    public function getActiveAllPendingSale($teacherStudentType, $classroomId, $studentId, $staffId)
    {
        $query = SaleLedgerProduct::query();
        $query->where('sale_ledgers.school_id', getUserSchoolId())
            ->where('sale_ledgers.status', Status::ACTIVE)
            ->join('sale_ledgers', 'sale_ledger_products.sale_ledger_id', '=', 'sale_ledgers.id')
            ->where('sale_ledgers.sale_type_for', '=', $teacherStudentType)
            ->where('sale_ledgers.paid_type', '=', 'Unpaid')
            ->with(['product:id,title', 'saleLedger:id,sale_date_at']);
        $query->whereHas('saleLedger', function ($q) use ($teacherStudentType, $classroomId, $studentId, $staffId) {
            $q->where('is_cancelled', false);

            if (!empty($classroomId) && $teacherStudentType == 'Student') {
                $q->where('classroom_id', '=', $classroomId);
            }

            if (!empty($studentId) && $teacherStudentType == 'Student') {
                $q->where('student_id', '=', $studentId);
            }

            if (!empty($staffId) && $teacherStudentType == 'Teacher') {
                $q->where('staff_id', '=', $staffId);
            }
        });

        return $query->latest('sale_ledgers.created_at')->get();
    }

    public function getActiveAllPaidSale($teacherStudentType, $classroomId, $studentId, $staffId)
    {
        $query = SaleLedgerProduct::query();
        $query->where('sale_ledgers.school_id', getUserSchoolId())
            ->where('sale_ledgers.status', Status::ACTIVE)
            ->join('sale_ledgers', 'sale_ledger_products.sale_ledger_id', '=', 'sale_ledgers.id')
            ->where('sale_ledgers.sale_type_for', '=', $teacherStudentType)
            ->where('sale_ledgers.paid_type', '=', 'Paid')
            ->with(['product:id,title', 'saleLedger:id,sale_date_at']);
        $query->whereHas('saleLedger', function ($q) use ($teacherStudentType, $classroomId, $studentId, $staffId) {
            $q->where('is_cancelled', false);

            if (!empty($classroomId) && $teacherStudentType == 'Student') {
                $q->where('classroom_id', '=', $classroomId);
            }

            if (!empty($studentId) && $teacherStudentType == 'Student') {
                $q->where('student_id', '=', $studentId);
            }

            if (!empty($staffId) && $teacherStudentType == 'Teacher') {
                $q->where('staff_id', '=', $staffId);
            }
        });

        return $query->latest('sale_ledgers.created_at')->get();
    }


    // sale return
    public function getActiveAllForReturnReport($search, $startDate, $endDate)
    {
        $query = SaleLedgerReturn::query();

        $query->where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('is_cancelled', false)
            ->with([
                'saleLedgerReturnProducts.product:id,title',
                'student:id,first_name,middle_name,last_name',
                'staff:id,first_name,middle_name,last_name'
            ]);

        $query->where(function ($q) use ($search, $startDate, $endDate) {
            if (!empty($search)) {
                $q->orWhere('sale_ledger_returns.sub_total', 'like', '%' . $search . '%');
                $q->orWhere('sale_ledger_returns.total_discount', 'like', '%' . $search . '%');
                $q->orWhere('sale_ledger_returns.total_tax', 'like', '%' . $search . '%');
                $q->orWhere('sale_ledger_returns.total', 'like', '%' . $search . '%');
                $q->orWhere('sale_ledger_returns.receipt_no', 'like', '%' . $search . '%');
                $q->orWhere('sale_ledger_returns.sale_invoice_no', 'like', '%' . $search . '%');
            }

            if (!empty($startDate)) {
                $q->whereDate('sale_ledger_returns.return_date_at', '>=', $startDate);
            }

            if (!empty($endDate)) {
                $q->whereDate('sale_ledger_returns.return_date_at', '<=', $endDate);
            }
        });

        return $query->orderBy('receipt_no', 'asc')->get();
    }

    public function updateSaleLedgerReturn(int $id, array $arrayData)
    {
        return SaleLedgerReturn::where('id', $id)->update($arrayData);
    }

    public function getSaleLedgerReturnById(int $id)
    {
        return SaleLedgerReturn::where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->first();
    }

    public function getFilteredSaleReturns(string $startDate = '', string $endDate = '', $schoolId = null)
    {
        return SaleLedgerReturn::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('is_cancelled', false)
            ->where(function ($q) use ($startDate, $endDate) {
                if (!empty($startDate)) {
                    $q->whereDate('return_date_at', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $q->whereDate('return_date_at', '<=', $endDate);
                }
            })
            ->with([
                'student:id,first_name,middle_name,last_name',
                'staff:id,first_name,middle_name,last_name'
            ])
            ->select(
                'id',
                'student_id',
                'staff_id',
                'return_date_at',
                'receipt_no',
                'return_type_for',
                'description',
                'total'
            )
            ->get();
    }

    // sale return product
    public function createSaleLedgerReturnProduct(array $arrayData)
    {
        return SaleLedgerProductReturn::create($arrayData);
    }

    // sale ledger payment
    public function createSaleLedgerPayment(array $arrayData)
    {
        return SaleLedgerPayment::create($arrayData);
    }

    public function updateSaleLedgerPayment(int $id, array $arrayData)
    {
        return SaleLedgerPayment::where('id', $id)->update($arrayData);
    }

    public function getLastSaleLedgerPaymentId(int $saleLedgerId = null, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return SaleLedgerPayment::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('created_by', auth()->user()->id)
            ->when(!empty($saleLedgerId), function ($query) use ($saleLedgerId) {
                $query->where('sale_Ledger_id', $saleLedgerId);
            })
            ->latest('id')
            ->select('id')
            ->first();
    }

    public function getActiveSaleLedgerPaymentById(int $id)
    {
        return SaleLedgerPayment::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('id', $id)
            // ->where('is_cancelled', false)
            ->with([
                'bankLedger:id,title',
                'createdBy:id,first_name,middle_name,last_name',
                'saleLedger' => function ($query) {
                    $query->with([
                        'saleLedgerProducts' => function ($query) {
                            $query->with(['product:id,title,product_code,product_size'])
                                ->select(
                                    'id',
                                    'sale_ledger_id',
                                    'product_id',
                                    'quantity',
                                    'rate',
                                    'discount_amount',
                                    'tax_amount',
                                    'total_amount',
                                );
                        },
                        'classroom:id,title',
                        'staff:id,first_name,middle_name,last_name,phone,address',
                        'student' => function ($query) {
                            $query->with([
                                'father:id,student_id,first_name,middle_name,last_name,guardian_type'
                            ])->select(
                                'id',
                                'admission_no',
                                'first_name',
                                'middle_name',
                                'last_name'
                            );
                        }
                    ])->select(
                        'id',
                        'student_id',
                        'classroom_id',
                        'staff_id',
                        'total',
                        'invoice_no',
                        'receipt_no',
                        'sale_type_for',
                        'paid_amount',
                        'due_amount',
                    );
                }
            ])
            ->select(
                'id',
                'sale_ledger_id',
                'payment_date',
                'transaction_date',
                'created_by',
                'receipt_no',
                'bank_ledger_id',
                'paid_amount',
                'created_at',
                'description'
            )
            ->first();
    }

    public function getActiveSaleLedgerPayments($search, $ledgerId, $startDate, $endDate, $schoolId = null)
    {
        return SaleLedgerPayment::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('is_cancelled', false)
            ->where(function ($query) use ($ledgerId, $startDate, $endDate) {
                if (!empty($ledgerId)) {
                    $query->where('bank_ledger_id', $ledgerId);
                }

                if (!empty($startDate)) {
                    $query->whereDate('payment_date', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $query->whereDate('payment_date', '<=', $endDate);
                }
            })
            ->where(function ($query) use ($search) {
                if (!empty($search)) {
                    $query->where('receipt_no', '%' . $search . '%');
                }
            })
            ->with([
                'bankLedger:id,title',
                'saleLedger' => function ($query) {
                    $query->with([
                        'staff' => function ($query) {
                            $query->select(
                                'id',
                                'first_name',
                                'middle_name',
                                'last_name',
                                'phone',
                                'address'
                            )->with(['ledger']);
                        },
                        'student' => function ($query) {
                            $query->select(
                                'id',
                                'admission_no',
                                'first_name',
                                'middle_name',
                                'last_name'
                            )->with(['ledger']);
                        }
                    ])->select(
                        'id',
                        'student_id',
                        'staff_id',
                        'sale_type_for'
                    );
                }
            ])
            ->select(
                'id',
                'sale_ledger_id',
                'payment_date',
                'transaction_date',
                'transaction_no',
                'transaction_details',
                'receipt_no',
                'bank_ledger_id',
                'paid_amount',
                'created_at',
                'description'
            )
            ->get();
    }

    public function getCanceledSaleLedgerPayments(string $startDate = '', string $endDate = '', int $schoolId = null)
    {
        return SaleLedgerPayment::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('is_cancelled', true)
            ->where(function ($query) use ($startDate, $endDate) {
                if (!empty($startDate)) {
                    $query->whereDate('payment_date', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $query->whereDate('payment_date', '<=', $endDate);
                }
            })
            ->with([
                'bankLedger:id,title',
                'saleLedger' => function ($query) {
                    $query->with([
                        'staff' => function ($query) {
                            $query->select(
                                'id',
                                'first_name',
                                'middle_name',
                                'last_name',
                                'phone',
                                'address'
                            )->with(['ledger']);
                        },
                        'student' => function ($query) {
                            $query->select(
                                'id',
                                'admission_no',
                                'first_name',
                                'middle_name',
                                'last_name'
                            )->with(['ledger']);
                        }
                    ])->select(
                        'id',
                        'student_id',
                        'staff_id',
                        'sale_type_for'
                    );
                }
            ])
            ->select(
                'id',
                'sale_ledger_id',
                'payment_date',
                'transaction_date',
                'transaction_no',
                'transaction_details',
                'receipt_no',
                'bank_ledger_id',
                'paid_amount',
                'created_at',
                'description'
            )
            ->get();
    }
}
