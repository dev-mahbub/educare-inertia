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
        Schema::table('assets', function (Blueprint $table) {
            $table->foreignId('academic_year_id')->nullable()->constrained()->after('school_id');
            $table->foreignId('class_name_id')->nullable()->constrained()->after('academic_year_id');
            $table->foreignId('online_topic_id')->nullable()->constrained()->after('subject_id');
            $table->string('type')->after('online_topic_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('assets', function (Blueprint $table) {
            $table->dropForeign(['academic_year_id']);
            $table->dropForeign(['online_topic_id']);
            $table->dropForeign(['class_name_id']);
            $table->dropColumn('academic_year_id');
            $table->dropColumn('online_topic_id');
            $table->dropColumn('class_name_id');
            $table->dropColumn('type');
        });
    }
};
