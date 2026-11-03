<?php

namespace App\Filament\Resources\LembagaKeagamaanResource\Pages;

use App\Filament\Resources\LembagaKeagamaanResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListLembagaKeagamaans extends ListRecords
{
    protected static string $resource = LembagaKeagamaanResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
