<?php

namespace App\Http\Controllers\Api\V1;

use Carbon\Carbon;
use App\Enums\Status;
use App\Http\Controllers\Api\ControllerApi;
use App\Models\ClassroomAttendance;
use App\Models\SchoolSetting;
use App\Repositories\IStaffAttendanceRepository;
use App\Repositories\IStaffRepository;
use Illuminate\Http\Request;

class AttendanceTeacherApiController extends ControllerApi
{
    use \App\Http\Controllers\Api\V1\Traits\StudentAccessor;

    public function __construct(
        private IStaffAttendanceRepository $staffAttendanceRepository,
        private IStaffRepository $staffRepository,
    ) {
        //
    }

    /**
     * @OA\Get(
     *    path="/attendances/staff/day-wise-report",
     *    operationId="dayWiseStaffReport",
     *    tags={"StaffAttendance"},
     *    summary="Student Day Wise Report",
     *    description="Student Day Wise Report",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function dayWiseStaffReport()
    {
        $classroomAttendances = [];
        return response()->json([
            'success' => true,
            'data' => $classroomAttendances,
        ], 200);
    }

    /**
     * @OA\Get(
     *    path="/attendances/staff/month-wise-report",
     *    operationId="monthWiseReport",
     *    tags={"StaffAttendance"},
     *    summary="Staff Month Wise Report",
     *    description="Staff Month Wise Report",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function monthWiseReport(Request $request)
    {
        $staffs = array();
        if (isset($request->month)) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();

            $startDateRaw = new Carbon('first day of ' . $request->month);
            $startDate = $startDateRaw->toDateString();
            $endDateRaw = new Carbon('last day of ' . $request->month);
            $endDate = $endDateRaw->toDateString();
            // check existing take
            $checkAlreadyAttendance = $this->staffAttendanceRepository->getStaffAttendanceBetweenDates($request->schoolId, $setting?->academic_year_id, $startDate, $endDate);
            $staffResponse = $this->apiStaffFromAttendanceBetweenDates($checkAlreadyAttendance);
            $staffsAll = $this->staffRepository->getStaffDetailsExeptsIds($staffResponse['staff_ids'], $request->schoolId, $setting?->academic_year_id);

            $staffArrayTemp = array();
            if (!empty($staffsAll)) {
                foreach ($staffsAll as $staff) {
                    $staffData = array(
                        'leave_count' => 0,
                        'absent_count' => 0,
                        'halfday_count' => 0,
                        'present_count' => 0,
                        'staff' => $staff
                    );
                    array_push($staffArrayTemp, $staffData);
                }
            }
            $staffs = array_merge($staffResponse['staffs'], $staffArrayTemp);
        }

        return response()->json([
            'success' => true,
            'data' => $staffs,
        ], 200);
    }

    /**
     * @OA\Get(
     *    path="/attendances/staff/extra-wise-report",
     *    operationId="extraWiseReport",
     *    tags={"StaffAttendance"},
     *    summary="Staff Month extra Wise Report",
     *    description="Staff Month extra Wise Report",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function extraWiseReport(Request $request)
    {
        $staffResponse = array();
        if (isset($request->month)) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();

            $startDateRaw = new Carbon('first day of ' . $request->month);
            $startDate = $startDateRaw->toDateString();
            $endDateRaw = new Carbon('last day of ' . $request->month);
            $endDate = $endDateRaw->toDateString();

            $staffId = isset($request->staffId) ? $request->staffId : null;
            // check existing take
            $checkAlreadyAttendance = $this->staffAttendanceRepository->getStaffAttendanceBetweenDates($request->schoolId, $setting?->academic_year_id, $startDate, $endDate);
            $staffResponse = $this->apiExtraDayFromAttendanceBetweenDates($checkAlreadyAttendance, $staffId);
        }

        return response()->json([
            'success' => true,
            'data' => $staffResponse,
        ], 200);
    }

    /**
     * @OA\Get(
     *    path="/attendances/staff/staff-wise-report",
     *    operationId="staffWiseReport",
     *    tags={"StaffAttendance"},
     *    summary="Staff Month Wise Report",
     *    description="Staff Month Wise Report",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function staffWiseReport(Request $request)
    {
        $staffs = array();
        if (isset($request->staffId)) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();

            // check existing take
            $checkAlreadyAttendance = $this->staffAttendanceRepository->getActiveAll($request->schoolId, $setting?->academic_year_id);
            $staffResponse = $this->apiStaffFromMonths($checkAlreadyAttendance, $request->staffId);
        }

        return response()->json([
            'success' => true,
            'data' => $staffResponse,
        ], 200);
    }

    /**
     * @OA\Get(
     *    path="/attendances/staff/staff-outdoor-report",
     *    operationId="staffOutdoorReport",
     *    tags={"StaffAttendance"},
     *    summary="Staff Month Wise Report",
     *    description="Staff Month Wise Report",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function staffOutdoorReport(Request $request)
    {
        if (!empty($request->month) && !empty($request->staffId)) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();


            $startDateRaw = new Carbon('first day of ' . $request->month);
            $startDate = $startDateRaw->toDateString();
            $endDateRaw = new Carbon('last day of ' . $request->month);
            $endDate = $endDateRaw->toDateString();
            // check existing take
            $checkAlreadyAttendance = $this->staffAttendanceRepository->getStaffAttendanceBetweenDates($request->schoolId, $setting?->academic_year_id, $startDate, $endDate);
            $staffResponse = $this->apiStaffFromClassroom($checkAlreadyAttendance, $request->staffId);
            $teachers = getTeacherClassroom($request->schoolId, $setting?->academic_year_id, $staffResponse);
            $teachers = !empty($teachers[$request->staffId]) ? $teachers[$request->staffId] : null;

            return response()->json([
                'success' => true,
                'data' => [
                    'staff' => $teachers
                ],
            ], 200);
        } else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => []
            ], 200);
        }
    }


    /**
     * @OA\Get(
     *    path="/attendances/staff/check",
     *    operationId="checkAttendance",
     *    tags={"StaffAttendance"},
     *    summary="Check Students Attendances",
     *    description="Check Students Attendances",
     *    security={ {"sanctum": {} }},
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function checkAttendance(Request $request)
    {
        if (!empty($request->schoolId) && !empty($request->attendanceDateAt)) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();

            $attendanceDateAt = !empty($request->attendanceDateAt) ? \Carbon\Carbon::parse($request->attendanceDateAt)->format('Y-m-d') : date('Y-m-d');
            // check existing take
            $checkAlreadyAttendance = $this->staffAttendanceRepository->getCheckAlreadyAttendance($request->schoolId, $setting?->academic_year_id, $attendanceDateAt);
            $staffResponse = $this->apiStaffFromAttendance($checkAlreadyAttendance, $request->schoolId);
            $staffsAll = $this->staffRepository->getStaffDetailsExeptsIds($staffResponse['staff_ids'], $request->schoolId, $setting?->academic_year_id);

            $staffArrayTemp = array();
            if (!empty($staffsAll)) {
                foreach ($staffsAll as $staff) {
                    if ($staff->staffProfileImageRaw == null) {
                        $path = ['path' => '', 'id' => 0];
                    } else {
                        $path = ['path' => $staff?->staffProfileImageRaw?->path, 'id' => $staff?->staffProfileImageRaw?->imageable_id];
                    }
                    $staff->makeHidden(['staffProfileImageRaw']);
                    $staff['staff_profile_image_raw'] = $path;
                    $staffData = array(
                        'is_leave' => false,
                        'staff_id' => $staff->id,
                        'is_absent' => false,
                        'is_halfday' => false,
                        'is_present' => false,
                        'is_weekly_off' => false,
                        'attendance_status' => 'not_taken',
                        'staff' => $staff
                    );
                    array_push($staffArrayTemp, $staffData);
                }
            }
            $staffs = array_merge($staffResponse['staffs'], $staffArrayTemp);



            return response()->json([
                'success' => true,
                'data' => $staffs,
            ], 200);
        } else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => []
            ], 200);
        }
    }

    /**
     * @OA\Post(
     * path="/attendances/staff/take",
     * summary="Take Student Attendance",
     * description="Take Student Attendance",
     * operationId="takeStaff",
     * tags={"StaffAttendance"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Take Student Attendance",
     *    @OA\JsonContent(
     *       required={"schoolId","classroomId","students","userId","role","password"},
     *       @OA\Property(property="email", type="string", format="email", example="nasir.chalo@gmail.com"),
     *       @OA\Property(property="password", type="string", format="password", example="password"),
     *       @OA\Property(property="first_name", type="string", example="first name"),
     *       @OA\Property(property="last_name", type="string", example="last name"),
     *       @OA\Property(property="phone", type="string", example="phone"),
     *       @OA\Property(property="role", type="string", example="role"),
     *    ),
     * ),
     * @OA\Response(
     *    response=422,
     *    description="Error response",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, Already taken attendance")
     *        )
     *     )
     * )
     */
    public function takeStaff(Request $request)
    {
        $setting = SchoolSetting::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->first();

        $academicYearId = $setting?->academic_year_id;
        $attendanceDateAt = !empty($request->attendanceDateAt) ? \Carbon\Carbon::parse($request->attendanceDateAt)->format('Y-m-d') : date('Y-m-d');

        if (!empty($request->selected_staff)) {
            $conditionArray = [
                'school_id' => $request->schoolId,
                'academic_year_id' => $academicYearId,
                'attendance_date_at' => $attendanceDateAt,
            ];

            $dataArray = [
                'school_id' => $request->schoolId,
                'academic_year_id' => $academicYearId,
                'is_attendance_taken' => true,
                'attendance_time_at' => date("H:i:s"),
                'staffs' => $request->input('selected_staff'),
                'status' => Status::ACTIVE->value,
            ];

            // Find existing record or create a new one based on conditionArray
            $staffAttendance =  $this->staffAttendanceRepository->updateOrCreate($conditionArray, $dataArray);
            $checkAlreadyAttendance = $this->staffAttendanceRepository->getCheckAlreadyAttendance($request->schoolId, $academicYearId, $attendanceDateAt);
            // check existing take
            $staffResponse = $this->apiStaffFromAttendance($checkAlreadyAttendance, $request->schoolId);

            $staffsAll = $this->staffRepository->getStaffDetailsExeptsIds($staffResponse['staff_ids'], $request->schoolId, $academicYearId);

            $staffArrayTemp = array();
            if (!empty($staffsAll)) {
                foreach ($staffsAll as $staff) {
                    if ($staff->staffProfileImageRaw == null) {
                        $path = ['path' => '', 'id' => 0];
                    } else {
                        $path = ['path' => $staff?->staffProfileImageRaw?->path, 'id' => $staff?->staffProfileImageRaw?->imageable_id];
                    }
                    $staff->makeHidden(['staffProfileImageRaw']);
                    $staff['staff_profile_image_raw'] = $path;
                    $staffData = array(
                        'is_leave' => false,
                        'staff_id' => $staff->id,
                        'is_absent' => false,
                        'is_halfday' => false,
                        'is_present' => false,
                        'is_weekly_off' => false,
                        'attendance_status' => 'not_taken',
                        'staff' => $staff
                    );
                    array_push($staffArrayTemp, $staffData);
                }
            }
            $staffs = array_merge($staffResponse['staffs'], $staffArrayTemp);

            return response()->json([
                'success' => true,
                'message' => 'created successfully',
                'data' => $staffs,
            ], 200);
        } else {
            return response()->json([
                'success' => true,
                'message' => 'Staff json data required',
                'data' => []
            ], 200);
        }
    }

