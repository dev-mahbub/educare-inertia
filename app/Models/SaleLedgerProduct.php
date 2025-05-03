<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaleLedgerProduct extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'product_id',
        'sale_ledger_id',
        'quantity',
        'rate',
        'discount_value',
        'sale_type_for',
        'tax_amount',
        'total_amount',
        'status',
        'discount_amount',
        'discount_type'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'status' => Status::class,
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function saleLedger()
    {
        return $this->belongsTo(SaleLedger::class, 'sale_ledger_id');
    }
}
