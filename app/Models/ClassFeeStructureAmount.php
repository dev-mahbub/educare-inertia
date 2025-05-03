<?php

namespace App\Models;

use App\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ClassFeeStructureAmount extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'class_fee_structure_id',
        'class_name_id',
        'fee_id',
        'fee_type_id',
        'amount',
        'semester',
        'is_admission_installment',
        'is_fee_special',
        'student_status',
        'status',
    ];



    public function fee()
    {
        return $this->belongsTo(Fee::class, 'fee_id');
    }

    public function feeType()
    {
        return $this->belongsTo(FeeType::class, 'fee_type_id');
    }

    public function className()
    {
        return $this->belongsTo(ClassName::class, 'class_name_id');
    }

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
}
