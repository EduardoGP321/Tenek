import Container from "~/components/ui/Container";
import InfiniteLoopCarousel from "~/components/ui/InfiniteLoopCarousel";
import ClipPathImage from "~/components/ui/ClipPathImage";
import WaveColorShift from "~/components/ui/WaveColorShift";
import WordbyWordBuild from "~/components/ui/WordbyWordBuild";
import type { Cerveza } from "~/types";

interface ContactHeroCarouselProps {
    cervezas: Cerveza[];
}

export function ContactHeroCarousel({ cervezas }: ContactHeroCarouselProps) {
    const cervezasConImagen = cervezas.filter((c) => c.imagen_botella_url);

    return (
        <section className="relative w-full pt-16 pb-10 sm:pt-20 sm:pb-14 lg:pt-24 lg:pb-16 overflow-hidden bg-transparent">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-24 md:w-36 bg-gradient-to-r from-[#fbfbfa] via-[#fbfbfa]/70 to-transparent"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-24 md:w-36 bg-gradient-to-l from-[#fbfbfa] via-[#fbfbfa]/70 to-transparent"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[680px] rounded-full bg-[#a51d24]/15 blur-[140px] -z-10"
            />



            {cervezasConImagen.length > 0 && (
                <div className="relative w-full overflow-hidden py-4 select-none">
                    <InfiniteLoopCarousel speed={30} pauseOnHover={false}>
                        {cervezasConImagen.map((cerveza) => {
                            const beerColor = cerveza.color_hex || "#a51d24";

                            return (
                                <div
                                    key={cerveza.id}
                                    className="group relative mx-4 sm:mx-6 flex w-[170px] sm:w-[210px] md:w-[240px] flex-col items-center justify-end"
                                >

                                    <div
                                        className="relative aspect-[621/1100] w-full overflow-hidden rounded-t-[120px] rounded-b-3xl border border-stone-200/90 p-4 shadow-xl backdrop-blur-md transition-transform duration-500 group-hover:scale-105"
                                        style={{
                                            backgroundColor: `${beerColor}18`,
                                            boxShadow: `0 15px 35px -10px ${beerColor}40`,
                                        }}
                                    >

                                        <img
                                            src="/images/cervezas/fondo_cervezas.webp"
                                            alt=""
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-40"
                                        />


                                        <div className="relative z-10 h-full w-full flex items-center justify-center">
                                            <ClipPathImage
                                                src={cerveza.imagen_botella_url!}
                                                alt={`Cerveza ${cerveza.nombre}`}
                                                direction="bottom"
                                                duration={1.1}
                                                containerClassName="relative h-full w-full flex items-center justify-center"
                                                className="h-full w-full object-contain filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.35)]"
                                            />
                                        </div>


                                        <div
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-35 blur-xl"
                                            style={{ backgroundColor: beerColor }}
                                        />
                                    </div>


                                    <div className="mt-3 text-center">
                                        {cerveza.estilo && (
                                            <span className="block font-sans text-[10px] font-bold uppercase tracking-widest text-stone-400">
                                                {cerveza.estilo}
                                            </span>
                                        )}
                                        <h3
                                            className="font-sans text-sm sm:text-base font-extrabold uppercase tracking-tight"
                                            style={{ color: beerColor }}
                                        >
                                            {cerveza.nombre}
                                        </h3>
                                    </div>
                                </div>
                            );
                        })}
                    </InfiniteLoopCarousel>
                </div>
            )}
        </section>
    );
}