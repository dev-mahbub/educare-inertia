<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'staff_id',
        'issued_by',
        'created_by',
        'audience_type',
        'document_category',
        'document_name',
        'document_no',
        'generated_for',
        'notes',
        'issued_date',
        'status',
        'document_category_id',
        'is_with_document'
    ];

    public function staff()
    {
        return $this->belongsTo(Staff::class, 'staff_id');
    }

    public function issuedBy()
    {
        return $this->belongsTo(Staff::class, 'issued_by');
    }

    public function file()
    {
        return $this->morphOne(File::class, 'fileable');
    }

    public function documentCategory()
    {
        return $this->belongsTo(DocumentCategory::class, 'document_category_id');
    }
}
