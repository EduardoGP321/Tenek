<?php

namespace App\Filament\Admin\Resources\TnkCervezas\Schemas;

use Filament\Infolists\Components\ColorEntry;
use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class TnkCervezaInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
           ->components([
                Section::make('Ficha Técnica de Cerveza')
                    ->columns(3)
                    ->schema([
                        ImageEntry::make('imagen_botella')
                            ->label('Envase')
                            ->disk('public')
                            ->height(120),

                        ImageEntry::make('logo_certificacion')
                            ->label('Medalla / Premio')
                            ->disk('public')
                            ->height(80)
                            ->placeholder('Sin galardones registrados'),

                        ColorEntry::make('color_hex')
                            ->label('Color de Marca'),

                        TextEntry::make('nombre')
                            ->label('Nombre')
                            ->weight('bold'),

                        TextEntry::make('estilo')
                            ->label('Estilo'),

                        TextEntry::make('tipo')
                            ->label('Disponibilidad')
                            ->badge(),

                        TextEntry::make('contenido_alcholico')
                            ->label('Alcohol (ABV)')
                            ->formatStateUsing(fn ($state) => $state . '%'),

                        TextEntry::make('amargor')
                            ->label('Amargor')
                            ->suffix(' IBU'),

                        TextEntry::make('color_cerveza')
                            ->label('Color SRM')
                            ->suffix(' SRM')
                            ->placeholder('N/D'),

                        TextEntry::make('descripcion')
                            ->label('Nota de Cata')
                            ->columnSpanFull(),

                        TextEntry::make('maridaje')
                            ->label('Maridaje Sugerido')
                            ->columnSpanFull(),

                        TextEntry::make('presentaciones')
                            ->label('Presentaciones')
                            ->badge()
                            ->columnSpanFull(),

                        IconEntry::make('is_active')
                            ->label('Activo en Menú')
                            ->boolean(),

                        TextEntry::make('orden')
                            ->label('Prioridad de Orden'),

                        TextEntry::make('created_at')
                            ->label('Fecha de Creación')
                            ->dateTime('d/m/Y H:i'),
                    ]),
            ])
            ->columns(1);
    }
}
