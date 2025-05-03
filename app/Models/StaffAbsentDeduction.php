<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffAbsentDeduction extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'staff_id',
        'staff_salary_payment_id',
        'payment_month_id',
        'attendance_date',
        'day_type',
        'deduction_message',
        'is_canceled',
        'status'
    ];
}
