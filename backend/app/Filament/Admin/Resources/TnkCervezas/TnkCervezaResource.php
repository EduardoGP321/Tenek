<?php

namespace App\Filament\Admin\Resources\TnkCervezas;

use App\Filament\Admin\Resources\TnkCervezas\Pages\CreateTnkCerveza;
use App\Filament\Admin\Resources\TnkCervezas\Pages\EditTnkCerveza;
use App\Filament\Admin\Resources\TnkCervezas\Pages\ListTnkCervezas;
use App\Filament\Admin\Resources\TnkCervezas\Pages\ViewTnkCerveza;
use App\Filament\Admin\Resources\TnkCervezas\Schemas\TnkCervezaForm;
use App\Filament\Admin\Resources\TnkCervezas\Schemas\TnkCervezaInfolist;
use App\Filament\Admin\Resources\TnkCervezas\Tables\TnkCervezasTable;
use App\Models\TnkCerveza;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class TnkCervezaResource extends Resource
{
    protected static ?string $model = TnkCerveza::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-sparkles';

    protected static ?int $navigationSort = 1;

    protected static ?string $navigationLabel = 'Cervezas';
    protected static ?string $modelLabel = 'Cerveza';
    protected static ?string $pluralModelLabel = 'Cervezas';

    public static function form(Schema $schema): Schema
    {
        return TnkCervezaForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return TnkCervezaInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return TnkCervezasTable::configure($table);
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
            'index' => ListTnkCervezas::route('/'),
            'create' => CreateTnkCerveza::route('/create'),
            'view' => ViewTnkCerveza::route('/{record}'),
            'edit' => EditTnkCerveza::route('/{record}/edit'),
        ];
    }
}
