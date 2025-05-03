<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\Status;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('admission_exams', function (Blueprint $table) {
            $table->foreignId('class_name_id')->nullable()->constrained()->after('academic_year_id');
            $table->string('status')->default(Status::ACTIVE)->after('test_time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('admission_exams', function (Blueprint $table) {
            $table->dropColumn('class_name_id');
            $table->dropColumn('status');
        });
    }
};
