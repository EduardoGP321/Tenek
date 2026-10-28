<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TnkAcademia
 * 
 * @property int $id
 * @property string $tipo
 * @property string $titulo
 * @property string $slug
 * @property string|null $extracto
 * @property string $contenido
 * @property string|null $imagen_url
 * @property bool $is_published
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class TnkAcademia extends Model
{
	protected $table = 'tnk_academias';

	protected $casts = [
		'is_published' => 'bool'
	];

	protected $fillable = [
		'tipo',
		'titulo',
		'slug',
		'extracto',
		'contenido',
		'imagen_url',
		'is_published'
	];
}
