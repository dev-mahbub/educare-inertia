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
        Schema::table('book_acc_nos', function (Blueprint $table) {
            $table->foreignId('book_return_id')->nullable()->after('book_issue_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('book_acc_nos', function (Blueprint $table) {
            $table->dropColumn('book_return_id');
        });
    }
};
