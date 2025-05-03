<?php

namespace App\Http\Controllers;

use Exception;
use Carbon\Carbon;
use App\Models\Exam;
use App\Models\Mark;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Models\Classroom;
use Illuminate\Http\Request;
use App\Enums\FreezeMarkStatus;
use App\Enums\AbsenceReasonEnum;
use App\Services\StudentService;
use App\Http\Requests\MarkStatus;
use App\Http\Requests\ExamRequest;
use App\Models\Mark as ModelsMark;
use Illuminate\Support\Facades\DB;
use App\Repositories\ExamRepository;
use Illuminate\Support\Facades\Auth;
use App\Repositories\IExamRepository;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\ExamMarkRequest;
use App\Http\Requests\ExamStatusRequest;
use App\Repositories\IStudentRepository;
use App\Repositories\ISubjectRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ClassroomRepository;
use App\Repositories\IAcademicRepository;
use App\Repositories\IExamMarkRepository;
use App\Repositories\IAdmissionRepository;
use App\Repositories\IClassroomRepository;
use App\Http\Requests\AcademicRemarkRequest;
use App\Repositories\IExamRoasterRepository;
use App\Repositories\ISiteSettingRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Repositories\IClassroomSubjectRepository;

class ExamController extends Controller
{

    public function __construct(
        private IExamRepository $examRepository,
        // private IExamMarkRepository $examMarkRepository,
        private IClassroomRepository $classroomRepository,
        private ISubjectRepository $subjectRepository,
        private IStudentRepository $studentRepository,
        private IAdmissionRepository $admissionRepository,
        private ISiteSettingRepository $siteSettingRepository,
        private IClassroomSubjectRepository $classroomSubjectRepository,
        private IExamRoasterRepository $examRoasterRepository,
        private IAcademicRepository $academicRepository,
        private StudentService  $studentService

    ) {
        $this->middleware('permission:view exam', ['only' => ['sendExamMarks', 'scheduleList']]);
        $this->middleware('permission:add exam', ['only' => [
            'enterMarks',
            'saveMarks',
            'uploadSubjectMarks',
            'examRemarks',
            'examRemarksSave',
            'freezeMarks',
            'addExam',
            'saveExam',
            'addExamRemarks',
            'saveExamRemarks',
            'termExam',
            'termExamSave'
        ]]);
        $this->middleware('permission:edit exam', ['only' => [
            'updateMarksStatus',
            'editExam',
            'updateExam',
            'updateExamStatus',
            'editRemark',
            'updateRemark',
            'termExamEdit',
            'termExamUpdate'
        ]]);
        $this->middleware('permission:delete exam', ['only' => ['deleteExam', 'destroyRemark', 'termExamDelete']]);
    }

    /**
     * send exam marks.
     */
    public function sendExamMarks(Request $request): Response
    {
        $studentMark = [];
        $studentSubject = [];
        $totalCount = 0;

        if ($request->isMethod('post')) {
            $classroom_id = $request->input('classroom_id');
            $exam_id = $request->input('exam_id');
            $studentMark =  $this->classroomRepository->getStudentForSendMark($classroom_id, $exam_id);
            $studentSubject =  $this->classroomRepository->getSubjectsCountStudents($classroom_id, $exam_id);

            if (count($studentMark) > 0) {
                $studentMark = $studentMark->map(function ($mark) {
                    $examRoaster = $mark?->classroomSubject?->examRoasters?->first();
                    $mark['full_mark'] = $examRoaster?->full_mark ?? 0;

                    return $mark;
                })->sortBy(function ($mark) {
                    return $mark?->student?->classroomRoll?->roll_no;
                });

                $studentMark = array_values($studentMark->toArray());
            }

            if (!empty($studentSubject)) {
                foreach ($studentSubject as $subStd) {
                    $totalCount = $totalCount + $subStd?->studentCount;
                }
            }
        }

        $classrooms = $this->classroomRepository->getActiveAll();
        $exams = $this->examRepository->getExamtitle();

        return Inertia::render('Exam/SendExamMarks', [
            'exams' => $exams,
            'classrooms' => $classrooms,
            'studentMark' => $studentMark,
            'studentSubject' => $studentSubject,
            'totalCount' => $totalCount,
        ]);
    }

