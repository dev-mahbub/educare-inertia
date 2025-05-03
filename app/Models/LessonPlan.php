<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonPlan extends Model
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
        'subject_id',
        'class_name_id',
        'teacher_id',
        'title',
        'lesson_topic',
        'description',
        'start_date_at',
        'end_date_at',
        'methodology',
        'is_notification_teacher',
        'is_mail_teacher',
        'is_lesson_va',
        'is_lesson_vb',
        'lesson_file',
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


    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }

    public function className()
    {
        return $this->belongsTo(ClassName::class, 'class_name_id');
    }

    public function lessonPlanClassrooms()
    {
        return $this->hasMany(LessonPlanClassroom::class, 'lesson_plan_id');
    }

    public function lessonPlanTeachers()
    {
        return $this->hasMany(LessonPlanTeacher::class, 'lesson_plan_id');
    }

    public function files()
    {
        return $this->morphMany(File::class, 'fileable');
    }

    public function lessonPlanRemarks()
    {
        return $this->hasMany(LessonPlanRemark::class, 'lesson_plan_id');
    }

    public function classrooms()
    {
        return $this->hasManyThrough(Classroom::class, LessonPlanClassroom::class, 'lesson_plan_id', 'id', 'id', 'classroom_id');
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id', 'id');
    }
}
