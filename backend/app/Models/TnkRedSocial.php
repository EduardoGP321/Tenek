<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class TnkRedSocial
 *
 * @property int $id
 * @property string $tipo
 * @property string $link
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property Collection|TnkUbicacion[] $tnk_ubicaciones
 *
 * @package App\Models
 */
class TnkRedSocial extends Model
{
    protected $table = 'tnk_redes_sociales';

    protected $fillable = [
        'tnk_ubicacion_id',
        'tipo',
        'link'
    ];

    public function ubicacion(): BelongsTo
    {
        return $this->belongsTo(TnkUbicacion::class, 'tnk_ubicacion_id');
    }
}