    /**
     * enter marks.
     */
    public function enterMarks(Request $request): Response
    {
        $classWiseData = [];
        $fullMinMark = [];
        $apsenceReson = [];
        $grade = [];
        $is_co_scholastic = false;
        $isMarkFreezed = false;

        if ($request->isMethod('post')) {
            $classroom_id = $request->input('classroom_id') ?? null;
            $subject_id = $request->input('subject_id') ?? null;
            $exam_id = $request->input('exam_id') ?? null;

            $classWiseData = $this->studentRepository->getClassWiseStudent($classroom_id, $subject_id, $exam_id);

            if (count($classWiseData) > 0) {
                $classWiseData->each(function ($markData) use (&$isMarkFreezed) {
                    if ($markData?->mark?->status == FreezeMarkStatus::FREEZE->value) {
                        $isMarkFreezed = true;
                        return;
                    }
                });
            }

            $fullMinMark = $this->examRoasterRepository->getFullMinMarkBySubjectId($subject_id, $classroom_id, $exam_id);

            $subject = null;

            if (!empty($subject_id)) {
                $subject = $this->subjectRepository->getSubjectById($subject_id);
            }

            if ($fullMinMark?->classroom_subject?->subject?->is_co_scholastic === 'Yes' || $subject?->is_co_scholastic === 'Yes') {
                $is_co_scholastic = true;
                $grade = $this->academicRepository->getGradeOne($subject_id, $classroom_id);
            }
        }

        foreach (AbsenceReasonEnum::cases() as $asbsence) {
            array_push($apsenceReson, ['id' => $asbsence->value, 'title' => $asbsence->value]);
        }

        $classrooms = $this->classroomRepository->getActiveAll();
        $subjects   = $this->classroomSubjectRepository->getClassroomSubjectIdTitle()->map(function ($subject) {
            return [
                'id' => $subject->subject_id,
                'title' => $subject->title,
                'classroom_id' => $subject->classroom_id
            ];
        });

        $exams = $this->examRepository->getExamtitle()?->filter(function ($exam) {
            return $exam?->is_registration != true;
        })->values();

        return Inertia::render('Exam/EnterMarks', [
            'classrooms' => $classrooms,
            'subjects' => $subjects,
            'exams' => $exams,
            'classWiseData' => $classWiseData,
            'apsenceReson' => $apsenceReson,
            'fullMinMark' => $fullMinMark,
            'grade' => $grade,
            'is_co_scholastic' => $is_co_scholastic,
            'isMarkFreezed' => $isMarkFreezed
        ]);
    }


    //saveMarks
    public function saveMarks(ExamMarkRequest $request)
    {
        $input = $request->validated();
        DB::beginTransaction();
        try {
            $hasFreezedMark = $this->studentRepository->hasFreezedMark($input['classroom_id'], $input['subject_id'], $input['exam_id']);

            if ($hasFreezedMark) {
                return redirect()->back()->with('error', 'Mark is freezed. Cannot be updated.');
            }

            $attributesToCheck = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'classroom_id' => $input['classroom_id'],
                'subject_id' => $input['subject_id'],
                'exam_id' => $input['exam_id'],
            ];

            foreach ($input['student_mark_array'] as $studentMark) {
                $mark = null;

                if (isset($studentMark['mark'])) {
                    $markArr = explode('.', $studentMark['mark']);

                    if (!empty($markArr[1])) {
                        $mark = $studentMark['mark'];
                    } else {
                        $mark = $markArr[0];
                    }
                }

                $attributesToCheck['student_id'] = $studentMark['student_id'];
                $valuesToUpdate = [
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'classroom_id' => $input['classroom_id'],
                    'subject_id' => $input['subject_id'],
                    'exam_id' => $input['exam_id'],
                    'student_id' => $studentMark['student_id'],
                    'academic_grade_item_id' => isset($studentMark['academic_grade_item_id']) ? $studentMark['academic_grade_item_id'] : null,
                    // 'mark' => isset($studentMark['mark']) ? $studentMark['mark'] : null,
                    'mark' => $mark,
                    'is_present' => $studentMark['is_present'],
                    'absence_reason' => isset($studentMark['absence_reason']) ? $studentMark['absence_reason'] : null,
                    'status' => Status::ACTIVE->value,
                ];
                $this->examRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);
            }

