<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Pengajuan extends Model
{
    protected $guarded = ['id'];

    // Mengambil data pemohon (bisa RumahIbadah atau LembagaKeagamaan)
    public function pemohon(): MorphTo
    {
        return $this->morphTo();
    }

    // Satu pengajuan memiliki satu LPJ
    public function lpj(): HasOne
    {
        return $this->hasOne(Lpj::class);
    }
}