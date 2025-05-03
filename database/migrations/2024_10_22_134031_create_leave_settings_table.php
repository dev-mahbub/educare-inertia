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
        Schema::create('leave_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('created_by')->nullable()->constrained('users', 'id');
            $table->boolean('is_auto_approve_leave_enabled')->default(false);
            $table->boolean('is_half_day_leave_enabled')->default(false);
            $table->boolean('is_rule_one_in_time_enabled')->default(false);
            $table->boolean('is_rule_two_total_hour_enabled')->default(false);
            $table->boolean('is_saturday_exceptional')->default(false);
            $table->boolean('is_sunday_exceptional')->default(false);
            $table->time('rule_one_in_time')->nullable();
            $table->integer('rule_two_total_hour')->nullable();
            $table->boolean('is_active')->default(false);
            $table->string('status')->default(Status::ACTIVE);
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leave_settings');
    }
};
