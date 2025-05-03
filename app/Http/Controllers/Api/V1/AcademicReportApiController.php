<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\Status;
use App\Http\Controllers\Api\ControllerApi;
use App\Models\Classroom;
use App\Models\SchoolSetting;
use App\Repositories\IClassroomRepository;
use App\Repositories\IClassroomSubjectRepository;
use App\Repositories\IStudentRepository;
use Illuminate\Http\Request;

class AcademicReportApiController extends ControllerApi
{
    public function __construct(
        private IClassroomRepository $classroomRepository,
        private IClassroomSubjectRepository $classroomSubjectRepository,
        private IStudentRepository $studentRepository,
    ) {
        //
    }
    
    /**
     * @OA\Get(
     *    path="/academic/report/preview-report-card",
     *    operationId="indexPreviewReportCard",
     *    tags={"AcademicReportCard"},
     *    summary="All Academic Report Card",
     *    description="All Academic Report Card",
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
    public function indexPreviewReportCard(Request $request)
    {
        if (!empty($request->schoolId) && !empty($request->admissionNo)) {
            $setting = SchoolSetting::where('status', Status::ACTIVE)
                ->where('school_id', $request->schoolId)
                ->first();
            $academicYearId = $setting?->academic_year_id;

            $classrooms = $this->classroomRepository->getActiveAll($request->schoolId, $setting?->academic_year_id);
            $students = [];
            $student = null;
            $student = $this->studentRepository->getStudentByAdmissionNoAndStudentId($request->admissionNo, null, $request->schoolId, $setting?->academic_year_id);
            if ($student != null) {
                if ($student?->promotedClassroom != null) {
                    unset($student['classroom']);
                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }
                $student['title'] = "{$student?->classroomRoll?->roll_no} - {$student->first_name} {$student->middle_name} {$student->last_name}";
            }

            $classroomId = $request->classroomId ?? $student?->classroom_id;
            if (!empty($classroomId)) {
                $students = $this->studentRepository->getStudentsByClassroomId($classroomId,  $request->schoolId, $setting?->academic_year_id);
            }

            if (count($students) > 0) {
                $students->loadMissing([
                    'promotedClassroomRaw' => function ($query) use ($classroomId, $academicYearId) {
                        $query->where('classroom_id', $classroomId)
                            ->where('classroom_students.academic_year_id', $academicYearId);
                    }, 
                    'classroomRollRaw' => function ($query) use ($classroomId, $academicYearId) {
                        $query->where('classroom_id', $classroomId)
                            ->where('classroom_rolls.academic_year_id', $academicYearId);
                }]);

                $students = $students->map(function ($student) {
                    if ($student?->promotedClassroomRaw != null) {
                        unset($student['classroom']);
                        $student['classroom_id'] = $student?->promotedClassroomRaw?->id;
                        $student['classroom'] = $student?->promotedClassroomRaw;
                    }
                    $rollNo = $student?->classroomRollRaw?->roll_no ?? "";
                    $student['title'] = "{$rollNo} - {$student->first_name} {$student->middle_name} {$student->last_name}";
                    return $student;
                });
            }
            
            return response()->json([
                'success' => true,
                'data' => array(
                    'classrooms' => $classrooms,
                    'students' => $students,
                    'student' => $student,
                ),
            ], 200);
        } 
        else {
            return response()->json([
                'success' => true,
                'message' => 'students json data required',
                'data' => []
            ], 200);
        }
    }

}