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
        Schema::create('virtual_exams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('created_by')->nullable()->constrained('users', 'id');
            $table->string('title')->nullable();
            $table->string('exam_code')->nullable();
            $table->string('exam_mode')->nullable();
            $table->date('start_date_at')->nullable();
            $table->date('end_date_at')->nullable();
            $table->time('start_time_at')->nullable();
            $table->time('end_time_at')->nullable();
            $table->integer('duration_hour')->nullable();
            $table->integer('duration_minute')->nullable();
            $table->integer('instruction_hour')->nullable();
            $table->integer('instruction_minute')->nullable();
            $table->longText('instruction_details')->nullable();
            $table->string('total_mark')->nullable();
            $table->string('pass_mark')->nullable();
            $table->string('live_link')->nullable();
            $table->integer('display_order')->nullable();
            $table->boolean('is_schedule_exam')->default(false);
            $table->boolean('is_shuffle_question')->default(false);
            $table->string('status')->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('virtual_exams_tables');
    }
};
