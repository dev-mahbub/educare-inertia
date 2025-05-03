<?php

namespace App\Models;

use App\Enums\BookType;
use App\Enums\CategoryType;
use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'user_id',
        'book_purchase_id',
        'category_id',
        'class_name_id',
        'subject_id',
        'book_title',
        'author',
        'quantity',
        'price',
        'item_total_price',
        'type',
        // in house
        'type_id',
        'library_vendor_id',
        'author_two',
        'author_three',
        'publish_place',
        'classification_no',
        'purchasing_date_at',
        'publisher_name',
        'publish_year',
        'isbn_number',
        'volume',
        'edition',
        'no_of_pages',
        'language',
        'book_entry_date_at',
        'description',
        'bill_no',
        'barcode',
        'is_allocate_book_location',
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

    public function className()
    {
        return $this->belongsTo(ClassName::class, 'class_name_id', 'id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id')->where('category_type', CategoryType::BOOK->value);
    }

    public function bookAccNos()
    {
        return $this->hasMany(BookAccNo::class, 'book_item_id', 'id');
    }

    public function activeBookAccNos()
    {
        return $this->hasMany(BookAccNo::class, 'book_item_id', 'id')->where('status', Status::ACTIVE->value);
    }

    public function issuedBookAccNos()
    {
        return $this->hasMany(BookAccNo::class, 'book_item_id', 'id')->where(['is_available' => 0]);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
