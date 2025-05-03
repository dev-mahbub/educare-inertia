<?php

namespace App\Models;

use App\Enums\StaffRoleType;
use App\Enums\Status;
use App\Enums\UserRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportRoute extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'name',
        'vehicle_id',
        'staff_id',
        'pickup_time_at',
        'drop_time_at',
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

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id', 'id');
    }

    public function coordinator()
    {
        return $this->belongsTo(Staff::class, 'vehicle_id', 'id')->where('user_roll_type', '=', StaffRoleType::TEACHER->value);
    }

    public function students()
    {
        return $this->hasMany(AllocateTransport::class, 'transport_route_id', 'id')->where('allocate_type_for', '=', 'Student');
    }

    public function allocatedStudents()
    {
        return $this->hasMany(AllocateTransport::class, 'transport_route_id', 'id')
            ->where(
                [
                    'allocate_type_for' => 'Student',
                    'is_current' => 1,
                ]
            )->whereNotNull('student_id');
    }

    public function transportStoppages()
    {
        return $this->hasMany(TransportStoppage::class, 'transport_route_id', 'id');
    }
}
