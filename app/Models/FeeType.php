<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FeeType extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'fee_type',
        'installment_type',
        'category_id',
        'display_name',
        'description',
        'is_fee_refundable',
        'is_fee_special',
        'is_late_fee',
        'is_transport_fee',
        'status',
    ];



    public function category()
    {
        return $this->belongsTo(Category::class);
    }


    public function payment_refunds()
    {
        return $this->hasMany(FeePaymentRefund::class, 'fee_type_id');
    }

    public function payments()
    {
        return $this->hasMany(FeePayment::class, 'fee_type_id');
    }


    public function discounts()
    {
        return $this->hasMany(StudentFeeDiscount::class, 'fee_type_id');
    }


    public function discount_fee_type_amounts()
    {
        return $this->hasMany(DiscountFeeTypeAmount::class, 'fee_type_id');
    }


    public function class_fee_structure_amounts()
    {
        return $this->hasMany(ClassFeeStructureAmount::class, 'fee_type_id');
    }


    public function class_fee_student_amounts()
    {
        return $this->hasMany(ClassFeeStudentAmount::class, 'fee_type_id');
    }


    public function adjust_fee_payment_amounts()
    {
        return $this->hasMany(AdjustFeePaymentAmount::class, 'fee_type_id');
    }


    public function nullify_fee_amounts()
    {
        return $this->hasMany(NullifyFeeAmount::class, 'fee_type_id');
    }


    public function student_fee_voucher_amounts()
    {
        return $this->hasMany(StudentFeeVoucherAmount::class, 'fee_type_id');
    }
}
