<?php



use App\Enums\Status;
use App\Enums\EnquiryType;
use App\Enums\EnquiryStatus;
use App\Enums\EnquiryStatusType;
use App\Enums\RegistrationStatus;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('enquiries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_year_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('classroom_id')->nullable();
            $table->foreignId('category_id')->nullable();
            $table->foreignId('user_id')->nullable();
            $table->foreignId('source_id')->nullable();
            $table->foreignId('state_id')->nullable();
            $table->foreignId('employment_category_id')->nullable();
            $table->foreignId('bank_account_id')->nullable();
            $table->foreignId('bank_id')->nullable();
            $table->foreignId('staff_id')->nullable();
            //enquiry info.
            $table->date('enquiry_date_at')->nullable();
            $table->date('birth_date_at')->nullable();
            $table->string('contact_name', 100)->nullable();
            $table->text('enquiry_detail')->nullable();
            $table->string('contact_number', 100)->nullable();
            $table->string('contact_email', 100)->nullable()->unique();
            $table->string('person_to_meet', 100)->nullable();
            $table->time('in_time')->nullable();

            // registration
            $table->string('registration_no', 100)->nullable();
            
            $table->string('refer_contact_person', 100)->nullable();
            $table->string('refer_mobile', 100)->nullable();
            $table->string('enquiry_address')->nullable();
            //admission info.
            $table->string('reference_by', 100)->nullable();
            $table->string('boarding_scholar', 100)->nullable();
            $table->string('first_name', 100)->nullable();
            $table->string('middle_name', 100)->nullable();
            $table->string('last_name', 100)->nullable();
            $table->string('gender', 100)->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('aadhar_card_no', 100)->nullable();
            $table->string('blood_group', 100)->nullable();
            $table->string('religion', 100)->nullable();
            $table->foreignId('country_id', 100)->nullable();
            $table->date('date_of_registration')->nullable();
            $table->integer('form_no')->nullable();
            $table->string('srn_no', 100)->nullable();
            $table->string('child_id', 100)->nullable();
            $table->string('samagra_id', 100)->nullable();
            $table->string('mother_tongue', 100)->nullable();
            $table->string('medical_condition', 100)->nullable();
            $table->boolean('is_transport_availed')->nullable()->default(0);
            $table->boolean('is_physically_disabled')->nullable()->default(0);
            $table->boolean('is_special_child')->nullable()->default(0);
            $table->boolean('conomically_weaker_section')->nullable()->default(0);
            //image
            $table->string('student_image')->nullable();
            $table->string('father_image')->nullable();
            $table->string('mother_image')->nullable();
            $table->string('guardian_image')->nullable();
            //Previous School Details info.
            $table->string('school_name', 100)->nullable();
            $table->string('school_class', 100)->nullable();
            $table->string('school_year', 100)->nullable();
            $table->string('tc_no')->nullable();
            $table->string('referred_by', 100)->nullable();
            $table->boolean('is_have_sibling')->default(0)->nullable();
            //present address.
            $table->string('present_address', 100)->nullable();
            $table->string('present_state', 100)->nullable();
            $table->string('landmark', 100)->nullable();
            $table->string('city', 100)->nullable();
            $table->string('district', 100)->nullable();
            $table->string('taluka', 100)->nullable();
            $table->string('pin_code', 100)->nullable();
            //permanent address.
            $table->string('permanent_address', 100)->nullable();
            $table->string('permanent_state', 100)->nullable();
            $table->string('permanent_city', 100)->nullable();
            $table->string('permanent_taluka', 100)->nullable();
            $table->string('permanent_district', 100)->nullable();
            $table->string('permanent_pin_code', 100)->nullable();
            //siblings info.
            $table->string('sibling_name', 100)->nullable();
            $table->string('sibling_std', 100)->nullable();
            $table->string('sibling_adm_no', 100)->nullable();
            $table->string('sibling_year', 100)->nullable();

            // reference_by
            $table->string('reference_by_parent', 100)->nullable();
            $table->string('enquiry_type')->default(EnquiryType::ADMISSION);
            $table->string('enquiry_status')->default(EnquiryStatus::NEW);
            $table->string('status')->default(Status::ACTIVE);
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enquiries');
    }
};
