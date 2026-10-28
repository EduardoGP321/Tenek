<?php

namespace App\Filament\Admin\Resources\TnkExperiencias\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class TnkExperienciaInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Experiencia Registrada')
                    ->schema([
                        ImageEntry::make('imagen_url')
                            ->label('Fotografía')
                            ->disk('public')
                            ->height(260),

                        TextEntry::make('descripcion')
                            ->label('Descripción'),

                        TextEntry::make('created_at')
                            ->label('Fecha de Creación')
                            ->dateTime('d/m/Y H:i'),

                        TextEntry::make('updated_at')
                            ->label('Última Actualización')
                            ->dateTime('d/m/Y H:i'),
                    ]),
            ])->columns(1);
    }
}
