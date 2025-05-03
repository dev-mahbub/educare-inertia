<?php

namespace App\Http\Controllers;

use Exception;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Repositories\ExamRepository;
use Illuminate\Support\Facades\Auth;
use App\Repositories\IExamRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ExamRoasterRequest;
use App\Repositories\IClassroomRepository;
use App\Repositories\ExamRoasterRepository;
use App\Repositories\IExamRoasterRepository;
use App\Http\Requests\ExamBulkRoasterRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Repositories\IClassroomSubjectRepository;

class ExamRoasterController extends Controller
{

    public function __construct(
        private IExamRoasterRepository $examRoasterRepository,
        private IExamRepository $examRepository,
        private IClassroomRepository $classroomRepository,
        private IClassroomSubjectRepository $classroomSubjectRepository,
    ) {
        $this->middleware('permission:view exam', ['only' => ['roasters']]);
        $this->middleware('permission:add exam', ['only' => ['setBulkExamRoaster', 'save', 'setBulkExamRoasterSaveData']]);
    }

    /**
     * roasters.
     */
    public function roasters(Request $request): Response
    {
        $classroomExamRoasterData = [];
        $classroomExamRoasters = [];

        if ($request->isMethod('post')) {
            if (!empty($request->classroom_ids) && !empty($request->exam_id)) {
                $classroomExamRoasters = $this->examRoasterRepository->getExamIDAndClassroomIds($request->exam_id, $request->classroom_ids);
            }
        }

        if (!empty($classroomExamRoasters)) {
            foreach ($classroomExamRoasters as $classroomExamRoaster) {
                if ($classroomExamRoaster?->is_marking) {
                    if (!isset($classroomExamRoasterData[$classroomExamRoaster?->subject_id])) {
                        $classroomExamRoasterData[$classroomExamRoaster?->subject_id] = $classroomExamRoaster->toArray();
                    }
                } else {
                    if (!isset($classroomExamRoasterData[$classroomExamRoaster?->subject_id . "_" . $classroomExamRoaster?->classroom_id])) {
                        $classroomExamRoasterData[$classroomExamRoaster?->subject_id . "_" . $classroomExamRoaster?->classroom_id] = $classroomExamRoaster->toArray();
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

        return Inertia::render('ExamRoaster/Roasters', [
            'exams'         => $exams,
            'classNames'    => $classNamesData,
            'classroomExamRoasterData' => $classroomExamRoasterData,
        ]);
    }

    /**
     * set bulk exam roaster.
     */
    public function setBulkExamRoaster(Request $request): Response
    {
        $examRoasters = [];
        $examRoasterData = [];
        $classnamesData = [];

        if ($request->isMethod('post')) {
            $examId = $request->input('exam_id');
            $class_name_ids = $request->input('class_name_ids');

            if (!empty($examId)) {
                $examClassroomIds = $this->examRepository->getClassroomIdsByExamId($examId);

                if (!empty($examClassroomIds)) {
                    $classnamesData = $this->classroomRepository->getClassNamesByClassroomIdsTwo($examClassroomIds);
                }
            }

            if (!empty($class_name_ids) && !empty($examId)) {
                $classroomIds = $this->classroomRepository->getClassRoomIdByClassNameIds($class_name_ids);

                if (!empty($classroomIds)) {
                    $examRoasters = $this->examRoasterRepository->getClassroomExamRoasterData($classroomIds, $examId);
                }
            }
        }

        if (!empty($examRoasters)) {
            $roasterClassroomIds = [];

            foreach ($examRoasters as $examRoaster) {
                if (!isset($examRoasterData[$examRoaster?->subject_id . "_" . $examRoaster?->full_mark . "_" . $examRoaster?->pass_mark . "_" . $examRoaster?->converted_mark])) {
                    $examRoasterData[$examRoaster?->subject_id . "_" . $examRoaster?->full_mark . "_" . $examRoaster?->pass_mark . "_" . $examRoaster?->converted_mark] = $examRoaster->toArray();
                }

                $roasterClassroomIds[$examRoaster?->subject_id . "_" . $examRoaster?->full_mark . "_" . $examRoaster?->pass_mark . "_" . $examRoaster?->converted_mark][] = $examRoaster?->classroom_id;
            }

            if (!empty($examRoasterData)) {
                foreach ($examRoasterData as $key => $examRoaster) {
                    $examRoasterData[$key]['classroom_ids'] = $roasterClassroomIds[$key] ?? [];
                }
            }
        }

        $exams = $this->examRepository->getActiveExam();

        return Inertia::render('ExamRoaster/SetBulkExamRoaster', [
            'exams'             => $exams,
            'classnames'        => $classnamesData,
            'examRoasterData'    => $examRoasterData
        ]);
    }

    /**
     * save exam roaster
     */
    public function save(ExamRoasterRequest $request): RedirectResponse
    {
        DB::beginTransaction();

        try {
            $input = $request->validated();

            $classroomIds = $this->classroomRepository->getClassroomsFromClassId($input['class_name_id'])?->pluck('id')?->toArray();

            $attributesToCheck = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'exam_id' => $input['exam_id'],
            ];

            foreach ($input['classroom_exam_date_array'] as $examMark) {
                if ($examMark['is_marking'] == true) {
                    $classroomSubjects = [];

                    if (!empty($classroomIds)) {
                        $classroomSubjects = $this->classroomSubjectRepository->getMarkingClassroomSubjects($classroomIds, $examMark['subject_id']);
                    }

                    if (!empty($classroomSubjects)) {
                        foreach ($classroomSubjects as $classroomSubject) {
                            $attributesToCheck['classroom_subject_id'] = $classroomSubject->id;

                            $valuesToUpdate = [
                                'full_mark' => !empty($examMark['full_mark']) ? $examMark['full_mark'] : null,
                                'pass_mark' => !empty($examMark['pass_mark']) ? $examMark['pass_mark'] : null,
                                'converted_mark' => !empty($examMark['converted_mark']) ? $examMark['converted_mark'] : null,
                                'status' => Status::ACTIVE->value,
                            ];

                            $this->examRoasterRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
                        }
                    }
                } else if ($examMark['is_marking'] == false) {
                    $attributesToCheck['classroom_subject_id'] = $examMark['classroom_subject_id'];

                    $valuesToUpdate = [
                        'full_mark' => !empty($examMark['full_mark']) ? $examMark['full_mark'] : null,
                        'pass_mark' => !empty($examMark['pass_mark']) ? $examMark['pass_mark'] : null,
                        'converted_mark' => !empty($examMark['converted_mark']) ? $examMark['converted_mark'] : null,
                        'status' => Status::ACTIVE->value,
                    ];

                    $this->examRoasterRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Marks saved successfully!');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }


    /**
     * set bulk exam roaster save data.ExamRoasterRequest
     */
    public function setBulkExamRoasterSaveData(ExamBulkRoasterRequest $request): RedirectResponse
    {
        DB::beginTransaction();

        try {
            $input = $request->validated();

            $attributesToCheck = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'exam_id' => $input['exam_id'],
            ];

            foreach ($input['classroom_exam_date_array'] as $examDate) {
                $classroomIds = !empty($examDate['classroom_ids']) ? array_unique($examDate['classroom_ids']) : [];

                $classroomSubjects = [];

                if (!empty($classroomIds)) {
                    $classroomSubjects = $this->classroomSubjectRepository->getMarkingClassroomSubjects($classroomIds, $examDate['subject_id']);
                }

                if (!empty($classroomSubjects)) {
                    foreach ($classroomSubjects as $classroomSubject) {
                        $attributesToCheck['classroom_subject_id'] = $classroomSubject->id;

                        $valuesToUpdate = [
                            'full_mark' => !empty($examDate['full_mark']) ? $examDate['full_mark'] : null,
                            'pass_mark' => !empty($examDate['pass_mark']) ? $examDate['pass_mark'] : null,
                            'converted_mark' => !empty($examDate['converted_mark']) ? $examDate['converted_mark'] : null,
                            'status' => Status::ACTIVE->value,
                        ];

                        $this->examRoasterRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
                    }
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Save successfully!');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

}
