<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffSalaryPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'payment_month_id',
        'staff_id',
        'ledger_id',
        'total_earning_amount',
        'total_deduction_amount',
        'payable_amount',
        'paid_amount',
        'due_amount',
        'payment_date',
        'payment_note',
        'is_published',
        'is_canceled',
        'cancel_reason',
        'status',
        'bonus_amount',
        'advance_amount',
        'advance_deducted_amount',
        'paid_due_amount',
        'cheque_no',
        'cheque_date',
        'bank_id',
        'branch',
        'bank_account_id',
        'extra_duty_amount',
        'absent_deduction_amount',
        'total_leave',
        'leave_balance',
        'total_absent',
        'total_extra_duty',
        'total_paid_extra_duty',
        'total_previous_extra_duty',
        'total_deducted_absent',
        'total_previous_absent_deduction',
        'receipt_no',
        'basic_pay',
        'grade_pay'
    ];

    public function staffSalaryPaymentEarnings()
    {
        return $this->hasMany(StaffSalaryPaymentEarning::class, 'staff_salary_payment_id');
    }

    public function staffSalaryPaymentDeductions()
    {
        return $this->hasMany(StaffSalaryPaymentDeduction::class, 'staff_salary_payment_id');
    }

    public function paymentMonth()
    {
        return $this->belongsTo(PaymentMonth::class, 'payment_month_id');
    }

    public function staffAdvancePayment()
    {
        return $this->hasOne(StaffAdvancePayment::class, 'staff_salary_payment_id');
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
