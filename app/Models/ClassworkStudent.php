<?php

namespace App\Models;

use App\Enums\HomeworkStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassworkStudent extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'classwork_id',
        'user_id',
        'student_id',
        'title',
        'description',
        'file_path',
        'classwork_status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
    */
    protected $casts = [
        'classwork_status' => HomeworkStatus::class,
    ];

    public function classwork()
    {
        return $this->belongsTo(Classwork::class, 'classwork_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }


}
