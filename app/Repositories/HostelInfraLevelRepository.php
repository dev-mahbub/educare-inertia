<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\HostelInfraLevel;

class HostelInfraLevelRepository implements IRepository, IHostelInfraLevelRepository
{
    public function getAll()
    {
        return HostelInfraLevel::where('school_id', getUserSchoolId())->get();
    }

    public function getById($id)
    {
        return HostelInfraLevel::findOrFail($id);
    }

    public function delete($id)
    {
        return HostelInfraLevel::destroy($id);
    }

    public function create(array $arrayData)
    {
        return HostelInfraLevel::create($arrayData);
    }

    public function updateOrCreate(array $arrayData)
    {
        return HostelInfraLevel::updateOrCreate($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return HostelInfraLevel::whereId($id)->update($arrayData);
    }

    public function getCountBedsById($id)
    {
        return 1; // need work HostelInfraLevel::findOrFail($id)->beds->count();
    }

    public function getActiveAll()
    {
        return HostelInfraLevel::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }
}
