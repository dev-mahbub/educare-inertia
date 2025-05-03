<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrganizeFolder extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'class_name_id',
        'classroom_id',
        'subject_id',
        'topic_id',
        'folderable_type',
        'folderable_id',
        'name',
        'description',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
    */
    protected $casts = [
        'status' => Status::class,
    ];

    public function folderSubject()
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }

    public function folderClassName()
    {
        return $this->belongsTo(ClassName::class, 'class_name_id');
    }

    public function folderClassroom()
    {
        return $this->belongsTo(Classroom::class, 'class_name_id');
    }

    public function folderTopic()
    {
        return $this->belongsTo(Topic::class, 'topic_id');
    }

}
