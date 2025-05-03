<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
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
        'user_roll_type',
        'state_id',
        'house_id',
        'category_id',
        'religion_id',
        'department_id',
        'designation_id',
        'blood_group_id',
        'employee_id',
        'employment_category_id',
        'teacher_category_id',
        'teacher_sub_category_id',
        'teacher_type',
        'first_name',
        'middle_name',
        'last_name',
        'phone',
        'email',
        'father_name',
        'spouse_name',
        'gender',
        'city',
        'join_date_at',
        'leave_date_at',
        'birth_date_at',
        'job_type',
        'pan_number',
        'qualification',
        'voter_card_no',
        'aadhar_card_no',
        'oasis_id',
        'address',
        'description',
        'bank_name',
        'bank_account_no',
        'uan',
        'ifsc',
        'pf_account_number',
        'experience_year',
        'esic_no',
        'status'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'status' => Status::class,
    ];
}
