<?php

namespace App\Filament\Admin\Resources\TnkUbicacions\Pages;

use App\Filament\Admin\Resources\TnkUbicacions\TnkUbicacionResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewTnkUbicacion extends ViewRecord
{
    protected static string $resource = TnkUbicacionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
