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
            $table->decimal('bonus_amount', 8, 2)->default(0)->after('due_amount');
            $table->decimal('advance_amount', 8, 2)->default(0)->after('bonus_amount');
            $table->decimal('advance_deducted_amount', 8, 2)->default(0)->after('advance_amount');
            $table->decimal('paid_due_amount', 8, 2)->default(0)->after('advance_deducted_amount');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('staff_salary_payments', function (Blueprint $table) {
            $table->dropColumn([
                'bonus_amount',
                'advance_amount',
                'advance_deducted_amount',
                'paid_due_amount'
            ]);
        });
    }
};
