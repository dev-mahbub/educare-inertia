<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Designation;

class DesignationRepository implements IRepository, IDesignationRepository
{
    public function getAll()
    {
        return Designation::all()->latest()->get();
    }

    public function getById($id)
    {
        return Designation::findOrFail($id);
    }

    public function delete($id)
    {
        Designation::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Designation::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Designation::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Designation::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return Designation::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getActiveNameAndId($schoolId = null)
    {
        return Designation::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->select('id', 'name')->latest()->get();
    }

}
