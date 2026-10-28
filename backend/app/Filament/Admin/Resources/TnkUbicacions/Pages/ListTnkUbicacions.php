<?php

namespace App\Filament\Admin\Resources\TnkUbicacions\Pages;

use App\Filament\Admin\Resources\TnkUbicacions\TnkUbicacionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListTnkUbicacions extends ListRecords
{
    protected static string $resource = TnkUbicacionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
