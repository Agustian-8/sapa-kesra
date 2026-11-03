<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pengajuans', function (Blueprint $table) {
            $table->id();
            
            // Polymorphic relation: otomatis membuat kolom pemohon_type dan pemohon_id
            $table->morphs('pemohon'); 
            
            // PERBAIKAN: Ubah enum menjadi string agar tidak bentrok dengan pilihan di form
            $table->string('kategori_bantuan'); 
            
            $table->bigInteger('nominal_pengajuan'); // Menggunakan bigInteger karena Rupiah nominalnya besar
            $table->string('judul_proposal');
            $table->string('file_proposal'); // Path file PDF proposal
            
            // PERBAIKAN: Ubah enum menjadi string
            $table->string('status_pengajuan')->default('usulan');
            
            $table->bigInteger('nominal_disetujui')->nullable();
            $table->text('catatan_verifikator')->nullable();
            $table->year('tahun_anggaran');
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pengajuans');
    }
};