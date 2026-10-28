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
        Schema::create('tnk_ubicaciones', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->foreignId('social_link_id')
                ->nullable() // Recomendado si una ubicación no tiene red social obligatoria
                ->constrained('tnk_redes_sociales')
                ->nullOnDelete();
            $table->text('direccion');
            $table->text('link_mapa');
            $table->decimal('latitud', 10, 7);
            $table->decimal('longitud', 11, 7);
            $table->text('logo_establecimiento');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tnk_ubicaciones');
    }
};
