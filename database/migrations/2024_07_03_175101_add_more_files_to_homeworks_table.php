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
        Schema::table('homework', function (Blueprint $table) {
            $table->string('home_camera_file')->nullable()->after('home_file');
            $table->string('home_doc_file')->nullable()->after('home_file');
            $table->string('home_file_url')->nullable()->after('home_file');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('homework', function (Blueprint $table) {
            $table->dropColumn('home_camera_file');
            $table->dropColumn('home_doc_file');
            $table->dropColumn('home_file_url');
        });
    }
};
