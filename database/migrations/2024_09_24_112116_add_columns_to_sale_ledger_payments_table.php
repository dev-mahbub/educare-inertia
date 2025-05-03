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
        Schema::table('sale_ledger_payments', function (Blueprint $table) {
            $table->boolean('is_cancelled')->default(false)->after('receipt_no');
            $table->longText('cancel_reason')->nullable()->after('is_cancelled');
            $table->longText('description')->nullable()->after('cancel_reason');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sale_ledger_payments', function (Blueprint $table) {
            $table->dropColumn('is_cancelled');
            $table->dropColumn('cancel_reason');
            $table->dropColumn('description');
        });
    }
};
