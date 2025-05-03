<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Library extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'academic_year_id',
        'parent_id',
        'name',
        'description',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
    */
    protected $casts = [
        'status' => Status::class,
    ];


    public function children()
    {
        return $this->hasMany(Library::class, 'parent_id', 'id');
    }

    public function parent()
    {
        return $this->belongsTo(Library::class, 'parent_id', 'id');
    }

    // Recursive method to get all descendants
    public function childLibraries()
    {
        return $this->children()->with('childLibraries');
    }
}
