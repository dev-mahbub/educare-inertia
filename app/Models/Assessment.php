<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Assessment extends Model
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
        'user_id',
        'subject_id',
        'class_name_id',
        'title',
        'description',
        'start_date_at',
        'end_date_at',
        'duration',
        'type',
        'max_mark',
        'pass_mark',
        'assigned_to_class',
        'allow_submission',
        'ass_file',
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
        return $this->belongsTo(ClassSubject::class, 'subject_id');
    }

    public function className()
    {
        return $this->belongsTo(ClassName::class, 'class_name_id');
    }

    public function classrooms()
    {
        return $this->hasManyThrough(Classroom::class, AssessmentClassroom::class, 'assessment_id', 'id', 'id', 'classroom_id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
