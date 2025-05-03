<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'issued_by',
        'created_by',
        'document_category_id',
        'document_name',
        'document_no',
        'generated_for',
        'notes',
        'issued_date',
        'status',
        'is_with_document'
    ];

    public function documentCategory()
    {
        return $this->belongsTo(DocumentCategory::class, 'document_category_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function issuedBy()
    {
        return $this->belongsTo(User::class, 'issued_by');
    }

    public function file()
    {
        return $this->morphOne(File::class, 'fileable');
    }
}
