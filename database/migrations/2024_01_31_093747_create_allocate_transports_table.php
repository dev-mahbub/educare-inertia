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
        Schema::create('allocate_transports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_year_id')->nullable()->constrained();
            $table->foreignId('transport_stoppage_id')->nullable()->constrained();
            $table->foreignId('classroom_id')->nullable()->constrained();
            $table->foreignId('student_id')->nullable()->constrained();
            $table->foreignId('staff_id')->nullable()->constrained();
            $table->foreignId('voucher_id')->nullable()->constrained();
            $table->foreignId('transport_route_id')->nullable()->constrained();
            $table->string('allocate_type_for')->nullable();
            $table->string('transport_type')->nullable();
            $table->string('amount')->nullable();
            $table->date('applied_on_date_at')->nullable();
            $table->date('start_from_date')->nullable();
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('allocate_transports');
    }
};
