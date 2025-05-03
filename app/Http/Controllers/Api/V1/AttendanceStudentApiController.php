<?php

namespace App\Http\Controllers\Api\V1;

use Carbon\Carbon;
use App\Enums\Status;
use App\Http\Controllers\Api\ControllerApi;
use App\Models\ClassroomAttendance;
use App\Models\SchoolSetting;
use App\Repositories\IClassroomAttendanceRepository;
use Illuminate\Http\Request;

class AttendanceStudentApiController extends ControllerApi
{
    use \App\Http\Controllers\Api\V1\Traits\StudentAccessor;

    public function __construct(
        private IClassroomAttendanceRepository $classroomAttendanceRepository,
    ) {
        //
    }
    
    /**
     * @OA\Get(
     *    path="/attendances/student/month-wise-report",
     *    operationId="monthWiseStudentReport",
     *    tags={"StudentAttendance"},
     *    summary="Student Month Wise Report",
     *    description="Student Month Wise Report",
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
    public function monthWiseStudentReport(Request $request)
    {
        $staffResponse = array();
        if ( isset($request->month) ) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();

            $startDateRaw = new Carbon('first day of '. $request->month);
            $startDate = $startDateRaw->toDateString();
            $endDateRaw = new Carbon('last day of '. $request->month);
            $endDate = $endDateRaw->toDateString();
            // check existing take
            $classroomAttendances = $this->classroomAttendanceRepository->getAttendanceBetweenDatesFromClassroomId($request->schoolId, $setting?->academic_year_id, $request->classroomId, $startDate, $endDate);
            $studentResponse = $this->apiStudentsFromAttendanceBetweenDates($classroomAttendances, $request->schoolId, $setting?->academic_year_id, $request->classroomId);
            $classroomStudents = $this->apiStudentDetailsFromClassroomIdExeptsIds($request->classroomId, $studentResponse['student_ids'], $request->schoolId, $setting?->academic_year_id);

            $stdArrayTemp = array();
            if( !empty($classroomStudents) ) {
                foreach($classroomStudents as $std) {
                    $studentData = array('present_count' => 0, 'absent_count' => 0, 'student' => $std);
                    array_push($stdArrayTemp, $studentData);
                }
            }
            $students = array_merge($studentResponse['students'], $stdArrayTemp);
            
        }

        return response()->json([
            'success' => true,
            'data' => $students,
        ], 200);
    }

    /**
     * @OA\Get(
     *    path="/attendances/student/month-wise-days-report",
     *    operationId="monthWiseDaysReport",
     *    tags={"StudentAttendance"},
     *    summary="Student Month Wise Days Report",
     *    description="Student Month Wise Days Report",
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
    public function monthWiseDaysReport(Request $request)
    {
        $studentResponse = array();
        if ( isset($request->month) ) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();

            $startDateRaw = new Carbon('first day of '. $request->month);
            $startDate = $startDateRaw->toDateString();
            $endDateRaw = new Carbon('last day of '. $request->month);
            $endDate = $endDateRaw->toDateString();
            // check existing take
            $classroomAttendances = $this->classroomAttendanceRepository->getAttendanceBetweenDatesFromClassroomId($request->schoolId, $setting?->academic_year_id, $request->classroomId, $startDate, $endDate);
            $studentResponse = $this->apiSingleStudentFromAttendanceBetweenDates($classroomAttendances, $request->studentId);
 
        }

        return response()->json([
            'success' => true,
            'data' => $studentResponse,
        ], 200);
    }

    /**
     * @OA\Get(
     *    path="/attendances/student/day-wise-report",
     *    operationId="dayWiseStudentReport",
     *    tags={"StudentAttendance"},
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
    public function dayWiseStudentReport(Request $request)
    {
        $studentResponse = array();
        if ( isset($request->attendanceDateAt) ) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $attendanceDateAt = !empty($request->attendanceDateAt) ? \Carbon\Carbon::parse($request->attendanceDateAt)->format('Y-m-d') : date('Y-m-d');
            $classroomAttendances = $this->classroomAttendanceRepository->getAttendanceList($attendanceDateAt, $request->classroomId, $request->schoolId, $setting?->academic_year_id);
            $studentResponse = $this->apiStudentsFromAttendanceOnDate($classroomAttendances, $request->schoolId, $setting?->academic_year_id, $request->classroomId);
 
        }

        return response()->json([
            'success' => true,
            'data' => $studentResponse,
        ], 200);
    }


    

    /**
     * @OA\Get(
     *    path="/attendances/student/student-wise-report",
     *    operationId="studentWiseReport",
     *    tags={"StudentAttendance"},
     *    summary="Student Wise Report",
     *    description="Student Wise Report",
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
    public function studentWiseReport(Request $request)
    {
        $studentResponse = array();
        if ( isset($request->studentId) ) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $classroomAttendances = $this->classroomAttendanceRepository->getAttendanceByClassroomId($request->classroomId, $request->schoolId, $setting?->academic_year_id);
            $studentResponse = $this->apiStudentsFromAttendancesAll($classroomAttendances, $request->studentId);
 
        }

        return response()->json([
            'success' => true,
            'data' => $studentResponse,
        ], 200);
    }

    

    /**
     * @OA\Get(
     *    path="/attendances/student/check",
     *    operationId="checkStudentAttendance",
     *    tags={"StudentAttendance"},
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
    public function checkStudentAttendance(Request $request)
    {
        $setting = SchoolSetting::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->first();

        $attendanceDateAt = !empty($request->attendanceDateAt) ? \Carbon\Carbon::parse($request->attendanceDateAt)->format('Y-m-d') : date('Y-m-d');
        $checkAlreadyAttendance = $this->classroomAttendanceRepository->getAttendanceList($attendanceDateAt, $request->classroomId, $request->schoolId, $setting?->academic_year_id);
        $studentResponse = $this->apiStudentsFromAttendance($checkAlreadyAttendance, $request->schoolId, $setting?->academic_year_id, $request->classroomId);
        $classroomStudents = $this->apiStudentDetailsFromClassroomIdExeptsIds($request->classroomId, $studentResponse['student_ids'], $request->schoolId, $setting?->academic_year_id);

        $stdArrayTemp = array();
        if( !empty($classroomStudents) ) {
            foreach($classroomStudents as $std) {
                $studentData = array('is_leave' => false, 'attendance_status' => 'not_taken', 'student' => $std);
                array_push($stdArrayTemp, $studentData);
            }
        }
        $students = array_merge($studentResponse['students'], $stdArrayTemp);
        
        return response()->json([
            'success' => true,
            'data' => $students,
            'data2' => $checkAlreadyAttendance,
        ], 200);
    }

    /**
     * @OA\Post(
     * path="/attendances/student/take",
     * summary="Take Student Attendance",
     * description="Take Student Attendance",
     * operationId="takeStudent",
     * tags={"StudentAttendance"},
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
    public function takeStudent(Request $request)
    {
        $setting = SchoolSetting::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->first();

        
        $userId = $request->userId;
        $toDay = date('Y-m-d');

        $academicYearId = $setting?->academic_year_id;
        $classroomId =  $request->classroomId; 
        $attendanceDateAt = !empty($request->attendanceDateAt) ? \Carbon\Carbon::parse($request->attendanceDateAt)->format('Y-m-d') : '';
        $isCurrentDate = ($toDay === $attendanceDateAt) ? true : false;
        $checkAlreadyAttendance = $this->classroomAttendanceRepository->getAttendanceList($attendanceDateAt, $classroomId, $request->schoolId, $academicYearId);
        // check existing take
        $studentResponse = $this->apiStudentsFromAttendance($checkAlreadyAttendance, $request->schoolId, $academicYearId, $classroomId);
        $classroomStudents = $this->apiStudentDetailsFromClassroomIdExeptsIds($request->classroomId, $studentResponse['student_ids'], $request->schoolId, $setting?->academic_year_id);

        $stdArrayTemp = array();
        if( !empty($classroomStudents[0]) ) {
            foreach($classroomStudents as $std) {
                $studentData = array('is_leave' => false, 'attendance_status' => 'not_taken', 'student' => $std);
                array_push($stdArrayTemp, $studentData);
            }
        }
        $students = array_merge($studentResponse['students'], $stdArrayTemp);

        if (!empty($request->students)) {
            if (!empty($checkAlreadyAttendance[0]->id)) {
                $dataArrayUpdate = [
                    'school_id' => $request->schoolId,
                    'classroom_id' => $classroomId,
                    'academic_year_id' => $academicYearId,
                    'students' => $request->students,
                ];
                $takeAttendance =  $this->classroomAttendanceRepository->update($checkAlreadyAttendance[0]->id, $dataArrayUpdate);
                if ($takeAttendance) {
                    $takeAttendance = $this->classroomAttendanceRepository->getById($checkAlreadyAttendance[0]->id);

                    $takeAttendance->activities()->create([
                        'school_id' => getUserSchoolId(),
                        'user_id' => $userId,
                        'activitiesable_id' => $takeAttendance->id,
                        'activitiesable_type' => $takeAttendance->getMorphClass(),
                    ]);
                }
            } 
            else {
                $dataArray = [
                    'school_id' => $request->schoolId,
                    'classroom_id' => $classroomId,
                    'academic_year_id' => $academicYearId,
                    'taken_by_id' => $userId ?? '',
                    'holiday_title' => '',
                    'is_attendance_taken' => true,
                    'is_current_date' => $isCurrentDate,
                    'is_attendance_allowed_on_back_date' => false,
                    'attendance_date_at' => $attendanceDateAt,
                    'attendance_time_at' => date("H:i:s"),
                    'students' => $request->students,
                    'status' => Status::ACTIVE->value,
                ];
                $takeAttendance =  $this->classroomAttendanceRepository->create($dataArray);
                if ($takeAttendance) {
                    $takeAttendance->activities()->create([
                        'school_id' => $request->schoolId,
                        'user_id' => $userId,
                        'activitiesable_id' => $takeAttendance->id,
                        'activitiesable_type' => $takeAttendance->getMorphClass(),
                    ]);
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'created successfully',
                'data' => $students,
                'data2' => $takeAttendance,
            ], 200);
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'students json data required',
                'data' => []
            ], 200);
        }
    }
}