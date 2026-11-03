<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class RumahIbadah extends Model
{
    protected $guarded = ['id']; // Mengizinkan semua kolom diisi kecuali ID

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Rumah ibadah bisa memiliki banyak pengajuan bantuan
    public function pengajuans(): MorphMany
    {
        return $this->morphMany(Pengajuan::class, 'pemohon');
    }
}