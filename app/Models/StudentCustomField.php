<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentCustomField extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'student_id',
        'custom_field_id',
        'value',
        'status'
    ];
}
