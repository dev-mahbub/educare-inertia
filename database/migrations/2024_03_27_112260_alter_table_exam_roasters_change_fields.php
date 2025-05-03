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
        Schema::table('exam_roasters', function (Blueprint $table) {
            // $table->foreignId('classroom_subject_id')->nullable()->constrained()->change();
            // $table->foreignId('exam_id')->nullable()->constrained()->change();
            $table->integer('full_mark')->nullable()->change();
            $table->integer('pass_mark')->nullable()->change();
            $table->integer('converted_mark')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('exam_roasters', function (Blueprint $table) {
            // $table->foreignId('classroom_subject_id')->constrained()->onDelete('cascade')->change();
            // $table->foreignId('exam_id')->constrained()->onDelete('cascade')->change();
            $table->integer('full_mark')->unsigned()->default(0)->change();
            $table->integer('pass_mark')->unsigned()->default(0)->change();
            $table->integer('converted_mark')->unsigned()->default(0)->change();
        });
    }
};
