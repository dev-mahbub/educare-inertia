<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Http\Requests\ExamAttendanceRequest;
use App\Repositories\ExamRepository;
use App\Repositories\IExamRepository;
use App\Repositories\ExamAttendanceRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IExamAttendanceRepository;
use App\Repositories\StudentRepository;
use App\Repositories\IStudentRepository;
use Exception;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ExamAttendanceController extends Controller
{

    public function __construct(
        private IExamAttendanceRepository $examAttendanceRepository,
        private IStudentRepository $studentRepository,
        private IExamRepository $examRepository,
        private IClassroomRepository $classroomRepository,
    ) {
        $this->middleware('permission:view attendance student', ['only' => ['examAttendances']]);
        $this->middleware('permission:add attendance student', ['only' => ['examAttendanceSave']]);
    }

    /**
     * exam attendances.
     */
    public function examAttendances(Request $request): Response
    {
        $students = [];

        if ($request->isMethod('POST')) {
            $exam_id = $request->input('exam_id');
            $classroom_id = $request->input('classroom_id');
            $students = $this->studentRepository->getStudentForExamAttendance($exam_id, $classroom_id);
        }

        $classrooms = $this->classroomRepository->getActiveAll();
        $exams = $this->examRepository->getExamtitle();

        return Inertia::render('ExamAttendance/ExamAttendances', [
            'students' => $students,
            'classrooms' => $classrooms,
            'exams' => $exams,
        ]);
    }

    /**
     * save
     */
    public function examAttendanceSave(ExamAttendanceRequest $request): RedirectResponse
    {
        try {
            DB::beginTransaction();
            $input = $request->validated();

            $classNameId = $this->classroomRepository->getClassNameIdFromClassId($input['classroom_id']);

            $attributesToCheck = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'classroom_id' => $input['classroom_id'],
                'exam_id' => $input['exam_id'],
            ];

            foreach ($input['examAttendance_array'] as $examAttendance) {
                $attributesToCheck['student_id'] = $examAttendance['student_id'];

                $valuesToUpdate = [
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'classroom_id' => $input['classroom_id'],
                    'exam_id' => $input['exam_id'],
                    'class_name_id' => $classNameId,
                    'present_day' => !empty($examAttendance['present_day']) ? $examAttendance['present_day'] : null,
                    'working_day' => !empty($examAttendance['working_day']) ? $examAttendance['working_day'] : null,
                    'status' => Status::ACTIVE->value,
                ];

                $this->examAttendanceRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
            }
            DB::commit();
            return redirect()->back()->with('message', 'Marks saved successfully!');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }
}
