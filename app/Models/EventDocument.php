<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'event_id',
        'created_by',
        'name',
        'description',
        'file_type',
        'status'
    ];

    public function file()
    {
        return $this->morphOne(File::class, 'fileable');
    }
}
