<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\PayScale;

class PayScaleRepository implements IRepository, IPayScaleRepository
{
    public function getAll()
    {
        return PayScale::all();
    }

    public function getById($id)
    {
        return PayScale::findOrFail($id);
    }

    public function delete($id)
    {
        PayScale::destroy($id);
    }

    public function create(array $arrayData)
    {
        return PayScale::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return PayScale::whereId($id)->update($arrayData);
    }

    public function getActiveAll(int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return PayScale::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->select(
                'id',
                'title',
                'description',
                'basic_pay',
                'grade_pay',
                'earnings',
                'deductions',
                'net_salary'
            )
            ->get();
    }

    public function getRegisterAll()
    {
        return PayScale::where('status', Status::ACTIVE);
    }

    public function getPayScaleById(int $id, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return PayScale::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('id', $id)
            ->select(
                'id',
                'title',
                'description',
                'basic_pay',
                'grade_pay',
                'earnings',
                'deductions',
                'net_salary'
            )
            ->first();
    }
}
