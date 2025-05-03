<?php

namespace App\Repositories;

interface IStaffRepository
{
    public function getAll();
    public function getById($id);
    public function delete($id);
    public function create(array $arrayData);
    public function update($id, array $arrayData);
    public function getActiveAll($schoolId = null);
    public function getActiveAllStaff(?string $orderText = null, ?int $staffDepartmentId = null, ?int $staffDesignationId = null, string $staffHouseId = null, string $staffType = "", string $staffJobType = "", string $staffRoleType = "", string $staffSearch = "", ?int $schoolId = null);
    public function getInactiveAll();
    public function getObjById($id);
    public function getActiveListForTeacherSale();
    public function getRegisterAll();
    public function getActiveTeacherData();
    public function getMisReportCounts();
    public function getStaffFromJobType();
    public function getStaffFromReligions();
    public function getStaffFromDepartments();
    public function getStaffFromDesignations();
    public function getActiveTeacherName();
    public function getTeacherEmailById($id);
    public function getActiveTeacherNameId();
    public function getStaffDetailsExeptsIds($excludeIds, $schoolId, $academicYearId = null);
    public function getStaffDetailsById($id);
    public function getActiveStaffsApi($schoolId);
    public function getStaffByUserId(int $userId);
    public function getStaffById(int $id);
    public function getTeacherByUserId(int $userId, $schoolId = null);
    public function getActiveTeachersWithoutLedger();
    public function getActiveAdminStaffs(int $schoolId = null);
    public function getStaffDataForLeaveSetting(string $staffType = "", string $search = "");
    public function getActiveStaffsForDirectLeave(int $schoolId = null);
    public function getStaffByEmployeeIdForDirectLeave($employeeId, int $schoolId = null);
    public function getStaffByIdForDirectLeave($id, int $schoolId = null);
    public function getActiveAlumniData();
    public function getActiveTeachersByIds(array $ids, int $schoolId = null);
    public function getActiveAlumniesByIds(array $ids, int $schoolId = null);
    public function getStaffByIdAndStatus(int $id, string $status = '');
    public function getStaffByEmployeeId($employeeId);
    public function getVacantTeachers(int $schoolShiftId, int $schoolPeriodId, string $day, int $schoolId = null);
    public function getStaffDetailsByIdForAttendanceReport($id, $schoolId = null);

    // user
    public function createUser(array $arrayData);
    public function updateUser($id, array $arrayData);
}
