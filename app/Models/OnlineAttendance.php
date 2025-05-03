<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OnlineAttendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'classroom_id',
        'subject_id',
        'created_by',
        'attendance_date',
        'students',
        'status'
    ];
}
