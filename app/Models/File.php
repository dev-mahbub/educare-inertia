<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'fileable_type',
        'fileable_id',
        'name',
        'file_name',
        'path'
    ];

    public function fileable()
    {
        return $this->morphTo();
    }
}
