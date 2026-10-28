<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tnk_academias', function (Blueprint $table) {
            $table->id();
            $table->string('tipo', 100); // ej. 'articulo', 'guia', 'glosario'
            $table->string('titulo');
            $table->string('slug')->unique(); // Muy útil para URLs amigables en React (ej. /academia/que-es-el-ibu)
            $table->text('extracto')->nullable(); // Resumen plano para cards y preview
            $table->longText('contenido'); // Texto enriquecido (HTML o Markdown)
            $table->string('imagen_url')->nullable(); // Imagen destacada / portada
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tnk_academias');
    }
};
