<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentCertificate extends Model
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
        'from_fee_id',
        'to_fee_id',
        'classroom_id',
        'certificate_no',
        'generated_date_at',
        'issue_date_at',
        'tc_reason',
        'is_draft',
        'is_generated',
        'certificate_type',
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

    public function studentData()
    {
        return $this->belongsTo(Student::class, 'student_id', 'id')->select('id', 'first_name', 'middle_name', 'last_name', 'admission_no');
    }

    public function classroomData()
    {
        return $this->belongsTo(Classroom::class, 'classroom_id', 'id')->select('id', 'title');
    }
}
