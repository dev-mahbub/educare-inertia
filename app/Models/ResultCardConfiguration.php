<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResultCardConfiguration extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'board_id',
        'exam_id',
        'rule_type',
        'title',
        'attendance_type',
        'status'
    ];



    public function configurationClassNames()
    {
        return $this->hasMany(ResultCardConfigurationClassName::class, 'result_card_configuration_id');
    }


    public function exam()
    {
        return $this->belongsTo(Exam::class, 'exam_id');
    }


    public function classNames()
    {
        return $this->hasManyThrough(ClassName::class, ResultCardConfigurationClassName::class, 'result_card_configuration_id', 'id', 'id', 'class_name_id');
    }


    public function examGroups()
    {
        return $this->hasMany(ExamGroup::class, 'result_card_configuration_id');
    }


    public function academicRemarks()
    {
        return $this->hasManyThrough(AcademicRemark::class, Exam::class, 'id', 'exam_id', 'exam_id', 'id');
    }


    public function examAttendances()
    {
        return $this->hasManyThrough(ExamAttendance::class, Exam::class, 'id', 'exam_id', 'exam_id', 'id');
    }

    public function board()
    {
        return $this->belongsTo(Board::class, 'board_id');
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }
}
