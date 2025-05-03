<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\HolidayPolicy;

class HolidayPolicyRepository implements IRepository, IHolidayPolicyRepository
{
    public function getAll()
    {
        return HolidayPolicy::all()->latest()->get();
    }

    public function getById($id)
    {
        return HolidayPolicy::findOrFail($id);
    }

    public function delete($id)
    {
        HolidayPolicy::destroy($id);
    }

    public function create(array $arrayData)
    {
        return HolidayPolicy::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return HolidayPolicy::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return HolidayPolicy::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return HolidayPolicy::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }
}