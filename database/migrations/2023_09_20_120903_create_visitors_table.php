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
        Schema::create('visitors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('phone')->nullable(); 
            $table->string('email')->unique();
            $table->decimal('height', 6, 2)->default(0.00);
            $table->decimal('weight', 6, 2)->default(0.00);
            $table->string('present_address')->nullable();
            $table->string('present_state')->nullable();
            $table->string('present_city')->nullable();
            $table->string('present_taluka')->nullable();
            $table->string('present_district')->nullable();
            $table->string('present_pin_code')->nullable();
            $table->string('permanent_address')->nullable();
            $table->string('permanent_state')->nullable();
            $table->string('permanent_city')->nullable();
            $table->string('permanent_taluka')->nullable();
            $table->string('permanent_district')->nullable();
            $table->boolean("is_inactive")->default(0);
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visitors');
    }
};
