<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportStoppage extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'area_id',
        'transport_route_id',
        'order',
        'stoppage',
        'pick_price',
        'drop_price',
        'pick_drop_price',
        'pickup_time_at',
        'drop_time_at',
        'distance',
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

    public function area()
    {
        return $this->belongsTo(Area::class, 'area_id', 'id');
    }

    public function students()
    {
        return $this->hasMany(AllocateTransport::class, 'transport_route_id', 'id')->where('allocate_type_for', '=', 'Student');
    }

    public function allocatedStudents()
    {
        return $this->hasMany(AllocateTransport::class, 'transport_route_id', 'id')
            ->select('id')
            ->where(
                [
                    'allocate_type_for' => 'Student',
                    'is_current' => 1,
                ]
            )->whereNotNull('student_id');
    }

    public function transportAllocations()
    {
        return $this->hasMany(AllocateTransport::class, 'transport_stoppage_id', 'id');
    }

    public function teachers()
    {
        return $this->hasMany(AllocateTransport::class, 'transport_route_id', 'id')->where('allocate_type_for', '=', 'Teacher');
    }
}
