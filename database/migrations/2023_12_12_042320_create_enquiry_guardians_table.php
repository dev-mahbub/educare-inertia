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
        Schema::create('enquiry_guardians', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('enquiry_id')->nullable()->constrained();
            $table->string('father_first_name', 50)->nullable();
            $table->string('father_middle_name', 50)->nullable();
            $table->string('father_last_name', 50)->nullable();
            $table->string('father_email', 50)->nullable();
            $table->string('father_mobile', 50)->nullable();
            $table->string('father_sms_number', 50)->nullable();
            $table->string('father_occupation', 50)->nullable();
            $table->string('father_highest_qualification', 50)->nullable();
            $table->string('father_aadhar_card_no', 50)->nullable();
            $table->string('father_whatsapp_no', 50)->nullable();
            $table->decimal('father_income_per_year')->default(0.00)->nullable();
            $table->string('father_department', 50)->nullable();
            $table->string('father_designation', 50)->nullable();
            $table->string('father_pan_card_no', 50)->nullable();
            $table->string('father_company_name', 50)->nullable();
            $table->string('father_office_address', 50)->nullable();
            //mother info
            $table->string('mother_first_name', 50)->nullable();
            $table->string('mother_middle_name', 50)->nullable();
            $table->string('mother_last_name', 50)->nullable();
            $table->string('mother_email', 50)->nullable();
            $table->string('mother_mobile', 50)->nullable();
            $table->string('mother_highest_qualification', 50)->nullable();
            $table->string('mother_occupation', 50)->nullable();
            $table->decimal('mother_income_per_year')->default(0.00)->nullable();
            $table->string('mother_department', 50)->nullable();
            $table->string('mother_designation', 50)->nullable();
            $table->string('mother_aadhar_card_no', 50)->nullable();
            $table->string('mother_pan_card_no', 50)->nullable();
            $table->string('mother_company_name', 50)->nullable();
            $table->string('mother_office_address', 50)->nullable();
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enquiry_guardians');
    }
};
