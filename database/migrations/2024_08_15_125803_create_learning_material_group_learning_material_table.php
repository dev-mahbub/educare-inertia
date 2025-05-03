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
        Schema::create('learning_material_group_learning_material', function (Blueprint $table) {
            $table->foreignId('learning_material_group_id')->constrained('learning_material_groups', 'id')->onDelete('cascade')->name('fk_learning_material_group_id');
            $table->foreignId('learning_material_id')->constrained('learning_materials', 'id')->onDelete('cascade')->name('fk_learning_material_id');
            $table->boolean('is_shared')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('learning_material_group_learning_material');
    }
};
