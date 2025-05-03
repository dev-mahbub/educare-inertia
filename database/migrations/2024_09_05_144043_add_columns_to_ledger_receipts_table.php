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
        Schema::table('ledger_receipts', function (Blueprint $table) {
            $table->foreignId('academic_year_id')->nullable()->constrained()->after('school_id');
            $table->foreignId('created_by')->nullable()->constrained('users', 'id')->after('academic_year_id');
            $table->foreignId('bank_ledger_id')->nullable()->constrained('ledgers', 'id')->after('created_by');
            $table->boolean('is_cancelled')->default(false)->after('total');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ledger_receipts', function (Blueprint $table) {
            $table->dropForeign(['academic_year_id']);
            $table->dropForeign(['created_by']);
            $table->dropForeign(['bank_ledger_id']);
            $table->dropColumn('academic_year_id');
            $table->dropColumn('created_by');
            $table->dropColumn('is_cancelled');
            $table->dropColumn('bank_ledger_id');
        });
    }
};
