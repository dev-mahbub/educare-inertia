<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DriverLogBook extends Model
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
        'vehicle_id',
        'from_transport_stoppage_id',
        'to_transport_stoppage_id',
        'date_at',
        'in_time_at',
        'out_time_at',
        'starting_km',
        'last_km',
        'total_km',
        'fuel_ltr',
        'fuel_rate',
        'mileage',
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

    public function fromStoppage()
    {
        return $this->belongsTo(TransportStoppage::class, 'from_transport_stoppage_id', 'id');
    }

    public function toStoppage()
    {
        return $this->belongsTo(TransportStoppage::class, 'to_transport_stoppage_id', 'id');
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id', 'id');
    }

}
