import { useState, useMemo, useRef, useEffect } from "react";
import Container from "~/components/ui/Container";
import type { Cerveza } from "~/types";
import { BeerEditorialRow } from "./BeerEditorialRow";
import { gsap, ScrollTrigger, useGSAP } from "~/utils/gsap";

interface BeersGridProps {
    cervezas: Cerveza[];
}

export function BeersGrid({ cervezas }: BeersGridProps) {
    const [filtroActivo, setFiltroActivo] = useState<string>("todas");
    const sectionRef = useRef<HTMLElement>(null);
    const ambientGlassRef = useRef<HTMLDivElement>(null);

    const categorias = useMemo(() => {
        const tipos = Array.from(new Set(cervezas.map((c) => c.tipo.toLowerCase())));
        return ["todas", ...tipos];
    }, [cervezas]);

    const cervezasFiltradas = useMemo(() => {
        if (filtroActivo === "todas") return cervezas;
        return cervezas.filter((c) => c.tipo.toLowerCase() === filtroActivo);
    }, [cervezas, filtroActivo]);

    useEffect(() => {
        let frameId: number;
        frameId = requestAnimationFrame(() => {
            ScrollTrigger.refresh();
        });

        return () => cancelAnimationFrame(frameId);
    }, [filtroActivo]);

    useGSAP(
        () => {
            if (!sectionRef.current || !ambientGlassRef.current) return;

            const rows = gsap.utils.toArray<HTMLElement>(".beer-row");

            if (rows.length === 0) {
                gsap.to(ambientGlassRef.current, {
                    backgroundColor: "transparent",
                    duration: 0.4,
                });
                return;
            }

            rows.forEach((row) => {
                const color = row.getAttribute("data-color") || "#8a131d";

                ScrollTrigger.create({
                    trigger: row,
                    start: "top 60%",
                    end: "bottom 40%",
                    invalidateOnRefresh: true,
                    onEnter: () => {
                        gsap.to(ambientGlassRef.current, {
                            backgroundColor: `${color}25`,
                            duration: 0.9,
                            ease: "power2.out",
                        });
                    },
                    onEnterBack: () => {
                        gsap.to(ambientGlassRef.current, {
                            backgroundColor: `${color}25 `,
                            duration: 0.9,
                            ease: "power2.out",
                        });
                    },
                });
            });
        },
        { scope: sectionRef, dependencies: [cervezasFiltradas] }
    );

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-8 sm:py-12 pb-24 bg-transparent text-neutral-900"
        >

            <div
                ref={ambientGlassRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 transition-colors duration-700 [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
            />

            <Container className="relative z-10">

                <div className="mb-10 sm:mb-14 flex justify-center">
                    <nav
                        aria-label="Filtrar por estilo"
                        className="inline-flex items-center gap-1.5 rounded-full border border-stone-300/80 bg-white/95 p-1.5 shadow-md backdrop-blur-md"
                    >
                        {categorias.map((cat) => {
                            const activa = filtroActivo === cat;
                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setFiltroActivo(cat)}
                                    className={`rounded-full px-5 py-2 font-sans text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${activa
                                        ? "bg-neutral-950 text-white shadow-md shadow-neutral-950/25"
                                        : "text-stone-600 hover:text-neutral-900 hover:bg-stone-100"
                                        }`}
                                >
                                    {cat === "todas" ? "Todas" : cat}
                                </button>
                            );
                        })}
                    </nav>
                </div>


                <div className="flex flex-col space-y-12 sm:space-y-16">
                    {cervezasFiltradas.map((cerveza, index) => (
                        <BeerEditorialRow
                            key={cerveza.id}
                            cerveza={cerveza}
                            index={index}
                        />
                    ))}
                </div>


                {cervezasFiltradas.length === 0 && (
                    <div className="py-20 text-center rounded-3xl border border-stone-200 bg-white/80 p-8 shadow-sm backdrop-blur-md">
                        <p className="font-sans text-stone-500 text-sm">
                            No se encontraron cervezas disponibles en esta categoría.
                        </p>
                    </div>
                )}
            </Container>
        </section>
    );
}