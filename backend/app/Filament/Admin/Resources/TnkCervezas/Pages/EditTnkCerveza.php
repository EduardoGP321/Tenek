<?php

namespace App\Filament\Admin\Resources\TnkCervezas\Pages;

use App\Filament\Admin\Resources\TnkCervezas\TnkCervezaResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditTnkCerveza extends EditRecord
{
    protected static string $resource = TnkCervezaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
