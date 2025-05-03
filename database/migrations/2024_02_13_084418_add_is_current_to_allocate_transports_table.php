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
        Schema::table('allocate_transports', function (Blueprint $table) {
            $table->boolean('is_current')->default(0)->after('allocate_type_for');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('allocate_transports', function (Blueprint $table) {
            $table->dropColumn('is_current');
        });
    }
};
