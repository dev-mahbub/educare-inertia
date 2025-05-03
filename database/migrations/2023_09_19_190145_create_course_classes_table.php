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
        Schema::create('course_classes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('subject_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('class_name_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('grade')->nullable();
            $table->string('class_day');
            $table->string('class_notes');
            $table->time('start_time_at');
            $table->time('end_time_at');
            $table->date('start_date_at');
            $table->date('end_date_at');
            $table->string('live_class_url')->nullable();
            $table->boolean("is_copy_others_class")->default(0);
            $table->boolean("is_online_class")->default(0);
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_classes');
    }
};
