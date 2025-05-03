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
        Schema::create('book_acc_nos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable();
            $table->foreignId('academic_year_id')->nullable();
            $table->foreignId('book_purchase_id')->nullable();
            $table->foreignId('book_item_id')->nullable();
            $table->foreignId('student_id')->nullable();
            $table->foreignId('classroom_id')->nullable();
            $table->foreignId('staff_id')->nullable();
            $table->string('acc_no')->nullable();
            $table->string('book_user_type')->nullable();
            $table->date('date_at')->nullable();
            $table->date('damage_lost_date_at')->nullable();
            $table->text('reason')->nullable();
            $table->string('status')->default(Status::ACTIVE->value);
            $table->string('book_type_status')->nullable();
            $table->text('damage_lost_note')->nullable();
            $table->decimal('price')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_acc_nos');
    }
};
