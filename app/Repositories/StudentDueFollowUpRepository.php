<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\StudentDueFollowUp;
use App\Repositories\IStudentDueFollowUpRepository;

class StudentDueFollowUpRepository implements IRepository, IStudentDueFollowUpRepository
{
    public function getAll()
    {
        return StudentDueFollowUp::all();
    }

    public function getById($id)
    {
        return StudentDueFollowUp::findOrFail($id);
    }

    public function getBySchoolId($id)
    {
        return StudentDueFollowUp::where('school_id', $id)->first();
    }

    public function delete($id)
    {
        StudentDueFollowUp::destroy($id);
    }

    public function create(array $arrayData)
    {
        return StudentDueFollowUp::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return StudentDueFollowUp::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return StudentDueFollowUp::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }


    public function getByStudentId($studentId, $schoolId = null, $academicYearId = null)
    {
        return StudentDueFollowUp::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', ($academicYearId != null) ? $academicYearId : getAcademicYearId())
            ->where('student_id', $studentId)
            ->get();
    }

    public function filterStudentDueFollowUpReports($fromDate, $toDate, $classroomId = null)
    {
        return StudentDueFollowUp::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereDate('commitment_date', '>=', $fromDate)
            ->whereDate('commitment_date', '<=', $toDate)
            ->when(!empty($classroomId), function ($query) use ($classroomId) {
                $query->whereHas('student', function ($query) use ($classroomId) {
                    $query->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                        $query->where('classroom_students.academic_year_id', getAcademicYearId())
                            ->where('classroom_students.classroom_id', $classroomId);
                    });
                });
            })
            ->with(['student' => function ($query) {
                $query->select(
                    'id',
                    'classroom_id',
                    'admission_no',
                    'first_name',
                    'middle_name',
                    'last_name',
                )->with([
                    'classroom:id,title',
                    'promotedClassroom',
                    'father:id,student_id,first_name,middle_name,last_name,phone'
                ]);
            }])
            ->get();
    }
}
