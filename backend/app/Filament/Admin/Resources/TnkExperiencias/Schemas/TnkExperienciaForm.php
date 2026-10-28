<?php

namespace App\Filament\Admin\Resources\TnkExperiencias\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class TnkExperienciaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Detalle de la Experiencia Tének')
                    ->columns(1)
                    ->schema([
                        FileUpload::make('imagen_url')
                            ->label('Fotografía de la Experiencia')
                            ->helperText('Sube una imagen horizontal de alta calidad (JPG o WebP)')
                            ->image()
                            ->disk('public')
                            ->directory('experiencias')
                            ->imageEditor()
                            ->maxSize(4096) // 4MB
                            ->required()
                            ->optimize('webp', 85),

                        Textarea::make('descripcion')
                            ->label('Descripción o Reseña de la Experiencia')
                            ->placeholder('Describe la vivencia cervecera, el ambiente, recorrido en planta o evento...')
                            ->rows(4)
                            ->required(),
                    ]),
            ])->columns(1);
    }
}
