<?php

namespace App\Models;

use App\Enums\CategoryType;
use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EBook extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'class_name_id',
        'subject_id',
        'category_id',
        'book_title',
        'author',
        'edition',
        'document_name',
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

    public function bookCategory(){
        return $this->belongsTo(Category::class, 'category_id', 'id')->where('category_type', CategoryType::BOOK->value);
    }

    public function document()
    {
        return $this->morphOne(Image::class, 'imageable')
            ->where('school_id', getUserSchoolId());
    }

    
    public function file()
    {
        return $this->morphOne(File::class, 'fileable');
    }

}
