<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\AcademiaResource;
use App\Http\Resources\Api\CervezaResource;
use App\Http\Resources\Api\ExperienciaResource;
use App\Http\Resources\Api\UbicacionResource;
use App\Models\TnkAcademia;
use App\Models\TnkCerveza;
use App\Models\TnkExperiencia;
use App\Models\TnkUbicacion;
use Illuminate\Http\Request;

class TenekApiController extends Controller
{
    public function cervezas()
    {
        $cervezas = TnkCerveza::where('is_active', true)
            ->orderBy('orden', 'asc')
            ->get();

        return CervezaResource::collection($cervezas)
            ->response()
            ->header('Cache-Control', 'public, max-age=300');
    }
    public function cervezaDetalle(string $slug)
    {
        $cerveza = TnkCerveza::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return new CervezaResource($cerveza);
    }

    public function academia()
    {
        $articulos = TnkAcademia::where('is_published', true)
            ->latest()
            ->paginate(9);

        return AcademiaResource::collection($articulos);
    }

    public function academiaDetalle(string $slug)
    {
        $articulo = TnkAcademia::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        return new AcademiaResource($articulo);
    }

    public function experiencias()
    {
        $experiencias = TnkExperiencia::orderBy('created_at', 'asc')->get();

        return ExperienciaResource::collection($experiencias);
    }

    public function ubicaciones()
    {
        $ubicaciones = TnkUbicacion::with('redesSociales')
            ->orderBy('nombre', 'asc')
            ->get();

        return UbicacionResource::collection($ubicaciones);
    }
}
