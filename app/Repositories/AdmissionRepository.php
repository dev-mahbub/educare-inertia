<?php

namespace App\Repositories;

use Carbon\Carbon;
use App\Models\Mark;
use App\Models\User;
use App\Enums\Status;
use App\Models\State;
use App\Models\Source;
use App\Enums\ExamType;
use App\Models\Enquiry;
use App\Models\Student;
use App\Models\Subject;
use App\Models\ExamDate;
use App\Models\Admission;
use App\Models\Classroom;
use App\Enums\EnquiryType;
use App\Models\EnquiryFee;
use App\Models\StudentType;
use App\Enums\EnquiryStatus;
use App\Models\AcademicYear;
use App\Models\AdmissionExam;
use App\Models\EnquiryFollow;
use App\Models\Enquiry_status;
use App\Enums\FreezeMarkStatus;
// use DB;
use App\Models\EnquiryGuardian;
use App\Models\AdmissionStudent;
use App\Enums\RegistrationStatus;
use App\Enums\AdmissionExamStatus;
use App\Models\AdmissionClassroom;
use Illuminate\Support\Facades\DB;
use App\Enums\PhysicalConditionType;
use App\Models\EnquiryStudentSibling;
use App\Models\AdmissionExamEnquiries;

class AdmissionRepository implements IRepository, IAdmissionRepository
{
    public function getAll()
    {
        return Admission::all();
    }

    public function getById($id)
    {
        return Admission::findOrFail($id);
    }

    public function delete($id)
    {
        Admission::destroy($id);
    }

    public function create(array $arrayData)
    {
        return Admission::create($arrayData);
    }

    public function updateOrCreate($conditionArr, array $arrayData)
    {
        return Admission::updateOrCreate($conditionArr, $arrayData);
    }

    public function update($id, array $arrayData)
    {
        return Admission::whereId($id)->update($arrayData);
    }

    public function getActiveAll()
    {
        return Admission::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getAdmissionFromSessionId()
    {
        return Admission::where('status', Status::ACTIVE)
            ->with('classrooms')
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', getAcademicYearId())
            ->get();
    }

    public function getActiveByAcyId($acyId)
    {
        return Admission::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $acyId)
            ->first();
    }


    public function getAdmissionByAcademicYearId(int $academicYearId, $schoolId = null)
    {
        return Admission::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->with(['admissionClassrooms'])
            ->first();
    }

    public function getRegisterAll()
    {
        return Admission::where('status', Status::ACTIVE);
    }

    public function getActiveAdmissionNumberAndId()
    {
        return Admission::where('status', Status::ACTIVE)->select('id', 'admission_number')->latest()->get();
    }


    //admission enquery source
    public function getAllEnquerySource()
    {
        return Source::all();
    }

    public function getEnquerySourceById($id)
    {
        return Source::findOrFail($id);
    }

    public function getSchoolWiseEnquerySourceById($id)
    {
        return Source::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->select(
                'id',
                'title',
                'description',
                'status'
            )
            ->firstOrFail();
    }

    public function deleteEnquerySource($id)
    {
        Source::destroy($id);
    }

    public function createEnquerySource(array $arrayData)
    {
        return Source::create($arrayData);
    }

    public function updateEnquerySource($id, array $arrayData)
    {
        return Source::whereId($id)->update($arrayData);
    }

    public function getActiveAllEnquerySource()
    {
        return Source::where('status', Status::ACTIVE)->get();
    }

    public function getSchoolWiseActiveAllEnquerySource($schoolId = null)
    {
        return Source::where('status', Status::ACTIVE)
            ->where('school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->select(
                'id',
                'title',
                'description',
                'status'
            )
            ->get();
    }

    public function getRegisterAllEnquerySource()
    {
        return Source::where('status', Status::ACTIVE);
    }
    public function getActiveTitleAndId()
    {
        return Source::where('status', Status::ACTIVE)
            ->select('id', 'title')
            ->get();
    }


    //admission enquiry status
    public function getAllEnquiryStatus()
    {
        return Enquiry_status::all();
    }

    public function getEnqueryStausById($id)
    {
        return Enquiry_status::findOrFail($id);
    }

    public function deleteEnqueryStaus($id)
    {
        Enquiry_status::destroy($id);
    }

    public function createEnqueryStaus(array $arrayData)
    {
        return Enquiry_status::create($arrayData);
    }

    public function updateEnquiryStatus($id, array $arrayData)
    {
        return Enquiry_status::whereId($id)->update($arrayData);
    }

    public function getActiveAllEnqueryStaus()
    {
        return Enquiry_status::where('status', Status::ACTIVE)->get();
    }

    public function getSchoolWiseActiveAllEnqueryStatus()
    {
        return Enquiry_status::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select(
                'id',
                'title',
                'description',
                'status',
            )
            ->get();
    }

    public function getSchoolWiseEnqueryStatusById(int $id)
    {
        return Enquiry_status::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->select(
                'id',
                'title',
                'description',
                'status',
            )
            ->firstOrFail();
    }

    public function getRegisterAllEnqueryStaus()
    {
        return Enquiry_status::where('status', Status::ACTIVE);
    }

    //Registration Enquery Form
    public function getAllEnquery()
    {
        return Enquiry::all();
    }

    public function getEnqueryById($id)
    {
        return Enquiry::findOrFail($id);
    }

    public function getByEnquiryId($id)
    {
        return Enquiry::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('enquiry_type', EnquiryType::ENQUIRY)
            ->where('is_enquiry', true)
            ->where('id', $id)
            ->firstOrFail();
    }

    public function getRegistrationEnquiryById($id)
    {
        return Enquiry::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('enquiry_type', EnquiryType::REGISTRATION)
            ->where('id', $id)
            ->firstOrFail();
    }


    public function getAdmissionEnquiryById($id)
    {
        return Enquiry::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('enquiry_type', EnquiryType::ADMISSION)
            ->where('id', $id)
            ->firstOrFail();
    }

    public function getEnqueryFeeByEnqueryId($enqId)
    {
        return EnquiryFee::where('enquiry_id', $enqId)
            ->where('school_id', getUserSchoolId())
            ->first();
    }

    public function getEnqueryGuardianByEnqueryId($enqId)
    {
        return EnquiryGuardian::where('enquiry_id', $enqId)
            ->where('school_id', getUserSchoolId())
            ->first();
    }



    // Data for exam status
    public function getDataFromEnquiryStatus($examStatus, $searchAdmission, $startDate, $endDate, $boardingType)
    {
        return DB::table('enquiries')
            ->where('enquiries.status', Status::ACTIVE)
            ->leftJoin('enquiry_guardians', 'enquiries.id', '=', 'enquiry_guardians.enquiry_id')
            ->leftJoin('classrooms', 'enquiries.classroom_id', '=', 'classrooms.id')
            ->leftJoin('admission_exam_enquiries', 'enquiries.id', '=', 'admission_exam_enquiries.enquiry_id')
            ->leftJoin('admission_exams', 'enquiries.id', '=', 'admission_exams.enquiry_id')
            ->leftJoin('messages', 'enquiries.id', '=', 'messages.school_id') // Joining messages table
            ->when(!empty($examStatus), function ($query) use ($examStatus) {
                $query->where('admission_exam_enquiries.exam_status', $examStatus);
            })
            ->when(!empty($boardingType), function ($query) use ($boardingType) {
                $query->where('enquiries.boarding_scholar', $boardingType);
            })
            ->when(!empty($startDate), function ($query) use ($startDate) {
                $query->whereDate('admission_exams.test_date', '>=', $startDate);
            })
            ->when(!empty($endDate), function ($query) use ($endDate) {
                $query->whereDate('admission_exams.test_date', '<=', $endDate);
            })
            ->when(!empty($searchAdmission), function ($query) use ($searchAdmission) {
                // Assuming 'student_name' is the field you want to search on
                $query->where('enquiries.first_name', 'like', '%' . $searchAdmission . '%')
                    ->orWhere('enquiries.middle_name', 'like', '%' . $searchAdmission . '%')
                    ->orWhere('enquiries.last_name', 'like', '%' . $searchAdmission . '%');
            })
            ->select(
                'enquiries.*',
                // enquery student
                'enquiries.first_name as student_first_name',
                'enquiries.middle_name as student_middle_name',
                'enquiries.last_name as student_last_name',
                // enquery guardian
                'enquiry_guardians.id as enquiry_guardian_id',
                'enquiry_guardians.father_first_name as father_first_name',
                'enquiry_guardians.father_middle_name as father_middle_name',
                'enquiry_guardians.father_last_name as father_last_name',
                //
                'enquiry_guardians.father_mobile',
                //
                'admission_exams.test_date as test_date',

                //
                'messages.status as message_status',

                //
                'admission_exam_enquiries.status as status_one',

                // classroom
                'classrooms.title as  classroomTitle',
                //
                'admission_exam_enquiries.exam_status'
            )
            ->get();
    }

    public function getDataFromEnquiryStatusAll()
    {
        return DB::table('enquiries')
            ->leftJoin('enquiry_guardians', 'enquiries.id', '=', 'enquiry_guardians.enquiry_id')
            ->leftJoin('classrooms', 'enquiries.classroom_id', '=', 'classrooms.id')
            ->leftJoin('admission_exam_enquiries', 'enquiries.id', '=', 'admission_exam_enquiries.enquiry_id')
            ->leftJoin('admission_exams', 'enquiries.id', '=', 'admission_exams.enquiry_id')
            ->leftJoin('messages', 'enquiries.id', '=', 'messages.school_id') // Joining messages table
            ->where('enquiries.status', Status::ACTIVE)
            ->select(
                'enquiries.*',
                // enquery student
                'enquiries.first_name as student_first_name',
                'enquiries.middle_name as student_middle_name',
                'enquiries.last_name as student_last_name',
                // enquery guardian
                'enquiry_guardians.id as enquiry_guardian_id',
                'enquiry_guardians.father_first_name as father_first_name',
                'enquiry_guardians.father_middle_name as father_middle_name',
                'enquiry_guardians.father_last_name as father_last_name',
                //
                'enquiry_guardians.father_mobile',
                //
                'admission_exams.test_date as test_date',

                //
                'messages.status as message_status',

                //
                'admission_exam_enquiries.status as status_one',

                // classroom
                'classrooms.title as  classroomTitle',
                //
                'admission_exam_enquiries.exam_status'
            )
            ->get();
    }

    /**Start-
     *
     */
    public function getDataFromEnquiryBased($typeToSearch, $academicID, $classroomID, $registrationStatusID, $examStatusID)
    {
        return DB::table('enquiries')
            ->leftJoin('enquiry_guardians', 'enquiries.id', '=', 'enquiry_guardians.enquiry_id')
            ->leftJoin('classrooms', 'enquiries.classroom_id', '=', 'classrooms.id')
            ->leftJoin('admission_exam_enquiries', 'enquiries.id', '=', 'admission_exam_enquiries.enquiry_id')
            ->leftJoin('admission_exams', 'enquiries.id', '=', 'admission_exams.enquiry_id')
            ->leftJoin('messages', 'enquiries.id', '=', 'messages.school_id') // Joining messages table
            ->when(!empty($academicID), function ($query) use ($academicID) {
                $query->where('enquiries.academic_year_id', $academicID);
            })
            ->when(!empty($classroomID), function ($query) use ($classroomID) {
                $query->where('enquiries.classroom_id', $classroomID);
            })
            ->when(!empty($registrationStatusID), function ($query) use ($registrationStatusID) {
                $query->where('enquiries.enquiry_status', $registrationStatusID);
            })
            ->when(!empty($examStatusID), function ($query) use ($examStatusID) {
                $query->where('admission_exam_enquiries.exam_status', $examStatusID);
            })
            ->when(!empty($typeToSearch), function ($query) use ($typeToSearch) {
                // Assuming 'student_name' is the field you want to search on
                $query->where('enquiries.first_name', 'like', '%' . $typeToSearch . '%')
                    ->orWhere('enquiries.middle_name', 'like', '%' . $typeToSearch . '%')
                    ->orWhere('enquiries.last_name', 'like', '%' . $typeToSearch . '%');
            })
            ->where('enquiries.status', Status::ACTIVE)
            ->select(
                'enquiries.*',
                // enquery student
                'enquiries.first_name as student_first_name',
                'enquiries.middle_name as student_middle_name',
                'enquiries.last_name as student_last_name',
                // enquery guardian
                'enquiry_guardians.id as enquiry_guardian_id',
                'enquiry_guardians.father_first_name as father_first_name',
                'enquiry_guardians.father_middle_name as father_middle_name',
                'enquiry_guardians.father_last_name as father_last_name',
                //
                'enquiry_guardians.father_mobile',
                //
                'admission_exams.test_date as test_date',

                //
                'messages.status as message_status',

                //
                'admission_exam_enquiries.status as status_one',

                // classroom
                'classrooms.title as  classroomTitle',
                //
                'admission_exam_enquiries.exam_status'
            )
            ->get();
    }

