import Container from "~/components/ui/Container";
import EmbeddedMap from "~/components/ui/EmbeddedMap";
import WaveColorShift from "~/components/ui/WaveColorShift";
import WordbyWordBuild from "~/components/ui/WordbyWordBuild";
import { FiExternalLink } from "react-icons/fi";

const direccionMaps = encodeURIComponent(
    "Priv. 6a Sur 2906, Ladrillera de Benítez, 72530 Heroica Puebla de Zaragoza, Pue."
);

export function ContactMapSection() {
    return (
        <section className="relative w-full py-12 sm:py-16 lg:py-20 overflow-hidden bg-transparent">

            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[700px] rounded-full bg-[#a51d24]/10 blur-[140px] -z-10"
            />

            <Container>

                <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
                    <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-[#a51d24]">
                        Encuéntranos
                    </span>
                    <div className="mt-2">
                        <WaveColorShift
                            as="h2"
                            text="Visita Nuestra Casa"
                            initialColor="#a51d24"
                            yOffset={20}
                            duration={0.6}
                            className="font-sans text-3xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight"
                        />
                    </div>
                </div>


                <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/60 p-2.5 sm:p-4 shadow-2xl backdrop-blur-md">
                    <div className="relative w-full overflow-hidden rounded-3xl border border-stone-200/80 bg-stone-100">
                        <EmbeddedMap
                            lat={19.0305}
                            lng={-98.2045}
                            zoom={16}
                            popupTitle="Cervecería Tenek"
                            popupAddress="Priv. 6a Sur 2906, Ladrillera de Benítez, Puebla"
                        />


                        <div className="pointer-events-none absolute bottom-4 right-4 z-[400]">
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${direccionMaps}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pointer-events-auto inline-flex items-center gap-2 rounded-2xl bg-neutral-950/90 px-5 py-3 font-sans text-xs font-bold uppercase tracking-widest text-white shadow-xl backdrop-blur-md hover:bg-[#a51d24] transition-colors duration-300"
                            >
                                <span>Navegar con Maps</span>
                                <FiExternalLink className="h-4 w-4 text-[#a51d24] group-hover:text-white" />
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}