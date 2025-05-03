<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicSyllabus extends Model
{
    use HasFactory;

    protected $table = "academic_syllabuses";

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'class_name_id',
        'subject_id',
        'title',
        'attachment',
        'status'
    ];

    public function className()
    {
        return $this->belongsTo(ClassName::class, 'class_name_id');
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function file()
    {
        return $this->morphOne(File::class, 'fileable');
    }
}
