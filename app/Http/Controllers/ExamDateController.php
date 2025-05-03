<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Repositories\ExamRepository;
use Illuminate\Support\Facades\Auth;
use App\Repositories\IExamRepository;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\ExamDateRequest;
use App\Repositories\ExamDateRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\IExamDateRepository;
use App\Repositories\IClassroomRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Repositories\IClassroomSubjectRepository;

class ExamDateController extends Controller
{

    public function __construct(
        private IExamDateRepository $examDateRepository,
        private IExamRepository $examRepository,
        private IClassroomRepository $classroomRepository,
        private IClassroomSubjectRepository $classroomSubjectRepository,
    ) {
        $this->middleware('permission:view exam', ['only' => ['examDates']]);
        $this->middleware('permission:add exam', ['only' => ['create', 'save']]);
    }

    /**
     * exam dates.
     */
    public function examDates(Request $request): Response
    {
        $classroomExamDateData = [];
        $classroomExamDates = [];

        if ($request->isMethod('post')) {
            $exam_id = $request->input('exam_id');
            $class_name_id = $request->input('class_name_id');

            if (!empty($exam_id) && !empty($class_name_id)) {
                $classroomExamDates = $this->examDateRepository->getExamDateExamIdAndClassNameId($class_name_id, $exam_id);
            }
        }

        if (!empty($classroomExamDates)) {
            foreach ($classroomExamDates as $classroomExamDate) {
                if ($classroomExamDate?->is_marking) {
                    if (!isset($classroomExamDateData[$classroomExamDate?->subject_id])) {
                        $classroomExamDateData[$classroomExamDate?->subject_id] = $classroomExamDate->toArray();
                    }
                } else {
                    if (!isset($classroomExamDateData[$classroomExamDate?->subject_id . "_" . $classroomExamDate?->classroom_id])) {
                        $classroomExamDateData[$classroomExamDate?->subject_id . "_" . $classroomExamDate?->classroom_id] = $classroomExamDate->toArray();
                    }
                }
            }
        }

        $classNames = $this->classroomRepository->getClassNameWithExams();
        $classNamesData = [];

        foreach ($classNames as $className) {
            $classNamesData[$className->id] = [
                'id' => $className->id,
                'title' => $className->title,
                'classroom_ids' => $className->classrooms->pluck('id')->toArray(),
            ];

            $exam_ids = [];

            foreach ($className->classrooms as $classroom) {
                foreach ($classroom->exams as $exam) {
                    array_push($exam_ids, $exam->id);
                }
            }

            $classNamesData[$className->id]['exam_ids'] = $exam_ids;
        }

        $exams = $this->examRepository->getExamtitle();

        return Inertia::render('ExamDate/ExamDates', [
            'classNames' => $classNamesData,
            'exams' => $exams,
            'classroomExamDateData' => $classroomExamDateData,
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function create(Request $request): Response
    {
        $exams = $this->examRepository->getActiveAll();

        return Inertia::render('ExamDate/Create', [
            'exams' => $exams,
            'status' => session('status'),
        ]);
    }

    /**
     * save exam date.
     */
    public function save(ExamDateRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $classroomIds = $this->classroomRepository->getClassroomsFromClassId($input['class_name_id'])?->pluck('id')?->toArray();

            $attributesToCheck = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'class_name_id' => $input['class_name_id'],
                'exam_id' => $input['exam_id'],
            ];

            foreach ($input['classroom_exam_date_array'] as $examDate) {
                if ($examDate['is_marking'] == true) {
                    $classroomSubjects = [];

                    if (!empty($classroomIds)) {
                        $classroomSubjects = $this->classroomSubjectRepository->getMarkingClassroomSubjects($classroomIds, $examDate['subject_id']);
                    }

                    if (!empty($classroomSubjects)) {
                        foreach ($classroomSubjects as $classroomSubject) {
                            $attributesToCheck['classroom_subject_id'] = $classroomSubject->id;

                            $valuesToUpdate = [
                                'start_time_at' => !empty($examDate['start_time_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $examDate['start_time_at'])->timezone(getSchoolTimeZone())->format('H:i:s') : null,
                                'end_time_at' => !empty($examDate['end_time_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $examDate['end_time_at'])->timezone(getSchoolTimeZone())->format('H:i:s') : null,
                                'date_at' => !empty($examDate['date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $examDate['date_at'])->timezone(getSchoolTimeZone())->toDateString() : null,
                                'status' => Status::ACTIVE->value,
                            ];

                            $this->examDateRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
                        }
                    }
                } else if ($examDate['is_marking'] == false) {
                    $attributesToCheck['classroom_subject_id'] = $examDate['classroom_subject_id'];

                    $valuesToUpdate = [
                        'start_time_at' => !empty($examDate['start_time_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $examDate['start_time_at'])->timezone(getSchoolTimeZone())->format('H:i:s') : null,
                        'end_time_at' => !empty($examDate['end_time_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $examDate['end_time_at'])->timezone(getSchoolTimeZone())->format('H:i:s') : null,
                        'date_at' => !empty($examDate['date_at']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $examDate['date_at'])->timezone(getSchoolTimeZone())->toDateString() : null,
                        'status' => Status::ACTIVE->value,
                    ];

                    $this->examDateRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Marks saved successfully!');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }
 
}
