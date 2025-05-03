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
        Schema::table('deallocate_transports', function (Blueprint $table) {
            $table->foreignId('fee_id')->nullable()->constrained()->after('voucher_id');
            $table->string('allocation_type')->after('fee_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('deallocate_transports', function (Blueprint $table) {
            $table->dropColumn('fee_id');
            $table->dropColumn('allocation_type');
        });
    }
};
