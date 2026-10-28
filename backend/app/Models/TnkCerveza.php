<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TnkCerveza
 *
 * @property int $id
 * @property string $nombre
 * @property string $slug
 * @property string $tipo
 * @property string $estilo
 * @property string $descripcion
 * @property string $maridaje
 * @property float $contenido_alcholico
 * @property float $amargor
 * @property float|null $color_cerveza
 * @property string|null $presentaciones
 * @property string $color_hex
 * @property string $imagen_botella
 * @property string|null $logo_certificacion
 * @property bool $is_active
 * @property int $orden
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class TnkCerveza extends Model
{
    protected $table = 'tnk_cervezas';

    protected $casts = [
        'presentaciones' => 'array',
        'logo_certificacion' => 'array',
        'contenido_alcholico' => 'float',
        'amargor' => 'float',
        'color_cerveza' => 'float',
        'is_active' => 'bool',
        'orden' => 'int'
    ];

    protected $fillable = [
        'nombre',
        'slug',
        'tipo',
        'estilo',
        'descripcion',
        'maridaje',
        'contenido_alcholico',
        'amargor',
        'color_cerveza',
        'presentaciones',
        'color_hex',
        'imagen_botella',
        'logo_certificacion',
        'is_active',
        'orden'
    ];
}
