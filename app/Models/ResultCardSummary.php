<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResultCardSummary extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'exam_id',
        'academic_progress_report_id',
        'classroom_id',
        'board',
        'attendance',
        'display_name',
        'schedule_test',
        'percentage'

    ];

    protected $casts = [
        'classroom_id' => 'array',
    ];
    
}
