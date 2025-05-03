<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\StaffSalaryIncrement;

class StaffSalaryIncrementRepository implements IRepository, IStaffSalaryIncrementRepository
{
    public function getAll()
    {
        return StaffSalaryIncrement::all();
    }

    public function getById($id)
    {
        return StaffSalaryIncrement::findOrFail($id);
    }

    public function delete($id)
    {
        StaffSalaryIncrement::destroy($id);
    }

    public function create(array $arrayData)
    {
        return StaffSalaryIncrement::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return StaffSalaryIncrement::whereId($id)->update($arrayData);
    }

    public function getActiveAll(int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return StaffSalaryIncrement::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->select(
                'id',
                'staff_id',
                'basic_amount',
                'earnings',
                'increment_date',
                'increment_note',
                'increment_status'
            )
            ->get();
    }

    public function getRegisterAll()
    {
        return StaffSalaryIncrement::where('status', Status::ACTIVE);
    }

    public function getStaffSalaryIncrementById(int $id, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return StaffSalaryIncrement::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('id', $id)
            ->select(
                'id',
                'staff_id',
                'basic_amount',
                'earnings',
                'increment_date',
                'increment_note',
                'increment_status'
            )
            ->first();
    }

    public function getStaffSalaryIncrementsByStaffId(int $staffId, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return StaffSalaryIncrement::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('staff_id', $staffId)
            ->select(
                'id',
                'staff_id',
                'basic_amount',
                'earnings',
                'increment_date',
                'increment_note',
                'increment_status'
            )
            ->get();
    }

    public function getStaffSalaryIncrementByStaffIdAndIncrementDate(int $staffId, string $startDate, string $endDate, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return StaffSalaryIncrement::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('staff_id', $staffId)
            ->whereDate('increment_date', '>=', $startDate)
            ->whereDate('increment_date', '<=', $endDate)
            ->select(
                'id',
                'staff_id',
                'basic_amount',
                'earnings',
                'increment_date',
                'increment_note',
                'increment_status'
            )
            ->latest()
            ->first();
    }
}
