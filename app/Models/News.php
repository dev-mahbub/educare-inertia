<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
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
        'name',
        'details',
        'is_inactive',
        'status',
        'created_by',
        'title',
        'audience_type',
        'news_type',
        'start_date',
        'end_date',
        'is_published'
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

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function newsClassrooms()
    {
        return $this->hasMany(NewsClassroom::class, 'news_id', 'id');
    }
}
