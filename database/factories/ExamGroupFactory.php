<?php

namespace Database\Factories;

use App\Models\ExamGroup;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExamGroupFactory extends Factory
{
    protected $model = ExamGroup::class;

    public function definition()
    {
        return [
            'academic_progress_report_id' => null,
            'parent_id' => $this->faker->randomNumber(),
            'title' => $this->faker->sentence,
            'display_order' => $this->faker->randomNumber(),
            'is_exam' => $this->faker->boolean,
            'is_exam_id' => $this->faker->randomNumber(),
            'is_grand_total_row_to_be_show' => $this->faker->boolean,
            'is_grand_percentage_row_to_be_show' => $this->faker->boolean,
            'is_grand_grade_row_to_be_show' => $this->faker->boolean,
            'is_exam_marks_to_be_added_in_grand_total' => $this->faker->boolean,
            'grouping_type' => $this->faker->word,
            'conversion_type' => $this->faker->word,
            'calculation_perform' => $this->faker->word,
            'calculation_type' => $this->faker->word,
            'weightage' => null,
            'show_children' => $this->faker->boolean,
            'is_rank_to_be_given' => $this->faker->boolean,
        ];
    }
}
