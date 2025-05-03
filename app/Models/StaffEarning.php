<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffEarning extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'staff_id',
        'pay_scale_id',
        'basic_pay',
        'grade_pay',
        'net_salary',
        'earnings',
        'deductions',
        'status'
    ];

    public function staff()
    {
        return $this->belongsTo(Staff::class, 'staff_id');
    }

    public function payScale()
    {
        return $this->belongsTo(PayScale::class, 'pay_scale_id');
    }
}
