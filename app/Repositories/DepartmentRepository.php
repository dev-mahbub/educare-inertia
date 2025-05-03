<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Department;

class DepartmentRepository implements IRepository, IDepartmentRepository
{
    public function getAll()
    {
        return Department::all()->latest()->get();
    }

    public function getById($id)
    {
        return Department::findOrFail($id);
    }

    public function delete($id)
    {
        Department::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Department::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Department::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Department::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return Department::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getActiveNameAndId($schoolId = null)
    {
        return Department::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->select('id', 'name')->latest()->get();
    }
}