            DB::commit();
            return redirect()->back()->with('message', 'Marks saved successfully!');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }


    /**
     * uploadSubjectMarks.
     */
    public function uploadSubjectMarks(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();
        $subjects   = $this->classroomSubjectRepository->getClassroomSubjectIdTitle()->map(function ($subject) {
            return [
                'id' => $subject->subject_id,
                'title' => $subject->title,
                'classroom_id' => $subject->classroom_id
            ];
        });
        $exams = $this->examRepository->getExamtitle();
        return Inertia::render('Exam/UploadSubjectMarks', [
            'exams' => $exams,
            'classrooms' => $classrooms,
            'subjects' => $subjects,
        ]);
    }

    /**
     * exam remarks.
     */
    public function examRemarks(Request $request): Response
    {
        $remarkForStudent = [];

        if ($request->isMethod('post')) {
            $remarkForStudent = $this->studentRepository->remarkStudentList($request->exam_id, $request->class_name_id, $request->classroom_id);
        }

        $exams = $this->examRepository->getExamtitle();
        $classrooms = $this->classroomRepository->getActiveAll();
        $classrooms->loadMissing(['exams']);

        $classroomsData = [];

        foreach ($classrooms as $classroom) {
            $exam_ids = [];

            foreach ($classroom->exams as $exam) {
                array_push($exam_ids, $exam->id);
            }

            $classroomsData[$classroom->id] = [
                'id' => $classroom->id,
                'title' => $classroom->title,
                'class_name_id' => $classroom->class_name_id,
                'exam_ids' => $exam_ids,
            ];
        }

        return Inertia::render('Exam/ExamRemarks', [
            'exams' => $exams,
            'classrooms' => $classroomsData,
            'remarkForStudent' => $remarkForStudent,
        ]);
    }


    //examRemarks Save
    public function examRemarksSave(AcademicRemarkRequest $request)
    {
        try {
            $input = $request->validated();
            $attributesToCheck = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'exam_id' => $input['exam_id'],
                'class_name_id' => $input['class_name_id'],
            ];
            foreach ($input['remarks_array_data'] as $remarkData) {
                $attributesToCheck['student_id'] = $remarkData['student_id'];
                $attributesValueUpdate = [
                    // 'school_id' => getUserSchoolId(),
                    // 'academic_year_id' => getAcademicYearId(),
                    // 'exam_id' => $input['exam_id'],
                    // 'class_name_id' => $input['class_name_id'],
                    'remarks' => !empty($remarkData['remarks']) ? $remarkData['remarks'] : '',
                    'status' => Status::ACTIVE->value,
                ];
                $this->examRepository->RemarksUpdateOrcreate($attributesToCheck, $attributesValueUpdate);
            }
            DB::commit();
            return redirect()->route('exam.remarks')->with('message', 'Remarks saved successfully!');
        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->route('exam.remarks')->with('error', 'Something goes wrong.');
        }
    }

    /**
     * Freeze Marks
     */
    public function freezeMarks(Request $request): Response
    {
        $classNames = [];
        $classrooms = [];
        $subjects = [];
        $freezeMarksSubjectWiese = [];

        if ($request->isMethod('POST')) {
            $examId = $request->exam_id ?? null;
            $classNameId = $request->class_name_id ?? null;
            $classroomId = $request->classroom_id ?? null;
            $subjectId = $request->subject_id ?? null;
            $type = $request?->type ?? '';

            if (!empty($examId) && ($type == 'class_wise' || $type == 'subject_wise')) {
                $classNames = $this->classroomRepository->getClassNamesByExamId($examId);

                if (count($classNames) > 0) {
                    $classNames->loadMissing(['classrooms:id,class_name_id']);

                    $classNames = $classNames->map(function ($className) use ($examId) {
                        $freezedMarkExists = false;

                        if ($className?->classrooms?->count() > 0) {
                            $classroomIds = $className?->classrooms?->pluck('id')?->toArray();
                            $freezedMarkExists = $this->admissionRepository->checkFreezedMarkExists($examId, $classroomIds);
                        }

                        $className['is_mark_freezed'] = $freezedMarkExists;

                        return $className;
                    });
                }
            }

            if (!empty($examId) && $type == 'section_wise') {
                $classrooms = $this->classroomRepository->getClassroomsByExamId($examId);

                if (count($classrooms) > 0) {
                    $classrooms = $classrooms->map(function ($classroom) use ($examId) {
                        $freezedMarkExists = $this->admissionRepository->checkFreezedMarkExists($examId, $classroom->id);

                        $classroom['is_mark_freezed'] = $freezedMarkExists;

                        return $classroom;
                    });
                }
            }

            if ($type == 'subject_wise') {
                if (!empty($classNameId)) {
                    $classrooms = $this->classroomRepository->getClassroomsByClassNameId($classNameId);
                }

                if (!empty($classroomId)) {
                    $subjects = $this->subjectRepository->getSubjectsByClassroomId($classroomId);
                }

                if (!empty($examId) && !empty($classroomId)) {
                    $marks = $this->admissionRepository->getMarksForFreezeMark($examId, $classroomId, $subjectId);

                    if (count($marks) > 0) {
                        foreach ($marks as $mark) {
                            $key = $mark?->exam_id . "-" . $mark?->classroom_id . "-" . $mark?->subject_id;

                            if (!isset($freezeMarksSubjectWiese[$key])) {
                                $freezeMarksSubjectWiese[$key] = [
                                    'exam_id' => $mark?->exam_id,
                                    'classroom_id' => $mark?->classroom_id,
                                    'subject_id' => $mark?->subject_id,
                                    'exam_title' => $mark?->exam_title,
                                    'classroom_title' => $mark?->classroom_title,
                                    'subject_title' => $mark?->subject_title,
                                    'is_mark_freezed' => $mark->status == FreezeMarkStatus::FREEZE->value
                                ];
                            }
                        }
                    }
                }
            }
        }

        $exams = $this->examRepository->getActiveAll();

        return Inertia::render('Exam/FreezeMarks', [
            'exams' => $exams,
            'classNames' => $classNames,
            'classrooms' => $classrooms,
            'subjects' => $subjects,
            'freezeMarksSubjectWiese' => !empty($freezeMarksSubjectWiese) ? array_values($freezeMarksSubjectWiese) : []
        ]);
    }


    /**
     * Update Freeze Marks
     */
    public function updateMarksStatus(MarkStatus $request)
    {
        $input = $request->validated();

        $classroomIds = [];

        if ($input['type'] == 'class_wise') {
            $classrooms = $this->classroomRepository->getClassroomsByClassNameIds($input['class_name_ids']);
            $classroomIds = $classrooms?->pluck('id')?->toArray();
        } else if ($input['type'] == 'section_wise') {
            $classroomIds = $input['classroom_ids'];
        } else if ($input['type'] == 'subject_wise') {
            $classroomIds = [$input['classroom_id']];
        }

        $newStatus = FreezeMarkStatus::ACTIVE;

        if ($input['status_type'] === FreezeMarkStatus::FREEZE->value) {
            $newStatus = FreezeMarkStatus::FREEZE;
        } elseif ($input['status_type'] === FreezeMarkStatus::UNFREEZE->value) {
            $newStatus = FreezeMarkStatus::ACTIVE;
        }

        if (!empty($classroomIds)) {
            $updateStatus = $this->admissionRepository->updateMarkStatus($input['exam_id'], $classroomIds, $newStatus, $input['subject_id']);

            if ($updateStatus) {
                return redirect()->back()->with('message', 'Status updated successfully.');
            }
        }

        return redirect()->back()->with('error', 'Something goes wrong.');
    }

    /**
     * Display the Exams.
     */
    public function addExam(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();
        $exams = $this->examRepository->getActiveAll();
        $exams->load('classrooms');

        return Inertia::render('Exam/AddExam', [
            'exams' => $exams,
            'classrooms' => $classrooms,
        ]);
    }

    public function saveExam(ExamRequest $request): RedirectResponse
    {
        $input = $request->validated();
        DB::beginTransaction();
        try {
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'title' => $input['title'],
                'start_date_at' => !empty($input['start_date_at']) ? Carbon::parse($input['start_date_at'])->format('Y-m-d') : null,
                'end_date_at' => !empty($input['end_date_at']) ? Carbon::parse($input['end_date_at'])->format('Y-m-d') : null,
                'display_order' => $input['display_order'],
                'is_display_on_calender' => $input['is_display_on_calender'],
                'is_registration' => $input['is_registration'],
                'status' => Status::ACTIVE,
            );

            $exam = $this->examRepository->create($dataArray);
            if ($input['classroom_ids'] != null) {
                $exam->classrooms()->attach($input['classroom_ids']);
            }
            DB::commit();
            return redirect()->back()->with('message', 'Exam created successfully.');
        } catch (\Throwable $th) {
            DB::rollback();
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }


    public function editExam(Exam $exam): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();
        $exams = $this->examRepository->getActiveAll();
        $exams->load('classrooms');
        $exam->load('classrooms');
        return Inertia::render('Exam/EditExam', [
            'exam' => $exam,
            'exams' => $exams,
            'classrooms' => $classrooms,
        ]);
    }

    public function updateExam(ExamRequest $request, Exam $exam): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = array(
                'title' => $input['title'],
                'start_date_at' => !empty($input['start_date_at']) ? Carbon::parse($input['start_date_at'])->format('Y-m-d') : null,
                'end_date_at' => !empty($input['end_date_at']) ? Carbon::parse($input['end_date_at'])->format('Y-m-d') : null,
                'display_order' => $input['display_order'],
                'is_display_on_calender' => $input['is_display_on_calender'],
                'is_registration' => $input['is_registration'],
                'status' => Status::ACTIVE,
            );

            $exam->update($dataArray);

            $exam->classrooms()->sync($input['classroom_ids']);

            DB::commit();

            return redirect()->route('exam.add')->with('message', 'Exam updated successfully.');
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    public function updateExamStatus(ExamStatusRequest $request, Exam $exam): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            foreach ($input['classroom_array'] as $data) {
                $classroom = Classroom::findOrFail($data['classroom_id']);
                $exam->classrooms()->updateExistingPivot($classroom->id, ['exam_status' => $data['exam_status']]);
            }

            DB::commit();

            return redirect()->route('exam.add')->with('message', 'Exam status updated successfully.');
        } catch (\Throwable $th) {
            DB::rollback();

            throw $th;

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    public function deleteExam(int $id): RedirectResponse
    {
        DB::beginTransaction();

        try {
            $exam = $this->examRepository->getById($id);

            $exam->classrooms()->detach();

            $exam->delete();

            DB::commit();

            return redirect()->route('exam.add')->with('message', 'Exam deleted successfully.');
        } catch (\Throwable $th) {
            DB::rollback();

            return redirect()->route('exam.add')->with('error', 'Something goes wrong.');
        }
    }


    /**
     * Display the Academic Exam Remarks.
     */
    public function addExamRemarks(Request $request): Response
    {
        $remarks = $this->examRepository->getActiveRemarks();

        return Inertia::render('Exam/AddExamRemarks', [
            'remarks' => $remarks,
        ]);
    }

    public function saveExamRemarks(Request $request)
    {
        $input = $request->validate([
            'remarks' => ['required', 'string']
        ]);

        // $input = $request->all();

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'remarks' => $input['remarks'],
            'status' => Status::ACTIVE,
        );
        $remarks = $this->examRepository->createRemark($dataArray);
        if (!$remarks) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
        return redirect()->back()->with('message', 'Save successfully.');
    }

    public function editRemark(int $id): Response
    {
        $remarks = $this->examRepository->getActiveRemarks();
        $remark = $this->examRepository->getRemarkById($id);

        abort_if(!empty($remark->student_id) && !empty($remark->exam_id) && !empty($remark->class_name_id), 404);

        return Inertia::render('Exam/EditExamRemarks', [
            'remark' => $remark,
            'remarks' => $remarks,
        ]);
    }

    public function updateRemark(Request $request, int $id): RedirectResponse
    {
        $input = $request->all();
        $dataArray = array(
            'remarks' => $input['remarks'],
            'status' => Status::ACTIVE,
        );

        $remarks = $this->examRepository->updateRemark($id, $dataArray);
        if (!$remarks) {
            return redirect()->route('exam.add_remark')->with('error', 'Something goes wrong.');
        }
        return redirect()->route('exam.add_remark')->with('message', 'Updated successfully.');
    }

    public function destroyRemark(int $id): RedirectResponse
    {
        $remark = $this->examRepository->getRemarkById($id);

        abort_if(!empty($remark->student_id) && !empty($remark->exam_id) && !empty($remark->class_name_id), 404);

        if (!$remark) {
            return redirect()->route('exam.add_remark')->with('error', 'Remark not found.');
        }
        $this->examRepository->deleteRemark($id);
        return redirect()->back()->with('message', 'Remark deleted successfully.');
    }

    /**
     * Display the Term wise exam.
     */
    public function termExam(Request $request): Response
    {

        $termWise = $this->siteSettingRepository->getSiteSettingByTypeAndKeyAndValue('Team Wise Report Card', 'is_teamWise', 'yes');

        $termExams = $this->examRepository->getActiveAllTerm();
        return Inertia::render('Exam/TermExam', [
            'termExams' => $termExams,
            'termWise' => $termWise,
        ]);
    }

    public function termExamSave(Request $request)
    {
        $termWise = $this->siteSettingRepository->getSiteSettingByTypeAndKeyAndValue('Team Wise Report Card', 'is_teamWise', 'yes');
        if (!empty($termWise)) {
            $input = $request->validate(
                [
                    'school_id' => ['nullable', 'integer'],
                    'academic_year_id' => ['nullable', 'integer'],
                    'term_name' => ['required', 'string', 'max:255'],
                    'status' => ['nullable', 'string'],
                ]
            );
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'term_name' => $input['term_name'],
                'status' => Status::ACTIVE,
            );
            $termExam = $this->examRepository->createTerm($dataArray);
            if (!$termExam) {
                return redirect()->back()->with('error', 'Something goes wrong.');
            }
            return redirect()->back()->with('message', 'Save successfully.');
        } else {
            return redirect()->back()->with('error', 'You need to check Academic Setting to add Term Wise Exam.');
        }
    }


    public function termExamEdit(int $id): Response
    {
        $termExams = $this->examRepository->getActiveAllTerm();
        $termExam = $this->examRepository->getTermById($id);
        return Inertia::render('Exam/EditTermExam', [
            'termExam' => $termExam,
            'termExams' => $termExams,
        ]);
    }

    public function termExamUpdate(Request $request, int $id): RedirectResponse
    {
        $termWise = $this->siteSettingRepository->getSiteSettingByTypeAndKeyAndValue('Team Wise Report Card', 'is_teamWise', 'yes');
        if (!empty($termWise)) {
            $input = $request->validate(
                [
                    'school_id' => ['nullable', 'integer'],
                    'academic_year_id' => ['nullable', 'integer'],
                    'term_name' => ['required', 'string', 'max:255'],
                    'status' => ['nullable', 'string'],
                ]
            );

            $dataArray = array(
                'term_name' => $input['term_name'],
                'status' => Status::ACTIVE,
            );

            $termExam = $this->examRepository->updateTerm($id, $dataArray);
            if (!$termExam) {
                return redirect()->route('exam.term_wise')->with('error', 'Something goes wrong.');
            }
            return redirect()->route('exam.term_wise')->with('message', 'Term Name updated successfully.');
        } else {
            return redirect()->back()->with('error', 'You need to check Academic Setting to add Term Wise Exam.');
        }
    }

    public function termExamDelete(int $id): RedirectResponse
    {
        $term = $this->examRepository->getTermById($id);
        if (!$term) {
            return redirect()->route('exam.term_wise')->with('error', 'Remark not found.');
        }
        $this->examRepository->deleteTerm($id);
        return redirect()->route('exam.term_wise')->with('message', 'Term Name deleted successfully.');
    }

    /**
     * Display the schools.
     */
    public function scheduleList(Request $request): Response
    {
        $exams = $this->examRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('Exam/ScheduleList', [
            'exams' => $exams,
            'classrooms' => $classrooms,
        ]);
    }

    /**
     * student exam schedule
     */
    public function StudentscheduleList(Request $request): Response
    {
        $userRoles = getUserRoleArray() ?? [];
        $studentId = getStudentId();
        $students = $this->studentService->getParentStudents($userRoles);
        $examSchedule = [];
        $examId = null;
        $examScheduleDetails = [];

        if ($request->isMethod('POST')) {
            $studentId = $request->student_id;
            $examId = $request->exam_id;
        }

        if (!empty($studentId)) {
            $selectedStudent = $this->studentService->getEnhancedStudentById($studentId);
            
            if (!empty($selectedStudent?->promotedClassroom?->id)) {
                $examSchedule = $this->examRepository->getExamsByClassroomId($selectedStudent->promotedClassroom->id);
                $examScheduleDetails = $this->examRepository->getExamByIdAndClassroomId($examId, $selectedStudent->promotedClassroom->id);
            }
        }


        return Inertia::render('Student/ScheduleList', [
            'students' => $students,
            'studentId' => $studentId,
            'examSchedule' => $examSchedule,
            'examScheduleDetails' => $examScheduleDetails,
        ]);
    }
}
