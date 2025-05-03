<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaleLedgerReturn extends Model
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
        'ledger_id',
        'classroom_id',
        'staff_id',
        'receipt_no',
        'sale_invoice_no',
        'return_date_at',
        'admission_no',
        'father_name',
        'father_phone',
        'address',
        'phone',
        'email',
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
        'return_type_for',
        'description',
        'status',
        'created_by',
        'is_cancelled',
        'cancel_reason'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'status' => Status::class,
    ];

    /**
     * Define a hasMany relationship with the SaleLedgerProductReturn model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function saleLedgerReturnProducts()
    {
        return $this->hasMany(SaleLedgerProductReturn::class, 'sale_ledger_return_id', 'id');
    }

    public function classroom()
    {
        return $this->belongsTo(Classroom::class, 'classroom_id', 'id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'id');
    }

    public function staff()
    {
        return $this->belongsTo(Staff::class, 'staff_id', 'id');
    }

    public function ledger()
    {
        return $this->belongsTo(Ledger::class, 'ledger_id', 'id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
}
