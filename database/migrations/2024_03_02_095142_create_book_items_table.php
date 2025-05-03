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
        Schema::create('book_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable();
            $table->foreignId('book_purchase_id')->nullable();
            $table->foreignId('category_id')->nullable();
            $table->foreignId('class_name_id')->nullable();
            $table->foreignId('subject_id')->nullable();
            $table->string('book_title')->nullable();
            $table->string('author')->nullable();
            $table->decimal('quantity')->nullable();
            $table->decimal('price')->nullable();
            $table->decimal('item_total_price')->nullable();
            $table->string('type')->nullable();
            // in house
            $table->foreignId('type_id')->nullable();
            $table->foreignId('library_vendor_id')->nullable();
            $table->string('author_two')->nullable();
            $table->string('author_three')->nullable();
            $table->string('publish_place')->nullable();
            $table->string('classification_no')->nullable();
            $table->date('purchasing_date_at')->nullable();
            $table->string('publisher_name')->nullable();
            $table->string('publish_year')->nullable();
            $table->string('isbn_number')->nullable();
            $table->string('volume')->nullable();
            $table->string('edition')->nullable();
            $table->string('no_of_pages')->nullable();
            $table->string('language')->nullable();
            $table->date('book_entry_date_at')->nullable();
            $table->text('description')->nullable();
            $table->string('bill_no')->nullable();
            $table->string('barcode')->nullable();
            $table->boolean('is_allocate_book_location')->nullable();
            $table->string('status')->default(Status::ACTIVE->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_items');
    }
};
