<?php

use App\Enums\Status;
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
        Schema::create('book_purchases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable();
            $table->foreignId('library_vendor_id')->nullable();
            $table->foreignId('book_type_id')->nullable();
            $table->foreignId('bank_id')->nullable();
            $table->string('bill_number')->nullable();
            $table->date('purchase_date_at')->nullable();
            $table->string('purchase_by')->nullable();
            $table->string('payment_mode')->nullable();
            $table->string('cheque_no')->nullable();
            $table->date('cheque_date_at')->nullable();
            $table->decimal('amount')->nullable();
            $table->string('branch')->nullable();
            $table->string('transaction_no')->nullable();
            $table->string('purchase_note')->nullable();

            // book item
            $table->decimal('grace_total_price')->nullable();
            $table->decimal('tax_amount')->nullable();
            $table->string('discount_type')->nullable();
            $table->decimal('discount_amount')->nullable();
            $table->decimal('discount')->nullable();
            $table->decimal('total')->nullable();
            $table->string('status')->default(Status::ACTIVE->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_purchases');
    }
};
