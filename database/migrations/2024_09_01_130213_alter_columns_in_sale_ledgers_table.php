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
        Schema::table('sale_ledgers', function (Blueprint $table) {
            $table->decimal('sub_total', 8, 2)->nullable()->change();
            $table->decimal('total_discount', 8, 2)->nullable()->change();
            $table->decimal('total_tax', 8, 2)->nullable()->change();
            $table->decimal('total', 8, 2)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sale_ledgers', function (Blueprint $table) {
            $table->decimal('sub_total', 6, 2)->nullable()->change();
            $table->decimal('total_discount', 6, 2)->nullable()->change();
            $table->decimal('total_tax', 6, 2)->nullable()->change();
            $table->decimal('total', 6, 2)->nullable()->change();
        });
    }
};
