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
        Schema::create('book_returns', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable();
            $table->foreignId('book_item_id')->nullable();
            $table->foreignId('book_acc_no_id')->nullable();
            $table->foreignId('book_issue_id')->nullable();
            $table->foreignId('student_id')->nullable();
            $table->foreignId('staff_id')->nullable();
            $table->integer('late_by_day')->nullable();
            $table->bigInteger('late_by_fine')->nullable();
            $table->string('book_user_type')->nullable();
            $table->date('return_date_at')->nullable();
            $table->text('return_note')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_returns');
    }
};
