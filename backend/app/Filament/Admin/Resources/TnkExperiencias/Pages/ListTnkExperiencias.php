<?php

namespace App\Filament\Admin\Resources\TnkExperiencias\Pages;

use App\Filament\Admin\Resources\TnkExperiencias\TnkExperienciaResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListTnkExperiencias extends ListRecords
{
    protected static string $resource = TnkExperienciaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
