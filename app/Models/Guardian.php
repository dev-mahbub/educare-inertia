<?php

namespace App\Models;

use App\Enums\GuardianType;
use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guardian extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'user_id',
        'student_id',
        'guardian_type',
        'first_name',
        'middle_name',
        'last_name',
        'religion',
        'relation',
        'phone',
        'email',
        'sms_phone',
        'highest_qualification',
        'occupation',
        'income_per_year',
        'department',
        'designation',
        'aadhar_card_no',
        'pan_card_no',
        'company_name',
        'city',
        'address',
        'office_address',
        'is_inactive',
        'status',
        'guardianid',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'status' => Status::class,
    ];


    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    public function spouse()
    {
        return $this->hasOne(Guardian::class, 'student_id', 'student_id')
            ->where('guardian_type', GuardianType::MOTHER)
            ->where('school_id', getUserSchoolId());
    }
}
