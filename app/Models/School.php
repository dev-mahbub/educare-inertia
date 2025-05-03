<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\Status;

class School extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'parent_id',
        'title',
        'affiliation_no',
        'school_key',
        'city',
        'zip',
        'client_name',
        'phone',
        'phone_2',
        'mail',
        'school_number',
        'udise_code',
        'display_name_board',
        'established_at',
        'medium',
        'teaser',
        'description',
        'fb_url',
        'instagram_url',
        'twitter_url',
        'linkedin_url',
        'youtube_url',
        'android_app_url',
        'google_business_url',
        'apple_app_url',
        'street_address',
        'is_inactive',
        'is_generated_domain',
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

    /**
     * get all of the images.
     */
    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    /**
     * get all of the images.
     */
    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }


    /**
     * get setting of school.
     */
    public function setting()
    {
        return $this->hasOne(SchoolSetting::class, 'school_id');
    }

    public function logo()
    {
        return $this->morphOne(Image::class, 'imageable')
            ->where('name', 'image')
            ->where('school_id', getUserSchoolId());
    }


    public function timezone()
    {
        return $this->hasOneThrough(Timezone::class, SchoolTimezone::class, 'school_id', 'id', 'id', 'timezone_id');
    }
}
