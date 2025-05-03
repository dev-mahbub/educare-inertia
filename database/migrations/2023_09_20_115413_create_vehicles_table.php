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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_year_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('driver_id')->nullable()->constrained(); 
            $table->unsignedBigInteger('conductor_id')->nullable();
            $table->unsignedBigInteger('transport_provider_id')->nullable();
            $table->foreign('conductor_id')->references('id')->on('drivers');
            $table->string('vehicle_number');
            $table->integer('total_seat')->nullable();
            $table->string('registration_number')->nullable();
            $table->string('chassis_number')->nullable();
            $table->string('finance_name')->nullable();
            $table->string('engine_number')->nullable();
            $table->string('company_name')->nullable();
            $table->string('tank_capacity')->nullable();
            $table->string('model')->nullable();
            $table->string('type')->nullable();
            $table->string('fuel_type')->nullable();
            $table->string('owner_name')->nullable();
            $table->string('device_id')->nullable();
            $table->date('insurance_upto')->nullable();
            $table->date('road_tax_upto')->nullable();
            $table->date('pollution_upto')->nullable();
            $table->date('permit_upto')->nullable();
            $table->date('registration_date')->nullable();
            $table->string('description')->nullable();
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
            