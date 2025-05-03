<?php

namespace App\Repositories;

interface ILeaveRepository
{
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getLeaveBySearch($type = null);
    public function getFilteredLeaves(string $leaveStatus = "", string $month = "");
    public function getLeaveById(int $id);
    public function getApprovedLeavesByStaffId(int $staffId, int $schoolId = null);
    public function getApprovedLeavesByStaffIdAndLeaveTypeIds(int $staffId, array $leaveTypeIds, int $schoolId = null);

    // leave type
    public function createLeaveType(array $arrayData);
    public function updateLeaveType(int $id, array $arrayData);
    public function deleteLeaveType(int $id);
    public function getActiveLeaveTypesAll();
    public function getLeaveTypeById(int $id);

    // leave allocation
    public function updateLeaveAllocation(int $id, array $arrayData);
    public function updateOrCreateLeaveAllocation(array $attributesToCheck, array $valuesToUpdate);
    public function getStaffLeaveAllocationsByStaffId(int $staffId, int $schoolId = null);
    public function getStaffLeaveAllocationByStaffIdAndLeaveTypeId(int $staffId, int $leaveTypeId, int $schoolId = null);

    // leave approver
    public function deleteLeaveApprover(int $id);
    public function updateOrCreateLeaveApprover(array $attributesToCheck, array $valuesToUpdate);
    public function getActiveLeaveApproversAll();
    public function getLeaveApproverById(int $id);

    // leave setting
    public function createLeaveSetting(array $arrayData);
    public function updateAllLeaveSetting(array $arrayData, int $schoolId = null);
    public function getCurrentLeaveSetting(int $schoolId = null);
    public function getActiveLeaveSettingAll(int $schoolId = null);


    // staff leave setting
    public function createStaffLeaveSetting(array $arrayData);
    public function updateAllStaffLeaveSetting(array $staffIds, array $arrayData, int $schoolId = null);
    public function getCurrentStaffLeaveSettingByStaffId(int $staffId, int $schoolId = null);
    public function getStaffLeaveSettingsByStaffId(int $staffId, int $schoolId = null);
}
