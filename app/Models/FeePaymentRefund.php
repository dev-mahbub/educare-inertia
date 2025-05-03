<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeePaymentRefund extends Model
{
    use HasFactory;


    protected $fillable = [
        'school_id',
        'academic_year_id',
        'created_by',
        'student_id',
        'fee_type_id',
        'fee_payment_refund_method_id',
        'refund_amount',
        'status',
    ];


    public function feeType()
    {
        return $this->belongsTo(FeeType::class);
    }


    public function refund_method()
    {
        return $this->belongsTo(FeePaymentRefundMethod::class, 'fee_payment_refund_method_id');
    }
}
