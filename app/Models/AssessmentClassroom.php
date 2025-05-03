<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssessmentClassroom extends Model
{
    use HasFactory;

     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'academic_year_id',
        'assessment_id',
        'classroom_id',
    ];

    /**
     * Get the assessment that owns the AssessmentClassroom
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

     public function assessment()
     {
         return $this->belongsTo(Assessment::class);
     }

     
}
