<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductLocationAllocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'product_id',
        'infra_level_id',
        'created_by',
        'allocate_date',
        'quantity',
        'status'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function infraLevel()
    {
        return $this->belongsTo(InfraLevel::class, 'infra_level_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
