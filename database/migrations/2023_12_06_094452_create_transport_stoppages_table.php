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
        Schema::create('transport_stoppages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('area_id')->nullable()->constrained();
            $table->foreignId('transport_route_id')->nullable()->constrained();
            $table->integer('order')->nullable();
            $table->string('stoppage')->nullable();
            $table->decimal('pick_price', 6, 2)->default(0.00)->nullable();
            $table->decimal('drop_price', 6, 2)->default(0.00)->nullable();
            $table->decimal('pick_drop_price', 6, 2)->default(0.00)->nullable();
            $table->time('pickup_time_at')->nullable();
            $table->time('drop_time_at')->nullable();
            $table->decimal('distance', 6, 2)->default(0.00)->nullable();
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transport_stoppages');
    }
};
