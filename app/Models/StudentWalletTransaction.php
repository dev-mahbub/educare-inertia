<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentWalletTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'fee_payment_id',
        'student_id',
        'created_by',
        'transaction_date',
        'transaction_type',
        'transaction_mode',
        'description',
        'amount',
        'status'
    ];
}
