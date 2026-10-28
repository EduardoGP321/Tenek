<?php

namespace App\Filament\Admin\Resources\TnkUbicacions\Tables;

use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Str;
class TnkUbicacionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                // 1. Logo circular
                ImageColumn::make('logo_establecimiento')
                    ->label('Logo')
                    ->disk('public')
                    ->circular()
                    ->defaultImageUrl(url('/images/placeholder-restaurant.png'))
                    ->size(45),

                // 2. Nombre del Restaurante / Taproom
                TextColumn::make('nombre')
                    ->label('Establecimiento')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->description(fn($record) => Str::limit($record->direccion, 50)),

                // 3. Badges de Plataformas Sociales asignadas
                TextColumn::make('redesSociales.tipo')
                    ->label('Redes')
                    ->badge()
                    ->formatStateUsing(fn(string $state): string => ucfirst($state))
                    ->colors([
                        'danger'  => 'instagram',
                        'info'    => 'facebook',
                        'gray'    => 'tiktok',
                        'primary' => 'x_twitter',
                        'success' => 'sitio_web',
                    ])
                    ->separator(',')
                    ->limitList(3),

                // 4. Coordenadas
                TextColumn::make('coordenadas')
                    ->label('GPS')
                    ->getStateUsing(fn($record) => "{$record->latitud}, {$record->longitud}")
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->fontFamily('mono')
                    ->size('xs'),

                // 5. Fecha de Registro
                TextColumn::make('created_at')
                    ->label('Registrado')
                    ->dateTime('d/m/Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                Action::make('abrir_mapa')
                    ->label('Ver Mapa')
                    ->icon('heroicon-m-map-pin')
                    ->color('gray')
                    ->url(fn($record) => $record->link_mapa)
                    ->openUrlInNewTab(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
