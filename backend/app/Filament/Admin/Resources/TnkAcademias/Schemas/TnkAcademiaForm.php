<?php

namespace App\Filament\Admin\Resources\TnkAcademias\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Illuminate\Support\Str;
use Filament\Schemas\Schema;

class TnkAcademiaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Información Principal')
                    ->columns(2)
                    ->schema([
                        Select::make('tipo')
                            ->label('Tipo de Publicación')
                            ->options([
                                'consumidor' => 'Para Consumidores',
                                'distribuidor'   => 'Para Distribuidores'
                            ])
                            ->required()
                            ->native(false),

                        Toggle::make('is_published')
                            ->label('Publicado')
                            ->helperText('Visible en el sitio web y en la API')
                            ->default(true)
                            ->inline(false),

                        TextInput::make('titulo')
                            ->label('Título')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (string $operation, ?string $state, Set $set) {
                                if ($operation !== 'create') {
                                    return;
                                }
                                if (blank($state)) {
                                    $set('slug', null);
                                    return;
                                }
                                $cleanTitle = preg_replace('/[:;]/', '', $state);
                                $stopWords = ['de', 'la', 'que', 'el', 'en', 'y', 'a', 'los', 'del', 'se', 'las', 'por', 'un', 'para', 'con', 'no', 'una', 'su', 'al', 'lo'];
                                $words = explode(' ', Str::lower($cleanTitle));
                                $filteredWords = array_diff($words, $stopWords);
                                $shortened = implode(' ', array_slice($filteredWords, 0, 5));
                                $set('slug', Str::slug($shortened));
                            }),

                        TextInput::make('slug')
                            ->label('URL Amigable (Slug)')

                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->helperText('Generado automáticamente pero se puede modificar.'),

                        Textarea::make('extracto')
                            ->label('Resumen Corto')
                            ->rows(3)
                            ->maxLength(300)
                            ->helperText('Breve introducción para tarjetas en el frontend')
                            ->columnSpanFull(),
                    ]),

                Section::make('Multimedia y Cuerpo')
                    ->schema([
                        FileUpload::make('imagen_url')
                            ->label('Imagen de Portada')
                            ->image()
                            ->disk('public')
                            ->directory('academia')
                            ->optimize('webp', 85)
                            ->imageEditor()
                            ->maxSize(3072)
                            ->columnSpanFull(),

                        RichEditor::make('contenido')
                            ->label('Contenido Completo')
                            ->required()
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'underline',
                                'strike',
                                'link',
                                'h2',
                                'h3',
                                'bulletList',
                                'orderedList',
                                'blockquote',
                                'undo',
                                'redo',
                            ])
                            ->columnSpanFull(),
                    ]),
            ])->columns(1);
    }
}
