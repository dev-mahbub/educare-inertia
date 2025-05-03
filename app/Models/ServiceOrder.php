<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'created_by',
        'type',
        'payment_method',
        'quantity',
        'price',
        'payable_amount',
        'paid_amount',
        'due_amount',
        'payment_status',
        'status',
        'is_gst_aplicable',
        'gst_value',
        'gst_amount',
        'service',
        'note',
        'transaction_id',
        'service_type',
        'subscription_no'
    ];
}
