<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\Status;
use App\Enums\UserRole;
use App\Http\Controllers\Api\ControllerApi;
use App\Models\SchoolSetting;
use App\Repositories\IClassroomRepository;
use App\Repositories\IClassroomSubjectRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\IStudentRepository;
use Illuminate\Http\Request;

class ClassroomApiController extends ControllerApi
{
    public function __construct(
        private IClassroomRepository $classroomRepository,
        private IClassroomSubjectRepository $classroomSubjectRepository,
        private IStudentRepository $studentRepository,
        private IStaffRepository $staffRepository,
    ) {
        //
    }
    
    /**
     * @OA\Get(
     *    path="/classrooms/all",
     *    operationId="indexClassroom",
     *    tags={"Classroom"},
     *    summary="All Active Classrooms",
     *    description="All Active Classrooms",
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
    public function indexClassroom(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->role) && !empty($request->userId) ) { 
            $role = $request->role;
            $userId = $request->userId;
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $classrooms = [];

            if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
                $classrooms = $this->classroomRepository->getActiveAll($request->schoolId, $academicYearId);
            } 
            else if ($role == UserRole::SITE_TEACHER->value && !empty($userId)) {
                $teacher = $this->staffRepository->getTeacherByUserId($request->userId, $request->schoolId);
                if($teacher)
                    $classrooms = $this->classroomRepository->getTeacherClassrooms($teacher?->id, null, $request->schoolId, $academicYearId);
            }
            return response()->json([
                'success' => true,
                'data' => $classrooms,
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
     *    path="/classrooms/subjects",
     *    operationId="subjectsClassroom",
     *    tags={"Classroom"},
     *    summary="All Active classroom subjects",
     *    description="All Active classroom subjects",
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
    public function subjectsClassroom(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->classroomId) ) {
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $classroomSubjects = $this->classroomSubjectRepository->getClassroomSubjectsByClassroomId($request->classroomId, $request->schoolId, $academicYearId);
            return response()->json([
                'success' => true,
                'data' => $classroomSubjects,
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
     *    path="/classrooms/list",
     *    operationId="classroomList",
     *    tags={"Classroom"},
     *    summary="All Active classrooms",
     *    description="All Active classrooms",
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
    public function classroomList(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->role) && !empty($request->userId) ) { 
            $role = $request->role;
            $userId = $request->userId;
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $schoolId = $request->schoolId;
            $classrooms = [];
            // classroom
            if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
                $classrooms = $this->classroomRepository->getAllClassesRaw(null, null, $request->schoolId, $academicYearId);
            } 
            else if ($role == UserRole::SITE_TEACHER->value && !empty($userId)) {
                $teacher = $this->staffRepository->getTeacherByUserId($request->userId, $request->schoolId);
                if($teacher)
                    $classrooms = $this->classroomRepository->getTeacherClassroomsRaw($teacher?->id, null, $request->schoolId, $academicYearId);
            }
            
            return response()->json([
                'success' => true,
                'data' => $classrooms,

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
     *    path="/classrooms/students",
     *    operationId="classroomStudents",
     *    tags={"Classroom"},
     *    summary="All Active classroom & students",
     *    description="All Active classroom & students",
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
    public function classroomStudents(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->classroomId) ) { 
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();

            $schoolId = $request->schoolId;
            $academicYearId = $setting?->academic_year_id;
            $classroomsData = array();
            $students = array();
            $classrooms = $this->classroomRepository->getSingleClassroomRaw($request->classroomId, null, $schoolId, $academicYearId);
            // classroom
            if (!empty($classrooms)) {
                foreach ($classrooms as $key => $classroom) {
                    $tempDataArray = $classroom;
                    $tempSortArray = array();
        
                    // promoted students
                    if (!empty($classroom->classroomPromotedStudentsRaw)) {
                        foreach ($classroom->classroomPromotedStudentsRaw as $std) {
                            $std->load(['student.father', 'student.mother', 'student.classroomRollRaw' => function ($query) use ($classroom, $academicYearId) {
                                $query->where('classroom_id', $classroom->id)
                                    ->where('academic_year_id', $academicYearId)
                                    ->select(
                                        'id',
                                        'student_id',
                                        'roll_no',
                                    );
                            },
                            'student.studentImageRaw' => function ($q) use ($schoolId) {
                                $q->where('school_id', $schoolId);
                            },
                            'student.fatherImageRaw' => function ($q) use ($schoolId) {
                                $q->where('school_id', $schoolId);
                            },
                            'student.motherImageRaw' => function ($q) use ($schoolId) {
                                $q->where('school_id', $schoolId);
                            }
                            ]);

                            if($std?->student?->status?->value == 'Active') {
                                $stdSerialNo = !empty($std?->student?->classroomRollRaw?->roll_no) ? intval($std?->student?->classroomRollRaw?->roll_no) : rand(1000, 99999);
                                $stdSingle = array(
                                    'id' => $std?->student?->id,
                                    'image' => trim($std?->student?->studentImageRaw?->path),
                                    'father_image' => trim($std?->student?->fatherImageRaw?->path),
                                    'mother_image' => trim($std?->student?->motherImageRaw?->path),
                                    'title' => getCocatenationTitle($std?->student?->first_name, $std?->student?->middle_name, $std?->student?->last_name),
                                    'admission_no' => trim($std?->student?->admission_no),
                                    'roll' => trim($std?->student?->classroomRollRaw?->roll_no),
                                    'parent' => getCocatenationTitle($std?->student?->father?->first_name, $std?->student?->father?->middle_name, $std?->student?->father?->last_name),
                                    'parent_id' => $std?->student?->father?->id ?? null,
                                    'parent_phone' => $std?->student?->father?->phone,
                                    'parent_email' => $std?->student?->father?->email,
                                    'mother' => getCocatenationTitle($std?->student?->mother?->first_name, $std?->student?->mother?->middle_name, $std?->student?->mother?->last_name),
                                    'mother_id' => $std?->student?->mother?->id ?? null,
                                    'mother_phone' => $std?->student?->mother?->phone,
                                    'mother_email' => $std?->student?->mother?->email
                                ); 
                                array_push($tempSortArray, $stdSingle);
                            }
                        }
                    }
                    //ksort($tempSortArray);
                    $tempDataArray['students'] = $tempSortArray;
                    array_push($classroomsData, $tempDataArray);
                }
            }
            return response()->json([
                'success' => true,
                'data' => $classroomsData,

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
     * path="/classrooms/student/status/save",
     * summary="Update Student Status",
     * description="Update Student Status",
     * operationId="saveStudentStatus",
     * tags={"Classroom"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Update Student Status",
     *    @OA\JsonContent(
     *       required={"schoolId","studentId", "reason"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="studentId", type="interger", example="1"),
     *       @OA\Property(property="reason", type="string", example="Taken TC"),
     *    ),
     * ),
     * @OA\Response(
     *    response=422,
     *    description="Error response",
     *    @OA\JsonContent(
     *       @OA\Property(property="message", type="string", example="Sorry, Can't create")
     *        )
     *     )
     * )
     */
    public function saveStudentStatus(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->studentId) ) {
            $valuesToUpdate = [
                'status' => Status::INACTIVE->value,
            ];
            $data = $this->studentRepository->update($request->studentId, $valuesToUpdate);

            return response()->json([
                'success' => true,
                'message' => 'Updated successfully',
                'data' => $data
            ], 201);
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