<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PemohonDataController;
use App\Http\Controllers\PengajuanPemohonController;
use App\Http\Controllers\LpjPemohonController;

// 1. Halaman Landing Page (Beranda Publik)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

// 2. Halaman Dashboard Khusus Pemohon (Masyarakat yang sudah login)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// 3. Rute Manajemen Profil Bawaan Breeze
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // RUTE BARU UNTUK PROFIL DATA PEMOHON
    Route::get('/profil-data', [PemohonDataController::class, 'index'])->name('profil-data.index');
    Route::post('/profil-data', [PemohonDataController::class, 'store'])->name('profil-data.store');

    // RUTE RIWAYAT
    Route::get('/riwayat-pengajuan', [PengajuanPemohonController::class, 'index'])->name('pengajuan.index');

    // RUTE BARU UNTUK PENGAJUAN
    Route::get('/buat-pengajuan', [PengajuanPemohonController::class, 'create'])->name('pengajuan.create');
    Route::post('/buat-pengajuan', [PengajuanPemohonController::class, 'store'])->name('pengajuan.store');

    // RUTE BARU UNTUK UPLOAD LPJ
    Route::get('/pengajuan/{id}/lpj', [LpjPemohonController::class, 'create'])->name('lpj.create');
    Route::post('/pengajuan/{id}/lpj', [LpjPemohonController::class, 'store'])->name('lpj.store');

    });

require __DIR__.'/auth.php';