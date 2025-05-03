<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Discount;

class DiscountRepository implements IRepository, IDiscountRepository
{
    public function getAll()
    {
        return Discount::all();
    }

    public function getById($id)
    {
        return Discount::findOrFail($id);
    }

    public function getBySchoolId($id)
    {
        return Discount::where('school_id', $id)->first();
    }

    public function delete($id)
    {
        Discount::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Discount::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Discount::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Discount::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return Discount::where('status', Status::ACTIVE);
    }
}
