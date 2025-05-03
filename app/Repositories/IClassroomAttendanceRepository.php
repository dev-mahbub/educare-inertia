<?php

namespace App\Repositories;

interface IClassroomAttendanceRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll();
    public function getAttendanceList($attendanceDateAt, $classroomId);
    public function checkAlreadyAttendance($classroomId,  $attendanceDateAt);
    public function getAttendanceBetweenDatesFromClassroomId($schoolId, $classroomId, $academicYearId, $attendanceStartAt, $attendanceEndAt);
    public function getOnlineAttendance($classroomId, $subjectId, $attendanceDate, $academicYearId = null);
    public function updateOrCreateOnlineAttendance(array $attributesToCheck, array $valuesToUpdate);
}
