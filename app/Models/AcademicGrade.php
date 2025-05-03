<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicGrade extends Model
{
    use HasFactory;


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'academic_year_id',
        'scale_name',
        'scale_description',
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

    function academicGradeItems()
    {
        return $this->hasMany(AcademicGradeItem::class, 'academic_grade_id', 'id')->where(['school_id' => getUserSchoolId(), 'academic_year_id' => getAcademicYearId()]);
    }

    function academicGradeItemsRaw()
    {
        return $this->hasMany(AcademicGradeItem::class, 'academic_grade_id', 'id');
    }

    public function classroomSubjects()
    {
        return $this->hasMany(ClassroomSubject::class, 'academic_grade_id');
    }
}
