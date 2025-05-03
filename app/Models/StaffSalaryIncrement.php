<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffSalaryIncrement extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'staff_id',
        'basic_amount',
        'earnings',
        'increment_date',
        'increment_note',
        'increment_status',
        'status',
        'approval_note',
        'cancel_reason'
    ];
}
