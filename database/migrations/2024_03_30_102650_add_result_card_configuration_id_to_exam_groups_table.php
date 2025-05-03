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
            $table->foreignId('result_card_configuration_id')->nullable()->constrained()->after('academic_year_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('exam_groups', function (Blueprint $table) {
            $table->dropColumn('result_card_configuration_id');
        });
    }
};
