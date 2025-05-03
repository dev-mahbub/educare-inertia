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
        Schema::table('classroom_periods', function (Blueprint $table) {
            $table->foreignId('academic_year_id')->nullable()->constrained();
            $table->foreignId('classroom_id')->nullable()->constrained();
            $table->foreignId('school_shift_id')->nullable()->constrained();
            $table->foreignId('school_period_id')->nullable()->constrained();
            $table->string('type')->nullable();
            $table->string('title')->nullable()->change();
            $table->time('start_time_at')->nullable()->change();
            $table->time('end_time_at')->nullable()->change();
            $table->date('start_date_at')->nullable()->change();
            $table->date('end_date_at')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('classroom_periods', function (Blueprint $table) {
            $table->dropForeign(['academic_year_id']);
            $table->dropForeign(['classroom_id']);
            $table->dropForeign(['school_shift_id']);
            $table->dropForeign(['school_period_id']);
            $table->dropColumn(['academic_year_id', 'classroom_id', 'school_shift_id', 'school_period_id', 'type']);
            $table->string('title')->change();
            $table->time('start_time_at')->change();
            $table->time('end_time_at')->change();
            $table->date('start_date_at')->change();
            $table->date('end_date_at')->change();
        });
    }
};
