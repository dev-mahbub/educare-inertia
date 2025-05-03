<?php

namespace App\Models;

use App\Enums\FeePaymentType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FeePayment extends Model
{
    use HasFactory;


    protected $fillable = [
        'school_id',
        'academic_year_id',
        'created_by',
        'fee_paymentable_type',
        'fee_paymentable_id',
        'student_id',
        'fee_payment_method_id',
        'adjust_fee_payment_id',
        'fee_id',
        'student_fee_voucher_id',
        'voucher_id',
        'fee_type_id',
        'student_fee_discount_id',
        'discount_id',
        'amount',
        'payable_amount',
        'paid_amount',
        'due_amount',
        'discount_amount',
        'is_fee_due',
        'is_adjusted_fee',
        'fee_payment_type',
        'payment_status',
        'status',
    ];


    public function fee_paymentable()
    {
        return $this->morphTo();
    }


    public function discount()
    {
        return $this->belongsTo(Discount::class);
    }


    public function fee()
    {
        switch ($this->fee_payment_type) {
            case FeePaymentType::GENERALVOUCHER->value:
                $related = StudentFeeVoucher::class;
                $foreignKey = 'student_fee_voucher_id';
                break;
            case FeePaymentType::TRANSPORTVOUCHER->value:
                $related = Voucher::class;
                $foreignKey = 'voucher_id';
                break;
            default:
                $related = Fee::class;
                $foreignKey = 'fee_id';
                break;
        }

        return $this->belongsTo($related, $foreignKey, 'id');
    }

    // public function fee()
    // {
    //     return $this->belongsTo(Fee::class, 'fee_id', 'id');
    // }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function payment_method()
    {
        return $this->belongsTo(FeePaymentMethod::class, 'fee_payment_method_id');
    }


    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }


    public function feeType()
    {
        return $this->belongsTo(FeeType::class, 'fee_type_id');
    }
}
