<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RumahIbadah;
use App\Models\LembagaKeagamaan; // Tambahkan ini

class PemohonDataController extends Controller
{
    public function index()
    {
        $rumahIbadah = RumahIbadah::where('user_id', auth()->id())->first();
        $lembaga = LembagaKeagamaan::where('user_id', auth()->id())->first();

        // Tentukan tipe pemohon yang aktif saat halaman dimuat
        $tipePemohon = $lembaga ? 'lembaga' : 'rumah_ibadah';

        return Inertia::render('Pemohon/ProfilData', [
            'rumahIbadah' => $rumahIbadah,
            'lembaga' => $lembaga,
            'tipePemohonAktif' => $tipePemohon
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'tipe_pemohon' => 'required|in:rumah_ibadah,lembaga',
        ]);

        if ($request->tipe_pemohon === 'rumah_ibadah') {
            $validated = $request->validate([
                'nama_rumah_ibadah' => 'required|string|max:255',
                'jenis_agama' => 'required|string',
                'alamat' => 'required|string',
                'kecamatan' => 'required|string',
                'desa_kelurahan' => 'required|string',
                'status_kepemilikan' => 'required|string',
                'kapasitas_jamaah' => 'required|numeric',
                'kondisi_bangunan' => 'required|string',
                'status_tanah' => 'required|string',
                'nama_pengurus' => 'required|string',
                'nama_bank' => 'required|string',
                'nomor_rekening' => 'required|string',
                'nama_rekening' => 'required|string',
            ]);
            
            $validated['user_id'] = auth()->id();
            RumahIbadah::updateOrCreate(['user_id' => auth()->id()], $validated);
            
            // Hapus data lembaga jika ada, agar satu akun hanya punya satu identitas
            LembagaKeagamaan::where('user_id', auth()->id())->delete();
            
        } else {
            $validated = $request->validate([
                'nama_lembaga' => 'required|string|max:255',
                'jenis_agama' => 'required|string',
                'alamat' => 'required|string',
                'kecamatan' => 'required|string',
                'desa_kelurahan' => 'required|string',
                'nomor_sk_pendirian' => 'required|string',
                'nama_pimpinan' => 'required|string',
                'nama_bank' => 'required|string',
                'nomor_rekening' => 'required|string',
                'nama_rekening' => 'required|string',
            ]);
            
            $validated['user_id'] = auth()->id();
            LembagaKeagamaan::updateOrCreate(['user_id' => auth()->id()], $validated);
            
            // Hapus data rumah ibadah jika ada
            RumahIbadah::where('user_id', auth()->id())->delete();
        }

        return redirect()->back();
    }
}