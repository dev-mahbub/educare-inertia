<?php

namespace App\Models;

use App\Models\Fee;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ClassroomFeeStudent extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'student_id',
        'fee_id',
        'class_name_id',
    ];

    public function fee()
    {
        return $this->belongsTo(Fee::class, 'fee_id', 'id');
    }

    public function classFeeStudentAmounts()
    {
        return $this->hasMany(ClassFeeStudentAmount::class, 'class_name_id');
    }
}
