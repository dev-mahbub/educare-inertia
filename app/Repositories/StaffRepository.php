<?php

namespace App\Repositories;

use App\Enums\StaffRoleType;
use App\Enums\Status;
use App\Enums\Gender;
use App\Models\Staff;
use App\Models\User;
use App\Models\Religion;
use App\Models\Department;
use App\Models\Designation;

use Illuminate\Support\Facades\DB;

class StaffRepository implements IRepository, IStaffRepository
{
    public function getAll()
    {
        return Staff::all();
    }

    public function getById($id)
    {
        return Staff::findOrFail($id);
    }

    public function delete($id)
    {
        Staff::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Staff::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Staff::whereId($id)->update($arrayData);
    }

    // public function getActiveAll()
    // {
    //     return Staff::where('status', Status::ACTIVE);
    // }

    public function getStaffDetailsData($id, $schoolId = null)
    {
        return Staff::where('staff.id', $id)
            ->where('staff.school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->with(['bloodGroup:id,name', 'religion:id,name', 'house:id,name', 'department:id,name', 'designation:id,name', 'state:id,name', 'staffProfileImage'])
            ->select(
                'staff.*',
            )
            ->first();
    }

    public function getActiveAll($schoolId = null)
    {
        return Staff::where('staff.status', Status::ACTIVE)
            ->where('staff.school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->leftJoin('users', 'users.id', '=', 'staff.user_id')
            ->leftJoin('departments', 'staff.department_id', '=', 'departments.id')
            ->leftJoin('designations', 'staff.designation_id', '=', 'designations.id')
            ->orderBy('staff.first_name', 'ASC')
            ->select(
                // staff
                'staff.*',
                // department
                'departments.name as department_name',
                'designations.name as designation_name',
                // user
                'users.username',
                'users.id as staff_user_id',
                'users.password',
                'users.parent_pass'
            )
            ->get();
    }

    public function getActiveAllStaff(?string $orderText = null, ?int $staffDepartmentId = null, ?int $staffDesignationId = null, string $staffHouseId = null, string $staffType = "", string $staffJobType = "", string $staffRoleType = "", string $staffSearch = "", ?int $schoolId = null)
    {
        $query = Staff::where('staff.status', Status::ACTIVE)
            ->where('staff.school_id', getUserSchoolId())
            ->leftJoin('users', 'users.id', '=', 'staff.user_id')
            ->leftJoin('departments', 'staff.department_id', '=', 'departments.id')
            ->leftJoin('designations', 'staff.designation_id', '=', 'designations.id')
            ->select(
                // staff
                'staff.*',
                // department
                'departments.name as department_name',
                'designations.name as designation_name',
                // user
                'users.username',
                'users.id as staff_user_id',
                'users.password',
                'users.parent_pass'
            );

        // Apply dynamic ordering based on $orderText

        if (in_array($orderText, range('A', 'Z'))) {
            $query->whereRaw("SUBSTRING(staff.first_name, 1, 1) = ?", [$orderText]);
        } else {
            $query->orderBy('staff.first_name');
        }

        if (!empty($staffDepartmentId)) {
            $query->where('staff.department_id', $staffDepartmentId);
        }

        if (!empty($staffDesignationId)) {
            $query->where('staff.designation_id', $staffDesignationId);
        }

        if (!empty($staffHouseId)) {
            $query->where('staff.house_id', $staffHouseId);
        }

        if (!empty($staffType)) {
            $query->where('staff.staff_type', $staffType);
        }

        if (!empty($staffJobType)) {
            $query->where('staff.job_type', $staffJobType);
        }

        if (!empty($staffRoleType)) {
            $query->where('staff.user_roll_type', $staffRoleType);
        }

        if (!empty($staffSearch)) {
            $query->where(function ($q) use ($staffSearch) {
                $q->where('staff.first_name', 'like', '%' . $staffSearch . '%')
                    ->orWhere('staff.middle_name', 'like', '%' . $staffSearch . '%')
                    ->orWhere('staff.last_name', 'like', '%' . $staffSearch . '%')
                    ->orWhere(DB::raw("CONCAT(staff.first_name, ' ', staff.middle_name, ' ', staff.last_name)"), 'LIKE', '%' . $staffSearch . '%');
            });
        }
        // Execute the query and return the result
        return $query->get();
    }

    public function getInactiveAll(?string $orderText = null, ?int $staffDepartmentId = null, ?int $staffDesignationId = null, string $staffHouseId = null, string $staffType = "", string $staffJobType = "", string $staffRoleType = "", string $staffSearch = "", ?int $schoolId = null)
    {
        $query = Staff::where('staff.status', Status::INACTIVE)
            ->where('staff.school_id', getUserSchoolId())
            ->leftJoin('users', 'users.id', '=', 'staff.user_id')
            ->leftJoin('departments', 'staff.department_id', '=', 'departments.id')
            ->leftJoin('designations', 'staff.designation_id', '=', 'designations.id')
            ->select(
                // staff
                'staff.*',
                // department
                'departments.name as department_name',
                'designations.name as designation_name',
                // user
                'users.username',
                'users.id as staff_user_id',
                'users.password',
                'users.parent_pass'
            );

        // Apply dynamic ordering based on $orderText

        if (in_array($orderText, range('A', 'Z'))) {
            $query->whereRaw("SUBSTRING(staff.first_name, 1, 1) = ?", [$orderText]);
        } else {
            $query->orderBy('staff.first_name');
        }

        if (!empty($staffDepartmentId)) {
            $query->where('staff.department_id', $staffDepartmentId);
        }

        if (!empty($staffDesignationId)) {
            $query->where('staff.designation_id', $staffDesignationId);
        }

        if (!empty($staffHouseId)) {
            $query->where('staff.house_id', $staffHouseId);
        }

        if (!empty($staffType)) {
            $query->where('staff.staff_type', $staffType);
        }

        if (!empty($staffJobType)) {
            $query->where('staff.job_type', $staffJobType);
        }

        if (!empty($staffRoleType)) {
            $query->where('staff.user_roll_type', $staffRoleType);
        }

        if (!empty($staffSearch)) {
            $query->where(function ($q) use ($staffSearch) {
                $q->where('staff.first_name', 'like', '%' . $staffSearch . '%')
                    ->orWhere('staff.middle_name', 'like', '%' . $staffSearch . '%')
                    ->orWhere('staff.last_name', 'like', '%' . $staffSearch . '%')
                    ->orWhere(DB::raw("CONCAT(staff.first_name, ' ', staff.middle_name, ' ', staff.last_name)"), 'LIKE', '%' . $staffSearch . '%');
            });
        }
        // Execute the query and return the result
        return $query->get();
    }

    public function getActiveAllStaff_Old($orderText = null)
    {
        $query = Staff::where('staff.status', Status::ACTIVE)
            ->where('staff.school_id', getUserSchoolId())
            ->leftJoin('users', 'users.id', '=', 'staff.user_id')
            ->leftJoin('departments', 'staff.department_id', '=', 'departments.id')
            ->leftJoin('designations', 'staff.designation_id', '=', 'designations.id')
            ->select(
                // staff
                'staff.*',
                // department
                'departments.name as department_name',
                'designations.name as designation_name',
                // user
                'users.username',
                'users.id as staff_user_id',
                'users.password',
                'users.parent_pass'
            );

        // Apply dynamic ordering based on $orderText
        if (in_array($orderText, range('A', 'Z'))) {
            $column = "staff.first_name";
            $query->orderByRaw("SUBSTRING($column, 1, 1) = '$orderText' DESC");
            $query->orderBy($column);
        } else {
            $query->orderBy('staff.first_name');
        }

        // Execute the query and return the result
        return $query->get();
    }

    public function getInactiveAllOld()
    {
        return Staff::where('staff.status', Status::INACTIVE)
            ->where('staff.school_id', getUserSchoolId())
            ->leftJoin('departments', 'staff.department_id', '=', 'departments.id')
            ->leftJoin('designations', 'staff.designation_id', '=', 'designations.id')
            ->orderBy('staff.first_name', 'ASC')
            ->select('staff.*', 'departments.name as department_name', 'designations.name as designation_name')
            ->get();
    }

    public function getObjById($id)
    {
        return Staff::where('staff.id', $id)
            ->leftJoin('users', 'staff.user_id', '=', 'users.id')
            ->select('staff.*', 'users.username')
            ->with('staffProfileImage')
            ->first();
    }

    public function getActiveNameId($schoolId = null)
    {
        return Staff::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->select('id', 'first_name', 'middle_name', 'last_name')
            ->get();
    }

    public function getActiveForSetting()
    {
        return Staff::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->select('id', 'first_name', 'last_name', 'user_roll_type')
            ->get();
    }

    public function getActiveTeacherNameId($schoolId = null)
    {
        return Staff::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('user_roll_type', StaffRoleType::TEACHER)
            ->select(
                'id',
                'first_name',
                'middle_name',
                'last_name',
                'user_id',
                DB::raw("CONCAT(first_name, ' ', middle_name, ' ', last_name) as full_name")
            )
            ->get();
    }

    public function getActiveTeacherAll()
    {
        return Staff::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('user_roll_type', '=', StaffRoleType::TEACHER->value)
            ->get();
    }

    public function getTeachersByIds(array $ids)
    {
        return Staff::where('staff.school_id', getUserSchoolId())
            ->where('staff.status', Status::ACTIVE)
            ->where('staff.user_roll_type', '=', StaffRoleType::TEACHER->value)
            ->whereIn('staff.id', $ids)
            ->leftJoin('departments', 'staff.department_id', '=', 'departments.id')
            ->leftJoin('designations', 'staff.designation_id', '=', 'designations.id')
            ->leftJoin('religions', 'staff.religion_id', '=', 'religions.id')
            ->leftJoin('blood_groups', 'staff.blood_group_id', '=', 'blood_groups.id')
            ->with(['staffProfileImage'])
            ->select(
                // staff
                'staff.id',
                'staff.employee_id',
                'staff.first_name',
                'staff.middle_name',
                'staff.last_name',
                'staff.gender',
                'staff.father_name',
                'staff.join_date_at',
                'staff.birth_date_at',
                'staff.qualification',
                'staff.city',
                'staff.address',
                'staff.user_id',
                'staff.email',
                // department
                'departments.name as department_name',
                // designation
                'designations.name as designation_name',
                // religion
                'religions.name as religion_name',
                // blood group
                'blood_groups.name as blood_group_name'
            )
            ->get();
    }

    public function getAdminStaffsByIds(array $ids)
    {
        return Staff::where('staff.school_id', getUserSchoolId())
            ->where('staff.status', Status::ACTIVE)
            ->where('staff.user_roll_type', '=', StaffRoleType::ADMIN->value)
            ->whereIn('staff.id', $ids)
            ->leftJoin('departments', 'staff.department_id', '=', 'departments.id')
            ->leftJoin('designations', 'staff.designation_id', '=', 'designations.id')
            ->leftJoin('religions', 'staff.religion_id', '=', 'religions.id')
            ->leftJoin('blood_groups', 'staff.blood_group_id', '=', 'blood_groups.id')
            ->with(['staffProfileImage'])
            ->select(
                // staff
                'staff.id',
                'staff.employee_id',
                'staff.first_name',
                'staff.middle_name',
                'staff.last_name',
                'staff.gender',
                'staff.father_name',
                'staff.join_date_at',
                'staff.birth_date_at',
                'staff.qualification',
                'staff.city',
                'staff.address',
                'staff.user_id',
                'staff.email',
                // department
                'departments.name as department_name',
                // designation
                'designations.name as designation_name',
                // religion
                'religions.name as religion_name',
                // blood group
                'blood_groups.name as blood_group_name'
            )
            ->get();
    }
    
    public function getVacantTeachers(int $schoolShiftId, int $schoolPeriodId, string $day, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return Staff::where('school_id', $schoolId)
            ->where('status', Status::ACTIVE)
            ->where('user_roll_type', StaffRoleType::TEACHER->value)
            ->whereDoesntHave('classroomTimetables', function ($query) use ($schoolShiftId, $schoolPeriodId, $day) {
                $query->where('school_shift_id', $schoolShiftId)
                    ->where('day', $day)
                    ->whereHas('classroomPeriod', function ($query) use ($schoolPeriodId) {
                        $query->where('school_period_id', $schoolPeriodId);
                    });
            })
            ->select(
                'id',
                'employee_id',
                'first_name',
                'middle_name',
                'last_name',
                'gender',
                'phone'
            )
            ->get();
    }

    public function getStaffByIds(array $ids)
    {
        return Staff::where('staff.school_id', getUserSchoolId())
            ->where('staff.status', Status::ACTIVE)
            ->whereIn('staff.id', $ids)
            ->leftJoin('departments', 'staff.department_id', '=', 'departments.id')
            ->leftJoin('designations', 'staff.designation_id', '=', 'designations.id')
            ->leftJoin('religions', 'staff.religion_id', '=', 'religions.id')
            ->leftJoin('blood_groups', 'staff.blood_group_id', '=', 'blood_groups.id')
            ->with(['staffProfileImage'])
            ->select(
                // staff
                'staff.id',
                'staff.employee_id',
                'staff.first_name',
                'staff.middle_name',
                'staff.last_name',
                'staff.gender',
                'staff.father_name',
                'staff.join_date_at',
                'staff.birth_date_at',
                'staff.qualification',
                'staff.city',
                'staff.address',
                'staff.phone',
                'staff.leave_date_at',
                'staff.email',
                'staff.pan_number',
                // department
                'departments.name as department_name',
                // designation
                'designations.name as designation_name',
                // religion
                'religions.name as religion_name',
                // blood group
                'blood_groups.name as blood_group_name'
            )
            ->get();
    }

    public function getStaffByEmployeeId($employeeId)
    {
        return Staff::where('school_id', getUserSchoolId())
            ->where('employee_id', $employeeId)
            ->where('status', Status::ACTIVE)
            ->select('id', 'first_name', 'middle_name', 'last_name', 'email', 'address', 'phone')
            ->first();
    }

    public function getActiveAllTeachersForIdCard()
    {
        return Staff::where('staff.school_id', getUserSchoolId())
            ->where('staff.status', Status::ACTIVE)
            ->where('staff.user_roll_type', '=', StaffRoleType::TEACHER->value)
            ->leftJoin('departments', 'staff.department_id', '=', 'departments.id')
            ->leftJoin('designations', 'staff.designation_id', '=', 'designations.id')
            ->leftJoin('religions', 'staff.religion_id', '=', 'religions.id')
            ->leftJoin('blood_groups', 'staff.blood_group_id', '=', 'blood_groups.id')
            ->with(['staffProfileImage'])
            ->select(
                // staff
                'staff.id',
                'staff.employee_id',
                'staff.first_name',
                'staff.middle_name',
                'staff.last_name',
                'staff.gender',
                'staff.father_name',
                'staff.join_date_at',
                'staff.birth_date_at',
                'staff.qualification',
                'staff.city',
                'staff.address',
                // department
                'departments.name as department_name',
                // designation
                'designations.name as designation_name',
                // religion
                'religions.name as religion_name',
                // blood group
                'blood_groups.name as blood_group_name'
            )
            ->get();
    }

    public function getActiveAllStaffForIdCard()
    {
        return Staff::where('staff.school_id', getUserSchoolId())
            ->where('staff.status', Status::ACTIVE)
            ->leftJoin('departments', 'staff.department_id', '=', 'departments.id')
            ->leftJoin('designations', 'staff.designation_id', '=', 'designations.id')
            ->leftJoin('religions', 'staff.religion_id', '=', 'religions.id')
            ->leftJoin('blood_groups', 'staff.blood_group_id', '=', 'blood_groups.id')
            ->with(['staffProfileImage'])
            ->select(
                // staff
                'staff.id',
                'staff.employee_id',
                'staff.first_name',
                'staff.middle_name',
                'staff.last_name',
                'staff.gender',
                'staff.father_name',
                'staff.join_date_at',
                'staff.birth_date_at',
                'staff.qualification',
                'staff.city',
                'staff.address',
                // department
                'departments.name as department_name',
                // designation
                'designations.name as designation_name',
                // religion
                'religions.name as religion_name',
                // blood group
                'blood_groups.name as blood_group_name'
            )
            ->get();
    }

    public function getActiveListForTeacherSale()
    {
        return Staff::where('school_id', getUserSchoolId())
            ->where('user_roll_type', StaffRoleType::TEACHER->value)
            ->where('status', Status::ACTIVE)
            ->select('id', 'first_name', 'last_name', 'email', 'address', 'phone')
            ->get();
    }

    public function getActiveTeacherData()
    {
        return Staff::where('school_id', getUserSchoolId())
            ->where('user_roll_type', StaffRoleType::TEACHER->value)
            ->where('status', Status::ACTIVE)
            ->select('id', 'first_name', 'middle_name', 'last_name', 'email', 'address', 'phone')
            ->get();
    }

    public function getActiveTeachersByIds(array $ids, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return Staff::where('school_id', $schoolId)
            ->where('user_roll_type', StaffRoleType::TEACHER->value)
            ->where('status', Status::ACTIVE)
            ->whereIn('id', $ids)
            ->select('id', 'first_name', 'middle_name', 'last_name', 'email', 'address', 'phone')
            ->get();
    }

    public function getActiveAlumniesByIds(array $ids, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return Staff::where('school_id', $schoolId)
            ->where('user_roll_type', StaffRoleType::SITE_ALUMNI->value)
            ->where('status', Status::ACTIVE)
            ->whereIn('id', $ids)
            ->select('id', 'first_name', 'middle_name', 'last_name', 'email', 'address', 'phone')
            ->get();
    }

    public function getActiveAlumniData()
    {
        return Staff::where('school_id', getUserSchoolId())
            ->where('user_roll_type', StaffRoleType::SITE_ALUMNI->value)
            ->where('status', Status::ACTIVE)
            ->select('id', 'first_name', 'middle_name', 'last_name', 'email', 'address', 'phone')
            ->get();
    }

    public function getActiveTeachersWithoutLedger()
    {
        return Staff::where('school_id', getUserSchoolId())
            ->where('user_roll_type', StaffRoleType::TEACHER->value)
            ->where('status', Status::ACTIVE)
            ->whereDoesntHave('ledger')
            ->select('id', 'first_name', 'middle_name', 'last_name')
            ->get();
    }

    public function getActiveTeacherName()
    {
        return Staff::where('school_id', getUserSchoolId())
            ->where('user_roll_type', StaffRoleType::TEACHER->value)
            ->where('status', Status::ACTIVE)
            ->select('id', 'first_name', 'middle_name', 'last_name')
            ->get();
    }

    public function getTeacherEmailById($id)
    {
        return Staff::where('school_id', getUserSchoolId())
            ->where('user_roll_type', StaffRoleType::TEACHER->value)
            ->where('status', Status::ACTIVE)
            ->where('id', $id)
            ->select('email')
            ->first();
    }

    public function getTeacherByUserId(int $userId, $schoolId = null)
    {
        return Staff::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('user_roll_type', StaffRoleType::TEACHER->value)
            ->where('status', Status::ACTIVE)
            ->where('user_id', $userId)
            ->first();
    }

    public function getActiveStaffData()
    {
        return Staff::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->get();
    }

    public function getActiveAdminStaffs(int $schoolId = null)
    {
        return Staff::where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('user_roll_type', StaffRoleType::ADMIN->value)
            ->select(
                'id',
                'first_name',
                'middle_name',
                'last_name'
            )
            ->get();
    }

    public function getActiveStaffForEvent()
    {
        return Staff::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->select(
                'id',
                'first_name',
                'middle_name',
                'last_name',
                'user_roll_type'
            )
            ->get();
    }

    public function getActiveStaffsForDirectLeave(int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return Staff::where('school_id', $schoolId)
            ->where('status', Status::ACTIVE)
            ->where('user_id', '!=', auth()->user()->id)
            ->select(
                'id',
                'first_name',
                'middle_name',
                'last_name',
                'employee_id',
                'designation_id'
            )
            ->get();
    }

    public function getStaffByEmployeeIdForDirectLeave($employeeId, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return Staff::where('school_id', $schoolId)
            ->where('status', Status::ACTIVE)
            ->where('user_id', '!=', auth()->user()->id)
            ->where('employee_id', $employeeId)
            ->with([
                'staffLeaveAllocations.leaveType',
                'leaves.leaveType',
                'designation:id,name'
            ])
            ->select(
                'id',
                'first_name',
                'middle_name',
                'last_name',
                'employee_id',
                'designation_id'
            )
            ->first();
    }

    public function getStaffByIdForDirectLeave($id, int $schoolId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();

        return Staff::where('school_id', $schoolId)
            ->where('status', Status::ACTIVE)
            ->where('user_id', '!=', auth()->user()->id)
            ->where('id', $id)
            ->with([
                'staffLeaveAllocations.leaveType',
                'leaves.leaveType',
                'designation:id,name'
            ])
            ->select(
                'id',
                'first_name',
                'middle_name',
                'last_name',
                'employee_id',
                'designation_id'
            )
            ->first();
    }

    public function getFilteredStaffData(string $staffType = "", int $departmentId = null, string $attendanceType = "")
    {
        return Staff::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where(function ($query) use ($staffType, $departmentId, $attendanceType) {
                if (!empty($staffType)) {
                    $query->where('staff_type', $staffType);
                }

                if (!empty($departmentId)) {
                    $query->where('department_id', $departmentId);
                }

                if (!empty($attendanceType)) {
                    $query->where('attendance_type', $attendanceType);
                }
            })
            ->get();
    }

    public function getStaffDataForLeaveSetting(string $staffType = "", string $search = "")
    {
        return Staff::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where(function ($query) use ($staffType) {
                if (!empty($staffType)) {
                    $query->where('staff_type', $staffType);
                }
            })
            ->where(function ($query) use ($search) {
                if (!empty($search)) {
                    $query->where('employee_id', 'like', '%' . $search . '%')
                        ->orWhere('first_name', 'like', '%' . $search . '%')
                        ->orWhere('middle_name', 'like', '%' . $search . '%')
                        ->orWhere('last_name', 'like', '%' . $search . '%')
                        ->orWhere(DB::raw("CONCAT(first_name, ' ', middle_name, ' ', last_name)"), 'LIKE', '%' . $search . '%');
                }
            })
            ->select(
                'id',
                'employee_id',
                'first_name',
                'middle_name',
                'last_name'
            )
            ->withCount('staffLeaveSettings')
            ->get();
    }

    public function getRegisterAll()
    {
        return Staff::where('status', Status::ACTIVE);
    }

    // user
    public function createUser(array $arrayData)
    {
        return User::create($arrayData);
    }

    public function updateUser($id, array $arrayData)
    {
        return User::whereId($id)->update($arrayData);
    }

    // Mis Reports Counts data
    public function getMisReportCounts()
    {

        $activeStaffCount = Staff::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->count();

        $inactiveStaffCount = Staff::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('status', Status::INACTIVE)
            ->count();

        $maleStaffCount = Staff::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('gender', Gender::MALE)
            ->count();

        $femaleStaffCount = Staff::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('gender', Gender::FEMALE)
            ->count();

        return [
            'active_staff_count' => $activeStaffCount,
            'inactive_staff_count' => $inactiveStaffCount,
            'male_staff_count' => $maleStaffCount,
            'female_staff_count' => $femaleStaffCount,
        ];
    }

    // staff from Religions
    public function getStaffFromReligions()
    {
        $subQuery = DB::table('staff')
            ->select(DB::raw('count(id)'))
            ->whereRaw('religions.id = religion_id');

        return Religion::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->orderBy("name", "ASC")
            ->pluck(DB::raw("(" . $subQuery->toSql() . ") as staffCount"), 'name')
            ->toArray();
    }

    // staff from Departments
    public function getStaffFromDepartments()
    {
        $subQuery = DB::table('staff')
            ->select(DB::raw('count(id)'))
            ->whereRaw('departments.id = department_id');

        return Department::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->orderBy("name", "ASC")
            ->pluck(DB::raw("(" . $subQuery->toSql() . ") as staffCount"), 'name')
            ->toArray();
    }

    // staff from Designations
    public function getStaffFromDesignations()
    {
        $subQuery = DB::table('staff')
            ->select(DB::raw('count(id)'))
            ->whereRaw('designations.id = designation_id');

        return Designation::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->orderBy("name", "ASC")
            ->pluck(DB::raw("(" . $subQuery->toSql() . ") as staffCount"), 'name')
            ->toArray();
    }

    // staff from job type
    public function getStaffFromJobType()
    {
        $subQuery = DB::table('staff')
            ->select(DB::raw('count(id)'))
            ->whereRaw('staff.job_type = job_type');

        return Staff::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->orderBy("job_type", "ASC")
            ->pluck(DB::raw("(" . $subQuery->toSql() . ") as staffCount"), 'job_type')
            ->toArray();
    }

    public function getStaffDetailsExeptsIds($excludeIds, $schoolId, $academicYearId = null)
    {
        return Staff::where('status', Status::ACTIVE)
            ->where('school_id', $schoolId)
            ->whereNotIn('id', $excludeIds)
            ->with(['staffProfileImageRaw' => function ($q) use ($schoolId) {
                $q->where('school_id', $schoolId)
                    ->select('images.imageable_type', 'images.imageable_id', 'images.path');
            }])
            ->select('id', 'first_name', 'middle_name', 'last_name', 'email', 'address', 'phone')
            ->get();
    }

    public function getStaffDetailsByIdForAttendanceReport($id, $schoolId = null)
    {
        return Staff::with(['staffProfileImageRaw' => function ($q) use ($schoolId) {
            $q->where('school_id', $schoolId)
                ->select('images.imageable_type', 'images.imageable_id', 'images.path');
        }])
            ->select('id', 'first_name', 'middle_name', 'last_name', 'email', 'address', 'phone')
            ->find($id);
    }

    public function getStaffDetailsById($id, $schoolId = null)
    {
        return Staff::with(['staffProfileImageRaw' => function ($q) use ($schoolId) {
            $q->where('school_id', $schoolId)
                ->select('images.imageable_type', 'images.imageable_id', 'images.path');
        }])
            ->select('id', 'first_name', 'middle_name', 'last_name', 'email', 'address', 'phone')
            ->findOrFail($id);
    }

    public function getActiveStaffsApi($schoolId, $classroomId = null)
    {
        return Staff::where('staff.status', Status::ACTIVE)
            ->where('staff.school_id', $schoolId)
            ->whereIn('user_roll_type', ['Admin', 'Teacher'])
            ->leftJoin('designations', 'designations.id', '=', 'staff.designation_id')
            ->leftJoin('departments', 'departments.id', '=', 'staff.department_id')
            // ->leftJoin('classrooms', 'classrooms.class_teacher_id', '=', 'staff.id')
            // ->leftJoin('classroom_subjects', 'classroom_subjects.classroom_id', '=', 'classrooms.id')
            // ->leftJoin('subjects', 'subjects.id', '=', 'classroom_subjects.subject_id')
            ->with([
                'staffProfileImageRaw' => function ($q) use ($schoolId) {
                    $q->where('school_id', $schoolId)
                        ->select('images.imageable_type', 'images.imageable_id', 'images.path');
                },
                'classroom',
                'classroom.subjects'
            ])
            ->orderBy('staff.first_name', 'ASC')
            ->select(
                // staff
                'staff.id',
                'staff.designation_id',
                'staff.department_id',
                'staff.first_name',
                'staff.city',
                'staff.address',
                'staff.middle_name',
                'staff.last_name',
                'staff.phone',
                'staff.email',
                'staff.gender',
                'staff.birth_date_at',
                'staff.qualification',
                'designations.name as designation_title',
                'departments.name as department_title',
            )
            ->get();
    }

    public function getStaffByUserId(int $userId)
    {
        return Staff::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('user_id', $userId)
            ->with(['classroom'])
            ->select(
                'id',
                'user_id',
                'first_name',
                'middle_name',
                'last_name'
            )
            ->first();
    }

    public function getStaffById(int $id)
    {
        return Staff::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->select(
                'id',
                'user_id',
                'first_name',
                'middle_name',
                'last_name',
                'phone',
                'email',
                'employee_id',
                'address'
            )
            ->first();
    }

    public function getStaffByIdAndStatus(int $id, string $status = '')
    {
        return Staff::where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->when(!empty($status), function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->select(
                'id',
                'user_id',
                'first_name',
                'middle_name',
                'last_name',
                'phone',
                'email'
            )
            ->first();
    }

    public function getStaffForLeaveAllocation(string $staffType = "", string $gender = "", string $search = "")
    {
        return Staff::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where(function ($query) use ($staffType, $gender) {
                if (!empty($staffType)) {
                    $query->where('staff_type', $staffType);
                }

                if (!empty($gender)) {
                    $query->where('gender', $gender);
                }
            })
            ->where(function ($query) use ($search) {
                if (!empty($search)) {
                    $query->where('first_name', 'like', '%' . $search . '%')
                        ->orWhere('middle_name', 'like', '%' . $search . '%')
                        ->orWhere('last_name', 'like', '%' . $search . '%')
                        ->orWhere(DB::raw("CONCAT(first_name, ' ', middle_name, ' ', last_name)"), 'LIKE', '%' . $search . '%');
                }
            })
            ->with([
                'designation:id,name',
                'staffLeaveAllocations:id,staff_id,leave_type_id,days,consumed_days'
            ])
            ->select(
                'id',
                'employee_id',
                'first_name',
                'middle_name',
                'last_name',
                'designation_id'
            )
            ->get();
    }
}
