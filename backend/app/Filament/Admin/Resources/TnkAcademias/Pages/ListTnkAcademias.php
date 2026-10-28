<?php

namespace App\Filament\Admin\Resources\TnkAcademias\Pages;

use App\Filament\Admin\Resources\TnkAcademias\TnkAcademiaResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListTnkAcademias extends ListRecords
{
    protected static string $resource = TnkAcademiaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
