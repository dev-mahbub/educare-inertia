<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdjustFeePayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'created_by',
        'student_id',
        'from_fee_id',
        'to_fee_id',
        'adjust_date',
        'adjust_note',
        'status',
    ];


    public function adjust_fee_payment_amounts()
    {
        return $this->hasMany(AdjustFeePaymentAmount::class);
    }


    public function fee_payments()
    {
        return $this->hasMany(FeePayment::class, 'adjust_fee_payment_id');
    }


    public function from_fee()
    {
        return $this->belongsTo(Fee::class, 'from_fee_id');
    }


    public function to_fee()
    {
        return $this->belongsTo(Fee::class, 'to_fee_id');
    }


    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function activities()
    {
        return $this->morphMany(UserActivity::class, 'activitiesable');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
