<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VisitorEnquiryType extends Model
{
    protected $table = 'visitor_enquiry_types';
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'status',
    ];
}
