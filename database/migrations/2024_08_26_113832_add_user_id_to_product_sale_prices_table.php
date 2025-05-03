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
        Schema::table('product_sale_prices', function (Blueprint $table) {
            $table->foreignId('applied_by')->nullable()->constrained('users', 'id')->after('sub_category_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_sale_prices', function (Blueprint $table) {
            $table->dropForeign(['applied_by']);
            $table->dropColumn('applied_by');
        });
    }
};
