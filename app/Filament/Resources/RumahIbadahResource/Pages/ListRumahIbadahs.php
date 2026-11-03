<?php

namespace App\Filament\Resources\RumahIbadahResource\Pages;

use App\Filament\Resources\RumahIbadahResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListRumahIbadahs extends ListRecords
{
    protected static string $resource = RumahIbadahResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
