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
            $table->decimal('paid_amount', 8, 2)->nullable()->after('total');
            $table->decimal('previous_paid_amount', 8, 2)->nullable()->after('paid_amount');
            $table->decimal('due_amount', 8, 2)->nullable()->after('previous_paid_amount');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sale_ledgers', function (Blueprint $table) {
            $table->dropColumn('paid_amount');
            $table->dropColumn('previous_paid_amount');
            $table->dropColumn('due_amount');
        });
    }
};
