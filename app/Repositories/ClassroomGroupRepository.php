<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\ClassroomGroup;

class ClassroomGroupRepository implements IRepository, IClassroomGroupRepository
{
    public function getAll()
    {
        return ClassroomGroup::all();
    }

    public function getById($id)
    {
        return ClassroomGroup::findOrFail($id);
    }

    public function delete($id)
    {
        ClassroomGroup::destroy($id);
    }

    public function create(array $arrayData)
    {
        return ClassroomGroup::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return ClassroomGroup::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return ClassroomGroup::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return ClassroomGroup::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }
}