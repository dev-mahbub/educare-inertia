<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NullifyFeeAmount extends Model
{
    use HasFactory;


    protected $fillable = [
        'school_id',
        'academic_year_id',
        'created_by',
        'class_fee_student_amount_id',
        'nullify_fee_id',
        'student_id',
        'fee_id',
        'fee_type_id',
        'fee_amount',
        'payable_amount',
        'paid_amount',
        'nullified_amount',
        'status',
    ];


    public function feeType()
    {
        return $this->belongsTo(FeeType::class, 'fee_type_id');
    }


    public function fee()
    {
        return $this->belongsTo(Fee::class, 'fee_id');
    }
}
