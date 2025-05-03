<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OnlineTopic extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'class_name_id',
        'classroom_id',
        'subject_id',
        'title',
        'status'
    ];

    public function learningMaterials()
    {
        return $this->hasMany(LearningMaterial::class, 'online_topic_id', 'id');
    }

    public function virtualQuestions()
    {
        return $this->hasMany(VirtualQuestion::class, 'online_topic_id', 'id');
    }
}
