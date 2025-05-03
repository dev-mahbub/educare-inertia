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
        Schema::table('service_orders', function (Blueprint $table) {
            $table->boolean('is_gst_aplicable')->default(false);
            $table->decimal('gst_value', 8, 2)->default(0);
            $table->decimal('gst_amount', 8, 2)->default(0);
            $table->string('service')->nullable();
            $table->longText('note')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('service_orders', function (Blueprint $table) {
            $table->dropColumn(['is_gst_aplicable']);
            $table->dropColumn(['gst_value']);
            $table->dropColumn(['gst_amount']);
            $table->dropColumn(['service']);
            $table->dropColumn(['note']);
        });
    }
};
