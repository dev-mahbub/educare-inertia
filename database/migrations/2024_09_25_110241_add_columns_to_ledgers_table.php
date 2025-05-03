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
        Schema::table('ledgers', function (Blueprint $table) {
            $table->foreignId('student_id')->nullable()->constrained()->after('account_group_id');
            $table->foreignId('staff_id')->nullable()->constrained()->after('student_id');
            $table->foreignId('enquiry_id')->nullable()->constrained()->after('staff_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ledgers', function (Blueprint $table) {
            $table->dropForeign(['student_id']);
            $table->dropForeign(['staff_id']);
            $table->dropForeign(['enquiry_id']);
            $table->dropColumn('student_id');
            $table->dropColumn('staff_id');
            $table->dropColumn('enquiry_id');
        });
    }
};
