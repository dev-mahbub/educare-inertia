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
        Schema::table('library_self_levels', function (Blueprint $table) {
            $table->unsignedBigInteger('parent_id')->nullable()->after('school_id');
            $table->foreign('parent_id')->references('id')->on('library_self_levels')->after('parent_id');
            $table->string('name')->nullable()->after('parent_id');
            $table->longText('description')->nullable()->after('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('library_self_levels', function (Blueprint $table) {
            $table->dropColumn('parent_id');
            $table->dropColumn('name');
            $table->dropColumn('description');
        });
    }
};
