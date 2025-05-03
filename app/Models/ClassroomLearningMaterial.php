<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassroomLearningMaterial extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'learning_material_group_id',
        'learning_material_id',
        'classroom_id',
        'subject_id',
        'status'
    ];
}
