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
        Schema::table('student_assessment_comments', function (Blueprint $table) {
            $table->string('ass_file')->after('comment')->nullable();
            $table->integer('commented_by')->after('ass_file')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('student_assessment_comments', function (Blueprint $table) {
            $table->dropColumn('ass_file');
            $table->dropColumn('commented_by');
        });
    }
};
