<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Vendor;

class VendorRepository implements IRepository, IVendorRepository
{
    public function getAll()
    {
        return Vendor::all()->latest()->get();
    }

    public function getById($id)
    {
        return Vendor::findOrFail($id);
    }

    public function delete($id)
    {
        Vendor::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Vendor::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Vendor::whereId($id)
            ->update($arrayData);
    }

    public function getActiveAll()
    {
        return Vendor::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getActiveTitleAndId()
    {
        return Vendor::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'title')
            ->latest()
            ->get();
    }
}
