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
        Schema::create('exam_groups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_progress_report_id')->nullable()->constrained();
            $table->string('parent')->nullable();
            $table->string('title')->nullable();
            $table->integer('display_order')->nullable();
            $table->boolean('is_exam')->nullable();
            $table->integer('exam_id')->nullable();
            $table->boolean('is_grand_total_row_to_be_show')->nullable();
            $table->boolean('is_grand_percentage_row_to_be_show')->nullable();
            $table->boolean('is_grand_grade_row_to_be_show')->nullable();
            $table->boolean('is_exam_marks_to_be_added_in_grand_total')->nullable();
            $table->string('grouping_type')->nullable();
            $table->string('conversion_type')->nullable();
            $table->string('calculation_perform')->nullable();
            $table->string('calculation_type')->nullable();
            $table->string('weightage')->nullable();
            $table->boolean('show_children')->nullable();
            $table->boolean('is_rank_to_be_given')->nullable();
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exam_groups');
    }
};
