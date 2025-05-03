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
        Schema::table('ledger_payments', function (Blueprint $table) {
            $table->foreignId('bank_ledger_id')->nullable()->constrained('ledgers', 'id')->after('school_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ledger_payments', function (Blueprint $table) {
            $table->dropForeign(['bank_ledger_id']);
            $table->dropColumn('bank_ledger_id');
        });
    }
};
