<?php

use App\Enums\Status;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('online_classes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_year_id')->nullable()->constrained();
            $table->foreignId('classroom_id')->nullable()->constrained();
            $table->foreignId('subject_id')->nullable()->constrained();
            $table->foreignId('user_id')->nullable()->constrained();
            $table->date('start_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->date('repeat_date')->nullable();
            $table->string('live_class_url');
            $table->string('notes')->nullable();
            $table->json('repeatable_days')->nullable();
            $table->string('status')->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('online_classes');
    }
};
