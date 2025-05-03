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
        Schema::create('visitor_enquiry_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('visitor_enquiry_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('title');
            $table->date('activity_date')->nullable();
            $table->date('follow_date')->nullable();
            $table->string('status')->default(Status::ACTIVE);
            $table->foreignId('created_by')->nullable()->constrained('users', 'id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('visitor_enquiry_details', function (Blueprint $table) {
            $table->dropForeign(['visitor_enquiry_id']);
            $table->dropForeign(['created_by']);
            $table->dropIfExists('visitor_enquiry_details');
        });
    }
};
