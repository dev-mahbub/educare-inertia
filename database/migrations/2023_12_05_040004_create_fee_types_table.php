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
        Schema::create('fee_types', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable();
            $table->string('fee_type')->nullable();
            $table->string('installment_type')->nullable();
            $table->string('category_id')->nullable();
            $table->string('display_name')->nullable();
            $table->longText('description')->nullable();
            $table->boolean('is_fee_refundable')->default(0);
            $table->boolean('is_fee_special')->default(0);
            $table->string('status')->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fee_types');
    }
};
