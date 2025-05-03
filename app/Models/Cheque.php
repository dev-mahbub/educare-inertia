<?php

namespace App\Models;

use App\Models\Bank;
use App\Models\Student;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cheque extends Model
{
    use HasFactory;


    protected $fillable = [
        'school_id',
        'academic_year_id',
        'classroom_id',
        'student_id',
        'bank_id',
        'cheque_no',
        'cheque_date',
        'pay_date',
        'amount',
        'receipt_no',
        'branch',
        'clearance_date',
        'clearance_note',
        'penalty',
        'cheque_status',
        'status',
    ];



    public function bank()
    {
        return $this->belongsTo(Bank::class);
    }


    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
