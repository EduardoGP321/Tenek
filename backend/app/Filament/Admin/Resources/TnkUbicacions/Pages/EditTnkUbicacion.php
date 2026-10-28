<?php

namespace App\Filament\Admin\Resources\TnkUbicacions\Pages;

use App\Filament\Admin\Resources\TnkUbicacions\TnkUbicacionResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditTnkUbicacion extends EditRecord
{
    protected static string $resource = TnkUbicacionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
