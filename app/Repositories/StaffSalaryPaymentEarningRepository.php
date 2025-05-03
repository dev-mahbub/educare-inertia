<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\StaffSalaryPaymentEarning;

class StaffSalaryPaymentEarningRepository implements IRepository, IStaffSalaryPaymentEarningRepository
{
    public function getAll()
    {
        return StaffSalaryPaymentEarning::all();
    }

    public function getById($id)
    {
        return StaffSalaryPaymentEarning::findOrFail($id);
    }

    public function delete($id)
    {
        StaffSalaryPaymentEarning::destroy($id);
    }

    public function create(array $arrayData)
    {
        return StaffSalaryPaymentEarning::create($arrayData);
    }

    public function insert(array $arrayData)
    {
        return StaffSalaryPaymentEarning::insert($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return StaffSalaryPaymentEarning::whereId($id)->update($arrayData);
    }

    public function getActiveAll(int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffSalaryPaymentEarning::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->select(
                'id',
                'staff_salary_payment_id',
                'earning_type_id',
                'amount',
            )
            ->get();
    }

    public function getRegisterAll()
    {
        return StaffSalaryPaymentEarning::where('status', Status::ACTIVE);
    }
}
