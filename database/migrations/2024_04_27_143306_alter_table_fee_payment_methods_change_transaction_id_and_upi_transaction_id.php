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
            $table->bigInteger('transaction_id')->nullable()->change();
            $table->bigInteger('upi_transaction_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('fee_payment_methods', function (Blueprint $table) {
            $table->integer('transaction_id')->nullable()->change();
            $table->integer('upi_transaction_id')->nullable()->change();
        });
    }
};
