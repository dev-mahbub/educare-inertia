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
        Schema::table('exam_attendances', function (Blueprint $table) {
            $table->decimal('present_day', 5, 2)->nullable()->change();
            $table->decimal('working_day', 5, 2)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('exam_attendances', function (Blueprint $table) {
            $table->date('present_day')->nullable()->change();
            $table->date('working_day')->nullable()->change();
        });
    }
};
