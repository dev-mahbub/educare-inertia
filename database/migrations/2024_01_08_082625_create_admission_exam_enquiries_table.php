<?php

use App\Enums\EnquiryStatus;
use App\Enums\ExamType;
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
        Schema::create('admission_exam_enquiries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable();
            $table->foreignId('admission_exam_id')->nullable();
            $table->foreignId('enquiry_id')->nullable();
            $table->string('exam_status')->default(ExamType::PENDING);
            $table->string('status')->default(EnquiryStatus::REGISTRATION_TAKEN);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admission_exam_enquiries');
    }
};
