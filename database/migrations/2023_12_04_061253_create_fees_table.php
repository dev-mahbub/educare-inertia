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
        Schema::create('fees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable();
            $table->foreignId('academic_year_id')->nullable()->constrained();
            $table->integer('installment_no')->nullable();
            $table->string('title')->nullable();
            $table->date('start_date_at')->nullable();
            $table->date('end_date_at')->nullable();
            $table->date('last_pay_date_at')->nullable();
            $table->longText('description')->nullable();
            $table->boolean('is_admission_install')->default(0);
            $table->string('status')->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fees');
    }
};
