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
        Schema::create('journals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_year_id')->nullable()->constrained();
            $table->foreignId('created_by')->nullable()->constrained('users', 'id');
            $table->foreignId('type_id')->nullable()->constrained()->onDelete('set null');
            $table->date('journal_date');
            $table->bigInteger('voucher_no')->nullable();
            $table->decimal('debit_amount', 8, 2)->nullable();
            $table->decimal('credit_amount', 8, 2)->nullable();
            $table->decimal('total_amount', 8, 2)->default(0);
            $table->longText('description')->nullable();
            $table->boolean('is_canceled')->default(false);
            $table->string('cancel_reason')->nullable();
            $table->string('status')->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('journals');
    }
};
