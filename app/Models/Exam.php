<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'academic_year_id',
        'title',
        'start_date_at',
        'end_date_at',
        'display_order',
        'is_display_on_calender',
        'is_registration',
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

    public function classNames()
    {
        return $this->belongsTo(ClassName::class);
    }

    public function admissionExam()
    {
        return $this->belongsTo(AdmissionExam::class);
    }

    public function classrooms()
    {
        return $this->belongsToMany(Classroom::class)->withPivot('exam_status');
    }


    public function marks()
    {
        return $this->hasMany(Mark::class, 'exam_id');
    }

    public function classroomExams()
    {
        return $this->hasMany(ClassroomExam::class, 'exam_id');
    }

    public function examDates()
    {
        return $this->hasMany(ExamDate::class, 'exam_id');
    }
}
