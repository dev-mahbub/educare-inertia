<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMonth extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'title',
        'start_date',
        'end_date',
        'status'
    ];

    public function staffSalaryPayments()
    {
        return $this->hasMany(StaffSalaryPayment::class, 'payment_month_id');
    }
}
