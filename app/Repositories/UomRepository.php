<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Uom;

class UomRepository implements IRepository, IUomRepository
{
    public function getAll()
    {
        return Uom::all()->latest()->get();
    }

    public function getById($id)
    {
        return Uom::findOrFail($id);
    }

    public function delete($id)
    {
        Uom::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Uom::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Uom::whereId($id)
            ->update($arrayData);
    }

    public function getActiveAll()
    {
        return Uom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getActiveNameAndId()
    {
        return Uom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'title')
            ->latest()
            ->get();
    }
}
