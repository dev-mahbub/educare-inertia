<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaleLedger extends Model
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
        'sale_date_at',
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
        'sale_type_for',
        'description',
        'status',
        'created_by',
        'is_cancelled',
        'cancel_reason',
        'invoice_no',
        'receipt_no',
        'bank_ledger_id',
        'paid_amount',
        'previous_paid_amount',
        'due_amount',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'status' => Status::class,
    ];

    public function saleLedgerProducts()
    {
        return $this->hasMany(SaleLedgerProduct::class, 'sale_ledger_id', 'id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'id');
    }

    public function classroom()
    {
        return $this->belongsTo(Classroom::class, 'classroom_id', 'id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function bankLedger()
    {
        return $this->belongsTo(Ledger::class, 'bank_ledger_id', 'id');
    }

    public function ledger()
    {
        return $this->belongsTo(Ledger::class, 'ledger_id', 'id');
    }

    public function staff()
    {
        return $this->belongsTo(Staff::class, 'staff_id', 'id');
    }
}
