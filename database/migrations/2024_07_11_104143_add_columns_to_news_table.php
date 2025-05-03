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
        Schema::table('news', function (Blueprint $table) {
            $table->foreignId('created_by')->nullable()->constrained('users', 'id')->onDelete('set null')->after('academic_year_id');
            $table->string('title')->nullable()->after('created_by');
            $table->string('audience_type')->nullable()->after('title');
            $table->string('news_type')->nullable()->after('audience_type');
            $table->dateTime('start_date')->nullable()->after('title');
            $table->dateTime('end_date')->nullable()->after('start_date');
            $table->boolean('is_published')->default(false)->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('news', function (Blueprint $table) {
            $table->dropForeign(['created_by']);
            $table->dropColumn('created_by');
            $table->dropColumn('title');
            $table->dropColumn('audience_type');
            $table->dropColumn('news_type');
            $table->dropColumn('start_date');
            $table->dropColumn('end_date');
            $table->dropColumn('is_published');
        });
    }
};
