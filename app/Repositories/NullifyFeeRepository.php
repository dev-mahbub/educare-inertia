<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\NullifyFee;
use App\Models\NullifyFeeAmount;
use App\Repositories\INullifyFeeRepository;

class NullifyFeeRepository implements IRepository, INullifyFeeRepository
{
    public function getAll()
    {
        return NullifyFee::all();
    }

    public function getById($id)
    {
        return NullifyFee::findOrFail($id);
    }

    public function getBySchoolId($id)
    {
        return NullifyFee::where('school_id', $id)->first();
    }

    public function delete($id)
    {
        NullifyFee::destroy($id);
    }

    public function create(array $arrayData)
    {
        return NullifyFee::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return NullifyFee::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return NullifyFee::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->with(['student' => function ($query) {
                $query->with(['classroom' => function ($query) {
                    $query->select('classrooms.id', 'classrooms.title');
                }, 'promotedClassroom' => function ($query) {
                    $query->select('classrooms.id', 'classrooms.title');
                }])->select('students.id', 'admission_no', 'classroom_id', 'first_name', 'middle_name', 'last_name');
            }, 'nullify_fee_amounts.feeType'])
            ->orderBy('nullify_date', 'ASC')
            ->get();
    }

    public function createNullifyFeeAmount(array $arrayData)
    {
        return NullifyFeeAmount::create($arrayData);
    }


    public function getNullifiedFeesByStudentId(int $studentId)
    {
        return NullifyFee::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('student_id', $studentId)
            ->with(['nullify_fee_amounts' => function ($query) {
                $query->with(['fee:id,title,is_admission_install', 'feeType:id,fee_type,is_fee_special']);
            }])
            ->get();
    }
}
