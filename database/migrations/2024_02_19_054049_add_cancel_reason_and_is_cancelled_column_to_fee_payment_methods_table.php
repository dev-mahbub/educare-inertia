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
            $table->boolean('is_cancelled')->default(0)->after('receipt_no');
            $table->string('cancel_reason')->nullable()->after('is_cancelled');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('fee_payment_methods', function (Blueprint $table) {
            $table->dropColumn('is_cancelled');
            $table->dropColumn('cancel_reason');
        });
    }
};
