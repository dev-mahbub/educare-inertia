<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Enums\Status;
use Inertia\Response;
use App\Models\Classroom;
use App\Enums\GroupingType;
use Illuminate\Http\Request;
use App\Enums\ConversionType;
use App\Enums\CalculationType;
use App\Http\Requests\ExamGroup;
use App\Http\Requests\ResultCard;
use Illuminate\Support\Facades\DB;
use App\Repositories\ExamRepository;
use Illuminate\Support\Facades\Auth;
use App\Enums\CalculationPerformType;
use App\Http\Requests\SubjectSummary;
use App\Repositories\BoardRepository;
use App\Repositories\IExamRepository;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\ResultCardThree;
use App\Repositories\IBoardRepository;
use App\Http\Requests\ExamGroupRequest;
use App\Http\Requests\ResultCardConfigurationRequest;
use App\Repositories\SubjectRepository;
use App\Http\Requests\ResultCardRequest;
use App\Models\ResultCardConfiguration;
use App\Repositories\ISubjectRepository;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\ClassroomRepository;
use App\Repositories\IClassroomRepository;
use App\Repositories\IExamGroupRepository;
use App\Repositories\IImageRepository;
use App\Repositories\ResultCardRepository;
use App\Repositories\IResultCardRepository;
use App\Repositories\IResultCardConfigurationRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class ResultCardController extends Controller
{
    private $_upload;

    public function __construct(
        private IResultCardRepository $resultCardRepository,
        private IExamRepository $examRepository,
        private IBoardRepository $boardRepository,
        private ISubjectRepository $subjectRepository,
        private IClassroomRepository $classroomRepository,
        private IExamGroupRepository $examGroupRepository,
        private IResultCardConfigurationRepository $resultCardConfigurationRepository,
        private IImageRepository $imageRepository
    ) {
        $this->_upload = new UploadFileController();
        $this->middleware('permission:view certificate', ['only' => ['resultCardConfiguration', 'resultCardExamGrouping', 'resultCardPublish']]);
        $this->middleware('permission:add certificate', ['only' => [
            'saveResultCardConfiguration',
            'resultCardExamGroupSave',
            'saveExamGroupBoardLogo',
            'saveStepTwoData',
            'saveStepThreeData',
            'saveStepThreeGroupData',
            'saveStepFourData'
        ]]);
        $this->middleware('permission:edit certificate', ['only' => ['updateResultCardConfiguration', 'resultCardExamGroupEdit']]);
        $this->middleware('permission:delete certificate', ['only' => ['deleteResultCardConfiguration', 'resultCardExamGroupDelete']]);
    }

    /**
     * Display result card configuration
     */
    public function resultCardConfiguration(): Response
    {
        $boards = $this->boardRepository->getCurrentSchoolActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $exams = $this->examRepository->getActiveAll();
        $classNames = $this->classroomRepository->getSessionWiseActiveClassNameAll();

        // need to remove this
        $ruleTypeData = $this->classroomRepository->gellAllRuleType();

        // get result card configurations
        $resultCardConfigurationLists = $this->resultCardConfigurationRepository->getActiveAll();
        $resultCardConfigurationClassNameIds = [];

        // get result card configurations class name ids
        if (count($resultCardConfigurationLists) > 0) {
            $resultCardConfigurationLists->loadMissing(['configurationClassNames', 'classNames:class_names.id,class_names.title', 'exam:id,title']);

            $resultCardConfigurationLists?->each(function ($resultCardConfiguration) use (&$resultCardConfigurationClassNameIds) {
                $resultCardConfiguration?->configurationClassNames?->each(function ($configurationClassName) use (&$resultCardConfigurationClassNameIds) {
                    array_push($resultCardConfigurationClassNameIds, $configurationClassName?->class_name_id);
                });
            });

            $resultCardConfigurationLists = $resultCardConfigurationLists->map(function ($resultCardConfiguration) {
                $resultCardConfiguration['class_name_titles'] = "";

                if (!empty($resultCardConfiguration?->classNames)) {
                    $classNameTitleArray = $resultCardConfiguration->classNames->pluck('title')->toArray();
                    $resultCardConfiguration['class_name_titles'] = implode(', ', $classNameTitleArray);
                }

                return $resultCardConfiguration;
            });
        }

        $resultCardConfigurationClassNameIds = array_unique($resultCardConfigurationClassNameIds);

        $ruleTypes = [
            [
                'id' => 'Progress Report',
                'title' => 'Progress Report',
            ],
            [
                'id' => 'Progress Report 2',
                'title' => 'Progress Report 2',
            ],
            [
                'id' => 'Progress Report 3',
                'title' => 'Progress Report 3',
            ],
            [
                'id' => 'Progress Report 4',
                'title' => 'Progress Report 4',
            ],
        ];

        return Inertia::render('ResultCard/ResultCardConfiguration', [
            'exams' => $exams,
            'boards' => $boards,
            'subjects' => $subjects,
            'classNames' => $classNames,
            'dummyData' => $ruleTypeData,
            'resultCardConfigurationLists' => $resultCardConfigurationLists,
            'resultCardConfigurationClassNameIds' => $resultCardConfigurationClassNameIds,
            'ruleTypes' => $ruleTypes
        ]);
    }

    /*
    *  save result card configuration
    */
    public function saveResultCardConfiguration(ResultCardConfigurationRequest $request)
    {
        $input = $request->validated();

        DB::beginTransaction();

        try {
            $ruleType = $input['rule_type'] ?? "";
            $title = !empty($input['rule_type']) ? implode("_", explode(' ', $ruleType)) : "";

            $attributesToCheck = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'board_id' => $input['board_id'] ?? null,
                'rule_type' => $ruleType ?? "",
            ];

            $valuesToUpdate = [
                'exam_id' => $input['exam_id'] ?? null,
                'title' => $title,
                'attendance_type' => $input['attendance_type'] ?? "",
                'status' => Status::ACTIVE,
            ];

            // update or create configuration
            $resultCardConfiguration = $this->resultCardConfigurationRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);

            // update or create configuration class names
            if (!empty($input['class_name_ids'])) {
                foreach ($input['class_name_ids'] as $classNameId) {
                    $resultCardConfiguration->configurationClassNames()->updateOrCreate(
                        [
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => getAcademicYearId(),
                            'result_card_configuration_id' => $resultCardConfiguration->id,
                            'class_name_id' => $classNameId,
                        ],
                        [
                            'status' => Status::ACTIVE,
                        ]
                    );
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Configuration saved successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }


    /*
    *  update result card configuration
    */
    public function updateResultCardConfiguration(int $id, ResultCardConfigurationRequest $request)
    {
        $input = $request->validated();

        $resultCardConfiguration = $this->resultCardConfigurationRepository->getConfigurationById($id);

        abort_if(empty($resultCardConfiguration), 404);

        DB::beginTransaction();

        try {
            $resultCardConfiguration->loadMissing('configurationClassNames');

            $ruleType = $input['rule_type'] ?? "";
            $title = !empty($input['rule_type']) ? implode("_", explode(' ', $ruleType)) : "";

            $dataArray = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'board_id' => $input['board_id'] ?? null,
                'rule_type' => $ruleType ?? "",
                'exam_id' => $input['exam_id'] ?? null,
                'title' => $title,
                'attendance_type' => $input['attendance_type'] ?? "",
                'status' => Status::ACTIVE,
            ];

            // update configuration
            $resultCardConfiguration->update($dataArray);

            // remove configuration class names not present in the input
            if (!empty($resultCardConfiguration?->configurationClassNames)) {
                $currentClassNameIds = $resultCardConfiguration->configurationClassNames->pluck('class_name_id')->toArray();
                $classNameIdsToRemove = array_diff($currentClassNameIds, $input['class_name_ids']);

                if (!empty($classNameIdsToRemove)) {
                    $resultCardConfiguration->configurationClassNames()
                        ->whereIn('class_name_id', $classNameIdsToRemove)
                        ->delete();
                }
            }

            // update or create configuration class names
            if (!empty($input['class_name_ids'])) {
                foreach ($input['class_name_ids'] as $classNameId) {
                    $resultCardConfiguration->configurationClassNames()->updateOrCreate(
                        [
                            'school_id' => getUserSchoolId(),
                            'academic_year_id' => getAcademicYearId(),
                            'result_card_configuration_id' => $resultCardConfiguration->id,
                            'class_name_id' => $classNameId,
                        ],
                        [
                            'status' => Status::ACTIVE,
                        ]
                    );
                }
            }

            DB::commit();

            return redirect()->back()->with('message', 'Configuration saved successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }


    /*
    *  delete result card configuration
    */
    public function deleteResultCardConfiguration(int $id)
    {
        $resultCardConfiguration = $this->resultCardConfigurationRepository->getConfigurationById($id);

        abort_if(empty($resultCardConfiguration), 404);

        DB::beginTransaction();

        try {
            // update configuration status to deleted
            $resultCardConfiguration->update([
                'status' => Status::DELETED,
            ]);

            // delete configuration class names
            $resultCardConfiguration->configurationClassNames()->delete();

            DB::commit();

            return redirect()->back()->with('message', 'Configuration Removed successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }


    /**
     * Show Result Card Exam Group
     */
    public function resultCardExamGrouping(Request $request): Response
    {
        $exams = $this->examRepository->getActiveAll();
        $groupingTypes = buildEnumOptionsArray(GroupingType::cases());
        $conversionType = buildEnumOptionsArray(ConversionType::cases());
        $calculationType = buildEnumOptionsArray(CalculationType::cases());
        $calculationPerform = buildEnumOptionsArray(CalculationPerformType::cases());
        $reportCardTypes = $this->resultCardConfigurationRepository->getActiveAll();
        $examGroups = [];

        if ($request->isMethod('POST')) {
            if (!empty($request->report_card_type)) {
                $examGroups = $this->examGroupRepository->getActiveAllByReportCardId($request->report_card_type);

                if (count($examGroups) > 0) {
                    $examGroups->loadMissing(['parentGroup:id,parent,title', 'childrenGroups:id,parent,title']);
                }
            }
        }

        return Inertia::render('ResultCard/ResultCardExamGrouping', [
            'exams' => $exams,
            'groupingTypes' => $groupingTypes,
            'conversionType' => $conversionType,
            'calculationType' => $calculationType,
            'calculationPerform' => $calculationPerform,
            'reportCardTypes' => $reportCardTypes,
            'examGroups' => $examGroups,
        ]);
    }

    /**
     * Save Result Card Exam Group
     */
    public function resultCardExamGroupSave(ExamGroupRequest $request)
    {
        $input = $request->validated();

        $dataArray = array(
            'school_id' => getUserSchoolId(),
            'academic_year_id' => getAcademicYearId(),
            'academic_progress_report_id' => null,
            'result_card_configuration_id' => $input['report_card_type'] ?? null,
            'parent' => !empty($input['parent']) ? $input['parent'] : null,
            'title' => $input['title'] ?? null,
            'display_order' => !empty($input['display_order']) ? $input['display_order'] : 0,
            'is_exam' => $input['is_exam'] ?? false,
            'exam_id' => !empty($input['exam_id']) ? $input['exam_id'] : null,
            'is_grand_total_row_to_be_show' => $input['is_grand_total_row_to_be_show'] ?? false,
            'is_grand_percentage_row_to_be_show' => $input['is_grand_percentage_row_to_be_show'] ?? false,
            'is_grand_grade_row_to_be_show' => $input['is_grand_grade_row_to_be_show'] ?? false,
            'is_exam_marks_to_be_added_in_grand_total' => $input['is_exam_marks_to_be_added_in_grand_total'] ?? false,
            'grouping_type' => $input['grouping_type'] ?? null,
            'conversion_type' => $input['conversion_type'] ?? null,
            'calculation_perform' => $input['calculation_perform'] ?? null,
            'calculation_type' => $input['calculation_type'] ?? null,
            'weightage' => $input['weightage'] ?? null,
            'affiliated_title' => $input['affiliated_title'] ?? null,
            'show_children' => $input['show_children'] ?? false,
            'is_rank_to_be_given' => $input['is_rank_given'] ?? false,
            'show_total' => $input['show_total'] ?? false,
            'show_affiliation_no' => $input['show_affiliation_no'] ?? false,
            'show_school_code' => $input['show_school_code'] ?? false,
            'show_date_of_birth' => $input['show_date_of_birth'] ?? false,
            'show_print_date' => $input['show_print_date'] ?? false,
            'show_cbse_logo' => $input['show_cbse_logo'] ?? false,
            'show_icse_logo' => $input['show_icse_logo'] ?? false,
            'show_grading_scale' => $input['show_grading_scale'] ?? false,
            'show_optional_subject' => $input['show_optional_subject'] ?? false,
            'status' => Status::ACTIVE,
        );

        $examGroup = $this->examGroupRepository->create($dataArray);

        if (!$examGroup) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Exam Group created successfully.');
    }

    /**
     * Save Result Card Exam Group Board Logo
     */
    public function saveExamGroupBoardLogo(Request $request)
    {
        $input = $request->validate(
            [
                'result_card_configuration_id' => ['required', 'integer'],
                'name' => ['required', 'string'],
                'image' => ['required', 'image'],
            ]
        );

        DB::beginTransaction();

        try {
            $image_url = $this->_upload->uploadImage($request, 'image', $input['name']);

            $attributesToCheck = array(
                'school_id' => getUserSchoolId(),
                'imageable_type' => ResultCardConfiguration::class,
                'imageable_id' => $input['result_card_configuration_id'],
                'name' => $input['name'],
            );

            $valuesToUpdate = array(
                'path' => !empty($image_url) ? $image_url : '',
                'status' => Status::ACTIVE,
            );

            $this->imageRepository->updateOrCreate($attributesToCheck, $valuesToUpdate);

            DB::commit();

            return redirect()->back()->with('message', 'Uploaded successfully');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong');
        }
    }


    /**
     * Update Result Card Exam Group
     */
    public function resultCardExamGroupEdit(int $id, ExamGroupRequest $request)
    {
        $input = $request->validated();

        $examGroup = $this->examGroupRepository->findExamGroupById($id);

        $dataArray = [
            'academic_progress_report_id' => null,
            'result_card_configuration_id' => $input['report_card_type'] ?? null,
            'parent' => !empty($input['parent']) ? $input['parent'] : null,
            'title' => $input['title'] ?? null,
            'display_order' => !empty($input['display_order']) ? $input['display_order'] : 0,
            'is_exam' => $input['is_exam'] ?? false,
            'exam_id' => !empty($input['exam_id']) ? $input['exam_id'] : null,
            'is_grand_total_row_to_be_show' => $input['is_grand_total_row_to_be_show'] ?? false,
            'is_grand_percentage_row_to_be_show' => $input['is_grand_percentage_row_to_be_show'] ?? false,
            'is_grand_grade_row_to_be_show' => $input['is_grand_grade_row_to_be_show'] ?? false,
            'is_exam_marks_to_be_added_in_grand_total' => $input['is_exam_marks_to_be_added_in_grand_total'] ?? false,
            'grouping_type' => $input['grouping_type'] ?? null,
            'conversion_type' => $input['conversion_type'] ?? null,
            'calculation_perform' => $input['calculation_perform'] ?? null,
            'calculation_type' => $input['calculation_type'] ?? null,
            'weightage' => $input['weightage'] ?? null,
            'affiliated_title' => $input['affiliated_title'] ?? null,
            'show_children' => $input['show_children'] ?? false,
            'is_rank_to_be_given' => $input['is_rank_given'] ?? false,
            'show_total' => $input['show_total'] ?? false,
            'show_affiliation_no' => $input['show_affiliation_no'] ?? false,
            'show_school_code' => $input['show_school_code'] ?? false,
            'show_date_of_birth' => $input['show_date_of_birth'] ?? false,
            'show_print_date' => $input['show_print_date'] ?? false,
            'show_cbse_logo' => $input['show_cbse_logo'] ?? false,
            'show_icse_logo' => $input['show_icse_logo'] ?? false,
            'show_grading_scale' => $input['show_grading_scale'] ?? false,
            'show_optional_subject' => $input['show_optional_subject'] ?? false,
            'status' => Status::ACTIVE,
        ];

        $updateExamGroup = $this->examGroupRepository->update($examGroup?->id, $dataArray);

        if (!$updateExamGroup) {
            return redirect()->back()->with('error', 'Something goes wrong.');
        }

        return redirect()->back()->with('message', 'Data Updated Successfuly.');
    }

    /**
     * Delete Result Card Exam Group
     */
    public function resultCardExamGroupDelete(int $id)
    {
        $examGroup = $this->examGroupRepository->findExamGroupById($id);

        if (!$examGroup) {
            return redirect()->back()->with('error', 'Exam group not found.');
        }

        DB::beginTransaction();

        try {
            $examGroup->loadMissing(['childrenGroups:id,parent']);

            if (count($examGroup->childrenGroups) > 0) {
                $examGroup->childrenGroups->each(function ($children) {
                    $children->update([
                        'parent' => null
                    ]);
                });
            }

            $examGroup->delete();

            DB::commit();

            return redirect()->back()->with('message', 'Exam group deleted successfuly');
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /**
     * Display the schools.
     */
    public function resultCardPublish(Request $request): Response
    {
        $resultCards = $this->resultCardRepository->getActiveAll();
        $exams = $this->examRepository->getActiveAll();
        $boards = $this->boardRepository->getActiveAll();
        $subjects = $this->subjectRepository->getActiveAll();
        $classrooms = $this->classroomRepository->getActiveAll();

        return Inertia::render('ResultCard/ResultCardPublish', [
            'resultCards' => $resultCards,
            'exams' => $exams,
            'boards' => $boards,
            'subjects' => $subjects,
            'classrooms' => $classrooms,
        ]);
    }

    /**
     * Result Card Step Two
     */
    public function saveStepTwoData(ResultCard $request)
    {

        $input = $request->validated();

        try {
            $attributesToCheck = [
                'school_id' => getUserSchoolId(),
                'academic_year_id' => getAcademicYearId(),
                'academic_progress_report_id' => $input['rule_type'],
            ];

            $valuesToUpdate = [
                'board' => $input['board'],
                'exam_id' => $input['exam_id'],
                'attendance' => $input['attendance_type'],
                'classroom_id' => json_encode($input['class_name_ids']),
            ];

            $data = $this->classroomRepository->resultCardUpdate($attributesToCheck, $valuesToUpdate);

            DB::commit();
            return redirect()->back()->with('message', 'Rule Configured successfully!');
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
            return redirect()->back()->with('error', 'Something goes wrong.');
        }
    }

    /**
     * Result Card Step Three
     */
    // public function saveStepThreeData(Request $request)


    public function saveStepThreeData(ResultCardThree $request)
    {
        // dd($request->all());
        $input = $request->validated();

        try {
            foreach ($input['exam_data_array'] as $item) {
                // dd($item['rule_type']);
                $attributesToCheck = [
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'academic_progress_report_id' => $item['rule_type'],
                    'exam_id' => $item['exam_id'],
                ];

                $valuesToUpdate = [
                    'board' => $item['board'],
                    'display_name' => $item['display_name'],
                    'percentage' => $item['percentage'],
                ];

                $data = $this->classroomRepository->resultCardStepThreeUpdate($attributesToCheck, $valuesToUpdate);
            }

            DB::commit();
            return redirect()->back()->with('message', 'Exam Rule Updated successfully!');
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
            // Handle the error appropriately, e.g., log the error
            return redirect()->back()->with('error', 'Something went wrong.');
        }
    }

    public function saveStepThreeGroupData(Request $request)
    {
        // dd($request->all());
    }

    public function saveStepFourData(SubjectSummary $request)
    {
        // dd($request->all());
        $input = $request->validated();

        try {
            foreach ($input['exam_data_array'] as $item) {
                // dd($item['rule_type']);
                $attributesToCheck = [
                    'school_id' => getUserSchoolId(),
                    'academic_year_id' => getAcademicYearId(),
                    'academic_progress_report_id' => $item['rule_type'],
                    'subject_id' => $item['subject_id'],
                ];

                $valuesToUpdate = [
                    'board' => $item['board'],
                    'display_name' => $item['display_name'],
                    'percentage' => $item['percentage'],
                ];

                $data = $this->classroomRepository->resultCardStepFourUpdate($attributesToCheck, $valuesToUpdate);
            }

            DB::commit();
            return redirect()->back()->with('message', 'Subject Rule Updated successfully!');
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
            // Handle the error appropriately, e.g., log the error
            return redirect()->back()->with('error', 'Something went wrong.');
        }
    }
}
