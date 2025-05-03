<?php

use App\Enums\StudentStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_year_id')->nullable()->constrained();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('class_name_id')->nullable()->constrained();
            $table->foreignId('classroom_id')->nullable()->constrained();
            $table->foreignId('country_id')->nullable()->constrained();
            $table->foreignId('employment_cat_id')->nullable();
            $table->integer('sibling_student_id')->nullable();
            $table->boolean('is_have_sibling')->default(0)->nullable();
            $table->string('student_type')->nullable(); // applicant / student // // status - new
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->unique();
            // $table->string('roll_no')->nullable();
            $table->string('admission_no')->nullable();
            $table->date('admission_date_at')->nullable();
            $table->string('boarding_type')->nullable();
            $table->string('caste_type')->nullable();
            $table->boolean("is_computer_option")->default(0)->nullable();
            $table->boolean("is_class_change")->default(0)->nullable();
            $table->boolean("is_social_studies_option")->default(0)->nullable();
            $table->string('gender')->nullable();
            $table->string('aadhar_card_no')->nullable();
            $table->string('blood_group')->nullable();
            $table->string('religion')->nullable();
            $table->string('srn_no')->nullable();
            $table->string('child_id')->nullable();
            $table->string('samagra_id')->nullable();
            $table->string('birth_place')->nullable();
            $table->string('caste')->nullable();
            $table->string('sub_caste')->nullable();
            $table->string('admission_class')->nullable();
            $table->string('mother_tongue')->nullable();
            $table->string('medical_condition')->nullable();
            $table->string('context')->nullable();
            $table->text('notes')->nullable();
            $table->string('remark')->nullable();
            $table->string('biometric_code')->nullable();
            $table->date('birth_date_at')->nullable();
            $table->date('start_date_at')->nullable();
            $table->date('end_date_at')->nullable();
            $table->date('extension_date_at')->nullable();
            $table->decimal('height', 6, 2)->default(0.00)->nullable();
            $table->decimal('weight', 6, 2)->default(0.00)->nullable();
            $table->string('present_address')->nullable();
            $table->string('present_state')->nullable();
            $table->string('present_city')->nullable();
            $table->string('present_taluka')->nullable();
            $table->string('present_district')->nullable();
            $table->string('present_pin_code')->nullable();
            $table->string('permanent_address')->nullable();
            $table->string('permanent_state')->nullable();
            $table->string('permanent_city')->nullable();
            $table->string('permanent_taluka')->nullable();
            $table->string('permanent_district')->nullable();
            $table->string('permanent_pin_code')->nullable();
            $table->boolean("is_physical_disabled")->nullable()->default(0);
            $table->boolean("is_economically_weaker")->nullable()->default(0);
            $table->boolean("is_spacial_child")->nullable()->default(0);
            $table->string('prev_school_name')->nullable();
            $table->string('prev_school_class')->nullable();
            $table->string('prev_school_year')->nullable();
            $table->string('prev_school_note')->nullable();
            $table->string('prev_school_tc_no')->nullable();
            $table->json('document_attached')->nullable();
            $table->string('student_status')->default(StudentStatus::NEW->value);
            $table->date('promoted_date_at')->nullable();
            $table->string('promoted_by')->nullable();
            $table->string('reason')->nullable();
            $table->date('status_date_at')->nullable();
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
