<?php

namespace App\Filament\Admin\Resources\TnkAcademias\Pages;

use App\Filament\Admin\Resources\TnkAcademias\TnkAcademiaResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditTnkAcademia extends EditRecord
{
    protected static string $resource = TnkAcademiaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
