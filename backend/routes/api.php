<?php

use App\Http\Controllers\Api\TenekApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('throttle:60,1')->prefix('v1')->group(function () {
    // Catálogo
    Route::get('/cervezas', [TenekApiController::class, 'cervezas']);
    Route::get('/cervezas/{slug}', [TenekApiController::class, 'cervezaDetalle'])
        ->where('slug', '[a-z0-9\-]+');

    // Contenido
    Route::get('/academia', [TenekApiController::class, 'academia']);
    Route::get('/academia/{slug}', [TenekApiController::class, 'academiaDetalle'])
        ->where('slug', '[a-z0-9\-]+');

    Route::get('/experiencias', [TenekApiController::class, 'experiencias']);

    // Puntos de Venta
    Route::get('/ubicaciones', [TenekApiController::class, 'ubicaciones']);
});
