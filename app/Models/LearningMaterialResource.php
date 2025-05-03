<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LearningMaterialResource extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'learning_material_id',
        'type',
        'title',
        'description',
        'link',
        'status'
    ];

    public function file()
    {
        return $this->morphOne(File::class, 'fileable');
    }

    public function learningMaterial()
    {
        return $this->belongsTo(LearningMaterial::class, 'learning_material_id');
    }
}
