<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkingBonusDayStudent extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'academic_year_id',
        'class_name_id',
        'classroom_id',
        'working_bonus_day_class_id',
        'working_bonus_day_classroom_id',
        'month_id',
        'student_id',
        'working_days',
        'bonus_days',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
    */
    protected $casts = [
        'status' => Status::class,
    ];
}
