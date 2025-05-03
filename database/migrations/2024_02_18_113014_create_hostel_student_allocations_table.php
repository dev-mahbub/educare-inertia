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
        Schema::create('hostel_student_allocations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable();
            $table->foreignId('academic_year_id')->nullable();
            $table->foreignId('hostel_infra_level_id')->nullable();
            $table->foreignId('student_id')->nullable();
            $table->unsignedBigInteger('room_id')->nullable();
            $table->foreignId('classroom_id')->nullable();
            $table->date('joining_date_at')->nullable();
            $table->boolean('is_current')->default(true);
            $table->date('deallocation_date_at')->nullable();
            $table->string('note')->nullable();
            $table->string('status')->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hostel_student_allocations');
    }
};
