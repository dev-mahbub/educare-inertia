<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\ExamDate;
use App\Models\Classroom;
use App\Models\ClassroomSubject;

class ExamDateRepository implements IRepository, IExamDateRepository
{
    public function getAll()
    {
        return ExamDate::where(
            [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
            ]
        )->get();
    }

    public function getById($id)
    {
        return ExamDate::findOrFail($id);
    }

    public function delete($id)
    {
        return ExamDate::destroy($id);
    }

    public function create(array $arrayData)
    {
        return ExamDate::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return ExamDate::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return ExamDate::where(
            [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
            ]
        )->get();
    }

    public function getRegisterAll()
    {
        return ExamDate::where('status', Status::ACTIVE);
    }

    public function updateOrCreate($attributesToCheck, $valuesToUpdate)
    {
        return ExamDate::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function getExamDateDataByExamIdAndClassroomIds(array $classroomIds)
    {
        $result = ClassroomSubject::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->whereIn('classroom_id', $classroomIds)
            ->with(['subject', 'examDate'])
            ->get();
        return $result;
    }

    public function getExamDateExamIdAndClassNameId($class_name_id, $exam_id)
    {
        $result = ClassroomSubject::where('classroom_subjects.status', Status::ACTIVE)
            ->where('classroom_subjects.school_id', getUserSchoolId())
            ->where('classroom_subjects.academic_year_id', getAcademicYearId())
            ->join('classrooms', function ($join) use ($class_name_id) {
                $join->on('classrooms.id', '=', 'classroom_subjects.classroom_id')
                    ->where('classrooms.class_name_id', $class_name_id);
            })
            ->with(
                [
                    'subject',
                    'examDate' => function ($query) use ($class_name_id, $exam_id) {
                        $query->where('exam_dates.class_name_id', $class_name_id)
                            ->where('exam_dates.exam_id', $exam_id);
                    }
                ]
            )
            ->select(
                'classroom_subjects.*',
                'classrooms.section_title as classroom_section_title'
            )
            ->get();

        return $result;
    }
}
