<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UbicacionResource extends JsonResource
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
            'direccion' => $this->direccion,
            'link_mapa' => $this->link_mapa,
            'coordenadas' => [
                'lat' => (float) $this->latitud,
                'lng' => (float) $this->longitud,
            ],
            'redes_sociales' => $this->whenLoaded('redesSociales', function () {
                return $this->redesSociales->map(fn($red) => [
                    'id' => $red->id,
                    'tipo' => strtolower($red->tipo),
                    'link' => $red->link,
                ]);
            }),
            'logo_url' => $this->logo_establecimiento
                ? asset('storage/' . $this->logo_establecimiento)
                : null,
        ];
    }
}
