<?php

namespace App\Models;

use App\Enums\GuardianType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StudentFeeVoucher extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'student_id',
        'voucher_mode',
        'title',
        'start_date',
        'end_date',
        'status',
    ];


    public function student()
    {
        return $this->belongsTo(Student::class);
    }


    // public function payments()
    // {
    //     return $this->hasMany(FeePayment::class, 'student_fee_voucher_id');
    // }


    public function feeTypeAmounts()
    {
        return $this->hasMany(StudentFeeVoucherAmount::class, 'student_fee_voucher_id');
    }

    public function father()
    {
        return $this->hasOneThrough(Guardian::class, Student::class, 'id', 'student_id', 'student_id', 'id')->where('guardian_type', GuardianType::FATHER);
        // return $this->hasOneThrough(Guardian::class, Student::class, 'id', 'id', 'student_id', 'id')->where('guardian_type', GuardianType::FATHER);
    }

    public function mother()
    {
        return $this->hasOneThrough(Guardian::class, Student::class, 'id', 'student_id', 'student_id', 'id')->where('guardian_type', GuardianType::MOTHER);
    }

    public function guardian()
    {
        return $this->hasOneThrough(Guardian::class, Student::class, 'id', 'student_id', 'student_id', 'id')->where('guardian_type', GuardianType::GUARDIAN);
        // return $this->hasOneThrough(Guardian::class, Student::class, 'id', 'id', 'student_id', 'id')->where('guardian_type', GuardianType::FATHER);
    }

    public function classroom()
    {
        return $this->hasOneThrough(Classroom::class, Student::class, 'id', 'id', 'student_id', 'classroom_id');
    }
}
