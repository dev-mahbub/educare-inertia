<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LearningMaterialGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'class_name_id',
        'subject_id',
        'user_id',
        'title',
        'description',
        'status'
    ];

    public function materials()
    {
        return $this->hasMany(LearningMaterial::class, 'learning_material_group_id');
    }

    public function learningMaterials()
    {
        return $this->belongsToMany(
            LearningMaterial::class,
            'learning_material_group_learning_material',
            'learning_material_group_id',
            'learning_material_id'
        )->withPivot('is_shared');
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }

    public function classroomLearningMaterials()
    {
        return $this->hasMany(ClassroomLearningMaterial::class, 'learning_material_group_id');
    }
}
