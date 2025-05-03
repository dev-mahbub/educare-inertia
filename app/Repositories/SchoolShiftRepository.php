<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\SchoolShift;
use App\Models\Timetable;

class SchoolShiftRepository implements IRepository, ISchoolShiftRepository
{
    public function getAll()
    {
        return SchoolShift::all()->latest()->get();
    }

    public function getById($id)
    {
        return SchoolShift::findOrFail($id);
    }

    public function delete($id)
    {
        SchoolShift::destroy($id);
    }

    public function create(array $arrayData)
    {
        return SchoolShift::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return SchoolShift::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return SchoolShift::where('status', Status::ACTIVE)->latest()->get();
    }

    public function getRegisterAll()
    {
        return SchoolShift::where('status', Status::ACTIVE)->latest()->get();
    }

    public function getSchoolShiftById(int $id, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return SchoolShift::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('id', $id)
            ->select(
                'id',
                'title',
            )
            ->first();
    }
}
