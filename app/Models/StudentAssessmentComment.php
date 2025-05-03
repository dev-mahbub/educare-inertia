<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentAssessmentComment extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'assessment_id',
        'student_id',
        'user_id',
        'comment',
        'assessment_status',
        'status',
        'ass_file'
    ];

    public function assessment()
    {
        return $this->belongsTo(Assessment::class);
    }

    public function file()
    {
        return $this->morphOne(File::class, 'fileable');
    }
}
