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
            $table->unsignedBigInteger('book_issue_id')->nullable();
            $table->boolean('is_available')->default(true)->nullable();
            $table->boolean('is_allocated')->default(false)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('book_acc_nos', function (Blueprint $table) {
            $table->dropColumn('book_issue_id');
            $table->dropColumn('is_available');
            $table->dropColumn('is_allocated');
        });
    }
};

