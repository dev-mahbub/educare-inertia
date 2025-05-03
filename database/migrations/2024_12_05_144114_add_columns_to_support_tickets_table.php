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
        Schema::table('support_tickets', function (Blueprint $table) {
            $table->date('follow_up_date')->nullable();
            $table->string('parent_name')->nullable();
            $table->string('student_name')->nullable();
            $table->string('parent_phone')->nullable();
            $table->string('request_type')->nullable();
            $table->date('request_date')->nullable();
            $table->text('solution_note')->nullable();
            $table->text('previous_solution_note')->nullable();
            $table->string('solution_status')->default('Pending');
            $table->foreignId('student_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('assigned_to')->nullable()->constrained('staff', 'id');
            $table->foreignId('classroom_id')->nullable()->constrained();
            $table->foreignId('created_by')->nullable()->constrained('users', 'id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('support_tickets', function (Blueprint $table) {
            $table->dropForeign(['student_id']);
            $table->dropForeign(['assigned_to']);
            $table->dropForeign(['classroom_id']);
            $table->dropForeign(['created_by']);
            $table->dropColumn([
                'follow_up_date',
                'parent_name',
                'student_name',
                'parent_phone',
                'request_type',
                'request_date',
                'solution_note',
                'previous_solution_note',
                'solution_status',
                'student_id',
                'assigned_to',
                'classroom_id',
                'created_by',
            ]);
        });
    }
};
