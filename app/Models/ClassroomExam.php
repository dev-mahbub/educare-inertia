<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassroomExam extends Model
{
    use HasFactory;

    protected $table = 'classroom_exam';

    protected $fillable = [
        'classroom_id',
        'exam_id',
        'exam_status',
    ];

    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }
}
