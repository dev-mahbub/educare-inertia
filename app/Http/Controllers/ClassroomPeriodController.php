<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Repositories\IStaffRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\ISchoolShiftRepository;
use App\Http\Requests\ClassroomPeriodRequest;
use App\Http\Requests\CopyClassroomPeriodRequest;
use App\Repositories\ISchoolPeriodRepository;
use App\Repositories\IClassroomPeriodRepository;
use Illuminate\Http\RedirectResponse;

class ClassroomPeriodController extends Controller
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
     * Create Class Period
     */
    public function create(Request $request): Response
    {
        $role = auth()->user()->role;
        $userId = auth()->user()->id;
        $teacher = $this->staffRepository->getTeacherByUserId($userId);
        $teacherId = $teacher?->id;

        // school shifts
        $schoolShifts = $this->schoolShiftRepository->getActiveAll();

        $classroomId = null;
        $schoolShiftId = null;
        $schoolPeriods = [];
        $classroomPeriods = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $schoolShiftId = $request->school_shift_id ?? null;

            if (!empty($classroomId) && !empty($schoolShiftId)) {
                // school periods
                $schoolPeriods = $this->schoolPeriodRepository->getSchoolPeriodsBySchoolShiftId($schoolShiftId);

                // class periods
                $classroomPeriods = $this->classroomPeriodRepository->getClassroomPeriodsByClassroomIdAndSchoolShiftId($classroomId, $schoolShiftId);

                if (count($classroomPeriods) > 0) {
                    $classroomPeriods = $classroomPeriods->map(function ($classroomPeriod) {
                        return [
                            'id' => $classroomPeriod->id,
                            'type' => $classroomPeriod->type,
                            'school_shift_id' => $classroomPeriod->school_shift_id,
                            'classroom_id' => $classroomPeriod->classroom_id,
                            'school_period_id' => $classroomPeriod->school_period_id,
                            'start_time' => $classroomPeriod?->schoolPeriod?->start_time_at,
                            'end_time' => $classroomPeriod?->schoolPeriod?->end_time_at,
                        ];
                    });
                }
            }
        }

        // classrooms
        $classrooms = [];

        if (in_array($role, [UserRole::ADMIN->value, UserRole::SUPER_ADMIN->value])) {
            $classrooms = $this->classroomRepository->getActiveAll();
        } else if ($role == UserRole::SITE_TEACHER->value && !empty($teacherId)) {
            $classrooms = $this->classroomRepository->getTeacherClassrooms($teacherId);
        }

        if (count($classrooms) > 0) {
            $classrooms->load(['classroomPeriods' => function ($query) use ($schoolShiftId) {
                $query->where('school_shift_id', $schoolShiftId);
            }]);

            $classrooms = $classrooms->map(function ($classroom) {
                $classroom['has_period'] = $classroom?->classroomPeriods?->count() > 0;

                return $classroom;
            });
        }

        return Inertia::render('ClassPeriod/Create', [
            'schoolShifts' => $schoolShifts,
            'schoolPeriods' => $schoolPeriods,
            'classrooms' => $classrooms,
            'classroomPeriods' => $classroomPeriods
        ]);
    }

    /**
     * Save Class Period
     *
     */
    public function save(ClassroomPeriodRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $attributesToCheck = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'classroom_id' => $input['classroom_id'] ?? null,
                'school_shift_id' => $input['school_shift_id'] ?? null,
                'type' => $input['type'] ?? '',
            ];

            $valuesToUpdate = [
                'status' => Status::ACTIVE
            ];

            foreach ($input['school_period_ids'] as $schoolPeriodId) {
                $attributesToCheck['school_period_id'] = $schoolPeriodId;

                $this->classroomPeriodRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
            }

            DB::commit();

            return redirect()->back()->with('message', 'Class period created successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }

    /**
     * Delete Classroom Period
     *
     */
    public function destroy(int $id): RedirectResponse
    {
        $classroomPeriod = $this->classroomPeriodRepository->getClassroomPeriodById($id);

        abort_if(empty($classroomPeriod), 404);

        if ($classroomPeriod?->classroomTimetables?->count() > 0) {
            return redirect()->back()->with('error', 'Class period could not deleted, Timetable exists for this period.');
        }

        $deleteClassroomPeriod = $this->classroomPeriodRepository->delete($id);

        if (!$deleteClassroomPeriod) {
            return redirect()->back()->with('error', 'Something goes wrong!');
        }

        return redirect()->back()->with('message', 'Class period deleted successfully!');
    }

    /**
     * Copy Classroom Period
     *
     */
    public function copyClassroomPeriod(CopyClassroomPeriodRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            // class periods
            $classroomPeriods = $this->classroomPeriodRepository->getClassroomPeriodsByClassroomIdAndSchoolShiftId($input['classroom_id'], $input['school_shift_id']);

            if (count($classroomPeriods) > 0) {
                foreach ($input['classroom_ids'] as $classroomId) {
                    if ($input['classroom_id'] != $classroomId) {
                        $attributesToCheck = [
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => getAcademicYearId(),
                            'classroom_id' => $classroomId,
                            'school_shift_id' => $input['school_shift_id'] ?? null,
                        ];

                        $valuesToUpdate = [
                            'status' => Status::ACTIVE
                        ];

                        foreach ($classroomPeriods as $classroomPeriod) {
                            $attributesToCheck['school_period_id'] = $classroomPeriod->school_period_id;
                            $attributesToCheck['type'] = $classroomPeriod->type;

                            $this->classroomPeriodRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
                        }
                    }
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Class period copied successfully!');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong!');
        }
    }

    /**
     * Copy And Reset Classroom Period
     *
     */
    public function copyAndResetClassroomPeriod(CopyClassroomPeriodRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $schoolShiftId = $input['school_shift_id'];
            $classroomIds = $input['classroom_ids'];

            // class periods
            $classroomPeriods = $this->classroomPeriodRepository->getClassroomPeriodsByClassroomIdAndSchoolShiftId($input['classroom_id'], $schoolShiftId);

            // target class periods
            $targetClassroomPeriods = $this->classroomPeriodRepository->getClassroomPeriodsByClassroomIds($classroomIds, $schoolShiftId);

            $targetClassroomPeriods?->each(function ($classroomPeriod) {
                if ($classroomPeriod?->classroomTimetables?->count() > 0) {
                    $classroomPeriod->classroomTimetables->each(function ($timetable) {
                        $timetable->delete();
                    });
                }

                $classroomPeriod->delete();
            });

            if (count($classroomPeriods) > 0) {
                foreach ($classroomIds as $classroomId) {
                    if ($input['classroom_id'] != $classroomId) {
                        $attributesToCheck = [
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => getAcademicYearId(),
                            'classroom_id' => $classroomId,
                            'school_shift_id' => $schoolShiftId,
                        ];

                        $valuesToUpdate = [
                            'status' => Status::ACTIVE
                        ];

                        foreach ($classroomPeriods as $classroomPeriod) {
                            $attributesToCheck['school_period_id'] = $classroomPeriod->school_period_id;
                            $attributesToCheck['type'] = $classroomPeriod->type;

                            $this->classroomPeriodRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
                        }
                    }
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Class period copied successfully!');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong!');
        }
    }
}
