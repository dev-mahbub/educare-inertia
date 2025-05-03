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
        Schema::create('guardians', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('student_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('guardian_type')->nullable();  // father / mother / guardian
            $table->string('first_name')->nullable();
            $table->string('middle_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('religion')->nullable();
            $table->string('relation')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('sms_phone')->nullable();
            $table->string('highest_qualification')->nullable();
            $table->string('occupation')->nullable();
            $table->string('income_per_year')->nullable();
            $table->string('department')->nullable();
            $table->string('designation')->nullable();
            $table->string('aadhar_card_no')->nullable();
            $table->string('pan_card_no')->nullable();
            $table->string('company_name')->nullable();
            $table->string('city')->nullable();
            $table->string('address')->nullable();
            $table->string('office_address')->nullable();
            $table->boolean("is_inactive")->default(0);
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parents');
    }
};
