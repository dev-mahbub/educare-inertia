<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentAssessment extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'assessment_id',
        'student_id',
        'mark',
        'status'
    ];

    public function assessment()
    {
        return $this->belongsTo(Assessment::class);
    }
}
