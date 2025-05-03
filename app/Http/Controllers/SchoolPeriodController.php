<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IStaffRepository;
use App\Http\Requests\SchoolPeriodRequest;
use App\Repositories\IClassroomRepository;
use App\Repositories\ISchoolShiftRepository;
use App\Repositories\ISchoolPeriodRepository;
use App\Repositories\IClassroomPeriodRepository;

class SchoolPeriodController extends Controller
{

    public function __construct(
        private ISchoolPeriodRepository $schoolPeriodRepository,
        private IClassroomPeriodRepository $classroomPeriodRepository,
        private ISchoolShiftRepository $schoolShiftRepository,
        private IStaffRepository $staffRepository,
        private IClassroomRepository $classroomRepository
    ) {
        // do something
    }


    /**
     * Create School Period
     */
    public function create(Request $request): Response
    {
        // school shifts
        $schoolShifts = $this->schoolShiftRepository->getActiveAll();

        $schoolPeriods = [];

        if ($request->isMethod('POST')) {
            $schoolShiftId = $request->school_shift_id ?? null;

            if (!empty($schoolShiftId)) {
                // school periods
                $schoolPeriods = $this->schoolPeriodRepository->getSchoolPeriodsBySchoolShiftId($schoolShiftId);
            }
        }

        return Inertia::render('SchoolPeriod/Create', [
            'schoolShifts' => $schoolShifts,
            'schoolPeriods' => $schoolPeriods
        ]);
    }

    /**
     *   Save School Period
     */
    public function save(SchoolPeriodRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $dataArray = [
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'school_shift_id' => $input['school_shift_id'] ?? null,
            'start_time_at' => !empty($request->start_time) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->start_time)->timezone(getSchoolTimeZone())->format('H:i:s') : '',
            'end_time_at' => !empty($request->end_time) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->end_time)->timezone(getSchoolTimeZone())->format('H:i:s') : '',
            'type' => $input['type'] ?? '',
            'status' => Status::ACTIVE
        ];

        $schoolPeriod = $this->schoolPeriodRepository->create($dataArray);

        if (!$schoolPeriod) {
            return redirect()->back()->with('error', 'Something goes wrong!');
        }

        return redirect()->back()->with('message', 'School period created successfully!');
    }

    /**
     *   Update School Period
     */
    public function update(SchoolPeriodRequest $request, int $id): RedirectResponse
    {
        $schoolPeriod = $this->schoolPeriodRepository->getSchoolPeriodById($id);

        abort_if(empty($schoolPeriod), 404);

        $dataArray = [
            'start_time_at' => !empty($request->start_time) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->start_time)->timezone(getSchoolTimeZone())->format('H:i:s') : '',
            'end_time_at' => !empty($request->end_time) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $request->end_time)->timezone(getSchoolTimeZone())->format('H:i:s') : '',
        ];

        $updateSchoolPeriod = $this->schoolPeriodRepository->update($id, $dataArray);

        if (!$updateSchoolPeriod) {
            return redirect()->back()->with('error', 'Something goes wrong!');
        }

        return redirect()->back()->with('message', 'School period updated successfully!');
    }

    /**
     *   Delete School Period
     */
    public function destroy(int $id): RedirectResponse
    {
        $schoolPeriod = $this->schoolPeriodRepository->getSchoolPeriodById($id);

        abort_if(empty($schoolPeriod), 404);

        DB::beginTransaction();

        try {
            if ($schoolPeriod?->classroomPeriods?->count() > 0) {
                return redirect()->back()->with('error', 'Period already assigned to classes!');
            }

            $this->schoolPeriodRepository->delete($id);

            DB::commit();

            return redirect()->back()->with('message', 'School period deleted successfully!');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong!');
        }
    }

    /**
     * Display the user's profile form.
     */
    public function assignTeacherSubject(Request $request): Response
    {
        return Inertia::render('SchoolPeriod/AssignSubjectTeacher', [
            'status' => session('status'),
        ]);
    }
}
