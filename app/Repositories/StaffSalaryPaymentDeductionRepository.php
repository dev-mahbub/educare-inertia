<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\StaffSalaryPaymentDeduction;

class StaffSalaryPaymentDeductionRepository implements IRepository, IStaffSalaryPaymentDeductionRepository
{
    public function getAll()
    {
        return StaffSalaryPaymentDeduction::all();
    }

    public function getById($id)
    {
        return StaffSalaryPaymentDeduction::findOrFail($id);
    }

    public function delete($id)
    {
        StaffSalaryPaymentDeduction::destroy($id);
    }

    public function create(array $arrayData)
    {
        return StaffSalaryPaymentDeduction::create($arrayData);
    }

    public function insert(array $arrayData)
    {
        return StaffSalaryPaymentDeduction::insert($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return StaffSalaryPaymentDeduction::whereId($id)->update($arrayData);
    }

    public function getActiveAll(int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return StaffSalaryPaymentDeduction::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('academic_year_id', $academicYearId)
            ->select(
                'id',
                'staff_salary_payment_id',
                'deduction_type_id',
                'amount',
            )
            ->get();
    }

    public function getRegisterAll()
    {
        return StaffSalaryPaymentDeduction::where('status', Status::ACTIVE);
    }
}
