<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Enums\PublishStatus;
use App\Models\StaffExtraDuty;
use App\Models\StaffSalaryPayment;
use App\Models\StaffAbsentDeduction;

class StaffSalaryPaymentRepository implements IRepository, IStaffSalaryPaymentRepository
{
    public function getAll()
    {
        return StaffSalaryPayment::all();
    }

    public function getById($id)
    {
        return StaffSalaryPayment::findOrFail($id);
    }

    public function delete($id)
    {
        return StaffSalaryPayment::destroy($id);
    }

    public function create(array $arrayData)
    {
        return StaffSalaryPayment::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return StaffSalaryPayment::whereId($id)->update($arrayData);
    }

    public function updateMany(array $ids, array $arrayData)
    {
        return StaffSalaryPayment::whereIn('id', $ids)->update($arrayData);
    }

    public function getActiveAll(int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffSalaryPayment::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('is_canceled', false)
            ->select(
                'id',
                'payment_month_id',
                'staff_id',
                'ledger_id',
                'total_earning_amount',
                'total_deduction_amount',
                'payable_amount',
                'paid_amount',
                'due_amount',
                'bonus_amount',
                'advance_amount',
                'advance_deducted_amount',
                'paid_due_amount',
                'payment_date',
                'payment_note',
                'is_published',
                'is_canceled',
                'cancel_reason',
            )
            ->get();
    }

    public function getRegisterAll()
    {
        return StaffSalaryPayment::where('status', Status::ACTIVE);
    }

    public function getStaffSalaryPaymentById(int $id, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffSalaryPayment::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('id', $id)
            ->select(
                'id',
                'payment_month_id',
                'staff_id',
                'ledger_id',
                'total_earning_amount',
                'total_deduction_amount',
                'payable_amount',
                'paid_amount',
                'due_amount',
                'bonus_amount',
                'advance_amount',
                'advance_deducted_amount',
                'paid_due_amount',
                'payment_date',
                'payment_note',
                'is_published',
                'is_canceled',
                'cancel_reason',
                'extra_duty_amount',
                'absent_deduction_amount',
                'total_leave',
                'leave_balance',
                'total_absent',
                'total_extra_duty',
                'total_paid_extra_duty',
                'total_previous_extra_duty',
                'total_deducted_absent',
                'total_previous_absent_deduction'
            )
            ->with([
                'paymentMonth:id,title',
                'staff' => function ($query) {
                    $query->select(
                        'id',
                        'first_name',
                        'middle_name',
                        'last_name',
                        'uan',
                        'pf_account_number',
                        'bank_name',
                        'bank_account_no',
                        'designation_id'
                    )->with([
                        'designation:id,name',
                        'staffLeaveAllocations' => function ($query) {
                            $query->select(
                                'id',
                                'staff_id',
                                'leave_type_id',
                                'days'
                            )->with(['leaveType:id,title,acronym']);
                        }
                    ]);
                },
                'staffSalaryPaymentEarnings' => function ($query) {
                    $query->select(
                        'id',
                        'staff_salary_payment_id',
                        'earning_type_id',
                        'amount'
                    )->with(['earningType:id,title']);
                },
                'staffSalaryPaymentDeductions' => function ($query) {
                    $query->select(
                        'id',
                        'staff_salary_payment_id',
                        'deduction_type_id',
                        'amount'
                    )->with(['deductionType:id,title']);
                },
            ])
            ->first();
    }

    public function getStaffSalaryBankStatementReport(int $paymentMonthId, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffSalaryPayment::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('payment_month_id', $paymentMonthId)
            ->where('is_canceled', false)
            ->select(
                'id',
                'staff_id',
                'paid_amount'
            )
            ->with([
                'staff' => function ($query) {
                    $query->select(
                        'id',
                        'first_name',
                        'middle_name',
                        'last_name',
                        'uan',
                        'bank_account_no',
                        'designation_id',
                        'ifsc',
                        'employee_id'
                    )->with([
                        'designation:id,name'
                    ]);
                }
            ])
            ->get();
    }

