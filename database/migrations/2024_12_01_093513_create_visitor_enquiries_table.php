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
        Schema::create('visitor_enquiries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('visitor_enquiry_type_id')->nullable()->references('id')->on('visitor_enquiry_types')->constrained()->onDelete('set null');
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('academic_year_id')->nullable()->constrained();
            $table->string('name');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->date('enquiry_date')->nullable();
            $table->time('in_time')->nullable();
            $table->date('appointment_date')->nullable();
            $table->time('appointment_time')->nullable();
            $table->string('person_to_meet')->nullable();
            $table->string('purpose_of_visit')->nullable();
            $table->string('vehicle_no')->nullable();
            $table->longText('enquiry_message')->nullable();
            $table->string('address')->nullable();
            $table->string('visitor_photo')->nullable();
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
        Schema::table('visitor_enquiries', function (Blueprint $table) {
            $table->dropForeign(['visitor_enquiry_type_id']);
            $table->dropForeign(['school_id']);
            $table->dropForeign(['academic_year_id']);
            $table->dropForeign(['created_by']);
        });
    }
};
