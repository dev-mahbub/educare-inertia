<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Asset;

class AssetRepository implements IRepository, IAssetRepository
{
    public function getAll()
    {
        return Asset::all();
    }

    public function getById($id)
    {
        return Asset::findOrFail($id);
    }

    public function delete($id)
    {
        Asset::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Asset::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Asset::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Asset::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getRegisterAll()
    {
        return Asset::where('status', Status::ACTIVE)
            ->get();
    }
}
