<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Journal extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'created_by',
        'type_id',
        'journal_date',
        'voucher_no',
        'debit_amount',
        'credit_amount',
        'total_amount',
        'description',
        'is_canceled',
        'cancel_reason',
        'status'
    ];

    public function journalLedgers()
    {
        return $this->hasMany(JournalLedger::class, 'journal_id');
    }

    public function type()
    {
        return $this->belongsTo(Type::class, 'type_id');
    }
}
