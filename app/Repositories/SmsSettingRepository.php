<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\SmsSetting;

class SmsSettingRepository implements IRepository, ISmsSettingRepository
{
    public function getAll()
    {
        return SmsSetting::all()->latest()->get();
    }

    public function getById($id)
    {
        return SmsSetting::findOrFail($id);
    }

    public function delete($id)
    {
        SmsSetting::destroy($id);
    }

    public function create(array $arrayData)
    {
        return SmsSetting::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return SmsSetting::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return SmsSetting::where('status', Status::ACTIVE)
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return SmsSetting::where('status', Status::ACTIVE);
    }

    public function getAllTemplate()
    {
        return SmsSetting::where('type', 'template')->latest()->get();
    }
}
