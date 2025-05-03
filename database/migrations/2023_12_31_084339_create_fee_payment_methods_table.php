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
        Schema::create('fee_payment_methods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_year_id')->nullable()->constrained();
            $table->foreignId('created_by')->nullable()->constrained('users', 'id');
            $table->foreignId('student_id')->nullable()->constrained();
            $table->string('payment_mode')->nullable();
            $table->date('payment_date');
            $table->integer('school_receipt_no')->nullable();
            $table->string('payment_note')->nullable();
            $table->integer('cheque_no')->nullable();
            $table->date('cheque_date')->nullable();
            $table->decimal('cheque_amount')->nullable();
            $table->foreignId('bank_id')->nullable()->constrained();
            $table->string('branch')->nullable();
            $table->foreignId('bank_account_id')->nullable()->constrained();
            $table->string('dd_bank')->nullable();
            $table->integer('dd_number')->nullable();
            $table->date('dd_date')->nullable();
            $table->decimal('dd_amount')->nullable();
            $table->integer('paytm_ref_no')->nullable();
            $table->integer('paytm_mobile')->nullable();
            $table->integer('neft_number')->nullable();
            $table->string('neft_desc')->nullable();
            $table->integer('transaction_id')->nullable();
            $table->integer('upi_transaction_id')->nullable();
            $table->string('upi_description')->nullable();
            $table->bigInteger('receipt_no')->nullable();
            $table->string('fee_payment_type');
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fee_payment_methods');
    }
};
