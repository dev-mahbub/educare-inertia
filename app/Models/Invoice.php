<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'created_by',
        'service_order_id',
        'invoice_no',
        'type',
        'service',
        'service_type',
        // 'amount',
        'invoice_description',
        'invoice_date',
        'start_date',
        'end_date',
        'paid_date',
        'payment_status',
        'status',
        'due_amount',
        'paid_amount',
        'payable_amount'
    ];

    public function serviceOrder()
    {
        return $this->belongsTo(ServiceOrder::class, 'service_order_id');
    }
}
