<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Occupation;

class OccupationRepository implements IRepository, IOccupationRepository
{
    public function getAll()
    {
        return Occupation::all();
    }

    public function getById($id)
    {
        return Occupation::findOrFail($id);
    }

    public function delete($id)
    {
        Occupation::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Occupation::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Occupation::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Occupation::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return Occupation::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }
}