<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\Status;
use App\Http\Controllers\Api\ControllerApi;
use App\Models\Classroom;
use App\Models\SchoolSetting;
use App\Repositories\IClassroomRepository;
use App\Repositories\IClassroomSubjectRepository;
use Illuminate\Http\Request;

class ClassNameApiController extends ControllerApi
{
    public function __construct(
        private IClassroomRepository $classroomRepository,
        private IClassroomSubjectRepository $classroomSubjectRepository,
    ) {
        //
    }
    
    /**
     * @OA\Get(
     *    path="/classes/all",
     *    operationId="indexClassName",
     *    tags={"ClassName"},
     *    summary="All Active class names",
     *    description="All Active class names",
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
    public function indexClassName(Request $request)
    {
        $setting = SchoolSetting::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->first();
        $classes = $this->classroomRepository->getActiveClassNameAll($request->schoolId, $setting?->academic_year_id);
        $classes->load(['classrooms']);
        return response()->json([
            'success' => true,
            'data' => $classes,
        ], 200);
    }

    /**
     * @OA\Get(
     *    path="/classes/subjects",
     *    operationId="subjects",
     *    tags={"ClassName"},
     *    summary="All Active class subjects",
     *    description="All Active class subjects",
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
    public function subjects(Request $request)
    {
        $setting = SchoolSetting::where('status', Status::ACTIVE)
            ->where('school_id', $request->schoolId)
            ->first();
        $classSubjects = $this->classroomSubjectRepository->getActiveAllClassSubjectByClassId($request->classNameId, $request->schoolId, $setting?->academic_year_id);

        return response()->json([
            'success' => true,
            'data' => $classSubjects,
        ], 200);
    }    
}
