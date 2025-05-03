<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Enums\RefundStatus;
use App\Models\FeePaymentRefundMethod;

class FeePaymentRefundMethodRepository implements IRepository, IFeePaymentRefundMethodRepository
{
    public function getAll()
    {
        return FeePaymentRefundMethod::all();
    }

    public function getById($id)
    {
        return FeePaymentRefundMethod::findOrFail($id);
    }

    public function getBySchoolId($id)
    {
        return FeePaymentRefundMethod::where('school_id', $id)->first();
    }

    public function delete($id)
    {
        FeePaymentRefundMethod::destroy($id);
    }

    public function create(array $arrayData)
    {
        return FeePaymentRefundMethod::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return FeePaymentRefundMethod::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return FeePaymentRefundMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getRegisterAll()
    {
        return FeePaymentRefundMethod::where('status', Status::ACTIVE);
    }


    public function getFeeRefundAmountsByRefundStatus($refund_status)
    {
        return FeePaymentRefundMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('refund_status', $refund_status)
            ->with(['student' => function ($query) {
                $query->with(['classroom', 'promotedClassroom']);
            }, 'refund_amounts.feeType'])
            ->get();
    }

    public function getActiveFeeRefunds(string $refundMode = '', string $startDate = '', string $endDate = '')
    {
        return FeePaymentRefundMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('refund_status', '!=', RefundStatus::CANCELED)
            ->where(function ($query) use ($refundMode, $startDate, $endDate) {
                if (!empty($refundMode)) {
                    $query->where('refund_mode', $refundMode);
                }

                if (!empty($startDate)) {
                    $query->whereDate('refund_date', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $query->whereDate('refund_date', '<=', $endDate);
                }
            })
            ->select(
                'id',
                'student_id',
                'receipt_no',
                'refund_date',
                'refund_mode'
            )
            ->with([
                'student:id,first_name,middle_name,last_name',
                'refund_amounts' => function ($query) {
                    $query->select(
                        'id',
                        'fee_payment_refund_method_id',
                        'refund_amount',
                        'fee_type_id'
                    )->with(['feeType:id,fee_type']);
                }
            ])
            ->get();
    }

    public function getCanceledFeeRefunds(string $startDate = '', string $endDate = '')
    {
        return FeePaymentRefundMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('refund_status', RefundStatus::CANCELED)
            ->where(function ($query) use ($startDate, $endDate) {
                if (!empty($startDate)) {
                    $query->whereDate('refund_date', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $query->whereDate('refund_date', '<=', $endDate);
                }
            })
            ->select(
                'id',
                'student_id',
                'receipt_no',
                'refund_date',
                'refund_mode'
            )
            ->with([
                'student:id,first_name,middle_name,last_name',
                'refund_amounts:id,fee_payment_refund_method_id,refund_amount'
            ])
            ->get();
    }

    public function getFeeRefundReportById(int $id)
    {
        return FeePaymentRefundMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('refund_status', RefundStatus::APPROVED)
            ->where('id', $id)
            ->select(
                'id',
                'created_by',
                'student_id',
                'refund_mode',
                'refund_date',
                'refund_note',
                'receipt_no',
            )
            ->with(['student' =>  function ($query) {
                $query->select(
                    'id',
                    'admission_no',
                    'classroom_id',
                    'first_name',
                    'middle_name',
                    'last_name',
                )->with([
                    'classroom:id,title',
                    'father:id,student_id,first_name,middle_name,last_name',
                ]);
            }, 'refund_amounts' => function ($query) {
                $query->select(
                    'id',
                    'fee_type_id',
                    'fee_payment_refund_method_id',
                    'refund_amount',
                )->with(['feeType:id,fee_type']);
            }, 'createdBy:id,first_name,middle_name,last_name'])
            ->first();
    }

    public function getNextFeeReceiptNumber()
    {
        $lastPayment = FeePaymentRefundMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->select('id', 'receipt_no')
            ->orderBy('receipt_no', 'desc')
            ->first();

        if ($lastPayment != null) {
            return $lastPayment?->receipt_no + 1;
        }

        return null;
    }

    public function checkFeePaymentRefundExists()
    {
        return FeePaymentRefundMethod::where('status', Status::ACTIVE)
            ->where('school_id', getUserSChoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->exists();
    }
}
