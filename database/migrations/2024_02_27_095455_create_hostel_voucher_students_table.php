<?php

use App\Enums\Status;
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
        Schema::create('hostel_voucher_students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable();
            $table->foreignId('academic_year_id')->nullable();
            $table->foreignId('classroom_id')->nullable();
            $table->foreignId('hostel_fee_id')->nullable();
            $table->foreignId('hostel_voucher_id')->nullable();
            $table->foreignId('student_id')->nullable();
            $table->boolean('is_voucher')->nullable();
            $table->boolean('is_student')->nullable();
            $table->string('status')->default(Status::ACTIVE->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hostel_voucher_students');
    }
};
