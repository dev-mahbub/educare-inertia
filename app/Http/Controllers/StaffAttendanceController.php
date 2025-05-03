<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\DayType;
use App\Enums\LeaveType;
use App\Enums\TeachingType;
use Illuminate\Http\Request;
use App\Enums\AttendanceType;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Repositories\ILeaveRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\StudentRepository;
use App\Repositories\IStudentRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ClassroomRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IDepartmentRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Repositories\IStaffAttendanceRepository;
use App\Http\Requests\ClassroomAttendanceRequest;
use App\Repositories\ClassroomAttendanceRepository;
use App\Repositories\IClassroomAttendanceRepository;

class StaffAttendanceController extends Controller
{

    public function __construct(
        private IClassroomAttendanceRepository $classroomAttendanceRepository,
        private IStudentRepository $studentRepository,
        private IClassroomRepository $classroomRepository,
        private IStaffRepository $staffRepository,
        private IStaffAttendanceRepository $staffAttendanceRepository,
        private IDepartmentRepository $departmentRepository,
        private ILeaveRepository $leaveRepository,
    ) {
        // do something -
        $this->middleware('permission:view attendance staff', ['only' => ['takeAttendance', 'registerView']]);
        $this->middleware('permission:add attendance staff', ['only' => ['takeAttendanceSave']]);
        $this->middleware('permission:edit attendance staff', ['only' => ['updateBiometricCode']]);
    }

    /**
     * Display the schools.
     */
    public function takeAttendance(Request $request): Response
    {
        // staff types
        $staffTypes = [];

        foreach (TeachingType::cases() as $case) {
            array_push($staffTypes, ['id' => $case->value, 'title' => $case->value]);
        }

        // attendance types
        $attendanceTypes = [];

        foreach (AttendanceType::cases() as $case) {
            array_push($attendanceTypes, ['id' => $case->value, 'title' => $case->value]);
        }

        // leave types
        $leaveTypes = [];
        $leaveTypesArray = $this->leaveRepository->getActiveLeaveTypesAll();
        foreach ($leaveTypesArray as $leave) {
            array_push($leaveTypes, ['id' => $leave->title, 'title' => $leave->title, 'leave_type_id' => $leave->id]);
        }

        // departments
        $departments = $this->departmentRepository->getActiveAll()
            ->map(function ($department) {
                return [
                    'id' => $department->id,
                    'title' => $department->name,
                ];
            });

        $staffType = "";
        $departmentId = null;
        $attendanceType = "";
        $attendanceDateAt = date('Y-m-d');

        if ($request->isMethod('POST')) {
            $staffType = $request->staff_type ?? "";
            $departmentId = $request->department_id ?? null;
            $attendanceType = $request->attendance_type ?? "";
            $attendanceDateAt = !empty($request->input('attendance_date_at')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('attendance_date_at'))->timezone(getSchoolTimeZone())->toDateString() : '';
        }

        // staff sttendance
        $staffAttendance = $this->staffAttendanceRepository->getStaffAttendance($attendanceDateAt);

        // staffs
        $allStaff = $this->staffRepository->getFilteredStaffData($staffType, $departmentId, $attendanceType);

        // school settings
        $schoolSetting = getSchoolSetting();
        $isBackDateAllowed = $schoolSetting?->is_attendance_backdate == true;

        // day types
        $dayTypes = buildEnumOptionsArray(DayType::cases());

        return Inertia::render('StaffAttendance/TakeAttendance', [
            'allStaff' => $allStaff,
            'staffTypes' => $staffTypes,
            'attendanceTypes' => $attendanceTypes,
            'departments' => $departments,
            'staffAttendance' => $staffAttendance,
            'leaveTypes' => $leaveTypes,
            'isBackDateAllowed' => $isBackDateAllowed,
            'dayTypes' => $dayTypes
        ]);
    }

