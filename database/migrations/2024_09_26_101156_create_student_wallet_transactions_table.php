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
        Schema::create('student_wallet_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_year_id')->nullable()->constrained();
            $table->foreignId('fee_payment_id')->nullable()->constrained();
            $table->foreignId('student_id')->nullable()->constrained();
            $table->foreignId('created_by')->nullable()->constrained('users', 'id');
            $table->date('transaction_date');
            $table->string('transaction_type');
            $table->string('transaction_mode');
            $table->longText('description')->nullable();
            $table->decimal('amount', 8, 2)->nullable();
            $table->string('status')->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_wallet_transactions');
    }
};
