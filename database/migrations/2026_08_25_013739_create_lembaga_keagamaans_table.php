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
        Schema::create('lembaga_keagamaans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('nama_lembaga');
            $table->string('jenis_kelompok');
            $table->string('nama_pengurus');
            $table->string('legalitas');
            $table->text('alamat');
            $table->string('kontak');
            $table->string('nama_bank');
            $table->string('nomor_rekening');
            $table->string('nama_rekening');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lembaga_keagamaans');
    }
};
