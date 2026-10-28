<?php

namespace App\Filament\Admin\Resources\TnkAcademias\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class TnkAcademiasTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('imagen_url')
                    ->label('Portada')
                    ->disk('public')
                    ->square()
                    ->defaultImageUrl(url('/images/placeholder-academia.jpg')),

                TextColumn::make('titulo')
                    ->label('Título')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->description(fn($record) => $record->slug),

                TextColumn::make('tipo')
                    ->label('Tipo')
                    ->badge()
                    ->colors([
                        'primary' => 'consumidor',
                        'warning' => 'distribuidor',
                    ])
                    ->formatStateUsing(fn(string $state): string => ucfirst($state))
                    ->sortable(),

                ToggleColumn::make('is_published')
                    ->label('Publicado')
                    ->sortable(),

                TextColumn::make('updated_at')
                    ->label('Última Edición')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('tipo')
                    ->label('Tipo de Publicación')
                    ->options([
                        'consumidor' => 'Para Consumidores',
                        'distribuidor'   => 'Para distribuidores'
                    ]),

                TernaryFilter::make('is_published')
                    ->label('Estado de Publicación')
                    ->placeholder('Todos')
                    ->trueLabel('Solo Publicados')
                    ->falseLabel('Borradores'),
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
