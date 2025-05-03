<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VirtualExamStudentAttemptes extends Model
{
    use HasFactory;

    protected $table = 'virtual_exam_student_attemptes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'academic_year_id',
        'virtual_exam_id',
        'student_id',
        'answers',
        'attempt_number',
        'score',
    ];

    protected $casts = [
        'answers' => 'array',
    ];

    public function virtualExam()
    {
        return $this->belongsTo(VirtualExam::class, 'virtual_exam_id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }
}
