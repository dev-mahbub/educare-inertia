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
        Schema::table('events', function (Blueprint $table) {
            $table->foreignId('created_by')->nullable()->constrained('users', 'id')->onDelete('set null')->after('academic_year_id');
            $table->string('event_level')->nullable()->after('event_type');
            $table->time('start_time')->nullable()->after('end_datetime');
            $table->decimal('event_budget', 8, 2)->default(0.00)->after('start_time');
            $table->boolean('is_published')->default(false)->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropForeign(['created_by']);
            $table->dropColumn('created_by');
            $table->dropColumn('event_level');
            $table->dropColumn('start_time');
            $table->dropColumn('event_budget');
            $table->dropColumn('is_published');
        });
    }
};
