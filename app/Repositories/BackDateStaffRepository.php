<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\BackDateStaff;

class BackDateStaffRepository implements IRepository, IBackDateStaffRepository
{
    public function getAll()
    {
        return BackDateStaff::all();
    }

    public function getById($id)
    {
        return BackDateStaff::findOrFail($id);
    }

    public function delete($id)
    {
        BackDateStaff::destroy($id);
    }

    public function create(array $arrayData)
    {
        return BackDateStaff::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return BackDateStaff::whereId($id)->update($arrayData);
    }

    public function updateOrCreate(array $attributesToCheck, array $valuesToUpdate)
    {
        return BackDateStaff::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function getActiveAll(int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return BackDateStaff::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->select(
                'id',
                'staff_id'
            )
            ->get();
    }

    public function getRegisterAll()
    {
        return BackDateStaff::where('status', Status::ACTIVE);
    }

    public function getBackDateStaffById(int $id, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return BackDateStaff::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('id', $id)
            ->select(
                'id',
                'staff_id',
            )
            ->first();
    }

    public function getBackDateStaffByStaffId(int $staffId, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return BackDateStaff::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('staff_id', $staffId)
            ->select(
                'id',
                'staff_id'
            )
            ->first();
    }

    public function deleteByStaffIds(array $staffIds, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return BackDateStaff::where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->whereIn('staff_id', $staffIds)
            ->delete();
    }
}
