<?php

namespace App\Repositories;

interface IClassroomPeriodRepository
{
    public function updateOrCreate(array $attributesToCheck, array $valuesToUpdate);
    public function getClassroomPeriodsByClassroomIdAndSchoolShiftId(int $classroomId, int $schoolShiftId, int $schoolId = null, int $academicYearId = null);
    public function getClassroomPeriodById(int $id, int $schoolId = null, int $academicYearId = null);
    public function getClassroomPeriodsByClassroomIds(
        array $classroomIds,
        int $schoolShiftId = null,
        int $schoolId = null,
        int $academicYearId = null
    );
}
