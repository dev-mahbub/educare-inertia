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
        Schema::create('academic_years', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->date('start_date_at')->nullable();
            $table->date('end_date_at')->nullable();
            $table->string('academic_session')->nullable();
            $table->integer('display_order')->unsigned()->default(0);
            $table->boolean('is_copy_class')->default(0);
            $table->boolean('is_copy_admission_criteria')->default(0);
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('academic_years');
    }
};