<?php

namespace App\Support\Csp;

use Spatie\Csp\Directive;
use Spatie\Csp\Keyword;
use Spatie\Csp\Preset;

class TenekCspPolicy implements Preset
{
    public function configure($policy): void
    {
        $policy
            ->addDirective(Directive::BASE, Keyword::SELF)
            ->addDirective(Directive::CONNECT, [
                Keyword::SELF,
                'http://localhost:5173',
                'http://127.0.0.1:5173',
                'http://backend.test',
                'https://backend.test',
            ])
            ->addDirective(Directive::DEFAULT, Keyword::SELF)
            ->addDirective(Directive::FORM_ACTION, Keyword::SELF)
            ->addDirective(Directive::IMG, [
                Keyword::SELF,
                'data:',
                'blob:',
                'http://backend.test',
                'https://backend.test',
            ])
            ->addDirective(Directive::MEDIA, [
                Keyword::SELF,
                'blob:',
            ])
            ->addDirective(Directive::SCRIPT, [
                Keyword::SELF,
                Keyword::UNSAFE_INLINE, // Requerido por Alpine.js y Filament
                Keyword::UNSAFE_EVAL,   // Requerido por compilaciones dinámicas
            ])
            ->addDirective(Directive::STYLE, [
                Keyword::SELF,
                Keyword::UNSAFE_INLINE, // Requerido por estilos inline de Filament/Tailwind
            ]);
    }
}
