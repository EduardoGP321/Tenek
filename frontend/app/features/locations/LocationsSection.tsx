import { useState, useRef } from "react";
import type { Ubicacion } from "~/types";
import EmbeddedMap from "./EmbeddedMap";
import Container from "~/components/ui/Container";
import InfiniteLoopCarousel from "~/components/ui/InfiniteLoopCarousel";
import ClipPathImage from "~/components/ui/ClipPathImage";
import { FiMapPin, FiExternalLink } from "react-icons/fi";
import { FaInstagram, FaFacebook, FaTiktok, FaGlobe } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { gsap, useGSAP } from "~/utils/gsap";

interface LocationsSectionProps {
    ubicaciones: Ubicacion[];
}

export default function LocationsSection({ ubicaciones = [] }: LocationsSectionProps) {
    const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);

    // Animación de entrada del heading
    useGSAP(
        () => {
            if (!headingRef.current) return;

            const heading = headingRef.current.querySelector("h2");
            const subtitle = headingRef.current.querySelector("p");

            if (heading) {
                gsap.fromTo(
                    heading,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headingRef.current,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            if (subtitle) {
                gsap.fromTo(
                    subtitle,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        delay: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headingRef.current,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        },
        { scope: sectionRef }
    );

    const renderSocialIcon = (tipo: string) => {
        const iconClass = "w-4 h-4 sm:w-[18px] sm:h-[18px]";
        switch (tipo.toLowerCase()) {
            case "instagram":
                return <FaInstagram className={iconClass} />;
            case "facebook":
                return <FaFacebook className={iconClass} />;
            case "tiktok":
                return <FaTiktok className={iconClass} />;
            case "x_twitter":
                return <FaXTwitter className={iconClass} />;
            default:
                return <FaGlobe className={iconClass} />;
        }
    };

    return (
        <section ref={sectionRef} className="relative w-full py-14 sm:py-20 lg:py-28 overflow-hidden">
            {/* 1. Header y Mapa dentro de Container responsivo */}
            <Container>
                <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
                    <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-neutral-900">
                        Puntos de Venta
                    </h2>
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base text-stone-500 font-medium max-w-xl mx-auto">
                        Encuentra cerveza Tenek en los mejores establecimientos
                    </p>
                </div>

                {/* Mapa con altura escalable según viewport */}
                <div className="w-full mb-12 sm:mb-16">
                    <EmbeddedMap
                        ubicaciones={ubicaciones}
                        selectedId={selectedLocationId}
                        onSelectUbicacion={(u) => setSelectedLocationId(u.id)}
                        className="h-[360px] sm:h-[460px] md:h-[540px] lg:h-[620px] xl:h-[680px] w-full"
                    />
                </div>

                <div className="flex items-center justify-between mb-6 px-1">
                    <span className="text-[11px] sm:text-xs text-stone-400">
                        <span className="hidden sm:inline">Pasa el cursor sobre una tarjeta para ubicarla en el mapa</span>
                        <span className="sm:hidden">Toca una tarjeta para ubicarla en el mapa</span>
                    </span>
                </div>
            </Container>

            {/* 2. Carrusel Full-Bleed — Cards con logos grandes y visuales */}
            <div
                className="relative w-full"
                onMouseLeave={() => setSelectedLocationId(null)}
            >
                {/* Degradados laterales para desvanecer suavemente los extremos */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-24 md:w-36 bg-gradient-to-r from-[#fbfbfa] via-[#fbfbfa]/70 to-transparent"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-24 md:w-36 bg-gradient-to-l from-[#fbfbfa] via-[#fbfbfa]/70 to-transparent"
                />

                <InfiniteLoopCarousel speed={90} gap={20} pauseOnHover={true}>
                    {ubicaciones.map((ubicacion) => (
                        <div
                            key={ubicacion.id}
                            onMouseEnter={() => setSelectedLocationId(ubicacion.id)}
                            onClick={() => {
                                setSelectedLocationId((prev) =>
                                    prev === ubicacion.id ? null : ubicacion.id
                                );
                            }}
                            className={`group relative flex flex-col items-center bg-white/95 backdrop-blur-sm border rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ease-out w-[270px] sm:w-[300px] md:w-[320px] shrink-0 cursor-pointer ${
                                selectedLocationId === ubicacion.id
                                    ? "border-[#a51d24]/40 shadow-xl shadow-[#a51d24]/5 -translate-y-1"
                                    : "border-stone-200/80 hover:border-[#a51d24]/30"
                            }`}
                        >
                            <a
                                href={ubicacion.link_mapa}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className={`relative h-36 w-36 sm:h-40 sm:w-40 md:h-44 md:w-44 rounded-full overflow-hidden mb-4 sm:mb-5 bg-stone-50 ring-[3px] transition-all duration-500 ${
                                    selectedLocationId === ubicacion.id
                                        ? "ring-[#a51d24]/40 shadow-lg shadow-[#a51d24]/10"
                                        : "ring-stone-100 group-hover:ring-[#a51d24]/40 group-hover:shadow-lg group-hover:shadow-[#a51d24]/10"
                                }`}
                            >
                                {ubicacion.logo_url ? (
                                    <ClipPathImage
                                        src={ubicacion.logo_url}
                                        alt={ubicacion.nombre}
                                        direction="bottom"
                                        duration={1.2}
                                        disableScrollTrigger={true}
                                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200 text-stone-500 text-sm font-bold text-center px-4 leading-tight">
                                        {ubicacion.nombre}
                                    </div>
                                )}
                            </a>

                            {/* Nombre del Punto — más grande */}
                            <h4 className={`font-sans text-sm sm:text-base font-extrabold uppercase tracking-tight text-center truncate w-full transition-colors duration-300 ${
                                selectedLocationId === ubicacion.id
                                    ? "text-[#a51d24]"
                                    : "text-neutral-900 group-hover:text-[#a51d24]"
                            }`}>
                                {ubicacion.nombre}
                            </h4>

                            {/* Dirección */}
                            <p className="font-sans text-[11px] sm:text-xs text-stone-500 text-center line-clamp-2 mt-1 leading-relaxed min-h-[2em]">
                                {ubicacion.direccion}
                            </p>

                            {/* Redes Sociales y Enlace a Maps — más visual */}
                            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-stone-100/80 w-full justify-between">
                                <div className="flex items-center gap-1.5">
                                    {ubicacion.redes_sociales && ubicacion.redes_sociales.length > 0 ? (
                                        ubicacion.redes_sociales.map((red) => (
                                            <a
                                                key={red.id ?? red.tipo}
                                                href={red.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-[#a51d24] hover:text-white hover:scale-110 transition-all duration-300"
                                                title={red.tipo}
                                            >
                                                {renderSocialIcon(red.tipo)}
                                            </a>
                                        ))
                                    ) : (
                                        <span className="text-[10px] text-stone-300 font-medium">Oficial</span>
                                    )}
                                </div>

                                <a
                                    href={ubicacion.link_mapa}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#a51d24] hover:text-[#8a131d] uppercase tracking-wider group/maps"
                                >
                                    <FiMapPin className="w-3.5 h-3.5 group-hover/maps:animate-bounce" />
                                    <span className="group-hover/maps:underline underline-offset-2">Maps</span>
                                    <FiExternalLink className="w-3 h-3 opacity-60" />
                                </a>
                            </div>
                        </div>
                    ))}
                </InfiniteLoopCarousel>
            </div>
        </section>
    );
}