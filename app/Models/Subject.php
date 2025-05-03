<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'e_learning_subject_id',
        'title',
        'short_title',
        'is_practical_paper',
        'is_co_scholastic',
        'short_title',
        'grade',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'status' => Status::class,
    ];

    public function academicGrades()
    {
        return $this->hasManyThrough(AcademicGrade::class, ClassroomSubject::class, 'subject_id', 'id', 'id', 'academic_grade_id');
    }

    public function academicGrade()
    {
        return $this->hasOneThrough(AcademicGrade::class, ClassroomSubject::class, 'subject_id', 'id', 'id', 'academic_grade_id');
    }

    public function classroomSubjects()
    {
        return $this->hasMany(ClassroomSubject::class, 'subject_id');
    }
}
