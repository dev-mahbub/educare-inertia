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
        Schema::create('classroom_subjects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('classroom_id')->nullable()->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('parent_subject_id')->nullable();
            $table->foreign('parent_subject_id')->nullable()->references('id')->on('subjects');
            $table->foreignId('subject_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('academic_grade_id')->nullable()->constrained();
            $table->string('type')->nullable();
            $table->string('title')->nullable();
            $table->string('grade_scale')->nullable();
            $table->longText('description')->nullable();
            $table->boolean("is_marking")->default(1);
            $table->json('teachers_data')->nullable();
            $table->integer('display_order')->unsigned()->default(0);
            $table->string('status')->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classroom_subjects');
    }
};
