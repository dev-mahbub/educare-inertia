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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_year_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('event_type')->nullable();
            $table->string('available_seat')->nullable();
            $table->text('teaser')->nullable();
            $table->longText('description')->nullable();
            $table->dateTime("start_datetime")->nullable();
            $table->dateTime("end_datetime")->nullable();
            $table->string('location')->nullable();
            $table->string('join_url')->nullable();
            $table->dateTime('visible_from')->nullable();
            $table->dateTime('visible_to')->nullable();
            $table->dateTime('registration_start_at')->nullable();
            $table->dateTime('registration_end_at')->nullable();
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
        Schema::dropIfExists('events');
    }
};
