<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassroomAttendance extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'classroom_id',
        'academic_year_id',
        'taken_by_id',
        'holiday_title',
        'is_attendance_allowed_on_back_date',
        'is_attendance_taken',
        'attendance_date_at',
        'attendance_time_at',
        'is_current_date',
        'is_holiday',
        'notes',
        'students',
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

    public function classroomData()
    {
        return $this->belongsTo(Classroom::class, 'classroom_id', 'id')->select('id', 'title', 'class_name_id');
    }

    public function takenUserData()
    {
        return $this->belongsTo(User::class, 'taken_by_id', 'id')->select('id', 'username', 'first_name', 'middle_name', 'last_name');
    }

    public function updatedUserData()
    {
        return $this->belongsTo(User::class, 'updated_by_id', 'id')->select('id', 'username');
    }

    public function activities()
    {
        return $this->morphMany(UserActivity::class, 'activitiesable');
    }

    public function updatedBy()
    {
        return $this->morphOne(UserActivity::class, 'activitiesable')->latestOfMany();
    }

    public function classroomAttendanceNote()
    {
        return $this->hasMany(ClassroomAttendanceNote::class, 'classroom_attendance_id', 'id');
    }
}
