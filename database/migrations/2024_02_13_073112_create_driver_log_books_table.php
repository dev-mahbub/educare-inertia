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
        Schema::create('driver_log_books', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable();
            $table->foreignId('academic_year_id')->nullable();
            $table->foreignId('vehicle_id')->nullable();
            $table->foreignId('from_transport_stoppage_id')->nullable();
            $table->foreignId('to_transport_stoppage_id')->nullable();
            $table->date('date_at')->nullable();
            $table->time('in_time_at')->nullable();
            $table->time('out_time_at')->nullable();
            $table->decimal('starting_km')->nullable();
            $table->decimal('last_km')->nullable();
            $table->decimal('total_km')->nullable();
            $table->decimal('fuel_ltr')->nullable();
            $table->decimal('fuel_rate')->nullable();
            $table->decimal('mileage')->nullable();
            $table->string('status')->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('driver_log_books');
    }
};
