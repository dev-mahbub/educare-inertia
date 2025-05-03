<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentDueFollowUp extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'student_id',
        'created_by',
        'due_amount',
        'note',
        'call_picked',
        'commitment_date',
        'status'
    ];


    public function created_by()
    {
        return $this->belongsTo(User::class, 'created_by');
    }


    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }
}
