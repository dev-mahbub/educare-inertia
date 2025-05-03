<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdmissionClassroom extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'admission_id',
        'academic_year_id',
        'classroom_id',
        'class_name_id',
        'min_age',
        'max_age',
        'on_date_at',
        'reg_fee',
        'reg_limit',
        'adm_limit',
        'adm_prefix',
        'adm_postfix',
        'is_open_offline',
        'is_open_online',
        'is_result',
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
