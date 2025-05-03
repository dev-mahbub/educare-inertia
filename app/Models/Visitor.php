<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'first_name',
        'middle_name',
        'last_name',
        'phone',
        'email',
        'height',
        'weight',
        'present_address',
        'present_state',
        'present_city',
        'present_taluka',
        'present_district',
        'present_pin_code',
        'permanent_address',
        'permanent_state',
        'permanent_city',
        'permanent_taluka',
        'permanent_district',
        'is_inactive',
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
