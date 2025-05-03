<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\StudentSubject;

class StudentSubjectRepository implements IRepository, IStudentSubjectRepository
{
    public function getAll()
    {
        return StudentSubject::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getById($id)
    {
        return StudentSubject::findOrFail($id);
    }

    public function delete($id)
    {
        return StudentSubject::destroy($id);
    }

    public function create(array $arrayData)
    {
        return StudentSubject::create($arrayData);
    }

    public function updateOrCreate($checkArrayData, array $arrayData)
    {
        return StudentSubject::updateOrCreate($checkArrayData, $arrayData);
    }

    public function update($id, array $arrayData)
    {
        return StudentSubject::whereId($id)->update($arrayData);
    }

    public function updateByClassroomIdStudentIdSubjectId($classroomId, $studentId, $subjectId, array $arrayData)
    {
        return StudentSubject::where('classroom_id', $classroomId)
            ->where('student_id', $studentId)
            ->where('subject_id', $subjectId)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->update($arrayData);
    }

    public function getByClassroomIdStudentIdSubjectId($classroomId, $studentId, $subjectId)
    {
        return StudentSubject::where('classroom_id', $classroomId)
            ->where('student_id', $studentId)
            ->where('subject_id', $subjectId)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->first();
    }

    public function getActiveAll()
    {
        return StudentSubject::where('status', Status::ACTIVE->value)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }


    public function getByClassroomIdAndStudentId(int $classroomId, int $studentId)
    {
        return StudentSubject::where('school_id', getUserSchoolId())
            ->where('classroom_id', $classroomId)
            ->where('student_id', $studentId)
            ->with([
                'subject' => function ($query) {
                    $query->select(
                        'id',
                        'title'
                    );
                }
            ])
            ->select(
                'id',
                'subject_id',
            )
            ->get();
    }

    public function deleteByStudentId(int $studentId)
    {
        return StudentSubject::where('student_id', $studentId)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->delete();
    }
}
