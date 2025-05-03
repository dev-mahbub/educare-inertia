<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Enums\PaymentStatus;
use App\Models\StudentFeeVoucherAmount;

class StudentFeeVoucherAmountRepository implements IRepository, IStudentFeeVoucherAmountRepository
{
    public function getAll()
    {
        return StudentFeeVoucherAmount::all();
    }

    public function getById($id)
    {
        return StudentFeeVoucherAmount::findOrFail($id);
    }

    public function getBySchoolId($id)
    {
        return StudentFeeVoucherAmount::where('school_id', $id)->first();
    }

    public function delete($id)
    {
        StudentFeeVoucherAmount::destroy($id);
    }

    public function create(array $arrayData)
    {
        return StudentFeeVoucherAmount::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return StudentFeeVoucherAmount::whereId($id)->update($arrayData);
    }

    public function updateOrCreate(array $attributesToCheck, array $valuesToUpdate)
    {
        return StudentFeeVoucherAmount::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function getActiveAll()
    {
        return StudentFeeVoucherAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchooldId())
            ->where('academic_year_id', getAcademicYearId())
            ->orderBy('id', 'ASC')
            ->get();
    }

    public function getRegisterAll()
    {
        return StudentFeeVoucherAmount::where('status', Status::ACTIVE);
    }

    public function getVoucherAmountsByVoucherIdAndStudentId($voucherId, $studentId)
    {
        return StudentFeeVoucherAmount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchooldId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('student_fee_voucher_id', $voucherId)
            ->where('student_id', $studentId)
            ->with(['fee_payments' => function ($query) {
                $query->where('payment_status', '!=', PaymentStatus::CANCELLED);
            }])
            ->get();
    }
}
