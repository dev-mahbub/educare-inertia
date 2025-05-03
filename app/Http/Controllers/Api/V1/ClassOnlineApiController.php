<?php

namespace App\Http\Controllers\Api\V1;

use Carbon\Carbon;
use App\Enums\Status;
use App\Enums\UserRole;
use App\Http\Controllers\Api\ControllerApi;
use App\Models\Classroom;
use App\Models\SchoolSetting;
use App\Repositories\IStudentRepository;
use App\Repositories\ISubjectRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IClassroomAttendanceRepository;
use App\Repositories\IStaffRepository;
use App\Http\Requests\OnlineClassRequest;
use App\Http\Requests\OnlineAttendanceRequest;
use Illuminate\Http\Request;

class ClassOnlineApiController extends ControllerApi
{

    public function __construct(
        private IClassroomRepository $classroomRepository,
        private ISubjectRepository $subjectRepository,
        private IStaffRepository $staffRepository,
        private IStudentRepository $studentRepository,
        private IClassroomAttendanceRepository $classroomAttendanceRepository,
    ) {
        // do something
    }

    /**
     * @OA\Get(
     *    path="/online-classes/list",
     *    operationId="indexOnlineClass",
     *    tags={"OnlineClass"},
     *    summary="All online classes",
     *    description="All online classes",
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
    public function indexOnlineClass(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->role) && !empty($request->userId) ) { 
            $teacher = $this->staffRepository->getTeacherByUserId($request->userId, $request->schoolId);
            $teacherId = $teacher?->id;
            $academicYearId = null;
            $subjects = [];
            $online_classes = [];
            $classroomId = $request->classroom_id ?? null;
            $subjectId = $request->subject_id ?? null;
            $startDate = !empty($request->start_date) ? Carbon::createFromFormat('Y-m-d', $request->start_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $endDate = !empty($request->end_date) ? Carbon::createFromFormat('Y-m-d', $request->end_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            if (in_array($request->role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
                $classrooms = $this->classroomRepository->getActiveAll($request->schoolId, $academicYearId);
                if (!empty($classroomId)) {
                    $subjects = $this->subjectRepository->getSubjectsByClassroomId($classroomId, $request->schoolId);
                }

                if (!empty($classroomId) && !empty($subjectId)) {
                    $online_classes = $this->classroomRepository->getOnlineClasses(
                        $classroomId, 
                        $subjectId, 
                        $startDate, 
                        $endDate, 
                        null,
                        $academicYearId, 
                        $request->schoolId
                    );
                }
            } 
            else if ($request->role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
                $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId, null, $request->schoolId, $academicYearId);
                if (!empty($classroomId) && !empty($teacherId)) {
                    $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassroomId($teacherId, $classroomId, $request->schoolId);
                }
                if (!empty($classroomId) && !empty($subjectId)) {
                    $online_classes = $this->classroomRepository->getOnlineClasses(
                        $classroomId, 
                        $subjectId, 
                        $startDate, 
                        $endDate, 
                        $request->userId, 
                        $academicYearId, 
                        $request->schoolId
                    );
                }
            }

            if (count($online_classes) > 0) {
                $online_classes = $online_classes->map(function ($onlineClass) {
                    $onlineClass['repeatable_days'] = !empty($onlineClass->repeatable_days) ? implode(',', json_decode($onlineClass->repeatable_days)) : null;
                    return $onlineClass;
                });
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'online_classes' => $online_classes,
                    'classrooms' => $classrooms,
                    'subjects' => $subjects
                ]
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
     *    path="/online-classes/today",
     *    operationId="showTodayOnlineClass",
     *    tags={"OnlineClass"},
     *    summary="Get today online class",
     *    description="Get today online class",
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
    public function showTodayOnlineClass(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->role) && !empty($request->userId) ) { 
            $teacher = $this->staffRepository->getTeacherByUserId($request->userId, $request->schoolId);
            $teacherId = $teacher?->id;
            $academicYearId = null;
            $classrooms = [];
            $subjects = [];
            $today_online_class = [];
            $currentDate = Carbon::now()->format('Y-m-d H:i:s');
            $classroomId = $request->classroom_id ?? null;
            $subjectId = $request->subject_id ?? null;
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            if (in_array($request->role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
                $classrooms = $this->classroomRepository->getActiveAll($request->schoolId, $academicYearId);

                if (!empty($classroomId)) {
                    $subjects = $this->subjectRepository->getSubjectsByClassroomId($classroomId, $request->schoolId);
                }

                if (!empty($classroomId) && !empty($subjectId)) {
                    $today_online_class = $this->classroomRepository->getTodayOnlineClasses($classroomId, $subjectId, null, $academicYearId, $request->schoolId);
                }
            } else if ($request->role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
                $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId, null, $request->schoolId, $academicYearId);

                if (!empty($classroomId) && !empty($teacherId)) {
                    $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassroomId($teacherId, $classroomId, $request->schoolId);
                }

                if (!empty($classroomId) && !empty($subjectId)) {
                    $today_online_class = $this->classroomRepository->getTodayOnlineClasses($classroomId, $subjectId, $request->userId, $academicYearId, $request->schoolId);
                }
            }

            if (count($today_online_class) > 0) {
                $today_online_class = $today_online_class->map(function ($onlineClass) {
                    $onlineClass['repeatable_days'] = !empty($onlineClass->repeatable_days) ? implode(',', json_decode($onlineClass->repeatable_days)) : null;
                    return $onlineClass;
                });
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'today_online_class' => $today_online_class,
                    'classrooms' => $classrooms,
                    'subjects' => $subjects,
                    'currentDate' => $currentDate
                ]
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
     * @OA\Post(
     * path="/online-classes/save",
     * summary="Save online class",
     * description="Save online class",
     * operationId="saveOnlineClass",
     * tags={"OnlineClass"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Save online class",
     *    @OA\JsonContent(
     *       required={"schoolId", "userId", "classroom_id"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="userId", type="interger", example="1"),
     *       @OA\Property(property="classroom_id", type="interger", example=""),
     *       @OA\Property(property="subject_id", type="interger", example=""), 
     *       @OA\Property(property="start_date", type="string", example=""),
     *       @OA\Property(property="start_time", type="string", example=""),
     *       @OA\Property(property="end_time", type="string", example=""),
     *       @OA\Property(property="repeat_date", type="string", example=""),
     *       @OA\Property(property="repeatable_days", type="string", example="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']"),
     *    ),
     * ),
     * @OA\Response(
     *    response=422,
     *    description="Error response",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, Can't Create")
     *        )
     *     )
     * )
     */
    public function saveOnlineClass(Request $request)
    {

        if (!empty($request->classroom_id) && !empty($request->schoolId) && !empty($request->userId)) {
            $input = $request->all();
            $dataArray = [
                'school_id' => $request->schoolId,
                'academic_year_id' => getAcademicYearIdFromSchoolId($request->schoolId),
                'classroom_id' => $input['classroom_id'] ?? null,
                'subject_id' => $input['subject_id'] ?? null,
                'user_id' => $request->userId,
                'start_date' => !empty($input['start_date']) ? Carbon::createFromFormat('Y-m-d', $input['start_date'])->timezone(getSchoolTimeZone())->toDateString() : date('Y-m-d'),
                'start_time' => !empty($input['start_time']) ? Carbon::createFromFormat('H:i:s', $input['start_time'])->timezone(getSchoolTimeZone())->format('H:i:s') : date('H:i:s'),
                'end_time' => !empty($input['end_time']) ? Carbon::createFromFormat('H:i:s', $input['end_time'])->timezone(getSchoolTimeZone())->format('H:i:s') : date('H:i:s'),
                'live_class_url' => $input['live_class_url'] ?? '',
                'notes' => $input['notes'] ?? null,
                'repeat_date' => !empty($input['repeat_date']) ?  Carbon::createFromFormat('Y-m-d', $input['repeat_date'])->timezone(getSchoolTimeZone())->toDateString() : null,
                'repeatable_days' => !empty($input['repeat_date']) && !empty($input['repeatable_days']) ? $input['repeatable_days'] : null,
                'status' => Status::ACTIVE,
            ];

            $onlineClass = $this->classroomRepository->createOnlineClass($dataArray);
            return response()->json([
                'success' => true,
                'message' => 'created successfully',
                'data' => $onlineClass
            ], 200);
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => null
            ], 200);
        }
    }

    /**
     * @OA\Post(
     * path="/online-classes/save-teacher",
     * summary="save teacher to online class",
     * description="save teacher to online class",
     * operationId="saveClassTeacherOnlineClass",
     * tags={"OnlineClass"},
     * @OA\RequestBody(
     *    required=true,
     *    description="save teacher to online class",
     *    @OA\JsonContent(
     *       required={"schoolId", "userId", "title","leaveType","startDateAt","endDateAt"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="userId", type="interger", example="1"),
     *       @OA\Property(property="title", type="string", example=""),
     *       @OA\Property(property="leaveType", type="string", example=""),
     *       @OA\Property(property="startDateAt", type="string", example=""),
     *       @OA\Property(property="endDateAt", type="string", example=""),
     *       @OA\Property(property="description", type="string", example=""),
     *       @OA\Property(property="isApproved", type="integer", example="0"),
     *    ),
     * ),
     * @OA\Response(
     *    response=422,
     *    description="Error response",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, Can't Create")
     *        )
     *     )
     * )
     */
    public function saveClassTeacherOnlineClass(ClassroomRequest $request)
    {
        $input = $request->validated();

        $dataArray = array(
            'title' => $input['title'],
            'affiliation_no' => !empty($input['affiliation_no']) ? $input['affiliation_no'] : "",
            'school_number' => !empty($input['school_number']) ? $input['school_number'] : "",
            'description' => !empty($input['description']) ? $input['description'] : "",
            'parent_id' => !empty($input['parent_id']) ? intval($input['parent_id']) : 0,
            'board_id' => !empty($input['board_id']) ? intval($input['board_id']) : 0,
            'country_id' => !empty($input['country_id']) ? intval($input['country_id']) : 0,
            'state_id' => !empty($input['state_id']) ? intval($input['state_id']) : 0,
            'timezone_id' => !empty($input['timezone_id']) ? intval($input['timezone_id']) : 0,
            'city' => !empty($input['city']) ? $input['city'] : "",
            'zip' => !empty($input['zip']) ? $input['zip'] : "",
            'phone' => !empty($input['phone']) ? $input['phone'] : "",
            'phone_2' => !empty($input['phone_2']) ? $input['phone_2'] : "",
            'mail' => !empty($input['mail']) ? $input['mail'] : "",
            'udise_code' => !empty($input['udise_code']) ? $input['udise_code'] : "",
            'display_name_board' => !empty($input['display_name_board']) ? $input['display_name_board'] : "",
            'established_at' => !empty($input['established_at']) ? $input['established_at'] : "",
            'medium' => !empty($input['medium']) ? $input['medium'] : "",
            'android_app_url' => !empty($input['android_app_url']) ? $input['android_app_url'] : "",
            'google_business_url' => !empty($input['google_business_url']) ? $input['google_business_url'] : "",
            'street_address' => !empty($input['street_address']) ? $input['street_address'] : "",
            'status' => Status::ACTIVE,
        );

      //  $school = $this->classroomRepository->create();

        return Redirect::route('classroom.list');
    }


    /**
     * @OA\Put(
     * path="/online-classes/update/{id}",
     * summary="Update Online Class",
     * description="Update Online Class",
     * operationId="updateOnlineClass",
     * tags={"OnlineClass"},
     *    @OA\Parameter(
     *    in="path",
     *    name="id",
     *    required=true,
     *    description="Update Online Class",
     *    @OA\Schema(type="string"),
     *    @OA\Examples(example="int", value="1", summary="An int value."),
     * ),
     * @OA\RequestBody(
     *    required=true,
     *    description="Update Leave",
     *    @OA\JsonContent(
     *       required={"schoolId", "userId", "classroom_id"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="userId", type="interger", example="1"),
     *       @OA\Property(property="classroom_id", type="interger", example=""),
     *       @OA\Property(property="subject_id", type="interger", example=""), 
     *       @OA\Property(property="start_date", type="string", example=""),
     *       @OA\Property(property="start_time", type="string", example=""),
     *       @OA\Property(property="end_time", type="string", example=""),
     *       @OA\Property(property="repeat_date", type="string", example=""),
     *       @OA\Property(property="repeatable_days", type="string", example="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']"),
     *    ),
     * ),
     * @OA\Response(
     *    response=422,
     *    description="Error response",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, Can't Update")
     *        )
     *     )
     * )
     */
    public function updateOnlineClass(OnlineClassRequest $request, int $id)
    {
        if (!empty($request->classroom_id) && !empty($request->schoolId) && !empty($request->userId) && !empty($request->role) ) {
            $onlineClass = null;
            if (in_array($request->role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
                $onlineClass = $this->classroomRepository->getOnlineClassById($id, null, $request->schoolId);
            } 
            else if ($request->role == UserRole::SITE_TEACHER->value) {
                $onlineClass = $this->classroomRepository->getOnlineClassById($id, $request->userId, $request->schoolId);
            }

            abort_if(empty($onlineClass), 404);
            $input = $request->validated();
            $dataArray = [
                'classroom_id' => $input['classroom_id'] ?? null,
                'subject_id' => $input['subject_id'] ?? null,
                'start_time' => !empty($input['start_time']) ? Carbon::createFromFormat('H:i:s', $input['start_time'])->timezone(getSchoolTimeZone())->format('H:i:s') : date('H:i:s'),
                'end_time' => !empty($input['end_time']) ? Carbon::createFromFormat('H:i:s', $input['end_time'])->timezone(getSchoolTimeZone())->format('H:i:s') : date('H:i:s'),
                'live_class_url' => $input['live_class_url'] ?? '',
                'notes' => $input['notes'] ?? null,
            ];

            $updateOnlineClass = $this->classroomRepository->updateOnlineClass($id, $dataArray);
            return response()->json([
                'success' => true,
                'message' => 'Updated successfully',
                'data' => $updateOnlineClass
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
     * @OA\Delete(
     *     path="/online-classes/delete/{id}",
     *     tags={"OnlineClass"},
     *     summary="Delete Online Class",
     *     operationId="destroyOnlineClass",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="id to delete",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         ),
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid ID supplied",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Online Class not found",
     *     ),
     *     security={ {"sanctum": {} }},
     * )
     */
    public function destroyOnlineClass(Request $request, $id)
    {
        if ( !empty($request->schoolId) ) {
            $deleteOnlineClass = $this->classroomRepository->deleteOnlineClass($id);
            return response()->json([
                'success' => true,
                'message' => 'Deleted successfully',
                'data' => $deleteOnlineClass
            ], 200);
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'required fields',
                'data' => ['id' => $id]
            ], 200);
        }
    }

    /**
     * @OA\Get(
     *    path="/online-classes/teacher/attendance",
     *    operationId="getOnlineClassTeacherAttendance",
     *    tags={"OnlineClass"},
     *    summary="Get teacher attendance online class",
     *    description="Get teacher attendance online classs",
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
    public function getOnlineClassTeacherAttendance(Request $request)
    {
        if (!empty($request->schoolId) && !empty($request->userId) && !empty($request->role) ) {
            $teacher = $this->staffRepository->getTeacherByUserId($request->userId, $request->schoolId);
            $teacherId = $teacher?->id;
            $classrooms = [];
            $subjects = [];
            $studentAttendances = [];
            $currentDate = Carbon::now()->format('d-M-Y');
            $classroomId = $request->classroom_id ?? null;
            $subjectId = $request->subject_id ?? null;
            $attendanceDate = !empty($request->attendance_date) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->attendance_date)->timezone(getSchoolTimeZone())->toDateString() : "";
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);

            if (!empty($subjectId) && !empty($attendanceDate)) {
                
                $students = $this->studentRepository->getStudentsForOnlineAttendance($classroomId, $academicYearId);
                $onlineAttendance = $this->classroomAttendanceRepository->getOnlineAttendance($classroomId, $subjectId, $attendanceDate, $academicYearId);
                $attendances = !empty($onlineAttendance?->students) ? json_decode($onlineAttendance->students) : [];
                if (count($students) > 0) {
                    $students = $students->sortBy(function ($student) {
                        return $student?->classroomRoll?->roll_no;
                    });
                    foreach ($students as $student) {
                        $tempArr = [
                            'student_id' => $student?->id,
                            'roll_no' => $student?->classroomRoll?->roll_no,
                            'first_name' => $student?->first_name,
                            'middle_name' => $student?->middle_name,
                            'last_name' => $student?->last_name,
                            'attendance_status' => "",
                        ];
                        if (count($attendances) > 0) {
                            foreach ($attendances as $attendance) {
                                if (!empty($attendance->student_id) && $attendance->student_id == $student?->id) {
                                    $tempArr['attendance_status'] = $attendance->attendance_status ?? "";
                                }
                            }
                        }
                        $studentAttendances[] = $tempArr;
                    }
                }
            }
            
            if (in_array($request->role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
                $classrooms = $this->classroomRepository->getActiveAll();

                if (!empty($classroomId)) {
                    $subjects = $this->subjectRepository->getSubjectsByClassroomId($classroomId);
                }
            } else if ($request->role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
                $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId);

                if (!empty($classroomId)) {
                    $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassroomId($teacherId, $classroomId);
                }
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'classrooms' => $classrooms,
                    'subjects' => $subjects,
                    'studentAttendances' => $studentAttendances,
                    'currentDate' => $currentDate
                ]
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
     * @OA\Post(
     * path="/online-classes/teacher/attendance/save",
     * summary="Save teacher attendance online class",
     * description="Save teacher attendance online class",
     * operationId="saveOnlineClassTeacherAttendance",
     * tags={"OnlineClass"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Save teacher attendance online class",
     *    @OA\JsonContent(
     *       required={"schoolId", "userId", "classroom_id"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="userId", type="interger", example="1"),
     *       @OA\Property(property="classroom_id", type="interger", example=""),
     *       @OA\Property(property="subject_id", type="interger", example=""), 
     *       @OA\Property(property="start_date", type="string", example=""),
     *       @OA\Property(property="start_time", type="string", example=""),
     *       @OA\Property(property="end_time", type="string", example=""),
     *       @OA\Property(property="repeat_date", type="string", example=""),
     *       @OA\Property(property="repeatable_days", type="string", example="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']"),
     *    ),
     * ),
     * @OA\Response(
     *    response=422,
     *    description="Error response",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, Can't Create")
     *        )
     *     )
     * )
     */
    public function saveOnlineClassTeacherAttendance(OnlineAttendanceRequest $request)
    {
        $input = $request->validated();

        $classroom = $this->classroomRepository->getClassroomById($input['classroom_id']);
        $academicYearId = $classroom?->academic_year_id;

        $attributesToCheck = [
            'school_id' => getUserSchoolId(),
            'academic_year_id' => $academicYearId,
            'classroom_id' => $input['classroom_id'],
            'subject_id' => $input['subject_id'],
            'attendance_date' => !empty($input['attendance_date']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $input['attendance_date'])->timezone(getSchoolTimeZone())->toDateString() : "",
        ];

        $valuesToUpdate = [
            'created_by' => auth()->user()->id,
            'students' => !empty($input['students']) ? json_encode($input['students']) : null,
            'status' => Status::ACTIVE
        ];

        $onlineAttendance = $this->classroomAttendanceRepository->updateOrCreateOnlineAttendance($attributesToCheck, $valuesToUpdate);

        if ($onlineAttendance) {
            return redirect()->back()->with('message', 'Attendance taken successfully');
        }

        return redirect()->back()->with('error', 'Something goes wrong');
    }
}