    private function apiStaffFromAttendance($attendances, $schoolId = null)
    {
        $staffs = array();
        $staffsData = json_decode($attendances?->staffs);
        $attStaffs = array();

        if (!empty($staffsData)) {
            foreach ($staffsData as $staff) {
                if (!empty($staff->staff_id)) {
                    array_push($attStaffs, $staff->staff_id);
                    $staffObj = $this->staffRepository->getStaffDetailsById($staff->staff_id, $schoolId);
                    if ($staffObj->staffProfileImageRaw == null) {
                        $path = ['path' => '', 'id' => 0];
                    } else {
                        $path = ['path' => $staffObj?->staffProfileImageRaw?->path, 'id' => $staffObj?->staffProfileImageRaw?->imageable_id];
                    }
                    $staffObj->makeHidden(['staffProfileImageRaw']);
                    $staffObj['staff_profile_image_raw'] = $path;
                    $staffData = array(
                        'is_leave' => $staff->is_leave,
                        'staff_id' => $staff->staff_id,
                        'is_absent' => $staff->is_absent,
                        'is_halfday' => $staff->is_halfday,
                        'is_present' => $staff->is_present,
                        'is_weekly_off' => $staff->is_weekly_off,
                        'attendance_status' => $staff->attendance_status,
                        'staff' => $staffObj
                    );
                    array_push($staffs, $staffData);
                }
            }
        }

        return [
            'staffs' => $staffs,
            'staff_ids' => $attStaffs
        ];
    }

