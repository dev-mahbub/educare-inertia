<?php

use App\Enums\Status;
use App\Enums\OrderPaymentStatus;
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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('created_by')->nullable()->constrained('users', 'id');
            $table->foreignId('service_order_id')->nullable()->constrained()->onDelete('set null');
            $table->string('invoice_no');
            $table->string('type');
            $table->string('service')->nullable();
            $table->string('service_type')->nullable();
            $table->decimal('amount', 8, 2)->default(0);
            $table->longText('invoice_description')->nullable();
            $table->date('invoice_date')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->date('paid_date')->nullable();
            $table->string('payment_status')->default(OrderPaymentStatus::PENDING);
            $table->string('status')->default(Status::PENDING);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
