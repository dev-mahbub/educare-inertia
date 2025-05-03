<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'academic_progress_report_id',
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
        'show_children',
        'is_rank_to_be_given',
        'status',
        'show_total',
        'show_affiliation_no',
        'show_school_code',
        'show_date_of_birth',
        'show_print_date',
        'show_cbse_logo',
        'show_icse_logo',
        'show_grading_scale',
        'affiliated_title',
        'show_optional_subject'
    ];


    public function allChildrenGroups()
    {
        return $this->childrenGroups()->with('allChildrenGroups');
    }

    public function childrenGroups()
    {
        // return $this->hasMany(ExamGroup::class, 'parent', 'id')->with('childrenGroups');
        return $this->hasMany(ExamGroup::class, 'parent', 'id');
    }

    public function parentGroup()
    {
        return $this->belongsTo(ExamGroup::class, 'parent', 'id');
    }

    public function resultCardConfiguration()
    {
        return $this->belongsTo(ResultCardConfiguration::class, 'result_card_configuration_id');
    }

    public function exam()
    {
        return $this->belongsTo(Exam::class, 'exam_id');
    }
}