    private function apiStaffFromAttendanceBetweenDates($attendances)
    {
        $staffs = array();
        $attStaffs = array();
        if (!empty($attendances->toArray())) {
            foreach ($attendances as $attendance) {
                $staffsData = json_decode($attendance?->staffs);
                if (!empty($staffsData)) {
                    foreach ($staffsData as $staff) {
                        if (!empty($staff->staff_id)) {
                            array_push($attStaffs, $staff->staff_id);
                            // $staffObj = $this->staffRepository->getStaffDetailsById($staff->staff_id);
                            $staffObj = $this->staffRepository->getStaffDetailsByIdForAttendanceReport($staff->staff_id);

                            if ($staffObj == null) {
                                continue;
                            }

                            // leave count
                            if (isset($staffs[$staff->staff_id]['leave_count'])) {
                                if ($staff->is_leave == true) {
                                    $staffs[$staff->staff_id]['leave_count'] = intval($staffs[$staff->staff_id]['leave_count']) + 1;
                                } else {
                                    $staffs[$staff->staff_id]['leave_count'] = intval($staffs[$staff->staff_id]['leave_count']) + 0;
                                }
                            } elseif ($staff->is_leave == true) {
                                $staffs[$staff->staff_id]['leave_count'] = 1;
                            } else {
                                $staffs[$staff->staff_id]['leave_count'] = 0;
                            }

                            // absent count
                            if (isset($staffs[$staff->staff_id]['absent_count'])) {
                                if ($staff->is_absent == true) {
                                    $staffs[$staff->staff_id]['absent_count'] = intval($staffs[$staff->staff_id]['absent_count']) + 1;
                                } else {
                                    $staffs[$staff->staff_id]['absent_count'] = intval($staffs[$staff->staff_id]['absent_count']) + 0;
                                }
                            } elseif ($staff->is_absent == true) {
                                $staffs[$staff->staff_id]['absent_count'] = 1;
                            } else {
                                $staffs[$staff->staff_id]['absent_count'] = 0;
                            }

                            // halfday count
                            if (isset($staffs[$staff->staff_id]['halfday_count'])) {
                                if ($staff->is_halfday == true) {
                                    $staffs[$staff->staff_id]['halfday_count'] = intval($staffs[$staff->staff_id]['halfday_count']) + 1;
                                } else {
                                    $staffs[$staff->staff_id]['halfday_count'] = intval($staffs[$staff->staff_id]['halfday_count']) + 0;
                                }
                            } elseif ($staff->is_halfday == true) {
                                $staffs[$staff->staff_id]['halfday_count'] = 1;
                            } else {
                                $staffs[$staff->staff_id]['halfday_count'] = 0;
                            }

                            // present count
                            if (isset($staffs[$staff->staff_id]['present_count'])) {
                                if ($staff->is_present == true) {
                                    $staffs[$staff->staff_id]['present_count'] = intval($staffs[$staff->staff_id]['present_count']) + 1;
                                } else {
                                    $staffs[$staff->staff_id]['present_count'] = intval($staffs[$staff->staff_id]['present_count']) + 0;
                                }
                            } elseif ($staff->is_present == true) {
                                $staffs[$staff->staff_id]['present_count'] = 1;
                            } else {
                                $staffs[$staff->staff_id]['present_count'] = 0;
                            }

                            // weekly off count
                            if (isset($staffs[$staff->staff_id]['weekly_off_count'])) {
                                if ($staff->is_weekly_off == true) {
                                    $staffs[$staff->staff_id]['weekly_off_count'] = intval($staffs[$staff->staff_id]['weekly_off_count']) + 1;
                                } else {
                                    $staffs[$staff->staff_id]['weekly_off_count'] = intval($staffs[$staff->staff_id]['weekly_off_count']) + 0;
                                }
                            } elseif ($staff->is_weekly_off == true) {
                                $staffs[$staff->staff_id]['weekly_off_count'] = 1;
                            } else {
                                $staffs[$staff->staff_id]['weekly_off_count'] = 0;
                            }

                            $staffs[$staff->staff_id]['staff'] = $staffObj;
                        }
                    }
                }
            }
        }

        return [
            'staffs' => array_values($staffs),
            'staff_ids' => array_unique($attStaffs)
        ];
    }

