<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lpjs', function (Blueprint $table) {
            $table->id();
            
            // Relasi ke tabel pengajuans
            $table->foreignId('pengajuan_id')->constrained('pengajuans')->cascadeOnDelete();
            
            $table->string('file_lpj'); // Path file dokumen LPJ
            $table->date('tanggal_lapor');
            
            $table->enum('status_lpj', ['menunggu_pemeriksaan', 'disetujui', 'revisi'])->default('menunggu_pemeriksaan');
            $table->text('catatan_evaluasi')->nullable();
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lpjs');
    }
};