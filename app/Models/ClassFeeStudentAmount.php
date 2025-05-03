<?php

namespace App\Models;

use App\Enums\GuardianType;
use App\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ClassFeeStudentAmount extends Model
{
    use HasFactory;


    protected $fillable = [
        'school_id',
        'academic_year_id',
        'class_fee_structure_id',
        'class_name_id',
        'student_id',
        'fee_id',
        'fee_type_id',
        'amount',
        'semester',
        'is_admission_installment',
        'is_fee_special',
        'is_previous_due',
        'status',
    ];


    public function fee()
    {
        return $this->belongsTo(Fee::class, 'fee_id');
    }

    public function fees()
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


    public function nullify_fee()
    {
        return $this->hasOne(NullifyFeeAmount::class, 'class_fee_student_amount_id');
    }


    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    public function father()
    {
        return $this->hasOneThrough(Guardian::class, Student::class, 'id', 'student_id', 'student_id', 'id')->where('guardian_type', GuardianType::FATHER);
    }

    public function mother()
    {
        return $this->hasOneThrough(Guardian::class, Student::class, 'id', 'student_id', 'student_id', 'id')->where('guardian_type', GuardianType::MOTHER);
    }

    public function guardian()
    {
        return $this->hasOneThrough(Guardian::class, Student::class, 'id', 'student_id', 'student_id', 'id')->where('guardian_type', GuardianType::GUARDIAN);
    }

    public function classroom()
    {
        return $this->hasOneThrough(Classroom::class, Student::class, 'id', 'id', 'student_id', 'classroom_id');
    }


    public function classFeeStructure()
    {
        return $this->belongsTo(ClassFeeStructure::class, 'class_fee_structure_id');
    }
}
