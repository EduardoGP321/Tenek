<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CervezaResource extends JsonResource
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
            'nombre' => $this->nombre,
            'slug' => $this->slug,
            'tipo' => $this->tipo,
            'estilo' => $this->estilo,
            'descripcion' => $this->descripcion,
            'maridaje' => $this->maridaje,
            'contenido_alcoholico' => (float) $this->contenido_alcholico,
            'amargor' => (int) $this->amargor,
            'color_srm' => $this->color_cerveza ? (int) $this->color_cerveza : null,
            'color_hex' => $this->color_hex,
            'imagen_botella_url' => $this->imagen_botella ? Storage::disk('public')->url($this->imagen_botella) : null,
            'medallas_urls' => collect($this->logo_certificacion ?? [])->map(
                fn($path) => Storage::disk('public')->url($path)
            )->values(),
            'presentaciones' => $this->presentaciones ?? [],
            'orden' => (int) $this->orden,
        ];
    }
}
