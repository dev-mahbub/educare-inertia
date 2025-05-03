<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomField extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'custom_field_type',
        'name',
        'form_section',
        'data_type',
        'input_length',
        'is_required',
        'display_order',
        'status',
        'list_value'
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
     * imageable polymorphic.
     */
    public function customFieldable()
    {
        return $this->morphTo();
    }
}
