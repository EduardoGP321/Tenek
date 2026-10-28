<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class TnkUbicacion
 *
 * @property int $id
 * @property string $nombre
 * @property int|null $social_link_id
 * @property string $direccion
 * @property string $link_mapa
 * @property float $latitud
 * @property float $longitud
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property TnkRedSocial|null $tnk_redes_sociale
 *
 * @package App\Models
 */
class TnkUbicacion extends Model
{
    protected $table = 'tnk_ubicaciones';

    protected $casts = [
        'latitud' => 'float',
        'longitud' => 'float'
    ];

    protected $fillable = [
        'nombre',
        'direccion',
        'link_mapa',
        'latitud',
        'longitud',
        'logo_establecimiento'
    ];

    public function redesSociales(): HasMany
    {
        return $this->hasMany(TnkRedSocial::class, 'tnk_ubicacion_id');
    }
}
