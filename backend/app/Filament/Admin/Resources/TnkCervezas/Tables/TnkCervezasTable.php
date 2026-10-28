<?php

namespace App\Filament\Admin\Resources\TnkCervezas\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ColorColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class TnkCervezasTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->reorderable('orden')
            ->defaultSort('orden', 'asc')
            ->columns([
                ImageColumn::make('imagen_botella')
                    ->label('Envase')
                    ->disk('public')
                    ->height(50),

                TextColumn::make('nombre')
                    ->label('Cerveza')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->description(fn($record) => $record->estilo),

                TextColumn::make('tipo')
                    ->label('Disponibilidad')
                    
                    ->badge()
                    ->sortable(),

                TextColumn::make('contenido_alcholico')
                    ->label('ABV')
                    ->formatStateUsing(fn($state) => $state . '%')
                    ->sortable(),

                TextColumn::make('amargor')
                    ->label('IBU')
                    ->suffix(' IBU')
                    ->sortable(),

                ColorColumn::make('color_hex')
                    ->label('Tono')
                    ->copyable(),

                ToggleColumn::make('is_active')
                    ->label('Visible')
                    ->sortable(),

                TextColumn::make('orden')
                    ->label('Orden')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('updated_at')
                    ->label('Actualizado')
                    ->dateTime('d/m/Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('tipo')
                    ->label('Disponibilidad')
                    ->options([
                        'linea'     => 'Línea Regular (Todo el año)',
                        'temporada' => 'Edición de Temporada',
                        'especial'  => 'Lote Especial / Limitada',
                    ]),

                TernaryFilter::make('is_active')
                    ->label('Disponibilidad')
                    ->trueLabel('Solo Activas')
                    ->falseLabel('Ocultas'),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
