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
        Schema::create('cheques', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('student_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('bank_id')->nullable()->constrained();
            $table->string('branch');
            $table->bigInteger('cheque_no');
            $table->date('cheque_date');
            $table->date('pay_date')->nullable();
            $table->decimal('amount', 8, 2)->default(0.00);
            $table->bigInteger('receipt_no')->nullable();
            $table->date('clearance_date')->nullable();
            $table->string('clearance_note')->nullable();
            $table->integer('penalty')->nullable();
            $table->string('cheque_status')->nullable();
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cheques');
    }
};
