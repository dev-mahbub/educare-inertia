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
        Schema::table('sale_ledger_returns', function (Blueprint $table) {
            $table->foreignId('created_by')->nullable()->constrained('users', 'id')->after('academic_year_id');
            $table->boolean('is_cancelled')->default(false)->after('created_by');
            $table->string('cancel_reason')->nullable()->after('is_cancelled');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sale_ledger_returns', function (Blueprint $table) {
            $table->dropForeign(['created_by']);
            $table->dropColumn('created_by');
            $table->dropColumn('is_cancelled');
            $table->dropColumn('cancel_reason');
        });
    }
};
