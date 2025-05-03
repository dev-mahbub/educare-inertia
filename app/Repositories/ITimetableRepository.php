<?php

namespace App\Repositories;

interface ITimetableRepository
{
    public function updateOrCreate(array $attributesToCheck, array $valuesToUpdate);
    public function deleteClassroomTimetablesByClassroomIdAndSchoolShiftId(int $classroomId, int $schoolShiftId, int $schoolId = null, int $academicYearId = null);
    public function getClassroomTimetablesByClassroomIdAndSchoolShiftId(int $classroomId, int $schoolShiftId, int $schoolId = null, int $academicYearId = null);
    public function getClassroomTimetablesByStaffIdAndSchoolShiftId(int $staffId, int $schoolShiftId, int $schoolId = null, int $academicYearId = null);
    public function getTodayAllotmentClassroomTimetables(
        int $schoolShiftId,
        array $classroomIds = [],
        int $schoolId = null,
        int $academicYearId = null
    );
}
