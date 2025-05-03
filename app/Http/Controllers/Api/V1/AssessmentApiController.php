<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\AssessmentStatus;
use App\Enums\Status;
use App\Http\Controllers\Api\ControllerApi;
use App\Models\SchoolSetting;
use App\Repositories\IAssessmentRepository;
use App\Repositories\IOrganizeFolderRepository;
use Illuminate\Http\Request;

class AssessmentApiController extends ControllerApi
{
    private $_upload;

    public function __construct(
        private IAssessmentRepository $assessmentRepository,
        private IOrganizeFolderRepository $organizeFolderRepository,
    ) {
        $this->_upload = new \App\Http\Controllers\UploadFileController();
    }
    
    /**
     * @OA\Get(
     *    path="/assessments/all",
     *    operationId="indexAssessment",
     *    tags={"Homework"},
     *    summary="Get all homeworks",
     *    description="Get all homeworks",
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
    public function indexAssessment(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->isAssigned) ) { 
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $classNameId = isset($request->classNameId) ? $request->classNameId : null;
            $classSubjectId = isset($request->classSubjectId) ? $request->classSubjectId : null;
            $isAssigned = ($request->isAssigned == 'yes') ? 1 : 0;
            $classworks = $this->homeworkRepository->getActiveAllBySearch($request->schoolId, $setting?->academic_year_id, $classNameId, $classSubjectId, $isAssigned);
            
            return response()->json([
                'success' => true,
                'data' => $classworks
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
     * path="/assessments/create",
     * summary="Create Homework",
     * description="Create Homework",
     * operationId="createAssessment",
     * tags={"Homework"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Create Homework",
     *    @OA\JsonContent(
     *       required={"schoolId", "schoolKey", "classNameId","classSubjectId","startDateAt","submissionDateAt"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="schoolKey", type="interger", example="demo"),
     *       @OA\Property(property="classNameId", type="interger", example="demo"),
     *       @OA\Property(property="classSubjectId", type="interger", example="demo"),
     *       @OA\Property(property="startDateAt", type="string", example=""),
     *       @OA\Property(property="submissionDateAt", type="string", example=""),
     *       @OA\Property(property="homeFile", type="string", example="file"),
     *       @OA\Property(property="homeCameraFile", type="string", example="file"),
     *       @OA\Property(property="homeDocFile", type="string", example="file"),
     *       @OA\Property(property="homeFileUrl", type="string", example="url"),
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
    public function createAssessment(Request $request)
    {
        if (!empty($request->title) && !empty($request->schoolKey)) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();

            $academicYearId = $setting?->academic_year_id;
            $startDateAt = !empty($request->startDateAt) ? \Carbon\Carbon::parse($request->startDateAt)->format('Y-m-d') : date('Y-m-d');
            $submissionDateAt = !empty($request->submissionDateAt) ? \Carbon\Carbon::parse($request->submissionDateAt)->format('Y-m-d') : date('Y-m-d');
            $file_url = '';

            // class image
            if (!empty($request->file('homeFile'))) {
                $file_url = $this->_upload->uploadImage($request, 'homeFile', 'homework_image', $request->schoolKey);
            }

            if (!empty($request->file('homeCameraFile'))) {
                $cameraFileArray = $this->_upload->uploadSingleFile($request, 'homeCameraFile', 'homework', $request->schoolKey);
            }

            if (!empty($request->file('homeDocFile'))) {
                $docFileArray = $this->_upload->uploadSingleFile($request, 'homeDocFile', 'homework', $request->schoolKey);
            }

            $dataArray = [
                'user_id' => $request->userId,
                'school_id' => $request->schoolId,
                'academic_year_id' => $academicYearId,
                'class_name_id' => $request->classNameId,
                'class_subject_id' => $request->classSubjectId,
                'type' => $request->type,
                'title' => $request->title,
                'sub_title' => $request->subtitle,
                'description' => $request->description,
                'start_date_at' => $startDateAt,
                'end_date_at' => $submissionDateAt,
                'assigned_to_class' => $request->assignedToClass,
                'allow_submission' => $request->allowSubmission,
                'home_file' => $file_url,
                'home_camera_file' => !empty($cameraFileArray['path']) ? $cameraFileArray['path'] : null,
                'home_doc_file' => !empty($docFileArray['path']) ? $docFileArray['path'] : null,
                'home_file_url' => $request->homeFileUrl ?? null,
                'status' => Status::ACTIVE->value,
            ];

            $homework =  $this->homeworkRepository->create($dataArray);
            if( isset($homework) ) {
                $existingClassroomIds = $this->homeworkRepository->geClassroomFromClassNameId($request->schoolId, $academicYearId, $homework->id);
                // deleted existing classwork classrooms before creating.
                if( !empty($existingClassroomIds) ) {
                    foreach($existingClassroomIds as $existObj) {
                        $this->homeworkRepository->deleteClassworkClassroom($existObj->id);
                    }
                }
                // created classwork classroom
                if( !empty($request->classroomIds) ) {
                    $classroomIdsArray = (array)json_decode($request->classroomIds);
                    foreach($classroomIdsArray as $classroomId) {
                        $dataArray = [
                            'school_id' => $request->schoolId,
                            'academic_year_id' => $academicYearId,
                            'homework_id' => $homework->id,
                            'classroom_id' => $classroomId,
                        ];
                        $this->homeworkRepository->createClassworkClassroom($dataArray);
                    }
                }
                // Create Folder
                $dataArray = [
                    'school_id' => $request->schoolId,
                    'class_name_id' => $request->organizeClassNameId,
                    'classroom_id' => null,
                    'subject_id' => $request->organizeClassSubjectId, //organizeFolderId
                    'topic_id' => $request->organizeTopicId,
                    'folderable_type' => \App\Models\Homework::class,
                    'folderable_id' => $homework->id,
                    'name' => '',
                    'description' => '',
                ];
                $this->organizeFolderRepository->create($dataArray);
            }
            
            return response()->json([
                'success' => true,
                'message' => 'created successfully',
                'data' => $homework
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
     * @OA\Put(
     * path="/assessments/update/{id}",
     * summary="Update Homework",
     * description="Update Homework",
     * operationId="updateAssessment",
     * tags={"Homework"},
     *    @OA\Parameter(
     *    in="path",
     *    name="id",
     *    required=true,
     *    description="Update Homework",
     *    @OA\Schema(type="string"),
     *    @OA\Examples(example="int", value="1", summary="An int value."),
     * ),
     * @OA\RequestBody(
     *    required=true,
     *    description="Update Homework",
     *    @OA\JsonContent(
     *       required={"schoolId", "schoolKey", "classNameId","classSubjectId","startDateAt","submissionDateAt"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="schoolKey", type="interger", example="demo"),
     *       @OA\Property(property="classNameId", type="interger", example="demo"),
     *       @OA\Property(property="classSubjectId", type="interger", example="demo"),
     *       @OA\Property(property="startDateAt", type="string", example=""),
     *       @OA\Property(property="submissionDateAt", type="string", example=""),
     *       @OA\Property(property="homeFile", type="string", example="file"),
     *       @OA\Property(property="homeCameraFile", type="string", example="file"),
     *       @OA\Property(property="homeDocFile", type="string", example="file"),
     *       @OA\Property(property="homeFileUrl", type="string", example="url"),
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
    public function updateAssessment(Request $request, int $id)
    {
        if (!empty($request->title) && !empty($request->schoolKey)) {
            $homework = $this->homeworkRepository->getById($id);
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $academicYearId = $setting?->academic_year_id;
            $startDateAt = !empty($request->startDateAt) ? \Carbon\Carbon::parse($request->startDateAt)->format('Y-m-d') : date('Y-m-d');
            $submissionDateAt = !empty($request->submissionDateAt) ? \Carbon\Carbon::parse($request->submissionDateAt)->format('Y-m-d') : date('Y-m-d');
            $file_url = '';

            // class image
            if (!empty($request->file('homeFile'))) {
                $file_url = $this->_upload->uploadImage($request, 'homeFile', 'homework_image', $request->schoolKey);
            }

            if (!empty($request->file('homeCameraFile'))) {
                $cameraFileArray = $this->_upload->uploadSingleFile($request, 'homeCameraFile', 'homework', $request->schoolKey);
            }

            if (!empty($request->file('homeDocFile'))) {
                $docFileArray = $this->_upload->uploadSingleFile($request, 'homeDocFile', 'homework', $request->schoolKey);
            }

            $dataArray = [
                'user_id' => $request->userId,
                'school_id' => $request->schoolId,
                'academic_year_id' => $academicYearId,
                'class_name_id' => $request->classNameId,
                'class_subject_id' => $request->classSubjectId,
                'type' => $request->type,
                'title' => $request->title,
                'sub_title' => $request->subtitle,
                'description' => $request->description,
                'start_date_at' => $startDateAt,
                'end_date_at' => $submissionDateAt,
                'assigned_to_class' => $request->assignedToClass,
                'allow_submission' => $request->allowSubmission,
                'home_file' => $file_url,
                'home_camera_file' => !empty($cameraFileArray['path']) ? $cameraFileArray['path'] : null,
                'home_doc_file' => !empty($docFileArray['path']) ? $docFileArray['path'] : null,
                'home_file_url' => $request->homeFileUrl ?? null,
                'status' => Status::ACTIVE->value,
            ];

            $homework =  $this->homeworkRepository->update($id, $dataArray);
            if( isset($homework) ) {
                $existingClassroomIds = $this->homeworkRepository->geClassroomFromClassNameId($request->schoolId, $academicYearId, $id);
                // deleted existing classwork classrooms before creating.
                if( !empty($existingClassroomIds) ) {
                    foreach($existingClassroomIds as $existObj) {
                        $this->homeworkRepository->deleteClassworkClassroom($existObj->id);
                    }
                }
                // created classwork classroom
                if( !empty($request->classroomIds) ) {
                    $classroomIdsArray = (array)json_decode($request->classroomIds);
                    foreach($classroomIdsArray as $classroomId) {
                        $dataArray = [
                            'school_id' => $request->schoolId,
                            'academic_year_id' => $academicYearId,
                            'homework_id' => $id,
                            'classroom_id' => $classroomId,
                        ];
                        $this->homeworkRepository->createClassworkClassroom($dataArray);
                    }
                }
                // Create Folder
                $checkArray = [
                    'school_id' => $request->schoolId,
                    'folderable_type' => \App\Models\Homework::class,
                    'folderable_id' => $id,
                ];

                $dataArray = [
                    'school_id' => $request->schoolId,
                    'class_name_id' => $request->organizeClassNameId,
                    'classroom_id' => null,
                    'subject_id' => $request->organizeClassSubjectId, //organizeFolderId
                    'topic_id' => $request->organizeTopicId,
                    'folderable_type' => \App\Models\Homework::class,
                    'folderable_id' => $id,
                    'name' => '',
                    'description' => '',
                ];
                $this->organizeFolderRepository->updateOrCreate($checkArray, $dataArray);
                $homework = $this->homeworkRepository->getById($id);
            }
            
            return response()->json([
                'success' => true,
                'message' => 'Updated successfully',
                'data' => $homework
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
     *    path="/assessments/show/{id}",
     *    operationId="showAssessment",
     *    tags={"Homework"},
     *    summary="Show homeworks Details",
     *    description="Show homeworks Details",
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
    public function showAssessment(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $homework = $this->homeworkRepository->getById($id);
            return response()->json([
                'success' => true,
                'data' => $homework,
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
     *    path="/assessments/student/submission",
     *    operationId="studentSubmission",
     *    tags={"Homework"},
     *    summary="Get students homeworks",
     *    description="Get students homeworks",
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
    public function studentSubmission(Request $request)
    {
        $homeworks = $this->homeworkRepository->getHomeworkStudentActiveAll($request->homeworkId);
        $homeworksCounts = $this->homeworkRepository->getHomeworkStudentCounts($request->homeworkId);

        return response()->json([
            'success' => true,
            'data' => $homeworks,
            'homeworksCounts' => $homeworksCounts,
        ], 200);
    }

    /**
     * @OA\Post(
     * path="/assessments/students/status/change",
     * summary="Change Student Status",
     * description="Change Student Status",
     * operationId="changeStudentsStatus",
     * tags={"Homework"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Submit Change Student Status",
     *    @OA\JsonContent(
     *       required={"schoolId","ids","status", "homeworkId"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="status", type="string", example="In-Progress"),
     *       @OA\Property(property="ids", type="string", example="1,3"),
     *       @OA\Property(property="homeworkId", type="integer", example="1"),
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
    public function changeStudentsStatus(Request $request)
    {
        $setting = SchoolSetting::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->first();

        if ( !empty($request->ids) && !empty($request->status) ) {
            $idsArray = json_decode($request->ids);
            if( !empty($idsArray[0]) ) {
                foreach($idsArray as $obj) {
                    $dataArray = [
                        'homework_status' => $request->status,
                    ];
                    $homeworkObj = $this->homeworkRepository->getHomeworkFromStudentId($request->homeworkId, $obj->id);
                    if( !empty($homeworkObj->id) ) {
                        $homework =  $this->homeworkRepository->updateHomeworkStudent($homeworkObj->id, $dataArray);
                    }
                }

                return response()->json([
                    'success' => true,
                    'message' => 'created successfully',
                    'data' => $dataArray
                ], 200);
            }

            return response()->json([
                'success' => false,
                'message' => 'Student Ids are not given!',
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
     * path="/assessments/student/submit",
     * summary="Submit Assessment",
     * description="Submit Assessment",
     * operationId="submitStudentAssessment",
     * tags={"Assessment"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Submit Student Assessment",
     *    @OA\JsonContent(
     *       required={"schoolId","userId","studentId","homeworkId","description", "status"},
     *       @OA\Property(property="schoolId", type="integer", example="1"),
     *       @OA\Property(property="userId", type="integer", example="1"),
     *       @OA\Property(property="studentId", type="integer", example="1"),
     *       @OA\Property(property="homeworkId", type="integer", example="1"),
     *       @OA\Property(property="description", type="string", example=""),
     *       @OA\Property(property="status", type="string", example="In-Progress"),
     *    ),
    *     @OA\MediaType(
    *         mediaType="multipart/form-data",
    *             @OA\Schema(
    *                 allOf={
    *                     @OA\Schema(ref="#components/schemas/item"),
    *                     @OA\Schema(
    *                         @OA\Property(
    *                             description="Item image",
    *                             property="filePath",
    *                             type="string", format="binary"
    *                         )
    *                     )
    *                 }
    *             )
    *         ),
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
    public function submitStudentAssessment(Request $request)
    {
        $ass_file = '';
        // class image
        if (!empty($request->file('ass_file'))) {
            $ass_file = $this->_upload->uploadImage($request, 'ass_file', 'assessment_image');
        }
        
        $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
        if (!empty($request->comment)  && !empty($request->assessmentId)) {
            
            $dataArray = [
                'user_id' => $request->userId,
                'school_id' => $request->schoolId,
                'academic_year_id' => $academicYearId,
                'student_id' => $request->studentId,
                'assessment_id' => $request->assessmentId,
                'comment' => $request->comment,
                'ass_file' => $ass_file,
                'assessment_status' => isset($request->status) ? $request->status : AssessmentStatus::REWORK->value,
                'commented_by' => $request->commentedBy
            ];

            $assessment =  $this->assessmentRepository->createAssessmentActivityComment($dataArray);
         
            return response()->json([
                'success' => true,
                'message' => 'created successfully',
                'data' => $assessment
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
     *     path="/assessments/delete/{}",
     *     tags={"Homework"},
     *     summary="Delete Homework",
     *     operationId="deleteAssessment",
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
     *         description="Classwork not found",
     *     ),
     *     security={ {"sanctum": {} }},
     * )
     */
    public function deleteAssessment(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $homework =  $this->homeworkRepository->delete($id);
            return response()->json([
                'success' => true,
                'message' => 'Deleted successfully',
                'data' => $homework
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
     *    path="/assessments/student/view",
     *    operationId="viewStudentAssessment",
     *    tags={"StudentHomework"},
     *    summary="Get all Student homeworks",
     *    description="Get all Student homeworks",
     *    security={ {"sanctum": {} }},
     * @OA\RequestBody(
     *    required=true,
     *    description="Save Brand",
     *    @OA\JsonContent(
     *       required={"title"},
    *       @OA\Property(property="classroomId", type="integer", example="1", description="Required classroom ID"),
    *       @OA\Property(property="classNameId", type="integer", example="1", description="Filter by class name ID"),
    *       @OA\Property(property="classSubjectId", type="integer", example="1", description="Filter by subject ID"),
    *       @OA\Property(property="schoolId", type="integer", example="1", description="school Id"),
     *    ),
     * ),
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function viewStudentAssessment(Request $request)
    {
        if (!empty($request->classroomId)) {
            $assessments = $this->assessmentRepository->getAssessmentsByClassroomIdWithFilters(
            $request->classroomId,
            $request->classNameId ?? null,
            $request->classSubjectId ?? null,
            $request->schoolId ?? null
            );
            
            return response()->json([
            'success' => true,
            'data' => $assessments
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
     *    path="/assessments/student/comments",
     *    operationId="viewStudentComments",
     *    tags={"viewStudentComments"},
     *    summary="Get all Student homeworks comments",
     *    description="Get all Student homeworks comments",
     *    security={ {"sanctum": {} }},
     * @OA\RequestBody(
     *    required=true,
     *    description="Save Brand",
     *    @OA\JsonContent(
     *       required={"title"},
    *       @OA\Property(property="classroomId", type="integer", example="1", description="Required classroom ID"),
    *       @OA\Property(property="classNameId", type="integer", example="1", description="Filter by class name ID"),
    *       @OA\Property(property="classSubjectId", type="integer", example="1", description="Filter by subject ID"),
    *       @OA\Property(property="schoolId", type="integer", example="1", description="school Id"),
     *    ),
     * ),
     *    @OA\Response(
     *       response=200, description="Success",
     *       @OA\JsonContent(
     *         @OA\Property(property="status", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *       )
     *    )
     *  )
     */
    public function viewStudentComments(Request $request)
    {
        if (!empty($request->studentId) && !empty($request->assessmentId)) {
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $comments = $this->assessmentRepository->getStudentAssessmentComments(
                $request->assessmentId ?? null,
                $request->studentId ?? null,
                $request->schoolId ?? null,
                $academicYearId,
            );
            
            return response()->json([
            'success' => true,
            'data' => $comments
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
     *     path="/assessments/student/comment/delete/{}",
     *     tags={"Assessments"},
     *     summary="Delete Assessments Comments",
     *     operationId="deleteAssessmentsComments",
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
     *         description="Classwork not found",
     *     ),
     *     security={ {"sanctum": {} }},
     * )
     */
    public function deleteAssessmentComments(Request $request, int $id)
    {
        if (!empty($request->schoolId)) {
            try {
                $assessmentworkActivityComment = $this->assessmentRepository->getCommentById($id);
                
                if (!$assessmentworkActivityComment) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Assessment comment not found or does not belong to this school.',
                    ], 404);
                }
        
                $assessmentworkActivityComment->delete();
                return response()->json([
                    'success' => true,
                    'message' => 'Assessment Comment deleted successfully.',
                    'data' => $assessmentworkActivityComment
                ], 200);
        
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Assessment comment not found or already deleted.',
                ], 404);
            }
        } else {
            return response()->json([
                'success' => false,  // Changed to false since it's an error case
                'message' => 'School ID is required',
                'data' => ['id' => $id]
            ], 400);  // Changed to 400 Bad Request
        }
    }
}