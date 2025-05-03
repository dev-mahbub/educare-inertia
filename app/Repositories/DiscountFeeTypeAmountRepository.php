<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\DiscountFeeTypeAmount;

class DiscountFeeTypeAmountRepository implements IRepository, IDiscountFeeTypeAmountRepository
{
    public function getAll()
    {
        return DiscountFeeTypeAmount::all();
    }

    public function getById($id)
    {
        return DiscountFeeTypeAmount::findOrFail($id);
    }

    public function getBySchoolId($id)
    {
        return DiscountFeeTypeAmount::where('school_id', $id)->first();
    }

    public function delete($id)
    {
        DiscountFeeTypeAmount::destroy($id);
    }

    public function create(array $arrayData)
    {
        return DiscountFeeTypeAmount::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return DiscountFeeTypeAmount::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return DiscountFeeTypeAmount::where('status', Status::ACTIVE)
            ->orderBy('display_order', 'ASC')
            ->get();
    }

    public function getRegisterAll()
    {
        return DiscountFeeTypeAmount::where('status', Status::ACTIVE);
    }

    public function updateOrCreate(array $attributesToCheck, array $valuesToUpdate)
    {
        return DiscountFeeTypeAmount::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }
}
