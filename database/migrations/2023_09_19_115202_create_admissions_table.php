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
        Schema::create('admissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable();
            $table->foreignId('academic_year_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('admission_type')->nullable()->default('in_school'); // exam / in_school / tc
            $table->string('title')->nullable();
            $table->string('admission_number')->nullable();
            $table->string('registration_seed')->nullable();
            $table->date('start_date_at')->nullable();
            $table->date('end_date_at')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('contact_mobile')->nullable();
            $table->boolean('is_open_or_close')->nullable()->comment('1=open 0=close')->default(0);
            $table->boolean('is_current')->nullable()->default(0)->comment('1=yes 0=no');
            $table->boolean('is_online_registration')->nullable()->default(0)->comment('1=yes 0=no');
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admissions');
    }
};
