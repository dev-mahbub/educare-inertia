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
        Schema::table('surveys', function (Blueprint $table) {
            $table->foreignId('created_by')->nullable()->constrained('users', 'id')->onDelete('set null')->after('academic_year_id');
            $table->foreignId('opened_by')->nullable()->constrained('users', 'id')->onDelete('set null')->after('created_by');
            $table->foreignId('closed_by')->nullable()->constrained('users', 'id')->onDelete('set null')->after('opened_by');
            $table->dateTime('opened_date')->nullable()->after('survey_audience');
            $table->dateTime('closed_date')->nullable()->after('opened_date');
            $table->boolean('is_open')->default(false)->after('opened_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('surveys', function (Blueprint $table) {
            $table->dropForeign(['created_by', 'opened_by', 'closed_by']);
            $table->dropColumn('created_by');
            $table->dropColumn('opened_by');
            $table->dropColumn('closed_by');
            $table->dropColumn('opened_date');
            $table->dropColumn('closed_date');
            $table->dropColumn('is_open');
        });
    }
};
