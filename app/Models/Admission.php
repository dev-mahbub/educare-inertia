<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admission extends Model
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
        'title',
        'admission_type',
        'admission_number',
        'registration_seed',
        'start_date_at',
        'end_date_at',
        'contact_email',
        'contact_mobile',
        'is_open_or_close',
        'is_current',
        'is_online_registration',
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

    public function classrooms()
    {
        return $this->hasMany(AdmissionClassroom::class, 'admission_id', 'id')
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId());
    }
    
    public function admissionClassrooms(){
        return $this->hasMany(AdmissionClassroom::class, 'admission_id', 'id');
    }

    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class, 'academic_year_id');
    }
}
