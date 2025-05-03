<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveType extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'title',
        'acronym',
        'description',
        'display_order',
        'auto_leave_deduction_order',
        'status'
    ];
}
