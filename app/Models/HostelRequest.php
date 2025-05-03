<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HostelRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'student_id',
        'hostel_type',
        'note',
        'applied_date',
        'start_date',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
