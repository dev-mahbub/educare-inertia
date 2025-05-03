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
          $table->foreignId('class_subject_id')->nullable()->constrained()->onDelete('cascade')->after('class_name_id');
          $table->string('sub_title')->nullable()->after('title');

          $table->dropForeign(['subject_id']);
          $table->dropColumn('subject_id');
          $table->dropColumn('class_va');
          $table->dropColumn('class_vb');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('classworks', function (Blueprint $table) {
            //
        });
    }
};
