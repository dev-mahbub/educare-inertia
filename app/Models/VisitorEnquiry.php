<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VisitorEnquiry extends Model
{
    protected $table = 'visitor_enquiries';

    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'name',
        'visitor_enquiry_type_id',
        'phone',
        'email',
        'enquiry_type',
        'enquiry_date',
        'in_time',
        'appointment_date',
        'appointment_time',
        'person_to_meet',
        'purpose_of_visit',
        'vehicle_no',
        'enquiry_message',
        'address',
        'visitor_photo',
        'created_by',
    ];  

    public function enquiryType()
    {
        return $this->belongsTo(VisitorEnquiryType::class, 'visitor_enquiry_type_id');
    }

    public function visitorEnquiryDetails()
    {
        return $this->hasMany(VisitorEnquiryDetail::class, 'visitor_enquiry_id');
    }
}
