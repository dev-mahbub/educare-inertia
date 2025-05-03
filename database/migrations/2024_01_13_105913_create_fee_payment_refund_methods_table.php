<?php

use App\Enums\Status;
use App\Enums\RefundStatus;
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
        Schema::create('fee_payment_refund_methods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_year_id')->nullable()->constrained();
            $table->foreignId('created_by')->nullable()->constrained('users', 'id');
            $table->foreignId('student_id')->nullable()->constrained();
            $table->string('refund_mode');
            $table->date('refund_date');
            $table->string('refund_note');
            $table->integer('cheque_no')->nullable();
            $table->date('cheque_date')->nullable();
            $table->decimal('cheque_amount')->nullable();
            $table->foreignId('bank_id')->nullable()->constrained();
            $table->string('branch')->nullable();
            $table->bigInteger('receipt_no')->nullable();
            $table->date('cancel_date')->nullable();
            $table->string('cancellation_reason')->nullable();
            $table->string('refund_status')->default(RefundStatus::APPROVED);
            $table->string('status')->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fee_payment_refund_methods');
    }
};
