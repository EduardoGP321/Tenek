<?php

namespace App\Filament\Admin\Resources\TnkAcademias;

use App\Filament\Admin\Resources\TnkAcademias\Pages\CreateTnkAcademia;
use App\Filament\Admin\Resources\TnkAcademias\Pages\EditTnkAcademia;
use App\Filament\Admin\Resources\TnkAcademias\Pages\ListTnkAcademias;
use App\Filament\Admin\Resources\TnkAcademias\Pages\ViewTnkAcademia;
use App\Filament\Admin\Resources\TnkAcademias\Schemas\TnkAcademiaForm;
use App\Filament\Admin\Resources\TnkAcademias\Schemas\TnkAcademiaInfolist;
use App\Filament\Admin\Resources\TnkAcademias\Tables\TnkAcademiasTable;
use App\Models\TnkAcademia;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class TnkAcademiaResource extends Resource
{
    protected static ?string $model = TnkAcademia::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-academic-cap';

    protected static ?int $navigationSort = 2;

    protected static ?string $navigationLabel = 'Academia Cervecera';
    protected static ?string $modelLabel = 'Publicación de Academia';
    protected static ?string $pluralModelLabel = 'Academia Cervecera';

    public static function form(Schema $schema): Schema
    {
        return TnkAcademiaForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return TnkAcademiaInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return TnkAcademiasTable::configure($table);
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
            'index' => ListTnkAcademias::route('/'),
            'create' => CreateTnkAcademia::route('/create'),
            'view' => ViewTnkAcademia::route('/{record}'),
            'edit' => EditTnkAcademia::route('/{record}/edit'),
        ];
    }
}
