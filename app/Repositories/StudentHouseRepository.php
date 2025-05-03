<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\StudentHouse;

class StudentHouseRepository implements IRepository, IStudentHouseRepository
{
    public function getAll()
    {
        return StudentHouse::where('houses.status', Status::ACTIVE)
            ->join('houses', 'houses.id', '=', 'student_houses.house_id')
            ->where('student_houses.school_id', getUserSchoolId())
            ->where('student_houses.academic_year_id', getAcademicYearId())
            ->latest()
            ->get();
    }

    public function getById($id)
    {
        return StudentHouse::findOrFail($id);
    }

    public function delete($id)
    {
        StudentHouse::destroy($id);
    }

    public function create(array $arrayData)
    {
        return StudentHouse::create($arrayData);
    }

    public function updateOrCreate(array $attributesToCheck, array $valuesToUpdate)
    {
        return StudentHouse::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function update($id, array $arrayData)
    {
        return StudentHouse::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return StudentHouse::where('houses.status', Status::ACTIVE)
            ->join('houses', 'houses.id', '=', 'student_houses.house_id')
            ->where('student_houses.school_id', getUserSchoolId())
            ->where('student_houses.academic_year_id', getAcademicYearId())
            ->latest()
            ->get();
    }

    public function getRegisterAll()
    {
        return StudentHouse::where('houses.status', Status::ACTIVE)
            ->join('houses', 'houses.id', '=', 'student_houses.house_id')
            ->where('student_houses.school_id', getUserSchoolId())
            ->where('student_houses.academic_year_id', getAcademicYearId())
            ->latest()
            ->get();
    }

    public function getByStudentId($id)
    {
        return StudentHouse::where('student_houses.student_id', $id)
            ->join('houses', 'houses.id', '=', 'student_houses.house_id')
            ->where('student_houses.academic_year_id', getAcademicYearId())
            ->first();
    }

    public function geStudenttHouseWise()
    {
        return StudentHouse::where('student_houses.school_id', getUserSchoolId())
            ->join('houses', 'houses.id', '=', 'student_houses.house_id')
            ->where('student_houses.academic_year_id', getAcademicYearId())
            ->with('students')
            ->withCount('students')
            ->get();
    }
}
