<?php

namespace App\Filament\Admin\Resources\TnkExperiencias\Pages;

use App\Filament\Admin\Resources\TnkExperiencias\TnkExperienciaResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewTnkExperiencia extends ViewRecord
{
    protected static string $resource = TnkExperienciaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
