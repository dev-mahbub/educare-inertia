<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Enums\VirtualExamMode;
use App\Enums\VirtualExamStatusType;
use App\Http\Requests\StoreVirtualExamAttemptRequest;
use App\Repositories\IStudentRepository;
use App\Repositories\ISubjectRepository;
use App\Repositories\IVirtualExamRepository;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class StudentOnlineExamController extends Controller
{
    public function __construct(
        private IStudentRepository $studentRepository,
        private ISubjectRepository $subjectRepository,
        private IVirtualExamRepository $virtualExamRepository,
    ) {
        //
    }

    /**
     * Display the online exam page with filtered data based on user role and request parameters.
     * 
     * This method handles both GET and POST requests to:
     * - Load students for parent users
     * - Get subjects for selected student/classroom
     * - Get virtual exams based on filters
     * - Format exam dates and times
     * 
     * @param Request $request The HTTP request object
     * @return Response Returns Inertia response with required data
     */
    public function index(Request $request): Response
    {
        // Initialize default values
        $students = collect([]);
        $subjects = collect([]);
        $virtualExams = collect([]);

        // Get request parameters (POST) or defaults (GET)
        $filters = [
            'studentId' => $request->isMethod('POST') ? $request->student_id : getStudentId(),
            'subjectId' => $request->isMethod('POST') ? $request->subject_id : null,
            'examMode' => $request->isMethod('POST') ? (string) $request->exam_mode : '',
            'examStatus' => $request->isMethod('POST') ? (string) $request->exam_status : '',
        ];

        // Load students if user is a parent
        $userRoles = getUserRoleArray() ?? [];
        if (in_array('Parent', $userRoles)) {
            $students = $this->loadStudentsForParent();

            // If no specific student is selected, use the first student's data
            if ($students->isNotEmpty() && empty($filters['studentId'])) {
                $this->loadStudentData($students->first(), $subjects, $virtualExams, $filters);
            }
        }

        // Load data for specific student if ID is provided
        if (!empty($filters['studentId'])) {
            $selectedStudent = $this->studentRepository->getStudentById($filters['studentId']);
            if ($selectedStudent && $selectedStudent->promotedClassroom) {
                // Update student classroom information
                $selectedStudent = $this->updateStudentClassroom($selectedStudent);
                $this->loadStudentData($selectedStudent, $subjects, $virtualExams, $filters);
            }
        }

        return Inertia::render('Student/OnlineExam', [
            'students' => $students,
            'studentId' => $filters['studentId'],
            'virtualExamModes' => buildEnumOptionsArray(VirtualExamMode::cases()),
            'virtualExamStatus' => buildEnumOptionsArray(VirtualExamStatusType::cases()),
            'subjects' => $subjects,
            'virtualExams' => $virtualExams,
        ]);
    }

    /**
     * Load and format students data for parent user
     */
    private function loadStudentsForParent(): Collection
    {
        return $this->studentRepository->getStudentsByParentUserId(auth()->user()->id)
            ->map(function ($student) {
                // Update classroom information if available
                if ($student?->latestClassroomStudent?->classroom) {
                    unset($student['classroom']);

                    if ($student->promotedClassroom) {
                        $student['classroom_id'] = $student->promotedClassroom->id;
                        $student['classTitle'] = $student->promotedClassroom->title;
                    }

                    $student['classroom_id'] = $student->latestClassroomStudent->class_name_id;
                    $student['classroom'] = $student->latestClassroomStudent->classroom;
                }

                // Load classroom roll information
                $classroomId = $student->classroom_id;
                $student->loadMissing([
                    'classroomRoll' => fn($query) => $query->where('classroom_id', $classroomId)
                        ->select('id', 'student_id', 'roll_no'),
                ]);

                // Format student full name
                $student['title'] = trim(implode(' ', array_filter([
                    $student->first_name ?? '',
                    $student->middle_name ?? '',
                    $student->last_name ?? ''
                ])));

                return $student;
            });
    }

    /**
     * Update student's classroom information
     */
    private function updateStudentClassroom($student)
    {
        if ($student->promotedClassroom) {
            unset($student['classroom']);
            $student['classroom_id'] = $student->promotedClassroom->id;
            $student['classroom'] = $student->promotedClassroom;
        }
        return $student;
    }

    /**
     * Load subjects and virtual exams for a student
     */
    private function loadStudentData($student, &$subjects, &$virtualExams, array $filters): void
    {
        if (!$student?->promotedClassroom?->id) {
            return;
        }

        // Load subjects for student's classroom
        $subjects = $this->subjectRepository->getSubjectsByClassroomId($student->promotedClassroom->id);

        $studentId = $student?->id ?? getStudentId();

        $virtualExams = $this->virtualExamRepository->getFilteredVirtualExams(
            $student->promotedClassroom->class_name_id,
            $filters['subjectId'],
            $filters['examMode'],
            '','',null,
            $filters['examStatus'],
            $studentId
        )?->map(function ($virtualExam) {
            return [
                ...$virtualExam->toArray(),
                'start_date' => $this->formatDateTime($virtualExam->start_date_at, 'd-m-Y'),
                'end_date' => $this->formatDateTime($virtualExam->end_date_at, 'd-m-Y'),
                'start_time' => $this->formatDateTime($virtualExam->start_time_at, 'H:i:s'),
                'end_time' => $this->formatDateTime($virtualExam->end_time_at, 'H:i:s'),
            ];
        }) ?? collect([]);
    }

    /**
     * Format date time or return empty string if null
     */
    private function formatDateTime(?string $dateTime, string $format): string
    {
        return !empty($dateTime) ? Carbon::parse($dateTime)->format($format) : '';
    }

    /**
     * This is the old implementation of the index method.
     */

    public function index_old(Request $request): Response
    {
        $userRoles = getUserRoleArray() ?? [];
        $students = [];
        $studentId = getStudentId();
        $subjects = [];
        $virtualExams = [];
        $subjectId = null;
        $examMode = '';
        $examStatus = null;


        if (in_array('Parent', $userRoles)) {
            $students = $this->studentRepository->getStudentsByParentUserId(auth()->user()->id);

            if (count($students) > 0) {
                $students = $students->map(function ($student) {
                    if ($student?->latestClassroomStudent?->classroom != null) {
                        if (!empty($student['classroom'])) {
                            unset($student['classroom']);
                        }

                        if ($student?->promotedClassroom != null) {
                            $student['classroom_id'] = $student->promotedClassroom->id;
                            $student['classTitle'] = $student?->promotedClassroom?->title;
                        }

                        $student['classroom_id'] = $student?->latestClassroomStudent?->class_name_id;
                        $student['classroom'] = $student?->latestClassroomStudent?->classroom;
                    }

                    $classroomId = $student?->classroom_id;

                    $student->loadMissing([
                        'classroomRoll' => function ($query) use ($classroomId) {
                            $query->where('classroom_id', $classroomId)
                                ->select(
                                    'id',
                                    'student_id',
                                    'roll_no',
                                );
                        },
                    ]);

                    $student['title'] = ($student->first_name ?? "") . " " . ($student->middle_name ?? "") . " " . ($student->last_name ?? "");

                    return $student;
                });
            }
        }

        if (count($students) > 0 && empty($studentId)) {
            $firstStudent = $students->first();

            if ($firstStudent?->promotedClassroom != null) {
                $subjects = $this->subjectRepository->getSubjectsByClassroomId($firstStudent?->promotedClassroom?->id);
                // get virtual exams
                $virtualExams = $this->virtualExamRepository->getFilteredVirtualExams(
                    $firstStudent?->promotedClassroom?->class_name_id,
                    $subjectId ?? null,
                    $examMode ?? '',
                )?->map(function ($virtualExam) {
                    $virtualExam['start_date'] = !empty($virtualExam->start_date_at) ? Carbon::parse($virtualExam->start_date_at)->format('d-m-Y') : '';
                    $virtualExam['end_date'] = !empty($virtualExam->end_date_at) ? Carbon::parse($virtualExam->end_date_at)->format('d-m-Y') : '';
                    $virtualExam['start_time'] = !empty($virtualExam->start_time_at) ? Carbon::parse($virtualExam->start_time_at)->format('H:i:s') : '';
                    $virtualExam['end_time'] = !empty($virtualExam->end_time_at) ? Carbon::parse($virtualExam->end_time_at)->format('H:i:s') : '';

                    return $virtualExam;
                });
            }
        }

        if ($request->isMethod('POST')) {
            $studentId = $request->student_id;
            $subjectId = $request->subject_id;
            $examMode = $request->exam_mode;
            $examStatus = $request->exam_status;
        }

        if (!empty($studentId)) {
            $selectedStudent = $this->studentRepository->getStudentById($studentId);
            $student = $selectedStudent;
            if ($selectedStudent?->promotedClassroom != null) {
                if (!empty($student['classroom'])) {
                    unset($student['classroom']);
                }

                $student['classroom_id'] = $student->promotedClassroom->id;
                $student['classroom'] = $student?->promotedClassroom;
            }

            if (!empty($student->promotedClassroom->id)) {
                $subjects = $this->subjectRepository->getSubjectsByClassroomId($student?->promotedClassroom?->id);
                // get virtual exams
                $virtualExams = $this->virtualExamRepository->getFilteredVirtualExams(
                    $student?->promotedClassroom?->class_name_id,
                    $subjectId ?? null,
                    $examMode ?? '',
                )?->map(function ($virtualExam) {
                    $virtualExam['start_date'] = !empty($virtualExam->start_date_at) ? Carbon::parse($virtualExam->start_date_at)->format('d-m-Y') : '';
                    $virtualExam['end_date'] = !empty($virtualExam->end_date_at) ? Carbon::parse($virtualExam->end_date_at)->format('d-m-Y') : '';
                    $virtualExam['start_time'] = !empty($virtualExam->start_time_at) ? Carbon::parse($virtualExam->start_time_at)->format('H:i:s') : '';
                    $virtualExam['end_time'] = !empty($virtualExam->end_time_at) ? Carbon::parse($virtualExam->end_time_at)->format('H:i:s') : '';

                    return $virtualExam;
                });
            }
        };

        // exam modes
        $virtualExamModes = buildEnumOptionsArray(VirtualExamMode::cases());
        //virtual exam status
        $virtualExamStatus = buildEnumOptionsArray(VirtualExamStatusType::cases());

        return Inertia::render('Student/OnlineExam', [
            'students' => $students,
            'studentId' => $studentId,
            'virtualExamModes' => $virtualExamModes,
            'virtualExamStatus' => $virtualExamStatus,
            'subjects' => $subjects,
            'virtualExams' => $virtualExams,
        ]);
    }

    /**
     * Get the student id from the session
     */
    public function studentOnlineExamAttempted(Request $request, $examId, $studentId)
    {
        $virtualExam = $this->virtualExamRepository->getVirtualExamById($examId);

        if (is_null($virtualExam)) {
            abort(404, 'Virtual exam not found');
        }
        try {
            $questionsData = json_decode($virtualExam->questions, true, 512, JSON_THROW_ON_ERROR);
        } catch (\JsonException $e) {
            Log::error('Failed to decode virtual exam questions', [
                'exam_id' => $examId,
                'error' => $e->getMessage()
            ]);
            abort(400, 'Invalid exam question format');
        }

        if (empty($questionsData)) {
            abort(400, 'No questions found in the exam');
        }

        // Extract and validate question IDs
        $questionIds = collect($questionsData)
            ->pluck('virtual_question_id')
            ->filter()
            ->map(fn($id) => (int) $id)
            ->unique()
            ->values()
            ->toArray();

        if (empty($questionIds)) {
            abort(400, 'No valid question IDs found');
        }

        // Process and structure the questions data
        $virtualExam->parsedQuestions = collect($questionsData)->map(function ($question) {
            return [
                'mark' => (float) ($question['mark'] ?? 0.0),
                'display_order' => (int) ($question['display_order'] ?? 0),
                'virtual_question_id' => (int) ($question['virtual_question_id'] ?? 0)
            ];
        })->sortBy('display_order')->values();

        // Fetch and validate virtual questions
        $virtualQuestions = $this->virtualExamRepository->getVirtualQuestionsByIds($questionIds);

        // Process and map the loaded questions
        $virtualExam->loadedQuestions = $virtualQuestions && $virtualQuestions->isNotEmpty()
            ? $virtualExam->parsedQuestions
            ->map(function ($parsedQuestion) use ($virtualQuestions) {
                $question = $virtualQuestions->firstWhere('id', $parsedQuestion['virtual_question_id']);

                if (!$question) {
                    return null;
                }

                return [
                    'id' => $question->id,
                    'title' => trim($question->title ?? ''),
                    'description' => trim($question->description ?? ''),
                    'options' => is_array($question->options) ? $question->options : [],
                    'mark' => $parsedQuestion['mark'],
                    'display_order' => $parsedQuestion['display_order'],
                    'correct_answer' => $question->correct_answer ?? null,
                    'question_type' => $question->question_type ?? null,
                    'question' => $question->question ?? null,
                    'answer_options' => !is_null($question->answer_options) 
                        ? json_decode($question->answer_options, true) ?? null 
                        : null,
                ];
            })
            ->filter()  // Remove null values
            ->values()  // Re-index array
            : collect([]);

        $student = $this->studentRepository->getStudentById($studentId);

        return Inertia::render('Student/OnlineExamAttempte', [
            'students' => $student,
            'virtualExam' => $virtualExam,
            'studentId' => $studentId,
        ]);
    }

    /**
     * Store the student's online exam attempt
     */
    
     public function store(StoreVirtualExamAttemptRequest $request)
     {
        try {

            $validatedData = $request->validated();

            $score = $this->calculateScore(
                $validatedData['virtual_exam_id'],
                $validatedData['answers']
            );

            // attempt data
            $attemptData = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'virtual_exam_id' => $validatedData['virtual_exam_id'],
                'student_id' => $validatedData['student_id'] ?? auth()->id(),
                'answers' => array_map(function($answer) {
                    return [
                        'question_id' => $answer['question_id'],
                        'question_type' => $answer['question_type'],
                        'answer' => $answer['answer'],
                        'submitted_at' => now(),
                        'time_taken' => $answer['time_taken'] ?? null,
                        'is_flagged' => $answer['is_flagged'] ?? false,
                        'is_reviewed' => false,
                        'review_comment' => null,
                        'marks' => $answer['marks'] ?? 0,
                    ];
                }, $validatedData['answers']),
                'attempt_number' => $this->getNextAttemptNumber(
                    $validatedData['virtual_exam_id'],
                    $validatedData['student_id'] ?? auth()->id()
                ),
                'score' => $score,
            ];

            $attempt = $this->virtualExamRepository->createOrUpdateVirtualExamAttemptData($attemptData);

            return redirect()->back()->with('message', 'Your attempt save successfully');

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to submit exam',
                'error' => $e->getMessage()
            ], 500);
            return redirect()->back()->with('error', 'Failed to submit exam');
        }
     }

    private function calculateScore($examId, $answers)
    {
        $exam = $this->virtualExamRepository->getById($examId);
        $score = 0;
       
        // Decode JSON string to array and convert to collection
        $questions = collect(json_decode($exam->questions, true));
        foreach ($answers as $answer) {
            $question = $questions->firstWhere('virtual_question_id', $answer['question_id']);
            
            if (!$question) continue;

            switch ($answer['question_type']) {
                case 'multiple_choice':
                case 'yes/no':
                    $score += $this->gradeObjectiveQuestion($question, $answer['answer']);
                    break;
                case 'multiple_selection':
                    $score += $this->gradeMultipleSelection($question, $answer['answer']);
                    break;
                case 'Descriptive':
                    $score += $this->gradeDescriptiveQuestion($question, $answer['answer']);
                    break;
                case 'Fill in the blanks':
                    $score += $this->gradeFillInBlanksQuestion($question, $answer['answer']);
                    break;
                    
                // Add other question types as needed
            }
        }

        return $score;
    }

    private function gradeObjectiveQuestion($question, $answer)
    {
        return $answer === $question->correct_answer ? $question->marks : 0;
    }

    private function gradeMultipleSelection($question, $answer)
    {
        $questionId = $question['virtual_question_id'] ?? null;

        $question = $this->virtualExamRepository->getVirtualQuestionById($questionId);

        $studentAnswers = explode(',', $answer);
        $correctAnswers = explode(',', $question->correct_answer);
        
        $correctCount = count(array_intersect($studentAnswers, $correctAnswers));
        $totalCorrect = count($correctAnswers);
        
        return ($correctCount / $totalCorrect) * $question->marks;
    }

    private function getNextAttemptNumber($examId, $studentId)
    {
        return $this->virtualExamRepository->getAttemptCount($examId, $studentId) + 1;
    }

    private function gradeDescriptiveQuestion($question, $answer)
    {
        if (empty($answer)) return 0;
        $questionId = $question['virtual_question_id'] ?? null;

        $question = $this->virtualExamRepository->getVirtualQuestionById($questionId);
        // If no answer provided

        // Get correct answer and keywords
        $modelAnswer = $question['answer'] ?? '';
        $keywords = $question['keywords'] ?? [];
        $maxMarks = $question['marks'] ?? 0;

        // If no model answer or keywords
        if (empty($modelAnswer) && empty($keywords)) {
            return 0; // Manual grading required
        }

        $score = 0;
        $answerLower = strtolower($answer);

        // Check for keywords
        if (!empty($keywords)) {
            $foundKeywords = 0;
            foreach ($keywords as $keyword) {
                if (str_contains($answerLower, strtolower($keyword))) {
                    $foundKeywords++;
                }
            }
            
            if (count($keywords) > 0) {
                $score = ($foundKeywords / count($keywords)) * $maxMarks;
            }
        }

        // Check similarity with model answer if no keywords defined
        else if (!empty($modelAnswer)) {
            $similarity = similar_text(
                strtolower($modelAnswer), 
                $answerLower, 
                $percentage
            );
            
            $score = ($percentage / 100) * $maxMarks;
        }

        return round($score, 2);
    }

    private function gradeFillInBlanksQuestion($question, $answer)
    {
        // If no answer provided
        if (empty($answer)) {
            return 0;
        }

        $mark = $question['mark'] ?? 0;
        $questionId = $question['virtual_question_id'] ?? null;
        
        // Get question details from repository
        $questionDetails = $this->virtualExamRepository->getVirtualQuestionById($questionId);
        
        // Get student answers array
        $studentAnswers = explode(',', $answer);
        
        // Get correct answers from question
        $correctAnswers = collect($questionDetails->answer_options ?? [])->pluck('answer')->toArray();
        
        // Count correct matches
        $correctCount = 0;
        foreach ($studentAnswers as $index => $studentAnswer) {
            if (isset($correctAnswers[$index]) && 
                strtolower(trim($studentAnswer)) === strtolower(trim($correctAnswers[$index]))) {
                $correctCount++;
            }
        }
        
        // Calculate partial score
        $totalBlanks = count($correctAnswers);
        if ($totalBlanks === 0) return 0;
        
        return ($correctCount / $totalBlanks) * $mark;
    }
}
