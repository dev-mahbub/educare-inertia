<?php

namespace App\Models;

use App\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StudentFeeVoucherAmount extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'student_fee_voucher_id',
        'student_id',
        'fee_type_id',
        'amount',
        'status',
    ];


    public function payment()
    {
        // return $this->morphOne(FeePayment::class, 'fee_paymentable')->latestOfMany();
        return $this->morphOne(FeePayment::class, 'fee_paymentable')
            ->where('payment_status', '!=', PaymentStatus::CANCELLED->value)
            ->latest();
    }


    public function fee_payments()
    {
        return $this->morphMany(FeePayment::class, 'fee_paymentable');
    }


    public function feeType()
    {
        return $this->belongsTo(FeeType::class);
    }
}
