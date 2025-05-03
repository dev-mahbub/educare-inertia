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
        Schema::create('admission_classrooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable();
            $table->foreignId('academic_year_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('classroom_id')->nullable();
            $table->unsignedBigInteger('admission_id')->nullable();
            $table->integer('min_age')->nullable();
            $table->integer('max_age')->nullable();
            $table->date('on_date_at')->nullable();
            $table->decimal('reg_fee', 8, 2)->default(0.00)->nullable();
            $table->integer('reg_limit')->nullable();
            $table->integer('adm_limit')->nullable();
            $table->string('adm_prefix')->nullable();
            $table->string('adm_postfix')->nullable();
            $table->boolean('is_open_offline')->nullable()->default(0)->comment('1=open 0=close');
            $table->boolean('is_open_online')->nullable()->default(0)->comment('1=open 0=close');
            $table->boolean('is_result')->nullable()->default(0)->comment('1=publish 0=unpublish');
            $table->string('status')->default(Status::ACTIVE);
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admission_classrooms');
    }
};
