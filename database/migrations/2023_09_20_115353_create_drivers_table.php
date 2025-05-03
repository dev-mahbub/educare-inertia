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
        Schema::create('drivers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->string('first_name');
            $table->string('last_name')->nullable();
            $table->string('type');
            $table->text('birth_date_at');
            $table->text('gender');
            $table->integer('age');
            $table->string('blood_group')->nullable();
            $table->string('contact')->nullable();
            $table->string('emergency_no')->nullable();
            $table->string('driving_license')->nullable();
            $table->string('proof_type');
            $table->string('proof_no')->nullable();
            $table->string('experience')->nullable();
            $table->string('relative_name')->nullable();
            $table->integer('pincode')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->text('address')->nullable();
            $table->string('status')->default('Active');
            $table->text('image');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('drivers');
    }
};
