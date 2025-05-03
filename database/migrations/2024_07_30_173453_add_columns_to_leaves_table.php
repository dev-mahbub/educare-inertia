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
        Schema::table('leaves', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->after('academic_year_id');
            $table->string('leave_type')->nullable()->after('academic_year_id');
            $table->date('start_date_at')->nullable()->after('academic_year_id');
            $table->date('end_date_at')->nullable()->after('academic_year_id');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('leaves', function (Blueprint $table) {
            Schema::dropIfExists('leaves');
        });
    }
};
