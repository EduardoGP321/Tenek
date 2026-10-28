import type { Route } from "./+types/cervezas";
import { useLoaderData } from "react-router";
import { getCervezas } from "~/services/cervezas.service";
import { BeersHero, BeersGrid } from "~/features/beers";
import Container from "~/components/ui/Container";
import WavesBackground from "~/components/ui/WavesBackground";
import ClipPathImage from "~/components/ui/ClipPathImage";
import WaveColorShift from "~/components/ui/WaveColorShift";
import WordbyWordBuild from "~/components/ui/WordbyWordBuild";
import ShineButton from "~/components/ui/ShineButton";
import CinematicVideoFrame from "~/components/ui/CinematicVideoFrame";
import LocationFloatingButton from "~/components/ui/LocationFloatingButton";

export async function loader({ }: Route.LoaderArgs) {
    const cervezas = await getCervezas();
    return { cervezas };
}

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Nuestras Cervezas | Cervecería Tenek" },
        { name: "description", content: "Conoce el portafolio de cervezas artesanales Tenek." },
    ];
}

export default function CervezasRoute() {
    const { cervezas } = useLoaderData<typeof loader>();

    return (
        <div className="w-full bg-transparent">
            <BeersHero />
            <BeersGrid cervezas={cervezas} />
            <section className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden bg-transparent">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[650px] rounded-full bg-[#a51d24]/20 blur-[130px] -z-10"
                />

                <Container className="relative z-10 text-center">

                    <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-[#a51d24]/40 p-2.5 sm:p-3.5 shadow-2xl shadow-neutral-950/40 backdrop-blur-md">
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-inner">
                            <CinematicVideoFrame
                                src="https://www.youtube.com/embed/3Vrp3y8_XpI"
                                type="iframe"
                                aspectRatio="16/9"
                            />
                        </div>
                    </div>
                </Container>
            </section>
            <section className="relative w-full py-10 sm:py-20 lg:py-24 overflow-hidden bg-transparent">
                <Container>
                    <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-neutral-800 p-8 sm:p-12 lg:p-14 shadow-2xl backdrop-blur-md">
                        <WavesBackground variant="dark" isFixed={false} />
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute top-0 right-1/4 h-72 w-72 rounded-full bg-[#a51d24]/25 blur-[100px]"
                        />
                        <div className="relative z-10 grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12">
                            <div className="flex justify-center items-center md:col-span-5">
                                <div className="relative w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[316px] drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)] transition-transform duration-500 hover:scale-105">
                                    <ClipPathImage
                                        src="/images/distribuye/catalogo.png"
                                        alt="Catálogo Comercial Cervecería Tenek"
                                        direction="bottom"
                                        duration={1}
                                        containerClassName="relative aspect-[316/453] w-full overflow-hidden rounded-2xl shadow-2xl"
                                        className="h-full w-full object-contain filter drop-shadow-2xl"
                                    />
                                </div>
                            </div>

                            <div className="text-left md:col-span-7 space-y-6">
                                <WaveColorShift
                                    as="h2"
                                    text="Catálogo de Distribución"
                                    initialColor="#a51d24"
                                    yOffset={25}
                                    duration={0.6}
                                    stagger={0.03}
                                    className="font-sans text-3xl sm:text-5xl lg:text-6xl text-white tracking-wide leading-tight"
                                />

                                <WordbyWordBuild
                                    text="Descarga el catálogo completo con fichas técnicas de cada estilo de cerveza, notas de cata, presentaciones y sugerencias de maridaje."
                                    stagger={0.015}
                                    duration={0.35}
                                    delay={0.05}
                                    className="font-sans text-sm sm:text-base lg:text-lg text-stone-300 leading-relaxed"
                                />

                                <div className="pt-3">
                                    <ShineButton
                                        as="a"
                                        href="/docs/catalogo_tenek.pdf"
                                        download="Catalogo_Tenek_Distribucion.pdf"
                                        className="inline-flex rounded-2xl bg-[#a51d24] px-8 py-4 font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white shadow-xl shadow-black/40 hover:bg-[#85161c] active:scale-95 transition-all duration-300"
                                    >
                                        <span className="relative z-10 flex items-center gap-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                                className="h-5 w-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                                                />
                                            </svg>
                                            Descargar Catálogo
                                        </span>
                                    </ShineButton>
                                </div>
                            </div>

                        </div>
                    </div>
                </Container>
            </section>
            <LocationFloatingButton />
        </div>
    );
}