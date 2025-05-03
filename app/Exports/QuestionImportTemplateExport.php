<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;

class QuestionImportTemplateExport implements FromCollection
{
    protected $headings = [
        'title',
        'answer_explanation',
        'answer_option_1',
        'answer_option_2',
        'answer_option_3',
        'answer_option_4',
        'answer_option_5',
        'correct_answer',
        'mark',
        'difficulty_level',
        'is_publish',
        'question_type'
    ];

    public function __construct() {}

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $rows = [];

        return collect([$this->headings, $rows]);
    }
}
