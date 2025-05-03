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
        Schema::create('salaries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->morphs('salaryable');
            $table->decimal('gross_amount', 10, 2)->default(0.00);
            $table->decimal('transport_amount', 8, 2)->default(0.00);
            $table->decimal('medical_amount', 8, 2)->default(0.00);
            $table->decimal('additional_amount', 8, 2)->default(0.00);
            $table->longText('notes')->nullable();
            $table->string('paid_status')->default('Processing');
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('salarys');
    }
};