    public function getPublishedStaffSalaryPaymentsByPaymentMonthId(int $paymentMonthId, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffSalaryPayment::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('payment_month_id', $paymentMonthId)
            ->where('is_canceled', false)
            ->where('is_published', true)
            ->select(
                'id',
                'payment_month_id',
                'staff_id',
                'ledger_id',
                'total_earning_amount',
                'total_deduction_amount',
                'payable_amount',
                'paid_amount',
                'due_amount',
                'bonus_amount',
                'advance_amount',
                'advance_deducted_amount',
                'paid_due_amount',
                'payment_date',
                'payment_note',
                'is_published',
                'is_canceled',
                'cancel_reason',
                'extra_duty_amount',
                'absent_deduction_amount',
                'total_leave',
                'leave_balance',
                'total_absent',
                'total_extra_duty',
                'total_paid_extra_duty',
                'total_previous_extra_duty',
                'total_deducted_absent',
                'total_previous_absent_deduction'
            )
            ->with([
                'paymentMonth:id,title',
                'staff' => function ($query) {
                    $query->select(
                        'id',
                        'first_name',
                        'middle_name',
                        'last_name',
                        'uan',
                        'pf_account_number',
                        'bank_name',
                        'bank_account_no',
                        'designation_id'
                    )->with([
                        'designation:id,name',
                        'staffLeaveAllocations' => function ($query) {
                            $query->select(
                                'id',
                                'staff_id',
                                'leave_type_id',
                                'days'
                            )->with(['leaveType:id,title,acronym']);
                        }
                    ]);
                },
                'staffSalaryPaymentEarnings' => function ($query) {
                    $query->select(
                        'id',
                        'staff_salary_payment_id',
                        'earning_type_id',
                        'amount'
                    )->with(['earningType:id,title']);
                },
                'staffSalaryPaymentDeductions' => function ($query) {
                    $query->select(
                        'id',
                        'staff_salary_payment_id',
                        'deduction_type_id',
                        'amount'
                    )->with(['deductionType:id,title']);
                },
            ])
            ->get();
    }

    public function getPublishedStaffSalaryPaymentsByStaffId(int $staffId, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffSalaryPayment::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('staff_id', $staffId)
            ->where('is_canceled', false)
            ->where('is_published', true)
            ->select(
                'id',
                'payment_month_id',
                'staff_id',
                'ledger_id',
                'total_earning_amount',
                'total_deduction_amount',
                'payable_amount',
                'paid_amount',
                'due_amount',
                'payment_date'
            )
            ->with([
                'paymentMonth:id,title'
            ])
            ->get();
    }

