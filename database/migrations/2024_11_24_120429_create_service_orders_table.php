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
        Schema::create('service_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('created_by')->nullable()->constrained('users', 'id');
            $table->string('type');
            $table->string('payment_method');
            $table->integer('quantity');
            $table->decimal('price', 8, 2);
            $table->decimal('payable_amount', 8, 2)->default(0);
            $table->decimal('paid_amount', 8, 2)->default(0);
            $table->decimal('due_amount', 8, 2)->default(0);
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
        Schema::dropIfExists('service_orders');
    }
};
