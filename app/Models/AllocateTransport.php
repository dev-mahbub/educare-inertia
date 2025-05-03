<?php

namespace App\Models;

use App\Enums\Status;
use App\Enums\GuardianType;
use App\Enums\PaymentStatus;
use App\Enums\StaffRoleType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use PhpOffice\PhpSpreadsheet\Calculation\Statistical\Distributions\StudentT;

class AllocateTransport extends Model
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
        'student_id',
        'classroom_id',
        'transport_stoppage_id',
        'staff_id',
        'voucher_id',
        'fee_id',
        'allocation_type',
        'transport_route_id',
        'allocate_type_for',
        'is_current',
        'transport_type',
        'amount',
        'applied_on_date_at',
        'start_from_date',
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

    public function voucher()
    {
        return $this->belongsTo(Voucher::class, 'voucher_id');
    }

    public function transportRoute()
    {
        return $this->belongsTo(TransportRoute::class, 'transport_route_id', 'id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'id');
    }

    public function studentData()
    {
        return $this->belongsTo(Student::class, 'student_id', 'id')->select(
            'first_name',
            'middle_name',
            'last_name',
        );
    }

    public function transportStoppage()
    {
        return $this->belongsTo(TransportStoppage::class, 'transport_stoppage_id', 'id');
    }

    public function teacher()
    {
        return $this->belongsTo(Staff::class, 'staff_id', 'id')->where('user_roll_type', StaffRoleType::TEACHER->value);
    }

    public function classroom()
    {
        return $this->belongsTo(Classroom::class, 'classroom_id', 'id');
    }

    public function payment()
    {
        // return $this->morphOne(FeePayment::class, 'fee_paymentable')->latestOfMany();
        return $this->morphOne(FeePayment::class, 'fee_paymentable')
            ->where('payment_status', '!=', PaymentStatus::CANCELLED->value)
            ->latest();
    }

    public function fee_payments()
    {
        return $this->morphMany(FeePayment::class, 'fee_paymentable');
    }

    public function father()
    {
        return $this->hasOneThrough(Guardian::class, Student::class, 'id', 'student_id', 'student_id', 'id')->where('guardian_type', GuardianType::FATHER);
        // return $this->hasOneThrough(Guardian::class, Student::class, 'id', 'id', 'student_id', 'id')->where('guardian_type', GuardianType::FATHER);
    }

    public function studentRoll()
    {
        return $this->hasOneThrough(ClassroomRoll::class, Student::class, 'id', 'student_id', 'student_id', 'id');
        // return $this->hasOneThrough(Guardian::class, Student::class, 'id', 'id', 'student_id', 'id')->where('guardian_type', GuardianType::FATHER);
    }

    
}
