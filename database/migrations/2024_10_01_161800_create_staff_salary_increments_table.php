<?php

use App\Enums\Status;
use App\Enums\SalaryIncrementStatus;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('staff_salary_increments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('staff_id')->nullable()->constrained('staff', 'id');
            $table->bigInteger('basic_amount');
            $table->json('earnings')->nullable();
            $table->date('increment_date');
            $table->string('increment_note')->nullable();
            $table->string('increment_status')->default(SalaryIncrementStatus::PENDING);
            $table->string('status')->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff_salary_increments');
    }
};
