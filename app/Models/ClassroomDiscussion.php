<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassroomDiscussion extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'subject_id',
        'topic_id',
        'title',
        'grade',
        'choice',
        'start_date_at',
        'end_date_at',
        'description',
        'status',
        'academic_year_id',
        'classroom_id',
        'online_topic_id',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
