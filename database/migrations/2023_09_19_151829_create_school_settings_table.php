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
        Schema::create('school_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_year_id')->nullable()->constrained();
            $table->string('admission_seed')->nullable();
            $table->string('admission_prefix')->nullable();
            $table->string('admission_postfix')->nullable();
            $table->string('ticket_url')->nullable();
            $table->string('ticket_userid')->nullable();
            $table->string('ticket_password')->nullable();
            $table->string('admin_number')->nullable();
            $table->string('training_url')->nullable();
            $table->string('email_notification')->nullable();
            $table->string('sms_notification')->nullable();
            $table->boolean("is_email_notify")->default(0);
            $table->boolean("is_sms_notify")->default(0);
            $table->boolean("is_teacher_reply")->default(0);
            $table->boolean("is_teacher_compose")->default(0);
            $table->boolean("is_parent_reply")->default(0);
            $table->boolean("is_parent_compose")->default(0);
            $table->boolean("is_enable_email")->default(0);
            $table->boolean("is_attendance_backdate")->default(0);
            $table->boolean("is_parent_newsletter")->default(0);
            $table->boolean("is_teacher_newsletter")->default(0);
            $table->boolean("is_student_roll_softable")->default(0);
            $table->boolean("is_class_wise_report")->default(0);
            $table->boolean("is_teacher_self_attendance")->default(0);
            $table->boolean("is_password_visible")->default(0);
            $table->boolean("is_biometric_integration")->default(0);
            $table->boolean("is_student_biometric_attendance")->default(0);
            $table->boolean("is_view_parent_contact")->default(0);
            $table->boolean("is_view_tc_copy")->default(0);
            $table->boolean("is_pay_online_fee_voucher")->default(0);
            $table->boolean("is_uploaded_photo_app")->default(0);
            $table->boolean("is_transport_boarding_student")->default(0);
            $table->boolean("is_event_module_teacher_login")->default(0);
            $table->boolean("is_allow_upload_document")->default(0);
            $table->boolean("is_weekly_status_send_to_parent")->default(0);
            $table->string("duration")->default('1 weak');
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('school_settings');
    }
};
