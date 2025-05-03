<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\ClassroomTimetable;

class TimetableRepository implements IRepository, ITimetableRepository
{
    public function getAll()
    {
        return ClassroomTimetable::all();
    }

    public function getById($id)
    {
        return ClassroomTimetable::findOrFail($id);
    }

    public function delete($id)
    {
        return ClassroomTimetable::destroy($id);
    }

    public function create(array $arrayData)
    {
        return ClassroomTimetable::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return ClassroomTimetable::whereId($id)->update($arrayData);
    }

    public function updateOrCreate(array $attributesToCheck, array $valuesToUpdate)
    {
        return ClassroomTimetable::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function getActiveAll(int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return ClassroomTimetable::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->get();
    }

    public function getRegisterAll(int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return ClassroomTimetable::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->get();
    }

    public function deleteClassroomTimetablesByClassroomIdAndSchoolShiftId(int $classroomId, int $schoolShiftId, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return ClassroomTimetable::where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('classroom_id', $classroomId)
            ->where('school_shift_id', $schoolShiftId)
            ->delete();
    }

    public function getClassroomTimetablesByClassroomIdAndSchoolShiftId(int $classroomId, int $schoolShiftId, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return ClassroomTimetable::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('classroom_id', $classroomId)
            ->where('school_shift_id', $schoolShiftId)
            ->with([
                'staff:id,first_name,middle_name,last_name',
                'subject:id,title'
            ])->select(
                'id',
                'staff_id',
                'subject_id',
                'classroom_period_id',
                'classroom_id',
                'school_shift_id',
                'day'
            )
            ->get();
    }

    public function getClassroomTimetablesByStaffIdAndSchoolShiftId(int $staffId, int $schoolShiftId, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return ClassroomTimetable::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('staff_id', $staffId)
            ->where('school_shift_id', $schoolShiftId)
            ->with([
                'staff:id,first_name,middle_name,last_name',
                'subject:id,title',
                'classroom:id,title',
                'classroomPeriod' => function ($query) {
                    $query->select(
                        'id',
                        'school_period_id'
                    );
                }
            ])
            ->select(
                'id',
                'staff_id',
                'subject_id',
                'classroom_period_id',
                'classroom_id',
                'school_shift_id',
                'day'
            )
            ->get();
    }

    public function getTodayAllotmentClassroomTimetables(
        int $schoolShiftId,
        array $classroomIds = [],
        int $schoolId = null,
        int $academicYearId = null
    ) {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return ClassroomTimetable::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('school_shift_id', $schoolShiftId)
            ->when(!empty($classroomIds), function ($query) use ($classroomIds) {
                $query->whereIn('classroom_id', $classroomIds);
            })
            ->where('day', date('l'))
            ->with([
                'staff:id,first_name,middle_name,last_name',
                'subject:id,title',
                'classroomPeriod' => function ($query) {
                    $query->select(
                        'id',
                        'school_period_id'
                    );
                }
            ])->select(
                'id',
                'staff_id',
                'subject_id',
                'classroom_period_id',
                'classroom_id',
                'school_shift_id',
                'day'
            )
            ->get();
    }
}
