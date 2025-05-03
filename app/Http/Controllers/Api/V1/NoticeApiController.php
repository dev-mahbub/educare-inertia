<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\Status;
use App\Enums\AudienceType;
use App\Http\Controllers\Api\ControllerApi;
use App\Models\SchoolSetting;
use App\Repositories\IImageRepository;
use App\Repositories\INoticeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class NoticeApiController extends ControllerApi
{
    private $_upload;
    public function __construct(
        private INoticeRepository $noticeRepository,
        private IImageRepository $imageRepository,
    ) {
        $this->_upload = new \App\Http\Controllers\UploadFileController();
    }
    
    /**
     * @OA\Get(
     *    path="/notices/all",
     *    operationId="indexNotice",
     *    tags={"Notice"},
     *    summary="Get all notices",
     *    description="Get all notices",
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
    public function indexNotice(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $notices = $this->noticeRepository->getFilteredNoticeLists("", "", "", $request->schoolId);
            return response()->json([
                'success' => true,
                'data' => !empty($notices) ? $notices : null
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
     * path="/notices/create",
     * summary="Create Notice",
     * description="Create Notice",
     * operationId="createNotice",
     * tags={"Notice"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Create Notice",
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
    public function createNotice(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->schoolKey) && !empty($request->title) ) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            DB::beginTransaction();
            try {
                $dataArray = array(
                    'school_id' => $request->schoolId,
                    'academic_year_id' => $setting?->academic_year_id,
                    'created_by' => $request->userId,
                    'title' => $request->title,
                    'details' => $request->details ?? null,
                    'audience_type' => $request->audienceType ?? null,
                    'notice_type' => $request->noticeType ?? null,
                    'start_date' => !empty($request->startDate) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->startDate)->timezone(getSchoolTimeZone())->format('Y-m-d H:i:s') : null,
                    'end_date' => !empty($request->endDate) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->endDate)->timezone(getSchoolTimeZone())->format('Y-m-d H:i:s') : null,
                    'is_published' => $request->isPublished ?? null,
                    'status' => Status::ACTIVE,
                );

                $notice = $this->noticeRepository->create($dataArray);

                // upload notice image
                if (!empty($input['notice_image'])) {
                    $imageUrl = $this->_upload->uploadImage($request, 'notice_image', 'notice_image', $request->schoolKey);
                    if (!empty($imageUrl)) {
                        $dataImage = array(
                            'school_id' => $request->schoolId,
                            'imageable_type' => $notice->getMorphClass(),
                            'imageable_id' => $notice->id,
                            'name' => "notice_image",
                            'path' => $imageUrl,
                            'status' => Status::ACTIVE,
                        );
                        $this->imageRepository->morphCreate($dataImage, $notice->id);
                    }
                }

                // assign class
                if ($request->audienceType == AudienceType::STUDENT->value && $request->classroomIds) {
                    foreach ($request->classroomIds as $classroomId) {
                        $dataArray = [
                            'school_id' => $request->schoolId,
                            'academic_year_id' => $setting?->academic_year_id,
                            'notice_id' => $notice->id,
                            'classroom_id' => $classroomId,
                            'status' => Status::ACTIVE,
                        ];
                        $this->noticeRepository->createNoticeClassroom($dataArray);
                    }
                }
                DB::commit();
                return response()->json([
                    'success' => true,
                    'message' => 'created successfully',
                    'data' => $notice
                ], 200);

            } catch (\Throwable $th) {
                DB::rollBack();
                return response()->json([
                    'success' => true,
                    'message' => 'Something Wrong!',
                    'data' => null
                ], 200);
            }
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
     * path="/notices/update/{id}",
     * summary="Update Notice",
     * description="Update Notice",
     * operationId="updateNotice",
     * tags={"Notice"},
     *    @OA\Parameter(
     *    in="path",
     *    name="id",
     *    required=true,
     *    description="Update Notice",
     *    @OA\Schema(type="string"),
     *    @OA\Examples(example="int", value="1", summary="An int value."),
     * ),
     * @OA\RequestBody(
     *    required=true,
     *    description="Update Notice",
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
    public function updateNotice(Request $request, int $id)
    {
        if (!empty($request->title) && !empty($request->schoolKey)) {
            $homework = $this->noticeRepository->getById($id);
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
     *    path="/notices/show/{id}",
     *    operationId="showNotice",
     *    tags={"Notice"},
     *    summary="Show Notice Details",
     *    description="Show Notice Details",
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
    public function showNotice(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $homework = $this->noticeRepository->getById($id);
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
     * @OA\Delete(
     *     path="/notices/delete/{}",
     *     tags={"Notice"},
     *     summary="Delete Notice",
     *     operationId="deleteNotice",
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
    public function deleteNotice(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $notice =  $this->noticeRepository->delete($id);
            return response()->json([
                'success' => true,
                'message' => 'Deleted Successfully',
                'data' => $notice
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
     *    path="/news/all",
     *    operationId="viewStudentNews",
     *    tags={"News"},
     *    summary="Get all news",
     *    description="Get all news",
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
    public function viewStudentNotice(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->classroomId) ) { 
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
    
            $noticeStatus = $request->noticeStatus ?? "";
            $orderByDate = $request->orderByDate ?? "";
            $audienceType = "STUDENT";
            $noticeType = "NOTICE";
     
            $noticeLists = $this->noticeRepository->getStudentFilteredNoticeLists($noticeStatus, $orderByDate, $audienceType, $request->schoolId, $request->classroomId, $academicYearId, $noticeType);
    
            if (count($noticeLists) > 0) {
                $noticeLists = $noticeLists->map(function ($notice) {
                    $createdDate = !empty($notice->created_at) ? Carbon::parse($notice->created_at)->format('d-M-Y H:i A') : "";
                    $publishDate = !empty($notice->start_date) ? Carbon::parse($notice->start_date)->format('d-M-Y H:i A') : "";
    
                    $notice['created_date'] = $createdDate;
                    $notice['publish_date'] = $publishDate;
    
                    return $notice;
                });
            }
        
            return response()->json([
                'success' => true,
                'data' => $noticeLists
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