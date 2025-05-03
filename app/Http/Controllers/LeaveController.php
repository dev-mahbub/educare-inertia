<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Gender;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\DayType;
use App\Enums\LeaveShift;
use App\Enums\LeaveStatus;
use App\Enums\TeachingType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\LeaveRequest;
use Illuminate\Support\Facades\Auth;
use App\Repositories\LeaveRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\ILeaveRepository;
use App\Repositories\IStaffRepository;
use App\Http\Requests\LeaveTypeRequest;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\DirectLeaveRequest;
use App\Http\Requests\LeaveSettingRequest;
use App\Http\Requests\RequestLeaveRequest;
use App\Http\Requests\LeaveApproverRequest;
use App\Http\Requests\LeaveAllocationRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\StaffLeaveSettingRequest;
use App\Repositories\IStaffAttendanceRepository;
use App\Http\Requests\BulkLeaveAllocationRequest;

class LeaveController extends Controller
{

    public function __construct(
        private ILeaveRepository $leaveRepository,
        private IStaffRepository $staffRepository,
        private IStaffAttendanceRepository $staffAttendanceRepository,
    ) {
        $this->middleware('permission:view leave', ['only' => ['leaveType', 'directLeave']]);
        $this->middleware('permission:add leave', ['only' => [
            'saveLeaveType',
            'leaveAllocation',
            'saveLeaveAllocation',
            'saveBulkLeaveAllocation',
            'leaveApprovers',
            'saveLeaveApprovers',
            'leaveSetting',
            'saveLeaveSetting',
            'leaveSettingChangesHistory',
            'requestLeave',
            'saveLeaveRequest',
            'manageLeaveRequest',
            'cancelLeaveRequest',
            'adjustLeave'
        ]]);
        $this->middleware('permission:edit leave', ['only' => ['updateLeaveType', 'staffLeaveSetting', 'staffLeaveSettingChangesHistory']]);
        $this->middleware('permission:delete leave', ['only' => ['deleteLeaveType', 'deleteLeaveApprovers']]);
    }

    /**
     * Display Leave Types.
     */
    public function leaveType(): Response
    {
        $leaveTypes = $this->leaveRepository->getActiveLeaveTypesAll();

        return Inertia::render('Leave/LeaveType', [
            'leaveTypes' => $leaveTypes,
        ]);
    }

    /**
     * Save Leave Type
     */
    public function saveLeaveType(LeaveTypeRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'title' => $input['title'] ?? '',
            'acronym' => $input['acronym'] ?? '',
            'description' => $input['description'] ?? null,
            'display_order' => $input['display_order'] ?? null,
            'auto_leave_deduction_order' => $input['auto_leave_deduction_order'] ?? null,
            'status' => Status::ACTIVE
        ];

        $leaveType = $this->leaveRepository->createLeaveType($dataArray);

