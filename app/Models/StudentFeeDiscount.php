<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentFeeDiscount extends Model
{
    use HasFactory;


    protected $fillable = [
        'school_id',
        'academic_year_id',
        'created_by',
        'student_id',
        'fee_id',
        'discount_id',
        'fee_type_id',
        'amount',
        'is_discount_percentage',
        'status',
    ];


    public function feeType()
    {
        return $this->belongsTo(FeeType::class);
    }

    public function activities()
    {
        return $this->morphMany(UserActivity::class, 'activitiesable');
    }

    public function discount()
    {
        return $this->belongsTo(Discount::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function fee()
    {
        return $this->belongsTo(Fee::class);
    }

    public function payment()
    {
        return $this->hasOne(FeePayment::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
