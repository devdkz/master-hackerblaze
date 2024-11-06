<?php

namespace App\Filament\Resources\ServiceModelResource\Pages;

use App\Filament\Resources\ServiceModelResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditServiceModel extends EditRecord
{
    protected static string $resource = ServiceModelResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
