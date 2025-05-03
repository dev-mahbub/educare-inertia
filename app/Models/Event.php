<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
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
        'created_by',
        'title',
        'event_type',
        'event_level',
        'available_seat',
        'teaser',
        'description',
        'start_datetime',
        'end_datetime',
        'start_time',
        'event_budget',
        'is_published',
        'location',
        'join_url',
        'visible_from',
        'visible_to',
        'registration_start_at',
        'registration_end_at',
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


    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }


    public function staffs()
    {
        return $this->hasManyThrough(Staff::class, EventStaff::class, 'event_id', 'id', 'id', 'staff_id');
    }

    public function eventActivities()
    {
        return $this->hasMany(EventActivity::class, 'event_id');
    }


    public function eventDocuments()
    {
        return $this->hasMany(EventDocument::class, 'event_id');
    }
}
