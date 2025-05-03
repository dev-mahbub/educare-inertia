<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassSubject extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'class_name_id',
        'academic_year_id',
        'subject_group_id',
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

    public function grade()
    {
        return $this->belongsTo(AcademicGrade::class, 'academic_grade_id', 'id')->where(['school_id' => getUserSchoolId(), 'academic_year_id' => getAcademicYearId()]);
    }

    public function subject_group()
    {
        return $this->belongsTo(SubjectGroup::class, 'subject_group_id', 'id')->where(['school_id' => getUserSchoolId()]);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id', 'id')->where(['school_id' => getUserSchoolId()]);
    }
}
