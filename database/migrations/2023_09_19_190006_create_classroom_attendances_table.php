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
        Schema::create('classroom_attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable();
            $table->foreignId('academic_year_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('classroom_id')->nullable();
            $table->unsignedBigInteger('taken_by_id')->nullable();
            $table->string('holiday_title')->nullable();
            $table->boolean('is_attendance_allowed_on_back_date')->nullable();
            $table->boolean('is_attendance_taken')->nullable();
            $table->date('attendance_date_at')->nullable();
            $table->time('attendance_time_at')->nullable();
            $table->boolean('is_current_date')->nullable();
            $table->boolean('is_holiday')->nullable();
            $table->text('notes')->nullable();
            $table->json('students')->nullable();
            $table->string('status')->default(Status::ACTIVE->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classroom_attendances');
    }
};
