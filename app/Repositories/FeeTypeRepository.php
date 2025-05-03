<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\FeeType;
use App\Enums\FeeInstallmentType;
use App\Repositories\IRepository;
use App\Repositories\IFeeTypeRepository;

class FeeTypeRepository implements IRepository, IFeeTypeRepository
{
    public function getAll()
    {
        return FeeType::all();
    }

    public function getById($id)
    {
        return FeeType::findOrFail($id);
    }

    public function delete($id)
    {
        FeeType::destroy($id);
    }

    public function create(array $arrayData)
    {
        return FeeType::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return FeeType::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return FeeType::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getActiveFeeTypesAll()
    {
        return FeeType::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('is_fee_special', 0)
            ->get();
    }

    public function getActiveFeeSpecialTypesAll()
    {
        return FeeType::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('is_fee_special', 1)
            ->get();
    }

    public function getRegisterAll()
    {
        return FeeType::where('status', Status::ACTIVE)->get();
    }

    public function getActiveIdName()
    {
        return FeeType::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'display_name')
            ->get();
    }

    public function getActiveIdNameByIds(array $ids)
    {
        return FeeType::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'display_name')
            ->whereIn('id', $ids)
            ->get();
    }


    public function getLateFeeType($schoolId = null)
    {
        return FeeType::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('installment_type', FeeInstallmentType::EXTRACHARGE->value)
            ->where('is_late_fee', true)
            ->first();
    }

    public function getTransportFeeType($schoolId = null)
    {
        return FeeType::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('is_transport_fee', true)
            ->first();
    }


    public function getExtraFeeTypeAll()
    {
        return FeeType::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('installment_type', FeeInstallmentType::EXTRACHARGE->value)
            ->get();
    }
}
