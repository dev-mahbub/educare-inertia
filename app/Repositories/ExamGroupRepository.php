<?php

namespace App\Repositories;

use App\Enums\Status;
use App\Models\ExamGroup;
use App\Repositories\IExamGroupRepository;

class ExamGroupRepository implements IRepository, IExamGroupRepository
{
    public function getAll()
    {
        return ExamGroup::all();
    }

    public function getById($id)
    {
        return ExamGroup::findOrFail($id);
    }

    public function getBySchoolId($id)
    {
        return ExamGroup::where('school_id', $id)->first();
    }

    public function delete($id)
    {
        ExamGroup::destroy($id);
    }

    public function create(array $arrayData)
    {
        return ExamGroup::create($arrayData);
    }

    public function update($id, array $arrayData)
    {
        return ExamGroup::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return ExamGroup::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->select(
                'id',
                'academic_progress_report_id',
                'parent',
                'title',
                'display_order',
                'is_exam',
                'exam_id',
                'is_grand_total_row_to_be_show',
                'is_grand_percentage_row_to_be_show',
                'is_grand_grade_row_to_be_show',
                'is_exam_marks_to_be_added_in_grand_total',
                'grouping_type',
                'conversion_type',
                'calculation_perform',
                'calculation_type',
                'weightage',
                'show_children',
                'is_rank_to_be_given'
            )
            ->orderBy('display_order', 'ASC')
            ->get();
    }


    public function getActiveAllByReportCardId(int $reportCardId)
    {
        return ExamGroup::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('result_card_configuration_id', $reportCardId)
            ->select(
                'id',
                // 'academic_progress_report_id',
                'result_card_configuration_id',
                'parent',
                'title',
                'display_order',
                'is_exam',
                'exam_id',
                'is_grand_total_row_to_be_show',
                'is_grand_percentage_row_to_be_show',
                'is_grand_grade_row_to_be_show',
                'is_exam_marks_to_be_added_in_grand_total',
                'grouping_type',
                'conversion_type',
                'calculation_perform',
                'calculation_type',
                'weightage',
                'affiliated_title',
                'show_children',
                'is_rank_to_be_given',
                'show_total',
                'show_affiliation_no',
                'show_school_code',
                'show_date_of_birth',
                'show_print_date',
                'show_cbse_logo',
                'show_icse_logo',
                'show_optional_subject',
                'show_grading_scale',
            )
            ->orderBy('id', 'ASC')
            ->get();
    }


    public function findExamGroupById(int $id)
    {
        return ExamGroup::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('id', $id)
            ->select(
                'id',
                'academic_progress_report_id',
                'parent',
                'title',
                'display_order',
                'is_exam',
                'exam_id',
                'is_grand_total_row_to_be_show',
                'is_grand_percentage_row_to_be_show',
                'is_grand_grade_row_to_be_show',
                'is_exam_marks_to_be_added_in_grand_total',
                'grouping_type',
                'conversion_type',
                'calculation_perform',
                'calculation_type',
                'weightage',
                'show_children',
                'is_rank_to_be_given'
            )
            ->orderBy('display_order', 'ASC')
            ->firstOrFail();
    }
}
