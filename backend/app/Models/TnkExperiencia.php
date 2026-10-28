<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TnkExperiencia
 * 
 * @property int $id
 * @property string $descripcion
 * @property string $imagen_url
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class TnkExperiencia extends Model
{
	protected $table = 'tnk_experiencias';

	protected $fillable = [
		'descripcion',
		'imagen_url'
	];
}
