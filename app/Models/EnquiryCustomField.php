<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EnquiryCustomField extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'enquiry_id',
        'custom_field_id',
        'value',
        'status'
    ];
}
