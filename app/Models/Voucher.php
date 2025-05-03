<?php

namespace App\Models;

use App\Enums\Status;
use App\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Voucher extends Model
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
        'installment_no',
        'title',
        'start_date',
        'end_date',
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


    public function payment()
    {
        // return $this->hasOne(FeePayment::class, 'voucher_id')->latestOfMany();
        return $this->morphOne(FeePayment::class, 'fee_paymentable')
            ->where('payment_status', '!=', PaymentStatus::CANCELLED->value)
            ->latest();
    }


    public function allocate_transport()
    {
        return $this->hasOne(AllocateTransport::class, 'voucher_id')->latestOfMany();
    }

    public function deallocate_transport()
    {
        return $this->hasOne(DeallocateTransport::class, 'voucher_id')->latestOfMany();
    }

    public function deallocate_transports()
    {
        return $this->hasMany(DeallocateTransport::class, 'voucher_id');
    }
}
