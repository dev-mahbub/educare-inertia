<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\School;
use App\Models\SchoolSetting;

class SchoolSettingRepository implements IRepository, ISchoolSettingRepository
{
    public function getAll()
    {
        return SchoolSetting::all();
    }

    public function getById($id)
    {
        return SchoolSetting::findOrFail($id);
    }

    public function getBySchoolId($id)
    {
        return SchoolSetting::where('school_id', $id)->first();
    }

    public function delete($id)
    {
        SchoolSetting::destroy($id);
    }

    public function create(array $arrayData)
    {
        return SchoolSetting::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return SchoolSetting::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return SchoolSetting::where('status', Status::ACTIVE);
    }

    public function getRegisterAll()
    {
        return SchoolSetting::where('status', Status::ACTIVE);
    }
}
