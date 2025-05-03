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
        Schema::create('job_posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->string('title')->nullable();
            $table->integer('job_code')->nullable();
            $table->string('designation')->nullable();
            $table->integer('vacancy')->nullable();
            $table->string('gender')->nullable();
            $table->date('start_date_at')->nullable();
            $table->date('end_date_at')->nullable();
            $table->string('qualification')->nullable();
            $table->date('interview_date_at')->nullable();
            $table->longText('description')->nullable();
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_posts');
    }
};
