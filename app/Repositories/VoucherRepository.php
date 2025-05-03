<?php

namespace App\Repositories;

use App\Enums\PaymentStatus;
use App\Enums\Status;
use App\Models\Voucher;

class VoucherRepository implements IRepository, IVoucherRepository
{
    public function getAll()
    {
        return Voucher::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getById($id)
    {
        return Voucher::findOrFail($id);
    }

    public function delete($id)
    {
        Voucher::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Voucher::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Voucher::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Voucher::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getRegisterAll()
    {
        return Voucher::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getVoucherInstallmentNo()
    {
        $voucher = $this->getLastVoucher();
        if (!empty($voucher->id)) {
            return $voucher->installment_no + 1;
        } else {
            return 1;
        }
    }

    public function getLastVoucher()
    {
        return Voucher::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->first();
    }


    public function getActiveVoucherAll()
    {
        return Voucher::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->with(['payment'])
            ->get();
    }


    public function getAllBetweenCurrentAllocateAndDeallocate($studentId, $currentAllocateVoucherId, $deallocateVoucherId, $academicYearId = null)
    {
        $academicYearId = !empty($academicYearId) ? $academicYearId : getAcademicYearId();

        return Voucher::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->when(!empty($currentAllocateVoucherId), function ($query) use ($currentAllocateVoucherId) {
                $query->where('id', '>', $currentAllocateVoucherId);
            })
            // ->when(!empty($deallocateVoucherId), function ($query) use ($deallocateVoucherId) {
            //     $query->where('id', '<', $deallocateVoucherId);
            // })
            ->when(!empty($currentAllocateVoucherId) && !empty($deallocateVoucherId), function ($query) use ($deallocateVoucherId) {
                $query->where('id', '<', $deallocateVoucherId);
            })
            ->where(function ($query) use ($studentId) {
                $query->whereDoesntHave('payment', function ($query) use ($studentId) {
                    $query->where('student_id', $studentId);
                })->orWhereHas('payment', function ($query) use ($studentId) {
                    $query->where('payment_status', PaymentStatus::CANCELLED)
                        ->where('student_id', $studentId);
                });
            })
            // ->whereDoesntHave('payment', function ($query) use ($studentId) {
            //     $query->where('student_id', $studentId);
            // })
            ->orderBy('id', 'asc')
            ->get();
    }

    public function getAllBetweenCurrentAllocateAndDeallocateReport($studentId, $fromId, $toId, $currentAllocateVoucherId, $deallocateVoucherId)
    {
        return Voucher::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->when(!empty($currentAllocateVoucherId), function ($query) use ($currentAllocateVoucherId) {
                $query->where('id', '>', $currentAllocateVoucherId);
            })
            ->when(!empty($currentAllocateVoucherId) && !empty($deallocateVoucherId), function ($query) use ($deallocateVoucherId) {
                $query->where('id', '<', $deallocateVoucherId);
            })
            ->where(function ($query) use ($studentId) {
                $query->whereDoesntHave('payment', function ($query) use ($studentId) {
                    $query->where('student_id', $studentId);
                })->orWhereHas('payment', function ($query) use ($studentId) {
                    $query->where('payment_status', PaymentStatus::CANCELLED)
                        ->where('student_id', $studentId);
                });
            })
            ->when(!empty($fromId) && !empty($toId), function ($query) use ($fromId, $toId) {
                $query->whereBetween('id', [$fromId, $toId]);
            })
            ->orderBy('id', 'asc')
            ->get();
    }
}
