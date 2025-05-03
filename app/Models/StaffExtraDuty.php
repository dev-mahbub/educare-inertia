<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffExtraDuty extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'staff_id',
        'staff_salary_payment_id',
        'attendance_date',
        'is_halfday',
        'is_canceled',
        'status'
    ];
}
