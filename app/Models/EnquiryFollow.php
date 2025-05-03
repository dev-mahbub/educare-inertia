<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EnquiryFollow extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'enquiry_id',
        'activity',
        'activity_date_at',
        'follow_date_at',
        'next_action',
        'is_next_action',
        'status',
        'created_by'
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
