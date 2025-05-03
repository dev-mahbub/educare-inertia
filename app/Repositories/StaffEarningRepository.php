<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\StaffEarning;

class StaffEarningRepository implements IRepository, IStaffEarningRepository
{
    public function getAll()
    {
        return StaffEarning::all();
    }

    public function getById($id)
    {
        return StaffEarning::findOrFail($id);
    }

    public function delete($id)
    {
        StaffEarning::destroy($id);
    }

    public function create(array $arrayData)
    {
        return StaffEarning::create($arrayData);
    }

    public function updateOrCreate(array $attributesToCheck, array $valuesToUpdate)
    {
        return StaffEarning::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function update($id, array $arrayData)
    {
        return StaffEarning::whereId($id)->update($arrayData);
    }

    public function updateByStaffId(int $staffId, array $arrayData, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return StaffEarning::where('school_id', $schoolId)
            ->where('staff_id', $staffId)
            ->update($arrayData);
    }

    public function getActiveAll(int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return StaffEarning::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->select(
                'id',
                'staff_id',
                'pay_scale_id',
                'basic_pay',
                'grade_pay',
                'earnings',
                'deductions',
                'net_salary',
                'updated_at'
            )
            ->with([
                'staff:id,first_name,middle_name,last_name,employee_id,uan,pf_account_number,bank_name,bank_account_no'
            ])
            ->get();
    }

    public function getRegisterAll()
    {
        return StaffEarning::where('status', Status::ACTIVE);
    }

    public function getStaffEarningById(int $id, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return StaffEarning::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('id', $id)
            ->select(
                'id',
                'staff_id',
                'pay_scale_id',
                'basic_pay',
                'grade_pay',
                'earnings',
                'deductions',
                'net_salary'
            )
            ->first();
    }

    public function getStaffEarningByStaffId(int $staffId, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return StaffEarning::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('staff_id', $staffId)
            ->select(
                'id',
                'staff_id',
                'pay_scale_id',
                'basic_pay',
                'grade_pay',
                'earnings',
                'deductions',
                'net_salary'
            )
            ->first();
    }

    public function getStaffEarningsForBulkProcess(int $paymentMonthId = null, int $staffCategoryId = null, int $staffSubCategoryId = null, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return StaffEarning::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->whereHas('staff', function ($query) use ($staffCategoryId, $staffSubCategoryId) {
                $query->where('status', Status::ACTIVE)
                    ->where(function ($query) use ($staffCategoryId, $staffSubCategoryId) {
                        if (!empty($staffCategoryId)) {
                            $query->where('staff_category_id', $staffCategoryId);
                        }

                        if (!empty($staffSubCategoryId)) {
                            $query->where('staff_sub_category_id', $staffSubCategoryId);
                        }
                    });
            })
            ->select(
                'id',
                'staff_id',
                'basic_pay',
                'grade_pay',
                'net_salary',
                'earnings',
                'deductions'
            )
            ->with([
                'staff' => function ($query) use ($paymentMonthId) {
                    $query->select(
                        'id',
                        'employee_id',
                        'first_name',
                        'middle_name',
                        'last_name'
                    )->withCount([
                        'staffSalaryPayments' => function ($query) use ($paymentMonthId) {
                            $query->where('is_canceled', false)
                                ->where('payment_month_id', $paymentMonthId);
                        }
                    ]);
                }
            ])
            ->get();
    }

    public function getActiveStaffEarningsForImport(int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return StaffEarning::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->whereHas('staff', function ($query) {
                $query->where('status', Status::ACTIVE);
            })
            ->select(
                'id',
                'staff_id',
                'pay_scale_id',
                'basic_pay',
                'grade_pay',
                'earnings',
                'deductions',
                'net_salary',
            )
            ->with([
                'staff:id,first_name,middle_name,last_name,employee_id',
                'payScale:id,title'
            ])
            ->get();
    }
}
