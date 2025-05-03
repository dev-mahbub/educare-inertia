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
        Schema::table('subjects', function (Blueprint $table) {
            $table->foreignId('e_learning_subject_id')->nullable()->constrained()->after('school_id');
            $table->string('is_practical_paper')->nullable();
            $table->string('is_co_scholastic')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('subjects', function (Blueprint $table) {
            $table->dropColumn('e_learning_subject_id');
            $table->dropColumn('is_practical_paper');
            $table->dropColumn('is_co_scholastic');
        });
    }
};
