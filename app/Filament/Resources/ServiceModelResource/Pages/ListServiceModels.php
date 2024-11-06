<?php

namespace App\Filament\Resources\ServiceModelResource\Pages;

use App\Filament\Resources\ServiceModelResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListServiceModels extends ListRecords
{
    protected static string $resource = ServiceModelResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
