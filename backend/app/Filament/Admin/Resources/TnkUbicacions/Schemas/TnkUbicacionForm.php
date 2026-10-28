<?php

namespace App\Filament\Admin\Resources\TnkUbicacions\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class TnkUbicacionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Información del Punto de Venta')
                    ->columns(2)
                    ->schema([
                        TextInput::make('nombre')
                            ->label('Nombre del Lugar / Establecimiento')
                            ->placeholder('Ej. Taproom Tének Centro, Beer House...')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),

                        Textarea::make('direccion')
                            ->label('Dirección Completa')
                            ->placeholder('Calle, número, colonia, código postal y municipio...')
                            ->rows(2)
                            ->required()
                            ->columnSpanFull(),

                        FileUpload::make('logo_establecimiento')
                            ->label('Logo / Imagen del Establecimiento')
                            ->image()
                            ->disk('public')
                            ->optimize('webp', 85)
                            ->directory('punto_ventas/logos')
                            ->imageEditor()
                            ->maxSize(3072)
                            ->columnSpanFull(),
                    ]),

                // Sección dinámica para N redes sociales
                Section::make('Redes Sociales del Establecimiento')
                    ->description('Agrega todas las plataformas oficiales del lugar (Instagram, TikTok, Facebook, etc.)')
                    ->schema([
                        Repeater::make('redesSociales')
                            ->relationship('redesSociales')
                            ->schema([
                                Select::make('tipo')
                                    ->label('Plataforma')
                                    ->options([
                                        'instagram'  => 'Instagram',
                                        'facebook'   => 'Facebook',
                                        'tiktok'     => 'TikTok',
                                        'x_twitter'  => 'X / Twitter',
                                        'sitio_web'  => 'Sitio Web / Menú Digital',
                                    ])
                                    ->default('instagram')
                                    ->required()
                                    ->native(false),

                                TextInput::make('link')
                                    ->label('Enlace URL')
                                    ->placeholder('https://instagram.com/mi_restaurante')
                                    ->url()
                                    ->required()
                                    ->maxLength(255),
                            ])
                            ->columns(2)
                            ->addActionLabel('+ Agregar otra red social')
                            ->collapsible()
                            ->itemLabel(
                                fn(array $state): ?string =>
                                !empty($state['tipo'])
                                    ? ucfirst($state['tipo']) . (!empty($state['link']) ? " — {$state['link']}" : '')
                                    : null
                            )
                            ->defaultItems(1),
                    ]),

                Section::make('Geolocalización y Mapas')
                    ->columns(3)
                    ->schema([
                        TextInput::make('latitud')
                            ->label('Latitud')
                            ->numeric()
                            ->step(0.0000001)
                            ->placeholder('Ej. 19.0433400')
                            ->required(),

                        TextInput::make('longitud')
                            ->label('Longitud')
                            ->numeric()
                            ->step(0.0000001)
                            ->placeholder('Ej. -98.2019300')
                            ->required(),

                        TextInput::make('link_mapa')
                            ->label('URL de Google Maps')
                            ->placeholder('https://maps.google.com/?q=...')
                            ->url()
                            ->required(),
                    ]),
            ])
            ->columns(1);
    }
}