    /**End-
     *
     */

    /**Start-
     *
     */
    public function getDataFromEnquiryBasedOnExamStatusAll()
    {
        return DB::table('enquiries')
            ->leftJoin('enquiry_guardians', 'enquiries.id', '=', 'enquiry_guardians.enquiry_id')
            ->leftJoin('classrooms', 'enquiries.classroom_id', '=', 'classrooms.id')
            ->leftJoin('admission_exam_enquiries', 'enquiries.id', '=', 'admission_exam_enquiries.enquiry_id')
            ->leftJoin('admission_exams', 'enquiries.id', '=', 'admission_exams.enquiry_id')
            ->leftJoin('messages', 'enquiries.id', '=', 'messages.school_id') // Joining messages table
            ->where('enquiries.status', Status::ACTIVE)
            ->select(
                'enquiries.*',
                // enquery student
                'enquiries.first_name as student_first_name',
                'enquiries.middle_name as student_middle_name',
                'enquiries.last_name as student_last_name',
                // enquery guardian
                'enquiry_guardians.id as enquiry_guardian_id',
                'enquiry_guardians.father_first_name as father_first_name',
                'enquiry_guardians.father_middle_name as father_middle_name',
                'enquiry_guardians.father_last_name as father_last_name',
                //
                'enquiry_guardians.father_mobile',
                //
                'admission_exams.test_date as test_date',

                //
                'messages.status as message_status',

                //
                'admission_exam_enquiries.status as status_one',

                // classroom
                'classrooms.title as  classroomTitle',
                //
                'admission_exam_enquiries.exam_status'
            )
            ->get();
    }

    public function getDataFromEnquiryBasedOnExamStatus()
    {
        return DB::table('enquiries')
            ->leftJoin('enquiry_guardians', 'enquiries.id', '=', 'enquiry_guardians.enquiry_id')
            ->leftJoin('classrooms', 'enquiries.classroom_id', '=', 'classrooms.id')
            ->leftJoin('admission_exam_enquiries', 'enquiries.id', '=', 'admission_exam_enquiries.enquiry_id')
            ->leftJoin('admission_exams', 'enquiries.id', '=', 'admission_exams.enquiry_id')
            ->leftJoin('messages', 'enquiries.id', '=', 'messages.school_id') // Joining messages table
            ->where('enquiries.status', Status::ACTIVE)
            ->select(
                'enquiries.*',
                // enquery student
                'enquiries.first_name as student_first_name',
                'enquiries.middle_name as student_middle_name',
                'enquiries.last_name as student_last_name',
                // enquery guardian
                'enquiry_guardians.id as enquiry_guardian_id',
                'enquiry_guardians.father_first_name as father_first_name',
                'enquiry_guardians.father_middle_name as father_middle_name',
                'enquiry_guardians.father_last_name as father_last_name',
                //
                'enquiry_guardians.father_mobile',
                //
                'admission_exams.test_date as test_date',

                //
                'messages.status as message_status',

                //
                'admission_exam_enquiries.status as status_one',

                // classroom
                'classrooms.title as  classroomTitle',
                //
                'admission_exam_enquiries.exam_status'
            )
            ->get();
    }

    //filter
    public function getDataFromEnquiryBasedOnExamStatusFielter($selectStatus, $startDate, $endDate, $academicYearId, $classForData)
    {
        return DB::table('enquiries')
            ->leftJoin('enquiry_guardians', 'enquiries.id', '=', 'enquiry_guardians.enquiry_id')
            ->leftJoin('classrooms', 'enquiries.classroom_id', '=', 'classrooms.id')
            ->leftJoin('admission_exam_enquiries', 'enquiries.id', '=', 'admission_exam_enquiries.enquiry_id')
            ->leftJoin('admission_exams', 'enquiries.id', '=', 'admission_exams.enquiry_id')
            ->leftJoin('messages', 'enquiries.id', '=', 'messages.school_id') // Joining messages table
            ->where('enquiries.status', Status::ACTIVE)
            ->when(!empty($academicYearId), function ($query) use ($academicYearId) {
                $query->where('enquiries.academic_year_id', $academicYearId);
            })
            ->when(!empty($classForData), function ($query) use ($classForData) {
                $query->where('enquiries.classroom_id', $classForData);
            })
            ->when(!empty($selectStatus), function ($query) use ($selectStatus) {
                $query->where('admission_exam_enquiries.status', $selectStatus);
            })
            ->when(!empty($startDate), function ($query) use ($startDate) {
                $query->whereDate('enquiries.enquiry_date_at', '>=', $startDate);
            })
            ->when(!empty($endDate), function ($query) use ($endDate) {
                $query->whereDate('enquiries.enquiry_date_at', '<=', $endDate);
            })
            ->select(
                'enquiries.*',
                // enquery student
                'enquiries.first_name as student_first_name',
                'enquiries.middle_name as student_middle_name',
                'enquiries.last_name as student_last_name',
                // enquery guardian
                'enquiry_guardians.id as enquiry_guardian_id',
                'enquiry_guardians.father_first_name as father_first_name',
                'enquiry_guardians.father_middle_name as father_middle_name',
                'enquiry_guardians.father_last_name as father_last_name',
                //
                'enquiry_guardians.father_mobile',
                //
                'admission_exams.test_date as test_date',

                //
                'messages.status as message_status',

                //
                'admission_exam_enquiries.status as status_one',

                // classroom
                'classrooms.title as  classroomTitle',
                //
                'admission_exam_enquiries.exam_status'
            )
            ->get();
    }

    public function getDataFromEnquiryBasedOnExamStatusAllData()
    {
        return DB::table('enquiries')
            ->leftJoin('enquiry_guardians', 'enquiries.id', '=', 'enquiry_guardians.enquiry_id')
            ->leftJoin('classrooms', 'enquiries.classroom_id', '=', 'classrooms.id')
            ->leftJoin('admission_exam_enquiries', 'enquiries.id', '=', 'admission_exam_enquiries.enquiry_id')
            ->leftJoin('admission_exams', 'enquiries.id', '=', 'admission_exams.enquiry_id')
            ->leftJoin('messages', 'enquiries.id', '=', 'messages.school_id') // Joining messages table
            ->where('enquiries.status', Status::ACTIVE)
            ->select(
                'enquiries.*',
                // enquery student
                'enquiries.first_name as student_first_name',
                'enquiries.middle_name as student_middle_name',
                'enquiries.last_name as student_last_name',
                // enquery guardian
                'enquiry_guardians.id as enquiry_guardian_id',
                'enquiry_guardians.father_first_name as father_first_name',
                'enquiry_guardians.father_middle_name as father_middle_name',
                'enquiry_guardians.father_last_name as father_last_name',
                //
                'enquiry_guardians.father_mobile',
                //
                'admission_exams.test_date as test_date',

                //
                'messages.status as message_status',

                //
                'admission_exam_enquiries.status as status_one',

                // classroom
                'classrooms.title as  classroomTitle',
                //
                'admission_exam_enquiries.exam_status'
            )
            ->get();
    }
    /**End-
     *
     */

    public function getEnqueryRelationObjById($id)
    {
        return Enquiry::where('enquiries.id', $id)
            ->where('enquiries.school_id', getUserSchoolId())
            ->where('enquiries.status', Status::ACTIVE)
            ->leftJoin('enquiry_fees', 'enquiries.id', '=', 'enquiry_fees.enquiry_id')
            ->leftJoin('enquiry_guardians', 'enquiries.id', '=', 'enquiry_guardians.enquiry_id')
            ->leftJoin('academic_years', 'enquiries.academic_year_id', '=', 'academic_years.id')
            ->leftJoin('classrooms', 'enquiries.classroom_id', '=', 'classrooms.id')
            ->leftJoin('class_names', 'enquiries.class_name_id', '=', 'class_names.id')
            ->leftJoin('users', 'enquiry_fees.created_by', '=', 'users.id')
            ->select(
                'enquiries.*',

                // enquiry_fees
                'enquiry_fees.id as enquery_fee_id',
                'enquiry_fees.academic_fee',
                'enquiry_fees.fee_amount',
                'enquiry_fees.payment_mode',
                'enquiry_fees.payment_note',
                'enquiry_fees.cheque_no',
                'enquiry_fees.cheque_date',
                'enquiry_fees.bank_id',
                'enquiry_fees.bank_account_id',
                'enquiry_fees.paytm_ref_no',
                'enquiry_fees.paytm_mobile',
                'enquiry_fees.neft_number',
                'enquiry_fees.neft_desc',
                'enquiry_fees.upi_number',
                'enquiry_fees.upi_description',
                'enquiry_fees.receipt_no',

                // enquery student
                'enquiries.first_name as student_first_name',
                'enquiries.middle_name as student_middle_name',
                'enquiries.last_name as student_last_name',

                // classroom
                'classrooms.title as  classroomTitle',
                'class_names.title as  classTitle',

                // enquery guardian
                'enquiry_guardians.id as enquiry_guardian_id',
                'enquiry_guardians.father_first_name as father_first_name',
                'enquiry_guardians.father_middle_name as father_middle_name',
                'enquiry_guardians.father_last_name as father_last_name',
                'enquiry_guardians.father_email',
                'enquiry_guardians.father_mobile',
                'enquiry_guardians.father_sms_number',
                'enquiry_guardians.father_occupation',
                'enquiry_guardians.father_highest_qualification',
                'enquiry_guardians.father_aadhar_card_no',
                'enquiry_guardians.father_whatsapp_no',
                'enquiry_guardians.father_income_per_year',
                'enquiry_guardians.father_department',
                'enquiry_guardians.father_designation',
                'enquiry_guardians.father_pan_card_no',
                'enquiry_guardians.father_company_name',
                'enquiry_guardians.father_office_address',
                //mother info
                'enquiry_guardians.mother_first_name',
                'enquiry_guardians.mother_middle_name',
                'enquiry_guardians.mother_last_name',
                'enquiry_guardians.mother_email',
                'enquiry_guardians.mother_mobile',
                'enquiry_guardians.mother_highest_qualification',
                'enquiry_guardians.mother_occupation',
                'enquiry_guardians.mother_income_per_year',
                'enquiry_guardians.mother_department',
                'enquiry_guardians.mother_designation',
                'enquiry_guardians.mother_aadhar_card_no',
                'enquiry_guardians.mother_pan_card_no',
                'enquiry_guardians.mother_company_name',
                'enquiry_guardians.mother_office_address',

                //academic session
                'academic_years.academic_session as session',

                // user
                'users.first_name as admin_first_name',
                'users.middle_name as admin_middle_name',
                'users.last_name as admin_last_name',
            )->first();
    }

    //Registration Daily Collection
    public function getEnquiryRelationObjBytbAll()
    {
        return Enquiry::where('enquiries.school_id', getUserSchoolId())
            ->where('enquiries.status', Status::ACTIVE)
            ->leftJoin('enquiry_fees', 'enquiries.id', '=', 'enquiry_fees.enquiry_id')
            ->leftJoin('enquiry_guardians', 'enquiries.id', '=', 'enquiry_guardians.enquiry_id')
            ->leftJoin('academic_years', 'enquiries.academic_year_id', '=', 'academic_years.id')
            ->leftJoin('classrooms', 'enquiries.classroom_id', '=', 'classrooms.id')
            ->select(
                'enquiries.*',

                // enquiry_fees
                'enquiry_fees.id as enquery_fee_id',
                'enquiry_fees.academic_fee as academic_fee',
                'enquiry_fees.fee_amount as fee_amount',
                'enquiry_fees.payment_mode as payment_mode',
                'enquiry_fees.payment_note',
                'enquiry_fees.cheque_no',
                'enquiry_fees.cheque_date',
                'enquiry_fees.bank_id',
                'enquiry_fees.bank_account_id',
                'enquiry_fees.paytm_ref_no',
                'enquiry_fees.paytm_mobile',
                'enquiry_fees.neft_number',
                'enquiry_fees.neft_desc',
                'enquiry_fees.upi_number',
                'enquiry_fees.upi_description',

                // enquery student
                'enquiries.first_name as student_first_name',
                'enquiries.middle_name as student_middle_name',
                'enquiries.last_name as student_last_name',

                // classroom
                'classrooms.title as  classroomTitle',

                // enquery guardian
                'enquiry_guardians.id as enquiry_guardian_id',
                'enquiry_guardians.father_first_name as father_first_name',
                'enquiry_guardians.father_middle_name as father_middle_name',
                'enquiry_guardians.father_last_name as father_last_name',
                'enquiry_guardians.father_email',
                'enquiry_guardians.father_mobile',
                'enquiry_guardians.father_sms_number',
                'enquiry_guardians.father_occupation',
                'enquiry_guardians.father_highest_qualification',
                'enquiry_guardians.father_aadhar_card_no',
                'enquiry_guardians.father_whatsapp_no',
                'enquiry_guardians.father_income_per_year',
                'enquiry_guardians.father_department',
                'enquiry_guardians.father_designation',
                'enquiry_guardians.father_pan_card_no',
                'enquiry_guardians.father_company_name',
                'enquiry_guardians.father_office_address',
                //mother info
                'enquiry_guardians.mother_first_name',
                'enquiry_guardians.mother_middle_name',
                'enquiry_guardians.mother_last_name',
                'enquiry_guardians.mother_email',
                'enquiry_guardians.mother_mobile',
                'enquiry_guardians.mother_highest_qualification',
                'enquiry_guardians.mother_occupation',
                'enquiry_guardians.mother_income_per_year',
                'enquiry_guardians.mother_department',
                'enquiry_guardians.mother_designation',
                'enquiry_guardians.mother_aadhar_card_no',
                'enquiry_guardians.mother_pan_card_no',
                'enquiry_guardians.mother_company_name',
                'enquiry_guardians.mother_office_address',

                //academic session
                'academic_years.academic_session as session',
            )->get();
    }

