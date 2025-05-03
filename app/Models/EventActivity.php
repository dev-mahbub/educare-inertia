<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventActivity extends Model
{
    use HasFactory;

    // protected $casts = [
    //     'participants' => 'array',
    // ];

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'event_id',
        'created_by',
        'title',
        'description',
        'start_date',
        'end_date',
        'start_time',
        'end_time',
        'participants',
        'is_group_activity',
        'status',
    ];
}
