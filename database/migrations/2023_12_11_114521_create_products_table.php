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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->nullable()->constrained();
            $table->foreignId('category_id')->nullable();
            $table->unsignedBigInteger('sub_category_id')->nullable();
            $table->unsignedBigInteger('uom_id')->nullable();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('type')->nullable();
            $table->boolean('is_opening_stock')->nullable()->default(0);
            $table->bigInteger('opening_stock')->nullable();
            $table->integer('rate_per_product')->nullable();
            $table->integer('gst_tax')->nullable();
            $table->string('product_code')->nullable();
            $table->string('product_size')->nullable();
            $table->integer('amount')->nullable();
            $table->string('status')->default('Active');
            $table->date('purchase_date_at')->nullable()->default(now());
            $table->text('note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
