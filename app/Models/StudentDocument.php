<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'student_id',
        'issued_by',
        'created_by',
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

    public function file()
    {
        return $this->morphOne(File::class, 'fileable');
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    public function documentCategory()
    {
        return $this->belongsTo(DocumentCategory::class, 'document_category_id');
    }
}
