<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\SmsCircular;

class SmsCircularRepository implements IRepository, ISmsCircularRepository
{
    public function getAll()
    {
        return SmsCircular::all()->latest()->get();
    }

    public function getById($id)
    {
        return SmsCircular::findOrFail($id);
    }

    public function delete($id)
    {
        return SmsCircular::destroy($id);
    }

    public function create(array $arrayData)
    {
        return SmsCircular::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return SmsCircular::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return SmsCircular::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return SmsCircular::where('status', Status::ACTIVE)->get();
    }

    public function getSmsCircularById(int $id)
    {
        return SmsCircular::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->first();
    }
}
