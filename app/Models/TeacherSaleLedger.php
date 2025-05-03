<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherSaleLedger extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'staff_id',
        'ledger_id',
        'start_date_at',
        'email',
        'address',
        'phone',
        'sub_total',
        'total_discount',
        'total_tax',
        'total',
        'is_print_receipt',
        'paid_type',
        'payment_type',
        'transaction_no',
        'transaction_desc',
        'transaction_date',
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
}
