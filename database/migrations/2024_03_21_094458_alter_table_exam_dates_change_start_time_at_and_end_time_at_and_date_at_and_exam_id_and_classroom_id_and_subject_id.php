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
        Schema::table('exam_dates', function (Blueprint $table) {
            $table->foreignId('exam_id')->nullable()->change();
            $table->foreignId('classroom_id')->nullable()->change();
            $table->foreignId('subject_id')->nullable()->change();
            $table->time('start_time_at')->nullable()->change();
            $table->time('end_time_at')->nullable()->change();
            $table->date('date_at')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('exam_dates', function (Blueprint $table) {
            $table->foreignId('exam_id')->constrained()->onDelete('cascade')->change();
            $table->foreignId('classroom_id')->constrained()->onDelete('cascade')->change();
            $table->foreignId('subject_id')->constrained()->onDelete('cascade')->change();
            $table->time('start_time_at')->change();
            $table->time('end_time_at')->change();
            $table->date('date_at')->change();
        });
    }
};
