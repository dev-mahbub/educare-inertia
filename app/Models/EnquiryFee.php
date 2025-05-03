<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EnquiryFee extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'academic_year_id',
        'enquiry_id',
        'academic_fee',
        'fee_amount',
        'payment_mode',
        'payment_note',
        'cheque_no',
        'cheque_date',
        'bank_id',
        'bank_account_id',
        'paytm_ref_no',
        'paytm_mobile',
        'neft_number',
        'neft_desc',
        'upi_number',
        'upi_description',
        'status',
        'receipt_no',
        'created_by',
        'payment_date'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'status' => Status::class,
    ];

    public function enquiry()
    {
        return $this->belongsTo(Enquiry::class, 'enquiry_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class, 'academic_year_id')->select('id', 'academic_session');
    }
}
