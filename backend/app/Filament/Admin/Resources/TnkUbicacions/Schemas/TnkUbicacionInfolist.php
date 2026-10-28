<?php

namespace App\Filament\Admin\Resources\TnkUbicacions\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class TnkUbicacionInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('nombre'),
                TextEntry::make('social_link_id')
                    ->numeric()
                    ->placeholder('-'),
                TextEntry::make('direccion')
                    ->columnSpanFull(),
                TextEntry::make('link_mapa')
                    ->columnSpanFull(),
                TextEntry::make('latitud')
                    ->numeric(),
                TextEntry::make('longitud')
                    ->numeric(),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