        if (!$leaveType) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Leave type added successfully');
    }

    /**
     * Update Leave Type
     */
    public function updateLeaveType(int $id, LeaveTypeRequest $request): RedirectResponse
    {
        $leaveType = $this->leaveRepository->getLeaveTypeById($id);

        abort_if(empty($leaveType), 404);

        $input = $request->validated();

        $dataArray = [
            'title' => $input['title'] ?? '',
            'acronym' => $input['acronym'] ?? '',
            'description' => $input['description'] ?? null,
            'display_order' => $input['display_order'] ?? null,
            'auto_leave_deduction_order' => $input['auto_leave_deduction_order'] ?? null
        ];

        $updateLeaveType = $this->leaveRepository->updateLeaveType($id, $dataArray);

        if (!$updateLeaveType) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Leave type updated successfully');
    }

    /**
     * Delete Leave Type
     */
    public function deleteLeaveType(int $id): RedirectResponse
    {
        $leaveType = $this->leaveRepository->getLeaveTypeById($id);

        abort_if(empty($leaveType), 404);

        $deleteLeaveType = $this->leaveRepository->deleteLeaveType($id);

        if (!$deleteLeaveType) {
            return redirect()->back()->with('error', 'Something goes wrong');
        }

        return redirect()->back()->with('message', 'Leave type deleted successfully');
    }

    /**
     * Leave Allocation
     */
    public function leaveAllocation(Request $request): Response
    {
        $teachingTypes = buildEnumOptionsArray(TeachingType::cases());
        $genders = buildEnumOptionsArray(Gender::cases());
        $leaveTypes = $this->leaveRepository->getActiveLeaveTypesAll();
        $staffLeaveAllocations = [];
        $staffType = "";
        $gender = "";
        $search = "";

        if ($request->isMethod('POST')) {
            $staffType = $request->staff_type ?? "";
            $gender = $request->gender ?? "";
            $search = $request->search ?? "";
        }

        $staffs = $this->staffRepository->getStaffForLeaveAllocation($staffType, $gender, $search);

        if (count($staffs) > 0) {
            $staffLeaveAllocations = $staffs->map(function ($staff) use ($leaveTypes) {
                $leaveAllocations = [];

                if (count($leaveTypes) > 0) {
                    foreach ($leaveTypes as $leaveType) {
                        $leaveTypeId = $leaveType->id;

                        if (!isset($leaveAllocations[$leaveTypeId])) {
                            $leaveAllocations[$leaveTypeId] = [
                                'leave_type_id' => $leaveTypeId,
                                'leave_type' => $leaveType->title,
                                'days' => null
                            ];
                        }

                        if ($staff?->staffLeaveAllocations?->count() > 0) {
                            foreach ($staff?->staffLeaveAllocations as $staffLeaveAllocation) {
                                if ($staffLeaveAllocation->leave_type_id == $leaveTypeId) {
                                    $leaveAllocations[$leaveTypeId]['days'] = $staffLeaveAllocation?->days;
                                }
                            }
                        }
                    }
                }

                return [
                    'staff_id' => $staff->id,
                    'employee_id' => $staff->employee_id,
                    'staff_name' => $staff->first_name . ' ' . $staff->middle_name . ' ' . $staff->last_name,
                    'staff_designation' => $staff?->designation?->name ?? "",
                    'leave_allocations' => !empty($leaveAllocations) ? array_values($leaveAllocations) : []
                ];
            });
        }

        return Inertia::render('Leave/LeaveAllocation', [
            'teachingTypes' => $teachingTypes,
            'genders' => $genders,
            'staffLeaveAllocations' => $staffLeaveAllocations,
            'leaveTypes' => $leaveTypes,
        ]);
    }

    /**
     * Save Leave Allocation
     */
    public function saveLeaveAllocation(LeaveAllocationRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $attributesToCheck = [
                'school_id' => getUserSchoolId(),
                'staff_id' => $input['staff_id'] ?? null
            ];

            if (!empty($input['leave_allocations'])) {
                foreach ($input['leave_allocations'] as $leaveAllocation) {
                    $attributesToCheck['leave_type_id'] = $leaveAllocation['leave_type_id'] ?? null;

                    $valuesToUpdate = [
                        'days' => $leaveAllocation['days'] != null ? round($leaveAllocation['days'], 1) : null,
                        'status' => Status::ACTIVE
                    ];

                    $this->leaveRepository->updateOrCreateLeaveAllocation($attributesToCheck, $valuesToUpdate);
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Saved successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }

    /**
     * Save Bulk Leave Allocation
     */
    public function saveBulkLeaveAllocation(BulkLeaveAllocationRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            if (!empty($input['staff_leave_allocations'])) {
                foreach ($input['staff_leave_allocations'] as $staffLeaveAllocation) {
                    $attributesToCheck = [
                        'school_id' => getUserSchoolId(),
                        'staff_id' => $staffLeaveAllocation['staff_id'] ?? null
                    ];

                    if (!empty($staffLeaveAllocation['leave_allocations'])) {
                        foreach ($staffLeaveAllocation['leave_allocations'] as $leaveAllocation) {
                            $attributesToCheck['leave_type_id'] = $leaveAllocation['leave_type_id'] ?? null;

                            $valuesToUpdate = [
                                'days' => $leaveAllocation['days'] != null ? round($leaveAllocation['days'], 1) : null,
                                'status' => Status::ACTIVE
                            ];

                            $this->leaveRepository->updateOrCreateLeaveAllocation($attributesToCheck, $valuesToUpdate);
                        }
                    }
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Saved successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }


    /**
     * Leave Approvers
     */
    public function leaveApprovers(Request $request): Response
    {
        $staffs = $this->staffRepository->getActiveStaffData()?->map(function ($staff) {
            $staff['title'] = $staff?->first_name . ' ' . $staff?->middle_name . ' ' . $staff?->last_name;

            return $staff;
        });

        $leaveApprovers = $this->leaveRepository->getActiveLeaveApproversAll();

        return Inertia::render('Leave/LeaveApprovers', [
            'staffs' => $staffs,
            'leaveApprovers' => $leaveApprovers,
        ]);
    }


    /**
     * Save Leave Approvers
     */
    public function saveLeaveApprovers(LeaveApproverRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $attributesToCheck = [
            'school_id' => getUserSchoolId(),
            'staff_id' => $input['staff_id'] ?? null,
        ];

        $valuesToUpdate = [
            'created_by' => auth()->user()->id,
            'status' => Status::ACTIVE
        ];

        $leaveApprover = $this->leaveRepository->updateOrCreateLeaveApprover($attributesToCheck, $valuesToUpdate);

        if ($leaveApprover) {
            return redirect()->back()->with('message', 'Leave approver saved successfully');
        }

        return redirect()->back()->with('error', 'Something goes wrong');
    }

    /**
     * Delete Leave Approvers
     */
    public function deleteLeaveApprovers(int $id): RedirectResponse
    {
        $leaveApprover = $this->leaveRepository->getLeaveApproverById($id);

        abort_if($leaveApprover == null, 404);

        $leaveApprover = $this->leaveRepository->deleteLeaveApprover($id);

        return redirect()->back()->with('message', 'Leave approver deleted successfully');
    }

    /**
     * Staff leave setting
     */
    public function staffLeaveSetting(Request $request): Response
    {
        $staffType = "";
        $search = "";

        if ($request->isMethod('POST')) {
            $staffType = $request->staff_type ?? "";
            $search = $request->search ?? "";
        }

        // staffs
        $staffs = $this->staffRepository->getStaffDataForLeaveSetting($staffType, $search);

        // current leave setting
        $leaveSetting = $this->leaveRepository->getCurrentLeaveSetting();

        // staff types
        $staffTypes = buildEnumOptionsArray(TeachingType::cases());

        return Inertia::render('Leave/StaffLeaveSetting', [
            'staffs' => $staffs,
            'leaveSetting' => $leaveSetting,
            'staffTypes' => $staffTypes,
        ]);
    }

    /**
     * Save staff leave setting
     */
    public function saveStaffLeaveSetting(StaffLeaveSettingRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            // update staff current leve setting  status
            $updateDataArray = [
                'is_active' => false
            ];

            $this->leaveRepository->updateAllStaffLeaveSetting($input['staff_ids'], $updateDataArray);

            // current leave setting
            $leaveSetting = $this->leaveRepository->getCurrentLeaveSetting();

            // create staff leave setting
            foreach ($input['staff_ids'] as $staffId) {
                $dataArray = array(
                    'school_id' => getUserSchoolId(),
                    'created_by' => auth()->user()->id,
                    'staff_id' => $staffId,
                    'is_half_day_leave_enabled' => $leaveSetting?->is_half_day_leave_enabled ?? false,
                    'rule_one_in_time' => $input['is_rule_one_in_time_enabled'] == true ? $leaveSetting?->rule_one_in_time : null,
                    'rule_two_total_hour' => $input['is_rule_two_total_hour_enabled'] == true ? $leaveSetting?->rule_two_total_hour : null,
                    'is_rule_one_in_time_enabled' => $input['is_rule_one_in_time_enabled'] ?? false,
                    'is_rule_two_total_hour_enabled' => $input['is_rule_two_total_hour_enabled'] ?? false,
                    'is_saturday_exceptional' => $input['is_saturday_exceptional'] ?? false,
                    'is_sunday_exceptional' => $input['is_sunday_exceptional'] ?? false,
                    'is_active' => true,
                    'status' => Status::ACTIVE
                );

                $this->leaveRepository->createStaffLeaveSetting($dataArray);
            }

            DB::commit();

            return redirect()->back()->with('message', 'Staff leave setting saved successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /**
     * Staff leave setting change history
     */
    public function staffLeaveSettingChangesHistory(Request $request): Response
    {
        $staffLeaveSettings = [];
        $staffType = "";

        if ($request->isMethod('POST')) {
            $staffType = $request->staff_type ?? "";
            $staffId = $request->staff_id ?? null;

            if (!empty($staffId)) {
                $staffLeaveSettings = $this->leaveRepository->getStaffLeaveSettingsByStaffId($staffId);

                if (count($staffLeaveSettings) > 0) {
                    $staffLeaveSettings = $staffLeaveSettings->map(function ($staffLeaveSetting) {
                        $staffLeaveSetting['in_time'] = !empty($staffLeaveSetting->rule_one_in_time) ? Carbon::parse($staffLeaveSetting->rule_one_in_time)->format('H:i:s A') : '';
                        $staffLeaveSetting['applied_on'] = !empty($staffLeaveSetting->created_at) ? Carbon::parse($staffLeaveSetting->created_at)->format('d-M-Y') : '';

                        return $staffLeaveSetting;
                    });
                }
            }
        }

        // staffs
        $staffs = $this->staffRepository->getStaffDataForLeaveSetting($staffType);

        // staff types
        $staffTypes = buildEnumOptionsArray(TeachingType::cases());

        return Inertia::render('Leave/StaffLeaveSettingChangesHistory', [
            'staffs' => $staffs,
            'staffTypes' => $staffTypes,
            'staffLeaveSettings' => $staffLeaveSettings,
        ]);
    }

    /**
     * Leave Setting.
     */
    public function leaveSetting(): Response
    {
        $leaveSetting = $this->leaveRepository->getCurrentLeaveSetting();

        return Inertia::render('Leave/LeaveSetting', [
            'leaveSetting' => $leaveSetting
        ]);
    }

    /**
     * Save Leave Setting.
     */
    public function saveLeaveSetting(LeaveSettingRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $updateDataArray = [
                'is_active' => false
            ];

            $this->leaveRepository->updateAllLeaveSetting($updateDataArray);

            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'created_by' => auth()->user()->id,
                'is_auto_approve_leave_enabled' => $input['is_auto_approve_leave_enabled'] ?? false,
                'is_half_day_leave_enabled' => $input['is_half_day_leave_enabled'] ?? false,
                'rule_one_in_time' => !empty($input['rule_one_in_time']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['rule_one_in_time'])->timezone(getSchoolTimeZone())->format('H:i:s') : null,
                'rule_two_total_hour' => $input['rule_two_total_hour'] ?? null,
                'is_rule_one_in_time_enabled' => $input['is_rule_one_in_time_enabled'] ?? false,
                'is_rule_two_total_hour_enabled' => $input['is_rule_two_total_hour_enabled'] ?? false,
                'is_saturday_exceptional' => $input['is_saturday_exceptional'] ?? false,
                'is_sunday_exceptional' => $input['is_sunday_exceptional'] ?? false,
                'is_active' => true,
                'status' => Status::ACTIVE
            );

            $this->leaveRepository->createLeaveSetting($dataArray);

            DB::commit();

            return redirect()->back()->with('message', 'Leave setting saved successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /**
     * Leave setting change history
     */
    public function leaveSettingChangesHistory(Request $request): Response
    {
        $leaveSettings = $this->leaveRepository->getActiveLeaveSettingAll();

        if (count($leaveSettings) > 0) {
            $leaveSettings = $leaveSettings->map(function ($leaveSetting) {
                $leaveSetting['in_time'] = !empty($leaveSetting->rule_one_in_time) ? Carbon::parse($leaveSetting->rule_one_in_time)->format('H:i:s A') : '';
                $leaveSetting['applied_on'] = !empty($leaveSetting->created_at) ? Carbon::parse($leaveSetting->created_at)->format('d-M-Y') : '';

                return $leaveSetting;
            });
        }

        return Inertia::render('Leave/LeaveSettingChangesHistory', [
            'leaveSettings' => $leaveSettings,
        ]);
    }

    /**
     * Direct Leave
     */
    public function directLeave(Request $request): Response
    {
        $dayTypes = buildEnumOptionsArray(DayType::cases());
        $leaveShifts = buildEnumOptionsArray(LeaveShift::cases());
        $staffs = $this->staffRepository->getActiveStaffsForDirectLeave()?->map(function ($staff) {
            $staff['title'] = $staff?->first_name . ' ' . $staff?->middle_name . ' ' . $staff?->last_name;

            return $staff;
        });

        $staffLeaveAllocations = [];
        $leaveTypes = [];
        $leaves = [];
        $staff = null;

        if ($request->isMethod('POST')) {
            $employeeId = $request->employee_id ?? "";
            $staffId = $request->staff_id ?? null;

            if (!empty($employeeId)) {
                $staff = $this->staffRepository->getStaffByEmployeeIdForDirectLeave($employeeId);
            } else if (!empty($staffId)) {
                $staff = $this->staffRepository->getStaffByIdForDirectLeave($staffId);
            }

            if ($staff != null) {
                $leaves = $staff?->leaves?->map(function ($leave) {
                    return [
                        'id' => $leave?->id,
                        'staff_id' => $leave?->staff_id,
                        'leave_type_id' => $leave?->leave_type_id,
                        'leave_type' => $leave?->leaveType?->acronym,
                        'start_date_at' => $leave?->start_date_at,
                        'start_date' => !empty($leave?->start_date_at) ? Carbon::parse($leave?->start_date_at)->format('d-M-Y') : '',
                        'end_date_at' => $leave?->end_date_at,
                        'end_date' => !empty($leave?->end_date_at) ? Carbon::parse($leave?->end_date_at)->format('d-M-Y') : '',
                        'no_of_days' => $leave->no_of_days,
                        'is_approved' => $leave->is_approved,
                        'is_cancelled' => $leave->is_cancelled,
                        'leave_days' => !empty($leave->leave_days) ? json_decode($leave->leave_days) : [],
                        'leave_reason' => $leave?->leave_reason,
                    ];
                });

                if ($staff?->staffLeaveAllocations?->count() > 0) {
                    foreach ($staff->staffLeaveAllocations as $leaveAllocation) {
                        if ($leaveAllocation->days > 0) {
                            $staffLeaveAllocations[] = [];
                        }
                    }

                    $staffLeaveAllocations = $staff->staffLeaveAllocations->filter(function ($leaveAllocation) {
                        return $leaveAllocation->days > 0;
                    })->map(function ($leaveAllocation) {
                        $days = round($leaveAllocation->days, 1);
                        $consumedDays = round($leaveAllocation->consumed_days ?? 0, 1);

                        return [
                            'days' => $days,
                            'consumed_days' => $consumedDays,
                            'available_days' => $days - $consumedDays,
                            'leave_type' => $leaveAllocation?->leaveType
                        ];
                    })->toArray();

                    $leaveTypes = $staff->staffLeaveAllocations->filter(function ($leaveAllocation) {
                        return $leaveAllocation->days > 0;
                    })->map(function ($leaveAllocation) {
                        return [
                            'id' => $leaveAllocation->leaveType->id,
                            'title' => $leaveAllocation->leaveType->acronym
                        ];
                    })->toArray();
                }
            }
        }

        return Inertia::render('Leave/DirectLeave', [
            'staffs' => $staffs,
            'leaves' => $leaves,
            'leaveTypes' => !empty($leaveTypes) ? array_values($leaveTypes) : [],
            'leaveShifts' => $leaveShifts,
            'dayTypes' => $dayTypes,
            'staffLeaveAllocations' => !empty($staffLeaveAllocations) ? array_values($staffLeaveAllocations) : [],
            'staff' => $staff,
        ]);
    }

    /**
     * Save Direct Leave
     */
    public function saveDirectLeave(DirectLeaveRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $startDate = !empty($input['start_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date'])->timezone(getSchoolTimeZone())->toDateString() : '';
            $endDate = !empty($input['end_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_date'])->timezone(getSchoolTimeZone())->toDateString() : '';
            $staffId = $input['staff_id'];
            $leaveDays = array_map(function ($leaveDay) {
                return [
                    'date' => !empty($leaveDay['date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $leaveDay['date'])->timezone(getSchoolTimeZone())->format('d-M-Y') : '',
                    'day' => !empty($leaveDay['date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $leaveDay['date'])->timezone(getSchoolTimeZone())->format('l') : '',
                    'day_type' => $leaveDay['day_type'] ?? '',
                    'shift' => $leaveDay['shift'] ?? '',
                ];
            }, $input['leave_days'] ?? []);

            $staff = $this->staffRepository->getStaffById($staffId);
            $staff?->loadMissing(['staffLeaveAllocations', 'leaves']);

            // staff attendances
            $staffAttendances = $this->staffAttendanceRepository->getStaffAttendancesForLeave($startDate, $endDate);

            // leave type
            $leaveType = $this->leaveRepository->getLeaveTypeById($input['leave_type_id']);

            // staff leave allocation
            $staffLeaveAllocation = $staff?->staffLeaveAllocations?->where('leave_type_id', $input['leave_type_id'])->first();

            $availableDays = ($staffLeaveAllocation->days ?? 0) - ($staffLeaveAllocation->consumed_days ?? 0);

            $noOfDays = array_reduce($leaveDays, function ($total, $leaveDay) {
                return $leaveDay['day_type'] == DayType::HALF_DAY->value ? $total + 0.5 : $total + 1;
            }, 0);

            // check if has enough leave balance
            if ($noOfDays > $availableDays) {
                return redirect()->back()->with('error', "You have applied for {$noOfDays} days. You do not have enough leave balance for leave type '{$leaveType->acronym}'.");
            }

            $leaveDates = collect($leaveDays)->pluck('date')->toArray();
            $leaveTakenDates = [];
            $attendanceTakenDates = [];

            if ($staff?->leaves?->count() > 0 && count($leaveDates) > 0) {
                $appliedDates = [];

                foreach ($staff?->leaves as $leave) {
                    $appliedDates = array_merge($appliedDates, collect(json_decode($leave?->leave_days ?? []))->pluck('date')->toArray());
                }

                $leaveTakenDates = array_intersect($leaveDates, $appliedDates);
            }

            // check if already applied for leave for selected date
            if (count($leaveTakenDates) > 0) {
                $dates = implode(',', $leaveTakenDates);

                return redirect()->back()->with('error', "You already applied leave for these: ({$dates}) dates. Please apply leave for new dates or cancel your existing leave requests for below dates.");
            }

            if ($staffAttendances?->count() > 0 && count($leaveDates) > 0) {
                $attendanceDates = $staffAttendances?->map(function ($attendance) {
                    $attendance['attendance_date_at'] = !empty($attendance['attendance_date_at']) ? Carbon::parse($attendance['attendance_date_at'])->format('d-M-Y') : '';

                    return $attendance;
                })->pluck('attendance_date_at')
                    ->toArray();

                $attendanceTakenDates = array_intersect($leaveDates, $attendanceDates);
            }

            // check if attendance is taken for applied date
            if (count($attendanceTakenDates) > 0) {
                $dates = implode(',', $attendanceTakenDates);

                return redirect()->back()->with('error', "Attendance is already marked for these: ({$dates}) dates. Please re-apply leave for non attendance marked days only.");
            }

            // leave setting
            $leaveSetting = $this->leaveRepository->getCurrentLeaveSetting();

            $isAutoApproveLeave = $leaveSetting?->is_auto_approve_leave_enabled == true;

            // create leave
            $dataArray = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'user_id' => auth()->user()->id,
                'staff_id' => $staffId ?? null,
                'leave_type_id' => $input['leave_type_id'] ?? null,
                'leave_type' => $leaveType->title,
                'title' => $input['title'] ?? '',
                'description' => $input['leave_reason'] ?? '',
                'start_date_at' => $startDate,
                'end_date_at' => $endDate,
                'no_of_days' => $noOfDays,
                'is_approved' => $isAutoApproveLeave,
                'is_cancelled' => false,
                'leave_days' => !empty($leaveDays) ? json_encode($leaveDays) : null,
                'format_no' => $input['format_no'] ?? null,
                'status' => Status::ACTIVE,
            ];

            $this->leaveRepository->create($dataArray);

            // update staff leave allocation
            $updateData = [
                'consumed_days' => ($staffLeaveAllocation->consumed_days ?? 0) + $noOfDays
            ];

            $this->leaveRepository->updateLeaveAllocation($staffLeaveAllocation->id, $updateData);

            DB::commit();

            return redirect()->back()->with('message', 'Leave saved successfully');
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }

    /**
     * Update Direct Leave
     */
    public function updateDirectLeave(int $id, DirectLeaveRequest $request): RedirectResponse
    {
        $leave = $this->leaveRepository->getLeaveById($id);

        abort_if(empty($leave), 404);

        $input = $request->validated();

        DB::beginTransaction();

        try {
            $startDate = !empty($input['start_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date'])->timezone(getSchoolTimeZone())->toDateString() : '';
            $endDate = !empty($input['end_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_date'])->timezone(getSchoolTimeZone())->toDateString() : '';
            $staffId = $input['staff_id'];
            $leaveDays = array_map(function ($leaveDay) {
                return [
                    'date' => !empty($leaveDay['date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $leaveDay['date'])->timezone(getSchoolTimeZone())->format('d-M-Y') : '',
                    'day' => !empty($leaveDay['date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $leaveDay['date'])->timezone(getSchoolTimeZone())->format('l') : '',
                    'day_type' => $leaveDay['day_type'] ?? '',
                    'shift' => $leaveDay['shift'] ?? '',
                ];
            }, $input['leave_days'] ?? []);

            $staff = $this->staffRepository->getStaffById($staffId);
            $staff?->loadMissing(['staffLeaveAllocations', 'leaves']);

            // staff attendances
            $staffAttendances = $this->staffAttendanceRepository->getStaffAttendancesForLeave($startDate, $endDate);

            // leave type
            $leaveType = $this->leaveRepository->getLeaveTypeById($input['leave_type_id']);

            // staff leave allocation
            $staffLeaveAllocation = $staff?->staffLeaveAllocations?->where('leave_type_id', $input['leave_type_id'])->first();

            $availableDays = ($staffLeaveAllocation->days ?? 0) - ($staffLeaveAllocation->consumed_days ?? 0);

            $noOfDays = array_reduce($leaveDays, function ($total, $leaveDay) {
                return $leaveDay['day_type'] == DayType::HALF_DAY->value ? $total + 0.5 : $total + 1;
            }, 0);

            // check if has enough leave balance
            if ($noOfDays > $availableDays) {
                return redirect()->back()->with('error', "You have applied for {$noOfDays} days. You do not have enough leave balance for leave type '{$leaveType->acronym}'.");
            }

            $leaveDates = collect($leaveDays)->pluck('date')->toArray();
            $leaveTakenDates = [];
            $attendanceTakenDates = [];

            if ($staff?->leaves?->count() > 0 && count($leaveDates) > 0) {
                $appliedDates = [];

                foreach ($staff?->leaves as $leaveData) {
                    if ($leaveData?->id != $leave->id) {
                        $appliedDates = array_merge($appliedDates, collect(json_decode($leaveData?->leave_days ?? []))->pluck('date')->toArray());
                    }
                }

                $leaveTakenDates = array_intersect($leaveDates, $appliedDates);
            }

            // check if already applied for leave for selected date
            if (count($leaveTakenDates) > 0) {
                $dates = implode(',', $leaveTakenDates);

                return redirect()->back()->with('error', "You already applied leave for these: ({$dates}) dates. Please apply leave for new dates or cancel your existing leave requests for below dates.");
            }

            if ($staffAttendances?->count() > 0 && count($leaveDates) > 0) {
                $attendanceDates = $staffAttendances?->map(function ($attendance) {
                    $attendance['attendance_date_at'] = !empty($attendance['attendance_date_at']) ? Carbon::parse($attendance['attendance_date_at'])->format('d-M-Y') : '';

                    return $attendance;
                })->pluck('attendance_date_at')
                    ->toArray();

                $attendanceTakenDates = array_intersect($leaveDates, $attendanceDates);
            }

            // check if attendance is taken for applied date
            if (count($attendanceTakenDates) > 0) {
                $dates = implode(',', $attendanceTakenDates);

                return redirect()->back()->with('error', "Attendance is already marked for these: ({$dates}) dates. Please re-apply leave for non attendance marked days only.");
            }

            // leave setting
            $leaveSetting = $this->leaveRepository->getCurrentLeaveSetting();

            $isAutoApproveLeave = $leaveSetting?->is_auto_approve_leave_enabled == true;

            // create leave
            $dataArray = [
                'leave_type_id' => $input['leave_type_id'] ?? null,
                'leave_type' => $leaveType->title,
                'title' => $input['title'] ?? '',
                'description' => $input['leave_reason'] ?? '',
                'start_date_at' => $startDate,
                'end_date_at' => $endDate,
                'no_of_days' => $noOfDays,
                'is_approved' => $isAutoApproveLeave,
                'is_cancelled' => false,
                'leave_days' => !empty($leaveDays) ? json_encode($leaveDays) : null,
                'format_no' => $input['format_no'] ?? null
            ];

            $this->leaveRepository->update($leave->id, $dataArray);

            // update staff leave allocation
            $consumedDays = $staffLeaveAllocation->consumed_days ?? 0;
            $prevDays = $leave->no_of_days ?? 0;

            $updateData = [
                'consumed_days' => ($consumedDays - $prevDays) + $noOfDays
            ];

            $this->leaveRepository->updateLeaveAllocation($staffLeaveAllocation->id, $updateData);

            DB::commit();

            return redirect()->back()->with('message', 'Leave updated successfully');
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }

    /**
     * Request Leave
     */
    public function requestLeave(): Response
    {
        $userId = auth()->user()->id;
        $staff = $this->staffRepository->getStaffByUserId($userId);
        $staff?->loadMissing(['staffLeaveAllocations.leaveType', 'designation', 'leaves.leaveType']);
        $staffLeaveAllocations = [];
        $leaveTypes = [];

        $leaves = $staff?->leaves?->map(function ($leave) {
            return [
                'leave_type' => $leave?->leaveType?->acronym,
                'start_date' => !empty($leave?->start_date_at) ? Carbon::parse($leave?->start_date_at)->format('d-M-Y') : '',
                'end_date' => !empty($leave?->end_date_at) ? Carbon::parse($leave?->end_date_at)->format('d-M-Y') : '',
                'no_of_days' => $leave->no_of_days,
                'is_approved' => $leave->is_approved,
                'is_cancelled' => $leave->is_cancelled,
            ];
        });

        if ($staff?->staffLeaveAllocations?->count() > 0) {
            foreach ($staff->staffLeaveAllocations as $leaveAllocation) {
                if ($leaveAllocation->days > 0) {
                    $staffLeaveAllocations[] = [];
                }
            }

            $staffLeaveAllocations = $staff->staffLeaveAllocations->filter(function ($leaveAllocation) {
                return $leaveAllocation->days > 0;
            })->map(function ($leaveAllocation) {
                $days = round($leaveAllocation->days, 1);
                $consumedDays = round($leaveAllocation->consumed_days ?? 0, 1);

                return [
                    'days' => $days,
                    'consumed_days' => $consumedDays,
                    'available_days' => $days - $consumedDays,
                    'leave_type' => $leaveAllocation?->leaveType
                ];
            })->toArray();

            $leaveTypes = $staff->staffLeaveAllocations->filter(function ($leaveAllocation) {
                return $leaveAllocation->days > 0;
            })->map(function ($leaveAllocation) {
                return [
                    'id' => $leaveAllocation->leaveType->id,
                    'title' => $leaveAllocation->leaveType->acronym
                ];
            })->toArray();
        }

        $dayTypes = buildEnumOptionsArray(DayType::cases());
        $leaveShifts = buildEnumOptionsArray(LeaveShift::cases());

        return Inertia::render('Leave/RequestLeave', [
            'leaves' => $leaves,
            'leaveTypes' => !empty($leaveTypes) ? array_values($leaveTypes) : [],
            'leaveShifts' => $leaveShifts,
            'dayTypes' => $dayTypes,
            'staffLeaveAllocations' => !empty($staffLeaveAllocations) ? array_values($staffLeaveAllocations) : [],
            'staff' => $staff,
        ]);
    }

    /**
     * Save Leave Request
     */
    public function saveLeaveRequest(RequestLeaveRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $startDate = !empty($input['start_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['start_date'])->timezone(getSchoolTimeZone())->toDateString() : '';
            $endDate = !empty($input['end_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['end_date'])->timezone(getSchoolTimeZone())->toDateString() : '';
            $staffId = $input['staff_id'];
            $leaveDays = array_map(function ($leaveDay) {
                return [
                    'date' => !empty($leaveDay['date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $leaveDay['date'])->timezone(getSchoolTimeZone())->format('d-M-Y') : '',
                    'day' => !empty($leaveDay['date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $leaveDay['date'])->timezone(getSchoolTimeZone())->format('l') : '',
                    'day_type' => $leaveDay['day_type'] ?? '',
                    'shift' => $leaveDay['shift'] ?? '',
                ];
            }, $input['leave_days'] ?? []);

            $staff = $this->staffRepository->getStaffById($staffId);
            $staff?->loadMissing(['staffLeaveAllocations', 'leaves']);

            $staffAttendances = $this->staffAttendanceRepository->getStaffAttendancesForLeave($startDate, $endDate);

            $leaveType = $this->leaveRepository->getLeaveTypeById($input['leave_type_id']);

            $staffLeaveAllocation = $staff?->staffLeaveAllocations?->where('leave_type_id', $input['leave_type_id'])->first();

            $availableDays = ($staffLeaveAllocation->days ?? 0) - ($staffLeaveAllocation->consumed_days ?? 0);

            $noOfDays = array_reduce($leaveDays, function ($total, $leaveDay) {
                return $leaveDay['day_type'] == DayType::HALF_DAY->value ? $total + 0.5 : $total + 1;
            }, 0);

            // check if has enough leave balance
            if ($noOfDays > $availableDays) {
                return redirect()->back()->with('error', "You have applied for {$noOfDays} days. You do not have enough leave balance for leave type '{$leaveType->acronym}'.");
            }

            $leaveDates = collect($leaveDays)->pluck('date')->toArray();
            $leaveTakenDates = [];
            $attendanceTakenDates = [];

            if ($staff?->leaves?->count() > 0 && count($leaveDates) > 0) {
                $appliedDates = [];

                foreach ($staff?->leaves as $leave) {
                    $appliedDates = array_merge($appliedDates, collect(json_decode($leave?->leave_days ?? []))->pluck('date')->toArray());
                }

                $leaveTakenDates = array_intersect($leaveDates, $appliedDates);
            }

            // check if already applied for leave for selected date
            if (count($leaveTakenDates) > 0) {
                $dates = implode(',', $leaveTakenDates);

                return redirect()->back()->with('error', "You already applied leave for these: ({$dates}) dates. Please apply leave for new dates or cancel your existing leave requests for below dates.");
            }

            if ($staffAttendances?->count() > 0 && count($leaveDates) > 0) {
                $attendanceDates = $staffAttendances?->map(function ($attendance) {
                    $attendance['attendance_date_at'] = !empty($attendance['attendance_date_at']) ? Carbon::parse($attendance['attendance_date_at'])->format('d-M-Y') : '';

                    return $attendance;
                })->pluck('attendance_date_at')
                    ->toArray();

                $attendanceTakenDates = array_intersect($leaveDates, $attendanceDates);
            }

            // check if attendance is taken for applied date
            if (count($attendanceTakenDates) > 0) {
                $dates = implode(',', $attendanceTakenDates);

                return redirect()->back()->with('error', "Attendance is already marked for these: ({$dates}) dates. Please re-apply leave for non attendance marked days only.");
            }

            // leave setting
            $leaveSetting = $this->leaveRepository->getCurrentLeaveSetting();

            $isAutoApproveLeave = $leaveSetting?->is_auto_approve_leave_enabled == true;

            $dataArray = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'user_id' => auth()->user()->id,
                'staff_id' => $staffId ?? null,
                'leave_type_id' => $input['leave_type_id'] ?? null,
                'leave_type' => $leaveType->title,
                'title' => $input['title'] ?? '',
                'description' => $input['leave_reason'] ?? '',
                'start_date_at' => $startDate,
                'end_date_at' => $endDate,
                'no_of_days' => $noOfDays,
                'is_approved' => $isAutoApproveLeave,
                'is_cancelled' => false,
                'leave_days' => !empty($leaveDays) ? json_encode($leaveDays) : null,
                'format_no' => $input['format_no'] ?? null,
                'status' => Status::ACTIVE,
            ];

            $this->leaveRepository->create($dataArray);

            // update staff leave allocation
            $updateData = [
                'consumed_days' => ($staffLeaveAllocation->consumed_days ?? 0) + $noOfDays
            ];

            $this->leaveRepository->updateLeaveAllocation($staffLeaveAllocation->id, $updateData);

            DB::commit();

            return redirect()->back()->with('message', 'Leave saved successfully');
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }

    /**
     * Display the schools.
     */
    public function manageLeaveRequest(Request $request): Response
    {
        $userId = auth()->user()->id;
        $staff = $this->staffRepository->getStaffByUserId($userId);
        $staff?->loadMissing(['leaveApprover']);
        $isLeaveApprover = $staff?->leaveApprover != null;


        // $leaveStatusArr = buildEnumOptionsArray(LeaveStatus::cases());
        $leaveStatusArr = [];

        foreach (LeaveStatus::cases() as $case) {
            if ($case != LeaveStatus::REJECTED) {
                array_push($leaveStatusArr, ['id' => $case->value, 'title' => $case->value]);
            }
        }

        $months = [];

        for ($i = 1; $i <= 12; $i++) {
            $months[] = [
                'id' => $i,
                'title' => Carbon::createFromFormat('!m', $i)->format('M'),
            ];
        }

        $leaveStatus = "";
        $month = "";

        if ($request->isMethod('POST')) {
            $leaveStatus = $request->leave_status ?? "";
            $month = $request->month ?? "";
        }

        $leaves = $this->leaveRepository->getFilteredLeaves($leaveStatus, $month);

        if (count($leaves) > 0) {
            $leaves = $leaves->map(function ($leave) {
                $leave['start_date'] = !empty($leave->start_date_at) ? Carbon::parse($leave->start_date_at)->format('d-M-Y') : '';
                $leave['end_date'] = !empty($leave->end_date_at) ? Carbon::parse($leave->end_date_at)->format('d-M-Y') : '';
                $leave['applied_on'] = !empty($leave->created_at) ? Carbon::parse($leave->created_at)->format('d-M-Y') : '';
                $leave['leave_days'] = !empty($leave->leave_days) ? json_decode($leave->leave_days) : [];
                // $leave['approver_note'] = $leave?->cancelled_by == auth()->user()->id ? 'Canceled by you!' : ($leave?->cancelledBy != null ? "Canceled by {$leave?->cancelledBy?->first_name} {$leave?->cancelledBy?->middle_name} {$leave?->cancelledBy?->last_name}" : 'Waiting For Approval!');

                if ($leave?->is_cancelled) {
                    $leave['approver_note'] = $leave?->cancelled_by == auth()->user()->id && $leave?->staff?->user_id == auth()->user()->id ? 'Canceled by you!' : ($leave?->cancelledBy != null ? "Canceled by {$leave?->cancelledBy?->first_name} {$leave?->cancelledBy?->middle_name} {$leave?->cancelledBy?->last_name}" : '');
                } else if ($leave?->is_approved) {
                    $leave['approver_note'] = ($leave?->approved_by != null && $leave?->approvedBy != null ? "Approved by {$leave?->approvedBy?->first_name} {$leave?->approvedBy?->middle_name} {$leave?->approvedBy?->last_name}" : 'auto approved leave');
                }

                return $leave;
            });
        }

        return Inertia::render('Leave/ManageLeaveRequest', [
            'leaveStatusArr' => $leaveStatusArr,
            'months' => $months,
            'leaves' => $leaves,
            'isLeaveApprover' => $isLeaveApprover
        ]);
    }

    /**
     * Cancel Leave Request
     */
    public function cancelLeaveRequest(int $id): RedirectResponse
    {
        $leave = $this->leaveRepository->getLeaveById($id);

        abort_if(empty($leave), 404);

        DB::beginTransaction();

        try {
            $dataArray = [
                'cancelled_by' => auth()->user()->id,
                'is_cancelled' => true,
                'is_approved' => false
            ];

            $this->leaveRepository->update($id, $dataArray);

            // staff leave allocation
            $staffLeaveAllocation = $this->leaveRepository->getStaffLeaveAllocationByStaffIdAndLeaveTypeId($leave->staff_id, $leave->leave_type_id);

            // update staff leave allocation
            $consumedDays = $staffLeaveAllocation->consumed_days ?? 0;
            $noOfDays = $leave->no_of_days ?? 0;

            if ($staffLeaveAllocation != null) {
                $updateData = [
                    'consumed_days' => $consumedDays - $noOfDays > 0 ? $consumedDays - $noOfDays : 0
                ];

                $this->leaveRepository->updateLeaveAllocation($staffLeaveAllocation->id, $updateData);
            }

            DB::commit();

            return redirect()->back()->with('message', 'Leave canceled successfully.');
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }


    /**
     * Approve Leave Request
     */
    public function approveLeaveRequest(int $id): RedirectResponse
    {
        $leave = $this->leaveRepository->getLeaveById($id);

        abort_if(empty($leave), 404);

        $dataArray = [
            'approved_by' => auth()->user()->id,
            'is_approved' => true
        ];

        $updateLeave = $this->leaveRepository->update($id, $dataArray);

        if (!$updateLeave) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Leave approved successfully.');
    }

    /**
     * Display the schools.
     */
    public function adjustLeave(Request $request): Response
    {
        $leaves = $this->leaveRepository->getActiveAll();

        return Inertia::render('Leave/AdjustLeave', [
            'leaves' => $leaves,
        ]);
    }
}
