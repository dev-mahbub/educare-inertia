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
        Schema::create('virtual_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('created_by')->nullable()->constrained('users', 'id');
            $table->foreignId('class_name_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('subject_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('online_topic_id')->nullable()->constrained();
            $table->foreignId('virtual_asset_id')->nullable()->constrained();
            $table->string('language');
            $table->string('question_type');
            $table->string('difficulty_level');
            $table->longText('question');
            $table->json('answer_options')->nullable();
            $table->longText('answer_explanation')->nullable();
            $table->decimal('mark', 8, 2)->nullable();
            $table->string('share_with')->nullable();
            $table->boolean('is_published')->default(false);
            $table->boolean('is_active')->default(true);
            $table->string('status')->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('virtual_questions');
    }
};
