<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VirtualExam extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'created_by',
        'title',
        'exam_code',
        'exam_mode',
        'start_date_at',
        'end_date_at',
        'start_time_at',
        'end_time_at',
        'duration_hour',
        'duration_minute',
        'instruction_hour',
        'instruction_minute',
        'instruction_details',
        'total_mark',
        'pass_mark',
        'display_order',
        'is_schedule_exam',
        'is_shuffle_question',
        'live_link',
        'status',
        'class_name_id',
        'subject_id',
        'questions',
        'classrooms',
        'is_published'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'status' => Status::class,
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }

    public function className()
    {
        return $this->belongsTo(ClassName::class, 'class_name_id');
    }
    
    public function studentAttempts()
    {
        return $this->hasMany(VirtualExamStudentAttemptes::class);
    }
}
