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
        Schema::table('book_items', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->constrained()->after('school_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('book_items', function (Blueprint $table) {
            $table->dropColumn('user_id');
        });
    }
};
