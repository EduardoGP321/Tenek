<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class AcademiaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'tipo' => $this->tipo,
            'titulo' => $this->titulo,
            'slug' => $this->slug,
            'extracto' => $this->extracto,
            'contenido' => $this->contenido,
            'imagen_url' => $this->imagen_url ? Storage::disk('public')->url($this->imagen_url) : null,
            'fecha_publicacion' => $this->created_at?->toIso8601String(),
        ];
    }
}
