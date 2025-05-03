<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentSubject extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'student_id',
        'academic_year_id',
        'classroom_id',
        'subject_id',
        'subject_number',
    ];


    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }
}