    /**
     * staff Attendance Save
     */
    public function takeAttendanceSave(Request $request)
    {
        DB::beginTransaction();

        try {
            $attendance_date_at = !empty($request->input('attendance_date_at')) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('attendance_date_at'))->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d');
            $selectedStaff = $request->input('selected_staff');

            if (!empty($attendance_date_at) && !empty($selectedStaff)) {
                $conditionArray = [
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'attendance_date_at' => $attendance_date_at,
                ];

                $dataArray = [
                    'is_attendance_taken' => true,
                    'attendance_time_at' => date("H:i:s"),
                    'staffs' => json_encode($selectedStaff),
                    'status' => Status::ACTIVE->value,
                ];

                $staffAttendance =  $this->staffAttendanceRepository->updateOrCreate($conditionArray, $dataArray);

                $staffAttendance->activities()->create([
                    'school_id' => getUserSchoolId(),
                    'user_id' => auth()->user()->id,
                    'activitiesable_id' => $staffAttendance->id,
                    'activitiesable_type' => $staffAttendance->getMorphClass(),
                ]);

                // create staff leave request
                foreach ($selectedStaff as $data) {
                    if ($data['attendance_status'] == 'onleave' && $data['is_disabled'] == false) {
                        $data['attendance_date_at'] = $request->input('attendance_date_at');

                        $this->createStaffLeaveRequest($data);
                    }
                }
            } else {
                return redirect()->back()->with('error', 'Please select staff');
            }

            DB::commit();

            return redirect()->back()->with('message', 'Attendance taken successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }

    /*
    * Helper method to create staff leave request
    */
    private function createStaffLeaveRequest(array $data)
    {
        $attendanceDate = $data['attendance_date_at'];

        $startDate = !empty($attendanceDate) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $attendanceDate)->timezone(getSchoolTimeZone())->toDateString() : '';
        $endDate = $startDate;
        $staffId = $data['staff_id'];

        $leaveDays = [
            [
                'date' => !empty($attendanceDate) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp',  $attendanceDate)->timezone(getSchoolTimeZone())->format('d-M-Y') : '',
                'day' => !empty($attendanceDate) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp',  $attendanceDate)->timezone(getSchoolTimeZone())->format('l') : '',
                'day_type' => $data['day_type'] ?? '',
                'shift' => $data['shift'] ?? '',
            ]
        ];

        $staff = $this->staffRepository->getStaffById($staffId);
        $staff?->loadMissing(['staffLeaveAllocations', 'leaves']);

        // leave type
        $leaveType = $this->leaveRepository->getLeaveTypeById($data['leave_type_id']);

        // staff leave allocation
        $staffLeaveAllocation = $staff?->staffLeaveAllocations?->where('leave_type_id', $data['leave_type_id'])->first();

        $availableDays = ($staffLeaveAllocation->days ?? 0) - ($staffLeaveAllocation->consumed_days ?? 0);

        $noOfDays = array_reduce($leaveDays, function ($total, $leaveDay) {
            return $leaveDay['day_type'] == DayType::HALF_DAY->value ? $total + 0.5 : $total + 1;
        }, 0);

        // check if has enough leave balance
        if ($noOfDays <= $availableDays) {
            $leaveDates = collect($leaveDays)->pluck('date')->toArray();
            $leaveTakenDates = [];

            if ($staff?->leaves?->count() > 0 && count($leaveDates) > 0) {
                $appliedDates = [];

                foreach ($staff?->leaves as $leave) {
                    $appliedDates = array_merge($appliedDates, collect(json_decode($leave?->leave_days ?? []))->pluck('date')->toArray());
                }

                $leaveTakenDates = array_intersect($leaveDates, $appliedDates);
            }

            // check if already applied for leave for selected date
            if (count($leaveTakenDates) == 0) {
                // create leave
                $dataArray = [
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'user_id' => auth()->user()->id,
                    'staff_id' => $staffId ?? null,
                    'leave_type_id' => $data['leave_type_id'] ?? null,
                    'leave_type' => $leaveType->title,
                    'title' => '',
                    'description' => 'Direct applied from staff attendance	',
                    'start_date_at' => $startDate,
                    'end_date_at' => $endDate,
                    'no_of_days' => $noOfDays,
                    'is_approved' => true,
                    'is_cancelled' => false,
                    'leave_days' => !empty($leaveDays) ? json_encode($leaveDays) : null,
                    'format_no' => null,
                    'status' => Status::ACTIVE,
                ];
                $this->leaveRepository->create($dataArray);

                // update staff leave allocation
                $updateData = [
                    'consumed_days' => ($staffLeaveAllocation->consumed_days ?? 0) + $noOfDays
                ];

                $this->leaveRepository->updateLeaveAllocation($staffLeaveAllocation->id, $updateData);
            }
        }
    }

    /**
     * Display the schools.
     */
    public function registerView(Request $request): Response
    {
        $classroomAttendances = $this->classroomAttendanceRepository->getActiveAll();
        $students = $this->studentRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('StaffAttendance/RegisterView', [
            'classroomAttendances' => $classroomAttendances,
            'students' => $students,
            'classrooms' => $classrooms,
        ]);
    }

    /**
     * Display the schools.
     */
    public function updateBiometricCode(Request $request): Response
    {
        $classroomAttendances = $this->classroomAttendanceRepository->getActiveAll();
        $students = $this->studentRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('StaffAttendance/UpdateBiometricCode', [
            'classroomAttendances' => $classroomAttendances,
            'students' => $students,
            'classrooms' => $classrooms,
        ]);
    }
}
