<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enquiry extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'school_id',
        'classroom_id',
        'class_name_id',
        'category_id',
        'user_id',
        'source_id',
        'academic_year_id',
        'admission_academic_year_id',
        'state_id',
        'employment_category_id',
        'bank_account_id',
        'bank_id',
        'staff_id',
        'enquiry_date_at',
        'birth_date_at',
        'contact_name',
        'enquiry_detail',
        'contact_number',
        'contact_email',
        'person_to_meet',
        'in_time',
        'refer_contact_person',
        'refer_mobile',
        'enquiry_address',
        'reference_by',
        'boarding_scholar',
        'first_name',
        'middle_name',
        'last_name',
        'gender',
        'date_of_birth',
        'aadhar_card_no',
        'blood_group',
        'religion',
        'country_id',
        'date_of_registration',
        'form_no',
        'srn_no',
        'child_id',
        'samagra_id',
        'mother_tongue',
        'medical_condition',
        'is_transport_availed',
        'is_physically_disabled',
        'is_special_child',
        'conomically_weaker_section',
        'student_image',
        'father_image',
        'mother_image',
        'guardian_image',
        'school_name',
        'school_class',
        'school_year',
        'tc_no',
        'referred_by',
        'is_have_sibling',
        'present_address',
        'present_state',
        'landmark',
        'city',
        'district',
        'taluka',
        'pin_code',
        'permanent_address',
        'permanent_state',
        'permanent_city',
        'permanent_taluka',
        'permanent_district',
        'permanent_pin_code',
        'sibling_name',
        'sibling_std',
        'sibling_adm_no',
        'sibling_year',
        'reference_by_parent',
        'enquiry_type',
        'enquiry_status',
        'is_enquiry',
        'status',
        'title',
        'description',
        'registration_status',
        'registration_no',
        'admission_type',
        'document_attached',
        'registration_mode',
        'date_of_admission'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'status' => Status::class,
    ];


    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function studentImage()
    {
        return $this->hasOne(Image::class, 'imageable_id', 'id')
            ->where('name', 'student_image')
            ->where('school_id', getUserSchoolId());
    }

    public function fatherImage()
    {
        return $this->hasOne(Image::class, 'imageable_id', 'id')
            ->where('name', 'father_image')
            ->where('school_id', getUserSchoolId());
    }

    public function motherImage()
    {
        return $this->hasOne(Image::class, 'imageable_id', 'id')
            ->where('name', 'mother_image')
            ->where('school_id', getUserSchoolId());
    }


    public function enquiry_fee()
    {
        return $this->hasOne(EnquiryFee::class);
    }

    public function session()
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class, 'academic_year_id');
    }

    public function admissionAcademicYear()
    {
        return $this->belongsTo(AcademicYear::class, 'admission_academic_year_id');
    }

    public function classroom()
    {
        return $this->belongsTo(Classroom::class, 'classroom_id');
    }

    public function className()
    {
        return $this->belongsTo(ClassName::class, 'class_name_id');
    }

    public function guardian()
    {
        return $this->hasOne(EnquiryGuardian::class, 'enquiry_id');
    }

    public function employment_category()
    {
        return $this->belongsTo(Category::class, 'employment_cat_id', 'id');
    }

    public function enquiryFollows()
    {
        return $this->hasMany(EnquiryFollow::class, 'enquiry_id');
    }

    public function student()
    {
        return $this->hasOne(Student::class, 'enquiry_id');
    }

    public function bloodGroup()
    {
        return $this->belongsTo(BloodGroup::class, 'blood_group');
    }

    public function religionName()
    {
        return $this->belongsTo(Religion::class, 'religion');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function presentState()
    {
        return $this->belongsTo(State::class, 'present_state', 'id');
    }

    public function permanentState()
    {
        return $this->belongsTo(State::class, 'permanent_state', 'id');
    }

    public function sibling()
    {
        return $this->hasOneThrough(Student::class, EnquiryStudentSibling::class, 'enquiry_id', 'id', 'id', 'sibling_id');
    }

    public function admissionExamMarks()
    {
        return $this->hasMany(AdmissionExamMark::class, 'enquiry_id');
    }

    public function enquiryCustomFields()
    {
        return $this->hasMany(EnquiryCustomField::class, 'enquiry_id');
    }
}
