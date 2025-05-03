<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffAdvancePayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'staff_id',
        'staff_salary_payment_id',
        'payment_month_id',
        'ledger_id',
        'paid_amount',
        'deducted_amount',
        'payment_date',
        'payment_note',
        'cheque_no',
        'cheque_date',
        'bank_id',
        'branch',
        'by_salary',
        'is_canceled',
        'cancel_reason',
        'status',
        'receipt_no'
    ];

    public function paymentMonth()
    {
        return $this->belongsTo(PaymentMonth::class, 'payment_month_id');
    }

    public function staff()
    {
        return $this->belongsTo(Staff::class, 'staff_id');
    }

    public function ledger()
    {
        return $this->belongsTo(Ledger::class, 'ledger_id');
    }
}
