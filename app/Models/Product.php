<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'category_id',
        'sub_category_id',
        'uom_id',
        'title',
        'description',
        'type',
        'is_opening_stock',
        'opening_stock',
        'rate_per_product',
        'gst_tax',
        'product_code',
        'product_size',
        'amount',
        'purchase_date_at',
        'note',
        'status',
        'purchased_by',
        'available_stock'
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
     * Define a belongsTo relationship with the PartyAccount model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function purchasedBy()
    {
        return $this->belongsTo(User::class, 'purchased_by');
    }

    public function productSalePrice()
    {
        return $this->hasOne(ProductSalePrice::class, 'product_id')->latestOfMany();
    }

    public function productLocationAllocations()
    {
        return $this->hasMany(ProductLocationAllocation::class, 'product_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
