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
        Schema::table('classroom_students', function (Blueprint $table) {
            $table->unsignedBigInteger('academic_year_id_from')->nullable()->after('classroom_id');
            $table->unsignedBigInteger('classroom_id_from')->nullable()->after('academic_year_id_from');
            $table->foreignId('user_id')->nullable()->after('classroom_id_from');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('classroom_students', function (Blueprint $table) {
            $table->dropColumn('academic_year_id_from');
            $table->dropColumn('classroom_id_from');
            $table->dropColumn('user_id');
        });
    }
};
