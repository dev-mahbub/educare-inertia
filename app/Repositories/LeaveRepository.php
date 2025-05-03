<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\Leave;
use App\Models\LeaveType;
use App\Enums\LeaveStatus;
use App\Models\LeaveSetting;
use App\Models\LeaveApprover;
use App\Models\StaffLeaveSetting;
use App\Models\StaffLeaveAllocation;

class LeaveRepository implements IRepository, ILeaveRepository
{
    public function getAll()
    {
        return Leave::all();
    }

    public function getById($id)
    {
        return Leave::findOrFail($id);
    }

    public function delete($id)
    {
        return Leave::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Leave::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Leave::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Leave::where('status', Status::ACTIVE);
    }

    public function getLeaveBySearch($type = null, $schoolId = null)
    {
        return Leave::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->when(!empty($type), function ($query) use ($type) {
                $query->where('leave_type', $type);
            })
            ->get();
    }

    public function getStudentLeaveBySearch($type = null, $userId, $schoolId = null, $isApproved, $isCancelled)
    {
        return Leave::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('user_id', $userId)
            ->when(!empty($isApproved), function ($query) use ($isApproved) {
                $query->where('is_approved',  $isApproved);
            })
            ->when(!empty($isCancelled), function ($query) use ($isCancelled) {
                $query->where('is_cancelled', $isCancelled);
            })
            ->when(!empty($type), function ($query) use ($type) {
                $query->where('leave_type', $type);
            })
            ->get();
    }

    public function getRegisterAll()
    {
        return Leave::where('status', Status::ACTIVE);
    }

    public function getFilteredLeaves(string $leaveStatus = "", string $month = "")
    {
        return Leave::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->when(!empty($leaveStatus), function ($query) use ($leaveStatus) {
                if ($leaveStatus == LeaveStatus::APPROVED->value) {
                    $query->where('is_approved', true);
                }

                if ($leaveStatus == LeaveStatus::CANCELED->value) {
                    $query->where('is_cancelled', true);
                }

                if ($leaveStatus == LeaveStatus::PENDING->value) {
                    $query->where('is_cancelled', false)
                        ->where('is_approved', false);
                }
            })
            ->when(!empty($month), function ($query) use ($month) {
                $query->whereMonth('created_at', $month);
            })
            ->with([
                'cancelledBy' => function ($query) {
                    $query->select(
                        'id',
                        'first_name',
                        'middle_name',
                        'last_name'
                    );
                },
                'approvedBy' => function ($query) {
                    $query->select(
                        'id',
                        'first_name',
                        'middle_name',
                        'last_name'
                    );
                },
                'staff' => function ($query) {
                    $query->select(
                        'id',
                        'first_name',
                        'middle_name',
                        'last_name',
                        'user_id'
                    );
                },
                'leaveType' => function ($query) {
                    $query->select(
                        'id',
                        'title',
                        'acronym',
                    );
                }
            ])
            ->select(
                'id',
                'end_date_at',
                'start_date_at',
                'staff_id',
                'leave_type_id',
                'cancelled_by',
                'format_no',
                'no_of_days',
                'leave_days',
                'description',
                'is_approved',
                'is_cancelled',
                'approved_by',
                'created_at'
            )
            ->get();
    }

    public function getLeaveById(int $id)
    {
        return Leave::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->first();
    }

    public function getApprovedLeavesByStaffId(int $staffId, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return Leave::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('staff_id', $staffId)
            ->where('is_cancelled', false)
            ->where('is_approved', true)
            ->with([
                'leaveType' => function ($query) {
                    $query->select(
                        'id',
                        'title',
                        'acronym',
                    );
                }
            ])
            ->select(
                'id',
                'end_date_at',
                'start_date_at',
                'leave_type_id',
                'no_of_days',
                'leave_days',
            )
            ->get();
    }

    public function getApprovedLeavesByStaffIdAndLeaveTypeIds(int $staffId, array $leaveTypeIds, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return Leave::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('staff_id', $staffId)
            ->whereIn('leave_type_id', $leaveTypeIds)
            ->where('is_cancelled', false)
            ->where('is_approved', true)
            ->with([
                'leaveType' => function ($query) {
                    $query->select(
                        'id',
                        'title',
                        'acronym',
                    );
                }
            ])
            ->select(
                'id',
                'end_date_at',
                'start_date_at',
                'leave_type_id',
                'no_of_days',
                'leave_days',
            )
            ->get();
    }


    // leave type

    public function createLeaveType(array $arrayData)
    {
        return LeaveType::create($arrayData);
    }

    public function updateLeaveType(int $id, array $arrayData)
    {
        return LeaveType::whereId($id)->update($arrayData);
    }

    public function deleteLeaveType(int $id)
    {
        return LeaveType::destroy($id);
    }

