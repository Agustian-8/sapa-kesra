<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;

// PERBAIKAN: Menambahkan 'implements FilamentUser' untuk keamanan admin
class User extends Authenticatable implements FilamentUser
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'status_akun',
        'dokumen_legalitas',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function rumahIbadahs()
    {
        return $this->hasMany(RumahIbadah::class);
    }

    public function lembagaKeagamaans()
    {
        return $this->hasMany(LembagaKeagamaan::class);
    }

    /**
     * KUNCI KEAMANAN FILAMENT
     * Hanya role tertentu dengan status 'aktif' yang boleh masuk ke panel /admin.
     */
    public function canAccessPanel(Panel $panel): bool
    {
        return in_array($this->role, ['admin', 'verifikator', 'pimpinan']) 
            && $this->status_akun === 'aktif';
    }
}