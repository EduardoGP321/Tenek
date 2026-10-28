<?php

namespace App\Filament\Admin\Resources\TnkUbicacions;

use App\Filament\Admin\Resources\TnkUbicacions\Pages\CreateTnkUbicacion;
use App\Filament\Admin\Resources\TnkUbicacions\Pages\EditTnkUbicacion;
use App\Filament\Admin\Resources\TnkUbicacions\Pages\ListTnkUbicacions;
use App\Filament\Admin\Resources\TnkUbicacions\Pages\ViewTnkUbicacion;
use App\Filament\Admin\Resources\TnkUbicacions\Schemas\TnkUbicacionForm;
use App\Filament\Admin\Resources\TnkUbicacions\Schemas\TnkUbicacionInfolist;
use App\Filament\Admin\Resources\TnkUbicacions\Tables\TnkUbicacionsTable;
use App\Models\TnkUbicacion;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class TnkUbicacionResource extends Resource
{
    protected static ?string $model = TnkUbicacion::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-map-pin';

    protected static ?int $navigationSort = 4;

    protected static ?string $navigationLabel = 'Puntos de Venta';
    protected static ?string $modelLabel = 'Punto de Venta';
    protected static ?string $pluralModelLabel = 'Puntos de Venta';

    public static function form(Schema $schema): Schema
    {
        return TnkUbicacionForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return TnkUbicacionInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return TnkUbicacionsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListTnkUbicacions::route('/'),
            'create' => CreateTnkUbicacion::route('/create'),
            'view' => ViewTnkUbicacion::route('/{record}'),
            'edit' => EditTnkUbicacion::route('/{record}/edit'),
        ];
    }
}
