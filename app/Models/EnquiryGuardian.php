<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EnquiryGuardian extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'enquiry_id',
        'father_first_name',
        'father_middle_name',
        'father_last_name',
        'father_email',
        'father_mobile',
        'father_sms_number',
        'father_occupation',
        'father_highest_qualification',
        'father_aadhar_card_no',
        'father_income_per_year',
        'father_whatsapp_no',
        'father_department',
        'father_designation',
        'father_pan_card_no',
        'father_company_name',
        'father_office_address',
        'mother_first_name',
        'mother_middle_name',
        'mother_last_name',
        'mother_email',
        'mother_mobile',
        'mother_highest_qualification',
        'mother_occupation',
        'mother_income_per_year',
        'mother_department',
        'mother_designation',
        'mother_aadhar_card_no',
        'mother_pan_card_no',
        'mother_company_name',
        'mother_office_address',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'status' => Status::class,
    ];
}
