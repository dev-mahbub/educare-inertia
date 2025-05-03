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
        Schema::create('book_issues', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable();
            $table->foreignId('book_item_id')->nullable();
            $table->foreignId('book_acc_no_id')->nullable();
            $table->foreignId('classroom_id')->nullable();
            $table->foreignId('student_id')->nullable();
            $table->foreignId('staff_id')->nullable();
            $table->date('issued_date_at')->nullable();
            $table->date('due_date_at')->nullable();
            $table->integer('issue_for_day')->nullable();
            $table->string('book_user_type')->nullable();
            $table->string('status')->default(Status::ACTIVE->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_issues');
    }
};
