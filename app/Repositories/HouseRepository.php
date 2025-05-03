<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\House;
use App\Models\Student;

class HouseRepository implements IRepository, IHouseRepository
{
    public function getAll()
    {
        return House::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getById($id)
    {
        return House::findOrFail($id);
    }

    public function delete($id)
    {
        House::destroy($id);
    }

    public function create(array $arrayData)
    {
        return House::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return House::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return House::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return House::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()->get();
    }

    public function getActiveNameAndId($schoolId = null)
    {
        return House::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->select('id', 'name')
            ->orderBy('name')
            ->get();
    }

    public function getActiveNameAndId_wait()
    {
        return House::where('student_houses.school_id', getUserSchoolId())
            ->where('student_houses.academic_year_id', getAcademicYearId())
            ->join('student_houses', 'houses.id', '=', 'student_houses.house_id')
            ->select('houses.id', 'houses.name')
            ->orderBy('houses.name')
            ->get();
    }

    public function getHouseWiseStudent()
    {
        $houses = House::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'name')
            ->get();

        return $houses?->map(function ($house) {
            $students = Student::where('status', Status::ACTIVE)
                ->where('school_id', getUserSchoolId())
                ->whereHas('classroomPromotedStudents', function ($query) {
                    $query->where('classroom_students.academic_year_id', getAcademicYearId());
                })
                ->whereHas('student_house', function ($query) use ($house) {
                    $query->where('house_id', $house->id)
                        ->where('academic_year_id', getAcademicYearId());
                })
                ->select('id')
                ->get();

            $house['students_count'] = count($students);

            return $house;
        });
    }

    public function getHouseWiseStudent_Old()
    {
        return House::where('student_houses.school_id', getUserSchoolId())
            ->where('student_houses.academic_year_id', getAcademicYearId())
            ->join('student_houses', 'houses.id', '=', 'student_houses.house_id')
            ->with('students')
            ->withCount('students')
            ->get();
    }

    public function getByName($name)
    {
        return House::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('name', $name)
            ->select('id', 'name')
            ->first();
    }
}
