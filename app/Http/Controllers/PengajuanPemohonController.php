<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RumahIbadah;
use App\Models\LembagaKeagamaan;

class PengajuanPemohonController extends Controller
{
    // Fungsi bantuan untuk mencari siapa pemohonnya
    private function getPemohonAktif()
    {
        $pemohon = RumahIbadah::where('user_id', auth()->id())->first();
        if (!$pemohon) {
            $pemohon = LembagaKeagamaan::where('user_id', auth()->id())->first();
        }
        return $pemohon;
    }

    public function index()
    {
        $pemohon = $this->getPemohonAktif();
        $pengajuans = $pemohon ? $pemohon->pengajuans()->orderBy('created_at', 'desc')->get() : [];

        return Inertia::render('Pemohon/RiwayatPengajuan', [
            'pengajuans' => $pengajuans
        ]);
    }

    public function create()
    {
        $pemohon = $this->getPemohonAktif();

        if (!$pemohon) {
            return redirect()->route('profil-data.index');
        }

        return Inertia::render('Pemohon/BuatPengajuan', [
            'pemohon' => $pemohon,
            // Kita kirimkan nama_tampil ke React agar dinamis
            'nama_tampil' => $pemohon instanceof RumahIbadah ? $pemohon->nama_rumah_ibadah : $pemohon->nama_lembaga
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul_proposal' => 'required|string|max:255',
            'kategori_bantuan' => 'required|string',
            'nominal_pengajuan' => 'required|numeric|min:100000',
            'file_proposal' => 'required|file|mimes:pdf|max:10240',
        ]);

        $pemohon = $this->getPemohonAktif();
        if (!$pemohon) abort(403, 'Profil belum diisi');

        $path = $request->file('file_proposal')->store('proposal-bantuan', 'public');

        $pemohon->pengajuans()->create([
            'judul_proposal' => $request->judul_proposal,
            'kategori_bantuan' => $request->kategori_bantuan,
            'nominal_pengajuan' => $request->nominal_pengajuan,
            'file_proposal' => $path,
            'status_pengajuan' => 'usulan',
            'tahun_anggaran' => date('Y'),
        ]);

        return redirect()->route('pengajuan.index');
    }
}