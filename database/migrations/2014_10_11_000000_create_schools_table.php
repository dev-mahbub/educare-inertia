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
        Schema::create('schools', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->foreign('parent_id')->references('id')->on('schools');
            $table->string('title');
            $table->text('teaser')->nullable();
            $table->longText('description')->nullable();
            $table->string('school_key')->nullable();
            $table->string('affiliation_no');
            $table->string('city')->nullable();
            $table->string('zip')->nullable();
            $table->string('phone')->nullable();
            $table->string('phone_2')->nullable();
            $table->string('mail')->nullable();
            $table->string('school_number')->nullable();
            $table->string('udise_code')->nullable();
            $table->string('medium')->nullable();
            $table->string('display_name_board')->nullable();
            $table->string('street_address')->nullable();
            $table->string('fb_url')->nullable();
            $table->string('instagram_url')->nullable();
            $table->string('twitter_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->string('youtube_url')->nullable();
            $table->string('android_app_url')->nullable();
            $table->string('apple_app_url')->nullable();
            $table->string('google_business_url')->nullable();
            $table->string('established_at')->nullable();
            $table->boolean("is_generated_domain")->default(0);
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
        Schema::dropIfExists('schools');
    }
};
