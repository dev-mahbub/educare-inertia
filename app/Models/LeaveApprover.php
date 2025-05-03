<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveApprover extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'staff_id',
        'created_by',
        'status',
    ];

    public function staff()
    {
        return $this->belongsTo(Staff::class, 'staff_id');
    }
}
