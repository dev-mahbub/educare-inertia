<?php

use App\Enums\Status;
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
        Schema::create('student_gate_passes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable();
            $table->foreignId('academic_year_id')->nullable();
            $table->foreignId('classroom_id')->nullable();
            $table->foreignId('student_id')->nullable();
            $table->string('relation_type')->nullable();
            $table->string('visiting_person')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->date('in_date_at')->nullable();
            $table->date('out_date_at')->nullable();
            $table->time('in_time_at')->nullable();
            $table->time('out_time_at')->nullable();
            $table->text('reason_gate_pass')->nullable();
            $table->string('status')->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_gate_passes');
    }
};
