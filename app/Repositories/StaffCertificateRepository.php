<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\StaffCertificate;

class StaffCertificateRepository implements IRepository, IStaffCertificateRepository
{
    public function getAll()
    {
        return StaffCertificate::all()->latest()->get();
    }

    public function getActiveAll()
    {
        return StaffCertificate::where('status', Status::ACTIVE)->latest()->get();
    }

    public function getById($id)
    {
        return StaffCertificate::findOrFail($id);
    }

    public function delete($id)
    {
        return StaffCertificate::destroy($id);
    }

    public function create(array $arrayData)
    {
        return StaffCertificate::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return StaffCertificate::whereId($id)->update($arrayData);
    }
}
