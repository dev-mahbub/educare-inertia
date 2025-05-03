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
        Schema::create('sale_ledger_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_year_id')->nullable()->constrained();
            $table->foreignId('sale_ledger_id')->nullable()->constrained();
            $table->foreignId('created_by')->nullable()->constrained('users', 'id');
            $table->foreignId('bank_ledger_id')->nullable()->constrained('ledgers', 'id');
            $table->date('payment_date');
            $table->string('transaction_no')->nullable();
            $table->string('transaction_details')->nullable();
            $table->date('transaction_date')->nullable();
            $table->decimal('paid_amount', 8, 2)->nullable();
            $table->bigInteger('receipt_no')->nullable();
            $table->string('status')->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sale_ledger_payments');
    }
};
