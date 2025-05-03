<?php

namespace App\Models;

use App\Models\ClassName;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ClassFeeStructureClassName extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'academic_year_id',
        'class_fee_structure_id',
        'class_name_id',
        'status',
    ];


    // public function className()
    // {
    //     return $this->belongsTo(ClassName::class);
    // }
}
