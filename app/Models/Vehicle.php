<?php

namespace App\Models;

use App\Enums\DriverType;
use App\Enums\StaffRoleType;
use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'driver_id',
        'conductor_id',
        'transport_provider_id',
        'vehicle_number',
        'total_seat',
        'registration_number',
        'chassis_number',
        'finance_name',
        'engine_number',
        'company_name',
        'tank_capacity',
        'model',
        'type',
        'fuel_type',
        'owner_name',
        'device_id',
        'insurance_upto',
        'road_tax_upto',
        'pollution_upto',
        'permit_upto',
        'registration_date',
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

    public function driver(){
        return $this->belongsTo(Driver::class, 'driver_id', 'id')->where('type', DriverType::DRIVER->value);;
    }

    public function conductor(){
        return $this->belongsTo(Driver::class, 'conductor_id', 'id')->where('type', DriverType::CONDUCTOR->value);;
    }
}
