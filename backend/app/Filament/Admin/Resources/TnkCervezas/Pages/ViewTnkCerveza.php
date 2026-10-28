<?php

namespace App\Filament\Admin\Resources\TnkCervezas\Pages;

use App\Filament\Admin\Resources\TnkCervezas\TnkCervezaResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewTnkCerveza extends ViewRecord
{
    protected static string $resource = TnkCervezaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
