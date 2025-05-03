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
        Schema::create('fee_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_year_id')->nullable()->constrained();
            $table->foreignId('created_by')->nullable()->constrained('users', 'id');
            $table->morphs('fee_paymentable');
            $table->foreignId('student_id')->nullable()->constrained();
            $table->foreignId('fee_payment_method_id')->nullable()->constrained();
            $table->foreignId('adjust_fee_payment_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('fee_id')->nullable()->constrained();
            $table->foreignId('student_fee_voucher_id')->nullable()->constrained();
            $table->foreignId('transport_id')->nullable()->constrained();
            $table->foreignId('fee_type_id')->nullable()->constrained();
            $table->foreignId('discount_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('student_fee_discount_id')->nullable()->constrained()->onDelete('set null');
            $table->decimal('amount', 8, 2)->default(0.00);
            $table->decimal('payable_amount', 8, 2)->default(0.00);
            $table->decimal('paid_amount', 8, 2)->default(0.00);
            $table->decimal('due_amount', 8, 2)->default(0.00);
            $table->decimal('discount_amount', 8, 2)->default(0.00);
            $table->boolean('is_fee_due')->default(0);
            $table->boolean('is_adjusted_fee')->default(0);
            $table->string('fee_payment_type');
            $table->string('payment_status')->default('Due');
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fee_payments');
    }
};
