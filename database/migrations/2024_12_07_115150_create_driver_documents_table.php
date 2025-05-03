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
        Schema::create('driver_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_year_id')->nullable()->constrained();
            $table->foreignId('driver_id')->nullable()->constrained();
            $table->foreignId('issued_by')->nullable()->constrained('staff', 'id');
            $table->foreignId('created_by')->nullable()->constrained('users', 'id');
            $table->foreignId('document_category_id')->nullable()->constrained();
            $table->string('document_name')->nullable();
            $table->string('document_no')->nullable();
            $table->string('generated_for')->nullable();
            $table->string('notes')->nullable();
            $table->date('issued_date')->nullable();
            $table->string('status')->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('driver_documents');
    }
};
