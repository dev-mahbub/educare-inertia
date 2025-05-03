<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\ExamAttendance;

class ExamAttendanceRepository implements IRepository, IExamAttendanceRepository
{
    public function getAll()
    {
        return ExamAttendance::where(
            [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
            ]
        )->get();
    }

    public function getActiveAll()
    {
        return ExamAttendance::where(
            [
                'status' => Status::ACTIVE->value,
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
            ]
        )->get();
    }

    public function getById($id)
    {
        return ExamAttendance::findOrFail($id);
    }

    public function delete($id)
    {
        return ExamAttendance::destroy($id);
    }

    public function create(array $arrayData)
    {
        return ExamAttendance::create($arrayData);
    }

    public function updateOrCreate($attributesToCheck, $valuesToUpdate)
    {
        return ExamAttendance::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function update($id, array $arrayData)
    {
        return ExamAttendance::whereId($id)->update($arrayData);
    }
}
