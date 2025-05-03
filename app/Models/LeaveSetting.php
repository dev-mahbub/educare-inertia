<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'created_by',
        'is_auto_approve_leave_enabled',
        'is_half_day_leave_enabled',
        'is_rule_one_in_time_enabled',
        'is_rule_two_total_hour_enabled',
        'is_saturday_exceptional',
        'is_sunday_exceptional',
        'rule_one_in_time',
        'rule_two_total_hour',
        'is_active',
        'status',
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
