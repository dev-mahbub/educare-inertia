<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffCustomField extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'staff_id',
        'custom_field_id',
        'value',
        'status'
    ];
}
