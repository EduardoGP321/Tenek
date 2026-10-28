<?php

namespace App\Filament\Admin\Resources\TnkExperiencias\Pages;

use App\Filament\Admin\Resources\TnkExperiencias\TnkExperienciaResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditTnkExperiencia extends EditRecord
{
    protected static string $resource = TnkExperienciaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
