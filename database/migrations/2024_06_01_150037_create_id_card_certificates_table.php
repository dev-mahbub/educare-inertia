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
        Schema::create('id_card_certificates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_year_id')->nullable()->constrained();
            $table->string('template_name');
            $table->string('orientation');
            $table->string('audience_type');
            $table->boolean('is_with_backpage')->default(false);
            $table->string('background_image')->nullable();
            $table->string('background_color')->nullable();
            $table->json('columns')->nullable();
            $table->json('header')->nullable();
            $table->json('body')->nullable();
            $table->json('footer')->nullable();
            $table->json('back_page')->nullable();
            $table->string('status')->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('id_card_certificates');
    }
};
