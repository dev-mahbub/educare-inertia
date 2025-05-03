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
        Schema::create('staff_product_item_allocations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable();
            $table->foreignId('staff_product_allocation_id')->nullable();
            $table->foreignId('product_id')->nullable();
            $table->bigInteger('available_quantity')->nullable();
            $table->bigInteger('allocate_quantity')->nullable();
            $table->longText('description')->nullable();
            $table->string('status')->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff_product_item_allocations');
    }
};
