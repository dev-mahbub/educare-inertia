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
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('party_account_id')->nullable()->constrained();
            $table->foreignId('ledger_id')->nullable()->constrained();
            $table->integer('receipt_no')->nullable();
            $table->string('supplier_invoice_no')->nullable();
            $table->date('purchase_date_at')->nullable();
            $table->longText('description')->nullable();
            $table->bigInteger('sub_total')->nullable();
            $table->string('discount_type')->nullable();
            $table->integer('discount_value')->nullable();
            $table->bigInteger('discount_amount')->nullable();
            $table->bigInteger('tax_amount')->nullable();
            $table->bigInteger('total')->nullable();
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchases');
    }
};
