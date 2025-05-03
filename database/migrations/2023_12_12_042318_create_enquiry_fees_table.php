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
        Schema::create('enquiry_fees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_year_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('enquiry_id')->nullable()->constrained();
            $table->foreignId('bank_id')->nullable()->constrained();
            $table->foreignId('bank_account_id')->nullable()->constrained();
            $table->decimal('academic_fee', 8, 2)->default(0.00);
            $table->decimal('fee_amount', 8, 2)->default(0.00);
            $table->string('payment_mode')->nullable();
            $table->string('payment_note')->nullable();
            $table->string('cheque_no')->nullable();
            $table->date('cheque_date')->nullable();
            $table->string('paytm_ref_no')->nullable();
            $table->string('paytm_mobile')->nullable();
            $table->string('neft_number')->nullable();
            $table->string('neft_desc')->nullable();
            $table->string('upi_number')->nullable();
            $table->string('upi_description')->nullable();
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enquiry_fees');
    }
};
