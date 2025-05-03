<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Timezone;
use App\Models\StandardTimezone;

class TimezoneRepository implements IRepository, ITimezoneRepository
{
    public function getAll()
    {
        return Timezone::all()->latest()->get();
    }

    public function getById($id)
    {
        return Timezone::findOrFail($id);
    }

    public function delete($id)
    {
        Timezone::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Timezone::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Timezone::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Timezone::where('status', Status::ACTIVE)
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return Timezone::where('status', Status::ACTIVE)
            ->latest()
            ->get();
    }

    public function getActiveNameAndId()
    {
        return Timezone::where('status', Status::ACTIVE)->select('id', 'name')->latest()->get();
    }


    // strand time zone
    public function getStandardTimezoneAll()
    {
        return StandardTimezone::where('status', Status::ACTIVE)
            ->latest()
            ->get();
    }

    public function getStandardTimezoneFromId($id)
    {
        return StandardTimezone::find($id);
    }
}
