<?php

namespace App\Filament\Admin\Resources\TnkExperiencias;

use App\Filament\Admin\Resources\TnkExperiencias\Pages\CreateTnkExperiencia;
use App\Filament\Admin\Resources\TnkExperiencias\Pages\EditTnkExperiencia;
use App\Filament\Admin\Resources\TnkExperiencias\Pages\ListTnkExperiencias;
use App\Filament\Admin\Resources\TnkExperiencias\Pages\ViewTnkExperiencia;
use App\Filament\Admin\Resources\TnkExperiencias\Schemas\TnkExperienciaForm;
use App\Filament\Admin\Resources\TnkExperiencias\Schemas\TnkExperienciaInfolist;
use App\Filament\Admin\Resources\TnkExperiencias\Tables\TnkExperienciasTable;
use App\Models\TnkExperiencia;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class TnkExperienciaResource extends Resource
{
    protected static ?string $model = TnkExperiencia::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-camera';

    protected static ?int $navigationSort = 3;

    protected static ?string $navigationLabel = 'Experiencias';
    protected static ?string $modelLabel = 'Experiencia';
    protected static ?string $pluralModelLabel = 'Experiencias';

    public static function form(Schema $schema): Schema
    {
        return TnkExperienciaForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return TnkExperienciaInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return TnkExperienciasTable::configure($table);
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
            'index' => ListTnkExperiencias::route('/'),
            'create' => CreateTnkExperiencia::route('/create'),
            'view' => ViewTnkExperiencia::route('/{record}'),
            'edit' => EditTnkExperiencia::route('/{record}/edit'),
        ];
    }
}
