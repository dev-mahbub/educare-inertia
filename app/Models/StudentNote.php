<?php

namespace App\Models;

use App\Models\UserActivity;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StudentNote extends Model
{
    use HasFactory;


    protected $fillable = [
        'school_id',
        'academic_year_id',
        'created_by',
        'student_id',
        'context',
        'notes',
        'context_status',
        'status'
    ];


    public function activities()
    {
        return $this->morphMany(UserActivity::class, 'activitiesable');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
