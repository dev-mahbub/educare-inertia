<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ledger extends Model
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
        'title',
        'mobile',
        'alt_mobile',
        'email',
        'address',
        'opening_balance',
        'amount_type',
        'description',
        'is_system_default',
        'status',
        'student_id',
        'staff_id',
        'enquiry_id',
        'bank_account_id',
        'company_id',
        'vendor_id'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'status' => Status::class,
    ];

    public function ledgerPaymentItems()
    {
        return $this->hasMany(LedgerPaymentItem::class, 'ledger_id', 'id');
    }

    public function accountGroup()
    {
        return $this->belongsTo(AccountGroup::class, 'account_group_id', 'id');
    }

    public function partyPurchases()
    {
        return $this->hasMany(Purchase::class, 'party_ledger_id', 'id');
    }

    public function purchases()
    {
        return $this->hasMany(Purchase::class, 'ledger_id', 'id');
    }

    public function ledgerReceiptItems()
    {
        return $this->hasMany(LedgerReceiptItem::class, 'ledger_id', 'id');
    }

    public function ledgerPayments()
    {
        return $this->hasMany(LedgerPayment::class, 'bank_ledger_id', 'id');
    }

    public function ledgerReceipts()
    {
        return $this->hasMany(LedgerReceipt::class, 'bank_ledger_id', 'id');
    }

    public function saleLedgers()
    {
        return $this->hasMany(SaleLedger::class, 'ledger_id', 'id');
    }

    public function saleLedgerReturns()
    {
        return $this->hasMany(SaleLedgerReturn::class, 'ledger_id', 'id');
    }
}
