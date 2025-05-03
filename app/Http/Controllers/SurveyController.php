<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Enums\UserRole;
use Illuminate\Http\Request;
use App\Services\StudentService;
use App\Enums\SurveyAudienceType;
use App\Enums\SurveyQuestionType;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\SurveyRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Repositories\SurveyRepository;
use App\Repositories\ISurveyRepository;
use App\Repositories\StudentRepository;
use App\Http\Requests\SurveyUserRequest;
use App\Repositories\IStudentRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ClassroomRepository;
use App\Http\Requests\SurveyStatusRequest;
use App\Repositories\IClassroomRepository;
use App\Http\Requests\SurveyQuestionRequest;
use App\Http\Requests\SurveyResponseRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class SurveyController extends Controller
{

    public function __construct(
        private ISurveyRepository $surveyRepository,
        private IStudentRepository $studentRepository,
        private IClassroomRepository $classroomRepository,
        private StudentService  $studentService
    ) {
        $this->middleware('permission:view survey', ['only' => ['index', 'audiencewiseReport', 'surveyList', 'userSurveyList', 'takeSurveyPreview']]);
        $this->middleware('permission:add survey', ['only' => ['create', 'save', 'designSurvey', 'saveDesignSurvey', 'takeSurvey', 'saveTakeSurvey']]);
        $this->middleware('permission:edit survey', ['only' => ['edit', 'update', 'updateSurveyStatus']]);
        $this->middleware('permission:delete survey', ['only' => ['destroy']]);
    }

    /**
     * Display Surveys
     */
    public function index(): Response
    {
        $surveys = $this->surveyRepository->getActiveAll();

        return Inertia::render('Survey/Show', [
            'surveys' => $surveys,
        ]);
    }

    /**
     * Create Survey
     */
    public function create(): Response
    {
        $classNamesDataArr = $this->classroomRepository->getActiveNameAndId();

        $classNamesData = $classNamesDataArr->map(fn ($classData) => ['id' => $classData->id, 'title' => $classData->title])->all();

        // types
        $surveyType = SurveyAudienceType::cases();
        $surveyAudience = array();

        foreach ($surveyType as $sType) {
            array_push($surveyAudience, ['id' => $sType->value, 'title' => $sType->value]);
        }

        return Inertia::render('Survey/Create', [
            'surveyAudience' => $surveyAudience,
            'classNamesData' => $classNamesData,
        ]);
    }

    /**
     * Save Survey.
     */
    public function save(SurveyRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = array(
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'created_by' => auth()->user()->id,
                'title' => $input['title'] ?? '',
                'description' => $input['description'] ?? '',
                'instructions_desc' => $input['instructions_desc'] ?? '',
                'survey_audience' => $input['survey_audience'] ?? '',
                'is_published' => $input['is_published'] ?? false,
                'status' => Status::ACTIVE,
            );

            $survey = $this->surveyRepository->create($dataArray);

            if ($input['survey_audience'] == SurveyAudienceType::STUDENT->value && !empty($input['class_name_ids'])) {
                foreach ($input['class_name_ids'] as $class) {
                    $classArray = array(
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'survey_id' => $survey->id,
                        'class_name_id' => $class['class_name_id'],
                        'status' => Status::ACTIVE,
                    );

                    $this->surveyRepository->createSurveyClass($classArray);
                }
            }

            DB::commit();

            return redirect()->route('survey.list')->with('message', 'Survey created successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('errors', 'Something goes wrong.');
        }
    }

    /**
     * Edit Survey
     */
    public function edit(int $id): Response
    {
        $survey = $this->surveyRepository->getSurveyById($id);

        abort_if(empty($survey), 404);

        $classNamesDataArr = $this->classroomRepository->getActiveNameAndId();

        $classNamesData = $classNamesDataArr->map(fn ($classData) => ['id' => $classData->id, 'title' => $classData->title])->all();

        // types
        $surveyType = SurveyAudienceType::cases();
        $surveyAudience = array();

        foreach ($surveyType as $sType) {
            array_push($surveyAudience, ['id' => $sType->value, 'title' => $sType->value]);
        }

        return Inertia::render('Survey/Edit', [
            'surveyAudience' => $surveyAudience,
            'classNamesData' => $classNamesData,
            'survey' => $survey,
        ]);
    }

    /**
     * Update Survey.
     */
    public function update(int $id, SurveyRequest $request): RedirectResponse
    {
        $survey = $this->surveyRepository->getSurveyById($id);

        abort_if(empty($survey), 404);

        $input = $request->validated();

        DB::beginTransaction();

        try {
            $dataArray = array(
                'title' => $input['title'] ?? '',
                'description' => $input['description'] ?? null,
                'instructions_desc' => $input['instructions_desc'] ?? null,
                'survey_audience' => $input['survey_audience'] ?? '',
                'is_published' => $input['is_published'] ?? false,
            );

            $this->surveyRepository->update($id, $dataArray);

            if ($input['survey_audience'] == SurveyAudienceType::STUDENT->value && !empty($input['class_name_ids'])) {
                $currentClassNameIds = $survey?->surveyClasses?->pluck('class_name_id')?->toArray();
                $newClassNameIds = !empty($input['class_name_ids']) ? $input['class_name_ids'] : [];

                $idsToUpdate = array_diff($newClassNameIds, $currentClassNameIds);
                $idsToDelete = array_diff($currentClassNameIds, $newClassNameIds);

                $this->surveyRepository->deleteSurveyClassesByIds($id, $idsToDelete);

                if (!empty($idsToUpdate)) {
                    $attributesToCheck = [
                        'school_id' => getUserSchoolId(),
                        'academic_year_id' => getAcademicYearId(),
                        'survey_id' => $id,
                    ];

                    foreach ($idsToUpdate as $classNameId) {
                        $attributesToCheck['class_name_id'] = $classNameId;

                        $valuesToUpdate = [
                            'status' => Status::ACTIVE
                        ];

                        $this->surveyRepository->updateOrCreateSurveyClass($attributesToCheck, $valuesToUpdate);
                    }
                }
            } else {
                if ($survey?->surveyClasses?->count() > 0) {
                    $survey->surveyClasses->each(function ($surveyClass) {
                        $surveyClass->delete();
                    });
                }
            }

            DB::commit();

            return redirect()->route('survey.survey_list')->with('message', 'Survey updated successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('errors', 'Something goes wrong.');
        }
    }

    /**
     * Delete Survey
     */
    public function destroy(int $id): RedirectResponse
    {
        $survey = $this->surveyRepository->getSurveyById($id);

        abort_if(empty($survey), 404);

        DB::beginTransaction();

        try {
            // delete survey class
            if ($survey?->surveyClasses?->count() > 0) {
                $survey->surveyClasses->each(function ($surveyClass) {
                    $surveyClass->delete();
                });
            }

            // delete survey question
            if ($survey?->surveyQuestions?->count() > 0) {
                $survey->surveyQuestions->each(function ($question) {
                    $question->delete();
                });
            }

            // delete survey respons
            if ($survey?->surveyResponses?->count() > 0) {
                $survey->surveyResponses->each(function ($surveyResponse) {
                    $surveyResponse->delete();
                });
            }

            // delete survey
            $survey->delete();

            DB::commit();

            return redirect()->back()->with('message', 'Survey Deleted Successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }

    /**
     * Display the design survey form.
     */
    public function designSurvey(Request $request): Response
    {
        $survey = null;
        $surveyId = $request->survey_id ?? null;

        if ($surveyId != null) {
            $survey = $this->surveyRepository->getSurveyById($surveyId);
        }

        if ($survey != null && $survey?->surveyQuestions?->count() > 0) {
            $survey->surveyQuestions->transform(function ($surveyQuestion) {
                $surveyQuestion['options'] = !empty($surveyQuestion['options']) ? json_decode($surveyQuestion['options']) : [];

                return $surveyQuestion;
            });
        }

        $questionTypes = buildEnumOptionsArray(SurveyQuestionType::cases());

        return Inertia::render('Survey/DesignSurvey', [
            'questionTypes' => $questionTypes,
            'survey' => $survey,
        ]);
    }

    /**
     * Save Design Survey
     */
    public function saveDesignSurvey(SurveyQuestionRequest $request): RedirectResponse
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $idsToUpdate = [];
            $questions = [];

            if (!empty($input['questions'])) {
                $questions = array_map(function ($question) {
                    if (isset($question['rangeStatus'])) {
                        unset($question['rangeStatus']);
                    }

                    if (isset($question['titleError'])) {
                        unset($question['titleError']);
                    }

                    if (isset($question['questionTypeError'])) {
                        unset($question['questionTypeError']);
                    }

                    return $question;
                }, $input['questions']);
            }

            if (!empty($questions)) {
                foreach ($questions as $question) {
                    if (!empty($question['id'])) {
                        array_push($idsToUpdate, $question['id']);

                        $dataArray = [
                            'title' => $question['title'] ?? "",
                            'question_category' => !empty($question['question_category']) ? $question['question_category'] : null,
                            'question_type' => $question['question_type'] ?? "",
                            'options' => !empty($question['options']) ? json_encode($question['options']) : null,
                            'is_required_field' => $question['is_required_field'] ?? false,
                            'range_start' => $question['range_start'] ?? null,
                            'range_end' => $question['range_end'] ?? null,
                        ];

                        $this->surveyRepository->updateSurveyQuestion($question['id'], $dataArray);
                    } else {
                        $dataArray = [
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => getAcademicYearId(),
                            'survey_id' => $input['survey_id'],
                            'title' => $question['title'] ?? "",
                            'question_category' => !empty($question['question_category']) ? $question['question_category'] : null,
                            'question_type' => $question['question_type'] ?? "",
                            'options' => !empty($question['options']) ? json_encode($question['options']) : null,
                            'is_required_field' => $question['is_required_field'] ?? false,
                            'range_start' => $question['range_start'] ?? null,
                            'range_end' => $question['range_end'] ?? null,
                            'status' => Status::ACTIVE
                        ];

                        $surveyQuestion = $this->surveyRepository->createSurveyQuestion($dataArray);

                        array_push($idsToUpdate, $surveyQuestion->id);
                    }
                }
            }

            $currentQuestions = $this->surveyRepository->getSurveyQuestionsBySurveyId($input['survey_id']);
            $currentQuestionIds = $currentQuestions?->pluck('id')?->toArray();
            $idsToDelete = array_diff($currentQuestionIds, $idsToUpdate);

            if (!empty($idsToDelete)) {
                $this->surveyRepository->deleteSurveyQuestionByIds($idsToDelete);
            }

            DB::commit();

            return redirect()->back()->with('message', 'Questions added successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('errors', 'Something goes wrong.');
        }
    }

    /**
     * Display the take survey form.
     */
    public function takeSurvey(int $id): Response
    {
        $survey = $this->surveyRepository->getSurveyById($id);

        abort_if(empty($survey), 404);

        if ($survey?->surveyQuestions?->count() > 0) {
            $survey->surveyQuestions->transform(function ($surveyQuestion) {
                $surveyQuestion['options'] = !empty($surveyQuestion['options']) ? json_decode($surveyQuestion['options']) : [];

                return $surveyQuestion;
            });
        }

        return Inertia::render('Survey/TakeSurvey', [
            'survey' => $survey,
        ]);
    }

    /**
     * Save Take Survey
     */
    public function saveTakeSurvey(int $id, SurveyResponseRequest $request): RedirectResponse
    {
        $survey = $this->surveyRepository->getSurveyById($id);

        abort_if(empty($survey), 404);

        $input = $request->validated();

        $responseData = null;

        if (!empty($input['response'])) {
            $responseData = array_map(function ($response) {
                $answer = $response['answer'] ?? "";

                if ($response['question_type'] == SurveyQuestionType::DATE->value) {
                    $answer = !empty($response['answer']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $response['answer'])->timezone(getSchoolTimeZone())->format('Y-m-d H:i:s') : "";
                }

                return [
                    'survey_question_id' => $response['survey_question_id'],
                    'answer' => $answer,
                ];
            }, $input['response']);
        }

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'survey_id' => $id,
            'user_id' => auth()->user()->id,
            'response' => !empty($responseData) ? json_encode($responseData) : null,
            'status' => Status::ACTIVE,
        );

        $surveyResponse = $this->surveyRepository->createSurveyResponse($dataArray);

        if ($surveyResponse) {
            return redirect()->route('survey.user_survey_list')->with('message', 'Survey taken successfully');
        }

        return redirect()->back()->with('errors', 'Something goes wrong.');
    }

    /**
     * Update Survey Status.
     */
    public function updateSurveyStatus(int $id, SurveyStatusRequest $request): RedirectResponse
    {
        $survey = $this->surveyRepository->getSurveyById($id);

        abort_if(empty($survey), 404);

        if ($survey?->surveyQuestions?->count() == 0) {
            return redirect()->back()->with('errors', 'Survey has no questions');
        }

        $isOpen = !empty($request->is_open) ? $request->is_open : false;

        if ($isOpen) {
            $dataArray = array(
                'opened_by' => auth()->user()->id,
                'opened_date' => date('Y-m-d H:i:s'),
                'is_open' => $isOpen,
            );

            $message = "Survey opened successfully";
        } else {
            $dataArray = array(
                'closed_by' => auth()->user()->id,
                'closed_date' => date('Y-m-d H:i:s'),
                'is_open' => $isOpen,
            );

            $message = "Survey closed successfully";
        }

        $updateStatus =  $this->surveyRepository->update($id, $dataArray);

        if ($updateStatus) {
            return redirect()->route('survey.list')->with('message', $message);
        }

        return redirect()->back()->with('errors', 'Something goes wrong.');
    }

    /**
     * Display audience wise survey report.
     */
    public function audiencewiseReport(Request $request): Response
    {
        $audienceTypes = buildEnumOptionsArray(SurveyAudienceType::cases());
        $audienceType = "";

        if ($request->isMethod('POST')) {
            $audienceType = $request->audience_type ?? "";
        }

        $surveys = $this->surveyRepository->getAudienceWiseSurveyReports($audienceType);

        if (count($surveys) > 0) {
            $surveys = $surveys->map(function ($survey) {
                $survey['opened_date'] = !empty($survey->opened_date) ? Carbon::parse($survey->opened_date)->format('d M, Y') : "";
                $survey['closed_date'] = !empty($survey->closed_date) ? Carbon::parse($survey->closed_date)->format('d M, Y') : "";
                $survey['total_participants'] = $survey?->surveyResponses?->count();

                return $survey;
            });
        }

        return Inertia::render('Survey/AudiencewiseReport', [
            'surveys' => $surveys,
            'audienceTypes' => $audienceTypes,
        ]);
    }

    /**
     * Display Survey Lists.
     */
    public function surveyList(): Response
    {
        $audienceType = $this->getAudienceType(auth()->user()->role);

        $surveys = $this->surveyRepository->getActiveSurveyLists($audienceType);

        if (count($surveys) > 0) {
            $surveys = $surveys->map(function ($survey) {
                $survey['created_on'] = !empty($survey->created_at) ? Carbon::parse($survey->created_at)->format('d M, Y') : "";

                return $survey;
            });
        }

        return Inertia::render('Survey/SurveyList', [
            'surveys' => $surveys
        ]);
    }

    /**
     * Display User Survey Lists.
     */
    public function userSurveyList(): Response
    {
        $audienceType = $this->getAudienceType(auth()->user()->role);

        $surveys = $this->surveyRepository->getUserSurveyLists($audienceType);

        if (count($surveys) > 0) {
            $surveys = $surveys->map(function ($survey) {
                $survey['opened_date'] = !empty($survey->opened_date) ? Carbon::parse($survey->opened_date)->format('d M, Y H:i:s A') : "";

                return $survey;
            });
        }

        return Inertia::render('Survey/UserSurveyList', [
            'surveys' => $surveys
        ]);
    }

    /**
     * Display User Take Survey Preview .
     */
    public function takeSurveyPreview(int $id): Response
    {
        $survey = $this->surveyRepository->getSurveyById($id);

        abort_if(empty($survey), 404);

        if ($survey?->surveyQuestions?->count() > 0) {
            $survey->surveyQuestions->transform(function ($surveyQuestion) {
                $surveyQuestion['options'] = !empty($surveyQuestion['options']) ? json_decode($surveyQuestion['options']) : [];

                return $surveyQuestion;
            });
        }

        return Inertia::render('Survey/TakeSurveyPreview', [
            'survey' => $survey
        ]);
    }

    /**
     * Helper method to get Audience Type based on User Role.
     */
    protected function getAudienceType($userRole): string
    {
        switch ($userRole) {
            case UserRole::SITE_TEACHER->value:
                return SurveyAudienceType::TEACHER->value;
            case UserRole::SITE_PARENT->value:
                return SurveyAudienceType::PARENT->value;
            case UserRole::SITE_STUDENT->value:
                return SurveyAudienceType::STUDENT->value;
            default:
                return "";
        }
    }

    /**
     * Student Survey List
    */
    public function studentSurveyList(Request $request)
    {
        $userRoles = getUserRoleArray() ?? [];
        $students = $this->studentService->getParentStudents($userRoles);
        $studentId = getStudentId();
        $surveyList = [];

        $surveyList = $this->surveyRepository->getStudentAndParentSurveyList();

        if (count($surveyList) > 0) {
            $surveyList = $surveyList->map(function ($survey) {
                $survey['opened_date'] = !empty($survey->opened_date) ? Carbon::parse($survey->opened_date)->format('d M, Y H:i:s A') : "";

                return $survey;
            });
        }

        return Inertia::render('Student/SurveyList', [
            'students' => $students,
            'studentId' => $studentId,
            'surveyList' => $surveyList,
        ]);
    }

    /**
     * Display the take Student survey form.
     */
    public function studentTakeSurvey(int $id): Response
    {
        $survey = $this->surveyRepository->getSurveyById($id);

        abort_if(empty($survey), 404);

        if ($survey?->surveyQuestions?->count() > 0) {
            $survey->surveyQuestions->transform(function ($surveyQuestion) {
                $surveyQuestion['options'] = !empty($surveyQuestion['options']) ? json_decode($surveyQuestion['options']) : [];

                return $surveyQuestion;
            });
        }

        return Inertia::render('Student/TakeSurvey', [
            'survey' => $survey,
        ]);
    }

    /**
     * Save Take Survey
     */
    public function studentSaveTakeSurvey(int $id, SurveyResponseRequest $request): RedirectResponse
    {
        $survey = $this->surveyRepository->getSurveyById($id);

        abort_if(empty($survey), 404);

        $input = $request->validated();

        $responseData = null;

        if (!empty($input['response'])) {
            $responseData = array_map(function ($response) {
                $answer = $response['answer'] ?? "";

                if ($response['question_type'] == SurveyQuestionType::DATE->value) {
                    $answer = !empty($response['answer']) ? Carbon::createFromFormat('Y-m-d\TH:i:s.vp', $response['answer'])->timezone(getSchoolTimeZone())->format('Y-m-d H:i:s') : "";
                }

                return [
                    'survey_question_id' => $response['survey_question_id'],
                    'answer' => $answer,
                ];
            }, $input['response']);
        }

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'survey_id' => $id,
            'user_id' => auth()->user()->id,
            'response' => !empty($responseData) ? json_encode($responseData) : null,
            'status' => Status::ACTIVE,
        );

        $surveyResponse = $this->surveyRepository->createSurveyResponse($dataArray);

        if ($surveyResponse) {
            return redirect()->route('student_survey.list')->with('message', 'Survey taken successfully');
        }

        return redirect()->back()->with('errors', 'Something goes wrong.');
    }
}
