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
        Schema::table('fee_payment_methods', function (Blueprint $table) {
            $table->foreignId('cancelled_by')->nullable()->constrained('users', 'id')->after('cheque_clearance_note');
            $table->date('cancellation_date')->nullable()->after('cancelled_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('fee_payment_methods', function (Blueprint $table) {
            $table->dropColumn('cancelled_by');
            $table->dropColumn('cancellation_date');
        });
    }
};
