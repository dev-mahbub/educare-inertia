<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\WorkingBonusDayClass;
use App\Models\WorkingBonusDayClassroom;
use App\Models\WorkingBonusDayStudent;

class WorkingBonusDayRepository implements IRepository, IWorkingBonusDayRepository
{
    public function getAll()
    {
        return WorkingBonusDayClass::all()->latest()->get();
    }

    public function getById($id)
    {
        return WorkingBonusDayClass::findOrFail($id);
    }

    public function delete($id)
    {
        WorkingBonusDayClass::destroy($id);
    }

    public function create(array $arrayData)
    {
        return WorkingBonusDayClass::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return WorkingBonusDayClass::whereId($id)
            ->update($arrayData);
    }

    public function getActiveAll()
    {
        return WorkingBonusDayClass::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function getByMonthYear($monthId, $yearId)
    {
        return WorkingBonusDayClass::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('month_id', $monthId)
            ->where('academic_year_id', $yearId)
            ->latest()
            ->get();
    }

    public function getDataByClassNameYearMonth($academicYearId, $monthId, $classNameId)
    {
        return WorkingBonusDayClass::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->where('month_id', $monthId)
            ->where('class_name_id', $classNameId)
            ->first();
    }


    // WorkingBonusDayClassroom

    public function getAllWorkingBonusDayClassroomByClassId($workingClassId)
    {
        return WorkingBonusDayClassroom::where('working_bonus_day_class_id', $workingClassId)->get();
    }

    public function getAllWorkingBonusDayClassroom()
    {
        return WorkingBonusDayClassroom::all()->latest()->get();
    }

    public function createWorkingBonusDayClassroom(array $arrayData)
    {
        return WorkingBonusDayClassroom::create($arrayData);
    }

    public function updateWorkingBonusDayClassroom($id, array $arrayData)
    {
        return WorkingBonusDayClassroom::whereId($id)
            ->update($arrayData);
    }

    public function getActiveAllWorkingBonusDayClassroom()
    {
        return WorkingBonusDayClassroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }

    public function updateOrCreateWorkingBonusDayClassroom(array $condition, array $arrayData)
    {
        return WorkingBonusDayClassroom::updateOrCreate($condition, $arrayData);
    }

    public function getWorkingClassroomByMonthYearClassId($monthId, $yearId, $class_id)
    {
        return WorkingBonusDayClassroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('month_id', $monthId)
            ->where('academic_year_id', $yearId)
            ->where('class_name_id', $class_id)
            ->latest()
            ->get();
    }



    // WorkingBonusDayStudent
    public function getByMonthYearClassNameClassroom($monthId, $yearId, $classNameId, $classroomId)
    {
        return WorkingBonusDayStudent::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('month_id', $monthId)
            ->where('academic_year_id', $yearId)
            ->where('class_name_id', $classNameId)
            ->where('classroom_id', $classroomId)
            ->latest()
            ->get();
    }

    public function getByMonthClassroomStudentId($monthId, $classroomId, $studentId)
    {
        return WorkingBonusDayStudent::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('month_id', $monthId)
            ->where('classroom_id', $classroomId)
            ->where('student_id', $studentId)
            ->first();
    }

    public function getAllWorkingBonusDayStudent()
    {
        return WorkingBonusDayStudent::all()->latest()->get();
    }

    public function createWorkingBonusDayStudent(array $arrayData)
    {
        return WorkingBonusDayStudent::create($arrayData);
    }

    public function updateOrCreateWorkingBonusDayStudent(array $condition, array $arrayData)
    {
        return WorkingBonusDayStudent::updateOrCreate($condition, $arrayData);
    }

    public function updateWorkingBonusDayStudent($id, array $arrayData)
    {
        return WorkingBonusDayStudent::whereId($id)
            ->update($arrayData);
    }

    public function getActiveAllWorkingBonusDayStudent()
    {
        return WorkingBonusDayStudent::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->latest()
            ->get();
    }
}
