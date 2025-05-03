<?php

namespace App\Repositories;

use App\Enums\StaffRoleType;
use App\Enums\Status;
use App\Models\Staff;

class TeacherRepository implements IRepository, ITeacherRepository
{
    public function getAll()
    {
        return Staff::where('status', Status::ACTIVE)
            ->where('user_roll_type', StaffRoleType::TEACHER)
            ->get();
    }

    public function getById($id)
    {
        return Staff::findOrFail($id);
    }

    public function getByIds(array $ids)
    {
        return Staff::whereIn('id', $ids)->get();
    }

    public function delete($id)
    {
        return Staff::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Staff::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Staff::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Staff::where('staff.status', Status::ACTIVE)
            ->where('staff.school_id', getUserSchoolId())
            ->where('staff.user_roll_type', StaffRoleType::TEACHER)
            ->leftJoin('departments', 'staff.department_id', '=', 'departments.id')
            ->leftJoin('designations', 'staff.designation_id', '=', 'designations.id')
            ->orderBy('staff.first_name', 'ASC')
            ->select('staff.*', 'departments.name as department_name', 'designations.name as designation_name')
            ->get();
    }

    public function getActiveTeachersAll()
    {
        return Staff::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('user_roll_type', StaffRoleType::TEACHER)
            ->where('user_id', '!=', auth()->user()->id)
            ->select(
                'id',
                'user_id',
                'first_name',
                'middle_name',
                'last_name',
            )
            ->orderBy('first_name', 'ASC')
            ->get();
    }

    public function getRegisterAll()
    {
        return Staff::where('status', Status::ACTIVE)
            ->where('user_roll_type', StaffRoleType::TEACHER)
            ->get();
    }

    public function getBirthDateWiseTeachers(string $birthDate = "")
    {
        return Staff::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('user_roll_type', StaffRoleType::TEACHER)
            ->whereDate('birth_date_at', $birthDate)
            ->select(
                'id',
                'first_name',
                'middle_name',
                'last_name',
                'birth_date_at',
                'phone',
            )
            ->get();
    }
}
