<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupportTicket extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'title',
        'details',
        'your_name',
        'your_email',
        'your_phone',
        'is_answered',
        'is_resolved',
        'status',
        'follow_up_date',
        'parent_name',
        'student_name',
        'parent_phone',
        'request_type',
        'request_date',
        'solution_note',
        'previous_solution_note',
        'solution_status',
        'assigned_to',
        'student_id',
        'classroom_id',
        'created_by',
        'admission_no',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
    */
    protected $casts = [
        'status' => Status::class,
    ];

    /**
     * Get the school that owns the SupportTicket
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function school()
    {
        return $this->belongsTo(School::class);
    }

    /**
     * Get the classroom that owns the SupportTicket
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function classroom()
    {
        return $this->belongsTo(Classroom::class, 'classroom_id');
    }

    /**
     * Get the user that owns the SupportTicket
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the student that owns the SupportTicket
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
    */
    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    /**
     * Get the assigned_to that owns the SupportTicket
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
