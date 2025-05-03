<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookReturn extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'book_item_id',
        'book_acc_no_id',
        'book_issue_id',
        'student_id',
        'staff_id',
        'late_by_day',
        'late_by_fine',
        'book_user_type',
        'return_date_at',
        'return_note',
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

    public function bookItem()
    {
        return $this->belongsTo(BookItem::class, 'book_item_id', 'id');
    }

    public function bookAccNo()
    {
        return $this->belongsTo(BookAccNo::class, 'book_acc_no_id', 'id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'id');
    }

    public function staff()
    {
        return $this->belongsTo(Staff::class, 'staff_id', 'id');
    }
}
