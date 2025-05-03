<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\NewsStatus;
use App\Enums\OrderByType;
use App\Enums\AudienceType;
use App\Enums\Status;
use App\Http\Controllers\Api\ControllerApi;
use App\Models\SchoolSetting;
use App\Repositories\IClassroomRepository;
use App\Repositories\IImageRepository;
use App\Repositories\INewsRepository;
use Illuminate\Http\Request;
use Carbon\Carbon;

class NewsApiController extends ControllerApi
{
    private $_upload;

    public function __construct(
        private INewsRepository $newsRepository,
        private IClassroomRepository $classroomRepository,
        private IImageRepository $imageRepository,
    ) {
        $this->_upload = new \App\Http\Controllers\UploadFileController();
    }
    
    /**
     * @OA\Get(
     *    path="/news/all",
     *    operationId="indexNews",
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
    public function indexNews(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $newsStatusArr = buildEnumOptionsArray(NewsStatus::cases());
            $orderByTypes = buildEnumOptionsArray(OrderByType::cases());
            $audienceTypes = buildEnumOptionsArray(AudienceType::cases());
    
            $newsStatus = $request->newsStatus ?? "";
            $orderByDate = $request->orderByDate ?? "";
            $audienceType = $request->audienceType ?? "";
    
            $newsLists = $this->newsRepository->getFilteredNewsLists($newsStatus, $orderByDate, $audienceType, $request->schoolId);
    
            if (count($newsLists) > 0) {
                $newsLists = $newsLists->map(function ($news) {
                    $createdDate = !empty($news->created_at) ? Carbon::parse($news->created_at)->format('d-M-Y H:i A') : "";
                    $publishDate = !empty($news->start_date) ? Carbon::parse($news->start_date)->format('d-M-Y H:i A') : "";
    
                    $news['created_date'] = $createdDate;
                    $news['publish_date'] = $publishDate;
    
                    return $news;
                });
            }
        
            return response()->json([
                'success' => true,
                'data' => $newsLists
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
     * path="/news/create",
     * summary="Create News",
     * description="Create News",
     * operationId="createNews",
     * tags={"News"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Create News",
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
    public function createNews(Request $request)
    {
        if (!empty($request->title) && !empty($request->schoolKey)) {
          
            return response()->json([
                'success' => true,
                'message' => 'created successfully',
                'data' => null
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
     * path="/news/update/{id}",
     * summary="Update News",
     * description="Update News",
     * operationId="updateNews",
     * tags={"News"},
     *    @OA\Parameter(
     *    in="path",
     *    name="id",
     *    required=true,
     *    description="Update News",
     *    @OA\Schema(type="string"),
     *    @OA\Examples(example="int", value="1", summary="An int value."),
     * ),
     * @OA\RequestBody(
     *    required=true,
     *    description="Update News",
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
    public function updateNews(Request $request, int $id)
    {
        if (!empty($request->title) && !empty($request->schoolKey)) {
            return response()->json([
                'success' => true,
                'message' => 'Updated successfully',
                'data' => null
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
     *    path="/news/show/{id}",
     *    operationId="showNews",
     *    tags={"News"},
     *    summary="Show news Details",
     *    description="Show news Details",
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
    public function showNews(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $news = $this->newsRepository->getById($id);
            return response()->json([
                'success' => true,
                'data' => $news,
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
     *     path="/news/delete/{}",
     *     tags={"News"},
     *     summary="Delete News",
     *     operationId="deleteNews",
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
    public function deleteNews(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $news =  $this->newsRepository->delete($id);
            return response()->json([
                'success' => true,
                'message' => 'Deleted successfully',
                'data' => $news
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
    public function viewStudentNews(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->classroomId) ) { 
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
    
            $newsStatus = $request->newsStatus ?? "";
            $orderByDate = $request->orderByDate ?? "";
            $audienceType = "STUDENT";
            $newsType = "News";
     
            $newsLists = $this->newsRepository->getStudentFilteredNewsLists($newsStatus, $orderByDate, $audienceType, $request->schoolId, $request->classroomId, $academicYearId, $newsType);
    
            if (count($newsLists) > 0) {
                $newsLists = $newsLists->map(function ($news) {
                    $createdDate = !empty($news->created_at) ? Carbon::parse($news->created_at)->format('d-M-Y H:i A') : "";
                    $publishDate = !empty($news->start_date) ? Carbon::parse($news->start_date)->format('d-M-Y H:i A') : "";
    
                    $news['created_date'] = $createdDate;
                    $news['publish_date'] = $publishDate;
    
                    return $news;
                });
            }
        
            return response()->json([
                'success' => true,
                'data' => $newsLists
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