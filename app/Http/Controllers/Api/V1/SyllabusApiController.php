<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\SyllabusStatus;
use App\Enums\OrderByType;
use App\Enums\AudienceType;
use App\Enums\Status;
use App\Http\Controllers\Api\ControllerApi;
use App\Models\SchoolSetting;
use App\Repositories\IAcademicSyllabusRepository;
use App\Repositories\IImageRepository;
use Illuminate\Http\Request;
use Carbon\Carbon;

class SyllabusApiController extends ControllerApi
{
    private $_upload;

    public function __construct(
        private IAcademicSyllabusRepository $academicSyllabusRepository,
        private IImageRepository $imageRepository,
    ) {
        $this->_upload = new \App\Http\Controllers\UploadFileController();
    }
    
    /**
     * @OA\Get(
     *    path="/syllabus/all",
     *    operationId="indexSyllabus",
     *    tags={"Syllabus"},
     *    summary="Get all Syllabus",
     *    description="Get all Syllabus",
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
    public function indexSyllabus(Request $request)
    {
        if ( !empty($request->schoolId) ) { 
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $classId = !empty($request->classId) ? $request->classId : null;
            $subjectId = !empty($request->subjectId) ? $request->subjectId : null;
            $academicSyllabuses = $this->academicSyllabusRepository->getSyllabusBySearch($classId, $subjectId, $request->schoolId, $setting?->academic_year_id);
            $academicSyllabuses->load(['className', 'subject', 'image']);
            return response()->json([
                'success' => true,
                'data' => $academicSyllabuses
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
     * path="/syllabus/create",
     * summary="Create Syllabus",
     * description="Create Syllabus",
     * operationId="createSyllabus",
     * tags={"Syllabus"},
     * @OA\RequestBody(
     *    required=true,
     *    description="Create Syllabus",
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
    public function createSyllabus(Request $request)
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
     * path="/syllabus/update/{id}",
     * summary="Update Syllabus",
     * description="Update Syllabus",
     * operationId="updateSyllabus",
     * tags={"Syllabus"},
     *    @OA\Parameter(
     *    in="path",
     *    name="id",
     *    required=true,
     *    description="Update Syllabus",
     *    @OA\Schema(type="string"),
     *    @OA\Examples(example="int", value="1", summary="An int value."),
     * ),
     * @OA\RequestBody(
     *    required=true,
     *    description="Update Syllabus",
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
    public function updateSyllabus(Request $request, int $id)
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
     *    path="/syllabus/show/{id}",
     *    operationId="showSyllabus",
     *    tags={"Syllabus"},
     *    summary="Show Syllabus Details",
     *    description="Show Syllabus Details",
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
    public function showSyllabus(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $syllabus = $this->syllabusRepository->getById($id);
            return response()->json([
                'success' => true,
                'data' => $syllabus,
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
     *     path="/syllabus/delete/{}",
     *     tags={"Syllabus"},
     *     summary="Delete Syllabus",
     *     operationId="deleteSyllabus",
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
    public function deleteSyllabus(Request $request, int $id)
    {
        if ( !empty($request->schoolId) ) {
            $syllabus =  $this->syllabusRepository->delete($id);
            return response()->json([
                'success' => true,
                'message' => 'Deleted successfully',
                'data' => $syllabus
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
}