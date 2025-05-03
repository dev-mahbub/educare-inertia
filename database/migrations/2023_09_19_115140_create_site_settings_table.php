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
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->string('type')->nullable();
            $table->string('key_name')->nullable();
            $table->string('value')->nullable();
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};


// Account
// account_is_fee_integrated
// account_is_salary_integrated
// account_is_registration_integrated
// account_is_ledger_amount_based


// Receipt
// receipt_is_copy

// Voucher
// voucher_is_enable_payment
// voucher_is_enable_receipt
// voucher_is_enable_purchase
// voucher_is_enable_sale
