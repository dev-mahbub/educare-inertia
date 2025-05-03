<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LedgerPayment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'account_group_id',
        'receipt_no',
        'payment_mode',
        'payment_date_at',
        'description',
        'total',
        'status',
        'academic_year_id',
        'created_by',
        'is_cancelled',
        'bank_ledger_id',
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


    public function ledger_payment_items()
    {
        return $this->hasMany(LedgerPaymentItem::class, 'ledger_payment_id', 'id');
    }

    public function account_group()
    {
        return $this->belongsTo(AccountGroup::class, 'account_group_id', 'id');
    }


    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function bankLedger()
    {
        return $this->belongsTo(Ledger::class, 'bank_ledger_id', 'id');
    }
}
