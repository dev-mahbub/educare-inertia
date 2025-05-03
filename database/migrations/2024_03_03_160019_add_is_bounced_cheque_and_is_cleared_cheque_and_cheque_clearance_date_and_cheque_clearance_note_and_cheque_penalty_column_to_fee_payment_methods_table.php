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
            $table->boolean('is_bounced_cheque')->default(0)->after('cancel_reason');
            $table->boolean('is_cleared_cheque')->default(0)->after('is_bounced_cheque');
            $table->date('cheque_clearance_date')->nullable()->after('is_cleared_cheque');
            $table->string('cheque_clearance_note')->nullable()->after('cheque_clearance_date');
            $table->integer('cheque_penalty')->default(0)->after('cheque_clearance_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('fee_payment_methods', function (Blueprint $table) {
            $table->dropColumn('is_bounced_cheque');
            $table->dropColumn('is_cleared_cheque');
            $table->dropColumn('cheque_clearance_date');
            $table->dropColumn('cheque_clearance_note');
            $table->dropColumn('cheque_penalty');
        });
    }
};
