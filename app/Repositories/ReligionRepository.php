<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Student;
use App\Models\Religion;

class ReligionRepository implements IRepository, IReligionRepository
{
    public function getAll()
    {
        return Religion::all()->latest()->get();
    }

    public function getById($id)
    {
        return Religion::findOrFail($id);
    }

    public function delete($id)
    {
        Religion::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Religion::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Religion::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Religion::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return Religion::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getActiveNameAndId($schoolId = null)
    {
        return Religion::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->select('id', 'name')->latest()->get();
    }

    public function getReligionWiseStudent()
    {
        $religions = Religion::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'name')
            ->get();

        return $religions?->map(function ($religion) {
            $students = Student::where('status', Status::ACTIVE)
                ->where('school_id', getUserSchoolId())
                ->whereHas('classroomPromotedStudents', function ($query) {
                    $query->where('classroom_students.academic_year_id', getAcademicYearId());
                })
                ->where('religion', $religion->id)
                ->select('id')
                ->get();

            $religion['students_count'] = count($students);

            return $religion;
        });

        // return Religion::where('status', Status::ACTIVE)
        //     ->where('school_id', getUserSchoolId())
        //     ->select('id', 'name')
        //     ->withCount(['students' => function ($query) {
        //         $query->whereHas('classroomPromotedStudents', function ($query) {
        //             $query->where('classroom_students.academic_year_id', getAcademicYearId());
        //         });
        //     }])
        //     ->get();
    }
}