    public function getFilteredPublishedStaffSalaryPayments(int $ledgerId = null, string $startDate = '', string $endDate = '', bool $isCanceled = false, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffSalaryPayment::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('is_canceled', $isCanceled)
            ->where('is_published', true)
            ->where(function ($query) use ($ledgerId, $startDate, $endDate) {
                if (!empty($ledgerId)) {
                    $query->where('ledger_id', $ledgerId);
                }

                if (!empty($startDate)) {
                    $query->whereDate('payment_date', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $query->whereDate('payment_date', '<=', $endDate);
                }
            })
            ->select(
                'id',
                'payment_month_id',
                'staff_id',
                'ledger_id',
                'paid_amount',
                'payment_date',
                'payment_note',
                'receipt_no'
            )
            ->with([
                'ledger:id,title',
                'paymentMonth:id,title',
                'staff' => function ($query) {
                    $query->select(
                        'id',
                        'first_name',
                        'middle_name',
                        'last_name'
                    );
                },
                'staffSalaryPaymentEarnings' => function ($query) {
                    $query->select(
                        'id',
                        'staff_salary_payment_id',
                        'earning_type_id',
                        'amount'
                    )->with(['earningType:id,title']);
                },
                'staffSalaryPaymentDeductions' => function ($query) {
                    $query->select(
                        'id',
                        'staff_salary_payment_id',
                        'deduction_type_id',
                        'amount'
                    )->with(['deductionType:id,title']);
                },
            ])
            ->get();
    }

    public function getStaffSalaryPaymentsForEpfReport(int $paymentMonthId, array $earningTypeIds, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffSalaryPayment::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('payment_month_id', $paymentMonthId)
            ->where('is_canceled', false)
            ->select(
                'id',
                'staff_id',
            )
            ->with([
                'staff' => function ($query) {
                    $query->select(
                        'id',
                        'first_name',
                        'middle_name',
                        'last_name',
                        'uan',
                        'pf_account_number',
                        'employee_id'
                    );
                },
                'staffSalaryPaymentEarnings' => function ($query) use ($earningTypeIds) {
                    $query->whereIn('earning_type_id', $earningTypeIds)
                        ->select(
                            'id',
                            'staff_salary_payment_id',
                            'earning_type_id',
                            'amount'
                        );
                }
            ])
            ->get();
    }

    public function getStaffSalaryPaymentsForEsiReport(int $paymentMonthId, array $earningTypeIds, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffSalaryPayment::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('payment_month_id', $paymentMonthId)
            ->where('is_canceled', false)
            ->select(
                'id',
                'staff_id',
            )
            ->with([
                'staff' => function ($query) {
                    $query->select(
                        'id',
                        'first_name',
                        'middle_name',
                        'last_name',
                        'uan',
                        'pf_account_number',
                        'employee_id'
                    );
                },
                'staffSalaryPaymentEarnings' => function ($query) use ($earningTypeIds) {
                    $query->whereIn('earning_type_id', $earningTypeIds)
                        ->select(
                            'id',
                            'staff_salary_payment_id',
                            'earning_type_id',
                            'amount'
                        );
                }
            ])
            ->get();
    }

    public function getStaffSalaryPaymentsForEpfWageReport(int $paymentMonthId, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffSalaryPayment::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('payment_month_id', $paymentMonthId)
            ->where('is_canceled', false)
            ->select(
                'id',
                'staff_id',
                'basic_pay',
                'grade_pay'
            )
            ->with([
                'staff' => function ($query) {
                    $query->select(
                        'id',
                        'first_name',
                        'middle_name',
                        'last_name',
                        'uan',
                        'pf_account_number',
                        'employee_id'
                    );
                },
                'staffSalaryPaymentEarnings' => function ($query) {
                    $query->select(
                        'id',
                        'staff_salary_payment_id',
                        'earning_type_id',
                        'amount'
                    );
                }
            ])
            ->get();
    }

    public function getActiveStaffSalaryPaymentsByStaffId(int $staffId, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffSalaryPayment::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('staff_id', $staffId)
            ->where('is_canceled', false)
            ->select(
                'id',
                'payment_month_id',
                'staff_id',
                'ledger_id',
                'total_earning_amount',
                'total_deduction_amount',
                'payable_amount',
                'paid_amount',
                'due_amount',
                'bonus_amount',
                'advance_amount',
                'advance_deducted_amount',
                'paid_due_amount',
                'extra_duty_amount',
                'absent_deduction_amount',
                'payment_date',
                'payment_note',
                'is_published',
                'is_canceled',
                'cancel_reason',
            )
            ->with(['paymentMonth:id,title'])
            ->get();
    }

    public function getStaffSalaryYearlyStatementReport(int $staffId, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffSalaryPayment::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('staff_id', $staffId)
            ->where('is_canceled', false)
            ->whereHas('paymentMonth', function ($query) use ($academicYearId) {
                $query->where('academic_year_id', $academicYearId);
            })
            ->with(['paymentMonth:id,title'])
            ->select(
                'id',
                'payment_month_id',
                'total_earning_amount',
                'total_deduction_amount',
                'paid_amount',
                'due_amount',
                'payment_date'
            )
            ->get();
    }

    public function getUnpublishedStaffSalaryPayments(int $paymentMonthId = null, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffSalaryPayment::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->when(!empty($paymentMonthId), function ($query) use ($paymentMonthId) {
                $query->where('payment_month_id', $paymentMonthId);
            })
            ->where('is_published', false)
            ->select(
                'id',
                'payment_month_id',
                'staff_id',
                'total_earning_amount',
                'total_deduction_amount',
                'paid_amount',
                'extra_duty_amount',
                'absent_deduction_amount',
            )
            ->with([
                'paymentMonth:id,title',
                'staff' => function ($query) {
                    $query->select(
                        'id',
                        'first_name',
                        'middle_name',
                        'last_name',
                        'employee_id',
                        'designation_id',
                        'gender',
                        'birth_date_at',
                        'join_date_at'
                    )->with(['designation:id,name']);
                }
            ])
            ->get();
    }

    public function getStaffSalaryCancelledReport(int $staffId = null, int $paymentMonthId = null, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffSalaryPayment::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->when(!empty($staffId), function ($query) use ($staffId) {
                $query->where('staff_id', $staffId);
            })
            ->when(!empty($paymentMonthId), function ($query) use ($paymentMonthId) {
                $query->where('payment_month_id', $paymentMonthId);
            })
            ->where('is_canceled', true)
            ->with([
                'staff:id,first_name,middle_name,last_name,employee_id,uan',
                'paymentMonth:id,title'
            ])
            ->select(
                'id',
                'staff_id',
                'payment_month_id',
                'total_earning_amount',
                'total_deduction_amount',
                'paid_amount',
                'due_amount',
                'payment_date',
                'cancel_reason'
            )
            ->get();
    }

    public function getNextReceiptNo(int $schoolId =  null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        $journal = StaffSalaryPayment::where('school_id', $schoolId)
            ->orderBy('id', 'desc')
            ->select(
                'receipt_no'
            )
            ->first();

        return ($journal?->receipt_no ?? 0) + 1;
    }

    // staff extra duties
    public function getActiveStaffExtraDutiesByStaffId(int $staffId, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffExtraDuty::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('staff_id', $staffId)
            ->where('is_canceled', false)
            ->select(
                'id',
                'staff_id',
                'staff_salary_payment_id',
                'attendance_date',
                'is_halfday',
                'is_canceled',
            )
            ->get();
    }

    public function insertStaffExtraDuty(array $arrayData)
    {
        return StaffExtraDuty::insert($arrayData);
    }

    // staff absent deductions
    public function getActiveStaffAbsentDeductionsByStaffId(int $staffId, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffAbsentDeduction::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('staff_id', $staffId)
            ->where('is_canceled', false)
            ->select(
                'id',
                'staff_id',
                'staff_salary_payment_id',
                'payment_month_id',
                'attendance_date',
                'day_type',
                'deduction_message',
                'is_canceled',
            )
            ->get();
    }

    public function insertStaffAbsentDeduction(array $arrayData)
    {
        return StaffAbsentDeduction::insert($arrayData);
    }

    public function getFilteredStaffSalaryPayments(array $paymentMonthIds = [], string $status = '', string $staffType = '', int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        $statusMap = [
            PublishStatus::PUBLISHED->value => true,
            PublishStatus::NOT_PUBLISHED->value => false,
        ];

        return StaffSalaryPayment::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('is_canceled', false)
            ->where(function ($query) use ($paymentMonthIds, $statusMap, $status, $staffType) {
                if (!empty($paymentMonthIds)) {
                    $query->whereIn('payment_month_id', $paymentMonthIds);
                }

                if (isset($statusMap[$status])) {
                    $isPublished = $statusMap[$status];

                    $query->where('is_published', $isPublished);
                }

                if (!empty($staffType)) {
                    $query->whereHas('staff', function ($query) use ($staffType) {
                        $query->where('staff_type', $staffType);
                    });
                }
            })
            ->select(
                'id',
                'payment_month_id',
                'staff_id',
                'ledger_id',
                'paid_amount',
                'payment_date',
                'payment_note',
                'receipt_no',
                'total_deducted_absent'
            )
            ->with([
                'paymentMonth:id,title',
                'staff' => function ($query) {
                    $query->select(
                        'id',
                        'first_name',
                        'middle_name',
                        'last_name',
                        'employee_id',
                        'uan'
                    )->with([
                        'payScale:pay_scales.id,pay_scales.title'
                    ]);
                },
                'staffSalaryPaymentEarnings' => function ($query) {
                    $query->select(
                        'id',
                        'staff_salary_payment_id',
                        'earning_type_id',
                        'amount'
                    )->with(['earningType:id,title']);
                },
                'staffSalaryPaymentDeductions' => function ($query) {
                    $query->select(
                        'id',
                        'staff_salary_payment_id',
                        'deduction_type_id',
                        'amount'
                    )->with(['deductionType:id,title']);
                },
            ])
            ->get();
    }
}
