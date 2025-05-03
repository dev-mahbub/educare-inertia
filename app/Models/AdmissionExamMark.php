<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdmissionExamMark extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'enquiry_id',
        'class_name_id',
        'subject_id',
        'exam_id',
        'mark',
        'status',
    ];


    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }
}
