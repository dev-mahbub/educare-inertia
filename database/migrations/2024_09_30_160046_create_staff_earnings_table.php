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
        Schema::create('staff_earnings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('staff_id')->nullable()->constrained('staff', 'id');
            $table->foreignId('pay_scale_id')->nullable()->constrained();
            $table->bigInteger('basic_pay');
            $table->bigInteger('grade_pay');
            $table->bigInteger('net_salary');
            $table->json('earnings')->nullable();
            $table->json('deductions')->nullable();
            $table->string('status')->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff_earnings');
    }
};
