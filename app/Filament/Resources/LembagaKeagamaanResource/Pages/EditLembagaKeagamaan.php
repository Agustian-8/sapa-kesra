<?php

namespace App\Filament\Resources\LembagaKeagamaanResource\Pages;

use App\Filament\Resources\LembagaKeagamaanResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditLembagaKeagamaan extends EditRecord
{
    protected static string $resource = LembagaKeagamaanResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
