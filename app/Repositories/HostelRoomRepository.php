<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\HostelRoomType;

class HostelRoomRepository implements IRepository, IHostelRoomRepository
{
    public function getAll()
    {
        return HostelRoomType::where('school_id', getUserSchoolId())
            ->get();
    }

    public function getById($id)
    {
        return HostelRoomType::findOrFail($id);
    }

    public function delete($id)
    {
        return HostelRoomType::destroy($id);
    }

    public function create(array $arrayData)
    {
        return HostelRoomType::create($arrayData);
    }

    public function updateOrCreate(array $conditionData, array $arrayData)
    {
        return HostelRoomType::updateOrCreate($conditionData, $arrayData);
    }

    public function update($id, array $arrayData)
    {
        return HostelRoomType::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return HostelRoomType::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }
}
