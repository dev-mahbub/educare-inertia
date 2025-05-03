<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamDate extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'exam_id',
        'class_name_id',
        'classroom_id',
        'classroom_subject_id',
        'academic_year_id',
        'section_id',
        'subject_id',
        'start_time_at',
        'end_time_at',
        'date_at',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
    */
    protected $casts = [
        'status' => Status::class,
    ];

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }
    
    public function classroomSubject()
    {
        return $this->belongsTo(ClassroomSubject::class);
    }
}
