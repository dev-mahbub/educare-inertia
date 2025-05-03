<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\PaymentMonth;

class PaymentMonthRepository implements IRepository, IPaymentMonthRepository
{
    public function getAll()
    {
        return PaymentMonth::all();
    }

    public function getById($id)
    {
        return PaymentMonth::findOrFail($id);
    }

    public function delete($id)
    {
        PaymentMonth::destroy($id);
    }

    public function create(array $arrayData)
    {
        return PaymentMonth::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return PaymentMonth::whereId($id)->update($arrayData);
    }

    public function getActiveAll(int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return PaymentMonth::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->select(
                'id',
                'title',
                'start_date',
                'end_date'
            )
            ->get();
    }

    public function getRegisterAll()
    {
        return PaymentMonth::where('status', Status::ACTIVE);
    }

    public function getPaymentMonthById(int $id, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return PaymentMonth::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->where('id', $id)
            ->select(
                'id',
                'title',
                'start_date',
                'end_date'
            )
            ->first();
    }

    public function getPaymentMonthsByIds(array $ids, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return PaymentMonth::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->whereIn('id', $ids)
            ->select(
                'id',
                'title',
                'start_date',
                'end_date'
            )
            ->get();
    }
}
