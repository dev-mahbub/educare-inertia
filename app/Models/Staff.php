<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
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
        'academic_year_id',
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
        'staff_category_id',
        'staff_sub_category_id',
        'staff_type',
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
        'inactive_date_at',
        'reason_data',
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

    public function designation()
    {
        return $this->belongsTo(Designation::class, 'designation_id', 'id');
    }

    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

    public function bloodGroup()
    {
        return $this->belongsTo(BloodGroup::class, 'blood_group_id', 'id');
    }

    public function school()
    {
        return $this->belongsTo(School::class, 'school_id', 'id');
    }

    public function schoolLogo()
    {
        return $this->hasOne(Image::class, 'imageable_id', 'school_id')
            ->where('name', 'image')
            ->where('school_id', getUserSchoolId());
    }

    public function staffProfileImage()
    {
        return $this->morphOne(Image::class, 'imageable')
            ->where('school_id', getUserSchoolId());
    }

    public function staffProfileImageRaw()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function classroom()
    {
        return $this->belongsTo(Classroom::class, 'id', 'class_teacher_id');
    }

    public function staffLeaveAllocations()
    {
        return $this->hasMany(StaffLeaveAllocation::class, 'staff_id');
    }

    public function leaves()
    {
        return $this->hasMany(Leave::class, 'staff_id');
    }

    public function ledger()
    {
        return $this->hasOne(Ledger::class, 'staff_id');
    }

    public function staffLeaveSettings()
    {
        return $this->hasMany(StaffLeaveSetting::class, 'staff_id');
    }

    public function leaveApprover()
    {
        return $this->hasOne(LeaveApprover::class, 'staff_id');
    }

    public function religion()
    {
        return $this->belongsTo(Religion::class, 'religion_id', 'id');
    }

    public function house()
    {
        return $this->belongsTo(House::class, 'house_id', 'id');
    }

    public function state()
    {
        return $this->belongsTo(State::class, 'state_id', 'id');
    }

    public function staffCustomFields()
    {
        return $this->hasMany(StaffCustomField::class, 'staff_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function classroomTimetables()
    {
        return $this->hasMany(ClassroomTimetable::class, 'staff_id');
    }

    public function payScale()
    {
        return $this->hasOneThrough(PayScale::class, StaffEarning::class, 'staff_id', 'id', 'id', 'pay_scale_id');
    }

    public function staffSalaryPayments()
    {
        return $this->hasMany(StaffSalaryPayment::class, 'staff_id');
    }
}
