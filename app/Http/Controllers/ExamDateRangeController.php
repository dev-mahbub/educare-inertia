<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Models\ClassName;
use Illuminate\Http\Request;
use App\Models\ExamDateRange;
use Illuminate\Support\Facades\DB;
use App\Repositories\ExamRepository;
use Illuminate\Support\Facades\Auth;
use App\Repositories\IExamRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\IClassroomRepository;
use App\Http\Requests\ExamDateRangeRequest;
use App\Models\ExamAttendance;
use App\Repositories\ExamDateRangeRepository;
use App\Repositories\IExamDateRangeRepository;
use Exception;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class ExamDateRangeController extends Controller
{

    public function __construct(
        private IExamDateRangeRepository $examDateRangeRepository,
        private IExamRepository $examRepository,
        private IClassroomRepository $classroomRepository,
    ) {
        $this->middleware('permission:view exam', ['only' => ['attendanceDateRanges']]);
        $this->middleware('permission:add exam', ['only' => ['attendanceDateRangesSave', 'create', 'save']]);
    }

    /**
     * attendance date ranges.
     */
    public function attendanceDateRanges(Request $request): Response
    {
        $exams = [];
        $classNames = $this->classroomRepository->getActiveClassNameAll();
        if ($request->isMethod('post')) {
            $classNameId = $request->select_class;
            if (!empty($classNameId)) {
                $classroomIds =  $this->classroomRepository->getClassroomIdsByClassNameId($classNameId);
                if (!empty($classroomIds)) {
                    $examIds = $this->examRepository->getExamIdsByClassroomIds($classroomIds);
                    $exams = $this->examRepository->getActiveExamsByExamIds($examIds);
                }
            }
        }

        return Inertia::render('ExamDateRange/AttendanceDateRanges', [
            'classNames'        => $classNames,
            'examAttendances'   => $exams,
        ]);
    }

    public function attendanceDateRangesSave(Request $request)
    {
        DB::beginTransaction();

        try {
            $exam_id = $request->input('exam_id');
            $start_date_at = $request->input('start_date_at') ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('start_date_at'))->timezone(getSchoolTimeZone())->toDateString() : null;
            $end_date_at = $request->input('end_date_at') ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->input('end_date_at'))->timezone(getSchoolTimeZone())->toDateString() : null;
            $dataArr =  [
                'start_date_at' => $start_date_at,
                'end_date_at' => $end_date_at,
            ];
            $this->examRepository->update($exam_id, $dataArr);
            DB::commit();
            return redirect()->back()->with('message', 'Update successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {
        $exams = $this->examRepository->getActiveAll();

        return Inertia::render('ExamDateRange/Create', [
            'exams' => $exams,
            'status' => session('status'),
        ]);
    }

    public function save(ExamDateRangeRequest $request): RedirectResponse
    {
        $input = $request->validated();

        try {
            $attributesToCheck = [
                'school_id' => getUserSchoolId(),
            ];

            $valuesToInsert = [
                'exam_id' => !empty($input['exam_id']) ? $input['exam_id'] : null,
                'present_day' => !empty($input['present_day']) ? Carbon::parse($input['present_day'])->format('Y-m-d') : null,
                'working_day' => !empty($input['working_day']) ? Carbon::parse($input['working_day'])->format('Y-m-d') : null,
                'status' => !empty($input['status']) ? $input['status'] : Status::ACTIVE,
            ];

            ExamAttendance::updateOrCreate($attributesToCheck, $valuesToInsert);

            DB::commit();

            return redirect()->back()->with('message', 'Attendance saved successfully!');
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;

            // Redirect with an error message
            return redirect()->back()->with('error', 'Something went wrong.');
        }
    }

}
