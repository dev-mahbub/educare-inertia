<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\StaffAdvancePayment;

class StaffAdvancePaymentRepository implements IRepository, IStaffAdvancePaymentRepository
{
    public function getAll()
    {
        return StaffAdvancePayment::all();
    }

    public function getById($id)
    {
        return StaffAdvancePayment::findOrFail($id);
    }

    public function delete($id)
    {
        StaffAdvancePayment::destroy($id);
    }

    public function create(array $arrayData)
    {
        return StaffAdvancePayment::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return StaffAdvancePayment::whereId($id)->update($arrayData);
    }

    public function getActiveAll(int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffAdvancePayment::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('is_canceled', false)
            ->select(
                'id',
                'staff_id',
                'staff_salary_payment_id',
                'payment_month_id',
                'ledger_id',
                'paid_amount',
                'deducted_amount',
                'payment_date',
                'payment_note',
                'cheque_no',
                'cheque_date',
                'bank_id',
                'branch',
                'by_salary',
                'is_canceled',
                'cancel_reason',
            )
            ->with(['paymentMonth:id,title'])
            ->get();
    }

    public function getRegisterAll()
    {
        return StaffAdvancePayment::where('status', Status::ACTIVE);
    }

    public function getActiveStaffAdvancePaymentsByStaffId(int $staffId, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffAdvancePayment::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('is_canceled', false)
            ->where('staff_id', $staffId)
            ->select(
                'id',
                'staff_id',
                'staff_salary_payment_id',
                'payment_month_id',
                'ledger_id',
                'paid_amount',
                'deducted_amount',
                'payment_date',
                'payment_note',
                'cheque_no',
                'cheque_date',
                'bank_id',
                'branch',
                'by_salary',
                'is_canceled',
                'cancel_reason',
            )
            ->with(['paymentMonth:id,title'])
            ->get();
    }

    public function getActiveStaffAdvancePayments(int $staffId = null, int $paymentMonthId = null, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffAdvancePayment::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('is_canceled', false)
            ->when(!empty($staffId), function ($query) use ($staffId) {
                $query->where('staff_id', $staffId);
            })
            ->when(!empty($paymentMonthId), function ($query) use ($paymentMonthId) {
                $query->where('payment_month_id', $paymentMonthId);
            })
            ->select(
                'id',
                'staff_id',
                'payment_month_id',
                'paid_amount',
                'deducted_amount',
                'payment_date',
                'by_salary',
            )
            ->with([
                'paymentMonth:id,title',
                'staff:id,first_name,middle_name,last_name,employee_id,uan'
            ])
            ->get();
    }

    public function getStaffAdvancePaymentById(int $id, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffAdvancePayment::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('id', $id)
            ->select(
                'id',
                'staff_id',
                'staff_salary_payment_id',
                'payment_month_id',
                'ledger_id',
                'paid_amount',
                'deducted_amount',
                'payment_date',
                'payment_note',
                'cheque_no',
                'cheque_date',
                'bank_id',
                'branch',
                'by_salary',
                'is_canceled',
                'cancel_reason',
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
                        'designation:id,name'
                    ]);
                }
            ])
            ->first();
    }

    public function getNextReceiptNo(int $schoolId =  null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        $journal = StaffAdvancePayment::where('school_id', $schoolId)
            ->orderBy('id', 'desc')
            ->select(
                'receipt_no'
            )
            ->first();

        return ($journal?->receipt_no ?? 0) + 1;
    }

    public function getStaffAdvancePaymentsForPaymentReport(int $ledgerId = null, string $startDate = '', string $endDate = '', int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffAdvancePayment::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('by_salary', false)
            ->where('is_canceled', false)
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
                'staff_id',
                'ledger_id',
                'payment_month_id',
                'paid_amount',
                'deducted_amount',
                'payment_date',
                'by_salary',
                'receipt_no'
            )
            ->with([
                'ledger:id,title',
                'paymentMonth:id,title',
                'staff:id,first_name,middle_name,last_name'
            ])
            ->get();
    }

    public function getCanceledStaffAdvancePayments(string $startDate = '', string $endDate = '', int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffAdvancePayment::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('by_salary', false)
            ->where('is_canceled', true)
            ->where(function ($query) use ($startDate, $endDate) {
                if (!empty($startDate)) {
                    $query->whereDate('payment_date', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $query->whereDate('payment_date', '<=', $endDate);
                }
            })
            ->select(
                'id',
                'staff_id',
                'ledger_id',
                'payment_month_id',
                'paid_amount',
                'deducted_amount',
                'payment_date',
                'by_salary',
                'receipt_no'
            )
            ->with([
                'ledger:id,title',
                'paymentMonth:id,title',
                'staff:id,first_name,middle_name,last_name'
            ])
            ->get();
    }

    public function getFilteredStaffAdvancePayments(array $paymentMonthIds = [], string $staffType = '', int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffAdvancePayment::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('by_salary', false)
            ->where('is_canceled', false)
            ->where(function ($query) use ($paymentMonthIds, $staffType) {
                if (!empty($paymentMonthIds)) {
                    $query->whereIn('payment_month_id', $paymentMonthIds);
                }

                if (!empty($staffType)) {
                    $query->whereHas('staff', function ($query) use ($staffType) {
                        $query->where('staff_type', $staffType);
                    });
                }
            })
            ->select(
                'id',
                'staff_id',
                'ledger_id',
                'payment_month_id',
                'paid_amount',
                'deducted_amount',
                'payment_date',
                'by_salary',
                'receipt_no'
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
                }
            ])
            ->get();
    }
}
