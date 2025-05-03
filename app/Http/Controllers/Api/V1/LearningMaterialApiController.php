<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\Status;
use App\Http\Controllers\Api\ControllerApi;
use App\Models\SchoolSetting;
use App\Repositories\ILearningMaterialRepository;
use App\Repositories\IVirtualExamRepository;
use Illuminate\Http\Request;
use Carbon\Carbon;

class LearningMaterialApiController extends ControllerApi
{
    private $_upload;

    public function __construct(
        private ILearningMaterialRepository $learningMaterialRepository,
        private IVirtualExamRepository $virtualExamRepository,
    ) {
        // do something
    }
    
    /**
     * @OA\Get(
     *    path="/learning-material/courses",
     *    operationId="materialCourses",
     *    tags={"Learning Material"},
     *    summary="Get all Learning Material Courses",
     *    description="Get all Learning Material Courses",
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
    public function materialCourses(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->classroomId) && !empty($request->subjectId) ) { 
            $academicYearId = getAcademicYearIdFromSchoolId($request->schoolId);
            $classroomId = !empty($request->classroomId) ? $request->classroomId : null;
            $subjectId = !empty($request->subjectId) ? $request->subjectId : null;
            $courses = $this->learningMaterialRepository->getClassroomLearningMaterials($classroomId, $subjectId, $request->schoolId, $academicYearId);
            
            return response()->json([
                'success' => true,
                'data' => $courses
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
     *    path="/learning-material/question/review",
     *    operationId="notUseNow",
     *    tags={"Learning Material"},
     *    summary="Get Material Question Review",
     *    description="Get Material Question Review",
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
    public function notUseNow(Request $request)
    {
        if ( !empty($request->schoolId) && !empty($request->questionId) ) { 
            $virtualQuestion = $this->virtualExamRepository->getVirtualQuestionById($request->questionId, $request->schoolId);
            if( !empty($virtualQuestion->answer_options) ) {
                $virtualQuestion['answer_options'] = !empty($virtualQuestion->answer_options) ? json_decode($virtualQuestion->answer_options) : [];
                $virtualQuestion['created_on'] = !empty($virtualQuestion->created_at) ? Carbon::parse($virtualQuestion->created_at)->format('d-M-Y') : '';
                $virtualQuestion['updated_on'] = !empty($virtualQuestion->updated_at) ? Carbon::parse($virtualQuestion->updated_at)->format('d-M-Y') : '';
            }
            
            return response()->json([
                'success' => true,
                'data' => $virtualQuestion
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