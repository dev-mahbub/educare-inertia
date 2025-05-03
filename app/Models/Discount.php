<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'created_by',
        'title',
        'description',
        'is_discount_percentage',
        'status',
    ];

    public function discountFeeTypeAmounts()
    {
        return $this->hasMany(DiscountFeeTypeAmount::class);
    }
}
