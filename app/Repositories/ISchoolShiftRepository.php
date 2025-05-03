<?php

namespace App\Repositories;

interface ISchoolShiftRepository
{
    public function getSchoolShiftById(int $id, int $schoolId = null);
}
