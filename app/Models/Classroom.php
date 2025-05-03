<?php

namespace App\Models;

use App\Enums\Status;
use App\Enums\GuardianType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Classroom extends Model
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
        'academic_year_id',
        'class_monitor_id',
        'class_teacher_id',
        'title',
        'section_title',
        'display_order',
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

    public function examsTwo()
    {
        return $this->belongsToMany(Exam::class);
    }

    public function className()
    {
        return $this->belongsTo(ClassName::class, 'class_name_id');
    }

    public function classroomStudent()
    {
        return $this->hasOne(ClassroomStudent::class, 'id', 'classroom_id_from');
    }

    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class, 'academic_year_id');
    }

    public function classMonitor()
    {
        return $this->belongsTo(Student::class);
    }

    public function classTeacher()
    {
        return $this->belongsTo(Staff::class, 'class_teacher_id');
    }

    public function students()
    {
        return $this->hasMany(Student::class, 'classroom_id')->where(['status' => 'Active']);
    }

    public function students2()
    {
        return $this->hasManyThrough(Student::class, ClassroomStudent::class, 'classroom_id', 'id', 'id', 'student_id')
            ->where('classroom_students.academic_year_id', getAcademicYearId())
            ->where('students.status', Status::ACTIVE);
    }

    public function classNameStudents()
    {
        return $this->hasMany(Student::class, 'class_name_id', 'class_name_id');
    }

    public function classroomPromotedStudents()
    {
        return $this->hasMany(ClassroomStudent::class, 'classroom_id')->where(['school_id' => getUserSchoolId(), 'academic_year_id' => getAcademicYearId()]);
    }

    public function classroomPromotedStudentsRaw()
    {
        return $this->hasMany(ClassroomStudent::class, 'classroom_id');
    }

    public function studentGenerateTc()
    {
        return $this->hasMany(StudentCertificate::class, 'classroom_id', 'id')->where('is_generated', 1);
    }

    public function studentDraftTc()
    {
        return $this->hasMany(StudentCertificate::class, 'classroom_id', 'id')->where('is_draft', 1);
    }

    /**
     * Get all of the items for the user.
     */
    public function guardians()
    {
        return $this->hasManyThrough(Guardian::class, Student::class, 'classroom_id', 'student_id');
    }

    /**
     * Get all of the items for the user.
     */
    public function father()
    {
        return $this->hasManyThrough(Guardian::class, Student::class, 'classroom_id', 'student_id')->where('guardians.guardian_type', GuardianType::FATHER);
    }

    public function exams()
    {
        return $this->belongsToMany(Exam::class)->withPivot('exam_status');
    }

    public function enquiries()
    {
        return $this->hasMany(Enquiry::class);
    }

    public function subject()
    {
        return; // will be subjects
    }


    public function subjects()
    {
        return $this->hasManyThrough(Subject::class, ClassroomSubject::class, 'classroom_id', 'id', 'id', 'subject_id');
    }

    // public function students()
    // {
    //     return $this->hasManyThrough(Subject::class, ClassroomSubject::class, 'classroom_id', 'id', 'id', 'subject_id');
    // }


    public function studentCertificates()
    {
        return $this->hasMany(StudentCertificate::class, 'classroom_id', 'id');
    }

    public function transportStudents()
    {
        return $this->hasMany(AllocateTransport::class, 'classroom_id', 'id');
    }

    public function studentGatePass()
    {
        return $this->hasMany(StudentGatePass::class, 'classroom_id', 'id')->where(['school_id' => getUserSchoolId(), 'academic_year_id' => getAcademicYearId()]);
    }

    public function hostelStudentAllocations()
    {
        return $this->hasMany(HostelStudentAllocation::class, 'classroom_id', 'id')->where(['school_id' => getUserSchoolId(), 'academic_year_id' => getAcademicYearId(), 'is_current' => true]);
    }

    public function classroomSubjects()
    {
        return $this->HasMany(ClassroomSubject::class, 'classroom_id');
    }

    public function classroomPeriods()
    {
        return $this->HasMany(ClassroomPeriod::class, 'classroom_id');
    }
}
