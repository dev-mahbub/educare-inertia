<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Homework extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'homework';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'academic_year_id',
        'class_subject_id',
        'class_name_id',
        'user_id',
        'title',
        'sub_title',
        'description',
        'start_date_at',
        'end_date_at',
        'type',
        'assigned_to_class',
        'allow_submission',
        'home_file',
        'home_camera_file',
        'home_doc_file',
        'home_file_url',
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

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function subject()
    {
        return $this->belongsTo(ClassSubject::class, 'class_subject_id');
    }

    public function className()
    {
        return $this->belongsTo(ClassName::class, 'class_name_id');
    }

    public function classrooms()
    {
        return $this->hasManyThrough(Classroom::class, HomeworkClassroom::class, 'homework_id', 'id', 'id', 'classroom_id');
    }

    public function organizeFolder()
    {
        return $this->morphOne(OrganizeFolder::class, 'folderable');
    }
}
