<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'image',
        'first_name',
        'last_name',
        'type',
        'birth_date_at',
        'gender',
        'age',
        'blood_group',
        'contact',
        'emergency_no',
        'driving_license',
        'proof_type',
        'proof_no',
        'experience',
        'relative_name',
        'pincode',
        'city',
        'state',
        'address',
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

    public function vehicleStaffImage()
    {
        return $this->hasOne(Image::class, 'imageable_id', 'id')
            ->where('name', 'vehicle_staff_image')
            ->where('school_id', getUserSchoolId());
    }
}
