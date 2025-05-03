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
        Schema::table('homework_student_assessment_comments', function (Blueprint $table) {
            $table->integer('commented_by')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('homework_student_assessment_comments', function (Blueprint $table) {
            $table->dropColumn('commented_by');
        });
    }
};
