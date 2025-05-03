<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\HostelStaffAllocation;

class HostelStaffRepository implements IRepository, IHostelStaffRepository
{
    public function getAll()
    {
        return HostelStaffAllocation::where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getAllActiveHostelStaff()
    {
        return HostelStaffAllocation::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE->value)
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getAllActiveHostelStaffByHostelInfraId($hostelInfraLevelId)
    {
        return HostelStaffAllocation::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE->value)
            ->where('academic_year_id', getAcademicYearId())
            ->where('hostel_infra_level_id', $hostelInfraLevelId)
            ->get();
    }

    public function getById($id)
    {
        return HostelStaffAllocation::findOrFail($id);
    }

    public function delete($id)
    {
        return HostelStaffAllocation::destroy($id);
    }

    public function create(array $arrayData)
    {
        return HostelStaffAllocation::create($arrayData);
    }

    public function updateOrCreate(array $conditionData, array $arrayData)
    {
        return HostelStaffAllocation::updateOrCreate($conditionData, $arrayData);
    }

    public function update($id, array $arrayData)
    {
        return HostelStaffAllocation::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return HostelStaffAllocation::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }
}
