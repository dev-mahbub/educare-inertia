<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassroomSubject extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'classroom_id',
        'academic_year_id',
        'parent_subject_id',
        'subject_id',
        'title',
        'type',
        'academic_grade_id',
        'description',
        'grade_scale',
        'is_marking',
        'teachers_data',
        'display_order',
        'status'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'status' => Status::class,
    ];

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id', 'id');
    }

    public function classroom()
    {
        return $this->belongsTo(Classroom::class, 'classroom_id', 'id');
    }

    public function examDate()
    {
        return $this->hasOne(ExamDate::class, 'classroom_subject_id', 'id')->where(['school_id' => getUserSchoolId(), 'academic_year_id' => getAcademicYearId()]);
    }

    public function students()
    {
        return $this->hasMany(Student::class, 'classroom_id');
    }

    public function academic_grade()
    {
        return $this->belongsTo(AcademicGrade::class, 'academic_grade_id', 'id')->where(['school_id' => getUserSchoolId(), 'academic_year_id' => getAcademicYearId()]);
    }

    /**
     * Get all of the items for the user.
     */
    public function guardians()
    {
        return $this->hasManyThrough(Guardian::class, Student::class, 'classroom_id',  'student_id');
    }

    public function examRoasters()
    {
        return $this->hasMany(ExamRoaster::class, 'classroom_subject_id');
    }

    public function student_subject()
    {
        return $this->belongsTo(StudentSubject::class, 'subject_id', 'subject_id')->where(['school_id' => getUserSchoolId(), 'academic_year_id' => getAcademicYearId()]);;
    }

    public function subject_group()
    {
        return $this->belongsTo(SubjectGroup::class, 'parent_subject_id', 'id')->where(['school_id' => getUserSchoolId()]);
    }
}
