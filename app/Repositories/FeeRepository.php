<?php

namespace App\Repositories;

use App\Models\Fee;
use App\Enums\Status;
use App\Models\EnquiryFee;
use App\Enums\PaymentStatus;

class FeeRepository implements IRepository, IFeeRepository
{
    public function getAll()
    {
        return Fee::all();
    }

    public function getById($id)
    {
        return Fee::findOrFail($id);
    }

    public function delete($id)
    {
        Fee::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Fee::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Fee::whereId($id)->update($arrayData);
    }

    public function getActiveAll($schoolId = null, $academicYearId = null)
    {
        return Fee::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->orderBy('installment_no', 'asc')
            ->get();
    }

    public function getInstallmentArray()
    {
        return Fee::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->pluck('title', 'id');
    }

    public function getRegisterAll()
    {
        return Fee::where('status', Status::ACTIVE);
    }


    public function getFeeDiscountsByStudentId(int $studentId = null)
    {
        return Fee::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->with(['discounts' => function ($query) use ($studentId) {
                $query->where('student_id', $studentId);
            }])
            ->get();
    }

    public function getUnpaidByStudentId(int $studentId = null)
    {
        return Fee::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereDoesntHave('payments', function ($query) use ($studentId) {
                $query->where('payment_status', '!=', PaymentStatus::CANCELLED->value)
                    ->where('student_id', $studentId);
            })
            ->get();
    }


    public function getActiveIdTitle($schoolId = null, $academicYearId = null)
    {
        return Fee::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->select('id', 'title')
            ->orderBy('id', 'asc')
            ->get();
    }

    // enquiry fee
    public function createEnquiryFee(array $arrayData)
    {
        return EnquiryFee::create($arrayData);
    }

    public function updateEnquiryFee($id, array $arrayData)
    {
        return EnquiryFee::whereId($id)->update($arrayData);
    }


    public function getNextInstallmentNo()
    {
        $lastInstallment = Fee::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->select('id', 'installment_no')
            ->orderBy('installment_no', 'desc')
            ->first();

        if (!empty($lastInstallment->installment_no)) {
            return $lastInstallment->installment_no + 1;
        }

        return 1;
    }

    public function getByTitle(string $title)
    {
        return Fee::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('title', $title)
            ->first();
    }

    public function getActiveFeesAll()
    {
        return Fee::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->with(['payments'])
            ->get();
    }

    public function getAllBetweenCurrentAllocateAndDeallocate($studentId, $currentAllocateVoucherId, $deallocateVoucherId, $schoolId = null, $academicYearId = null)
    {
        return Fee::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->when(!empty($currentAllocateVoucherId), function ($query) use ($currentAllocateVoucherId) {
                $query->where('id', '>=', $currentAllocateVoucherId);
            })
            ->when(!empty($currentAllocateVoucherId) && !empty($deallocateVoucherId), function ($query) use ($deallocateVoucherId) {
                $query->where('id', '<', $deallocateVoucherId);
            })
            // ->where(function ($query) use ($studentId) {
            //     $query->whereDoesntHave('payments', function ($query) use ($studentId) {
            //         $query->where('student_id', $studentId);
            //     })->orWhereHas('payments', function ($query) use ($studentId) {
            //         $query->where('payment_status', PaymentStatus::CANCELLED)
            //             ->where('student_id', $studentId);
            //     });
            // })
            ->orderBy('id', 'asc')
            ->get();
    }

    public function getFeeTitleById(int $id)
    {
        return Fee::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('id', $id)
            ->select('id', 'title')
            ->first();
    }
}
