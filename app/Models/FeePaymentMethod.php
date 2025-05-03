<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeePaymentMethod extends Model
{
    use HasFactory;


    protected $fillable = [
        'school_id',
        'academic_year_id',
        'created_by',
        'student_id',
        'payment_mode',
        'payment_date',
        'school_receipt_no',
        'payment_note',
        'cheque_no',
        'cheque_date',
        'cheque_amount',
        'bank_id',
        'branch',
        'bank_account_id',
        'dd_bank',
        'dd_number',
        'dd_date',
        'dd_amount',
        'paytm_ref_no',
        'paytm_mobile',
        'neft_number',
        'neft_desc',
        'transaction_id',
        'upi_transaction_id',
        'upi_description',
        'receipt_no',
        'is_cancelled',
        'cancel_reason',
        'is_bounced_cheque',
        'is_cleared_cheque',
        'cheque_clearance_date',
        'cheque_clearance_note',
        'cheque_penalty',
        'cancellation_date',
        'cancelled_by',
        // 'fee_payment_type',
        'status',
        'payment_method',
        'payment_status',
        'online_payment_transaction_id'
    ];

    // protected static function boot()
    // {
    //     parent::boot();

    //     $receiptNumberSetting = getSiteSettingData('fee_is_receipt_number_session_wise_enabled');
    //     $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";

    //     if (!$receiptNumberEnabaled) {
    //         static::created(function ($model) {
    //             $model->receipt_no = $model->id;
    //             $model->save();
    //         });
    //     }
    // }


    public function fee_payments()
    {
        return $this->hasMany(FeePayment::class, 'fee_payment_method_id');
    }


    public function student()
    {
        return $this->hasOneThrough(Student::class, FeePayment::class, 'fee_payment_method_id', 'id', 'id', 'student_id');
    }


    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }


    public function cancelledBy()
    {
        return $this->belongsTo(User::class, 'cancelled_by');
    }


    public function bank()
    {
        return $this->belongsTo(Bank::class, 'bank_id');
    }

    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class, 'academic_year_id', 'id')->select('id', 'academic_session');
    }
}
