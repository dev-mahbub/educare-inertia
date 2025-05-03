<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaleLedgerPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'sale_ledger_id',
        'created_by',
        'bank_ledger_id',
        'payment_date',
        'transaction_no',
        'transaction_details',
        'transaction_date',
        'paid_amount',
        'status',
        'receipt_no',
        'is_cancelled',
        'cancel_reason',
        'description'
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function bankLedger()
    {
        return $this->belongsTo(Ledger::class, 'bank_ledger_id', 'id');
    }

    public function saleLedger()
    {
        return $this->belongsTo(SaleLedger::class, 'sale_ledger_id', 'id');
    }
}
