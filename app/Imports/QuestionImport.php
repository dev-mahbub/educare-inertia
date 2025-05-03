<?php

namespace App\Imports;

use App\Enums\Status;
use App\Enums\ShareAudienceType;
use App\Enums\VirtualQuestionType;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;
use App\Repositories\VirtualExamRepository;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class QuestionImport implements ToCollection, WithHeadingRow
{
    protected $validationErrors = [];
    protected $virtualExamRepository;
    protected $classNameId;
    protected $subjectId;
    protected $language;
    protected $onlineTopicId = null;

    public function __construct(int $classNameId, int $subjectId, string $language, int $onlineTopicId = null)
    {
        $this->virtualExamRepository = new VirtualExamRepository;
        $this->classNameId = $classNameId;
        $this->subjectId = $subjectId;
        $this->language = $language;
        $this->onlineTopicId = $onlineTopicId;
    }

    /**
     * @param Collection $rows
     */
    public function collection(Collection $rows)
    {
        // filter empty rows
        $rows = $rows->filter(function ($row) {
            return !empty(array_filter($row->toArray()));
        });

        if ($rows->count() > 0) {
            foreach ($rows as $row) {
                // Validate the row
                $validator = Validator::make($row->toArray(), [
                    'title' => 'required',
                    'difficulty_level' => 'required',
                    'question_type' => 'required',
                    'correct_answer' => 'nullable|required_unless:question_type,Descriptive',
                    'is_publish' => 'nullable|in:0,1,true,false'
                ]);

                // Check if validation fails for the current row
                if ($validator->fails()) {
                    // Store validation errors
                    $this->validationErrors['import_file'] = "File mandatory fields cannot not be empty and data should be in valid format.";
                    continue; // Skip processing this row and move to the next one
                }

                // answer option attributes
                $answerOptionAttributes = [
                    'answer_option_1',
                    'answer_option_2',
                    'answer_option_3',
                    'answer_option_4',
                    'answer_option_5'
                ];

                $difficultyLevel = ucfirst($row['difficulty_level'] ?? '');
                $questionType = ucwords($row['question_type'] ?? '');
                $correctAnswers = [];

                if ($questionType == VirtualQuestionType::MULTIPLE_SELECTION->value) {
                    $correctAnswers = explode(',', $row['correct_answer'] ?? '');
                } else {
                    $correctAnswers = [$row['correct_answer'] ?? ''];
                }

                // answer options
                $answerOptions = [];

                if ($questionType != VirtualQuestionType::DESCRIPTIVE->value) {
                    foreach ($answerOptionAttributes as $attribute) {
                        if (!empty($row[$attribute])) {
                            $answerOptions[] = [
                                'is_correct' => in_array($row[$attribute], $correctAnswers),
                                'answer' => $row[$attribute],
                                'alternate_answers' => []
                            ];
                        }
                    }
                }

                // create question
                $dataArray = [
                    'school_id' => getUserSchoolId(),
                    'created_by' => auth()->user()->id,
                    'class_name_id' => $this->classNameId,
                    'subject_id' => $this->subjectId,
                    'language' => $this->language,
                    'question_type' => $questionType,
                    'difficulty_level' => $difficultyLevel,
                    'online_topic_id' => $this->onlineTopicId,
                    'question' => $row['title'] ?? '',
                    'answer_options' => !empty($answerOptions) ? json_encode($answerOptions) : null,
                    'answer_explanation' => $row['answer_explanation'] ?? null,
                    'mark' => $row['mark'] ?? null,
                    'share_with' => ShareAudienceType::PRIVATE->value,
                    'is_published' => ($row['is_publish'] ?? false) == true,
                    'is_active' => true,
                    'status' => Status::ACTIVE
                ];

                $this->virtualExamRepository->createVirtualQuestion($dataArray);
            }
        } else {
            $this->validationErrors['import_file'] = "File cannot be empty.";
        }

        if (!empty($this->validationErrors)) {
            return $this->validationErrors;
        }
    }

    /**
     * Get the validation errors encountered during import.
     *
     * @return array
     */
    public function getValidationErrors()
    {
        return $this->validationErrors;
    }
}