    private function apiExtraDayFromAttendanceBetweenDates($attendances, $staffId)
    {
        $staffs = array();
        if (!empty($attendances)) {
            foreach ($attendances as $attendance) {
                $staffsData = json_decode($attendance?->staffs);
                if (!empty($staffsData)) {
                    foreach ($staffsData as $staff) {
                        if ($staff->staff_id == $staffId) {
                            $staffObj = $this->staffRepository->getStaffDetailsById($staff->staff_id);
                            // is_halfday
                            if ($staff->is_halfday == true) {
                                $tempArray = [
                                    'title' => 'Halfday',
                                    'staff' => $staffObj,
                                    'attendanceDate' => $attendance->attendance_date_at
                                ];

                                $staffs[$attendance->attendance_date_at] = $tempArray;
                            }
                        }
                    }
                }
            }
        }

        return array_values($staffs);
    }

    private function apiStaffFromMonths($attendances, $staffId)
    {
        $months = array('April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January');
        $staffs = array();
        if (!empty($attendances)) {
            foreach ($attendances as $attendance) {
                $staffsData = json_decode($attendance?->staffs);
                if (!empty($staffsData)) {
                    foreach ($staffsData as $staff) {
                        if ($staff->staff_id == $staffId) {
                            $attnMonth = Carbon::parse($attendance->attendance_date_at)->format('F');
                            // leave count
                            if (isset($staffs[$attnMonth]['leave_count'])) {
                                if ($staff->is_leave == true) {
                                    $staffs[$attnMonth]['leave_count'] = intval($staffs[$attnMonth]['leave_count']) + 1;
                                } else {
                                    $staffs[$attnMonth]['leave_count'] = intval($staffs[$attnMonth]['leave_count']) + 0;
                                }
                            } elseif ($staff->is_leave == true) {
                                $staffs[$attnMonth]['leave_count'] = 1;
                            } else {
                                $staffs[$attnMonth]['leave_count'] = 0;
                            }

                            // absent count
                            if (isset($staffs[$attnMonth]['absent_count'])) {
                                if ($staff->is_absent == true) {
                                    $staffs[$attnMonth]['absent_count'] = intval($staffs[$attnMonth]['absent_count']) + 1;
                                } else {
                                    $staffs[$attnMonth]['absent_count'] = intval($staffs[$attnMonth]['absent_count']) + 0;
                                }
                            } elseif ($staff->is_absent == true) {
                                $staffs[$attnMonth]['absent_count'] = 1;
                            } else {
                                $staffs[$attnMonth]['absent_count'] = 0;
                            }

                            // halfday count
                            if (isset($staffs[$attnMonth]['halfday_count'])) {
                                if ($staff->is_halfday == true) {
                                    $staffs[$attnMonth]['halfday_count'] = intval($staffs[$attnMonth]['halfday_count']) + 1;
                                } else {
                                    $staffs[$attnMonth]['halfday_count'] = intval($staffs[$attnMonth]['halfday_count']) + 0;
                                }
                            } elseif ($staff->is_halfday == true) {
                                $staffs[$attnMonth]['halfday_count'] = 1;
                            } else {
                                $staffs[$attnMonth]['halfday_count'] = 0;
                            }

                            // present count
                            if (isset($staffs[$attnMonth]['present_count'])) {
                                if ($staff->is_present == true) {
                                    $staffs[$attnMonth]['present_count'] = intval($staffs[$attnMonth]['present_count']) + 1;
                                } else {
                                    $staffs[$attnMonth]['present_count'] = intval($staffs[$attnMonth]['present_count']) + 0;
                                }
                            } elseif ($staff->is_present == true) {
                                $staffs[$attnMonth]['present_count'] = 1;
                            } else {
                                $staffs[$attnMonth]['present_count'] = 0;
                            }

                            // weekly off count
                            if (isset($staffs[$attnMonth]['weekly_off_count'])) {
                                if ($staff->is_weekly_off == true) {
                                    $staffs[$attnMonth]['weekly_off_count'] = intval($staffs[$attnMonth]['weekly_off_count']) + 1;
                                } else {
                                    $staffs[$attnMonth]['weekly_off_count'] = intval($staffs[$attnMonth]['weekly_off_count']) + 0;
                                }
                            } elseif ($staff->is_weekly_off == true) {
                                $staffs[$attnMonth]['weekly_off_count'] = 1;
                            } else {
                                $staffs[$attnMonth]['weekly_off_count'] = 0;
                            }

                            $staffs[$attnMonth]['month'] = $attnMonth;
                        }
                    }
                }
            }
        }

        return [
            'staffs' => array_values($staffs),
        ];
    }

