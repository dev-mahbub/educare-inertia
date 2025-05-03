<?php

namespace Database\Seeders;

use App\Models\ExamGroup;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ExamGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ExamGroup::create([
            'academic_progress_report_id' => null,
            'parent_id' => 1,
            'title' => 'Dummy Exam Group 1',
            'display_order' => 1,
            'is_exam' => true,
            'is_exam_id' => 3,
            'is_grand_total_row_to_be_show' => false,
            'is_grand_percentage_row_to_be_show' => false,
            'is_grand_grade_row_to_be_show' => false,
            'is_exam_marks_to_be_added_in_grand_total' => false,
            'grouping_type' => 'Scholastic',
            'conversion_type' => 'SubjectWise',
            'calculation_perform' => 'Aggregate',
            'calculation_type' => 'Marks',
            'weightage' => null,
            'show_children' => true,
            'is_rank_to_be_given' => false,
        ]);

        // Add more dummy data as needed

        // Example with factory
        \App\Models\ExamGroup::factory(10)->create();
        // Example with factory
    }
}