    public function getActiveLeaveTypesAll($schoolId = null)
    {
        return LeaveType::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->orderBy('display_order', 'ASC')
            ->get();
    }

    public function getLeaveTypeById(int $id)
    {
        return LeaveType::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->first();
    }

    // leave allocation

    public function updateLeaveAllocation(int $id, array $arrayData)
    {
        return StaffLeaveAllocation::where('id', $id)->update($arrayData);
    }

    public function updateOrCreateLeaveAllocation(array $attributesToCheck, array $valuesToUpdate)
    {
        return StaffLeaveAllocation::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function getStaffLeaveAllocationsByStaffId(int $staffId, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return StaffLeaveAllocation::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('staff_id', $staffId)
            ->select(
                'id',
                'leave_type_id',
                'days',
                'consumed_days'
            )
            ->with(['leaveType:id,title,acronym'])
            ->get();
    }

    public function getStaffLeaveAllocationByStaffIdAndLeaveTypeId(int $staffId, int $leaveTypeId, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return StaffLeaveAllocation::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('staff_id', $staffId)
            ->where('leave_type_id', $leaveTypeId)
            ->select(
                'id',
                'leave_type_id',
                'days',
                'consumed_days'
            )
            ->first();
    }

    // leave approver

    public function deleteLeaveApprover(int $id)
    {
        return LeaveApprover::destroy($id);
    }

    public function updateOrCreateLeaveApprover(array $attributesToCheck, array $valuesToUpdate)
    {
        return LeaveApprover::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function getActiveLeaveApproversAll()
    {
        return LeaveApprover::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->with(['staff' => function ($query) {
                $query->with(['designation:id,name'])
                    ->select(
                        'id',
                        'first_name',
                        'middle_name',
                        'last_name',
                        'designation_id'
                    );
            }])
            ->select(
                'id',
                'staff_id'
            )
            ->get();
    }

    public function getLeaveApproverById(int $id)
    {
        return LeaveApprover::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->select(
                'id',
                'staff_id'
            )
            ->first();
    }

    // leave setting

    public function createLeaveSetting(array $arrayData)
    {
        return LeaveSetting::create($arrayData);
    }

    public function updateAllLeaveSetting(array $arrayData, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return LeaveSetting::where('school_id', $schoolId)->update($arrayData);
    }

    public function getCurrentLeaveSetting(int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return LeaveSetting::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('is_active', true)
            ->select(
                'is_auto_approve_leave_enabled',
                'is_half_day_leave_enabled',
                'is_rule_one_in_time_enabled',
                'is_rule_two_total_hour_enabled',
                'is_saturday_exceptional',
                'is_sunday_exceptional',
                'rule_one_in_time',
                'rule_two_total_hour'
            )
            ->first();
    }

    public function getActiveLeaveSettingAll(int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return LeaveSetting::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->with(['createdBy:id,first_name,middle_name,last_name'])
            ->select(
                'id',
                'created_by',
                'is_auto_approve_leave_enabled',
                'is_half_day_leave_enabled',
                'is_rule_one_in_time_enabled',
                'is_rule_two_total_hour_enabled',
                'is_saturday_exceptional',
                'is_sunday_exceptional',
                'rule_one_in_time',
                'rule_two_total_hour',
                'is_active',
                'created_at'
            )
            ->orderBy('id', 'desc')
            ->get();
    }

    // staff leave setting

    public function createStaffLeaveSetting(array $arrayData)
    {
        return StaffLeaveSetting::create($arrayData);
    }

    public function updateAllStaffLeaveSetting(array $staffIds, array $arrayData, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return StaffLeaveSetting::where('school_id', $schoolId)
            ->whereIn('staff_id', $staffIds)
            ->update($arrayData);
    }

    public function getCurrentStaffLeaveSettingByStaffId(int $staffId, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return StaffLeaveSetting::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('staff_id', $staffId)
            ->where('is_active', true)
            ->select(
                'staff_id',
                'is_half_day_leave_enabled',
                'is_rule_one_in_time_enabled',
                'is_rule_two_total_hour_enabled',
                'is_saturday_exceptional',
                'is_sunday_exceptional',
                'rule_one_in_time',
                'rule_two_total_hour'
            )
            ->first();
    }

    public function getStaffLeaveSettingsByStaffId(int $staffId, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return StaffLeaveSetting::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->where('staff_id', $staffId)
            ->with(['createdBy:id,first_name,middle_name,last_name'])
            ->select(
                'id',
                'created_by',
                'staff_id',
                'is_half_day_leave_enabled',
                'is_rule_one_in_time_enabled',
                'is_rule_two_total_hour_enabled',
                'is_saturday_exceptional',
                'is_sunday_exceptional',
                'rule_one_in_time',
                'rule_two_total_hour',
                'is_active',
                'created_at'
            )
            ->orderBy('id', 'desc')
            ->get();
    }
}
