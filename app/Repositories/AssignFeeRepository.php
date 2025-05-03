<?php

namespace App\Repositories;

use App\Enums\PaymentStatus;
use App\Enums\Status;
use App\Models\Student;
use App\Models\ClassroomFee;
use App\Models\ClassroomFeeType;
use App\Models\ClassroomFeeStudent;
use App\Repositories\IAssignFeeRepository;

class AssignFeeRepository implements IRepository, IAssignFeeRepository
{
    public function getAll()
    {
        return ClassroomFee::all();
    }

    public function getById($id)
    {
        return ClassroomFee::findOrFail($id);
    }

    public function delete($id)
    {
        ClassroomFee::destroy($id);
    }

    public function create(array $arrayData)
    {
        return ClassroomFee::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return ClassroomFee::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return ClassroomFee::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getRegisterAll()
    {
        return ClassroomFee::where('status', Status::ACTIVE);
    }

    public function saveClassroomFeeType(array $arrayData)
    {
        return ClassroomFeeType::create($arrayData);
    }

    public function saveClassroomFeeStudent(array $arrayData)
    {
        return ClassroomFeeStudent::create($arrayData);
    }

    public function getSpecialFeeAssignedStudentsAll($feeTypeId, $classroomId = null)
    {
        return Student::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->whereHas('classroomPromotedStudents', function ($query) use ($classroomId) {
                $query->where('classroom_students.academic_year_id', getAcademicYearId());
                if (!empty($classroomId)) {
                    $query->where('classroom_students.classroom_id', $classroomId);
                }
            })
            ->whereHas('classroom_fee_student_amounts', function ($query) use ($feeTypeId) {
                $query->where('fee_type_id', $feeTypeId)
                    ->where('is_fee_special', 1);
            })
            ->with(['classroom_fee_student_amounts' => function ($query) use ($feeTypeId) {
                $query->where('fee_type_id', $feeTypeId)
                    ->where('is_fee_special', 1)
                    ->with(['fee', 'feeType', 'payment' => function ($query) {
                        // $query->where('payment_status', '!=', PaymentStatus::CANCELLED);
                    }])->latest();
            }, 'classroom'])->latest()->get();
    }
}
