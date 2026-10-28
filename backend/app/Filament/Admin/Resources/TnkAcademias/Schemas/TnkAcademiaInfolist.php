<?php

namespace App\Filament\Admin\Resources\TnkAcademias\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class TnkAcademiaInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Detalle del Registro')
                    ->columns(2)
                    ->schema([
                        ImageEntry::make('imagen_url')
                            ->label('Portada')
                            ->disk('public')
                            ->columnSpanFull(),

                        TextEntry::make('titulo')
                            ->label('Título')
                            ->weight('bold'),

                        TextEntry::make('tipo')
                            ->label('Tipo')
                            ->badge(),

                        TextEntry::make('slug')
                            ->label('Slug')
                            ->copyable(),

                        IconEntry::make('is_published')
                            ->label('Publicado')
                            ->boolean(),

                        TextEntry::make('extracto')
                            ->label('Resumen')
                            ->placeholder('Sin extracto definido')
                            ->columnSpanFull(),

                        TextEntry::make('contenido')
                            ->label('Contenido')
                            ->html()
                            ->columnSpanFull(),

                        TextEntry::make('created_at')
                            ->label('Creado')
                            ->dateTime('d/m/Y H:i'),

                        TextEntry::make('updated_at')
                            ->label('Modificado')
                            ->dateTime('d/m/Y H:i'),
                    ]),
            ])->columns(1);
    }
}
