<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VisitorEnquiryDetail extends Model
{
    use HasFactory;

    protected $table = 'visitor_enquiry_details';

    protected $fillable = [
        'visitor_enquiry_id',
        'title',
        'activity_date',
        'follow_date',
        'status',
        'created_by',
    ];

    public function visitorEnquiry()
    {
        return $this->belongsTo(VisitorEnquiry::class, 'visitor_enquiry_id');
    }
}
