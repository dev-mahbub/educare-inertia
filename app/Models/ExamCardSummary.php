<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamCardSummary extends Model
{
    use HasFactory;
    protected $fillable = [
        "display_name",
        "board",
        "percentage" ,
        "academic_progress_report_id",
        "academic_year_id",
        "school_id",
        "exam_id",
    ];

}
