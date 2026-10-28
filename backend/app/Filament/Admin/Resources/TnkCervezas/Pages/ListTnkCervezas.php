<?php

namespace App\Filament\Admin\Resources\TnkCervezas\Pages;

use App\Filament\Admin\Resources\TnkCervezas\TnkCervezaResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListTnkCervezas extends ListRecords
{
    protected static string $resource = TnkCervezaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
