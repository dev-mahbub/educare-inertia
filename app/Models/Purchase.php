<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'party_account_id',
        'ledger_id',
        'receipt_no',
        'supplier_invoice_no',
        'purchase_date_at',
        'description',
        'sub_total',
        'discount_type',
        'discount_value',
        'discount_amount',
        'tax_amount',
        'total',
        'status',
        'party_ledger_id',
        'academic_year_id',
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


    // old code
    // /**
    //  * Define a belongsTo relationship with the PartyAccount model.
    //  *
    //  * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
    //  */
    // public function partyAccount()
    // {
    //     return $this->belongsTo(PartyAccount::class, 'party_account_id');
    // }

    /**
     * Define a belongsTo relationship with the Ledger model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function partyAccount()
    {
        return $this->belongsTo(Ledger::class, 'party_ledger_id', 'id');
    }


    /**
     * Define a belongsTo relationship with the PartyAccount model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function ledger()
    {
        return $this->belongsTo(Ledger::class, 'ledger_id', 'id');
    }

    /**
     * Define a belongsTo relationship with the PartyAccount model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function partyLedger()
    {
        return $this->belongsTo(Ledger::class, 'party_ledger_id', 'id');
    }

    /**
     * Define a hasMany relationship with the PurchaseProduct model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function purchaseProducts()
    {
        return $this->hasMany(PurchaseProduct::class, 'purchase_id', 'id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
}
