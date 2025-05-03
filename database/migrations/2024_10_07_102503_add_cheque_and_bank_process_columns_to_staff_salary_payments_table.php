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
            $table->integer('cheque_no')->nullable();
            $table->date('cheque_date')->nullable();
            $table->foreignId('bank_id')->nullable()->constrained();
            $table->string('branch')->nullable();
            $table->foreignId('bank_account_id')->nullable()->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('staff_salary_payments', function (Blueprint $table) {
            $table->dropForeign(['bank_id']);
            $table->dropForeign(['bank_account_id']);

            $table->dropColumn([
                'cheque_no',
                'cheque_date',
                'bank_id',
                'branch',
                'bank_account_id'
            ]);
        });
    }
};
