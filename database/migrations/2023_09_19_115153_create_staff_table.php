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
        Schema::create('staff', function (Blueprint $table) {

            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_year_id')->nullable();
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
            $table->integer('staff_category_id')->nullable();
            $table->integer('staff_sub_category_id')->nullable();
            $table->string('user_roll_type')->nullable();
            $table->string('staff_type')->nullable(); // applicant / teacher // status - part-time
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
            $table->string('reason_data')->nullable();
            $table->date('inactive_date_at')->nullable();
            $table->string('status')->nullable()->default('Active');
            $table->timestamps();

            // $table->id();
            // $table->foreignId('school_id')->nullable()->constrained();
            // $table->foreignId('user_id')->constrained()->onDelete('cascade');
            // $table->string('first_name');
            // $table->string('middle_name')->nullable();
            // $table->string('last_name')->nullable();
            // $table->string('teaser')->nullable();
            // $table->longText('description')->nullable();
            // $table->string('phone')->nullable();
            // $table->string('email')->unique();
            // $table->decimal('height', 6, 2)->default(0.00);
            // $table->decimal('weight', 6, 2)->default(0.00);
            // $table->string('present_address')->nullable();
            // $table->string('present_state')->nullable();
            // $table->string('present_city')->nullable();
            // $table->string('present_taluka')->nullable();
            // $table->string('present_district')->nullable();
            // $table->string('present_pin_code')->nullable();
            // $table->string('permanent_address')->nullable();
            // $table->string('permanent_state')->nullable();
            // $table->string('permanent_city')->nullable();
            // $table->string('permanent_taluka')->nullable();
            // $table->string('permanent_district')->nullable();
            // $table->boolean("is_inactive")->default(0);
            // $table->string('status')->default('Active');
            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staffs');
    }
};
