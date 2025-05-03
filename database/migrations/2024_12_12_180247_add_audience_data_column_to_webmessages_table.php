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
        Schema::table('webmessages', function (Blueprint $table) {
            $table->json('audience_data')->nullable()->after('audience_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('webmessages', function (Blueprint $table) {
            $table->dropColumn('audience_data');
        });
    }
};
