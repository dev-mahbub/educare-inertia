<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VirtualAsset extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'created_by',
        'class_name_id',
        'subject_id',
        'online_topic_id',
        'title',
        'description',
        'asset_type',
        'video_link',
        'is_publish',
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

    public function className()
    {
        return $this->belongsTo(ClassName::class, 'class_name_id');
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }

    public function onlineTopic()
    {
        return $this->belongsTo(OnlineTopic::class, 'online_topic_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}
