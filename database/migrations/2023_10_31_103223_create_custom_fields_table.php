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
        Schema::create('custom_fields', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->string('custom_field_type')->nullable();
            $table->string('name')->nullable();
            $table->string('form_section')->nullable();
            $table->string('data_type')->nullable();
            $table->string('input_length')->nullable();
            $table->boolean('is_required')->default(0); 
            $table->integer('display_order')->nullable(); 
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('custom_fields');
    }
};
