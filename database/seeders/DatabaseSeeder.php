<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\RumahIbadah;
use App\Models\Pengajuan;
use App\Models\Lpj;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // ==========================================
        // 1. SEEDER AKUN PENGGUNA (USERS)
        // ==========================================
        
        // Akun Admin Kesra
        User::create([
            'name' => 'Admin Kesra',
            'email' => 'admin.kesra@gmail.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
            'status_akun' => 'aktif',
            'email_verified_at' => now(),
        ]);

        // Akun Verifikator
        User::create([
            'name' => 'Tim Verifikator',
            'email' => 'verifikator.kesra@gmail.com',
            'password' => Hash::make('password123'),
            'role' => 'verifikator',
            'status_akun' => 'aktif',
            'email_verified_at' => now(),
        ]);

        // Akun Pemohon (Masyarakat)
        $userPemohon = User::create([
            'name' => 'Agustian',
            'email' => 'agustian@gmail.com',
            'password' => Hash::make('password123'),
            'role' => 'pemohon',
            'status_akun' => 'aktif', // Langsung aktif agar mudah testing
            'email_verified_at' => now(),
        ]);


        // ==========================================
        // 2. SEEDER PROFIL DATA (RUMAH IBADAH)
        // ==========================================
        
        $rumahIbadah = RumahIbadah::create([
            'user_id' => $userPemohon->id,
            'nama_rumah_ibadah' => 'Masjid Uswatun Hasanah',
            'jenis_agama' => 'Islam',
            'alamat' => 'Jl. Juang, Nanga Pinoh',
            'kecamatan' => 'Nanga Pinoh',
            'desa_kelurahan' => 'Tanjung Niaga',
            'status_kepemilikan' => 'Wakaf',
            'tahun_berdiri' => '1995',
            'kapasitas_jamaah' => 500,
            'kondisi_bangunan' => 'rusak_ringan',
            'status_tanah' => 'Sertifikat Wakaf',
            'nama_pengurus' => 'H. Budi Santoso',
            'nama_bank' => 'Bank Kalbar',
            'nomor_rekening' => '1234567890',
            'nama_rekening' => 'Masjid Uswatun Hasanah',
        ]);


        // ==========================================
        // 3. SEEDER PENGAJUAN BANTUAN
        // ==========================================
        
        // Kita buat pengajuannya berstatus 'pencairan' agar fitur LPJ langsung bisa dites
        $pengajuan = $rumahIbadah->pengajuans()->create([
            'judul_proposal' => 'Permohonan Bantuan Renovasi Atap dan Tempat Wudu',
            'kategori_bantuan' => 'pembangunan',
            'nominal_pengajuan' => 35000000,
            'file_proposal' => 'dummy/proposal_dummy.pdf', // File ini hanya teks di database
            'status_pengajuan' => 'pencairan', 
            'nominal_disetujui' => 35000000,
            'catatan_verifikator' => 'Berkas lengkap, disetujui untuk dicairkan pada triwulan ini.',
            'tahun_anggaran' => date('Y'),
        ]);


        // ==========================================
        // 4. SEEDER LAPORAN PERTANGGUNGJAWABAN (LPJ)
        // ==========================================
        
        Lpj::create([
            'pengajuan_id' => $pengajuan->id,
            'file_lpj' => 'dummy/lpj_dummy.pdf', // File ini hanya teks di database
            'tanggal_lapor' => now(),
            'status_lpj' => 'menunggu_pemeriksaan',
            'catatan_evaluasi' => null,
        ]);
    }
}