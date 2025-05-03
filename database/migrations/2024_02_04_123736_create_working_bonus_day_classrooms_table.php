<?php

use App\Enums\Status;
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
        Schema::create('working_bonus_day_classrooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_year_id')->nullable();
            $table->foreignId('class_name_id')->nullable();
            $table->foreignId('classroom_id')->nullable();
            $table->foreignId('working_bonus_day_class_id')->nullable();
            $table->foreignId('month_id')->nullable();
            $table->string('working_days')->nullable();
            $table->string('bonus_days')->nullable();
            $table->string('status')->default(Status::ACTIVE->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('working_bonus_day_classrooms');
    }
};
