<?php

namespace App\Repositories;

interface ISchoolPeriodRepository
{
    public function getSchoolPeriodsBySchoolShiftId(int $schoolShiftId, int $schoolId = null, int $academicYearId = null);
    public function getSchoolPeriodById(int $id, int $schoolId = null, int $academicYearId = null);
}
