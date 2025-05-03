<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\InfraLevel;

class InfraLevelRepository implements IRepository, IInfraLevelRepository
{
    public function getAll()
    {
        return InfraLevel::get();
    }

    public function getById($id)
    {
        return InfraLevel::findOrFail($id);
    }

    public function delete($id)
    {
        InfraLevel::destroy($id);
    }

    public function create(array $arrayData)
    {
        return InfraLevel::create($arrayData);
    }

    public function updateOrCreate(array $arrayData)
    {
        return InfraLevel::updateOrCreate($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return InfraLevel::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return InfraLevel::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return InfraLevel::where('status', Status::ACTIVE);
    }

    public function getActiveAllInfraLevels()
    {
        return InfraLevel::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereNull('parent_id')
            ->with(['allChildren'])
            ->latest()
            ->get();
    }
}
