<?php

namespace App\Repositories;

interface IHolidayRepository
{
    // public function getRegisterAll();
    public function getHolidaysForCalendar(string $startDate = '', string $endDate = '', int $schoolId = null);
    public function getHolidaysForStudentCalendar(string $startDate = '', string $endDate = '', int $schoolId = null);
    public function getStudentActiveAll($schoolId = null);
}
