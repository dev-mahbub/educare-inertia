<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\BloodGroup;

class BloodGroupRepository implements IRepository, IBloodGroupRepository
{
    public function getAll()
    {
        return BloodGroup::all()->latest()->get();
    }

    public function getById($id)
    {
        return BloodGroup::findOrFail($id);
    }

    public function delete($id)
    {
        BloodGroup::destroy($id);
    }

    public function create(array $arrayData)
    {
        return BloodGroup::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return BloodGroup::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return BloodGroup::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return BloodGroup::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getActiveNameAndId($schoolId = null)
    {
        return BloodGroup::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->select('id', 'name')->latest()->get();
    }
}
