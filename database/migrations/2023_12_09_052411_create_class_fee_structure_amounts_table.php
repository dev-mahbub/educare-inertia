<?php

use App\Enums\StudentStatus;
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
        Schema::create('class_fee_structure_amounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_year_id')->nullable()->constrained();
            $table->foreignId('class_fee_structure_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('class_name_id')->nullable()->constrained();
            $table->foreignId('fee_id')->nullable()->constrained();
            $table->foreignId('fee_type_id')->nullable()->constrained();
            $table->decimal('amount', 8, 2)->default(0.00);
            $table->integer('semester')->nullable();
            $table->boolean('is_admission_installment')->default(0);
            $table->boolean('is_fee_special')->default(0);
            $table->string('student_status');
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('class_fee_structure_amounts');
    }
};
