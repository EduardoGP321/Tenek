<?php

namespace App\Filament\Admin\Resources\TnkCervezas\Schemas;

use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class TnkCervezaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                // Sección 1: Información Esencial
                Section::make('Identidad de la Cerveza')
                    ->columns(2)
                    ->schema([
                        TextInput::make('nombre')
                            ->label('Nombre de la Cerveza')
                            ->placeholder('Ej. Tének Imperial Stout')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (string $operation, ?string $state, Set $set) {
                                if ($operation !== 'create' || blank($state)) {
                                    return;
                                }

                                $clean = preg_replace('/[:;]/', '', $state);
                                $stopWords = ['de', 'la', 'el', 'en', 'y', 'a', 'los', 'del', 'las', 'por', 'un', 'para', 'con', 'una'];
                                $words = array_diff(explode(' ', Str::lower($clean)), $stopWords);
                                $shortened = implode(' ', array_slice($words, 0, 4));

                                $set('slug', Str::slug($shortened));
                            }),

                        TextInput::make('slug')
                            ->label('Slug URL')
                            ->readOnly()
                            ->dehydrated()
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->suffixIcon('heroicon-m-lock-closed'),

                        Select::make('tipo')
                            ->label('Disponibilidad / Tipo de Línea')
                            ->options([
                                'linea'     => 'Línea Regular (Todo el año)',
                                'temporada' => 'Edición de Temporada',
                                'especial'  => 'Lote Especial / Limitada',
                            ])
                            ->default('linea')
                            ->required()
                            ->native(false),

                        TextInput::make('estilo')
                            ->label('Estilo BJCP')
                            ->placeholder('Ej. IPA, Stout, Porter, Blonde Ale')
                            ->required()
                            ->maxLength(100),

                        Textarea::make('descripcion')
                            ->label('Nota de Cata / Descripción')
                            ->rows(3)
                            ->required()
                            ->columnSpanFull(),

                        Textarea::make('maridaje')
                            ->label('Sugerencias de Maridaje')
                            ->rows(2)
                            ->placeholder('Ej. Carnes asadas, quesos madurados, postres con chocolate')
                            ->required()
                            ->columnSpanFull(),
                    ]),

                // Sección 2: Especificaciones Técnicas y Color
                Section::make('Métricas Cervecera & Estilo Visual')
                    ->columns(4)
                    ->schema([
                        TextInput::make('contenido_alcholico')
                            ->label('Alcohol (ABV %)')
                            ->numeric()
                            ->step(0.1)
                            ->minValue(0)
                            ->maxValue(25)
                            ->suffix('%')
                            ->required(),

                        TextInput::make('amargor')
                            ->label('Amargor (IBU)')
                            ->numeric()
                            ->minValue(0)
                            ->maxValue(150)
                            ->suffix('IBU')
                            ->required(),

                        TextInput::make('color_cerveza')
                            ->label('Color (SRM)')
                            ->helperText('Escala SRM/EBC')
                            ->numeric()
                            ->minValue(1)
                            ->maxValue(100)
                            ->suffix('SRM')
                            ->nullable(),

                        ColorPicker::make('color_hex')
                            ->label('Color de Marca / Fondo')
                            ->helperText('Color característico para las tarjetas en el front')
                            ->default('#81171C')
                            ->required(),
                    ]),

                // Sección 3: Multimedia y Presentaciones
                Section::make('Empaque & Presentación')
                    ->columns(2)
                    ->schema([
                        FileUpload::make('imagen_botella')
                            ->label('Fotografía de Botella ')
                            ->image()
                            ->disk('public')
                            ->optimize('webp', 85)
                            ->directory('cervezas/botellas')
                            ->imageEditor()
                            ->maxSize(3072)
                            ->required(),

                        FileUpload::make('logo_certificacion')
                            ->label('Sellos / Medallas / Certificaciones')
                            ->helperText('Puedes subir una o más imágenes (PNG o WebP transparente)')
                            ->image()
                            ->multiple() // Permite N imágenes
                            ->reorderable() // Permite arrastrar para ordenar las medallas
                            ->openable()
                            ->downloadable()
                            ->panelLayout('grid')
                            ->disk('public')
                            ->directory('cervezas/medallas')
                            ->nullable(),

                        TagsInput::make('presentaciones')
                            ->label('Presentaciones Disponibles')
                            ->placeholder('Escribe y presiona Enter (ej. Botella 355ml, Barril 20L)')
                            ->suggestions([
                                'Botella 355 ml',
                                'Caja de 12 botellas de 355 ml',
                                'Barril con 28 L (80 vasos)'
                            ])
                            ->columnSpanFull(),

                        Toggle::make('is_active')
                            ->label('Cerveza Activa')
                            ->helperText('Disponible en catálogo público')
                            ->default(true),

                        TextInput::make('orden')
                            ->label('Posición en el menú')
                            ->numeric()
                            ->default(0)
                            ->required(),
                    ]),
            ])->columns(1);
    }
}
