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
        Schema::create('sale_ledgers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_year_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('ledger_id')->nullable()->constrained();
            $table->foreignId('classroom_id')->nullable()->constrained();
            $table->foreignId('staff_id')->nullable()->constrained();
            $table->foreignId('student_id')->nullable()->constrained();
            $table->date('sale_date_at')->nullable();
            $table->string('admission_no')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('father_name')->nullable();
            $table->string('father_phone')->nullable();
            $table->string('address')->nullable();
            $table->decimal('sub_total', 6, 2)->nullable();
            $table->decimal('total_discount', 6, 2)->nullable();
            $table->decimal('total_tax', 6, 2)->nullable();
            $table->decimal('total', 6, 2)->nullable();
            $table->boolean('is_print_receipt')->default(0);
            $table->string('paid_type')->nullable();
            $table->string('payment_type')->nullable();
            $table->string('sale_type_for')->nullable();
            $table->string('transaction_no')->nullable();
            $table->string('transaction_desc')->nullable();
            $table->date('transaction_date')->nullable();
            $table->longText('description')->nullable();
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sale_ledgers');
    }
};
