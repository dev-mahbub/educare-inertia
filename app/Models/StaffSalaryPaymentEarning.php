<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffSalaryPaymentEarning extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'staff_salary_payment_id',
        'earning_type_id',
        'amount',
        'status',
    ];

    public function earningType()
    {
        return $this->belongsTo(EarningType::class, 'earning_type_id');
    }
}
