<?php

namespace App\Models;

use App\Enums\Status;
use App\Enums\GuardianType;
use App\Models\StudentNote;
use App\Enums\CertificateType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
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
        'enquiry_id',
        'father_occupation_id',
        'mother_occupation_id',
        'user_id',
        'class_name_id',
        'classroom_id',
        'country_id',
        'admission_no',
        'admission_date_at',
        'employment_cat_id',
        'sibling_student_id',
        'is_have_sibling',
        'student_type',
        'first_name',
        'middle_name',
        'last_name',
        'phone',
        'email',
        // 'roll_no',
        'boarding_type',
        'caste_type',
        'is_computer_option',
        'is_social_studies_option',
        'gender',
        'aadhar_card_no',
        'blood_group',
        'admission_class',
        'religion',
        'srn_no',
        'child_id',
        'samagra_id',
        'birth_place',
        'caste',
        'sub_caste',
        'mother_tongue',
        'medical_condition',
        'context',
        'notes',
        'biometric_code',
        'remark',
        'birth_date_at',
        'start_date_at',
        'end_date_at',
        'extension_date_at',
        'date_at',
        'height',
        'weight',
        'present_address',
        'present_state',
        'present_city',
        'present_taluka',
        'present_district',
        'present_pin_code',
        'permanent_address',
        'permanent_state',
        'permanent_city',
        'permanent_taluka',
        'permanent_district',
        'permanent_pin_code',
        'is_physical_disabled',
        'is_economically_weaker',
        'is_spacial_child',
        'prev_school_name',
        'prev_school_class',
        'prev_school_year',
        'prev_school_note',
        'prev_school_tc_no',
        'document_attached',
        'is_inactive',
        'student_status',
        'promoted_date_at',
        'promoted_by',
        'status',
        'reason',
        'status_date_at',
        'is_class_change',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'status' => Status::class,
    ];

    public function classroom()
    {
        return $this->belongsTo(Classroom::class, 'classroom_id');
    }

    public function religion_name()
    {
        return $this->belongsTo(Religion::class, 'religion', 'id');
    }

    public function blood_group_name()
    {
        return $this->belongsTo(BloodGroup::class, 'blood_group', 'id');
    }

    public function examAttendances()
    {
        return $this->hasMany(ExamAttendance::class, 'student_id');
    }

    public function mark()
    {
        return $this->hasOne(Mark::class, 'student_id', 'id')->where(['school_id' => getUserSchoolId(), 'academic_year_id' => getAcademicYearId()]);
    }

    public function markRaw()
    {
        return $this->hasOne(Mark::class, 'student_id', 'id');
    }

    public function remark()
    {
        return $this->hasOne(AcademicRemark::class, 'student_id', 'id');
    }

    //

    public function promotedClassroom()
    {
        return $this->hasOneThrough(Classroom::class, ClassroomStudent::class, 'student_id', 'id', 'id', 'classroom_id')
            ->where('classroom_students.academic_year_id', getAcademicYearId());
    }

    public function promotedClassroomRaw()
    {
        return $this->hasOneThrough(Classroom::class, ClassroomStudent::class, 'student_id', 'id', 'id', 'classroom_id');
    }

    public function previousClassroom()
    {
        return $this->hasOneThrough(Classroom::class, ClassroomStudent::class, 'student_id', 'id', 'id', 'classroom_id_from')
            ->where('classroom_students.academic_year_id', getAcademicYearId());
    }

    public function previousAcademicYear()
    {
        return $this->hasOneThrough(AcademicYear::class, ClassroomStudent::class, 'student_id', 'id', 'id', 'academic_year_id_from');
    }

    public function promotedAcademicYear()
    {
        return $this->hasOneThrough(AcademicYear::class, ClassroomStudent::class, 'student_id', 'id', 'id', 'academic_year_id');
    }

    public function classroomStudentTwo()
    {
        return $this->hasOne(ClassroomStudent::class, 'student_id', 'id')->where(['school_id' => getUserSchoolId(), 'academic_year_id' => getAcademicYearId()]);
    }

    public function classroomData()
    {
        return $this->belongsTo(Classroom::class, 'classroom_id', 'id')->select('id', 'title', 'academic_year_id');
    }

    public function classroomStudent()
    {
        return $this->hasOne(ClassroomStudent::class, 'student_id', 'id')
            ->where('academic_year_id', getAcademicYearId());
    }

    public function latestClassroomStudent()
    {
        return $this->hasOne(ClassroomStudent::class, 'student_id', 'id')
            ->where('school_id', getUserSchoolId())->latestOfMany();
    }

    public function classroomPromotedStudents()
    {
        return $this->hasMany(ClassroomStudent::class, 'student_id', 'id');
    }

    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class, 'academic_year_id', 'id')->select('id', 'academic_session');
    }

    public function classNameData()
    {
        return $this->belongsTo(ClassName::class, 'class_name_id', 'id');
    }

    public function country()
    {
        return $this->belongsTo(Country::class, 'country_id', 'id');
    }

    public function schoolData()
    {
        return $this->belongsTo(School::class, 'school_id', 'id')->select('id', 'affiliation_no', 'title', 'phone', 'mail', 'street_address', 'city', 'zip');
    }

    public function studentImage()
    {
        return $this->hasOne(Image::class, 'imageable_id', 'id')
            ->where('name', 'student_profile_image')
            ->where('school_id', getUserSchoolId());
    }

    public function student_father_profile_image()
    {
        return $this->hasOne(Image::class, 'imageable_id', 'id')
            ->where('name', 'student_father_profile_image')
            ->where('school_id', getUserSchoolId());
    }

    public function student_mother_profile_image()
    {
        return $this->hasOne(Image::class, 'imageable_id', 'id')
            ->where('name', 'student_mother_profile_image')
            ->where('school_id', getUserSchoolId());
    }

    public function studentImageRaw()
    {
        return $this->hasOne(Image::class, 'imageable_id', 'id')
            ->where('name', 'student_profile_image');
    }

    public function fatherImageRaw()
    {
        return $this->hasOne(Image::class, 'imageable_id', 'id')
            ->where('name', 'student_father_profile_image');
    }

    public function motherImageRaw()
    {
        return $this->hasOne(Image::class, 'imageable_id', 'id')
            ->where('name', 'student_mother_profile_image');
    }

    public function student_guardian_profile_image()
    {
        return $this->hasOne(Image::class, 'imageable_id', 'id')
            ->where('name', 'student_guardian_profile_image')
            ->where('school_id', getUserSchoolId());
    }

    public function allMemberImages()
    {
        return $this->hasMany(Image::class, 'imageable_id', 'id')
            ->where('school_id', getUserSchoolId());
    }

    public function schoolLogo()
    {
        return $this->hasOne(Image::class, 'imageable_id', 'school_id')
            ->where('name', 'image')
            ->where('school_id', getUserSchoolId());
    }

    public function updatedBy()
    {
        return $this->morphOne(UserActivity::class, 'activitiesable')->latestOfMany();
    }

    public function createdBy()
    {
        return $this->morphOne(UserActivity::class, 'activitiesable');
    }

    // public function firstActivity()
    // {
    //     return $this->hasOne(UserActivity::class, 'activitiesable_id', 'id')
    //         ->where('activitiesable_type', \App\Models\Student::class)
    //         ->where('school_id', getUserSchoolId());
    // }

    // public function lastActivity()
    // {
    //     return $this->morphOne(UserActivity::class, 'activitiesable')->where('school_id', getUserSchoolId());
    // }

    // public function getStudentImageByStudentId($id)
    // {
    //     $image = Image::where('imageable_id', $id)
    //         ->where('name', 'student_profile_image')
    //         ->where('school_id', getUserSchoolId())
    //         ->select('id', 'path')
    //         ->first();

    //     // Check if the result is not null before calling toArray()
    //     if ($image) {
    //         return $image->toArray();
    //     } else {
    //         // Handle the case where no record was found (e.g., return null, throw an exception, etc.)
    //         return null;
    //     }
    // }

    // public function getSchoolImageBySchoolId($id)
    // {
    //     $image = Image::where('imageable_id', $id)
    //         ->where('name', 'image')
    //         ->select('id', 'path')
    //         ->first();

    //     if ($image) {
    //         return $image->toArray();
    //     } else {
    //         return null;
    //     }
    // }

    public function guardians()
    {
        return $this->hasMany(Guardian::class, 'student_id');
    }

    public function classroomRoll()
    {
        return $this->hasOne(ClassroomRoll::class, 'student_id')->where(['academic_year_id' => getAcademicYearId()]);
    }

    public function classroomRollRaw()
    {
        return $this->hasOne(ClassroomRoll::class, 'student_id');
    }

    public function classroomRollData()
    {
        return $this->hasOne(ClassroomRoll::class, 'student_id', 'id')->select('id', 'roll_no');
    }

    public function father()
    {
        return $this->hasOne(Guardian::class, 'student_id')->where('guardian_type', GuardianType::FATHER?->value);
    }

    public function fatherData()
    {
        return $this->hasOne(Guardian::class, 'student_id')->where('guardian_type', GuardianType::FATHER->value)->select('id', 'first_name', 'middle_name', 'last_name');
    }

    public function mother()
    {
        return $this->hasOne(Guardian::class, 'student_id')->where('guardian_type', GuardianType::MOTHER);
    }

    public function guardian()
    {
        return $this->hasOne(Guardian::class, 'student_id')->where('guardian_type', GuardianType::GUARDIAN);
    }


    public function classroom_fees()
    {
        return $this->hasMany(ClassroomFeeStudent::class);
    }

    public function classroom_structures_fees()
    {
        return $this->hasMany(ClassFeeStructureAmount::class, 'class_name_id');
    }

    public function classroom_fee_student_amounts()
    {
        return $this->hasMany(ClassFeeStudentAmount::class, 'student_id');
    }


    public function siblings()
    {
        return $this->belongsToMany(Student::class, 'student_siblings', 'student_id', 'sibling_id');
    }

    public function siblingOf()
    {
        return $this->belongsToMany(Student::class, 'student_siblings', 'sibling_id', 'student_id');
    }


    public function student_notes()
    {
        return $this->hasMany(StudentNote::class, 'student_id');
    }


    public function discount()
    {
        return $this->hasOneThrough(Discount::class, StudentFeeDiscount::class, 'student_id', 'id', 'id', 'discount_id');
    }


    public function student_fee_discounts()
    {
        return $this->hasMany(StudentFeeDiscount::class, 'student_id');
    }

    /**
     * Get house names and associated students.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public static function getHouseNamesWithStudents()
    {
        return static::select('houses.name as house_name', 'students.*')
            ->leftJoin('houses', 'students.school_id', '=', 'houses.school_id')
            ->orderBy('houses.name')
            ->get()
            ->groupBy('house_name');
    }

    /**
     * Define a relationship between Student and House.
     */
    public function student_house()
    {
        return $this->hasOne(StudentHouse::class, 'student_id');
    }

    public function house()
    {
        return $this->hasOneThrough(House::class, StudentHouse::class, 'student_id', 'id', 'id', 'house_id');
    }


    public function feeStructure()
    {
        return $this->hasOneThrough(ClassFeeStructure::class, ClassFeeStudentAmount::class, 'student_id', 'id', 'id', 'class_fee_structure_id');
    }


    public function fee_payments()
    {
        return $this->hasMany(FeePayment::class, 'student_id', 'id');
    }

    public function many_subjects()
    {
        return $this->belongsToMany(Subject::class);
    }

    public function marks()
    {
        return $this->hasMany(Mark::class);
    }

    public function due_follow_ups()
    {
        return $this->hasMany(StudentDueFollowUp::class, 'student_id');
    }

    public function hostelStudentAllocation()
    {
        return $this->hasOne(HostelStudentAllocation::class, 'student_id', 'id')->where(['is_current' => 1, 'academic_year_id' => getAcademicYearId()]);
    }


    public function employment_category()
    {
        return $this->belongsTo(Category::class, 'employment_cat_id', 'id');
    }

    public function student_category()
    {
        return $this->hasOne(StudentCategory::class, 'student_id', 'id');
    }

    public function allocateTransport()
    {
        return $this->hasOne(AllocateTransport::class, 'student_id')
            ->where('is_current', true)
            ->where('academic_year_id', getAcademicYearId())
            ->where('allocate_type_for', 'Student');
    }

    public function currentAllocateTransport()
    {
        return $this->hasOne(AllocateTransport::class, 'student_id')
            ->where('is_current', true)
            ->where('allocate_type_for', 'Student');
    }

    public function fee_allocate_transport()
    {
        return $this->hasOne(AllocateTransport::class, 'student_id')
            ->where('is_current', true)
            ->where('allocation_type', 'fee')
            ->latest();
    }


    public function voucher_allocate_transport()
    {
        return $this->hasOne(AllocateTransport::class, 'student_id')
            ->where('is_current', true)
            ->where('allocation_type', 'voucher')
            ->latest();
    }


    public function academicRank()
    {
        return $this->hasOne(StudentRank::class, 'student_id')
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId());
    }

    public function academicRankRaw()
    {
        return $this->hasOne(StudentRank::class, 'student_id');
    }

    public function studentTransferCertificate()
    {
        return $this->hasOne(StudentCertificate::class, 'student_id')
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('is_draft', false)
            ->where('is_generated', true)
            ->where('certificate_type', CertificateType::TRANSFER_CERTIFICATE->value);
    }

    public function studentTc()
    {
        return $this->hasOne(StudentCertificate::class, 'student_id')
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->where('certificate_type', CertificateType::TRANSFER_CERTIFICATE->value);
    }

    public function studentDocuments()
    {
        return $this->hasMany(StudentDocument::class, 'student_id');
    }

    public function studentAssessment()
    {
        return $this->hasMany(StudentAssessment::class, 'student_id');
    }

    public function studentAssessmentComment()
    {
        return $this->hasOne(StudentAssessmentComment::class, 'student_id', 'id')->latest('created_at');
    }

    public function homeworkStudentAssessmentComment()
    {
        return $this->hasOne(HomeworkStudentAssessmentComment::class, 'student_id', 'id')->latest('created_at');
    }

    public function classworkStudentAssessmentComment()
    {
        return $this->hasOne(ClassworkStudentAssessmentComment::class, 'student_id', 'id')->latest('created_at');
    }

    public function ledger()
    {
        return $this->hasOne(Ledger::class, 'student_id');
    }

    public function studentWalletTransactions()
    {
        return $this->hasMany(StudentWalletTransaction::class, 'student_id');
    }

    public function enquiry()
    {
        return $this->belongsTo(Enquiry::class, 'enquiry_id');
    }

    public function studentCustomFields()
    {
        return $this->hasMany(StudentCustomField::class, 'student_id');
    }
}
