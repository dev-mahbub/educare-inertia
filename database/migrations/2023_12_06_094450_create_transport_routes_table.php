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
        Schema::create('transport_routes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('vehicle_id')->nullable()->constrained();
            $table->foreignId('staff_id')->nullable()->constrained();
            $table->string('name')->nullable();
            $table->time('pickup_time_at')->nullable();
            $table->time('drop_time_at')->nullable();
            $table->string('status')->default('Active'); 
            $table->timestamps();
        });
    }
/*
    

            */

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transport_routes');
    }
};
