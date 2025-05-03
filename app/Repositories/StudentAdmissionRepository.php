<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\StudentAdmission;

class StudentAdmissionRepository implements IRepository, IStudentAdmissionRepository
{
    public function getAll()
    {
        return StudentAdmission::all();
    }

    public function getById($id)
    {
        return StudentAdmission::findOrFail($id);
    }

    public function delete($id)
    {
        StudentAdmission::destroy($id);
    }

    public function create(array $arrayData)
    {
        return StudentAdmission::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return StudentAdmission::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return StudentAdmission::where('status', Status::ACTIVE);
    }

    public function getRegisterAll()
    {
        return StudentAdmission::where('status', Status::ACTIVE);
    }
}
