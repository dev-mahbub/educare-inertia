<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'survey_id',
        'title',
        'question_category',
        'question_type',
        'options',
        'is_required_field',
        'range_start',
        'range_end',
        'status'
    ];
}
