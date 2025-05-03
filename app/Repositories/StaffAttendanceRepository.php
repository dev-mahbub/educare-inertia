<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\AcademicGrade;
use App\Models\AcademicRemark;
use App\Models\StaffAttendance;

class StaffAttendanceRepository implements IRepository, IStaffAttendanceRepository
{
    public function getAll()
    {
        return StaffAttendance::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getById($id)
    {
        return StaffAttendance::findOrFail($id);
    }

    public function delete($id)
    {
        StaffAttendance::destroy($id);
    }

    public function create(array $arrayData)
    {
        return StaffAttendance::create($arrayData);
    }

    public function updateOrCreate(array $conditionArray, array $arrayData)
    {
        return StaffAttendance::updateOrCreate($conditionArray, $arrayData);
    }

    public function update($id, array $arrayData)
    {
        return StaffAttendance::whereId($id)->update($arrayData);
    }

    public function getActiveAll($schoolId = null, $academicYearId = null)
    {
        return StaffAttendance::where('status', Status::ACTIVE->value)
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->get();
    }

    public function getCheckAlreadyAttendance($schoolId, $academicYearId, $attendanceDateAt)
    {
        return StaffAttendance::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->whereDate('attendance_date_at', $attendanceDateAt)
            ->first();
    }

    public function getStaffAttendanceBetweenDates($schoolId, $academicYearId, $attendanceStartAt, $attendanceEndAt)
    {
        return StaffAttendance::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->whereBetween('attendance_date_at', [$attendanceStartAt, $attendanceEndAt])
            ->get();
    }

    public function getStaffAttendance(string $attendanceDate, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffAttendance::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->whereDate('attendance_date_at', $attendanceDate)
            ->first();
    }

    public function getStaffAttendanceById(int $staffId = null, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffAttendance::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->whereDate('attendance_date_at', $attendanceDate)
            ->first();
    }

    public function getStaffAttendancesForLeave(string $startDate, string $endDate)
    {
        return StaffAttendance::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereBetween('attendance_date_at', [$startDate, $endDate])
            ->get();
    }

    public function getStaffAttendancesByStaffId(int $staffId = null, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffAttendance::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->whereYear('attendance_date_at', date('Y'))
            ->whereJsonContains('staffs', ['staff_id' => $staffId])
            ->select(
                'id',
                'attendance_date_at',
                'attendance_time_at',
                'is_attendance_taken',
                'staffs'
            )
            ->get();
    }

    public function getTodayStaffAttendanceByStaffId (int $staffId = null, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffAttendance::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->whereDate('attendance_date_at', date('Y-m-d'))
            ->whereJsonContains('staffs', ['staff_id' => $staffId])
            ->select(
                'id',
                'attendance_date_at',
                'attendance_time_at',
                'is_attendance_taken',
                'staffs'
            )
            ->first();
    }
}
