<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookPurchase extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'library_vendor_id',
        'book_type_id',
        'bank_id',
        'bill_number',
        'purchase_date_at',
        'purchase_by',
        'payment_mode',
        'cheque_no',
        'cheque_date_at',
        'amount',
        'branch',
        'transaction_no',
        'purchase_note',

        // book item
        'grace_total_price',
        'tax_amount',
        'discount_type',
        'discount_amount',
        'discount',
        'total',
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

    public function vendor(){
        return $this->belongsTo(LibraryVendor::class, 'library_vendor_id', 'id');
    }

    public function purchaseBooks(){
        return $this->hasMany(BookItem::class, 'book_purchase_id', 'id');
    }
}
