<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassworkStudentAssessmentComment extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'classwork_id',
        'student_id',
        'user_id',
        'ass_file',
        'comment',
        'assessment_status',
        'status',
        'commented_by'
    ];
}
