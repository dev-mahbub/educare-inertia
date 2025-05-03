<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\EmergencyContact;

class EmergencyContactRepository implements IRepository, IEmergencyContactRepository
{
    public function getAll()
    {
        return EmergencyContact::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->orderBy('id', 'DESC')
            ->get();
    }

    public function getById($id)
    {
        return EmergencyContact::findOrFail($id);
    }

    public function delete($id)
    {
        EmergencyContact::destroy($id);
    }

    public function create(array $arrayData)
    {
        return EmergencyContact::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return EmergencyContact::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return EmergencyContact::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->orderBy('id', 'DESC')
            ->get();
    }

    public function getRegisterAll()
    {
        return EmergencyContact::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->orderBy('id', 'DESC')
            ->get();
    }
}