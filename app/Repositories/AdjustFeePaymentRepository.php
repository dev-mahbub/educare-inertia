<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\AdjustFeePayment;
use App\Models\AdjustFeePaymentAmount;
use App\Repositories\IAdjustFeePaymentRepository;

class AdjustFeePaymentRepository implements IRepository, IAdjustFeePaymentRepository
{
    public function getAll()
    {
        return AdjustFeePayment::all();
    }

    public function getById($id)
    {
        return AdjustFeePayment::findOrFail($id);
    }

    public function getBySchoolId($id)
    {
        return AdjustFeePayment::where('school_id', $id)->first();
    }

    public function delete($id)
    {
        AdjustFeePayment::destroy($id);
    }

    public function create(array $arrayData)
    {
        return AdjustFeePayment::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return AdjustFeePayment::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return AdjustFeePayment::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->orderBy('adjust_date', 'ASC')
            ->get();
    }

    public function createAdjustFeePaymentAmount(array $arrayData)
    {
        return AdjustFeePaymentAmount::create($arrayData);
    }
}
