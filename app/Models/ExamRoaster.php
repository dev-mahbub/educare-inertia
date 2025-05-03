<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamRoaster extends Model
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
        'classroom_subject_id',
        'exam_id',
        'full_mark',
        'pass_mark',
        'converted_mark',
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

    public function classroom_subject(){
        return $this->belongsTo(ClassroomSubject::class, 'classroom_subject_id', 'id')->where(['school_id' => getUserSchoolId(), 'academic_year_id' => getAcademicYearId()]);
    }

    public function classroomSubjectRaw(){
        return $this->belongsTo(ClassroomSubject::class, 'classroom_subject_id', 'id');
    }
}
