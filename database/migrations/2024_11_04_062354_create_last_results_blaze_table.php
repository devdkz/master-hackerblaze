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
        Schema::create('last_results_double_blaze', function (Blueprint $table) {
            $table->id();
            $table->integer('color');
            $table->integer('roll');
            $table->integer('room_id')->nullable();
            $table->string('id_blaze')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('last_results_blaze');
    }
};
