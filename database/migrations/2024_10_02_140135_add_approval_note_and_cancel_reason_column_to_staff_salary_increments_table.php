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
        Schema::table('staff_salary_increments', function (Blueprint $table) {
            $table->string('approval_note')->nullable()->after('increment_note');
            $table->string('cancel_reason')->nullable()->after('approval_note');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('staff_salary_increments', function (Blueprint $table) {
            $table->dropColumn('approval_note');
            $table->dropColumn('cancel_reason');
        });
    }
};