    public function getEnquiryRelationObjBytb($academicYearID, $startDate, $endDate)
    {

        return Enquiry::where('enquiries.school_id', getUserSchoolId())
            ->leftJoin('enquiry_fees', 'enquiries.id', '=', 'enquiry_fees.enquiry_id')
            ->leftJoin('enquiry_guardians', 'enquiries.id', '=', 'enquiry_guardians.enquiry_id')
            ->leftJoin('academic_years', 'enquiries.academic_year_id', '=', 'academic_years.id')
            ->leftJoin('classrooms', 'enquiries.classroom_id', '=', 'classrooms.id')
            ->where('enquiries.status', Status::ACTIVE)
            ->where('enquiries.academic_year_id', $academicYearID)
            ->when(!empty($startDate), function ($query) use ($startDate) {
                $query->whereDate('enquiries.enquiry_date_at', '>=', $startDate);
            })
            ->when(!empty($endDate), function ($query) use ($endDate) {
                $query->whereDate('enquiries.enquiry_date_at', '<=', $endDate);
            })
            ->select(
                'enquiries.*',

                // enquiry_fees
                'enquiry_fees.id as enquery_fee_id',
                'enquiry_fees.academic_fee as academic_fee',
                'enquiry_fees.fee_amount as fee_amount',
                'enquiry_fees.payment_mode as payment_mode',
                'enquiry_fees.payment_note',
                'enquiry_fees.cheque_no',
                'enquiry_fees.cheque_date',
                'enquiry_fees.bank_id',
                'enquiry_fees.bank_account_id',
                'enquiry_fees.paytm_ref_no',
                'enquiry_fees.paytm_mobile',
                'enquiry_fees.neft_number',
                'enquiry_fees.neft_desc',
                'enquiry_fees.upi_number',
                'enquiry_fees.upi_description',

                // enquery student
                'enquiries.first_name as student_first_name',
                'enquiries.middle_name as student_middle_name',
                'enquiries.last_name as student_last_name',

                // classroom
                'classrooms.title as  classroomTitle',

                // enquery guardian
                'enquiry_guardians.id as enquiry_guardian_id',
                'enquiry_guardians.father_first_name as father_first_name',
                'enquiry_guardians.father_middle_name as father_middle_name',
                'enquiry_guardians.father_last_name as father_last_name',
                'enquiry_guardians.father_email',
                'enquiry_guardians.father_mobile',
                'enquiry_guardians.father_sms_number',
                'enquiry_guardians.father_occupation',
                'enquiry_guardians.father_highest_qualification',
                'enquiry_guardians.father_aadhar_card_no',
                'enquiry_guardians.father_whatsapp_no',
                'enquiry_guardians.father_income_per_year',
                'enquiry_guardians.father_department',
                'enquiry_guardians.father_designation',
                'enquiry_guardians.father_pan_card_no',
                'enquiry_guardians.father_company_name',
                'enquiry_guardians.father_office_address',
                //mother info
                'enquiry_guardians.mother_first_name',
                'enquiry_guardians.mother_middle_name',
                'enquiry_guardians.mother_last_name',
                'enquiry_guardians.mother_email',
                'enquiry_guardians.mother_mobile',
                'enquiry_guardians.mother_highest_qualification',
                'enquiry_guardians.mother_occupation',
                'enquiry_guardians.mother_income_per_year',
                'enquiry_guardians.mother_department',
                'enquiry_guardians.mother_designation',
                'enquiry_guardians.mother_aadhar_card_no',
                'enquiry_guardians.mother_pan_card_no',
                'enquiry_guardians.mother_company_name',
                'enquiry_guardians.mother_office_address',

                //academic session
                'academic_years.academic_session as session',
            )->get();
    }


    public function deleteEnquery($id)
    {
        Enquiry::destroy($id);
    }

    public function createEnquiry(array $arrayData)
    {
        return Enquiry::create($arrayData);
    }

    public function createEnquiryFollows(array $arrayData)
    {
        return EnquiryFollow::create($arrayData);
    }

    public function createAdmissionExam(array $arrayData)
    {
        return AdmissionExam::create($arrayData);
    }

