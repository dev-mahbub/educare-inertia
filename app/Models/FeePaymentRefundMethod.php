<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeePaymentRefundMethod extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'created_by',
        'student_id',
        'refund_mode',
        'refund_date',
        'refund_note',
        'cheque_no',
        'cheque_date',
        'cheque_amount',
        'bank_id',
        'branch',
        'receipt_no',
        'cancel_date',
        'cancellation_reason',
        'refund_status',
        'status',
    ];


    protected static function boot()
    {
        parent::boot();

        $receiptNumberSetting = getSiteSettingData('fee_is_refund_seed_no_enabled');
        $receiptNumberEnabaled = $receiptNumberSetting != null &&  $receiptNumberSetting?->value == "Yes";

        if (!$receiptNumberEnabaled) {
            static::created(function ($model) {
                $model->receipt_no = $model->id;
                $model->save();
            });
        }
    }


    public function activities()
    {
        return $this->morphMany(UserActivity::class, 'activitiesable');
    }

    public function cancelled_by()
    {
        return $this->morphOne(UserActivity::class, 'activitiesable')->latestOfMany();
    }


    public function refund_amounts()
    {
        return $this->hasMany(FeePaymentRefund::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function academic_year()
    {
        return $this->belongsTo(AcademicYear::class, 'academic_year_id');
    }
}
