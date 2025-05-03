<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdmissionExam extends Model
{
    use HasFactory;
    protected $fillable = [
        'school_id',
        'academic_year_id',	
        'enquiry_id',	
        'class_name_id',	
        'classroom_id',	
        'test_date',	
        'test_time',
        'exam_status',
        'status'
    ];

    public function exams()
    {
        return $this->hasOne(Exam::class);
    }
}
