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
        Schema::table('student_due_follow_ups', function (Blueprint $table) {
            $table->decimal('due_amount', 8, 2)->default(0.00)->after('created_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('student_due_follow_ups', function (Blueprint $table) {
            $table->dropColumn('due_amount');
        });
    }
};
