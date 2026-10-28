<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Quitar la FK vieja de ubicaciones
        Schema::table('tnk_ubicaciones', function (Blueprint $table) {
            if (Schema::hasColumn('tnk_ubicaciones', 'social_link_id')) {
                $table->dropForeign(['social_link_id']);
                $table->dropColumn('social_link_id');
            }
        });

        // 2. Agregar la FK en redes sociales apuntando a la ubicación
        Schema::table('tnk_redes_sociales', function (Blueprint $table) {
            $table->foreignId('tnk_ubicacion_id')
                ->after('id')
                ->constrained('tnk_ubicaciones')
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('tnk_redes_sociales', function (Blueprint $table) {
            $table->dropForeign(['tnk_ubicacion_id']);
            $table->dropColumn('tnk_ubicacion_id');
        });

        Schema::table('tnk_ubicaciones', function (Blueprint $table) {
            $table->foreignId('social_link_id')->nullable()->constrained('tnk_redes_sociales');
        });
    }
};
