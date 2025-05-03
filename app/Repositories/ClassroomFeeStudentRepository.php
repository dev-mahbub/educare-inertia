<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\ClassroomFeeStudent;
use App\Repositories\IClassroomFeeStudentRepository;

class ClassroomFeeStudentRepository implements IRepository, IClassroomFeeStudentRepository
{
    public function getAll()
    {
        return ClassroomFeeStudent::all();
    }

    public function getById($id)
    {
        return ClassroomFeeStudent::findOrFail($id);
    }

    public function delete($id)
    {
        ClassroomFeeStudent::destroy($id);
    }

    public function create(array $arrayData)
    {
        return ClassroomFeeStudent::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return ClassroomFeeStudent::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return ClassroomFeeStudent::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getRegisterAll()
    {
        return ClassroomFeeStudent::where('status', Status::ACTIVE);
    }


    public function checkClassroomStudentFee($studentId, $feeId)
    {
        return ClassroomFeeStudent::where('student_id', $studentId)
            ->where('fee_id', $feeId)
            ->exists();
    }
}
