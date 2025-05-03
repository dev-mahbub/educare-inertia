<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\ClassworkStatus;
use App\Enums\HomeworkStatus;
use App\Enums\Status;
use App\Http\Controllers\Api\ControllerApi;
use App\Models\ClassroomAttendance;
use App\Models\SchoolSetting;
use App\Repositories\IClassworkRepository;
use App\Repositories\IOrganizeFolderRepository;
use Illuminate\Http\Request;

class ClassworkApiController extends ControllerApi
{
    private $_upload;

    public function __construct(
        private IClassworkRepository $classworkRepository,
        private IOrganizeFolderRepository $organizeFolderRepository,
    ) {
        $this->_upload = new \App\Http\Controllers\UploadFileController();
    }
    
    /**
     * @OA\Get(
     *    path="/classworks/all",
     *    operationId="indexClasswork",
     *    tags={"Classwork"},
     *    summary="Get all classworks",
     *    description="Get all classworks",
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
    public function indexClasswork(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->isAssigned) ) { 
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $classNameId = isset($request->classNameId) ? $request->classNameId : null;
            $classSubjectId = isset($request->classSubjectId) ? $request->classSubjectId : null;
            $isAssigned = ($request->isAssigned == 'yes') ? 1 : 0;
            $classworks = $this->classworkRepository->getActiveAllBySearch($request->schoolId, $setting?->academic_year_id, $classNameId, $classSubjectId, $isAssigned);
            
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
     * path="/classworks/create",
     * summary="Create Classwork",
     * description="Create Classwork",
     * operationId="createClasswork",
     * tags={"Classwork"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Create Classwork",
     *    @OA\JsonContent(
     *       required={"schoolId", "schoolKey", "classNameId","classSubjectId","startDateAt","title"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="schoolKey", type="interger", example="demo"),
     *       @OA\Property(property="classNameId", type="interger", example="demo"),
     *       @OA\Property(property="classSubjectId", type="interger", example="demo"),
     *       @OA\Property(property="title", type="string", example="Topic"),
     *       @OA\Property(property="classFile", type="string", example="File"),
     *       @OA\Property(property="classCameraFile", type="string", example="File"),
     *       @OA\Property(property="classDocFile", type="string", example="File"),
     *       @OA\Property(property="classFileUrl", type="string", example="url"),
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
    public function createClasswork(Request $request)
    {
        if (!empty($request->title) && !empty($request->schoolKey)) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $academicYearId = $setting?->academic_year_id;
            $startDateAt = !empty($request->startDateAt) ? \Carbon\Carbon::parse($request->startDateAt)->format('Y-m-d') : date('Y-m-d');
            $file_url = '';

            // class image
            if (!empty($request->file('classFile'))) {
                $file_url = $this->_upload->uploadImage($request, 'classFile', 'classwork_image', $request->schoolKey);
            }
            if (!empty($request->file('classCameraFile'))) {
                $cameraFileArray = $this->_upload->uploadSingleFile($request, 'classCameraFile', 'classwork', $request->schoolKey);
            }
            if (!empty($request->file('classDocFile'))) {
                $docFileArray = $this->_upload->uploadSingleFile($request, 'classDocFile', 'classwork', $request->schoolKey);
            }

            $dataArray = [
                'user_id' => $request->userId,
                'school_id' => $request->schoolId,
                'academic_year_id' => $academicYearId,
                'class_name_id' => $request->classNameId,
                'class_subject_id' => $request->classSubjectId,
                'title' => $request->title,
                'sub_title' => $request->subtitle,
                'description' => $request->description,
                'start_date_at' => $startDateAt,
                'end_date_at' => $startDateAt,
                'assigned_to_class' => $request->assignedToClass,
                'allow_submission' => $request->allowSubmission,
                'class_file' => $file_url,
                'class_camera_file' => !empty($cameraFileArray['path']) ? $cameraFileArray['path'] : null,
                'class_doc_file' => !empty($docFileArray['path']) ? $docFileArray['path'] : null,
                'class_file_url' => $request->classFileUrl ?? null,
                'status' => Status::ACTIVE->value,
            ];

            $classwork =  $this->classworkRepository->create($dataArray);
            if( isset($classwork) ) {
                $existingClassroomIds = $this->classworkRepository->geClassroomFromClassNameId($request->schoolId, $academicYearId, $classwork->id);
                // deleted existing classwork classrooms before creating.
                if( !empty($existingClassroomIds) ) {
                    foreach($existingClassroomIds as $existObj) {
                        $this->classworkRepository->deleteClassworkClassroom($existObj->id);
                    }
                }
                // created classwork classroom
                if( !empty($request->classroomIds) ) {
                    $classroomIdsArray = (array)json_decode($request->classroomIds);
                    foreach($classroomIdsArray as $classroomId) {
                        $dataArray = [
                            'school_id' => $request->schoolId,
                            'academic_year_id' => $academicYearId,
                            'classwork_id' => $classwork->id,
                            'classroom_id' => $classroomId,
                        ];
                        $this->classworkRepository->createClassworkClassroom($dataArray);
                    }
                }
                // Create Folder
                $dataArray = [
                    'school_id' => $request->schoolId,
                    'class_name_id' => $request->organizeClassNameId,
                    'classroom_id' => null,
                    'subject_id' => $request->organizeClassSubjectId, //organizeFolderId
                    'topic_id' => $request->organizeTopicId,
                    'folderable_type' => \App\Models\Classwork::class,
                    'folderable_id' => $classwork->id,
                    'name' => '',
                    'description' => '',
                ];
                $this->organizeFolderRepository->create($dataArray);
            }
            
            return response()->json([
                'success' => true,
                'message' => 'created successfully',
                'data' => $classwork
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
     * path="/classworks/update/{id}",
     * summary="Update Classwork",
     * description="Update Classwork",
     * operationId="updateClasswork",
     * tags={"Classwork"},
     * @OA\Parameter(
     *    in="path",
     *    name="id",
     *    required=true,
     *    description="Update Classwork",
     *    @OA\Schema(type="string"),
     *    @OA\Examples(example="int", value="1", summary="An int value."),
     * ),
     * @OA\RequestBody(
     *    required=true,
     *    description="Update Classwork",
     *    @OA\JsonContent(
     *       required={"schoolId", "schoolKey", "classNameId","classSubjectId","startDateAt","title"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="schoolKey", type="interger", example="demo"),
     *       @OA\Property(property="classNameId", type="interger", example="demo"),
     *       @OA\Property(property="classSubjectId", type="interger", example="demo"),
     *       @OA\Property(property="title", type="string", example="Topic"),
     *       @OA\Property(property="classFile", type="string", example="File"),
     *       @OA\Property(property="classCameraFile", type="string", example="File"),
     *       @OA\Property(property="classDocFile", type="string", example="File"),
     *       @OA\Property(property="classFileUrl", type="string", example="url"),
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
    public function updateClasswork(Request $request, int $id)
    {
        if (!empty($request->title) && !empty($request->schoolKey)) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();

            $academicYearId = $setting?->academic_year_id;
            $startDateAt = !empty($request->startDateAt) ? \Carbon\Carbon::parse($request->startDateAt)->format('Y-m-d') : date('Y-m-d');
            $file_url = '';

            // class image
            if (!empty($request->file('classFile'))) {
                $file_url = $this->_upload->uploadImage($request, 'classFile', 'classwork_image', $request->schoolKey);
            }
            if (!empty($request->file('classCameraFile'))) {
                $cameraFileArray = $this->_upload->uploadSingleFile($request, 'classCameraFile', 'classwork', $request->schoolKey);
            }
            if (!empty($request->file('classDocFile'))) {
                $docFileArray = $this->_upload->uploadSingleFile($request, 'classDocFile', 'classwork', $request->schoolKey);
            }

            $dataArray = [
                'user_id' => $request->userId,
                'school_id' => $request->schoolId,
                'academic_year_id' => $academicYearId,
                'class_name_id' => $request->classNameId,
                'class_subject_id' => $request->classSubjectId,
                'title' => $request->title,
                'sub_title' => $request->subtitle,
                'description' => $request->description,
                'start_date_at' => $startDateAt,
                'end_date_at' => $startDateAt,
                'assigned_to_class' => $request->assignedToClass,
                'allow_submission' => $request->allowSubmission,
                'class_file' => $file_url,
                'class_camera_file' => !empty($cameraFileArray['path']) ? $cameraFileArray['path'] : null,
                'class_doc_file' => !empty($docFileArray['path']) ? $docFileArray['path'] : null,
                'class_file_url' => $request->classFileUrl ?? null,
                'status' => Status::ACTIVE->value,
            ];

            $classwork =  $this->classworkRepository->update($id, $dataArray);
            if( $classwork ) {
                $existingClassroomIds = $this->classworkRepository->geClassroomFromClassNameId($request->schoolId, $academicYearId, $id);
                // deleted existing classwork classrooms before creating.
                if( !empty($existingClassroomIds) ) {
                    foreach($existingClassroomIds as $existObj) {
                        $this->classworkRepository->deleteClassworkClassroom($existObj->id);
                    }
                }
                // created classwork classroom
                if( !empty($request->classroomIds) ) {
                    $classroomIdsArray = (array)json_decode($request->classroomIds);
                    foreach($classroomIdsArray as $classroomId) {
                        $dataArray = [
                            'school_id' => $request->schoolId,
                            'academic_year_id' => $academicYearId,
                            'classwork_id' => $id,
                            'classroom_id' => $classroomId,
                        ];
                        $this->classworkRepository->createClassworkClassroom($dataArray);
                    }
                }
                // Create Folder
                $checkArray = [
                    'school_id' => $request->schoolId,
                    'folderable_type' => \App\Models\Classwork::class,
                    'folderable_id' => $id,
                ];
                $dataArray = [
                    'school_id' => $request->schoolId,
                    'class_name_id' => $request->organizeClassNameId,
                    'classroom_id' => null,
                    'subject_id' => $request->organizeClassSubjectId, //organizeFolderId
                    'topic_id' => $request->organizeTopicId,
                    'folderable_type' => \App\Models\Classwork::class,
                    'folderable_id' => $id,
                    'name' => '',
                    'description' => '',
                ];
                $this->organizeFolderRepository->updateOrCreate($checkArray, $dataArray);
                $classwork = $this->classworkRepository->getById($id);
            }
            
            return response()->json([
                'success' => true,
                'message' => 'Updated successfully',
                'data' => $classwork
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
     *    path="/classworks/show/{id}",
     *    operationId="showClasswork",
     *    tags={"Classwork"},
     *    summary="Show Classworks Details",
     *    description="Show Classworks Details",
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
    public function showClasswork(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $classwork = $this->classworkRepository->getById($id);
            return response()->json([
                'success' => true,
                'data' => $classwork,
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
     *    path="/classworks/student/submission",
     *    operationId="studentClassworkSubmission",
     *    tags={"Classwork"},
     *    summary="Get students Classworks",
     *    description="Get students Classworks",
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
    public function studentClassworkSubmission(Request $request)
    {
        $classworks = $this->classworkRepository->getClassworkStudentActiveAll($request->classworkId);
        $classworkCounts = $this->classworkRepository->getClassworkStudentCounts($request->classworkId);

        return response()->json([
            'success' => true,
            'data' => $classworks,
            'classworkCounts' => $classworkCounts,
        ], 200);
    }

    /**
     * @OA\Post(
     * path="/classworks/students/status/change",
     * summary="Change Student Status",
     * description="Change Student Status",
     * operationId="changeClassworkStudentsStatus",
     * tags={"Classwork"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Submit Change Student Status",
     *    @OA\JsonContent(
     *       required={"schoolId","ids","status", "ClassworkId"},
     *       @OA\Property(property="schoolId", type="interger", example="1"),
     *       @OA\Property(property="status", type="string", example="In-Progress"),
     *       @OA\Property(property="ids", type="string", example="1,3"),
     *       @OA\Property(property="ClassworkId", type="integer", example="1"),
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
    public function changeClassworkStudentsStatus(Request $request)
    {
        $setting = SchoolSetting::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->first();

        if ( !empty($request->ids) && !empty($request->status) ) {
            $idsArray = json_decode($request->ids);
            if( !empty($idsArray[0]) ) {
                foreach($idsArray as $obj) {
                    $dataArray = [
                        'classwork_status' => $request->status,
                    ];
                    $classworkObj = $this->classworkRepository->getClassworkFromStudentId($request->classworkId, $obj->id);
                    if( !empty($classworkObj->id) ) {
                        $Classwork =  $this->classworkRepository->updateClassworkStudent($classworkObj->id, $dataArray);
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
     * path="/classworks/student/submit",
     * summary="Submit Classwork",
     * description="Submit Classwork",
     * operationId="submitStudentClasswork",
     * tags={"Classwork"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Submit Student Classwork",
     *    @OA\JsonContent(
     *       required={"schoolId","userId","studentId","classworkId","description", "status"},
     *       @OA\Property(property="schoolId", type="integer", example="1"),
     *       @OA\Property(property="userId", type="integer", example="1"),
     *       @OA\Property(property="studentId", type="integer", example="1"),
     *       @OA\Property(property="classworkId", type="integer", example="1"),
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
    public function submitStudentClasswork(Request $request)
    {
        $setting = SchoolSetting::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->first();

        $ass_file = '';

        // class image
        if (!empty($request->file('ass_file'))) {
            $ass_file = $this->_upload->uploadImage($request, 'ass_file', 'classwork_image');
        }
        $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);

        if (!empty($request->comment)) {
            $dataArray = [
                'user_id' => $request->userId,
                'school_id' => $request->schoolId,
                'student_id' => $request->studentId,
                'academic_year_id' => $academicYearId,
                'comment' => $request->comment,
                'classwork_id' => $request->classworkId,
                'description' => $request->description,
                'ass_file' => $ass_file,
                'assessment_status' => isset($request->status) ? $request->status : ClassworkStatus::COMPLETED->value,
                'commented_by' => $request->commentedBy
            ];

            $classwork =  $this->classworkRepository->createClassworkStudentActivityComment($dataArray);

            // $existClasswork =  $this->classworkRepository->getClassworkFromStudentId($request->classworkId, $request->studentId);
            // if( !empty($existClasswork->id) ) {
            //     $classwork =  $this->classworkRepository->updateClassworkStudent($existClasswork->id, $dataArray);
            // }
            // else {
            // }

            return response()->json([
                'success' => true,
                'message' => 'created successfully',
                'data' => $classwork
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
     *     path="/classworks/delete/{id}",
     *     tags={"Classwork"},
     *     summary="Delete Classwork",
     *     operationId="deleteClasswork",
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
    public function deleteClasswork(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $classwork =  $this->classworkRepository->delete($id);
            return response()->json([
                'success' => true,
                'message' => 'Deleted successfully',
                'data' => $classwork
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
     *    path="/classworks/student/view",
     *    operationId="viewStudentClasswork",
     *    tags={"StudentClasswork"},
     *    summary="Get all Student classworks",
     *    description="Get all Student classworks",
     *    security={ {"sanctum": {} }},
     * @OA\RequestBody(
     *    required=true,
     *    description="Save Brand",
     *    @OA\JsonContent(
     *       required={"classroomId"},
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
    public function viewStudentClasswork(Request $request)
    {
        if (!empty($request->classroomId)) {
            $classworks = $this->classworkRepository->getClassworksByClassroomIdWithFilters(
            $request->classroomId,
            $request->classNameId ?? null,
            $request->classSubjectId ?? null,
            $request->schoolId ?? null,
            );
            
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
     * @OA\Get(
     *    path="classworks/student/comments",
     *    operationId="viewStudentComments",
     *    tags={"viewStudentComments"},
     *    summary="Get all Student classworks comments",
     *    description="Get all Student classworks comments",
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
        if (!empty($request->studentId) && !empty($request->classworkId)) {
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $comments = $this->classworkRepository->getClassworkStudentAssessmentComments(
                $request->schoolId ?? null,
                $academicYearId,
                $request->classworkId ?? null,
                $request->studentId ?? null
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
     *     path="classworks/student/comments/delete/{}",
     *     tags={"classwork"},
     *     summary="Delete classwork Comments",
     *     operationId="deleteClassworkComment",
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
    public function deleteClassworkComment(Request $request, int $id)
    {
        if (!empty($request->schoolId)) {
            try {
                $classworkActivityComment = $this->classworkRepository->getActivityCommentById($id);
                
                if (!$classworkActivityComment) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Classwork comment not found or does not belong to this school.',
                    ], 404);
                }
        
                $classworkActivityComment->delete();
                return response()->json([
                    'success' => true,
                    'message' => 'Classwork Comment deleted successfully.',
                    'data' => $classworkActivityComment
                ], 200);
        
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Classwork comment not found or already deleted.',
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