<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductSalePrice extends Model
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
        'category_id',
        'sub_category_id',
        'sale_price',
        'applied_date_at',
        'note',
        'status',
        'applied_by'
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
    public function appliedBy()
    {
        return $this->belongsTo(User::class, 'applied_by');
    }
}
