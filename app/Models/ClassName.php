<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassName extends Model
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
        'title',
        'description',
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

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    public function sections()
    {
        return $this->hasMany(Section::class, 'class_name_id');
    }

    /**
     * Get classrooms from class name.
     *
     * @var array<string, string>
     */
    public function classrooms()
    {
        return $this->hasMany(Classroom::class, 'class_name_id');
    }

    public function exams()
    {
        return $this->belongsToMany(Exam::class);
    }

    public function students()
    {
        return $this->hasMany(Student::class, 'classroom_id');
    }

    public function students2()
    {
        return $this->hasMany(Student::class, 'class_name_id', 'id');
    }

    public function promotedStudents()
    {
        return $this->hasMany(ClassroomStudent::class, 'class_name_id')->where(['school_id' => getUserSchoolId(), 'academic_year_id' => getAcademicYearId()]);
    }

    public function fee_structure_amounts()
    {
        return $this->hasMany(ClassFeeStructureAmount::class, 'class_name_id');
    }


    public function fee_structure()
    {
        return $this->hasOne(ClassFeeStructureClassName::class, 'class_name_id');
    }
}
