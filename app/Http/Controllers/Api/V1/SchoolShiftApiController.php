<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\Status;
use App\Enums\TimetableDay;
use Illuminate\Http\Request;
use App\Models\SchoolSetting;
use App\Repositories\IClassroomRepository;
use App\Repositories\ITimetableRepository;
use App\Http\Controllers\Api\ControllerApi;
use App\Repositories\ISchoolShiftRepository;
use App\Repositories\IClassroomPeriodRepository;

class SchoolShiftApiController extends ControllerApi
{
    
    public function __construct(
        private ISchoolShiftRepository $schoolShiftRepository,
        private IClassroomRepository $classroomRepository,
        private IClassroomPeriodRepository $classroomPeriodRepository,
        private ITimetableRepository $timetableRepository,
    )
    {
        // do something
    }
    
    /**
     * @OA\Get(
     *    path="/school-shifts",
     *    operationId="indexSchoolShifts",
     *    tags={"School"},
     *    summary="Get all school shifts",
     *    description="Get all school shifts",
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
    public function indexSchoolShifts(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $schoolShifts = $this->schoolShiftRepository->getActiveAll($request->schoolId, $setting?->academic_year_id);
            return response()->json([
                'success' => true,
                'data' => !empty($schoolShifts) ? $schoolShifts : null,
            ], 200);
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => []
            ], 200);
        }
    }

    /**
     * @OA\Get(
     *    path="/subject-wise",
     *    operationId="subjectWiseTime",
     *    tags={"School"},
     *    summary="Get subject timetable",
     *    description="Get subject timetable",
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
    public function subjectWiseTime(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->type) ) { 
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $timeTableData = array(
                'Monday' => [], 
                'Tuesday' => [], 
                'Wednesday' => [], 
                'Thursday' => [], 
                'Friday' => [], 
                'Saturday' => [], 
                'Sunday' => []
            );
            
            $timetables = $this->classroomRepository->getTimeTableActiveAll($request->type, $request->schoolId, $setting?->academic_year_id);
            if( !empty($timetables) ) {
                foreach($timetables as $time) {
                    $tempArray = array();
                    $days = json_decode($time['repeatable_days']);
                    if( !empty($days) ) {
                        foreach($days as $day) {
                            $timeTableData[$day][] = $time;
                        }
                    }
                }
            }

            return response()->json([
                'success' => true,
                'data' => !empty($timeTableData) ? $timeTableData : null,
            ], 200);
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => []
            ], 200);
        }
    }

    /**
     * @OA\Get(
     *    path="/students-wise",
     *    operationId="studentWiseTime",
     *    tags={"School"},
     *    summary="Get students timetable",
     *    description="Get students timetable",
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
    public function studentWiseTime(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->type) && !empty($request->classroomId) ) { 
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $timeTableData = array(
                'Monday' => [], 
                'Tuesday' => [], 
                'Wednesday' => [], 
                'Thursday' => [], 
                'Friday' => [], 
                'Saturday' => [], 
                'Sunday' => []
            );
            
            $timetables = $this->classroomRepository->getTimeTableActiveAll($request->type, $request->schoolId, $setting?->academic_year_id, $request->classroomId);
            if( !empty($timetables) ) {
                foreach($timetables as $time) {
                    $tempArray = array();
                    $days = json_decode($time['repeatable_days']);
                    if( !empty($days) ) {
                        foreach($days as $day) {
                            $timeTableData[$day][] = $time;
                        }
                    }
                }
            }

            return response()->json([
                'success' => true,
                'data' => !empty($timeTableData) ? $timeTableData : null,
            ], 200);
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => []
            ], 200);
        }
    }

    /**
     * @OA\Get(
     *    path="/staffs-wise",
     *    operationId="staffWiseTime",
     *    tags={"School"},
     *    summary="Get staffs timetable",
     *    description="Get staffs timetable",
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
    public function staffWiseTime(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->type) && !empty($request->staffId) ) { 
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $timeTableData = array(
                'Monday' => [], 
                'Tuesday' => [], 
                'Wednesday' => [], 
                'Thursday' => [], 
                'Friday' => [], 
                'Saturday' => [], 
                'Sunday' => []
            );
            
            $timetables = $this->classroomRepository->getTimeTableActiveAll($request->type, $request->schoolId, $setting?->academic_year_id, $request->classroomId);
            if( !empty($timetables) ) {
                foreach($timetables as $time) {
                    $tempArray = array();
                    $days = json_decode($time['repeatable_days']);
                    if( !empty($days) ) {
                        foreach($days as $day) {
                            $timeTableData[$day][] = $time;
                        }
                    }
                }
            }

            return response()->json([
                'success' => true,
                'data' => !empty($timeTableData) ? $timeTableData : null,
            ], 200);
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => []
            ], 200);
        }
    }

    /**
     * @OA\Get(
     *    path="/timetables/student/view",
     *    operationId="viewStudentTime",
     *    tags={"School"},
     *    summary="Get all school shifts",
     *    description="Get all school shifts",
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
    public function viewStudentTime(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->classroomId) && !empty($request->schoolShiftId) ) {
            $timetables = [];
            $classroomPeriods = [];

            $schoolId = $request->schoolId ?? null;
            $academicYearId = getAcademicYearIdFromSchoolId($schoolId);

            $timetableDays = buildEnumOptionsArray(TimetableDay::cases());
            foreach ($timetableDays as $day) {
                $timetables[$day['title']] = [
                    'period_data' => []
                ];
            }
    
            // Get and process classroom periods
            $periods = $this->classroomPeriodRepository->getClassroomPeriodsByClassroomIdAndSchoolShiftId($request->classroomId, $request->schoolShiftId, $schoolId, $academicYearId);
            
            if (count($periods) > 0) {
                // Map classroom periods
                $classroomPeriods = $periods->map(function ($classroomPeriod) {
                    return [
                        'id' => $classroomPeriod->id,
                        'type' => $classroomPeriod->type,
                        'school_shift_id' => $classroomPeriod->school_shift_id,
                        'classroom_id' => $classroomPeriod->classroom_id,
                        'school_period_id' => $classroomPeriod->school_period_id,
                        'start_time' => $classroomPeriod?->schoolPeriod?->start_time_at,
                        'end_time' => $classroomPeriod?->schoolPeriod?->end_time_at,
                    ];
                })->all();
                
                // Process timetables
                $classroomTimetables = $this->timetableRepository->getClassroomTimetablesByClassroomIdAndSchoolShiftId($request->classroomId, $request->schoolShiftId, $schoolId, $academicYearId);
                
                if (count($classroomTimetables) > 0) {
                    foreach ($classroomTimetables as $timetable) {
                        $timetables[$timetable->day]['period_data'][$timetable->classroom_period_id][] = [
                            'classroom_period_id' => $timetable?->classroom_period_id,
                            'subject_title' => $timetable?->subject?->title,
                            'teacher_name' => trim(implode(' ', [
                                $timetable?->staff?->first_name,
                                $timetable?->staff?->middle_name,
                                $timetable?->staff?->last_name
                            ])),
                        ];
                    }
                }
            }

            $data = $timetables;

            return response()->json([
                'success' => true,
                'data' => !empty($data) ? $data : [],
            ], 200);
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => []
            ], 200);
        }
    }
}
