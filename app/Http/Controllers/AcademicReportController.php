<?php

namespace App\Http\Controllers;
// use App\Models\Marks;
use Inertia\Inertia;
use App\Enums\Status;
use App\Models\Marks;
use Inertia\Response;
use App\Enums\GroupingType;
use Illuminate\Http\Request;
use App\Enums\CalculationType;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\AssetRequest;
use App\Repositories\ExamRepository;
use Illuminate\Support\Facades\Auth;
use App\Repositories\AssetRepository;
use App\Repositories\IExamRepository;
use App\Repositories\TopicRepository;
use Illuminate\Http\RedirectResponse;
use App\Repositories\IAssetRepository;
use App\Repositories\ITopicRepository;
use App\Repositories\SubjectRepository;
use App\Repositories\IStudentRepository;
use App\Repositories\ISubjectRepository;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\StudentRankRequest;
use App\Repositories\ClassroomRepository;
use App\Repositories\IAcademicRepository;
use App\Repositories\IClassroomRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Repositories\IClassroomSubjectRepository;
use App\Repositories\IResultCardConfigurationRepository;

class AcademicReportController extends Controller
{

    public function __construct(
        private IAssetRepository $assetRepository,
        private ISubjectRepository $subjectRepository,
        private IClassroomRepository $classroomRepository,
        private ITopicRepository $topicRepository,
        private IStudentRepository $studentRepository,
        private IExamRepository $examRepository,
        private IClassroomSubjectRepository $classroomSubjectRepository,
        private IResultCardConfigurationRepository $resultCardConfigurationRepository,
        private IAcademicRepository $academicRepository,

    ) {
        $this->middleware('permission:view academics all', ['only' => [
            'optionalSubject',
            'studentSubjectReport',
            'absent',
            'academicExamReport',
            'consolidated',
            'finalConsolidated',
            'calculatePercentage',
            'getAcademicGradeScales',
            'getGrade',
            'previewReportCard',
            'generateStudentAcademicRank',
            'subjectReport',
            'studentSubjectWiseReport',
            'examwiseReport'
        ]]);
    }

    /**
     * optional subject.
     */
    public function optionalSubject(Request $request)
    {
        $getStudentData = [];

        if ($request->isMethod('post')) {
            $classroom_id = $request->classroom_id;
            $subject_id = $request->subject_id;

            if (!empty($classroom_id) && !empty($subject_id)) {
                $getStudentData = $this->classroomRepository->getStudentClassWiseData($classroom_id, $subject_id);
            } else {
                return redirect()->back()->with('error', 'Class and subject are required.');
            }
        }

        $classrooms = $this->classroomRepository->getActiveAll();
        $subjects   = $this->classroomSubjectRepository->getClassroomOptionalSubjectIdTitle()->map(function ($subject) {
            return [
                'id' => $subject->subject_id,
                'title' => $subject->title,
                'classroom_id' => $subject->classroom_id
            ];
        });


        return Inertia::render('AcademicReport/OptionalSubject', [
            'subjects'          => $subjects,
            'classrooms'        => $classrooms,
            'getStudentData'    => $getStudentData,
        ]);
    }

    /**
     * student subject report.
     */
    public function studentSubjectReport(Request $request): Response
    {
        $getStudentSubject = '';
        $students = [];

        if ($request->isMethod('post')) {

            $classroom_id = $request->input('classroom_id');
            $student_id = $request->input('student_id');

            $students = $this->studentRepository->getStudentsByClassroomId($classroom_id)->map(function ($student) {
                return [
                    'id' => $student->id,
                    'title' => getCocatenationTitle($student->first_name, $student->middle_name, $student->last_name),
                    'classroom_id' => $student->classroom_id,
                ];
            });

            if (!empty($classroom_id) && $student_id) {
                $getStudentSubject = $this->classroomRepository->getStudentSInfo($classroom_id, $student_id);
            }
        }

        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getClassRooms();

        return Inertia::render('AcademicReport/StudentSubjectReport', [
            'subjects'          => $subjects,
            'classrooms'        => $classrooms,
            'students'          => $students,
            'getStudentData'    => $getStudentSubject,
        ]);
    }

    /**
     * student absent.
     */
    public function absent(Request $request): Response
    {

        $absentStudentData = [];
        if ($request->isMethod('post')) {

            $classroom_id = $request->classroom_id;
            $subject_id = $request->subject_id;
            $exam_id = $request->exam_id;

            $absentStudentData = $this->classroomRepository->fielterDataForAbsentStu($classroom_id,  $subject_id, $exam_id);
        }

        $classrooms = $this->classroomRepository->getActiveAll();
        $subjects   = $this->classroomSubjectRepository->getClassroomSubjectIdTitle()->map(function ($subject) {
            return [
                'id' => $subject->subject_id,
                'title' => $subject->title,
                'classroom_id' => $subject->classroom_id
            ];
        });

        $exams = $this->examRepository->getExamtitle();


        // dd($absentStudentData);

        return Inertia::render('AcademicReport/Absent', [
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'exams' => $exams,
            'absentStudentData' => $absentStudentData,
        ]);
    }

