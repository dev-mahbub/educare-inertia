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
        Schema::create('result_card_summaries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_year_id')->nullable()->constrained();
            $table->foreignId('exam_id')->nullable()->constrained();
            $table->foreignId('academic_progress_report_id')->nullable();
            $table->json('classroom_id')->nullable();
            $table->string('board')->nullable();
            $table->string('attendance')->nullable();
            $table->string('display_name')->nullable();
            $table->string('schedule_test')->nullable();
            $table->string('percentage')->nullable();
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('result_card_summaries');
    }
};
