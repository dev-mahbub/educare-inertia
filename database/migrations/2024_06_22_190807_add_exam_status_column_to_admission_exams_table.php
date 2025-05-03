<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\AdmissionExamStatus;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('admission_exams', function (Blueprint $table) {
            $table->string('exam_status')->default(AdmissionExamStatus::PENDING)->after('test_time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('admission_exams', function (Blueprint $table) {
            $table->dropColumn('exam_status');
        });
    }
};
