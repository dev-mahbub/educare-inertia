<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\SchoolPeriod;

class SchoolPeriodRepository implements IRepository, ISchoolPeriodRepository
{
    public function getAll()
    {
        return SchoolPeriod::all();
    }

    public function getById($id)
    {
        return SchoolPeriod::findOrFail($id);
    }

    public function delete($id)
    {
        return SchoolPeriod::destroy($id);
    }

    public function create(array $arrayData)
    {
        return SchoolPeriod::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return SchoolPeriod::whereId($id)->update($arrayData);
    }

    public function getActiveAll(int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return SchoolPeriod::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->get();
    }

    public function getRegisterAll()
    {
        return SchoolPeriod::where('status', Status::ACTIVE)->get();
    }

    public function getSchoolPeriodsBySchoolShiftId(int $schoolShiftId, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return SchoolPeriod::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('school_shift_id', $schoolShiftId)
            ->select(
                'id',
                'start_time_at',
                'end_time_at',
                'type',
                'school_shift_id'
            )
            ->get();
    }

    public function getSchoolPeriodById(int $id, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return SchoolPeriod::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('id', $id)
            ->select(
                'id',
                'start_time_at',
                'end_time_at',
                'type',
                'school_shift_id'
            )
            ->first();
    }
}
