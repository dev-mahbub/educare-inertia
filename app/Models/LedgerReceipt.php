<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LedgerReceipt extends Model
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
        'receipt_date_at',
        'description',
        'total',
        'status',
        'academic_year_id',
        'created_by',
        'bank_ledger_id',
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

    public function ledger_receipt_items()
    {
        return $this->hasMany(LedgerReceiptItem::class, 'ledger_receipt_id', 'id');
    }

    public function account_group()
    {
        return $this->belongsTo(AccountGroup::class, 'account_group_id', 'id');
    }

    public function bankLedger()
    {
        return $this->belongsTo(Ledger::class, 'bank_ledger_id', 'id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
}
