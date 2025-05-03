<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NullifyFee extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'created_by',
        'student_id',
        'nullify_date',
        'nullify_reason',
        'status',
    ];


    public function nullify_fee_amounts()
    {
        return $this->hasMany(NullifyFeeAmount::class, 'nullify_fee_id');
    }

    public function student()
    {
        return $this->hasOneThrough(Student::class, NullifyFeeAmount::class, 'nullify_fee_id', 'id', 'id', 'student_id');
    }
}
