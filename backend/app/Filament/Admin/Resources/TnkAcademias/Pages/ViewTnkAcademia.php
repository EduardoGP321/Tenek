<?php

namespace App\Filament\Admin\Resources\TnkAcademias\Pages;

use App\Filament\Admin\Resources\TnkAcademias\TnkAcademiaResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewTnkAcademia extends ViewRecord
{
    protected static string $resource = TnkAcademiaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
