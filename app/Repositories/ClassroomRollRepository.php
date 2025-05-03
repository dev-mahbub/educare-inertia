<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\ClassName;
use App\Models\ClassroomRoll;
use App\Models\Subject;
use App\Models\Section;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\DB;

class ClassroomRollRepository implements IRepository, IClassroomRollRepository
{
    public function getAll()
    {
        return ClassroomRoll::all()->latest()->get();
    }

    public function getById($id)
    {
        return ClassroomRoll::findOrFail($id);
    }

    public function delete($id)
    {
        ClassroomRoll::destroy($id);
    }

    public function create(array $arrayData)
    {
        return ClassroomRoll::create($arrayData);
    }

    public function updateOrCreate(array $arrayData, array $checkArray)
    {
        return ClassroomRoll::updateOrCreate($checkArray, $arrayData);
    }

    public function update($id, array $arrayData)
    {
        return ClassroomRoll::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return ClassroomRoll::with('subject')
            ->where('status', Status::ACTIVE)
            ->get();
    }

    public function getRollsFromClassroomId(int $id)
    {
        return ClassroomRoll::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('classroom_id', '=', $id)
            ->where('status', Status::ACTIVE)
            ->select('roll_no', 'student_id')
            ->distinct()
            ->get();
    }
}
