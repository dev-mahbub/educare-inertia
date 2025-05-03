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
        Schema::table('sale_ledger_products', function (Blueprint $table) {
            $table->decimal('rate', 8, 2)->nullable()->change();
            $table->decimal('discount_value', 8, 2)->nullable()->change();
            $table->decimal('tax_amount', 8, 2)->nullable()->change();
            $table->decimal('total_amount', 8, 2)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sale_ledger_products', function (Blueprint $table) {
            $table->decimal('rate', 6, 2)->nullable()->change();
            $table->decimal('discount_value', 6, 2)->nullable()->change();
            $table->decimal('tax_amount', 6, 2)->nullable()->change();
            $table->decimal('total_amount', 6, 2)->nullable()->change();
        });
    }
};
