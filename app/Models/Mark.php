<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mark extends Model
{
    use HasFactory;
    protected $fillable = [
        'school_id',
        'academic_year_id',
        'classroom_id',
        'academic_grade_item_id',
        'subject_id',
        'exam_id',
        'student_id',
        'mark',
        'is_present',
        'absence_reason',
        'status'
    ];

    public function exams()
    {
        return $this->hasMany(Exam::class, 'exam_id');
    }

    public function classroom()
    {
        return $this->belongsTo(Classroom::class, 'classroom_id');
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    public function exam()
    {
        return $this->belongsTo(Exam::class, 'exam_id');
    }

    public function grade()
    {
        return $this->belongsTo(AcademicGradeItem::class, 'academic_grade_item_id');
    }

    public function classroomSubject()
    {
        return $this->belongsTo(ClassroomSubject::class, 'subject_id', 'subject_id');
    }
}
