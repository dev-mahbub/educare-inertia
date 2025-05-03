<?php

namespace App\Repositories;

interface IStaffAttendanceRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getCheckAlreadyAttendance($schoolId, $academicYearId, $attendanceDateAt);
    public function getStaffAttendanceBetweenDates($schoolId, $academicYearId, $attendanceStartAt, $attendanceEndAt);
    public function getStaffAttendancesForLeave(string $startDate, string $endDate);
    public function getStaffAttendancesByStaffId(int $staffId = null, int $schoolId = null, int $academicYearId = null);
}