    public function updateOrCreateAdmissionExam(array $attributesToCheck, array $valuesToUpdate)
    {
        return AdmissionExam::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function updateOrCreateAdmissionExamEnquiry(array $attributesToCheck, array $valuesToUpdate)
    {
        return AdmissionExamEnquiries::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function createEnquiryFee(array $arrayData)
    {
        return EnquiryFee::create($arrayData);
    }

    public function createEnquiryParents(array $arrayData)
    {
        return EnquiryGuardian::create($arrayData);
    }

    public function updateEnquery($id, array $arrayData)
    {
        return Enquiry::whereId($id)->update($arrayData);
    }

    public function updateEnquiryFee($enqId, array $arrayData)
    {
        return EnquiryFee::where('enquiry_id', $enqId)->update($arrayData);
    }

    public function updateEnquiryParents($enqId, array $arrayData)
    {
        return EnquiryGuardian::where('enquiry_id', $enqId)->update($arrayData);
    }

    public function getRegisterAllEnquery()
    {
        return Enquiry::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->get();
    }

    public function getActiveState()
    {
        return State::where('status', Status::ACTIVE)
            ->select('id', 'name')
            ->get();
    }

    public function getActiveAllEnquery()
    {
        return Enquiry::where('enquiries.status', Status::ACTIVE)
            ->leftJoin('enquiry_fees', 'enquiry_fees.enquiry_id', '=', 'enquiries.id')
            ->leftJoin('enquiry_guardians', 'enquiry_guardians.enquiry_id', '=', 'enquiries.id')
            ->leftJoin('users', 'users.id', '=', 'enquiries.user_id')
            ->leftJoin('classrooms', 'classrooms.id', '=', 'enquiries.classroom_id')
            ->where('enquiries.enquiry_type', EnquiryType::ENQUIRY)
            ->where('enquiries.school_id', getUserSchoolId())
            ->select(
                'users.username as user_name',
                'classrooms.id as classroom_id',
                'classrooms.title as class_title',
                'classrooms.class_name_id as class_name_id',
                'enquiries.*',
                'enquiry_fees.fee_amount',
                'enquiry_guardians.father_first_name',
                'enquiry_guardians.father_middle_name',
                'enquiry_guardians.father_last_name',
                'enquiry_guardians.father_email',
                'enquiry_guardians.father_mobile',
                'enquiry_guardians.father_sms_number',
                'enquiry_guardians.father_occupation',
                'enquiry_guardians.father_highest_qualification',
                'enquiry_guardians.father_department',
            )
            ->get();
    }

    public function getActiveEnqueryAll()
    {
        return Enquiry::where('enquiries.status', Status::ACTIVE)
            ->where('enquiries.is_enquiry', true)
            ->where('enquiries.school_id', getUserSchoolId())
            ->where('enquiries.academic_year_id', getAcademicYearId())
            ->leftJoin('enquiry_guardians', 'enquiry_guardians.enquiry_id', '=', 'enquiries.id')
            ->leftJoin('users', 'users.id', '=', 'enquiries.user_id')
            ->leftJoin('class_names', 'class_names.id', '=', 'enquiries.class_name_id')
            ->leftJoin('academic_years', 'academic_years.id', '=', 'enquiries.academic_year_id')
            ->with(['enquiryFollows' => function ($query) {
                $query->with([
                    'createdBy:users.id,users.first_name,users.middle_name,users.last_name'
                ])->select(
                    'enquiry_follows.id',
                    'enquiry_follows.created_by',
                    'enquiry_follows.enquiry_id',
                    'enquiry_follows.activity',
                    'enquiry_follows.activity_date_at',
                    'enquiry_follows.follow_date_at',
                );
            }])
            ->select(
                'users.username as user_name',
                'class_names.id as class_name_id',
                'class_names.title as class_title',
                'enquiries.*',
                'enquiry_guardians.father_first_name',
                'enquiry_guardians.father_middle_name',
                'enquiry_guardians.father_last_name',
                'enquiry_guardians.father_email',
                'enquiry_guardians.father_mobile',
                'enquiry_guardians.father_sms_number',
                'enquiry_guardians.father_occupation',
                'enquiry_guardians.father_highest_qualification',
                'enquiry_guardians.father_department',
                'academic_years.academic_session',
            )
            ->get();
    }

    /**Start Day Wise Enquiry Filter Data*/
    public function getActiveAllEnqueryFilterDataDayWise($startDate)
    {
        return Enquiry::where('enquiries.status', Status::ACTIVE)
            ->leftJoin('enquiry_fees', 'enquiry_fees.enquiry_id', '=', 'enquiries.id')
            ->leftJoin('enquiry_guardians', 'enquiry_guardians.enquiry_id', '=', 'enquiries.id')
            ->leftJoin('users', 'users.id', '=', 'enquiries.user_id')
            ->leftJoin('classrooms', 'classrooms.id', '=', 'enquiries.classroom_id')
            ->where('enquiries.enquiry_type', EnquiryType::ENQUIRY)
            ->where('enquiries.school_id', getUserSchoolId())
            ->when(!empty($startDate), function ($query) use ($startDate) {
                $query->whereDate('enquiries.enquiry_date_at', '=', $startDate);
            })

            ->select(
                'users.username as user_name',
                'classrooms.id as classroom_id',
                'classrooms.title as class_title',
                'classrooms.class_name_id as class_name_id',
                'enquiries.*',
                'enquiry_fees.fee_amount',
                'enquiry_guardians.father_first_name',
                'enquiry_guardians.father_middle_name',
                'enquiry_guardians.father_last_name',
                'enquiry_guardians.father_email',
                'enquiry_guardians.father_mobile',
                'enquiry_guardians.father_sms_number',
                'enquiry_guardians.father_occupation',
                'enquiry_guardians.father_highest_qualification',
                'enquiry_guardians.father_department',
            )
            ->get();
    }

    /**Start Enquiry Filter Data*/
    public function getActiveEnqueryAllFilterData($landmarkName, $schoolAdminName, $search, $classId, $enquiryStatus, $startDate, $endDate)
    {
        return Enquiry::where('enquiries.school_id', getUserSchoolId())
            ->where('enquiries.academic_year_id', getAcademicYearId())
            ->where('enquiries.is_enquiry', true)
            ->leftJoin('enquiry_guardians', 'enquiry_guardians.enquiry_id', '=', 'enquiries.id')
            ->leftJoin('users', 'users.id', '=', 'enquiries.user_id')
            ->leftJoin('class_names', 'class_names.id', '=', 'enquiries.class_name_id')
            ->leftJoin('academic_years', 'academic_years.id', '=', 'enquiries.academic_year_id')
            ->when(!empty($landmarkName), function ($query) use ($landmarkName) {
                $query->where('enquiries.landmark', $landmarkName);
            })
            ->when(!empty($schoolAdminName), function ($query) use ($schoolAdminName) {
                $query->where('enquiries.user_id', $schoolAdminName);
            })
            ->when(!empty($classId), function ($query) use ($classId) {
                $query->where('enquiries.class_name_id', $classId);
            })
            ->when(!empty($enquiryStatus), function ($query) use ($enquiryStatus) {
                $query->where('enquiries.enquiry_status', $enquiryStatus);
            })
            ->when(!empty($startDate), function ($query) use ($startDate) {
                $query->whereDate('enquiries.enquiry_date_at', '>=', $startDate);
            })
            ->when(!empty($endDate), function ($query) use ($endDate) {
                $query->whereDate('enquiries.enquiry_date_at', '<=', $endDate);
            })
            ->when(!empty($search), function ($query) use ($search) {
                $query->where('enquiries.first_name', 'like', '%' . $search . '%')
                    ->orWhere('enquiries.middle_name', 'like', '%' . $search . '%')
                    ->orWhere('enquiries.last_name', 'like', '%' . $search . '%');
            })
            ->with(['enquiryFollows' => function ($query) {
                $query->with([
                    'createdBy:users.id,users.first_name,users.middle_name,users.last_name'
                ])->select(
                    'enquiry_follows.id',
                    'enquiry_follows.created_by',
                    'enquiry_follows.enquiry_id',
                    'enquiry_follows.activity',
                    'enquiry_follows.activity_date_at',
                    'enquiry_follows.follow_date_at',
                );
            }])
            ->select(
                'users.username as user_name',
                'class_names.id as class_name_id',
                'class_names.title as class_title',
                'enquiries.*',
                'enquiry_guardians.father_first_name',
                'enquiry_guardians.father_middle_name',
                'enquiry_guardians.father_last_name',
                'enquiry_guardians.father_email',
                'enquiry_guardians.father_mobile',
                'enquiry_guardians.father_sms_number',
                'enquiry_guardians.father_occupation',
                'enquiry_guardians.father_highest_qualification',
                'enquiry_guardians.father_department',
                'academic_years.academic_session',
            )
            ->get();
    }
    /**End Enquiry Filter Data*/

    /**Start Enquiry Filter Data*/
    public function getActiveAllEnqueryFilterData($landmarkName, $schoolAdminName, $search, $classId, $enquiryStatus, $startDate, $endDate)
    {
        return Enquiry::where('enquiries.school_id', getUserSchoolId())
            ->leftJoin('enquiry_fees', 'enquiry_fees.enquiry_id', '=', 'enquiries.id')
            ->leftJoin('enquiry_guardians', 'enquiry_guardians.enquiry_id', '=', 'enquiries.id')
            ->leftJoin('users', 'users.id', '=', 'enquiries.user_id')
            ->leftJoin('classrooms', 'classrooms.id', '=', 'enquiries.classroom_id')
            ->when(!empty($landmarkName), function ($query) use ($landmarkName) {
                $query->where('enquiries.landmark', $landmarkName);
            })
            ->when(!empty($schoolAdminName), function ($query) use ($schoolAdminName) {
                $query->where('enquiries.user_id', $schoolAdminName);
            })
            ->when(!empty($classId), function ($query) use ($classId) {
                $query->where('enquiries.classroom_id', $classId);
            })
            ->when(!empty($enquiryStatus), function ($query) use ($enquiryStatus) {
                $query->where('enquiries.status', $enquiryStatus);
            })
            ->when(!empty($startDate), function ($query) use ($startDate) {
                $query->whereDate('enquiries.enquiry_date_at', '>=', $startDate);
            })
            ->when(!empty($endDate), function ($query) use ($endDate) {
                $query->whereDate('enquiries.enquiry_date_at', '<=', $endDate);
            })
            ->when(!empty($search), function ($query) use ($search) {
                $query->where('enquiries.first_name', 'like', '%' . $search . '%')
                    ->orWhere('enquiries.middle_name', 'like', '%' . $search . '%')
                    ->orWhere('enquiries.last_name', 'like', '%' . $search . '%');
            })
            ->select(
                'users.username as user_name',
                'classrooms.id as classroom_id',
                'classrooms.title as class_title',
                'classrooms.class_name_id as class_name_id',
                'enquiries.*',
                'enquiry_fees.fee_amount',
                'enquiry_guardians.father_first_name',
                'enquiry_guardians.father_middle_name',
                'enquiry_guardians.father_last_name',
                'enquiry_guardians.father_email',
                'enquiry_guardians.father_mobile',
                'enquiry_guardians.father_sms_number',
                'enquiry_guardians.father_occupation',
                'enquiry_guardians.father_highest_qualification',
                'enquiry_guardians.father_department',
            )
            ->get();
    }
    /**End Enquiry Filter Data*/

    /**Start Day Wise Enquiry Filter Data*/
    public function getDataWiseReportFilterDateWise($startDate)
    {
        return Enquiry::where('enquiries.status', Status::ACTIVE)
            ->leftJoin('enquiry_fees', 'enquiry_fees.enquiry_id', '=', 'enquiries.id')
            ->leftJoin('enquiry_guardians', 'enquiry_guardians.enquiry_id', '=', 'enquiries.id')
            ->leftJoin('users', 'users.id', '=', 'enquiries.user_id')
            ->leftJoin('classrooms', 'classrooms.id', '=', 'enquiries.classroom_id')
            ->where('enquiries.enquiry_type', EnquiryType::ENQUIRY)
            ->where('enquiries.school_id', getUserSchoolId())
            ->when(!empty($startDate), function ($query) use ($startDate) {
                $query->whereDate('enquiries.enquiry_date_at', '=', $startDate);
            })

            ->select(
                'users.username as user_name',
                'classrooms.id as classroom_id',
                'classrooms.title as class_title',
                'classrooms.class_name_id as class_name_id',
                'enquiries.*',
                'enquiry_fees.fee_amount',
                'enquiry_guardians.father_first_name',
                'enquiry_guardians.father_middle_name',
                'enquiry_guardians.father_last_name',
                'enquiry_guardians.father_email',
                'enquiry_guardians.father_mobile',
                'enquiry_guardians.father_sms_number',
                'enquiry_guardians.father_occupation',
                'enquiry_guardians.father_highest_qualification',
                'enquiry_guardians.father_department',
            )
            ->get();
    }

    public function getDataWiseReport()
    {
        return Enquiry::where('enquiries.status', Status::ACTIVE)
            ->where('enquiries.school_id', getUserSchoolId())
            ->leftJoin('classrooms', 'enquiries.classroom_id', '=', 'classrooms.id')
            ->select(
                'enquiries.*',
                'classrooms.title as title',
            )
            ->get();
    }

    public function getActiveAllAdmissions()
    {
        return Enquiry::where('enquiries.status', Status::ACTIVE)
            ->where('enquiries.school_id', getUserSchoolId())
            ->leftJoin('users', 'users.id', '=', 'enquiries.user_id')
            ->leftJoin('enquiry_guardians', 'enquiry_guardians.enquiry_id', '=', 'enquiries.id')
            ->leftJoin('enquiry_fees', 'enquiries.id', '=', 'enquiry_fees.enquiry_id')
            ->leftJoin('class_names', 'class_names.id', '=', 'enquiries.class_name_id')
            ->whereIn('enquiries.enquiry_type', [EnquiryType::ADMISSION, EnquiryType::REGISTRATION])
            ->select(
                'users.first_name as user_first_name',
                'users.middle_name as user_middle_name',
                'users.last_name as user_last_name',
                'class_names.id as class_name_id',
                'class_names.title as class_title',
                'enquiries.*',
                'enquiry_fees.academic_fee',
                'enquiry_fees.fee_amount',
                'enquiry_guardians.father_first_name',
                'enquiry_guardians.father_middle_name',
                'enquiry_guardians.father_last_name',
                'enquiry_guardians.father_mobile',
            )
            ->get();
    }

    public function getActiveAllAdmissionsOld()
    {
        return Enquiry::where('enquiries.status', Status::ACTIVE)
            ->leftJoin('users', 'users.id', '=', 'enquiries.user_id')
            ->leftJoin('enquiry_guardians', 'enquiry_guardians.enquiry_id', '=', 'enquiries.id')
            ->leftJoin('enquiry_fees', 'enquiries.id', '=', 'enquiry_fees.enquiry_id')
            ->leftJoin('classrooms', 'classrooms.id', '=', 'enquiries.classroom_id')
            ->where('enquiries.enquiry_type', EnquiryType::ADMISSION)
            ->select(
                'users.username as user_name',
                'classrooms.id as classroom_id',
                'classrooms.title as title',
                'classrooms.class_name_id as class_name_id',
                'enquiries.*',
                'enquiry_fees.fee_amount',
                'enquiry_guardians.father_first_name as father_first_name',
                'enquiry_guardians.father_middle_name as father_middle_name',
                'enquiry_guardians.father_last_name as father_last_name',

            )
            ->get();
    }


    public function getActiveLandmark()
    {
        return Enquiry::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'landmark')->get();
    }
    public function getActiveClass()
    {
        return Enquiry::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'classroom_id')->get();
    }

