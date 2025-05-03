<?php

namespace App\Repositories;

use App\Enums\RefundStatus;
use App\Enums\Status;
use App\Models\FeePaymentRefund;
use App\Repositories\IFeePaymentRefundRepository;

class FeePaymentRefundRepository implements IRepository, IFeePaymentRefundRepository
{
    public function getAll()
    {
        return FeePaymentRefund::all();
    }

    public function getById($id)
    {
        return FeePaymentRefund::findOrFail($id);
    }

    public function getBySchoolId($id)
    {
        return FeePaymentRefund::where('school_id', $id)->first();
    }

    public function delete($id)
    {
        FeePaymentRefund::destroy($id);
    }

    public function create(array $arrayData)
    {
        return FeePaymentRefund::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return FeePaymentRefund::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return FeePaymentRefund::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getRegisterAll()
    {
        return FeePaymentRefund::where('status', Status::ACTIVE);
    }


    public function getStudentTotalRefund(int $studentId, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return FeePaymentRefund::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('student_id', $studentId)
            ->whereHas('refund_method', function ($query) {
                $query->where('refund_status', RefundStatus::APPROVED);
            })
            ->sum('refund_amount');
    }

    public function getPaymentFeeTypeTotalRefund($studentId, $feeTypeId)
    {
        return FeePaymentRefund::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('student_id', $studentId)
            ->where('fee_type_id', $feeTypeId)
            ->whereHas('refund_method', function ($query) {
                $query->where('refund_status', RefundStatus::APPROVED);
            })
            ->sum('refund_amount');
    }
}
