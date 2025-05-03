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
        Schema::table('exam_groups', function (Blueprint $table) {
            $table->boolean('show_optional_subject')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('exam_groups', function (Blueprint $table) {
            $table->dropColumn('show_optional_subject');
        });
    }
};