    /**
     * Display the schools.
     */
    public function academicExamReport(Request $request): Response
    {
        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('AcademicReport/AcademicExamReport', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'topics' => $topics,
        ]);
    }

    /**
     * Display the consolidated.
     */

    public function consolidated(Request $request)
    {
        $examsData = [];
        $examSubjects = [];

        if ($request->isMethod('POST')) {
            if (!empty($request->classroom_id)) {
                $consolids = $this->classroomRepository->getConsolidatedReportData($request->classroom_id);

                if (count($consolids) > 0) {
                    $consolids = $consolids?->sortBy(['roll_no']);
                    foreach ($consolids->groupBy('student_id') as $studentId => $consolid) {
                        $total_mark = [];
                        $subjectIds = [];

                        foreach ($consolid as $item) {
                            if (!isset($data[$studentId]['student'])) {
                                $examsData[$studentId]['student'] = [
                                    'admission_no' => $item->admission_no,
                                    'roll_no' => $item->roll_no,
                                    'student_name' => "{$item->first_name} {$item->middle_name} {$item->last_name}",
                                ];
                            }

                            if ($item?->is_co_scholastic == 'No' && (empty($subjectIds[$item->exam_id]) || !in_array($item?->subject_id, $subjectIds[$item->exam_id]))) {
                                $subjectIds[$item->exam_id][] = $item?->subject_id;

                                $examsData[$studentId]['exams'][$item->exam_id]['exam_title'] = $item->exam_title;

                                $examsData[$studentId]['exams'][$item->exam_id]['subjects'][] = [
                                    'subject_title' => $item->subject_title,
                                    'mark' => $item->mark,
                                ];

                                $examSubjects[] = $item->subject_title;

                                $total_mark[$item->exam_id] = ($total_mark[$item->exam_id] ?? 0) + $item->mark;

                                $examsData[$studentId]['exams'][$item->exam_id]['total_mark'] = number_format($total_mark[$item->exam_id], 2);
                            }
                        }
                    }

                    $examSubjects = array_unique($examSubjects);
                    $examsData = !empty($examsData) ? array_values($examsData) : [];
                }
            }
        }

        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('AcademicReport/Consolidated', [
            'classrooms' => $classrooms,
            'examSubjects' => $examSubjects,
            'examsData' => $examsData
        ]);
    }

    public function consolidatedOld(Request $request)
    {

        $examsData = [];
        $examSubjects = [];

        if ($request->isMethod('post')) {
            $consolids = $this->classroomRepository->getConsolidData($request->class_name_id);

            foreach ($consolids->groupBy('student_id') as $studentId => $consolid) {
                $total_mark = [];

                foreach ($consolid as $item) {
                    if (!isset($data[$studentId]['student'])) {
                        $examsData[$studentId]['student'] = [
                            'admission_no' => $item->admission_no,
                            'srn_no' => $item->srn_no,
                            'student_name' => "{$item->first_name} {$item->middle_name} {$item->last_name}",
                        ];
                    }

                    $examsData[$studentId]['exams'][$item->exam_id]['exam_title'] = $item->exam_title;

                    $examsData[$studentId]['exams'][$item->exam_id]['subjects'][] = [
                        'subject_title' => $item->subject_title,
                        'mark' => (float) $item->mark,
                    ];

                    $examSubjects[] = $item->subject_title;

                    $total_mark[$item->exam_id] = ($total_mark[$item->exam_id] ?? 0) + (float) $item->mark;

                    $examsData[$studentId]['exams'][$item->exam_id]['total_mark'] = $total_mark[$item->exam_id];
                }
            }

            $examSubjects = array_unique($examSubjects);
            // dd($examsData, $examSubjects);
            // dd($examsData);
        }

        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();



        // dd($data, $classrooms);
        // dd($classrooms);

        return Inertia::render('AcademicReport/Consolidated', [
            'assets' => $assets,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'examSubjects' => $examSubjects,
            'examsData' => $examsData,
            'topics' => $topics,
        ]);
    }

    /**
     * Display Final Consolidated Report
     */
    public function finalConsolidated(Request $request): Response
    {
        $examsData = [];
        $examSubjects = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;

            if (!empty($classroomId)) {
                $consolids = $this->classroomRepository->getFinalConsolidatedReportData($classroomId);

                if (count($consolids) > 0) {
                    $academicGradeScales = [];
                    $resultCardConfiguration = null;
                    $className = $this->classroomRepository->getClassNameByClassroomId($classroomId);

                    if (!empty($className)) {
                        $academicGradeScales = $this->getAcademicGradeScales($className->id);
                        $resultCardConfiguration = $this->resultCardConfigurationRepository->getConfigurationByClassNameId($className?->id);

                        if (!empty($resultCardConfiguration)) {
                            $resultCardConfiguration->loadMissing([
                                'examAttendances' => function ($query) use ($className) {
                                    $query->where('exam_attendances.school_id', getUserSchoolId())
                                        ->where('exam_attendances.academic_year_id', getAcademicYearId())
                                        ->where('exam_attendances.class_name_id', $className?->id);
                                }
                            ]);
                        }
                    }

                    $consolids = $consolids?->sortBy(['roll_no']);

                    foreach ($consolids->groupBy('student_id') as $studentId => $consolid) {
                        $total_mark = [];
                        $fullMarkArr = [];
                        $subjectIds = [];

                        $examAttendance = $resultCardConfiguration?->examAttendances?->where('student_id', $studentId)?->first();

                        foreach ($consolid as $item) {
                            if (!isset($data[$studentId]['student'])) {
                                $examsData[$studentId]['student'] = [
                                    'admission_no' => $item->admission_no,
                                    'roll_no' => $item->roll_no,
                                    'student_name' => "{$item->first_name} {$item->middle_name} {$item->last_name}",
                                ];
                            }

                            if (empty($subjectIds[$item->exam_id]) || !in_array($item?->subject_id, $subjectIds[$item->exam_id])) {
                                $subjectIds[$item->exam_id][] = $item?->subject_id;

                                $examsData[$studentId]['exams'][$item->exam_id]['exam_title'] = $item->exam_title;

                                $examsData[$studentId]['exams'][$item->exam_id]['subjects'][] = [
                                    'subject_title' => $item->subject_title,
                                    'mark' => $item?->is_co_scholastic == 'No' && $item?->is_marking == true ? $item->mark : $item?->grade,
                                ];

                                $examSubjects[] = $item->subject_title;

                                if ($item?->is_co_scholastic == 'No' && $item?->is_marking == true) {
                                    $total_mark[$item->exam_id] = ($total_mark[$item->exam_id] ?? 0) + ($item->mark ?? 0);
                                    $fullMarkArr[$item->exam_id] = ($fullMarkArr[$item->exam_id] ?? 0) + ($item->full_mark ?? 0);

                                    $examsData[$studentId]['exams'][$item->exam_id]['total_mark'] = number_format($total_mark[$item->exam_id], 2);
                                    $examsData[$studentId]['exams'][$item->exam_id]['full_mark'] = number_format($fullMarkArr[$item->exam_id], 2);
                                }

                                $examsData[$studentId]['grade'] = "";
                                $examsData[$studentId]['percentage'] = "";

                                if (!isset($examsData[$studentId]['rank'])) {
                                    $examsData[$studentId]['rank'] = $item?->rank;
                                }
                            }
                        }

                        if (!isset($examsData[$studentId]['total_attendance'])) {
                            $examsData[$studentId]['total_attendance'] = number_format($examAttendance?->present_day ?? 0, 2) . '/' . number_format($examAttendance?->working_day ?? 0, 2);
                        }
                    }

                    // calculate overall grade and percentage
                    if (!empty($examsData)) {
                        foreach ($examsData as $studentId => $examData) {
                            if (!empty($examData['exams'])) {
                                $grandTotalFullMark = 0;
                                $grandTotalMark = 0;

                                foreach ($examData['exams'] as $examId => $exam) {
                                    $totalMark = $exam['total_mark'] ?? 0;
                                    $fullMark = $exam['full_mark'] ?? 0;
                                    $percentage = $this->calculatePercentage($totalMark, $fullMark);
                                    $grade = "";

                                    if (count($academicGradeScales) >  0) {
                                        $grade = $this->getGrade($percentage, $academicGradeScales);
                                    }

                                    $examsData[$studentId]['exams'][$examId]['grade'] = $grade;
                                    $examsData[$studentId]['exams'][$examId]['percentage'] = $percentage;

                                    $grandTotalFullMark += $fullMark;
                                    $grandTotalMark += $totalMark;
                                }

                                $overallPercentage = $this->calculatePercentage($grandTotalMark, $grandTotalFullMark);
                                $grade = "";

                                if (count($academicGradeScales) >  0) {
                                    $grade = $this->getGrade($overallPercentage, $academicGradeScales);
                                }

                                $examsData[$studentId]['grade'] = $grade;
                                $examsData[$studentId]['percentage'] = $overallPercentage;
                                $examsData[$studentId]['total_mark'] = number_format($grandTotalMark, 2);
                            }
                        }
                    }

                    $examSubjects = array_unique($examSubjects);
                    $examsData = !empty($examsData) ? array_values($examsData) : [];
                }
            }
        }

        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('AcademicReport/FinalConsolidated', [
            'classrooms' => $classrooms,
            'examSubjects' => $examSubjects,
            'examsData' => $examsData,
        ]);
    }

    public function finalConsolidated_Old(Request $request): Response
    {
        $examsData = [];
        $examSubjects = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;

            if (!empty($classroomId)) {
                $consolids = $this->classroomRepository->getFinalConsolidatedReportData($request->classroom_id);

                if (count($consolids) > 0) {
                    $consolids = $consolids?->sortBy(['roll_no']);

                    foreach ($consolids->groupBy('student_id') as $studentId => $consolid) {
                        $total_mark = [];
                        $fullMarkArr = [];
                        $subjectIds = [];

                        foreach ($consolid as $item) {
                            if (!isset($data[$studentId]['student'])) {
                                $examsData[$studentId]['student'] = [
                                    'admission_no' => $item->admission_no,
                                    'roll_no' => $item->roll_no,
                                    'student_name' => "{$item->first_name} {$item->middle_name} {$item->last_name}",
                                ];
                            }

                            if (empty($subjectIds[$item->exam_id]) || !in_array($item?->subject_id, $subjectIds[$item->exam_id])) {
                                $subjectIds[$item->exam_id][] = $item?->subject_id;

                                $examsData[$studentId]['exams'][$item->exam_id]['exam_title'] = $item->exam_title;

                                $examsData[$studentId]['exams'][$item->exam_id]['subjects'][] = [
                                    'subject_title' => $item->subject_title,
                                    'mark' => $item->mark,
                                ];

                                $examSubjects[] = $item->subject_title;

                                $total_mark[$item->exam_id] = ($total_mark[$item->exam_id] ?? 0) + ($item->mark ?? 0);
                                $fullMarkArr[$item->exam_id] = ($fullMarkArr[$item->exam_id] ?? 0) + ($item->full_mark ?? 0);

                                $examsData[$studentId]['exams'][$item->exam_id]['total_mark'] = number_format($total_mark[$item->exam_id], 2);
                                $examsData[$studentId]['exams'][$item->exam_id]['full_mark'] = number_format($fullMarkArr[$item->exam_id], 2);
                                $examsData[$studentId]['grade'] = "";
                                $examsData[$studentId]['percentage'] = "";
                                $examsData[$studentId]['rank'] = $item?->rank;
                                $examsData[$studentId]['total_attendance'] = ($examsData[$studentId]['total_attendance'] ?? 0) + ($item?->present_day ?? 0);
                            }
                        }

                        $examsData[$studentId]['total_attendance'] = number_format($examsData[$studentId]['total_attendance'], 2);

                        // calculate overall grade and percentage
                        if (!empty($examsData)) {
                            foreach ($examsData as $studentId => $examData) {
                                if (!empty($examData['exams'])) {
                                    $grandTotalFullMark = 0;
                                    $grandTotalMark = 0;

                                    foreach ($examData['exams'] as $examId => $exam) {
                                        $totalMark = $exam['total_mark'] ?? 0;
                                        $fullMark = $exam['full_mark'] ?? 0;
                                        $percentage = $this->calculatePercentage($totalMark, $fullMark);
                                        $grade = "";

                                        $className = $this->classroomRepository->getClassNameByClassroomId($classroomId);

                                        if ($className?->id != null) {
                                            $academicGradeScales = $this->getAcademicGradeScales($className->id);
                                            $grade = $this->getGrade($percentage, $academicGradeScales);
                                        }

                                        $examsData[$studentId]['exams'][$examId]['grade'] = $grade;
                                        $examsData[$studentId]['exams'][$examId]['percentage'] = $percentage;

                                        $grandTotalFullMark += $fullMark;
                                        $grandTotalMark += $totalMark;
                                    }

                                    $overallPercentage = $this->calculatePercentage($grandTotalMark, $grandTotalFullMark);
                                    $grade = "";

                                    $className = $this->classroomRepository->getClassNameByClassroomId($classroomId);

                                    if ($className?->id != null) {
                                        $academicGradeScales = $this->getAcademicGradeScales($className->id);
                                        $grade = $this->getGrade($overallPercentage, $academicGradeScales);
                                    }

                                    $examsData[$studentId]['grade'] = $grade;
                                    $examsData[$studentId]['percentage'] = $overallPercentage;
                                    $examsData[$studentId]['total_mark'] = number_format($grandTotalMark, 2);
                                }
                            }
                        }
                    }

                    $examSubjects = array_unique($examSubjects);
                    $examsData = !empty($examsData) ? array_values($examsData) : [];
                }
            }
        }

        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('AcademicReport/FinalConsolidated', [
            'classrooms' => $classrooms,
            'examSubjects' => $examSubjects,
            'examsData' => $examsData,
        ]);
    }

    /*
    * helper method to calculate mark percentage
    */
    protected function calculatePercentage($marksObtained, $totalMarks)
    {
        $marksObtained = is_string($marksObtained) ? (float) $marksObtained : $marksObtained;
        $totalMarks = is_string($totalMarks) ? (float) $totalMarks : $totalMarks;

        if ($totalMarks == 0) {
            return 0; // Return 0 if total marks is 0
        }

        // Calculate percentage
        $percentage = ($marksObtained / $totalMarks) * 100;

        // Round the percentage to two decimal places
        return round($percentage, 2);
    }

    /*
    * helper method to get academic grade scale data
    */
    private function getAcademicGradeScales(int $classNameId)
    {
        $academicGradeScales = [];

        $resultCardConfiguration = $this->resultCardConfigurationRepository->getConfigurationByClassNameId($classNameId);

        if (!empty($resultCardConfiguration)) {
            $resultCardConfiguration->loadMissing(['board']);
        }

        if ($resultCardConfiguration?->board?->title != null) {
            $academicGradeScale = $this->academicRepository->getAcademicGradeScaleByTitle($resultCardConfiguration?->board?->title);
        }

        if ($academicGradeScale != null && $academicGradeScale?->academicGradeItems?->count() > 0) {
            foreach ($academicGradeScale?->academicGradeItems as $gradeScaleItem) {
                $academicGradeScales[] = [
                    'grade' => $gradeScaleItem?->title ?? "",
                    'min_mark' => $gradeScaleItem?->min_mark ?? 0,
                    'max_mark' => $gradeScaleItem?->max_mark ?? 0,
                ];
            }
        }

        if (empty($academicGradeScales)) {
            $academicGradeScales = [
                [
                    'grade' => 'A1',
                    'min_mark' => 91,
                    'max_mark' => 100,
                ],
                [
                    'grade' => 'A2',
                    'min_mark' => 81,
                    'max_mark' => 90,
                ],
                [
                    'grade' => 'B1',
                    'min_mark' => 71,
                    'max_mark' => 80,
                ],
                [
                    'grade' => 'B2',
                    'min_mark' => 70,
                    'max_mark' => 61,
                ],
                [
                    'grade' => 'C1',
                    'min_mark' => 51,
                    'max_mark' => 60,
                ],
                [
                    'grade' => 'C2',
                    'min_mark' => 41,
                    'max_mark' => 50,
                ],
                [
                    'grade' => 'D',
                    'min_mark' => 33,
                    'max_mark' => 40,
                ],
                [
                    'grade' => 'E',
                    'min_mark' => 0,
                    'max_mark' => 32,
                ],
            ];
        }

        return  $academicGradeScales;
    }

    /*
    * helper method to get academic grade
    */
    private function getGrade($percentage, $gradeMap)
    {
        $percentage = is_string($percentage) ? (float) $percentage : $percentage;
        $percentage = floor($percentage);

        foreach ($gradeMap as $gradeItem) {
            if ($percentage >= $gradeItem['min_mark'] && $percentage <= $gradeItem['max_mark']) {
                return $gradeItem['grade'];
            }
        }

        return "";
    }

    public function finalConsolidatedOld(Request $request): Response
    {
        $examsData = [];
        $examSubjects = [];

        if ($request->isMethod('post')) {
            // dd($request->all());
            $consolids = $this->classroomRepository->getConsolidData($request->class_name_id);

            foreach ($consolids->groupBy('student_id') as $studentId => $consolid) {
                $total_mark = [];

                foreach ($consolid as $item) {
                    if (!isset($data[$studentId]['student'])) {
                        $examsData[$studentId]['student'] = [
                            'admission_no' => $item->admission_no,
                            'srn_no' => $item->srn_no,
                            'student_name' => "{$item->first_name} {$item->middle_name} {$item->last_name}",
                        ];
                    }

                    $examsData[$studentId]['exams'][$item->exam_id]['exam_title'] = $item->exam_title;

                    $examsData[$studentId]['exams'][$item->exam_id]['subjects'][] = [
                        'subject_title' => $item->subject_title,
                        'mark' => (float) $item->mark,
                    ];

                    $examSubjects[] = $item->subject_title;

                    $total_mark[$item->exam_id] = ($total_mark[$item->exam_id] ?? 0) + (float) $item->mark;

                    $examsData[$studentId]['exams'][$item->exam_id]['total_mark'] = $total_mark[$item->exam_id];

                    // $total_mark = $student->marks->sum('mark');
                    // $student['total_mark'] = $total_mark;

                    // if ($total_mark > 0) {
                    //     $student['total_percentage'] = number_format($total_mark / ($student->marks->count() * 100) * 100, 2);
                    // } else {
                    //     $student['total_percentage'] = 0;
                    // }
                }
            }

            $examSubjects = array_unique($examSubjects);
            // dd($examsData, $examSubjects);
            // dd($examsData);
        }


        $assets = $this->assetRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();
        $topics = $this->topicRepository->getActiveAll();

        return Inertia::render('AcademicReport/FinalConsolidated', [
            'assets' => $assets,
            'topics' => $topics,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'examSubjects' => $examSubjects,
            'examsData' => $examsData,
        ]);
    }

    /**
     * Display the schools.
     */
    public function previewReportCard(Request $request): Response
    {
        $classrooms = $this->classroomRepository->getActiveAll();
        $students = [];
        $student = null;

        if ($request->isMethod('POST')) {
            if (!empty($request->admission_no)) {
                $student = $this->studentRepository->getStudentByAdmissionNoAndStudentId($request->admission_no);

                if ($student != null) {
                    if ($student?->promotedClassroom != null) {
                        unset($student['classroom']);

                        $student['classroom_id'] = $student?->promotedClassroom?->id;
                        $student['classroom'] = $student?->promotedClassroom;
                    }

                    $student['title'] = "{$student?->classroomRoll?->roll_no} - {$student->first_name} {$student->middle_name} {$student->last_name}";
                }
            }

            $classroomId = $request->classroom_id ?? $student?->classroom_id;

            if (!empty($classroomId)) {
                $students = $this->studentRepository->getStudentsByClassroomId($classroomId);
            }

            if (count($students) > 0) {
                $students->loadMissing(['promotedClassroom', 'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                $students = $students->map(function ($student) {
                    if ($student?->promotedClassroom != null) {
                        unset($student['classroom']);

                        $student['classroom_id'] = $student?->promotedClassroom?->id;
                        $student['classroom'] = $student?->promotedClassroom;
                    }

                    $rollNo = $student?->classroomRoll?->roll_no ?? "";

                    $student['title'] = "{$rollNo} - {$student->first_name} {$student->middle_name} {$student->last_name}";

                    return $student;
                });
            }
        }


        return Inertia::render('AcademicReport/PreviewReportCard', [
            'classrooms' => $classrooms,
            'students' => $students,
            'student' => $student,
        ]);
    }


    /*
    * generate student academic rank
    */
    public function generateStudentAcademicRank(StudentRankRequest $request)
    {
        $input = $request->validated();

        $className = null;
        $resultCardConfiguration = null;

        DB::beginTransaction();

        try {
            $students = $this->studentRepository->getStudentsByClassroomId($input['classroom_id']);

            if ($students->count() == 0) {
                return redirect()->back()->with('error', "Student does not exists.");
            }

            $schoolId = getUserSchoolId();
            $academicYearId = getAcademicYearId();

            $students->loadMissing([
                'classroom.classroomSubjects' => function ($query) use ($schoolId, $academicYearId) {
                    $query->where('classroom_subjects.school_id', $schoolId)
                        ->where('classroom_subjects.academic_year_id', $academicYearId)
                        ->with(['examRoasters' => function ($query) use ($schoolId, $academicYearId) {
                            $query->where('exam_roasters.school_id', $schoolId)
                                ->where('exam_roasters.academic_year_id', $academicYearId)
                                ->select(
                                    'exam_roasters.id',
                                    'exam_roasters.classroom_subject_id',
                                    'exam_roasters.exam_id',
                                    'exam_roasters.full_mark',
                                    'exam_roasters.pass_mark'
                                );
                        }, 'subject' => function ($query) use ($schoolId) {
                            $query->where('subjects.school_id', $schoolId);
                        }, 'academic_grade' => function ($query) use ($schoolId, $academicYearId) {
                            $query->where('academic_grades.school_id', $schoolId)
                                ->where('academic_grades.academic_year_id', $academicYearId)
                                ->with(['academicGradeItems' => function ($query) use ($schoolId, $academicYearId) {
                                    $query->where('academic_grade_items.school_id', $schoolId)
                                        ->where('academic_grade_items.academic_year_id', $academicYearId);
                                }]);
                        }]);
                },
                'promotedClassroom.classroomSubjects' => function ($query) use ($schoolId, $academicYearId) {
                    $query->where('classroom_subjects.school_id', $schoolId)
                        ->where('classroom_subjects.academic_year_id', $academicYearId)
                        ->with(['examRoasters' => function ($query) use ($schoolId, $academicYearId) {
                            $query->where('exam_roasters.school_id', $schoolId)
                                ->where('exam_roasters.academic_year_id', $academicYearId)
                                ->select(
                                    'exam_roasters.id',
                                    'exam_roasters.classroom_subject_id',
                                    'exam_roasters.exam_id',
                                    'exam_roasters.full_mark',
                                    'exam_roasters.pass_mark'
                                );
                        }, 'subject' => function ($query) use ($schoolId) {
                            $query->where('subjects.school_id', $schoolId);
                        }, 'academic_grade' => function ($query) use ($schoolId, $academicYearId) {
                            $query->where('academic_grades.school_id', $schoolId)
                                ->where('academic_grades.academic_year_id', $academicYearId)
                                ->with(['academicGradeItems' => function ($query) use ($schoolId, $academicYearId) {
                                    $query->where('academic_grade_items.school_id', $schoolId)
                                        ->where('academic_grade_items.academic_year_id', $academicYearId);
                                }]);
                        }]);
                },
                'marks.exam',
                'marks.subject',
            ]);

            // update current session classroom
            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                return $student;
            });

            // sort by classroom roll
            $students = $students->sortBy(function ($student) {
                return optional($student->classroomRoll)->roll_no;
            });

            // get class name by classroom id
            $className = $this->classroomRepository->getClassNameByClassroomId($input['classroom_id']);

            if (!empty($className)) {
                $resultCardConfiguration = $this->resultCardConfigurationRepository->getConfigurationByClassNameId($className?->id);
            }

            if (empty($resultCardConfiguration)) {
                return redirect()->back()->with('error', "Result card configuration settings is not created..");
            }

            $examGroups = $resultCardConfiguration?->examGroups?->whereNull('parent');

            if (empty($examGroups)) {
                return redirect()->back()->with('error', "Exam group is not created.");
            }

            $examGroups->loadMissing([
                'childrenGroups.childrenGroups',
                'childrenGroups.exam' => function ($query) {
                    $query->with(['marks' => function ($query) {
                        $query->with(['grade', 'classroomSubject']);
                    }]);
                }
            ]);

            $scholasticExamGroups = $examGroups->where('grouping_type', GroupingType::SCHOLASTIC->value);

            if (empty($scholasticExamGroups)) {
                return redirect()->back()->with('error', "Exam group is not created.");
            }

            $totalMarkObtainedMap = [];

            foreach ($students as $student) {
                $classroomSubjects = $student?->classroom?->classroomSubjects ?? [];

                if (!empty($classroomSubjects)) {
                    foreach ($classroomSubjects as $classroomSubject) {
                        $subject =  $classroomSubject?->subject;

                        // scholastic report data
                        if ($subject != null && $subject->is_co_scholastic == "No") {
                            $groupingType = GroupingType::SCHOLASTIC->value;

                            foreach ($examGroups as $group) {
                                // if group has children groups then proceed
                                if (
                                    $group->grouping_type == $groupingType &&
                                    !empty($group?->childrenGroups)
                                ) {
                                    $group->setRelation('childrenGroups', $group->childrenGroups->sortBy('display_order'));

                                    foreach ($group->childrenGroups as $childGroup) {
                                        //calculate total mark or grade
                                        if (
                                            // new
                                            $childGroup->grouping_type == $groupingType &&
                                            $childGroup?->childrenGroups?->count() > 0 &&
                                            $childGroup?->calculation_type == CalculationType::MARKS->value
                                            // old
                                            // $childGroup->grouping_type == $groupingType &&
                                            // $childGroup?->childrenGroups?->count() > 0 &&
                                            // $childGroup?->calculation_type == CalculationType::MARKS->value &&
                                            // strtolower($childGroup?->title) == 'marks obtained'
                                        ) {
                                            foreach ($childGroup?->childrenGroups as $subChildGroup) {
                                                $markItem = $subChildGroup?->exam?->marks->where('student_id', $student->id)->where('subject_id', $subject->id)->first();

                                                $mark = $markItem?->mark ?? 0;

                                                $totalMarkObtainedMap[$student->id] = ($totalMarkObtainedMap[$student->id] ?? 0) + $mark;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if (count($totalMarkObtainedMap) > 0) {
                arsort($totalMarkObtainedMap);

                $rank = 1;

                foreach ($totalMarkObtainedMap as $studentId => $mark) {
                    $attributesToCheck = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'student_id' => $studentId,
                        'classroom_id' => $input['classroom_id'],
                    ];

                    $valuesToUpdate = [
                        'rank' => $rank,
                        'status' => Status::ACTIVE,
                    ];

                    $this->academicRepository->updateOrCreateStudentRank($attributesToCheck, $valuesToUpdate);

                    $rank++;
                }
            } else {
                return redirect()->back()->with('error', "Rank could not be generated.");
            }

            DB::commit();

            return redirect()->back()->with('message', "Student rank generated successfully.");
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', "Something goes wrong.");
        }
    }

    public function generateStudentAcademicRank_Old(StudentRankRequest $request)
    {
        $input = $request->validated();

        $className = null;
        $resultCardConfiguration = null;

        DB::beginTransaction();

        try {
            $students = $this->studentRepository->getStudentsByClassroomId($input['classroom_id']);

            if ($students->count() == 0) {
                return redirect()->back()->with('error', "Student does not exists.");
            }

            $schoolId = getUserSchoolId();
            $academicYearId = getAcademicYearId();

            $students->loadMissing([
                'classroom.classroomSubjects' => function ($query) use ($schoolId, $academicYearId) {
                    $query->where('classroom_subjects.school_id', $schoolId)
                        ->where('classroom_subjects.academic_year_id', $academicYearId)
                        ->with(['examRoasters' => function ($query) use ($schoolId, $academicYearId) {
                            $query->where('exam_roasters.school_id', $schoolId)
                                ->where('exam_roasters.academic_year_id', $academicYearId)
                                ->select(
                                    'exam_roasters.id',
                                    'exam_roasters.classroom_subject_id',
                                    'exam_roasters.exam_id',
                                    'exam_roasters.full_mark',
                                    'exam_roasters.pass_mark'
                                );
                        }, 'subject' => function ($query) use ($schoolId) {
                            $query->where('subjects.school_id', $schoolId);
                        }, 'academic_grade' => function ($query) use ($schoolId, $academicYearId) {
                            $query->where('academic_grades.school_id', $schoolId)
                                ->where('academic_grades.academic_year_id', $academicYearId)
                                ->with(['academicGradeItems' => function ($query) use ($schoolId, $academicYearId) {
                                    $query->where('academic_grade_items.school_id', $schoolId)
                                        ->where('academic_grade_items.academic_year_id', $academicYearId);
                                }]);
                        }]);
                },
                'promotedClassroom.classroomSubjects' => function ($query) use ($schoolId, $academicYearId) {
                    $query->where('classroom_subjects.school_id', $schoolId)
                        ->where('classroom_subjects.academic_year_id', $academicYearId)
                        ->with(['examRoasters' => function ($query) use ($schoolId, $academicYearId) {
                            $query->where('exam_roasters.school_id', $schoolId)
                                ->where('exam_roasters.academic_year_id', $academicYearId)
                                ->select(
                                    'exam_roasters.id',
                                    'exam_roasters.classroom_subject_id',
                                    'exam_roasters.exam_id',
                                    'exam_roasters.full_mark',
                                    'exam_roasters.pass_mark'
                                );
                        }, 'subject' => function ($query) use ($schoolId) {
                            $query->where('subjects.school_id', $schoolId);
                        }, 'academic_grade' => function ($query) use ($schoolId, $academicYearId) {
                            $query->where('academic_grades.school_id', $schoolId)
                                ->where('academic_grades.academic_year_id', $academicYearId)
                                ->with(['academicGradeItems' => function ($query) use ($schoolId, $academicYearId) {
                                    $query->where('academic_grade_items.school_id', $schoolId)
                                        ->where('academic_grade_items.academic_year_id', $academicYearId);
                                }]);
                        }]);
                },
                'marks.exam',
                'marks.subject',
            ]);

            // update current session classroom
            $students = $students->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    if (!empty($student['classroom'])) {
                        unset($student['classroom']);
                    }

                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                    $student['classroom'] = $student?->promotedClassroom;
                }

                return $student;
            });

            // sort by classroom roll
            $students = $students->sortBy(function ($student) {
                return optional($student->classroomRoll)->roll_no;
            });

            // get class name by classroom id
            $className = $this->classroomRepository->getClassNameByClassroomId($input['classroom_id']);

            if (!empty($className)) {
                $resultCardConfiguration = $this->resultCardConfigurationRepository->getConfigurationByClassNameId($className?->id);
            }

            if (empty($resultCardConfiguration)) {
                return redirect()->back()->with('error', "Result card configuration settings is not created..");
            }

            $examGroups = $resultCardConfiguration?->examGroups?->whereNull('parent');

            if (empty($examGroups)) {
                return redirect()->back()->with('error', "Exam group is not created.");
            }

            $examGroups->loadMissing([
                'childrenGroups.childrenGroups',
                'childrenGroups.exam' => function ($query) {
                    $query->with(['marks' => function ($query) {
                        $query->with(['grade', 'classroomSubject']);
                    }]);
                }
            ]);

            $scholasticExamGroups = $examGroups->where('grouping_type', GroupingType::SCHOLASTIC->value);

            if (empty($scholasticExamGroups)) {
                return redirect()->back()->with('error', "Exam group is not created.");
            }

            $totalMarkObtainedMap = [];
            // $failedStudentIds = [];

            foreach ($students as $student) {
                $classroomSubjects = $student?->classroom?->classroomSubjects ?? [];

                if (!empty($classroomSubjects)) {
                    foreach ($classroomSubjects as $classroomSubject) {
                        $subject =  $classroomSubject?->subject;

                        if ($subject != null) {
                            // scholastic report data
                            if ($subject->is_co_scholastic == "No") {
                                $groupingType = GroupingType::SCHOLASTIC->value;

                                foreach ($examGroups as $group) {
                                    // if group has children groups then proceed
                                    if (
                                        $group->grouping_type == $groupingType &&
                                        !empty($group?->childrenGroups)
                                    ) {
                                        $group['childrenGroups'] = $group->childrenGroups->sortBy('display_order');

                                        foreach ($group->childrenGroups as $childGroup) {
                                            //calculate total mark or grade
                                            if (
                                                $childGroup->grouping_type == $groupingType &&
                                                $childGroup?->childrenGroups->count() > 0 &&
                                                $childGroup?->calculation_type == CalculationType::MARKS->value &&
                                                strtolower($childGroup?->title) == 'marks obtained'
                                            ) {
                                                if ($childGroup?->childrenGroups?->count() > 0) {
                                                    foreach ($childGroup?->childrenGroups as $subChildGroup) {
                                                        $markItem = $subChildGroup?->exam?->marks->where('student_id', $student->id)->where('subject_id', $subject->id)->first();
                                                        // $examRoaster = $classroomSubject?->examRoasters?->where('exam_id', $subChildGroup?->exam_id)?->first();

                                                        $mark = $markItem?->mark ?? 0;

                                                        $totalMarkObtainedMap[$student->id] = ($totalMarkObtainedMap[$student->id] ?? 0)  + $mark;

                                                        // $passMark = $examRoaster?->pass_mark ?? 0;

                                                        // if ($mark < $passMark && !in_array($student->id, $failedStudentIds)) {
                                                        //     $failedStudentIds[] = $student->id;
                                                        // }

                                                        // if (!in_array($student->id, $failedStudentIds)) {
                                                        //     $totalMarkObtainedMap[$student->id] = ($totalMarkObtainedMap[$student->id] ?? 0)  + $mark;
                                                        // }


                                                        // if (in_array($student->id, $failedStudentIds) && isset($totalMarkObtainedMap[$student->id])) {
                                                        //     unset($totalMarkObtainedMap[$student->id]);
                                                        // }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if (count($totalMarkObtainedMap) > 0) {
                arsort($totalMarkObtainedMap);

                $rank = 1;

                foreach ($totalMarkObtainedMap as $studentId => $mark) {
                    $attributesToCheck = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'student_id' => $studentId,
                        'classroom_id' => $input['classroom_id'],
                    ];

                    $valuesToUpdate = [
                        'rank' => $rank,
                        'status' => Status::ACTIVE,
                    ];

                    $this->academicRepository->updateOrCreateStudentRank($attributesToCheck, $valuesToUpdate);

                    $rank++;
                }
            }

            DB::commit();

            return redirect()->back()->with('message', "Student rank generated successfully.");
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', "Something goes wrong.");
        }
    }

    /**
     * subjectReport.
     */
    public function subjectReport(Request $request): Response
    {
        $subjeteWiseData = [];
        $examWiseData = [];
        $classrooms = $this->classroomRepository->getActiveAll();
        $subjects = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $subjectId = $request->subject_id ?? null;
            // $withRoundOff = $request->with_round_off ?? false;

            if (!empty($classroomId)) {
                $subjects = $this->subjectRepository->getSubjectsByClassroomId($classroomId);

                if (!empty($subjectId)) {
                    $subjeteWiseReportData = $this->studentRepository->getSubjectWiseDataByClassroomIdAndSubjectId($classroomId, $subjectId);

                    if (count($subjeteWiseReportData) > 0) {
                        $subjeteWiseReportData = $subjeteWiseReportData->sortBy(['roll_no']);

                        foreach ($subjeteWiseReportData as $reportData) {
                            $studentId = $reportData->student_id;
                            $examId = $reportData->exam_id;

                            if (!empty($studentId)) {
                                if (!isset($subjeteWiseData[$studentId])) {
                                    $subjeteWiseData[$studentId] = [
                                        'student' => [
                                            'roll_no' => $reportData?->roll_no,
                                            'admission_no' => $reportData?->admission_no,
                                            'first_name' => $reportData?->first_name,
                                            'middle_name' => $reportData?->middle_name,
                                            'last_name' => $reportData?->last_name,
                                        ],
                                        'total_mark' => 0,
                                        'total_full_mark' => 0,
                                        'total_percentage' => 0
                                    ];
                                }

                                if (!empty($examId) && !isset($subjeteWiseData[$studentId]['exams'][$examId])) {
                                    $subjeteWiseData[$studentId]['exams'][$examId] = [
                                        // 'mark' => $withRoundOff ? round($reportData?->mark) : $reportData?->mark,
                                        'exam_id' => $reportData?->exam_id,
                                        'exam_title' => $reportData?->exam_title,
                                        'mark' => $reportData?->mark,
                                        'full_mark' => $reportData?->full_mark
                                    ];

                                    $subjeteWiseData[$studentId]['total_mark'] = ($subjeteWiseData[$studentId]['total_mark'] ?? 0) + ($reportData->mark ?? 0);
                                    $subjeteWiseData[$studentId]['total_full_mark'] = ($subjeteWiseData[$studentId]['total_full_mark'] ?? 0) + ($reportData->full_mark ?? 0);
                                } else {
                                    $subjeteWiseData[$studentId]['exams'] = [];
                                }

                                if (!empty($examId) && !isset($examWiseData[$examId])) {
                                    $examWiseData[$examId] = [
                                        'exam_id' => $reportData?->exam_id,
                                        'exam_title' => $reportData?->exam_title,
                                        'full_mark' => $reportData?->full_mark
                                    ];
                                }
                            }
                        }
                    }

                    if (!empty($subjeteWiseData)) {
                        $subjeteWiseData = array_map(function ($subjectData) {
                            $totalMark = $subjectData['total_mark'] ?? 0;
                            $totalFullMark = $subjectData['total_full_mark'] ?? 0;
                            $percentage = $this->calculatePercentage($totalMark, $totalFullMark);
                            $subjectData['total_percentage'] = $percentage;

                            return $subjectData;
                        }, $subjeteWiseData);
                    }

                    $subjeteWiseData = !empty($subjeteWiseData) ? array_values($subjeteWiseData) : [];
                    $examWiseData = !empty($examWiseData) ? array_values($examWiseData) : [];
                }
            }
        }

        return Inertia::render('AcademicReport/SubjectReport', [
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'subjeteWiseData' => $subjeteWiseData,
            'examWiseData' => $examWiseData
        ]);
    }

    public function subjectReportOld(Request $request): Response
    {
        $subjeteWiseData = [];

        $classrooms = $this->classroomRepository->getActiveAll();
        $subjects   = $this->classroomSubjectRepository->getClassroomSubjectIdTitle()->map(function ($subject) {
            return [
                'id' => $subject->subject_id,
                'title' => $subject->title,
                'classroom_id' => $subject->classroom_id
            ];
        });

        if ($request->isMethod('post')) {
            $classroom_id = $request->classroom_id;
            $subject_id = $request->subject_id;
            $subjeteWiseData = $this->studentRepository->getSubjectWiseDataByClassroomIdAndSubjectId($classroom_id, $subject_id);
            $subjeteWiseData->map(function ($report) use ($request) {
                $mark = $report?->mark;
                if (!empty($mark)) {
                    $report['total_mark'] = $mark;
                    if ($mark > 0) {
                        $total_percentage = $mark;
                        if ($request->input('with_round_off')) {
                            $report['total_percentage'] = round($total_percentage);
                        } else {
                            $report['total_percentage'] = $total_percentage;
                        }
                    } else {
                        $report['total_percentage'] = 0;
                    }
                    return $report;
                } else {
                    $report['total_percentage'] = 0;
                    return $report;
                }
            });
        }

        return Inertia::render('AcademicReport/SubjectReport', [
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'subjeteWiseData' => $subjeteWiseData,
        ]);
    }

    /**
     * student subject wise report.
     */
    public function studentSubjectWiseReport(Request $request): Response
    {
        $classroomId = $request->classroom_id ?? null;
        $studentId = $request->student_id ?? null;
        $subjectId = $request->subject_id ?? null;
        $classrooms = $this->classroomRepository->getActiveAll();
        $subjects = [];
        $students = [];
        $activeStudents = [];
        $inactiveStudents = [];
        $student = null;
        $studentSubjectWiseRepo = [];

        if ($request->isMethod('POST')) {
            if (!empty($studentId)) {
                $student = $this->studentRepository->getActiveAndInActiveStudentById($studentId);
            }

            if ($student != null) {
                $student->loadMissing(['promotedClassroom']);

                if ($student?->promotedClassroom != null) {
                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                }

                $classroomId = $student?->classroom_id;
            }

            if (!empty($classroomId)) {
                $students = $this->studentRepository->getActiveAndInActiveStudentsByClassroomId($classroomId);
                $subjects = $this->subjectRepository->getSubjectsByClassroomId($classroomId);

                if (!empty($studentId) && !empty($subjectId)) {
                    $studentSubjectWiseRepoData  = $this->classroomRepository->getAllStudentSubWiseRep($classroomId, $studentId, $subjectId);

                    if (count($studentSubjectWiseRepoData) > 0) {
                        foreach ($studentSubjectWiseRepoData as $subjectData) {
                            $examId = $subjectData?->exam_id;

                            if (!empty($examId) && !isset($studentSubjectWiseRepo[$examId])) {
                                $mark = $subjectData->mark ?? 0;
                                $fullMark = $subjectData->full_mark ?? 0;
                                $percentage = $this->calculatePercentage($mark, $fullMark);

                                $studentSubjectWiseRepo[$examId] = [
                                    'exam_title' => $subjectData?->exam_title,
                                    'total_percentage' => $percentage,
                                ];
                            }
                        }
                    }

                    $studentSubjectWiseRepo = !empty($studentSubjectWiseRepo) ? array_values($studentSubjectWiseRepo) : [];
                }
            }

            if (count($students) > 0) {
                $students->loadMissing(['studentTransferCertificate', 'promotedClassroom', 'classroomRoll' => function ($query) use ($classroomId) {
                    $query->where('classroom_id', $classroomId);
                }]);

                $students = $students->map(function ($student) {
                    if ($student?->promotedClassroom != null) {
                        if (!empty($student['classroom'])) {
                            unset($student['classroom']);
                        }

                        $student['classroom_id'] = $student?->promotedClassroom?->id;
                    }

                    $rollNo = $student?->classroomRoll?->roll_no ?? "";

                    $student['title'] = $rollNo . " - " . ($student->first_name ?? "") . " " . ($student->middle_name ?? "") . " " . ($student->last_name ?? "");

                    return $student;
                });

                $activeStudents = $students->filter(function ($student) {
                    return $student?->status == Status::ACTIVE;
                });

                $inactiveStudents = $students->filter(function ($student) {
                    return $student?->status == Status::INACTIVE  && $student?->studentTransferCertificate == null;
                });
            }
        }

        $groupedStudents = [
            'active' => [
                'student_type' => 'Active',
                'options' => $activeStudents
            ],
            'inactive' => [
                'student_type' => 'InActive',
                'options' => $inactiveStudents
            ]
        ];

        return Inertia::render('AcademicReport/StudentSubjectWiseReport', [
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'students' => $groupedStudents,
            'student' => $student,
            'studentSubjectWiseRepo' => $studentSubjectWiseRepo
        ]);
    }

    public function studentSubjectWiseReportOld(Request $request): Response
    {

        if ($request->isMethod('post')) {
            $studentSubjectWiseRepo  = $this->classroomRepository->getAllStudentSubWiseRep($request->classroom_id, $request->student_id, $request->subject_id);

            $studentSubjectWiseRepo->map(function ($report) {
                $total_mark = $report->marks->sum('mark');
                $report['total_mark'] = $total_mark;
                if ($total_mark > 0) {
                    $report['total_percentage'] = number_format($total_mark / ($report->marks->count() * 100) * 100, 2);
                } else {
                    $report['total_percentage'] = 0;
                }
                return $report;
            });
        } else {
            $studentSubjectWiseRepo = $this->classroomRepository->getStudentSubWiseRep();
            $studentSubjectWiseRepo->map(function ($report) {
                $total_mark = $report->marks->sum('mark');
                $report['total_mark'] = $total_mark;

                if ($total_mark > 0) {
                    $report['total_percentage'] = number_format($total_mark / ($report->marks->count() * 100) * 100, 2);
                } else {
                    $report['total_percentage'] = 0;
                }
                return $report;
            });
        }

        $studentData = $this->studentRepository->getAllActiveStudents();
        $getActiveStudent =  $studentData->map(function ($student) {
            return [
                'id' => $student->id,
                'title' => getCocatenationTitle($student->first_name, $student->middle_name, $student->last_name),
                'classroom_id' => $student->classroom_id,
            ];
        });

        $classrooms = $this->classroomRepository->getActiveAll();
        $subjects   = $this->classroomSubjectRepository->getClassroomSubjectIdTitle()->map(function ($subject) {
            return [
                'id' => $subject->subject_id,
                'title' => $subject->title,
                'classroom_id' => $subject->classroom_id
            ];
        });

        return Inertia::render('AcademicReport/StudentSubjectWiseReport', [
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'studentSubjectWiseRepo' => $studentSubjectWiseRepo,
            'getActiveStudent' => $getActiveStudent
        ]);
    }

    /**
     * exam wise report.
     */
    public function examwiseReport(Request $request)
    {
        $examData = [];
        $examSubjects = [];

        if ($request->isMethod('post')) {
            if (!empty($request->classroom_id) && !empty($request->exam_id)) {
                $examWiseReports = $this->classroomRepository->getExamWiseReport($request->classroom_id, $request->exam_id);
                foreach ($examWiseReports->groupBy('student_id') as $studentId => $examWiseReport) {
                    $total_mark = [];
                    $subjectIds = [];
                    foreach ($examWiseReport as $item) {
                        if (!isset($data[$studentId]['student'])) {
                            $examData[$studentId]['student'] = [
                                'admission_no' => $item->admission_no,
                                'roll_no' => $item->roll_no,
                                'student_name' => "{$item?->first_name} {$item?->middle_name} {$item?->last_name}",
                                'father_name' => "{$item?->father_first_name} {$item?->father_middle_name} {$item?->father_last_name}",
                            ];
                        }

                        $examData[$studentId]['exams'][$item->exam_id]['exam_title'] = $item->exam_title;

                        if (!in_array($item?->subject_id, $subjectIds)) {
                            $subjectIds[] = $item?->subject_id;

                            $examData[$studentId]['exams'][$item->exam_id]['subjects'][] = [
                                'subject_title' => $item->subject_title,
                                'mark' => $item?->is_present ? ($item->mark ?? '') : 'AB',
                            ];

                            $examSubjects[] = $item->subject_title;

                            $total_mark[$item->exam_id] = ($total_mark[$item->exam_id] ?? 0) + $item->mark ?? 0;
                        }

                        $examData[$studentId]['exams'][$item->exam_id]['total_mark'] = $total_mark[$item->exam_id] ?? 0;
                    }
                }
                $examSubjects = array_unique($examSubjects);

                if (count($examData) > 0) {
                    // sort reports by classroom roll
                    usort($examData, function ($a, $b) {
                        $rollNoA = $a['student']['roll_no'] ?? null;
                        $rollNoB = $b['student']['roll_no'] ?? null;

                        if ($rollNoA == $rollNoB) {
                            return 0;
                        }

                        // If $rollNoA is null, move it to the end
                        if ($rollNoA == null) {
                            return 1;
                        }

                        // If $rollNoB is null, move it to the end
                        if ($rollNoB == null) {
                            return -1;
                        }

                        return ($rollNoA < $rollNoB) ? -1 : 1;
                    });
                }
            } else {
                return redirect()->back()->with('error', 'Select class and exam');
            }
        }

        $classrooms = $this->classroomRepository->getActiveAll();
        $exams = $this->examRepository->getExamtitle();

        return Inertia::render('AcademicReport/ExamwiseReport', [
            'exams' => $exams,
            'classrooms' => $classrooms,
            'examData' =>  $examData,
            'examSubjects' => $examSubjects
        ]);
    }

    public function examwiseReportOld(Request $request)
    {

        $examData = [];
        $examSubjects = [];
        $is_round_of = false;

        if ($request->isMethod('post')) {
            $is_round_of = $request->input('with_round_off') ? true : false;
            if (!empty($request->classroom_id) && !empty($request->exam_id)) {
                $examWiseReports = $this->classroomRepository->getExamWiseReport($request->classroom_id, $request->exam_id);
                foreach ($examWiseReports->groupBy('student_id') as $studentId => $examWiseReport) {
                    $total_mark = [];
                    foreach ($examWiseReport as $item) {
                        if (!isset($data[$studentId]['student'])) {
                            $examData[$studentId]['student'] = [
                                'admission_no' => $item->admission_no,
                                'srn_no' => $item->roll_no,
                                'student_name' => "{$item?->first_name} {$item?->middle_name} {$item?->last_name}",
                                'father_name' => "{$item?->father_first_name} {$item?->father_middle_name} {$item?->father_last_name}",
                            ];
                        }
                        $examData[$studentId]['exams'][$item->exam_id]['exam_title'] = $item->exam_title;

                        $examData[$studentId]['exams'][$item->exam_id]['subjects'][] = [
                            'subject_title' => $item->subject_title,
                            'mark' => $is_round_of ? (float) $item->mark : round((float) $item->mark),
                        ];

                        $examSubjects[] = $item->subject_title;

                        $total_mark[$item->exam_id] = ($total_mark[$item->exam_id] ?? 0) + (float) $item->mark;
                        $examData[$studentId]['exams'][$item->exam_id]['total_mark'] = $is_round_of  ? $total_mark[$item->exam_id] : round($total_mark[$item->exam_id]);
                    }
                }
                $examSubjects = array_unique($examSubjects);
            } else {
                return redirect()->back()->with('error', 'Select class and exam');
            }
        }

        $classrooms = $this->classroomRepository->getActiveAll();
        $exams = $this->examRepository->getExamtitle();

        return Inertia::render('AcademicReport/ExamwiseReport', [
            'exams' => $exams,
            'classrooms' => $classrooms,
            'examData' =>  $examData,
            'examSubjects' => $examSubjects
        ]);
    }
}