    private function apiStaffFromClassroom($attendances, $staffId)
    {
        $classrooms = array();
        if (!empty($attendances)) {
            foreach ($attendances as $attendance) {
                $staffsData = json_decode($attendance?->staffs);
                if (!empty($staffsData)) {
                    foreach ($staffsData as $staff) {

                        if ($staff->staff_id == $staffId) {
                            $attnMonth = Carbon::parse($attendance->attendance_date_at)->format('F');
                            // leave count
                            if (isset($classrooms[$attnMonth]['leave_count'])) {
                                if ($staff->is_leave == true) {
                                    $classrooms[$attnMonth]['leave_count'] = intval($classrooms[$attnMonth]['leave_count']) + 1;
                                } else {
                                    $classrooms[$attnMonth]['leave_count'] = intval($classrooms[$attnMonth]['leave_count']) + 0;
                                }
                            } elseif ($staff->is_leave == true) {
                                $classrooms[$attnMonth]['leave_count'] = 1;
                            } else {
                                $classrooms[$attnMonth]['leave_count'] = 0;
                            }

                            // absent count
                            if (isset($classrooms[$attnMonth]['absent_count'])) {
                                if ($staff->is_absent == true) {
                                    $classrooms[$attnMonth]['absent_count'] = intval($classrooms[$attnMonth]['absent_count']) + 1;
                                } else {
                                    $classrooms[$attnMonth]['absent_count'] = intval($classrooms[$attnMonth]['absent_count']) + 0;
                                }
                            } elseif ($staff->is_absent == true) {
                                $classrooms[$attnMonth]['absent_count'] = 1;
                            } else {
                                $classrooms[$attnMonth]['absent_count'] = 0;
                            }

                            // halfday count
                            if (isset($classrooms[$attnMonth]['halfday_count'])) {
                                if ($staff->is_halfday == true) {
                                    $classrooms[$attnMonth]['halfday_count'] = intval($classrooms[$attnMonth]['halfday_count']) + 1;
                                } else {
                                    $classrooms[$attnMonth]['halfday_count'] = intval($classrooms[$attnMonth]['halfday_count']) + 0;
                                }
                            } elseif ($staff->is_halfday == true) {
                                $classrooms[$attnMonth]['halfday_count'] = 1;
                            } else {
                                $classrooms[$attnMonth]['halfday_count'] = 0;
                            }

                            // present count
                            if (isset($classrooms[$attnMonth]['present_count'])) {
                                if ($staff->is_present == true) {
                                    $classrooms[$attnMonth]['present_count'] = intval($classrooms[$attnMonth]['present_count']) + 1;
                                } else {
                                    $classrooms[$attnMonth]['present_count'] = intval($classrooms[$attnMonth]['present_count']) + 0;
                                }
                            } elseif ($staff->is_present == true) {
                                $classrooms[$attnMonth]['present_count'] = 1;
                            } else {
                                $classrooms[$attnMonth]['present_count'] = 0;
                            }

                            // weekly off count
                            if (isset($classrooms[$attnMonth]['weekly_off_count'])) {
                                if ($staff->is_weekly_off == true) {
                                    $classrooms[$attnMonth]['weekly_off_count'] = intval($classrooms[$attnMonth]['weekly_off_count']) + 1;
                                } else {
                                    $classrooms[$attnMonth]['weekly_off_count'] = intval($classrooms[$attnMonth]['weekly_off_count']) + 0;
                                }
                            } elseif ($staff->is_weekly_off == true) {
                                $classrooms[$attnMonth]['weekly_off_count'] = 1;
                            } else {
                                $classrooms[$attnMonth]['weekly_off_count'] = 0;
                            }
                            $classrooms[$attnMonth]['month'] = $attnMonth;
                        }
                    }
                }
            }
        }
        return !empty(array_values($classrooms)) ? array_values($classrooms) : null;
    }
}
