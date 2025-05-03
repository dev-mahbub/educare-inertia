<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookAccNo extends Model
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
        'book_purchase_id',
        'book_issue_id',
        'book_return_id',
        'book_item_id',
        'acc_no',
        'date_at',
        'reason',
        'status',
        'book_type_status',
        'book_user_type',
        'classroom_id',
        'student_id',
        'staff_id',
        'damage_lost_date_at',
        'damage_lost_note',
        'price',
        'is_available',
        'is_allocated',
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
        return $this->hasOne(BookItem::class, 'id', 'book_item_id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'id');
    }

    public function staff()
    {
        return $this->belongsTo(Staff::class, 'staff_id', 'id');
    }

    public function bookIssue()
    {
        return $this->belongsTo(BookIssue::class, 'book_issue_id', 'id');
    }
}
