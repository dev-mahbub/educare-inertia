<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiscountFeeTypeAmount extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'created_by',
        'discount_id',
        'fee_type_id',
        'amount',
        'status',
    ];
}
