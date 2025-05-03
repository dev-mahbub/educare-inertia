<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classwork extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'user_id',
        'academic_year_id',
        'class_subject_id',
        'class_name_id',
        'title',
        'sub_title',
        'description',
        'start_date_at',
        'end_date_at',
        'assigned_to_class',
        'allow_submission',
        'class_file',
        'class_camera_file',
        'class_doc_file',
        'class_file_url',
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

    public function organizeFolder()
    {
        return $this->morphOne(OrganizeFolder::class, 'folderable');
    }

    public function classrooms()
    {
        return $this->hasManyThrough(Classroom::class, ClassworkClassroom::class, 'classwork_id', 'id', 'id', 'classroom_id');
    }
}
