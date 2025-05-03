<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\ClassroomPeriod;

class ClassroomPeriodRepository implements IRepository, IClassroomPeriodRepository
{
    public function getAll()
    {
        return ClassroomPeriod::all();
    }

    public function getById($id)
    {
        return ClassroomPeriod::findOrFail($id);
    }

    public function delete($id)
    {
        return ClassroomPeriod::destroy($id);
    }

    public function create(array $arrayData)
    {
        return ClassroomPeriod::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return ClassroomPeriod::whereId($id)->update($arrayData);
    }

    public function updateOrCreate(array $attributesToCheck, array $valuesToUpdate)
    {
        return ClassroomPeriod::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function getActiveAll(int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return ClassroomPeriod::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->get();
    }

    public function getRegisterAll(int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return ClassroomPeriod::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->get();
    }

    public function getClassroomPeriodsByClassroomIdAndSchoolShiftId(
        int $classroomId,
        int $schoolShiftId,
        int $schoolId = null,
        int $academicYearId = null
    ) {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return ClassroomPeriod::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('classroom_id', $classroomId)
            ->where('school_shift_id', $schoolShiftId)
            ->select(
                'id',
                'classroom_id',
                'school_period_id',
                'school_shift_id',
                'type'
            )
            ->with([
                'schoolPeriod:id,start_time_at,end_time_at,type,school_shift_id'
            ])
            ->get();
    }

    public function getClassroomPeriodById(int $id, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return ClassroomPeriod::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('id', $id)
            ->select(
                'id',
                'classroom_id',
                'school_period_id',
                'school_shift_id',
                'type'
            )
            ->with([
                'schoolPeriod:id,start_time_at,end_time_at,type,school_shift_id'
            ])
            ->first();
    }

    public function getClassroomPeriodsByClassroomIds(
        array $classroomIds,
        int $schoolShiftId = null,
        int $schoolId = null,
        int $academicYearId = null
    ) {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return ClassroomPeriod::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->whereIn('classroom_id', $classroomIds)
            ->when(!empty($schoolShiftId), function ($query) use ($schoolShiftId) {
                $query->where('school_shift_id', $schoolShiftId);
            })
            ->select(
                'id',
                'classroom_id',
                'school_period_id',
                'school_shift_id',
                'type'
            )
            // ->with([
            //     'schoolPeriod:id,start_time_at,end_time_at,type,school_shift_id'
            // ])
            ->get();
    }
}
