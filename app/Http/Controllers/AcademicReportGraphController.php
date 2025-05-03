<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Requests\AssetRequest;
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
use App\Repositories\ClassroomRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IExamRoasterRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Repositories\IClassroomSubjectRepository;

class AcademicReportGraphController extends Controller
{

    public function __construct(
        private IAssetRepository $assetRepository,
        private ISubjectRepository $subjectRepository,
        private IClassroomRepository $classroomRepository,
        private ITopicRepository $topicRepository,
        private IExamRepository $examRepository,
        private IStudentRepository $StudentRepository,
        private IClassroomSubjectRepository $classroomSubjectRepository,
        private IExamRoasterRepository $examRoasterRepository
    ) {
        $this->middleware('permission:view academics all', ['only' => ['weaker',
            'calculatePercentage',
            'calculateTotalMarksAndPercentage',
            'toppers',
            'subjectWiseOverall',
            'generateMarkRanges',
            'calculateRangeCounts',
            'classWiseOverall'
            ]]);
    }

    /**
     * weaker
     */
    public function weaker(Request $request)
    {
        $graphWeakerReport = [];
        $subjects = [];
        $exams = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $examId = $request->exam_id ?? null;
            $subjectId = $request->subject_id ?? null;
            $filterReport = $request->filter_report ?? true;

            if (empty($classroomId) && $filterReport == true) {
                return redirect()->back()->with('error', 'Please select class.');
            }

            if (!empty($classroomId)) {
                $subjects = $this->subjectRepository->getSubjectsByClassroomId($classroomId);
                $exams = $this->examRepository->getExamsByClassroomId($classroomId);

                if ($filterReport) {
                    $graphWeakerReportData = $this->classroomRepository->getGraphWeakerReport($classroomId, $examId, $subjectId);

                    if (count($graphWeakerReportData) > 0) {
                        $uniqueKeyMap = [];

                        foreach ($graphWeakerReportData as $studentData) {
                            $studentId = $studentData?->student_id;
                            $uniqueKey = $studentId . '-' . $studentData?->exam_id . '-' . $studentData?->subject_id;

                            if (!isset($graphWeakerReport[$studentId])) {
                                $graphWeakerReport[$studentId] = [
                                    'roll_no' => $studentData?->roll_no,
                                    'first_name' => $studentData?->first_name,
                                    'middle_name' => $studentData?->middle_name,
                                    'last_name' => $studentData?->last_name,
                                    'total_mark' => 0,
                                    'total_full_mark' => 0,
                                    'total_percentage' => 0,
                                ];
                            }

                            if (!in_array($uniqueKey, $uniqueKeyMap)) {
                                $uniqueKeyMap[] = $uniqueKey;

                                $graphWeakerReport[$studentId]['total_mark'] = ($graphWeakerReport[$studentId]['total_mark'] ?? 0) + ($studentData->mark ?? 0);
                                $graphWeakerReport[$studentId]['total_full_mark'] = ($graphWeakerReport[$studentId]['total_full_mark'] ?? 0) + ($studentData->full_mark ?? 0);
                            }
                        }
                    }

                    if (count($graphWeakerReport) > 0) {
                        $graphWeakerReport = collect($graphWeakerReport)->map(function ($reportData) {
                            $totalMark = $reportData['total_mark'] ?? 0;
                            $totalFullMark = $reportData['total_full_mark'] ?? 0;
                            $percentage = $this->calculatePercentage($totalMark, $totalFullMark);

                            $reportData['total_percentage'] = $percentage;

                            return $reportData;
                        })->sortBy('total_percentage')->values()->toArray();
                    }
                }
            }
        }

        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('AcademicReportGraph/Weaker', [
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'exams' => $exams,
            'graphWeakerReport' => $graphWeakerReport,
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

    /**
     * Display the schools.
     */

    public function calculateTotalMarksAndPercentage($report)
    {
        $total_mark = $report->marks->sum('mark');
        $report['total_mark'] = $total_mark;

        if ($total_mark > 0) {
            $report['total_percentage'] = number_format($total_mark / ($report->marks->count() * 100) * 100, 2);
        } else {
            $report['total_percentage'] = 0;
        }

        return $report;
    }

    public function toppers(Request $request)
    {
        $topperReport = [];
        $subjects = [];
        $exams = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $examId = $request->exam_id ?? null;
            $subjectId = $request->subject_id ?? null;
            $filterReport = $request->filter_report ?? true;

            if (empty($classroomId) && $filterReport == true) {
                return redirect()->back()->with('error', 'Please select class.');
            }

            if (!empty($classroomId)) {
                $subjects = $this->subjectRepository->getSubjectsByClassroomId($classroomId);
                $exams = $this->examRepository->getExamsByClassroomId($classroomId);

                if ($filterReport) {
                    $topperReportData = $this->classroomRepository->getTopperReportFilter($classroomId, $examId, $subjectId);

                    if (count($topperReportData) > 0) {
                        $uniqueKeyMap = [];

                        foreach ($topperReportData as $studentData) {
                            $studentId = $studentData?->student_id;
                            $uniqueKey = $studentId . '-' . $studentData?->exam_id . '-' . $studentData?->subject_id;

                            if (!isset($topperReport[$studentId])) {
                                $topperReport[$studentId] = [
                                    'roll_no' => $studentData?->roll_no,
                                    'first_name' => $studentData?->first_name,
                                    'middle_name' => $studentData?->middle_name,
                                    'last_name' => $studentData?->last_name,
                                    'total_mark' => 0,
                                    'total_full_mark' => 0,
                                    'total_percentage' => 0,
                                ];
                            }

                            if (!in_array($uniqueKey, $uniqueKeyMap)) {
                                $uniqueKeyMap[] = $uniqueKey;

                                $topperReport[$studentId]['total_mark'] = ($topperReport[$studentId]['total_mark'] ?? 0) + ($studentData->mark ?? 0);
                                $topperReport[$studentId]['total_full_mark'] = ($topperReport[$studentId]['total_full_mark'] ?? 0) + ($studentData->full_mark ?? 0);
                            }
                        }
                    }

                    if (count($topperReport) > 0) {
                        $topperReport = collect($topperReport)->map(function ($reportData) {
                            $totalMark = $reportData['total_mark'] ?? 0;
                            $totalFullMark = $reportData['total_full_mark'] ?? 0;
                            $percentage = $this->calculatePercentage($totalMark, $totalFullMark);

                            $reportData['total_percentage'] = $percentage;

                            return $reportData;
                        })->sortByDesc('total_percentage')->values()->toArray();
                    }
                }
            }
        }

        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('AcademicReportGraph/Toppers', [
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'exams' => $exams,
            'topperReport' => $topperReport,
        ]);
    }

    /**
     * subject wise overall.
     */
    public function subjectWiseOverall(Request $request): Response
    {
        $ranges = [
            ['min' => 0, 'max' => 32],
            ['min' => 33, 'max' => 45],
            ['min' => 46, 'max' => 60],
            ['min' => 61, 'max' => 75],
            ['min' => 76, 'max' => 90],
            ['min' => 91, 'max' => 100]
        ];
        $subjects = [];
        $exams = [];
        $markRanges = [];
        $percentageOverallReport = [];
        $markOverallReport = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;
            $subjectId = $request->subject_id ?? null;
            $examId = $request->exam_id ?? null;

            if (!empty($classroomId)) {
                $subjects = $this->subjectRepository->getSubjectsByClassroomId($classroomId);
                $exams = $this->examRepository->getExamsByClassroomId($classroomId);

                if (!empty($subjectId)) {
                    $examRoasters = $this->examRoasterRepository->getFilteredExamRoasters($classroomId, $subjectId, $examId);
                    $roasterFullMark = $examRoasters?->sum('full_mark') ?? 0;

                    $subjectWiseReportData = $this->StudentRepository->getSubjectWiseOverallReport($classroomId, $subjectId, $examId);

                    if (count($subjectWiseReportData) > 0) {
                        $subjectWiseReport = [];
                        $uniqueKeyMap = [];

                        if ($roasterFullMark > 0) {
                            $updatedTotalMark = $roasterFullMark;

                            while ($updatedTotalMark % 5 != 0) {
                                $updatedTotalMark++;
                            }

                            $markRanges = $this->generateMarkRanges($updatedTotalMark);
                        }

                        foreach ($subjectWiseReportData as $studentData) {
                            $studentId = $studentData?->student_id;
                            $uniqueKey = $studentId . '-' . $studentData?->exam_id . '-' . $studentData?->subject_id;

                            if (!isset($subjectWiseReport[$studentId])) {
                                $subjectWiseReport[$studentId] = [
                                    'total_mark' => 0,
                                    'total_full_mark' => 0,
                                    'total_percentage' => 0,
                                ];
                            }

                            if (!in_array($uniqueKey, $uniqueKeyMap)) {
                                $uniqueKeyMap[] = $uniqueKey;

                                $subjectWiseReport[$studentId]['total_mark'] = ($subjectWiseReport[$studentId]['total_mark'] ?? 0) + ($studentData->mark ?? 0);
                                $subjectWiseReport[$studentId]['total_full_mark'] = ($subjectWiseReport[$studentId]['total_full_mark'] ?? 0) + ($studentData->full_mark ?? 0);
                            }
                        }

                        if (count($subjectWiseReport) > 0) {
                            foreach ($subjectWiseReport as $reportData) {
                                $totalMark = $reportData['total_mark'] ?? 0;
                                $totalFullMark = $reportData['total_full_mark'] ?? 0;
                                $percentage = $this->calculatePercentage($totalMark, $totalFullMark);

                                foreach ($ranges as $index => $range) {
                                    if (!isset($percentageOverallReport[$index]['min'])) {
                                        $percentageOverallReport[$index]['min'] = $range['min'];
                                    }

                                    if (!isset($percentageOverallReport[$index]['max'])) {
                                        $percentageOverallReport[$index]['max'] = $range['max'];
                                    }

                                    if ($percentage >= $range['min'] && $percentage < $range['max']) {
                                        $percentageOverallReport[$index]['total_student'] = ($percentageOverallReport[$index]['total_student'] ?? 0) + 1;
                                    } else {
                                        $percentageOverallReport[$index]['total_student'] = $percentageOverallReport[$index]['total_student'] ?? 0;
                                    }
                                }

                                if (count($markRanges) > 0) {
                                    foreach ($markRanges as $index => $range) {
                                        if (!isset($markOverallReport[$index]['min'])) {
                                            $markOverallReport[$index]['min'] = $range['min'];
                                        }

                                        if (!isset($markOverallReport[$index]['max'])) {
                                            $markOverallReport[$index]['max'] = $range['max'];
                                        }

                                        if ($percentage >= $range['min'] && $percentage < $range['max']) {
                                            $markOverallReport[$index]['total_student'] = ($markOverallReport[$index]['total_student'] ?? 0) + 1;
                                        } else {
                                            $markOverallReport[$index]['total_student'] = $markOverallReport[$index]['total_student'] ?? 0;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('AcademicReportGraph/SubjectWiseOverall', [
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'exams' => $exams,
            'ranges' => $percentageOverallReport,
            'markRanges' => $markOverallReport
        ]);
    }

    protected function generateMarkRanges($totalMark)
    {
        $ranges = [];
        $step = $totalMark / 5;
        $currentMin = 0;

        for ($i = 0; $i < 5; $i++) {
            $currentMax = ($i == 4) ? $totalMark : $currentMin + $step;

            $ranges[] = ['min' => $i > 0 ? round($currentMin + 1) : round($currentMin), 'max' => round($currentMax)];
            $currentMin = $currentMax;
        }

        return $ranges;
    }

    public function subjectWiseOverallOld(Request $request): Response
    {

        $ranges = [
            ['min' => 0, 'max' => 33],
            ['min' => 33, 'max' => 45],
            ['min' => 45, 'max' => 60],
            ['min' => 60, 'max' => 80],
            ['min' => 80, 'max' => 90],
            ['min' => 90, 'max' => 100],
        ];

        $markRanges = [];

        if ($request->isMethod('post')) {
            $students = $this->StudentRepository->getSubjectWiseOverallFielter($request->classroom_id, $request->subject_id, $request->exam_id);

            if (count($students) > 0) {
                $rangeCounts = array_fill(0, count($ranges), 0);
                $totalStudents = 0;
                foreach ($students as $student) {
                    $totalStudents++;
                    $total_mark = $student->marks->sum('mark');
                    $student['total_mark'] = $total_mark;

                    // dd($student);

                    if ($total_mark > 0) {
                        $student['total_percentage'] = number_format($total_mark / ($student->marks->count() * 100) * 100, 2);
                    } else {
                        $student['total_percentage'] = 0;
                    }

                    foreach ($ranges as $index => $range) {
                        if ($student->total_percentage >= $range['min'] && $total_mark < $range['max']) {
                            $rangeCounts[$index]++;
                            $ranges[$index]['total_student'] = $rangeCounts[$index];
                        }
                    }
                }
                $markRanges = $this->calculateRangeCounts($students, $ranges);
            }
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

        return Inertia::render('AcademicReportGraph/SubjectWiseOverall', [
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'exams' => $exams,
            'ranges' => $ranges,
            'markRanges' => $markRanges
        ]);
    }

    protected function calculateRangeCounts($students, $ranges)
    {
        $rangeCounts = array_fill(0, count($ranges), 0);

        foreach ($students as $student) {
            $total_mark = $student->marks->sum('mark');

            foreach ($ranges as $index => $range) {
                if ($total_mark >= $range['min'] && $total_mark < $range['max']) {
                    $rangeCounts[$index]++;
                    $ranges[$index]['total_student'] = $rangeCounts[$index];
                }
            }
        }

        return $ranges;
    }

    /**
     * class wise over all.
     */
    public function classWiseOverall(Request $request): Response
    {
        $ranges = [
            ['min' => 0, 'max' => 33],
            ['min' => 33, 'max' => 45],
            ['min' => 45, 'max' => 60],
            ['min' => 60, 'max' => 75],
            ['min' => 75, 'max' => 90],
            ['min' => 90, 'max' => 100]
        ];
        $classWiseOverallReport = [];

        if ($request->isMethod('POST')) {
            $classroomId = $request->classroom_id ?? null;

            if (!empty($classroomId)) {
                $classWiseReportData = $this->StudentRepository->getClassWiseOverallReport($classroomId);

                if (count($classWiseReportData) > 0) {
                    $classWiseReport = [];
                    $uniqueKeyMap = [];

                    foreach ($classWiseReportData as $studentData) {
                        $studentId = $studentData?->student_id;
                        $uniqueKey = $studentId . '-' . $studentData?->exam_id . '-' . $studentData?->subject_id;

                        if (!isset($classWiseReport[$studentId])) {
                            $classWiseReport[$studentId] = [
                                'total_mark' => 0,
                                'total_full_mark' => 0,
                                'total_percentage' => 0,
                            ];
                        }

                        if (!in_array($uniqueKey, $uniqueKeyMap)) {
                            $uniqueKeyMap[] = $uniqueKey;

                            $classWiseReport[$studentId]['total_mark'] = ($classWiseReport[$studentId]['total_mark'] ?? 0) + ($studentData->mark ?? 0);
                            $classWiseReport[$studentId]['total_full_mark'] = ($classWiseReport[$studentId]['total_full_mark'] ?? 0) + ($studentData->full_mark ?? 0);
                        }
                    }

                    if (count($classWiseReport) > 0) {
                        foreach ($classWiseReport as $reportData) {
                            $totalMark = $reportData['total_mark'] ?? 0;
                            $totalFullMark = $reportData['total_full_mark'] ?? 0;
                            $percentage = $this->calculatePercentage($totalMark, $totalFullMark);

                            foreach ($ranges as $index => $range) {
                                // if ($percentage >= $range['min'] && $percentage < $range['max']) {
                                //     $ranges[$index]['total_student'] = ($ranges[$index]['total_student'] ?? 0) + 1;
                                // } else {
                                //     $ranges[$index]['total_student'] = $ranges[$index]['total_student'] ?? 0;
                                // }

                                if (!isset($classWiseOverallReport[$index]['min'])) {
                                    $classWiseOverallReport[$index]['min'] = $range['min'];
                                }

                                if (!isset($classWiseOverallReport[$index]['max'])) {
                                    $classWiseOverallReport[$index]['max'] = $range['max'];
                                }

                                if ($percentage >= $range['min'] && $percentage < $range['max']) {
                                    $classWiseOverallReport[$index]['total_student'] = ($classWiseOverallReport[$index]['total_student'] ?? 0) + 1;
                                } else {
                                    $classWiseOverallReport[$index]['total_student'] = $classWiseOverallReport[$index]['total_student'] ?? 0;
                                }
                            }
                        }
                    }
                }
            }
        }

        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('AcademicReportGraph/ClassWiseOverall', [
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'ranges' => $ranges,
            'classWiseOverallReport' => $classWiseOverallReport,
        ]);
    }

    public function classWiseOverallOld(Request $request): Response
    {

        $ranges = [
            ['min' => 0, 'max' => 33],
            ['min' => 33, 'max' => 45],
            ['min' => 45, 'max' => 60],
            ['min' => 60, 'max' => 80],
            ['min' => 80, 'max' => 90],
            ['min' => 90, 'max' => 100],
        ];

        if ($request->isMethod('post')) {
            $students = $this->StudentRepository->getActiveStudentFielter($request->classroom_id);
            $rangeCounts = array_fill(0, count($ranges), 0);
            $totalStudents = 0;

            foreach ($students as $student) {
                $totalStudents++;

                $total_mark = $student->marks->sum('mark');
                $student['total_mark'] = $total_mark;

                if ($total_mark > 0) {
                    $student['total_percentage'] = number_format($total_mark / ($student->marks->count() * 100) * 100, 2);
                } else {
                    $student['total_percentage'] = 0;
                }

                foreach ($ranges as $index => $range) {
                    if ($student->total_percentage >= $range['min'] && $total_mark < $range['max']) {
                        $rangeCounts[$index]++;

                        $ranges[$index]['total_student'] = $rangeCounts[$index];
                    }
                }
            }
        }

        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('AcademicReportGraph/ClassWiseOverall', [
            'subjects' => $subjects,
            'classrooms' => $classrooms,
            'ranges' => $ranges,
        ]);
    }
}
