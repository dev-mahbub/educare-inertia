<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdmissionExamEnquiries extends Model
{
    use HasFactory;
    protected $fillable = [
        'admission_exam_id',
        'enquiry_id',	
        'exam_status',	
        'status',
    ];
}
