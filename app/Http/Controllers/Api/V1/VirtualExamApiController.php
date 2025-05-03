<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\Status;
use App\Enums\UserRole;
use App\Enums\VirtualAssetType;
use App\Http\Controllers\Api\ControllerApi;
use App\Repositories\IClassroomRepository;
use App\Repositories\IOnlineTopicRepository;
use App\Repositories\IStaffRepository;
use App\Repositories\ISubjectRepository;
use App\Repositories\IVirtualExamRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class VirtualExamApiController extends ControllerApi
{
    private $_upload;
    public function __construct(
        private IVirtualExamRepository $virtualExamRepository,
        private IStaffRepository $staffRepository,
        private IClassroomRepository $classroomRepository,
        private ISubjectRepository $subjectRepository,
        private IOnlineTopicRepository $onlineTopicRepository,
    ) {
        $this->_upload = new \App\Http\Controllers\UploadFileController();
    }
    
    /**
     * @OA\Get(
     *    path="/virtual-exams/today",
     *    operationId="todayExam",
     *    tags={"Virtual Exam"},
     *    summary="Get today exams",
     *    description="Get today exams",
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
    public function todayExam(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $classId = !empty($request->classId) ? $request->classId : null;
            $subjectId = !empty($request->subjectId) ? $request->subjectId : null;
            $startDate = !empty($request->startDate) ? Carbon::parse($request->startDate)->timezone(getSchoolTimeZone())->format('Y-m-d') : null;
            $exams = $this->virtualExamRepository->getTodayExams($request->schoolId, $startDate, $classId, $subjectId);
    
            return response()->json([
                'success' => true,
                'data' => $exams,
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
     *    path="/virtual-exams/list",
     *    operationId="examList",
     *    tags={"Virtual Exam"},
     *    summary="Get exams list",
     *    description="Get exams list",
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
    public function examList(Request $request)
    {
        if ( !empty($request->schoolId) ) {
            $examMode = !empty($request->examMode) ? $request->examMode : null;
            $classId = !empty($request->classId) ? $request->classId : null;
            $subjectId = !empty($request->subjectId) ? $request->subjectId : null;
            $startDate = !empty($request->startDate) ? Carbon::parse($request->startDate)->timezone(getSchoolTimeZone())->format('Y-m-d') : null;
            $endDate = !empty($request->endDate) ? Carbon::parse($request->endDate)->timezone(getSchoolTimeZone())->format('Y-m-d') : null;
            $exams = $this->virtualExamRepository->getExamsList($request->schoolId, $startDate, $endDate, $classId, $subjectId, $examMode);
    
            return response()->json([
                'success' => true,
                'data' => $exams,
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
     *    path="/virtual-exams/schedule-list",
     *    operationId="examScheduleList",
     *    tags={"Virtual Exam"},
     *    summary="Get schedule exams",
     *    description="Get schedule exams",
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
    public function examScheduleList(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $classId = !empty($request->classId) ? $request->classId : null;
            $subjectId = !empty($request->subjectId) ? $request->subjectId : null;
            $startDate = !empty($request->startDate) ? Carbon::parse($request->startDate)->timezone(getSchoolTimeZone())->format('Y-m-d') : null;
            $endDate = !empty($request->endDate) ? Carbon::parse($request->endDate)->timezone(getSchoolTimeZone())->format('Y-m-d') : null;
            $exams = $this->virtualExamRepository->getScheduleExams($request->schoolId, $startDate, $endDate, $classId, $subjectId);
    
            return response()->json([
                'success' => true,
                'data' => $exams,
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
     *    path="/virtual-exams/class-subjects-topics",
     *    operationId="getVirtualClassSubject",
     *    tags={"Virtual Exam"},
     *    summary="Get exam classes & subjects",
     *    description="Get exam classes & subjects",
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
    public function getVirtualClassSubject(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->role) && !empty($request->userId) ) { 
            $role = $request->role;
            $userId = $request->userId;
            $teacher = $this->staffRepository->getTeacherByUserId($userId, $request->schoolId);
            $teacherId = $teacher?->id;
            $classNameId = $request->class_name_id ?? null;
            $subjectId = $request->subject_id ?? null;
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);

            $subjects = [];
            $classNames = [];
            $onlineTopics = [];
            $virtualAssets = [];


            if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
                $classNames = $this->classroomRepository->getActiveClassNameAll($request->schoolId, $academicYearId);

                if (!empty($classNameId)) {
                    $subjects = $this->subjectRepository->getSubjectsByClassNameId($classNameId, $request->schoolId, $academicYearId);
                }
            } 
            else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
                $classNames = $this->classroomRepository->getTeacherClassNames($teacherId, $request->schoolId, $academicYearId);

                if (!empty($classNameId)) {
                    $subjects = $this->subjectRepository->getTeacherSubjectsByTeacherIdAndClassNameId($teacherId, $classNameId, $request->schoolId, $academicYearId);
                }
            }

            if (!empty($classNameId) && !empty($subjectId)) {
                $onlineTopics = $this->onlineTopicRepository->getOnlineDiscussionsByClassNameIdAndSubjectId($classNameId, $subjectId, $request->schoolId, $academicYearId);
                $virtualAssets = $this->virtualExamRepository->getFilteredVirtualAssets($classNameId, $subjectId, null, VirtualAssetType::PASSAGE->value, true, $request->schoolId);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'subjects' => $subjects,
                    'classNames' => $classNames,
                    'onlineTopics' => $onlineTopics,
                    'virtualAssets' => $virtualAssets,
                ],
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
     *    path="/virtual-exams/questions",
     *    operationId="getQuestionList",
     *    tags={"Virtual Exam"},
     *    summary="Get exam questions",
     *    description="Get exam questions",
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
    public function getQuestionList(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $classNameId = $request->classNameId ?? null;
            $subjectId = $request->subjectId ?? null;
            $onlineTopicId = $request->onlineTopicId ?? null;
            $virtualAssetId = $request->virtualAssetId ?? null;
            $questionType = $request->question_type ?? '';
            $difficultyLevel = $request->difficulty_level ?? '';
            $language = $request->language ?? '';
            $publishStatus = $request->publish_status ?? '';
            $status = $request->status ?? '';
  
            $virtualQuestions = [];

            $virtualQuestions = $this->virtualExamRepository->getFilteredVirtualQuestions(
                $classNameId,
                $subjectId,
                $onlineTopicId,
                $virtualAssetId,
                $questionType,
                $difficultyLevel,
                $language,
                $publishStatus,
                $status,
                $request->schoolId,
                $request->userId
            );
        
            return response()->json([
                'success' => true,
                'data' => [
                    'virtualQuestions' => $virtualQuestions,
                ],
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
     *    path="/virtual-exams/shared/questions",
     *    operationId="getSharedQuestions",
     *    tags={"Virtual Exam"},
     *    summary="Get exam shared questions",
     *    description="Get exam shared questions",
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
    public function getSharedQuestions(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->userId)) { 
            $classNameId = $request->classNameId ?? null;
            $subjectId = $request->subjectId ?? null;
            $onlineTopicId = $request->onlineTopicId ?? null;
            $virtualAssetId = $request->virtualAssetId ?? null;
            $questionType = $request->question_type ?? '';
            $difficultyLevel = $request->difficulty_level ?? '';
            $language = $request->language ?? '';
            $publishStatus = $request->publish_status ?? '';
            $status = $request->status ?? '';
  
            $virtualQuestions = [];

            $virtualQuestions = $this->virtualExamRepository->getFilteredVirtualSharedQuestions(
                $classNameId,
                $subjectId,
                $onlineTopicId,
                $virtualAssetId,
                $questionType,
                $difficultyLevel,
                $language,
                $publishStatus,
                $status,
                $request->schoolId,
                $request->userId
            );
        
            return response()->json([
                'success' => true,
                'data' => [
                    'virtualQuestions' => $virtualQuestions,
                ],
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
     *    path="/virtual-exams/topics",
     *    operationId="getTopics",
     *    tags={"Virtual Exam"},
     *    summary="Get exam topics",
     *    description="Get exam topics",
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
    public function getTopics(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $onlineTopics = $this->onlineTopicRepository->getActiveAll($request->schoolId, $academicYearId);

            return response()->json([
                'success' => true,
                'data' => $onlineTopics,
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
     * path="/virtual-exams/question/save",
     * summary="Save Question",
     * description="Save Question",
     * operationId="saveQuestion",
     * tags={"Virtual Exam"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Save Question",
     *    @OA\JsonContent(
     *       required={"schoolId", "userId", "classNameId","subjectId"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="userId", type="interger", example="1"),
     *       @OA\Property(property="classNameId", type="interger", example="1"),
     *       @OA\Property(property="subject_id", type="interger", example="1"),
     *       @OA\Property(property="answer_options", type="string", example=""),
     *       @OA\Property(property="is_published", type="integer", example="0"),
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
    public function saveQuestion(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->classNameId) && !empty($request->subjectId) && !empty($request->userId) ) { 
            $dataArray = [
                'school_id' => $request->schoolId,
                'created_by' => $request->userId,
                'class_name_id' => $request->classNameId ?? null,
                'subject_id' => $request->subjectId ?? null,
                'language' => $request->language ?? '',
                'question_type' => $request->question_type ?? '',
                'difficulty_level' => $request->difficulty_level ?? '',
                'online_topic_id' => $request->onlineTopicId ?? null,
                'virtual_asset_id' => $request->virtualAssetId ?? null,
                'question' => $request->question ?? '',
                'answer_options' => !empty($request->answer_options) ? json_encode($request->answer_options) : null,
                'answer_explanation' => $request->answer_explanation ?? null,
                'mark' => $request->mark ?? null,
                'share_with' => $request->share_with ?? null,
                'is_published' => $request->is_published ?? false,
                'is_active' => true,
                'status' => Status::ACTIVE
            ];

            $virtualQuestion = $this->virtualExamRepository->createVirtualQuestion($dataArray);

            return response()->json([
                'success' => true,
                'message' => 'created successfully',
                'data' => $virtualQuestion
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
     * path="/virtual-exams/save",
     * summary="Save Exam",
     * description="Save Exam",
     * operationId="saveExam",
     * tags={"Virtual Exam"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Save Exam",
     *    @OA\JsonContent(
     *       required={"schoolId", "userId", "classNameId","subjectId"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="userId", type="interger", example="1"),
     *       @OA\Property(property="classNameId", type="interger", example="1"),
     *       @OA\Property(property="subject_id", type="interger", example="1"),
     *       @OA\Property(property="answer_options", type="string", example=""),
     *       @OA\Property(property="is_published", type="integer", example="0"),
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
    public function saveExam(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->class_name_id) && !empty($request->subject_id) && !empty($request->userId) ) { 
            $startDateAt = Carbon::parse($request->start_date_at)->timezone(getSchoolTimeZone())->format('Y-m-d');
            $endDateAt = Carbon::parse($request->end_date_at)->timezone(getSchoolTimeZone())->format('Y-m-d');
            $dataArray = [
                'school_id' => $request->schoolId,
                'created_by' => $request->userId,
                'title' => $request->title ?? 'No Title',
                'exam_code' => $request->exam_code ?? '',
                'exam_mode' => $request->exam_mode ?? '',
                'class_name_id' => $request->class_name_id ?? null,
                'subject_id' => $request->subject_id ?? null,
                'start_date_at' => !empty($request->start_date_at) ? $startDateAt : date('Y-m-d'),
                'end_date_at' => !empty($request->end_date_at) ? $endDateAt : date('Y-m-d'),
                'start_time_at' => !empty($request->start_time_at) ? Carbon::parse($request->start_time_at)->format('H:i:s') : null,
                'end_time_at' => !empty($request->end_time_at) ? Carbon::parse($request->end_time_at)->format('H:i:s') : null,
                'duration_hour' => intval($request->duration_hour),
                'duration_minute' => intval($request->duration_minute),
                'instruction_hour' => intval($request->instruction_hour),
                'instruction_minute' => intval($request->instruction_minute),
                'instruction_details' => $request->instruction_details ?? '',
                'total_mark' => $request->total_mark ?? '',
                'pass_mark' => $request->pass_mark ?? '',
                'display_order' => $request->display_order ?? 1,
                'is_schedule_exam' => (strtotime($endDateAt) > strtotime($startDateAt)) ? 1 : 0,
                'is_shuffle_question' => $request->is_shuffle_question ?? 0,
                'live_link' => $request->live_link ?? '',
                'status' => Status::ACTIVE
            ];

            $virtualExam = $this->virtualExamRepository->create($dataArray);

            return response()->json([
                'success' => true,
                'message' => 'created successfully',
                'data' => $virtualExam
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
     * @OA\Get(
     *    path="/virtual-exams/student/exam-list",
     *    operationId="studentExamList",
     *    tags={"Virtual Exam"},
     *    summary="Get exams student exam list",
     *    description="Get exams student exam list",
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
    public function studentExamList(Request $request)
    {
        if ( !empty($request->schoolId) ) {
            $exams = $this->virtualExamRepository->getFilteredVirtualExams(
                !empty($request->classId) ? $request->classId : null,
                !empty($request->subjectId) ? $request->subjectId : null,
                !empty($request->examMode) ? $request->examMode : '',
                !empty($request->startDate ) ? $request->startDate  : '',
                !empty($request->endDate ) ? $request->endDate  : '',
                $request->schoolId
            )?->map(function ($virtualExam) {
                return [
                    ...$virtualExam->toArray()
                ];
            }) ?? collect([]);
    
            return response()->json([
                'success' => true,
                'data' => $exams,
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