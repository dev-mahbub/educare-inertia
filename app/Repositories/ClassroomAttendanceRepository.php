<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\OnlineAttendance;
use App\Models\ClassroomAttendance;
use App\Models\ClassroomAttendanceNote;

class ClassroomAttendanceRepository implements IRepository, IClassroomAttendanceRepository
{
    public function getAll()
    {
        return ClassroomAttendance::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getById($id)
    {
        return ClassroomAttendance::findOrFail($id);
    }

    public function delete($id)
    {
        ClassroomAttendance::destroy($id);
    }

    public function create(array $arrayData)
    {
        return ClassroomAttendance::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return ClassroomAttendance::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return ClassroomAttendance::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getAttendanceByClassroomId($classroomId, $schoolId = null, $academicYearId = null)
    {
        $query = ClassroomAttendance::query();
        $query->where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('classroom_id', $classroomId);
        return $query->get();
    }

    public function getAttendanceList($attendanceDateAt, $classroomId, $schoolId = null, $academicYearId = null)
    {
        $query = ClassroomAttendance::query();
        $query->where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->whereDate('attendance_date_at', $attendanceDateAt)
            ->where('classroom_id', $classroomId)
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId());
        return $query->get();
    }

    public function checkAlreadyAttendance($classroomId,  $attendanceDateAt)
    {
        return ClassroomAttendance::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereDate('attendance_date_at', $attendanceDateAt)
            ->where('classroom_id', $classroomId)
            ->where('academic_year_id', getAcademicYearId())
            ->first();
    }

    public function getTodayClassroomAttendance($toDay)
    {
        return ClassroomAttendance::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereDate('attendance_date_at', $toDay)
            ->where('is_attendance_taken', '=', 1)
            ->get();
    }

    public function getAttendanceByDateWise($startDate, $endDate)
    {
        return ClassroomAttendance::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereBetween('attendance_date_at', [$startDate, $endDate])
            ->where('is_attendance_taken', '=', 1)
            ->get();
    }

    public function getAttendanceByClassWiseDaily($toDay)
    {
        return ClassroomAttendance::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('is_attendance_taken', '=', 1)
            ->whereDate('attendance_date_at', $toDay)
            ->with('classroomData.className')
            ->get()
            ->groupBy('classroom_id');
    }

    public function getAttendanceByMonthWise($classroomId, $monthNo, $sessionId)
    {
        $query = ClassroomAttendance::query();
        $query->where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('classroom_id', $classroomId);
        $query->where(function ($q) use ($monthNo, $sessionId) {
            if (!empty($monthNo)) {
                $q->whereMonth('attendance_date_at', $monthNo);
            }
            if (!empty($sessionId)) {
                $q->where('academic_year_id', $sessionId);
            }
        });

        return $query->get();
    }


    public function getClassroomAttendance($date)
    {
        return ClassroomAttendance::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereDate('attendance_date_at', $date)
            ->where('is_attendance_taken', '=', 1)
            ->get();
    }


    // classroom attendance note
    public function getAllClassroomAttendanceNote()
    {
        return ClassroomAttendanceNote::all();
    }

    public function getClassroomAttendanceById($id)
    {
        return ClassroomAttendanceNote::findOrFail($id);
    }

    public function deleteClassroomAttendanceNote($id)
    {
        ClassroomAttendanceNote::destroy($id);
    }

    public function createClassroomAttendanceNote(array $arrayData)
    {
        return ClassroomAttendanceNote::create($arrayData);
    }

    public function updateClassroomAttendanceNote($id, array $arrayData)
    {
        return ClassroomAttendanceNote::whereId($id)->update($arrayData);
    }

    public function getActiveAllClassroomAttendanceNote()
    {
        return ClassroomAttendanceNote::where('status', Status::ACTIVE);
    }

    public function getRegisterAllClassroomAttendanceNote()
    {
        return ClassroomAttendanceNote::where('status', Status::ACTIVE);
    }

    public function getAttendanceBetweenDatesFromClassroomId($schoolId, $academicYearId, $classroomId, $attendanceStartAt, $attendanceEndAt)
    {
        return ClassroomAttendance::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('classroom_id', $classroomId)
            ->whereBetween('attendance_date_at', [$attendanceStartAt, $attendanceEndAt])
            ->get();
    }

    // Online Attendance

    public function getOnlineAttendance($classroomId, $subjectId, $attendanceDate, $academicYearId = null)
    {
        $academicYearId = !empty($academicYearId) ? $academicYearId : getAcademicYearId();

        return OnlineAttendance::where('status', Status::ACTIVE)
            ->where('school_id',  getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->where('classroom_id', $classroomId)
            ->where('subject_id', $subjectId)
            ->whereDate('attendance_date', $attendanceDate)
            ->select(
                'id',
                'students'
            )
            ->first();
    }

    public function updateOrCreateOnlineAttendance(array $attributesToCheck, array $valuesToUpdate)
    {
        return OnlineAttendance::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    /**
     * Get Classroom Attendance By classroom_id, school_id, academic_year_id, attendance_date_at
     */
    public function getAttendanceByClassroomIdAndDate($classroomId, $schoolId = null, $academicYearId = null)
    {
        $query = ClassroomAttendance::query();
        $query->where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('classroom_id', $classroomId)
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId());
        return $query->get();
    }
}
