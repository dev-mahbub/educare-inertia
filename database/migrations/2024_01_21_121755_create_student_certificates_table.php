<?php

use App\Enums\CertificateType;
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
        Schema::create('student_certificates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable();
            $table->foreignId('academic_year_id')->nullable()->constrained();
            $table->foreignId('student_id')->nullable();
            $table->unsignedBigInteger('from_fee_id')->nullable();
            $table->unsignedBigInteger('to_fee_id')->nullable();
            $table->foreignId('classroom_id')->nullable();
            $table->string('certificate_no')->nullable();
            $table->date('generated_date_at')->nullable();
            $table->date('issue_date_at')->nullable();
            $table->string('tc_reason')->nullable();
            $table->boolean('is_draft')->nullable();
            $table->boolean('is_generated')->nullable();
            $table->string('certificate_type')->default(CertificateType::TRANSFER_CERTIFICATE->value);
            $table->string('status')->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_transfer_certificates');
    }
};
