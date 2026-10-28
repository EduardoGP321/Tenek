import { useState, useMemo } from "react";
import Container from "~/components/ui/Container";
import InfiniteLoopCarousel from "~/components/ui/InfiniteLoopCarousel";
import WaveColorShift from "~/components/ui/WaveColorShift";
import WordbyWordBuild from "~/components/ui/WordbyWordBuild";
import type { AcademiaArticulo } from "~/types";
import { AcademiaCarouselCard } from "./AcademiaCarouselCard";
import { AcademiaModal } from "./AcademiaModal";

interface AcademiaSectionProps {
    articulos: AcademiaArticulo[];
}

export function AcademiaSection({ articulos }: AcademiaSectionProps) {
    const [selectedArticulo, setSelectedArticulo] = useState<AcademiaArticulo | null>(null);

    const consumidorItems = useMemo(
        () => articulos.filter((a) => a.tipo.toLowerCase() === "consumidor"),
        [articulos]
    );
    const distribuidorItems = useMemo(
        () => articulos.filter((a) => a.tipo.toLowerCase() === "distribuidor"),
        [articulos]
    );

    const fillList = (list: AcademiaArticulo[]) => {
        if (list.length === 0) return [];
        let filled = [...list];
        while (filled.length < 8) {
            filled = [...filled, ...list];
        }
        return filled;
    };

    const listaConsumidor = useMemo(() => fillList(consumidorItems), [consumidorItems]);
    const listaDistribuidor = useMemo(() => fillList(distribuidorItems), [distribuidorItems]);

    return (
        <section className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden bg-transparent">

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-24 md:w-36 bg-gradient-to-r from-[#fbfbfa] via-[#fbfbfa]/70 to-transparent"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-24 md:w-36 bg-gradient-to-l from-[#fbfbfa] via-[#fbfbfa]/70 to-transparent"
            />

            <Container className="text-center mb-12 sm:mb-16">
                <span className="font-sans text-xs font-bold uppercase text-[#a51d24]">
                    Conocimiento Cervecero
                </span>
                <div className="mt-2">
                    <WaveColorShift
                        as="h1"
                        text="Academia Tenek"
                        initialColor="#a51d24"
                        yOffset={20}
                        duration={0.6}
                        className="font-sans text-4xl sm:text-6xl lg:text-7xl text-neutral-900 "
                    />
                </div>

            </Container>




            {consumidorItems.length > 0 && (
                <div className="mb-14 sm:mb-20">
                    <Container className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="h-3 w-3 rounded-full bg-[#179a13]" />
                            <h2 className="font-sans text-2xl sm:text-3xl font-bold uppercase tracking-tight text-neutral-900">
                                Para el Consumidor
                            </h2>
                        </div>
                        <span className="font-sans text-xs text-stone-400 font-semibold uppercase tracking-wider">
                            {consumidorItems.length} artículos
                        </span>
                    </Container>

                    <div className="relative w-full overflow-hidden select-none py-2">
                        <InfiniteLoopCarousel speed={70} pauseOnHover={true}>
                            {listaConsumidor.map((art, idx) => (
                                <AcademiaCarouselCard
                                    key={`consumidor-${art.id}-${idx}`}
                                    articulo={art}
                                    onSelect={setSelectedArticulo}
                                />
                            ))}
                        </InfiniteLoopCarousel>
                    </div>
                </div>
            )}

            {distribuidorItems.length > 0 && (
                <div>
                    <Container className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="h-3 w-3 rounded-full bg-[#22d1f9]" />
                            <h2 className="font-sans text-2xl sm:text-3xl font-bold uppercase tracking-tight text-neutral-900">
                                Para el Distribuidor
                            </h2>
                        </div>
                        <span className="font-sans text-xs text-stone-400 font-semibold uppercase tracking-wider">
                            {distribuidorItems.length} artículos
                        </span>
                    </Container>

                    <div className="relative w-full overflow-hidden select-none py-2">
                        <InfiniteLoopCarousel speed={70} pauseOnHover={true}>
                            {listaDistribuidor.map((art, idx) => (
                                <AcademiaCarouselCard
                                    key={`distribuidor-${art.id}-${idx}`}
                                    articulo={art}
                                    onSelect={setSelectedArticulo}
                                />
                            ))}
                        </InfiniteLoopCarousel>
                    </div>
                </div>
            )}


            <AcademiaModal
                articulo={selectedArticulo}
                onClose={() => setSelectedArticulo(null)}
            />
        </section>
    );
}