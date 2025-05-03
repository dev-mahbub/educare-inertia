<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fee extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'installment_no',
        'title',
        'start_date_at',
        'end_date_at',
        'last_pay_date_at',
        'description',
        'is_admission_install',
        'status',
    ];


    public function payments()
    {
        return $this->hasMany(FeePayment::class);
    }


    public function discounts()
    {
        return $this->hasMany(StudentFeeDiscount::class, 'fee_id');
    }


    public function class_fee_structure_amounts()
    {
        return $this->hasMany(ClassFeeStructureAmount::class);
    }


    public function class_fee_student_amounts()
    {
        return $this->hasMany(ClassFeeStudentAmount::class);
    }


    public function adjust_fee_payments_from()
    {
        return $this->hasMany(AdjustFeePayment::class, 'from_fee_id');
    }


    public function adjust_fee_payments_to()
    {
        return $this->hasMany(AdjustFeePayment::class, 'from_fee_id');
    }

    public function nullify_fee_amounts()
    {
        return $this->hasMany(NullifyFeeAmount::class);
    }
}
