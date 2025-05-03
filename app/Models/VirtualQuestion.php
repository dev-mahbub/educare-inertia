<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VirtualQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'created_by',
        'updated_by',
        'class_name_id',
        'subject_id',
        'language',
        'question_type',
        'difficulty_level',
        'online_topic_id',
        'virtual_asset_id',
        'question',
        'answer_options',
        'answer_explanation',
        'mark',
        'share_with',
        'is_published',
        'is_active',
        'status',
        'created_at'
    ];

    public function className()
    {
        return $this->belongsTo(ClassName::class, 'class_name_id');
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by',  'id');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
