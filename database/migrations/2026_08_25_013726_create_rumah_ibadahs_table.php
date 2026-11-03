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
        Schema::create('rumah_ibadahs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('nama_rumah_ibadah');
            $table->string('jenis_agama');
            $table->text('alamat');
            $table->string('koordinat_lokasi')->nullable();
            $table->string('kecamatan');
            $table->string('desa_kelurahan');
            $table->string('status_kepemilikan');
            $table->year('tahun_berdiri')->nullable();
            $table->integer('kapasitas_jamaah');
            $table->enum('kondisi_bangunan', ['baik', 'rusak_ringan', 'rusak_berat']);
            $table->string('status_tanah');
            $table->string('nama_pengurus');
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
        Schema::dropIfExists('rumah_ibadahs');
    }
};
