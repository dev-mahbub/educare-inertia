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
        Schema::create('staff_salary_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_year_id')->nullable()->constrained();
            $table->foreignId('payment_month_id')->nullable()->constrained();
            $table->foreignId('staff_id')->nullable()->constrained('staff', 'id');
            $table->foreignId('ledger_id')->nullable()->constrained();
            $table->decimal('total_earning_amount', 8, 2)->default(0);
            $table->decimal('total_deduction_amount', 8, 2)->default(0);
            $table->decimal('payable_amount', 8, 2)->default(0);
            $table->decimal('paid_amount', 8, 2)->default(0);
            $table->decimal('due_amount', 8, 2)->default(0);
            $table->date('payment_date');
            $table->string('payment_note')->nullable();
            $table->boolean('is_published')->default(false);
            $table->boolean('is_canceled')->default(false);
            $table->string('cancel_reason')->nullable();
            $table->string('status')->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff_salary_payments');
    }
};
