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
        Schema::table('staff_leave_allocations', function (Blueprint $table) {
            $table->string('days')->nullable()->change();
            // $table->string('consumed_days')->nullable()->after('days');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('staff_leave_allocations', function (Blueprint $table) {
            $table->integer('days')->nullable()->change();
            // $table->dropColumn('consumed_days');
        });
    }
};
