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
        Schema::table('leaves', function (Blueprint $table) {
            $table->foreignId('staff_id')->nullable()->constrained('staff', 'id')->after('academic_year_id');
            $table->foreignId('leave_type_id')->nullable()->constrained()->after('staff_id');
            $table->boolean('is_cancelled')->default(false)->after('is_approved');
            $table->json('leave_days')->nullable()->after('is_cancelled');
            $table->string('format_no')->nullable()->after('leave_days');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('leaves', function (Blueprint $table) {
            $table->dropForeign(['staff_id']);
            $table->dropForeign(['leave_type_id']);
            $table->dropColumn('staff_id');
            $table->dropColumn('leave_type_id');
            $table->dropColumn('is_cancelled');
            $table->dropColumn('leave_days');
            $table->dropColumn('format_no');
        });
    }
};
