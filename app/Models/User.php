<?php

namespace App\Models;

use App\Enums\Status;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'username',
        'first_name',
        'middle_name',
        'last_name',
        'phone',
        'email',
        'parent_pass',
        'access_token',
        'role',
        'password',
        'is_inactive',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'status' => Status::class,
    ];

    public function receivedMessages()
    {
        return $this->belongsToMany(Webmessage::class, 'webmessage_users')
                ->withTimestamps()
                ->withPivot('read_at');
    }
}
