<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\Status;
use App\Models\SchoolSetting;
use App\Http\Controllers\Api\ControllerApi;
use App\Repositories\IClassroomRepository;
use App\Repositories\IClassroomSubjectRepository;
use App\Repositories\IExamAttendanceRepository;
use App\Repositories\IExamRepository;
use App\Repositories\IStudentRepository;
use Illuminate\Http\Request;

class ExamApiController extends ControllerApi
{
    public function __construct(
        private IExamRepository $examRepository,
        private IClassroomRepository $classroomRepository,
        private IStudentRepository $studentRepository,
        private IClassroomSubjectRepository $classroomSubjectRepository,
        private IExamAttendanceRepository $examAttendanceRepository, 
    ) {
        //
    }
    
    /**
     * @OA\Get(
     *    path="/exams/all",
     *    operationId="indexExam",
     *    tags={"Exam"},
     *    summary="Get all exams",
     *    description="Get all exams",
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
    public function indexExam(Request $request)
    {
        $setting = SchoolSetting::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->first();

        $exams = $this->examRepository->getExamtitle($request->schoolId, $setting?->academic_year_id);
        return response()->json([
            'success' => true,
            'data' => $exams,
        ], 200);
    }


    /**
     * @OA\Post(
     * path="/exams/marks/save",
     * summary="Save Exam Mark",
     * description="Save Exam Mark",
     * operationId="saveExamMarks",
     * tags={"Exam"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Submit Exam Mark",
     *    @OA\JsonContent(
     *       required={"schoolId","classroomId","subjectId", "examId", "studentMarkArray"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="classroomId", type="interger", example="1"),
     *       @OA\Property(property="subjectId", type="interger", example="1"),
     *       @OA\Property(property="examId", type="interger", example="1"),
     *       @OA\Property(property="studentMarkArray", type="string", example="[{'student_id': 1, 'grade_id': 1, 'mark': 78, 'is_present': true, 'absence_reason': ''}]"),
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
    public function saveExamMarks(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->studentMarkArray) && !empty($request->examId) ) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->first();

            $attributesToCheck = [
                'school_id' => $request->schoolId,
                'academic_year_id' => $setting?->academic_year_id,
                'classroom_id' => $request->classroomId,
                'subject_id' => $request->subjectId,
                'exam_id' => $request->examId,
            ];

            $data = array();
            foreach (json_decode($request->studentMarkArray) as $studentMark) {
                $mark = null;

                if (isset($studentMark?->mark)) {
                    $markArr = explode('.', $studentMark?->mark);

                    if (!empty($markArr[1])) {
                        $mark = $studentMark?->mark;
                    } else {
                        $mark = $markArr[0];
                    }
                }

                $attributesToCheck['student_id'] = $studentMark?->student_id;
                $valuesToUpdate = [
                    'school_id' => $request->schoolId,
                    'academic_year_id' => $setting?->academic_year_id,
                    'classroom_id' => $request->classroomId,
                    'subject_id' => $request->subjectId,
                    'exam_id' => $request->examId,
                    'student_id' => $studentMark?->student_id, 
                    'academic_grade_item_id' => isset($studentMark?->grade_id) ? $studentMark?->grade_id : null,
                    'mark' => $mark,
                    'is_present' => $studentMark?->is_present,
                    'absence_reason' => isset($studentMark?->absence_reason) ? $studentMark?->absence_reason : null,
                    'status' => Status::ACTIVE->value,
                ];
                $data = $this->examRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
            }

            return response()->json([
                'success' => true,
                'message' => 'Created successfully',
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


    /**
     * @OA\Post(
     * path="/exams/remark/save",
     * summary="Save Remark",
     * description="Save Remark",
     * operationId="saveRemark",
     * tags={"Exam"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Save Remark",
     *    @OA\JsonContent(
     *       required={"schoolId","classroomId","subjectId", "examId", "studentMarkArray"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="classroomId", type="interger", example="1"),
     *       @OA\Property(property="examId", type="interger", example="1"),
     *       @OA\Property(property="studentMarkArray", type="string", example="[{'student_id': 1, 'remark': 'Good'}]"),
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
    public function saveRemark(Request $request)
    {
        if ( !empty($request->studentMarkArray) && !empty($request->examId) && !empty($request->classroomId)  ) {

            $classNameId = $this->classroomRepository->getClassNameIdFromClassId($request->classroomId);
            $setting = SchoolSetting::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->first();
            $attributesToCheck = [
                'school_id' => $request->schoolId,
                'academic_year_id' => $setting?->academic_year_id,
                'class_name_id' => $classNameId,
                'exam_id' => $request->examId,
            ];
            $data = array();
            foreach ( json_decode($request->studentMarkArray) as $studentMark) {
                $attributesToCheck['student_id'] = $studentMark?->student_id;
                $valuesToUpdate = [
                    'school_id' => $request->schoolId,
                    'academic_year_id' => $setting?->academic_year_id,
                    'class_name_id' => $classNameId,
                    'exam_id' => $request->examId,
                    'student_id' => $studentMark?->student_id,
                    'remarks' => isset($studentMark?->remark) ? $studentMark?->remark : '',
                    'status' => Status::ACTIVE->value,
                ];
                $data = $this->examRepository->RemarksUpdateOrcreate($attributesToCheck, $valuesToUpdate);
            }

            return response()->json([
                'success' => true,
                'message' => 'created successfully',
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

    /**
     * @OA\Post(
     * path="/exams/attendances/save",
     * summary="Save Attendances",
     * description="Save Attendances",
     * operationId="saveAttendances",
     * tags={"Exam"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Save Attendances",
     *    @OA\JsonContent(
     *       required={"schoolId", "classroomId", "examId", "examAttendanceArray"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="classroomId", type="interger", example="1"),
     *       @OA\Property(property="examId", type="interger", example="1"),
     *       @OA\Property(property="examAttendanceArray", type="string", example="[{'student_id': 1, 'pday': 50, 'wday': 200 }]"),
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
    public function saveAttendances(Request $request)
    {
        if ( !empty($request->examAttendanceArray) && !empty($request->examId) && !empty($request->classroomId)  ) {
            $data = array();
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $classNameId = $this->classroomRepository->getClassNameIdFromClassId($request->classroomId);

            $attributesToCheck = [
                'school_id' => $request->schoolId,
                'academic_year_id' => $setting?->academic_year_id,
                'classroom_id' => $request->classroomId,
                'exam_id' => $request->examId,
            ];

            foreach (json_decode($request->examAttendanceArray) as $examAttendance) {
                $attributesToCheck['student_id'] = $examAttendance?->student_id;
                $valuesToUpdate = [
                    'school_id' => $request->schoolId,
                    'academic_year_id' => $setting?->academic_year_id,
                    'classroom_id' => $request->classroomId,
                    'exam_id' => $request->examId,
                    'class_name_id' => $classNameId,
                    'present_day' => !empty($examAttendance?->pday) ? $examAttendance?->pday : null,
                    'working_day' => !empty($examAttendance?->wday) ? $examAttendance?->wday : null,
                    'status' => Status::ACTIVE->value,
                ];

                $data = $this->examAttendanceRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
            }

            return response()->json([
                'success' => true,
                'message' => 'Created successfully',
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

    /**
     * @OA\Get(
     *    path="/exams/attendances/students",
     *    operationId="getExamAttendances",
     *    tags={"Exam"},
     *    summary="Exam Absent Report",
     *    description="Exam Absent Report",
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
    public function getExamAttendances(Request $request)
    {
        if ( !empty($request->classroomId) && !empty($request->examId) ) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->first();
            $students = $this->studentRepository->getStudentForExamAttendance($request->examId, $request->classroomId, $request->schoolId, $setting?->academic_year_id);

            return response()->json([
                'success' => true,
                'data' => $students,
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
     *    path="/exams/report/absent",
     *    operationId="viewAbsentReport",
     *    tags={"Exam"},
     *    summary="Exam Absent Report",
     *    description="Exam Absent Report",
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
    public function viewAbsentReport(Request $request)
    {
        if ( !empty($request->classroomId) && !empty($request->examId) ) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->first();
            $marks = $this->examRepository->getMarkFromExamId($request->classroomId, $request->examId, $request->schoolId, $setting?->academic_year_id);
            return response()->json([
                'success' => true,
                'data' => $marks,
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
     *    path="/exams/report/student-wise-subject/",
     *    operationId="viewClassWiseSubjectReport",
     *    tags={"Exam"},
     *    summary="class wise subject report",
     *    description="class wise subject report",
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
    public function viewClassWiseSubjectReport(Request $request)
    {
        if ( !empty($request->classroomId) && !empty($request->studentId) ) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->first();
    
            $students = $this->studentRepository->getStudentsByClassroomId($request->classroomId, $request->schoolId, $setting?->academic_year_id)->map(function ($student) {
                return [
                    'id' => $student->id,
                    'title' => getCocatenationTitle($student->first_name, $student->middle_name, $student->last_name),
                    'classroom_id' => $student->classroom_id,
                ];
            });
    
            $getStudentSubject = $this->classroomRepository->getStudentSInfo($request->classroomId, $request->studentId, $request->schoolId, $setting?->academic_year_id);
            
            return response()->json([
                'success' => true,
                'data' => $getStudentSubject,
                'students' => $students,
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

    /**
     * @OA\Get(
     *    path="/exams/report/teacher-wise-subject",
     *    operationId="viewTeacherWiseSubjectReport",
     *    tags={"Exam"},
     *    summary="Get all exams",
     *    description="Get all exams",
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
    public function viewTeacherWiseSubjectReport(Request $request)
    {
        if ( !empty($request->classroomId) && !empty($request->teacherId) ) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->first();
            $subjects = array();
            $subjectsData = $this->classroomSubjectRepository->getSubjectsFromClassId($request->classroomId, $request->schoolId);
            if( !empty($subjectsData) ) {
                foreach($subjectsData as $sData) {
                    $teacherData = json_decode($sData->teachers_data);
                    if( !empty($teacherData[0]) && $teacherData[0]->teacher_id == $request->teacherId) {
                        array_push($subjects, ['subject_id' => $sData->subject_id,  'subject' => $sData->title, 'type' => $sData->type, 'teacher_id' => $teacherData[0]->teacher_id, 'teacher_name' => $teacherData[0]->teacher_name]);
                    }
                }
            }
            
            return response()->json([
                'success' => true,
                'data' => $subjects,
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
