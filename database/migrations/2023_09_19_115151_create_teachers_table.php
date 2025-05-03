<?php

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
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->integer('state_id')->nullable();
            $table->integer('house_id')->nullable();
            $table->integer('category_id')->nullable();
            $table->integer('religion_id')->nullable();
            $table->integer('department_id')->nullable();
            $table->integer('designation_id')->nullable();
            $table->integer('blood_group_id')->nullable();
            $table->integer('employee_id')->nullable();
            $table->integer('employment_category_id')->nullable();
            $table->integer('teacher_category_id')->nullable();
            $table->integer('teacher_sub_category_id')->nullable();
            $table->string('user_roll_type')->nullable();
            $table->string('teacher_type')->nullable(); // applicant / teacher // status - part-time
            $table->string('first_name')->nullable();
            $table->string('middle_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable()->unique();
            $table->string('father_name')->nullable();
            $table->string('spouse_name')->nullable();
            $table->string('gender')->nullable();
            $table->string('city')->nullable();
            $table->date('join_date_at')->nullable();
            $table->date('leave_date_at')->nullable();
            $table->date('birth_date_at')->nullable();
            $table->string('job_type')->nullable();
            $table->string('pan_number')->nullable();
            $table->string('qualification')->nullable();
            $table->string('voter_card_no')->nullable();
            $table->string('aadhar_card_no')->nullable();
            $table->string('oasis_id')->nullable();
            $table->string('address')->nullable();
            $table->longText('description')->nullable();
            $table->string('bank_name')->nullable();
            $table->string('bank_account_no')->nullable();
            $table->string('uan')->nullable();
            $table->string('ifsc')->nullable();
            $table->string('pf_account_number')->nullable();
            $table->string('experience_year')->nullable();
            $table->string('esic_no')->nullable();
            $table->string('status')->nullable()->default('Active');
            $table->timestamps();

            // extra field
            // $table->string('religion')->nullable();
            // $table->string('srn_no')->nullable();
            // $table->string('samagra_id')->nullable();
            // $table->string('birth_place')->nullable();
            // $table->string('caste')->nullable();
            // $table->string('sub_caste')->nullable();
            // $table->string('employment')->nullable();
            // $table->string('mother_tongue')->nullable();
            // $table->string('medical_condition')->nullable();
            // $table->string('notes')->nullable();
            // $table->date('date_at')->nullable();
            // $table->decimal('height', 6, 2)->default(0.00)->nullable();
            // $table->decimal('weight', 6, 2)->default(0.00)->nullable();
            // $table->string('present_address')->nullable();
            // $table->string('present_state')->nullable();
            // $table->string('present_taluka')->nullable();
            // $table->string('present_district')->nullable();
            // $table->string('present_pin_code')->nullable();
            // $table->string('permanent_address')->nullable();
            // $table->string('permanent_state')->nullable();
            // $table->string('permanent_city')->nullable();
            // $table->string('permanent_taluka')->nullable();
            // $table->string('permanent_district')->nullable();
            // $table->string('permanent_pin_code')->nullable();
            // $table->boolean("is_physical_disabled")->default(0)->nullable();
            // $table->boolean("is_economically_weaker")->default(0)->nullable();
            // $table->string('prev_school_name')->nullable();
            // $table->string('prev_school_class')->nullable();
            // $table->string('prev_school_year')->nullable();
            // $table->string('prev_school_note')->nullable();
            // $table->string('prev_school_tc_no')->nullable();
            // $table->boolean("is_inactive")->default(0)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
