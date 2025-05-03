<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OnlineQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'school_id',
        'academic_year_id',
        'class_name_id',
        'subject_id',
        'online_topic_id',
        'choice',
        'description',
        'file_path',
        'file_video_path',
        'file_audio_path',
        'start_date_at',
        'question_status',
        'status'
    ];

    public function discussions()
    {
        return $this->hasMany(OnlineQuestionDiscussion::class, 'online_question_id', 'id');
    }

    public function className()
    {
        return $this->belongsTo(ClassName::class, 'class_name_id', 'id');
    }

    public function onlineTopic()
    {
        return $this->belongsTo(OnlineTopic::class, 'online_topic_id', 'id');
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id', 'id');
    }
}