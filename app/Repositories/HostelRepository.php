<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\HostelRequest;
use App\Models\HostelStudentAllocation;

class HostelRepository implements IRepository, IHostelRepository
{
    public function getAll()
    {
        return HostelStudentAllocation::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('is_current', 1)
            ->get();
    }

    public function getByHostelRoomId($roomId)
    {
        return HostelStudentAllocation::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('is_current', 1)
            ->where('room_id', $roomId)
            ->get();
    }

    public function getCountByHostelRoomId($roomId)
    {
        return HostelStudentAllocation::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('is_current', 1)
            ->where('room_id', $roomId)
            ->count();
    }

    public function getById($id)
    {
        return HostelStudentAllocation::findOrFail($id);
    }

    public function getByHostelInfraLevelId($infraLevelId)
    {
        return HostelStudentAllocation::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('hostel_infra_level_id', $infraLevelId)
            ->where('is_current', 1)
            ->first();
    }

    public function getByClassroomId($classroomId)
    {
        return HostelStudentAllocation::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('classroom_id', $classroomId)
            ->get();
    }

    public function getCurrentAllocationByStudentId($studentId)
    {
        return HostelStudentAllocation::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('student_id', $studentId)
            ->where('is_current', 1)
            ->first();
    }

    public function getCurrentStudentByClassroomId($classroomId)
    {
        return HostelStudentAllocation::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('classroom_id', $classroomId)
            ->where('is_current', 1)
            ->get();
    }

    public function getPreviousAllocationByClassroomId($classroomId)
    {
        return HostelStudentAllocation::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('classroom_id', $classroomId)
            ->where('is_current', 0)
            ->get();
    }

    public function getPreviousAllocationByStudentId($studentId)
    {
        return HostelStudentAllocation::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('student_id', $studentId)
            ->where('is_current', 0)
            ->get();
    }

    public function getPreviousAllocation()
    {
        return HostelStudentAllocation::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('is_current', 0)
            ->get();
    }

    public function delete($id)
    {
        return HostelStudentAllocation::destroy($id);
    }

    public function create(array $arrayData)
    {
        return HostelStudentAllocation::create($arrayData);
    }

    public function updateOrCreate(array $conditionData, array $arrayData)
    {
        return HostelStudentAllocation::updateOrCreate($conditionData, $arrayData);
    }

    public function update($id, array $arrayData)
    {
        return HostelStudentAllocation::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return HostelStudentAllocation::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('is_current', 1)
            ->get();
    }

    public function getHostelRequestByStudentId($studentId)
    {
        return HostelRequest::with(['student' => function ($query) {
                $query->select('id', 'first_name', 'middle_name', 'last_name');
            }])->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('student_id', $studentId)
            ->select(
                'id',
                'student_id',
                'hostel_type',
                'note',
                'applied_date',
                'start_date',
            )
            ->get();
    }

    public function createStudentHostel(array $arrayData)
    {
        return HostelRequest::create($arrayData);
    }
}
