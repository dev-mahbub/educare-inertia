<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SmsCircular extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'template_category_id',
        'template_id',
        'title',
        'audience_type',
        'content',
        'status'
    ];
}
