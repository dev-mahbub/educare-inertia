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
            $table->boolean('show_total')->default(false);
            $table->boolean('show_affiliation_no')->default(false);
            $table->boolean('show_school_code')->default(false);
            $table->boolean('show_date_of_birth')->default(false);
            $table->boolean('show_print_date')->default(false);
            $table->boolean('show_cbse_logo')->default(false);
            $table->boolean('show_icse_logo')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('exam_groups', function (Blueprint $table) {
            $table->dropColumn('show_total');
            $table->dropColumn('show_affiliation_no');
            $table->dropColumn('show_school_code');
            $table->dropColumn('show_date_of_birth');
            $table->dropColumn('show_print_date');
            $table->dropColumn('show_cbse_logo');
            $table->dropColumn('show_icse_logo');
        });
    }
};
