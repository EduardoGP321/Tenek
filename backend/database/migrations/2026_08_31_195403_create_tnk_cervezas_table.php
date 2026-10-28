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
        Schema::create('tnk_cervezas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 100);
            $table->string('slug', 120)->unique();
            $table->string('tipo', 100);       // ej. Línea Fija, Estacional
            $table->string('estilo', 100);     // ej. IPA, Stout
            $table->text('descripcion');
            $table->text('maridaje');

            $table->decimal('contenido_alcholico', 4, 1);
            $table->decimal('amargor', 4, 1);
            $table->decimal('color_cerveza', 4, 1)->nullable();

            $table->text('presentaciones')->nullable();

            // Assets visuales
            $table->string('color_hex', 9)->default('#000000');
            $table->string('imagen_botella');
            $table->text('logo_certificacion')->nullable();

            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('orden')->default(0);
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tnk_cervezas');
    }
};
