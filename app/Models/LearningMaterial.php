<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LearningMaterial extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'learning_material_group_id',
        'user_id',
        'online_topic_id',
        'title',
        'content',
        'resources',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function onlineTopic()
    {
        return $this->belongsTo(OnlineTopic::class, 'online_topic_id');
    }

    public function learningMaterialResources()
    {
        return $this->hasMany(LearningMaterialResource::class, 'learning_material_id');
    }

    public function classroomLearningMaterials()
    {
        return $this->hasMany(ClassroomLearningMaterial::class, 'learning_material_id');
    }

    public function learningMaterialGroups()
    {
        return $this->belongsToMany(
            LearningMaterialGroup::class,
            'learning_material_group_learning_material',
            'learning_material_id',
            'learning_material_group_id'
        )->withPivot('is_shared');
    }
}
