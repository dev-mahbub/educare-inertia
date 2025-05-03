<?php

use App\Enums\Status;
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
        Schema::create('staff_absent_deductions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_year_id')->nullable()->constrained();
            $table->foreignId('staff_id')->nullable()->constrained('staff', 'id');
            $table->foreignId('staff_salary_payment_id')->nullable()->constrained();
            $table->foreignId('payment_month_id')->nullable()->constrained();
            $table->date('attendance_date');
            $table->string('day_type');
            $table->string('deduction_message')->nullable();
            $table->boolean('is_canceled')->default(false);
            $table->string('status')->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff_absent_deductions');
    }
};
