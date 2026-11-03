<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Pengajuan;
use App\Models\Lpj;

class LpjPemohonController extends Controller
{
    /**
     * Menampilkan form upload LPJ
     */
    public function create($id)
    {
        // Cari data pengajuan berdasarkan ID
        $pengajuan = Pengajuan::findOrFail($id);

        // Pastikan statusnya pencairan (dana sudah cair)
        if ($pengajuan->status_pengajuan !== 'pencairan') {
            return redirect()->route('pengajuan.index')->with('error', 'Status pengajuan belum tahap pencairan.');
        }

        return Inertia::render('Pemohon/UploadLpj', [
            'pengajuan' => $pengajuan
        ]);
    }

    /**
     * Menyimpan dokumen LPJ
     */
    public function store(Request $request, $id)
    {
        $request->validate([
            'file_lpj' => 'required|file|mimes:pdf|max:10240', // Maks 10MB
        ]);

        $pengajuan = Pengajuan::findOrFail($id);

        // Simpan file LPJ ke storage
        $path = $request->file('file_lpj')->store('dokumen-lpj', 'public');

        // Gunakan updateOrCreate agar jika pemohon mengunggah ulang (revisi), 
        // data yang lama akan ditimpa/diperbarui.
        Lpj::updateOrCreate(
            ['pengajuan_id' => $pengajuan->id],
            [
                'file_lpj' => $path,
                'tanggal_lapor' => now(),
                'status_lpj' => 'menunggu_pemeriksaan',
            ]
        );

        return redirect()->route('pengajuan.index');
    }
}