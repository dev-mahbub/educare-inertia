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
        Schema::table('purchases', function (Blueprint $table) {
            $table->decimal('sub_total', 8, 2)->nullable()->change();
            $table->decimal('discount_value', 8, 2)->nullable()->change();
            $table->decimal('discount_amount', 8, 2)->nullable()->change();
            $table->decimal('tax_amount', 8, 2)->nullable()->change();
            $table->decimal('total', 8, 2)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('purchases', function (Blueprint $table) {
            $table->bigInteger('sub_total')->nullable()->change();
            $table->integer('discount_value')->nullable()->change();
            $table->bigInteger('discount_amount')->nullable()->change();
            $table->bigInteger('tax_amount')->nullable()->change();
            $table->bigInteger('total')->nullable()->change();
        });
    }
};
