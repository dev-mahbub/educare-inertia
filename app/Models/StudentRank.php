<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentRank extends Model
{
    use HasFactory;


    protected $fillable = [
        'school_id',
        'academic_year_id',
        'student_id',
        'classroom_id',
        'rank',
        'status'
    ];
}
