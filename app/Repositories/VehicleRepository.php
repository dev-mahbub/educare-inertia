<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\TransportProvider;
use App\Models\Vehicle;

class VehicleRepository implements IRepository, IVehicleRepository
{
    public function getAll()
    {
        return Vehicle::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getById($id)
    {
        return Vehicle::findOrFail($id);
    }

    public function delete($id)
    {
       Vehicle::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Vehicle::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Vehicle::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Vehicle::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getActiveAllNumberId()
    {
        return Vehicle::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'vehicle_number', 'device_id')
            ->get();
    }

    public function getRegisterAll()
    {
        return Vehicle::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getTransportProviderAll()
    {
        return TransportProvider::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

}
