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
        Schema::table('staff_salary_payments', function (Blueprint $table) {
            $table->decimal('extra_duty_amount', 8, 2)->nullable();
            $table->decimal('absent_deduction_amount', 8, 2)->nullable();
            $table->decimal('total_leave', 8, 2)->default(0);
            $table->decimal('leave_balance', 8, 2)->default(0);
            $table->decimal('total_absent', 8, 2)->default(0);
            $table->decimal('total_extra_duty', 8, 2)->default(0);
            $table->decimal('total_paid_extra_duty', 8, 2)->default(0);
            $table->decimal('total_previous_extra_duty', 8, 2)->default(0);
            $table->decimal('total_deducted_absent', 8, 2)->default(0);
            $table->decimal('total_previous_absent_deduction', 8, 2)->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('staff_salary_payments', function (Blueprint $table) {
            $table->dropColumn([
                'extra_duty_amount',
                'absent_deduction_amount',
                'total_leave',
                'leave_balance',
                'total_absent',
                'total_extra_duty',
                'total_paid_extra_duty',
                'total_previous_extra_duty',
                'total_deducted_absent',
                'total_previous_absent_deduction'
            ]);
        });
    }
};
