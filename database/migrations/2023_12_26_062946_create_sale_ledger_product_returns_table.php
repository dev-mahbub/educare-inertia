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
        Schema::create('sale_ledger_product_returns', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('product_id')->nullable()->constrained();
            $table->foreignId('sale_ledger_return_id')->nullable()->constrained();
            $table->bigInteger('quantity')->nullable();
            $table->decimal('rate', 6, 2)->nullable();
            $table->decimal('discount_value', 6, 2)->nullable();
            $table->decimal('tax_amount', 6, 2)->nullable();
            $table->decimal('total_amount', 6, 2)->nullable();
            $table->string('return_type_for')->nullable();
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sale_ledger_product_returns');
    }
};
