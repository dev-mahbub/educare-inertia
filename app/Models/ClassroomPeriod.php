<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassroomPeriod extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'title',
        'description',
        'start_time_at',
        'end_time_at',
        'start_date_at',
        'end_date_at',
        'status',
        'academic_year_id',
        'classroom_id',
        'school_shift_id',
        'school_period_id',
        'type'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'status' => Status::class,
    ];


    public function schoolPeriod()
    {
        return $this->belongsTo(SchoolPeriod::class, 'school_period_id');
    }

    public function classroomTimetables()
    {
        return $this->hasMany(ClassroomTimetable::class, 'classroom_period_id');
    }
}