    public function getActiveClassRoomName()
    {
        return Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'title')
            ->get();
    }

    public function getActiveStatus()
    {
        return Enquiry::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'status')->get();
    }
    public function getSchoolAdmin()
    {
        return Enquiry::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'user_id')->get();
    }

    public function getSchoolAdminName()
    {
        return User::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select('id', 'username')->get();
    }


    public function academicYearEnquiries(int $academicYearId = null)
    {
        return  Classroom::where('status', '=', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->whereHas('enquiries', function ($query) use ($academicYearId) {
                $query->where('academic_year_id', $academicYearId);
            })
            ->with(['enquiries' => function ($query) use ($academicYearId) {
                $query->where('academic_year_id', $academicYearId)
                    ->with(['enquiry_fee' => function ($query) {
                        $query->select('id', 'enquiry_id', 'fee_amount'); // Select the desired columns
                    }]);
            }])
            ->withCount(['enquiries' => function ($query) {
                $query->where('enquiry_status', EnquiryStatus::REGISTRATION_TAKEN);
            }])
            ->get();
    }

    public function academicYearEnquiriesForMonth($academicYearId)
    {

        $schoolId = getUserSchoolId();

        // Detailed data for each individual month
        $detailedData = DB::table('enquiries')
            ->join('academic_years', 'enquiries.academic_year_id', '=', 'academic_years.id')
            ->leftJoin('enquiry_fees', 'enquiries.id', '=', 'enquiry_fees.enquiry_id')
            ->leftJoin('classrooms', 'enquiries.classroom_id', '=', 'classrooms.id')
            ->where('enquiries.school_id', $schoolId)
            ->where('enquiries.status', Status::ACTIVE)
            ->where('enquiries.academic_year_id', $academicYearId)
            ->get(); // Retrieve detailed data for each day

        return $detailedData;
    }

    public function academicYearRegAmountData($academicYear)
    {
        $schoolId = getUserSchoolId();

        $dueData = DB::table('enquiries')
            ->join('academic_years', 'enquiries.academic_year_id', '=', 'academic_years.id')
            ->leftJoin('enquiry_fees', 'enquiries.id', '=', 'enquiry_fees.enquiry_id')
            ->leftJoin('classrooms', 'enquiries.classroom_id', '=', 'classrooms.id')
            ->leftJoin('enquiry_guardians', 'enquiries.id', '=', 'enquiry_guardians.enquiry_id')
            ->where('enquiries.school_id', $schoolId)
            ->where('enquiries.status', Status::ACTIVE)
            ->where('enquiries.academic_year_id', $academicYear)
            ->whereRaw('enquiry_fees.academic_fee - enquiry_fees.fee_amount > 0') // Assuming 'due_status' is a boolean column
            // ->whereColumn('enquiry_fees.academic_fee', '!=', 'enquiry_fees.fee_amount') // Assuming 'due_status' is a boolean column
            ->get(); // Retrieve detailed data for each day

        return $dueData;
    }

    public function academicYearDailyData($studentSarch, $startDate, $endDate, $academicYearId)
    {
        $schoolId = getUserSchoolId();

        $dailyData = DB::table('enquiries')
            ->join('academic_years', 'enquiries.academic_year_id', '=', 'academic_years.id')
            ->leftJoin('enquiry_fees', 'enquiries.id', '=', 'enquiry_fees.enquiry_id')
            ->leftJoin('classrooms', 'enquiries.classroom_id', '=', 'classrooms.id')
            ->leftJoin('enquiry_guardians', 'enquiries.id', '=', 'enquiry_guardians.enquiry_id')
            ->when(!empty($academicYearId), function ($query) use ($academicYearId) {
                $query->where('enquiries.academic_year_id', $academicYearId);
            })
            ->when(!empty($startDate), function ($query) use ($startDate) {
                $query->whereDate('enquiries.enquiry_date_at', '>=', $startDate);
            })
            ->when(!empty($endDate), function ($query) use ($endDate) {
                $query->whereDate('enquiries.enquiry_date_at', '<=', $endDate);
            })
            ->when(!empty($studentSarch), function ($query) use ($studentSarch) {
                // Assuming 'student_name' is the field you want to search on
                $query->where('enquiries.first_name', 'like', '%' . $studentSarch . '%')
                    ->orWhere('enquiries.middle_name', 'like', '%' . $studentSarch . '%')
                    ->orWhere('enquiries.last_name', 'like', '%' . $studentSarch . '%');
            })
            ->where('enquiries.school_id', $schoolId)
            ->where('enquiries.status', Status::ACTIVE)
            ->get(); // Retrieve detailed data for each day

        return $dailyData;
    }

    public function academicYearDailyDataAll()
    {
        $schoolId = getUserSchoolId();

        $dailyData = DB::table('enquiries')
            ->join('academic_years', 'enquiries.academic_year_id', '=', 'academic_years.id')
            ->leftJoin('enquiry_fees', 'enquiries.id', '=', 'enquiry_fees.enquiry_id')
            ->leftJoin('classrooms', 'enquiries.classroom_id', '=', 'classrooms.id')
            ->leftJoin('enquiry_guardians', 'enquiries.id', '=', 'enquiry_guardians.enquiry_id')
            ->where('enquiries.school_id', $schoolId)
            ->where('enquiries.status', Status::ACTIVE)
            ->get(); // Retrieve detailed data for each day

        return $dailyData;
    }


    // Delelte Registration

    public function deeletedRegistrationAll()
    {
        $schoolId = getUserSchoolId();

        $deleltedData = DB::table('enquiries')
            ->join('academic_years', 'enquiries.academic_year_id', '=', 'academic_years.id')
            ->leftJoin('enquiry_fees', 'enquiries.id', '=', 'enquiry_fees.enquiry_id')
            ->leftJoin('classrooms', 'enquiries.classroom_id', '=', 'classrooms.id')
            ->leftJoin('enquiry_guardians', 'enquiries.id', '=', 'enquiry_guardians.enquiry_id')
            ->where('enquiries.school_id', $schoolId)
            ->where('enquiries.status', Status::DELETED)
            ->get();

        return $deleltedData;
    }

    public function deeletedRegistration($academicYearID)
    {
        $schoolId = getUserSchoolId();

        $deleltedDataFilter = DB::table('enquiries')
            ->join('academic_years', 'enquiries.academic_year_id', '=', 'academic_years.id')
            ->leftJoin('enquiry_fees', 'enquiries.id', '=', 'enquiry_fees.enquiry_id')
            ->leftJoin('classrooms', 'enquiries.classroom_id', '=', 'classrooms.id')
            ->leftJoin('enquiry_guardians', 'enquiries.id', '=', 'enquiry_guardians.enquiry_id')
            ->when(!empty($academicYearID), function ($query) use ($academicYearID) {
                $query->where('enquiries.academic_year_id', '=', $academicYearID);
            })
            ->where('enquiries.school_id', $schoolId)
            ->where('enquiries.status', Status::DELETED)
            ->get();

        return $deleltedDataFilter;
    }


    public function deletedRegistrationsByAcademicYearId(int $academicYearId = null)
    {
        $schoolId = getUserSchoolId();

        $data = DB::table('enquiries')
            ->join('academic_years', 'enquiries.academic_year_id', '=', 'academic_years.id')
            ->leftJoin('enquiry_fees', 'enquiries.id', '=', 'enquiry_fees.enquiry_id')
            ->leftJoin('class_names', 'enquiries.class_name_id', '=', 'class_names.id')
            ->leftJoin('enquiry_guardians', 'enquiries.id', '=', 'enquiry_guardians.enquiry_id')
            ->when(!empty($academicYearId), function ($query) use ($academicYearId) {
                $query->where('enquiries.admission_academic_year_id', '=', $academicYearId);
            })
            ->where('enquiries.school_id', $schoolId)
            ->where('enquiries.status', Status::DELETED)
            ->select(
                //enquiries
                'enquiries.id',
                'enquiries.registration_no',
                'enquiries.date_of_registration',
                'enquiries.first_name',
                'enquiries.middle_name',
                'enquiries.last_name',
                //enquiry_fees
                'enquiry_fees.academic_fee',
                //class_names
                'class_names.title as class_title',
                //enquiry_guardians
                'enquiry_guardians.father_first_name',
                'enquiry_guardians.father_middle_name',
                'enquiry_guardians.father_last_name',
                'enquiry_guardians.father_mobile',
            )
            ->get();

        return $data;
    }

    public function getRegistrationReportDataByAcademicYearId(int $academicYearId, $schoolId = null)
    {
        $schoolId = ($schoolId != null) ? $schoolId : getUserSchoolId();

        $data = DB::table('enquiries')
            ->leftJoin('enquiry_fees', 'enquiries.id', '=', 'enquiry_fees.enquiry_id')
            ->leftJoin('class_names', 'enquiries.class_name_id', '=', 'class_names.id')
            ->where('enquiries.admission_academic_year_id', '=', $academicYearId)
            ->where('enquiries.school_id', $schoolId)
            ->where('enquiries.status', Status::ACTIVE)
            ->whereIn('enquiries.enquiry_type', [EnquiryType::REGISTRATION, EnquiryType::ADMISSION])
            ->select(
                //enquiries
                'enquiries.id',
                'enquiries.date_of_registration',
                'enquiries.enquiry_type',
                'enquiries.class_name_id',
                //enquiry_fees
                'enquiry_fees.academic_fee',
                //class_names
                'class_names.title as class_title',
            )
            ->get();

        return $data;
    }

    public function getRegistrationReport(
        int $academicYearId,
        int $classNameId = null,
        string $examStatus = "",
        string $ewsStatus = "",
        string $physicalCondition = "",
        string $registrationStatus = "",
        string $registrationMode = "",
        string $fromDate = "",
        string $toDate = "",
        string $search = "",
        int $schoolId = null,
    ) {
        $schoolId = ($schoolId != null) ? $schoolId : getUserSchoolId();

        return Enquiry::leftJoin('users', 'users.id', '=', 'enquiries.user_id')
            ->leftJoin('enquiry_guardians', 'enquiry_guardians.enquiry_id', '=', 'enquiries.id')
            ->leftJoin('enquiry_fees', 'enquiries.id', '=', 'enquiry_fees.enquiry_id')
            ->leftJoin('class_names', 'class_names.id', '=', 'enquiries.class_name_id')
            ->leftJoin('admission_exams', 'admission_exams.enquiry_id', '=', 'enquiries.id')
            ->leftJoin('students', 'enquiries.id', '=', 'students.enquiry_id')
            ->where('enquiries.admission_academic_year_id', '=', $academicYearId)
            ->where('enquiries.school_id', $schoolId)
            ->where('enquiries.status', Status::ACTIVE)
            ->whereIn('enquiries.enquiry_type', [EnquiryType::REGISTRATION, EnquiryType::ADMISSION])
            ->where(function ($query) use (
                $classNameId,
                $examStatus,
                $ewsStatus,
                $physicalCondition,
                $registrationStatus,
                $registrationMode,
                $fromDate,
                $toDate
            ) {
                if (!empty($classNameId)) {
                    $query->where('enquiries.class_name_id', $classNameId);
                }

                if (!empty($examStatus)) {
                    if ($examStatus == AdmissionExamStatus::PENDING->value) {
                        $query->where('admission_exams.exam_status', $examStatus)
                            ->orWhereNull('admission_exams.exam_status');
                    } else {
                        $query->where('admission_exams.exam_status', $examStatus);
                    }
                }

                if (!empty($ewsStatus)) {
                    if ($ewsStatus == "Yes") {
                        $query->where('enquiries.conomically_weaker_section', true);
                    } else if ($ewsStatus == "No") {
                        $query->where('enquiries.conomically_weaker_section', false);
                    }
                }

                if (!empty($physicalCondition)) {
                    if ($physicalCondition == PhysicalConditionType::PHYSICALLY_DISABLED->value) {
                        $query->where('enquiries.is_physically_disabled', true);
                    } else if ($physicalCondition == PhysicalConditionType::SPECIAL_CHILD->value) {
                        $query->where('enquiries.is_special_child', true);
                    }
                }

                if (!empty($registrationStatus)) {
                    $query->where('enquiries.registration_status', $registrationStatus);
                }

                if (!empty($registrationMode)) {
                    $query->where('enquiries.registration_mode', $registrationMode);
                }

                if (!empty($fromDate)) {
                    $query->whereDate('enquiries.date_of_registration', '>=', $fromDate);
                }

                if (!empty($toDate)) {
                    $query->whereDate('enquiries.date_of_registration', '<=', $toDate);
                }
            })
            ->where(function ($query) use ($search) {
                if (!empty($search)) {
                    $query->where('enquiries.first_name', 'like', '%' . $search . '%')
                        ->orWhere('enquiries.middle_name', 'like', '%' . $search . '%')
                        ->orWhere('enquiries.last_name', 'like', '%' . $search . '%')
                        ->orWhere('enquiries.registration_no', 'like', '%' . $search . '%')
                        ->orWhere('enquiries.form_no', 'like', '%' . $search . '%')
                        ->orWhere('users.first_name', 'like', '%' . $search . '%')
                        ->orWhere('users.middle_name', 'like', '%' . $search . '%')
                        ->orWhere('users.last_name', 'like', '%' . $search . '%')
                        ->orWhere('enquiry_guardians.father_first_name', 'like', '%' . $search . '%')
                        ->orWhere('enquiry_guardians.father_middle_name', 'like', '%' . $search . '%')
                        ->orWhere('enquiry_guardians.father_last_name', 'like', '%' . $search . '%')
                        ->orWhere('enquiry_guardians.father_mobile', 'like', '%' . $search . '%')
                        ->orWhere('students.admission_no', 'like', '%' . $search . '%')
                        ->orWhere('class_names.title', 'like', '%' . $search . '%');
                }
            })
            ->select(
                //users
                'users.first_name as user_first_name',
                'users.middle_name as user_middle_name',
                'users.last_name as user_last_name',
                // class_names
                'class_names.id as class_name_id',
                'class_names.title as class_title',
                //enquiries
                'enquiries.*',
                //enquiry_fees
                'enquiry_fees.academic_fee',
                'enquiry_fees.fee_amount',
                //enquiry_guardians
                'enquiry_guardians.father_first_name',
                'enquiry_guardians.father_middle_name',
                'enquiry_guardians.father_last_name',
                'enquiry_guardians.father_mobile',
                // student
                'students.admission_no'
            )
            ->get();
    }


    public function getRegistrationDailyColectionReportData(int $academicYearId = null, string $startDate = "", string $endDate = "")
    {
        $schoolId = getUserSchoolId();

        $data = DB::table('enquiries')
            ->leftJoin('enquiry_fees', 'enquiries.id', '=', 'enquiry_fees.enquiry_id')
            ->leftJoin('class_names', 'enquiries.class_name_id', '=', 'class_names.id')
            ->where('enquiries.school_id', $schoolId)
            ->where('enquiries.status', Status::ACTIVE)
            ->where(function ($query) use ($academicYearId, $startDate, $endDate) {
                if (!empty($academicYearId)) {
                    $query->where('enquiries.admission_academic_year_id', '=', $academicYearId);
                }

                if (!empty($startDate)) {
                    $query->whereDate('enquiries.date_of_registration', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $query->whereDate('enquiries.date_of_registration', '<=', $endDate);
                }
            })
            ->whereIn('enquiries.enquiry_type', [EnquiryType::REGISTRATION, EnquiryType::ADMISSION])
            ->select(
                //enquiries
                'enquiries.id',
                'enquiries.first_name',
                'enquiries.middle_name',
                'enquiries.last_name',
                'enquiries.registration_no',
                'enquiries.date_of_registration',
                'enquiries.enquiry_type',
                'enquiries.class_name_id',
                'enquiries.registration_mode',
                //enquiry_fees
                'enquiry_fees.academic_fee',
                'enquiry_fees.payment_mode',
                'enquiry_fees.receipt_no',
                //class_names
                'class_names.title as class_title',
            )
            ->get();

        return $data;
    }

    public function getMonthWiseRegistrationReportByAcademicYearId(int $academicYearId)
    {
        $schoolId = getUserSchoolId();

        $data = DB::table('enquiries')
            ->leftJoin('enquiry_fees', 'enquiries.id', '=', 'enquiry_fees.enquiry_id')
            ->leftJoin('class_names', 'enquiries.class_name_id', '=', 'class_names.id')
            ->where('enquiries.school_id', $schoolId)
            ->where('enquiries.status', Status::ACTIVE)
            ->where('enquiries.admission_academic_year_id', '=', $academicYearId)
            ->whereIn('enquiries.enquiry_type', [EnquiryType::REGISTRATION, EnquiryType::ADMISSION])
            ->select(
                //enquiries
                'enquiries.id',
                'enquiries.first_name',
                'enquiries.middle_name',
                'enquiries.last_name',
                'enquiries.registration_no',
                'enquiries.date_of_registration',
                'enquiries.enquiry_type',
                'enquiries.class_name_id',
                'enquiries.registration_mode',
                //enquiry_fees
                'enquiry_fees.academic_fee',
                'enquiry_fees.payment_date',
                'enquiry_fees.payment_mode',
                'enquiry_fees.receipt_no',
                //class_names
                'class_names.title as class_title',
            )
            ->get();

        return $data;
    }


    public function getDailyAdmissionReport(int $academicYearId = null, string $startDate = "", string $endDate = "", string $studentSearch = "")
    {
        $schoolId = getUserSchoolId();

        return Enquiry::where('enquiries.status', Status::ACTIVE)
            ->where('enquiries.school_id', $schoolId)
            ->where(function ($query) use ($academicYearId, $startDate, $endDate, $studentSearch) {
                if (!empty($academicYearId)) {
                    $query->where('enquiries.admission_academic_year_id', '=', $academicYearId);
                }

                if (!empty($startDate)) {
                    $query->whereDate('enquiries.date_of_registration', '>=', $startDate);
                }

                if (!empty($endDate)) {
                    $query->whereDate('enquiries.date_of_registration', '<=', $endDate);
                }

                // if (!empty($studentSearch)) {
                //     $query->where('enquiries.first_name', 'like', '%' . $studentSearch . '%')
                //         ->orWhere('enquiries.middle_name', 'like', '%' . $studentSearch . '%')
                //         ->orWhere('enquiries.last_name', 'like', '%' . $studentSearch . '%')
                //         ->orWhere('enquiries.registration_no', 'like', '%' . $studentSearch . '%')
                //         ->orWhere('users.first_name', 'like', '%' . $studentSearch . '%')
                //         ->orWhere('users.middle_name', 'like', '%' . $studentSearch . '%')
                //         ->orWhere('users.last_name', 'like', '%' . $studentSearch . '%')
                //         ->orWhere('enquiry_guardians.father_first_name', 'like', '%' . $studentSearch . '%')
                //         ->orWhere('enquiry_guardians.father_middle_name', 'like', '%' . $studentSearch . '%')
                //         ->orWhere('enquiry_guardians.father_last_name', 'like', '%' . $studentSearch . '%')
                //         ->orWhere('students.admission_no', 'like', '%' . $studentSearch . '%')
                //         ->orWhere('classrooms.title', 'like', '%' . $studentSearch . '%');
                //     // ->orWhere('class_names.title', 'like', '%' . $studentSearch . '%');
                // }
            })
            ->where(function ($query) use ($studentSearch) {
                if (!empty($studentSearch)) {
                    $query->where('enquiries.first_name', 'like', '%' . $studentSearch . '%')
                        ->orWhere('enquiries.middle_name', 'like', '%' . $studentSearch . '%')
                        ->orWhere('enquiries.last_name', 'like', '%' . $studentSearch . '%')
                        ->orWhere('enquiries.registration_no', 'like', '%' . $studentSearch . '%')
                        ->orWhere('users.first_name', 'like', '%' . $studentSearch . '%')
                        ->orWhere('users.middle_name', 'like', '%' . $studentSearch . '%')
                        ->orWhere('users.last_name', 'like', '%' . $studentSearch . '%')
                        ->orWhere('enquiry_guardians.father_first_name', 'like', '%' . $studentSearch . '%')
                        ->orWhere('enquiry_guardians.father_middle_name', 'like', '%' . $studentSearch . '%')
                        ->orWhere('enquiry_guardians.father_last_name', 'like', '%' . $studentSearch . '%')
                        ->orWhere('students.admission_no', 'like', '%' . $studentSearch . '%')
                        ->orWhere('classrooms.title', 'like', '%' . $studentSearch . '%');
                    // ->orWhere('class_names.title', 'like', '%' . $studentSearch . '%');
                }
            })
            ->where('enquiries.enquiry_type', EnquiryType::ADMISSION)
            ->leftJoin('users', 'users.id', '=', 'enquiries.user_id')
            ->leftJoin('enquiry_guardians', 'enquiry_guardians.enquiry_id', '=', 'enquiries.id')
            // ->leftJoin('class_names', 'class_names.id', '=', 'enquiries.class_name_id')
            ->leftJoin('classrooms', 'classrooms.id', '=', 'enquiries.classroom_id')
            ->leftJoin('students', 'enquiries.id', '=', 'students.enquiry_id')
            ->select(
                //user
                'users.first_name as user_first_name',
                'users.middle_name as user_middle_name',
                'users.last_name as user_last_name',
                //class
                // 'class_names.title as class_title',
                'classrooms.title as classroom_title',
                //enquiry
                'enquiries.id',
                'enquiries.first_name',
                'enquiries.middle_name',
                'enquiries.last_name',
                'enquiries.registration_no',
                'enquiries.date_of_registration',
                'enquiries.date_of_admission',
                //enquiry guardian
                'enquiry_guardians.father_first_name',
                'enquiry_guardians.father_middle_name',
                'enquiry_guardians.father_last_name',
                // student
                'students.id as student_id',
                'students.admission_no'
            )
            ->get();
    }

    public function getAdmissionStatusSummaryReport()
    {
        $schoolId = getUserSchoolId();

        return Enquiry::where('enquiries.status', Status::ACTIVE)
            ->where('enquiries.school_id', $schoolId)
            ->where('enquiries.academic_year_id', getAcademicYearId())
            ->where('enquiries.is_enquiry', true)
            ->leftJoin('enquiry_guardians', 'enquiry_guardians.enquiry_id', '=', 'enquiries.id')
            ->leftJoin('class_names', 'class_names.id', '=', 'enquiries.class_name_id')
            ->select(
                //class
                'class_names.title as class_title',
                //enquiry
                'enquiries.id',
                'enquiries.first_name',
                'enquiries.middle_name',
                'enquiries.last_name',
                'enquiries.registration_no',
                'enquiries.date_of_registration',
                'enquiries.enquiry_status',
                //enquiry guardian
                'enquiry_guardians.father_first_name',
                'enquiry_guardians.father_middle_name',
                'enquiry_guardians.father_last_name',
                'enquiry_guardians.father_mobile',
            )
            ->orderBy('id', 'asc')
            ->get();
    }


    public function getClassWiseAdmissionSummaryReport()
    {
        $schoolId = getUserSchoolId();

        return Enquiry::where('enquiries.status', Status::ACTIVE)
            ->where('enquiries.school_id', $schoolId)
            ->where('enquiries.is_enquiry', true)
            ->leftJoin('enquiry_guardians', 'enquiry_guardians.enquiry_id', '=', 'enquiries.id')
            ->leftJoin('class_names', 'class_names.id', '=', 'enquiries.class_name_id')
            ->select(
                //class
                'class_names.title as class_title',
                //enquiry
                'enquiries.id',
                'enquiries.first_name',
                'enquiries.middle_name',
                'enquiries.last_name',
                'enquiries.registration_no',
                'enquiries.date_of_registration',
                'enquiries.enquiry_status',
                'enquiries.registration_status',
                'enquiries.enquiry_type',
                'enquiries.class_name_id',
                //enquiry guardian
                'enquiry_guardians.father_first_name',
                'enquiry_guardians.father_middle_name',
                'enquiry_guardians.father_last_name',
                'enquiry_guardians.father_mobile',
            )
            ->orderBy('id', 'asc')
            ->get();
    }


    public function getClassWiseRegistrationSummary($schoolId = null)
    {
        return Enquiry::where('enquiries.status', Status::ACTIVE)
            ->where('enquiries.school_id', ($schoolId != null) ? $schoolId : getUserSchoolId())
            ->whereIn('enquiries.enquiry_type', [EnquiryType::ADMISSION, EnquiryType::REGISTRATION])
            ->leftJoin('class_names', 'class_names.id', '=', 'enquiries.class_name_id')
            ->leftJoin('enquiry_fees', 'enquiries.id', '=', 'enquiry_fees.enquiry_id')
            ->select(
                //class
                'class_names.title as class_title',
                //enquiry
                'enquiries.id',
                'enquiries.registration_status',
                'enquiries.enquiry_type',
                'enquiries.class_name_id',
                // enquiry fee
                'enquiry_fees.academic_fee as fee_amount'
            )
            ->orderBy('id', 'asc')
            ->get();
    }

    public function getRegistrationSourceSummaryReport()
    {
        $schoolId = getUserSchoolId();

        return Enquiry::where('enquiries.status', Status::ACTIVE)
            ->where('enquiries.school_id', $schoolId)
            ->whereIn('enquiries.enquiry_type', [EnquiryType::REGISTRATION, EnquiryType::ADMISSION])
            ->leftJoin('enquiry_guardians', 'enquiry_guardians.enquiry_id', '=', 'enquiries.id')
            ->leftJoin('class_names', 'class_names.id', '=', 'enquiries.class_name_id')
            ->leftJoin('users', 'users.id', '=', 'enquiries.user_id')
            ->leftJoin('sources', 'sources.id', '=', 'enquiries.source_id')
            ->select(
                //user
                'users.first_name as user_first_name',
                'users.middle_name as user_middle_name',
                'users.last_name as user_last_name',
                //class
                'class_names.title as class_title',
                //enquiry
                'enquiries.id',
                'enquiries.first_name',
                'enquiries.middle_name',
                'enquiries.last_name',
                'enquiries.registration_no',
                'enquiries.enquiry_status',
                'enquiries.registration_status',
                'enquiries.enquiry_type',
                'enquiries.class_name_id',
                'enquiries.user_id',
                'enquiries.source_id',
                //enquiry guardian
                'enquiry_guardians.father_first_name',
                'enquiry_guardians.father_middle_name',
                'enquiry_guardians.father_last_name',
                'enquiry_guardians.father_mobile',
                // source
                'sources.title as source_title'
            )
            ->orderBy('id', 'asc')
            ->get();
    }

    // admission process----------
    public function createAdmissionClassroom(array $arrayData)
    {
        return AdmissionClassroom::create($arrayData);
    }

    public function updateOrCreateAdmissionClassroom(array $conditionArr, array $arrayData)
    {
        return AdmissionClassroom::updateOrCreate($conditionArr, $arrayData);
    }

    public function getActiveAllAdmClassroomByAcyAdmissionId($academicYearId, $admissionId)
    {
        return AdmissionClassroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->where('admission_id', $admissionId)
            ->get();
    }

    public function findAcademicYear()
    {
        return AcademicYear::where('status', Status::ACTIVE)
            ->select('id', 'academic_session')->get();
    }

    //Find Class Name
    public function findClassName()
    {
        return DB::table('classrooms')
            ->where('status', Status::ACTIVE)
            ->select(['id', 'title'])
            ->get();
    }

    // Find Enquiry Type
    public function findEnquiryType()
    {
        return DB::table('enquiries')
            ->where('status', Status::ACTIVE)
            ->select(['id', 'enquiry_type'])
            ->get();
    }



    // Find Enquiry Status
    public function findEnquiryStatus()
    {
        return DB::table('enquiries')
            ->where('status', Status::ACTIVE)
            ->select(['id', 'enquiry_status'])
            ->get();
    }

    // Find boarding Scholar
    public function boardingScholar()
    {
        return DB::table('enquiries')
            ->where('status', Status::ACTIVE)
            ->select(['id', 'boarding_scholar'])
            ->get();
    }






    //student type------
    public function getStudentTypeAll()
    {
        return StudentType::all();
    }

    public function getStudentTypeById($id)
    {
        return StudentType::findOrFail($id);
    }

    public function getSchoolWiseStudentTypeById(int $id)
    {
        return StudentType::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('id', $id)
            ->select(
                'id',
                'title',
                'description',
                'student_type',
                'status',
            )
            ->firstOrFail();
    }

    public function deleteStudentType($id)
    {
        StudentType::destroy($id);
    }

    public function createStudentType(array $arrayData)
    {
        return StudentType::create($arrayData);
    }

    public function updateStudentType($id, array $arrayData)
    {
        return StudentType::whereId($id)->update($arrayData);
    }

    public function getActiveAllStudentType()
    {
        return StudentType::where('status', Status::ACTIVE)->get();
    }

    public function getSchoolWiseActiveAllStudentType()
    {
        return StudentType::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->select(
                'id',
                'title',
                'description',
                'student_type',
                'status',
            )
            ->get();
    }

    public function getRegisterAllStudentType()
    {
        return StudentType::where('status', Status::ACTIVE);
    }

    public function todayRegistrations()
    {
        return Enquiry::whereDate('date_of_registration', '=',  Carbon::today()->format('Y-m-d'))
            ->where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->whereIn('enquiry_type', [EnquiryType::REGISTRATION, EnquiryType::ADMISSION])
            ->count();
    }

    public function todayAdmissions()
    {
        return Enquiry::whereDate('date_of_admission', '=',  Carbon::today()->format('Y-m-d'))
            ->where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('enquiry_type', EnquiryType::ADMISSION)
            ->count();
    }

    public function totalEnquiryCount()
    {
        return Enquiry::where('school_id', getUserSchoolId())
            // ->where('academic_year_id', getAcademicYearId())
            ->where('status', Status::ACTIVE)
            ->where('is_enquiry', true)
            ->count();
    }

    public function totalRegistrations()
    {
        return Enquiry::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->whereIn('enquiry_type', [EnquiryType::REGISTRATION, EnquiryType::ADMISSION])
            ->count();
    }

    public function totalAdmissions()
    {
        return Enquiry::where('school_id', getUserSchoolId())
            ->where('status', Status::ACTIVE)
            ->where('enquiry_type', EnquiryType::ADMISSION)
            ->count();
    }

    // student sibling
    public function createEnquerySibling(array $arrayData)
    {
        return EnquiryStudentSibling::create($arrayData);
    }

    public function updateOrCreateEnquerySibling(array $attributesToCheck, array $valuesToUpdate)
    {
        return EnquiryStudentSibling::updateOrCreate($attributesToCheck, $valuesToUpdate);
    }

    public function deleteEnquerySibling(int $enquiryId)
    {
        return EnquiryStudentSibling::where('school_id', getUserSchoolId())
            ->where('enquiry_id', $enquiryId)
            ->delete();
    }

    //School growth analytics - Admisison wise
    function getTotalRegistrationsPerSession()
    {
        $userSchoolId = getUserSchoolId(); // Fetch the user's school ID

        return DB::table('enquiries')
            ->join('academic_years', 'enquiries.academic_year_id', '=', 'academic_years.id')
            ->where('enquiries.school_id', $userSchoolId)
            ->where('enquiries.status', Status::ACTIVE)
            ->select(
                'academic_years.academic_session',
                DB::raw('COUNT(*) as total_registrations')
            )
            ->groupBy('academic_years.academic_session')
            ->get();
    }

    function getSessionWiseRegistrations()
    {
        return Enquiry::where('enquiries.status', Status::ACTIVE)
            ->where('enquiries.school_id', getUserSchoolId())
            ->whereIn('enquiries.enquiry_type', [EnquiryType::REGISTRATION, EnquiryType::ADMISSION])
            ->join('academic_years', 'enquiries.admission_academic_year_id', '=', 'academic_years.id')
            ->select(
                'enquiries.admission_academic_year_id',
                'academic_years.academic_session',
            )
            ->get();
    }

    //Last 7 Days Collection Analysis
    function getLast7DaysCollectionAnalysis()
    {
        $startDate = Carbon::now()->subDays(7)->startOfDay()->format('Y-m-d');
        $endDate = Carbon::now()->endOfDay()->format('Y-m-d');

        return DB::table('enquiries')
            ->where('enquiries.school_id', getUserSchoolId())
            ->where('enquiries.status', Status::ACTIVE)
            ->whereIn('enquiries.enquiry_type', [EnquiryType::REGISTRATION, EnquiryType::ADMISSION])
            ->whereBetween('enquiries.date_of_registration', [$startDate, $endDate])
            ->leftJoin('enquiry_fees', 'enquiries.id', '=', 'enquiry_fees.enquiry_id')
            ->select(
                'enquiries.date_of_registration',
                'enquiry_fees.academic_fee as fee_amount'
            )
            ->orderBy('enquiries.date_of_registration', 'ASC')
            ->get();
    }


    //Last 7 Days Registration Analysis
    function getLast7DaysRegistrationAnalysis()
    {
        $startDate = Carbon::now()->subDays(7)->startOfDay()->format('Y-m-d');
        $endDate = Carbon::now()->endOfDay()->format('Y-m-d');

        return DB::table('enquiries')
            ->where('enquiries.school_id', getUserSchoolId())
            ->where('enquiries.status', Status::ACTIVE)
            ->whereIn('enquiries.enquiry_type', [EnquiryType::REGISTRATION, EnquiryType::ADMISSION])
            ->whereBetween('enquiries.date_of_registration', [$startDate, $endDate])
            ->select(
                'enquiries.date_of_registration'
            )
            ->orderBy('enquiries.date_of_registration', 'ASC')
            ->get();
    }

    function getLast7DaysRegistrationAnalysisOld()
    {
        $schoolId = getUserSchoolId();
        $startDate = Carbon::now()->subDays(7)->startOfDay();
        $endDate = Carbon::now()->endOfDay();

        // Detailed data for each individual day
        $detailedData = DB::table('enquiries')
            ->join('academic_years', 'enquiries.academic_year_id', '=', 'academic_years.id')
            ->where('enquiries.school_id', $schoolId)
            ->where('enquiries.status', Status::ACTIVE)
            ->whereBetween('enquiries.created_at', [$startDate, $endDate])
            ->select(
                DB::raw('DATE(enquiries.created_at) as registration_date'),
                DB::raw('COUNT(*) as total_registrations')
            )
            ->groupBy('registration_date')
            ->orderBy('registration_date', 'ASC')
            ->get(); // Retrieve detailed data for each day

        // Format total_registrations data to '15-Dec'
        foreach ($detailedData as $data) {
            $formattedDate = Carbon::parse($data->registration_date);
            $data->registration_date = $formattedDate->format('d-M');
            $data->month_name = $formattedDate->format('M');
        }

        return [
            'detailed' => $detailedData
        ];
    }

    // 12-Month Registration Analysis
    function getDailyRegistrationAnalysis(int $academicYearId = null)
    {
        $schoolId = getUserSchoolId();

        // Detailed data for each individual month
        $detailedData = DB::table('enquiries')
            ->join('academic_years', 'enquiries.academic_year_id', '=', 'academic_years.id')
            ->leftJoin('enquiry_fees', 'enquiries.id', '=', 'enquiry_fees.enquiry_id')
            ->where('enquiries.school_id', $schoolId)
            ->where('enquiries.status', Status::ACTIVE)
            ->where('enquiries.academic_year_id', $academicYearId)
            ->select(
                DB::raw('DATE_FORMAT(enquiries.created_at, "%Y-%m-%d") as registration_date'),
                DB::raw('COUNT(*) as total_registrations'),
                DB::raw('SUM(fee_amount) as total_fee')
            )
            ->groupBy('registration_date')
            ->orderBy('registration_date', 'ASC')
            ->get(); // Retrieve detailed data for each day

        // Format total_registrations data to 'Dec 2021'
        foreach ($detailedData as $data) {
            $formattedDate = Carbon::parse($data->registration_date);
            $data->registration_date = $formattedDate->format('d-M-Y');
        }

        return $detailedData;
    }



    public function getActiveAllEnquiries($academicYearId = null, $classroomId = null, $fromDate = '', $toDate = '', $examStatus = '', $search = '')
    {
        return Enquiry::where('enquiries.status', Status::ACTIVE)
            ->where('enquiries.school_id', getUserSchoolId())
            ->when(!empty($academicYearId), function ($query) use ($academicYearId) {
                $query->where('enquiries.academic_year_id', $academicYearId);
            })
            ->when(!empty($classroomId), function ($query) use ($classroomId) {
                $query->where('enquiries.classroom_id', $classroomId);
            })
            ->when(!empty($fromDate), function ($query) use ($fromDate) {
                $query->where('enquiries.classroom_id', $fromDate);
            })
            ->when(!empty($toDate), function ($query) use ($toDate) {
                $query->where('enquiries.classroom_id', $toDate);
            })
            ->when(!empty($examStatus), function ($query) use ($examStatus) {
                $query->where('admission_exam_enquiries.exam_status', $examStatus);
            })
            ->when(!empty($search), function ($query) use ($search) {
                $query->where('enquiries.first_name', 'like', '%' . $search . '%')
                    ->orWhere('enquiries.middle_name', 'like', '%' . $search . '%')
                    ->orWhere('enquiries.last_name', 'like', '%' . $search . '%');
            })
            ->leftJoin('enquiry_guardians', 'enquiries.id', '=', 'enquiry_guardians.enquiry_id')
            ->leftJoin('admission_exams', 'enquiries.id', '=', 'admission_exams.enquiry_id')
            ->leftJoin('admission_exam_enquiries', 'enquiries.id', '=', 'admission_exam_enquiries.enquiry_id')
            ->select(
                'enquiries.*',
                'admission_exam_enquiries.exam_status as exam_status',
                'enquiry_guardians.father_first_name as father_first_name',
                'enquiry_guardians.father_middle_name as father_middle_name',
                'enquiry_guardians.father_last_name as father_last_name',
                'enquiry_guardians.father_mobile as father_mobile',
                'admission_exams.test_date as test_date'
            )
            ->get();
    }
    public function getByClass($academicYearId, $classroomId)
    {
        return Enquiry::where('enquiries.academic_year_id', $academicYearId)
            ->where('enquiries.classroom_id', $classroomId)
            ->leftJoin('enquiry_guardians', 'enquiries.id', '=', 'enquiry_guardians.enquiry_id')
            ->leftJoin('admission_exams', 'enquiries.id', '=', 'admission_exams.enquiry_id')
            ->leftJoin('admission_exam_enquiries', 'enquiries.id', '=', 'admission_exam_enquiries.enquiry_id')
            ->select(
                'enquiries.*',
                'admission_exam_enquiries.exam_status as exam_status',
                'enquiry_guardians.father_first_name as father_first_name',
                'enquiry_guardians.father_middle_name as father_middle_name',
                'enquiry_guardians.father_last_name as father_last_name',
                'enquiry_guardians.father_mobile as father_mobile',
                'admission_exams.test_date as test_date'
            )
            ->get();
    }


    public function getEnquiriesByAcademicYearIdAndClassNameId(int $academicYearId, int $classNameId, string $fromDate = "", string $toDate = "", string $examStatus = "")
    {
        return Enquiry::where('enquiries.status', Status::ACTIVE)
            ->where('enquiries.school_id', getUserSchoolId())
            ->where('enquiries.admission_academic_year_id', $academicYearId)
            ->where('enquiries.class_name_id', $classNameId)
            ->where('enquiries.enquiry_type', EnquiryType::REGISTRATION)
            ->where('enquiries.registration_status', RegistrationStatus::NEW)
            ->where(function ($query) use ($examStatus) {
                if (!empty($examStatus)) {
                    if ($examStatus == AdmissionExamStatus::PENDING->value) {
                        $query->where('admission_exams.exam_status', $examStatus)
                            ->orWhereNull('admission_exams.exam_status');
                    } else {
                        $query->where('admission_exams.exam_status', $examStatus);
                    }
                }
            })
            ->where(function ($query) use ($fromDate, $toDate) {
                if (!empty($fromDate)) {
                    $query->whereDate('admission_exams.test_date', '>=', $fromDate);
                }

                if (!empty($toDate)) {
                    $query->whereDate('admission_exams.test_date', '<=', $toDate);
                }
            })
            ->leftJoin('enquiry_guardians', 'enquiries.id', '=', 'enquiry_guardians.enquiry_id')
            ->leftJoin('admission_exams', 'enquiries.id', '=', 'admission_exams.enquiry_id')
            ->select(
                'enquiries.id',
                'enquiries.first_name',
                'enquiries.middle_name',
                'enquiries.last_name',
                'enquiries.registration_no',
                'enquiry_guardians.father_first_name',
                'enquiry_guardians.father_middle_name',
                'enquiry_guardians.father_last_name',
                'enquiry_guardians.father_mobile',
                'admission_exams.test_date',
                'admission_exams.test_time',
                'admission_exams.exam_status',
            )
            ->get();
    }

    public function getEnquiriesForRegistrationMark(int $academicYearId, int $classNameId)
    {
        return Enquiry::where('enquiries.status', Status::ACTIVE)
            ->where('enquiries.school_id', getUserSchoolId())
            ->where('enquiries.admission_academic_year_id', $academicYearId)
            ->where('enquiries.class_name_id', $classNameId)
            ->where('enquiries.enquiry_type', EnquiryType::REGISTRATION)
            ->where('enquiries.registration_status', RegistrationStatus::NEW)
            ->select(
                'enquiries.id',
                'enquiries.first_name',
                'enquiries.middle_name',
                'enquiries.last_name',
                'enquiries.registration_no',
            )
            ->get();
    }

    public function getRegistrationExamReport(
        int $academicYearId,
        int $classNameId,
        string $fromDate = "",
        string $toDate = "",
        string $regisrationStatus = ""
    ) {
        $classroomIds = Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->where('class_name_id', $classNameId)
            ->select('id')
            ->get()
            ->pluck('id')
            ->toArray();

        return Enquiry::where('enquiries.status', Status::ACTIVE)
            ->where('enquiries.school_id', getUserSchoolId())
            ->where('enquiries.admission_academic_year_id', $academicYearId)
            ->where('enquiries.class_name_id', $classNameId)
            ->where('enquiries.enquiry_type', EnquiryType::REGISTRATION)
            ->where(function ($query) use ($fromDate, $toDate, $regisrationStatus) {
                if (!empty($fromDate)) {
                    $query->whereDate('admission_exams.test_date', '>=', $fromDate);
                }

                if (!empty($toDate)) {
                    $query->whereDate('admission_exams.test_date', '<=', $toDate);
                }

                if (!empty($regisrationStatus)) {
                    $query->where('enquiries.registration_status', $regisrationStatus);
                }
            })
            ->leftJoin('enquiry_guardians', 'enquiries.id', '=', 'enquiry_guardians.enquiry_id')
            ->leftJoin('admission_exams', 'enquiries.id', '=', 'admission_exams.enquiry_id')
            ->whereHas('admissionExamMarks', function ($query) use ($classNameId, $academicYearId) {
                $query->where('admission_exam_marks.class_name_id', $classNameId)
                    ->where('admission_exam_marks.academic_year_id', $academicYearId);
            })
            ->with(['admissionExamMarks' => function ($query) use ($classNameId, $academicYearId, $classroomIds) {
                $query->where('admission_exam_marks.class_name_id', $classNameId)
                    ->where('admission_exam_marks.academic_year_id', $academicYearId)
                    ->with(['subject.classroomSubjects' => function ($query) use ($classroomIds) {
                        $query->whereIn('classroom_id', $classroomIds)
                            ->with(['examRoasters']);
                    }]);
            }])
            ->select(
                'enquiries.id',
                'enquiries.first_name',
                'enquiries.middle_name',
                'enquiries.last_name',
                'enquiries.registration_no',
                'enquiries.registration_status',
                'enquiry_guardians.father_first_name',
                'enquiry_guardians.father_middle_name',
                'enquiry_guardians.father_last_name',
                'enquiry_guardians.father_mobile',
                'admission_exams.test_date',
            )
            ->get();
    }


    public function getAdmissionExamStatusWiseEnquiries(
        string $examStatus,
        string $fromDate = "",
        string $toDate = "",
        string $boardingType = ""
    ) {
        return Enquiry::where('enquiries.status', Status::ACTIVE)
            ->where('enquiries.school_id', getUserSchoolId())
            ->whereIn('enquiries.enquiry_type', [EnquiryType::REGISTRATION, EnquiryType::ADMISSION])
            ->where(function ($query) use ($examStatus) {
                if ($examStatus == AdmissionExamStatus::PENDING->value) {
                    $query->where('admission_exams.exam_status', $examStatus)
                        ->orWhereNull('admission_exams.exam_status');
                } else {
                    $query->where('admission_exams.exam_status', $examStatus);
                }
            })
            ->where(function ($query) use ($fromDate, $toDate, $boardingType) {
                if (!empty($fromDate)) {
                    $query->whereDate('admission_exams.test_date', '>=', $fromDate);
                }

                if (!empty($toDate)) {
                    $query->whereDate('admission_exams.test_date', '<=', $toDate);
                }

                if (!empty($boardingType)) {
                    $query->where('enquiries.boarding_scholar', $boardingType);
                }
            })
            ->leftJoin('enquiry_guardians', 'enquiries.id', '=', 'enquiry_guardians.enquiry_id')
            ->leftJoin('admission_exams', 'enquiries.id', '=', 'admission_exams.enquiry_id')
            ->leftJoin('class_names', 'enquiries.class_name_id', '=', 'class_names.id')
            ->select(
                'enquiries.id',
                'enquiries.first_name',
                'enquiries.middle_name',
                'enquiries.last_name',
                'enquiries.registration_no',
                'enquiries.date_of_registration',
                'enquiries.registration_status',
                'enquiries.boarding_scholar',
                'enquiry_guardians.father_first_name',
                'enquiry_guardians.father_middle_name',
                'enquiry_guardians.father_last_name',
                'enquiry_guardians.father_mobile',
                'admission_exams.exam_status',
                'class_names.title as class_title',
            )
            ->get();
    }

    public function getAdmissionExamSummaryData()
    {
        return Enquiry::where('enquiries.status', Status::ACTIVE)
            ->where('enquiries.school_id', getUserSchoolId())
            ->whereIn('enquiries.enquiry_type', [EnquiryType::REGISTRATION, EnquiryType::ADMISSION])
            ->leftJoin('admission_exams', 'enquiries.id', '=', 'admission_exams.enquiry_id')
            ->select(
                'enquiries.id',
                'admission_exams.exam_status',
            )
            ->get();
    }


    public function updateAdmissionExamStatus(array $enquiryIds, array $dataArray)
    {
        return AdmissionExam::where('school_id', getUserSchoolId())
            ->whereIn('enquiry_id', $enquiryIds)
            ->update($dataArray);
    }

    public function getFreezeMarksSubjectWiese()
    {
        return Mark::where('marks.school_id', getUserSchoolId())
            ->leftJoin('exams', 'marks.exam_id', '=', 'exams.id')
            ->leftJoin('classrooms', 'marks.classroom_id', '=', 'classrooms.id')
            ->leftJoin('subjects', 'marks.subject_id', '=', 'subjects.id')
            ->leftJoin('exam_dates', 'exams.id', '=', 'exam_dates.exam_id')
            ->select(
                'marks.*',
                'exam_dates.*',
                'exams.title as exam_title',
                'classrooms.title as classroom_title',
                'subjects.title as subject_title',
                'exams.title as exam_title',
                DB::raw('TIMEDIFF(end_time_at, start_time_at) as duration')
            )
            ->get();
    }


    public function getMarksForFreezeMark(int $examId, int $classroomId, int $subjectId = null)
    {
        return Mark::where('marks.school_id', getUserSchoolId())
            ->where('marks.academic_year_id', getAcademicYearId())
            ->where('marks.exam_id', $examId)
            ->where('marks.classroom_id', $classroomId)
            ->where(function ($query) use ($subjectId) {
                if (!empty($subjectId)) {
                    $query->where('marks.subject_id', $subjectId);
                }
            })
            ->leftJoin('exams', 'marks.exam_id', '=', 'exams.id')
            ->leftJoin('classrooms', 'marks.classroom_id', '=', 'classrooms.id')
            ->leftJoin('subjects', 'marks.subject_id', '=', 'subjects.id')
            ->select(
                'marks.*',
                'exams.title as exam_title',
                'classrooms.title as classroom_title',
                'subjects.title as subject_title',
            )
            ->get();
    }

    public function checkFreezedMarkExists(int $examId, array|int $classroomId, int $schoolId = null, int $academicYearId = null)
    {
        $schoolId = $schoolId != null ? $schoolId : getUserSchoolId();
        $academicYearId = $academicYearId != null ? $academicYearId : getAcademicYearId();

        return Mark::where('marks.school_id', $schoolId)
            ->where('marks.academic_year_id', $academicYearId)
            ->where('marks.exam_id', $examId)
            ->where('marks.status', FreezeMarkStatus::FREEZE)
            ->where(function ($query) use ($classroomId) {
                if (is_array($classroomId)) {
                    $query->whereIn('marks.classroom_id', $classroomId);
                } else {
                    $query->where('marks.classroom_id', $classroomId);
                }
            })
            ->exists();
    }

    public function getFielterFreezMarks($examID, $classID, $sectionID, $subjectID)
    {
        return Mark::where('marks.school_id', getUserSchoolId())
            ->where('marks.exam_id', $examID)
            ->where('marks.classroom_id', $classID)
            ->where('marks.subject_id', $subjectID)
            ->leftJoin('exams', 'marks.exam_id', '=', 'exams.id')
            ->leftJoin('classrooms', 'marks.classroom_id', '=', 'classrooms.id')
            ->leftJoin('subjects', 'marks.subject_id', '=', 'subjects.id')
            ->select(
                'marks.*',
                'exams.title as exam_title',
                'classrooms.title as classroom_title',
                'subjects.title as subject_title',
                'exams.title as exam_title',
            )
            ->get();
    }

    public function updateMarkStatus(int $examId, array $classroomIds, $newStatus, int $subjectId = null)
    {
        return Mark::where('exam_id', $examId)
            ->whereIn('classroom_id', $classroomIds)
            ->when(!empty($subjectId), function ($query) use ($subjectId) {
                $query->where('subject_id', $subjectId);
            })
            ->update([
                'status' => $newStatus
            ]);
    }


    public function getMonthlyAdmissionReportData(int $academicYearId = null)
    {
        return Enquiry::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->when(!empty($academicYearId), function ($query) use ($academicYearId) {
                $query->where('academic_year_id', $academicYearId);
            })
            ->select(
                'id',
                'enquiry_date_at'
            )
            ->get();
    }


    public function getClassroomsWithStudentCount(int $classNameId = null, int $academicYearId = null)
    {
        $academicYearId = !empty($academicYearId) ? $academicYearId : getAcademicYearId();

        $classroomsData = [];

        $classrooms = Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->where('class_name_id', $classNameId)
            ->select('id', 'class_name_id', 'title')
            ->orderBy('display_order', 'asc')
            ->get();

        if (!empty($classrooms)) {
            $classroomIds = $classrooms?->pluck('id')?->toArray();

            $students = Student::where('status', Status::ACTIVE)
                ->where('school_id', getUserSchoolId())
                ->whereHas('classroomPromotedStudents', function ($query) use ($classroomIds, $academicYearId) {
                    $query->where('classroom_students.academic_year_id', $academicYearId)
                        ->whereIn('classroom_students.classroom_id', $classroomIds);
                })
                ->with(['promotedClassroom'])
                ->select('id', 'classroom_id', 'gender')
                ->get();

            $students = $students?->map(function ($student) {
                if ($student?->promotedClassroom != null) {
                    $student['classroom_id'] = $student?->promotedClassroom?->id;
                }

                return $student;
            });

            foreach ($classrooms as $classroom) {
                if (!isset($classroomsData[$classroom?->id])) {
                    $classroomsData[$classroom?->id] = [
                        'id' => $classroom?->id,
                        'title' => $classroom?->title,
                        'total_student' => 0
                    ];
                }

                if (count($students) > 0) {
                    foreach ($students as $student) {
                        if ($student?->classroom_id == $classroom?->id) {
                            $classroomsData[$classroom?->id]['total_student'] = ($classroomsData[$classroom?->id]['total_student'] ?? 0) + 1;

                            $gender = $student?->gender;

                            if (!empty($gender)) {
                                $classroomsData[$classroom?->id][$gender] = ($classroomsData[$classroom?->id][$gender] ?? 0) + 1;
                            }
                        }
                    }
                }
            }
        }

        return $classroomsData;
    }

    public function getStudentRegistrationMarks(int $classNameId, int $enquiryId, int $examId, int $academicYearId)
    {
        $classroomIds = Classroom::where('status', Status::ACTIVE)
            ->where('school_id', getUserSchoolId())
            ->where('academic_year_id', $academicYearId)
            ->where('class_name_id', $classNameId)
            ->select('id')
            ->get()
            ->pluck('id')
            ->toArray();


        return Subject::where('subjects.status', Status::ACTIVE)
            ->where('subjects.school_id', getUserSchoolId())
            ->join('classroom_subjects', function ($join) use ($classroomIds) {
                $join->on('subjects.id', '=', 'classroom_subjects.subject_id')
                    ->whereIn('classroom_id', $classroomIds);
            })
            ->leftJoin('exam_roasters', function ($join) use ($examId) {
                $join->on('classroom_subjects.id', '=', 'exam_roasters.classroom_subject_id')
                    ->where('exam_roasters.exam_id', $examId);
            })
            ->leftJoin('admission_exam_marks', function ($join) use ($classNameId, $enquiryId, $examId, $academicYearId) {
                $join->on('admission_exam_marks.subject_id', '=', 'subjects.id')
                    ->where('admission_exam_marks.class_name_id', $classNameId)
                    ->where('admission_exam_marks.enquiry_id', $enquiryId)
                    ->where('admission_exam_marks.exam_id', $examId)
                    ->where('admission_exam_marks.academic_year_id', $academicYearId);
            })
            ->select(
                'subjects.id as subject_id',
                'subjects.title as subject_title',
                'exam_roasters.full_mark',
                'exam_roasters.pass_mark',
                'admission_exam_marks.mark',
            )
            ->groupBy(
                'subject_id',
                'full_mark',
                'pass_mark',
                'mark',
            )
            ->get();
    }
}
