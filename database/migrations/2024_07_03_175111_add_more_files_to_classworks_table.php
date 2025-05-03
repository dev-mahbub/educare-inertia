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
        Schema::table('classworks', function (Blueprint $table) {
            $table->string('class_camera_file')->nullable()->after('class_file');
            $table->string('class_doc_file')->nullable()->after('class_file');
            $table->string('class_file_url')->nullable()->after('class_file');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('classworks', function (Blueprint $table) {
            $table->dropColumn('class_camera_file');
            $table->dropColumn('class_doc_file');
            $table->dropColumn('class_file_url');
        });
    }
};
