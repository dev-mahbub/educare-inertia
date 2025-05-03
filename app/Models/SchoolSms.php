<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolSms extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'total_purchased_sms',
        'available_sms',
        'consumed_sms',
        'status'
    ];
}
