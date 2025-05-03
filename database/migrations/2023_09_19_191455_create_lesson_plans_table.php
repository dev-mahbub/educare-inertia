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
        Schema::create('lesson_plans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('class_name_id')->constrained()->onDelete('cascade');
            $table->foreignId('subject_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('lesson_topic')->nullable();
            $table->text('description')->nullable();
            $table->date('start_date_at')->nullable();;
            $table->date('end_date_at')->nullable();;
            $table->json('methodology')->nullable();
            $table->boolean('is_lesson_va')->default(0);
            $table->boolean('is_lesson_vb')->default(0);
            $table->boolean('is_notification_teacher')->default(0);
            $table->boolean('is_mail_teacher')->default(0);
            $table->string('lesson_file')->nullable();
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lesson_plans');
    }
};
