<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HostelInfraLevel extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'parent_id',
        'academic_year_id',
        'name',
        'infra_level_type',
        'room_type',
        'description',
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

    // public function floors()
    // {
    //     return $this->hasMany(HostelInfraLevel::class, 'parent_id')
    //         ->where('infra_level_type', 'Floor');
    // }

    // public function rooms()
    // {
    //     return $this->hasMany(HostelInfraLevel::class, 'parent_id')
    //         ->where('infra_level_type', 'Room');
    // }

    public function roomType()
    {
        return $this->belongsTo(HostelRoomType::class, 'room_type', 'id')->where('status', Status::ACTIVE->value);
    }

    public function beds()
    {
        return $this->hasMany(HostelInfraLevel::class, 'parent_id')
            ->where('infra_level_type', 'Bed');
    }

    public function room()
    {
        return $this->belongsTo(HostelInfraLevel::class, 'parent_id', 'id')
            ->where('infra_level_type', 'Room');
    }

    public function floor()
    {
        return $this->belongsTo(HostelInfraLevel::class, 'parent_id', 'id')
            ->where('infra_level_type', 'Lavel');
    }

    public function studentAllocation()
    {
        return $this->belongsTo(HostelInfraLevel::class, 'id', 'hostel_infra_level_id');
    }
}
