<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffLeaveAllocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'staff_id',
        'leave_type_id',
        'days',
        'consumed_days',
        'status'
    ];

    public function leaveType()
    {
        return $this->belongsTo(LeaveType::class, 'leave_type_id');
    }
}
