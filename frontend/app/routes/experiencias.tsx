import type { Route } from "./+types/experiencias";
import { useLoaderData } from "react-router";
import { getExperiencias } from "~/services/experiencias.service";
import { ExperienceHero, ExperienceList, MisionVisionValores } from "~/features/experience";
import WavesBackground from "~/components/ui/WavesBackground";
import Container from "~/components/ui/Container";
import ClipPathImage from "~/components/ui/ClipPathImage";

export async function loader({ }: Route.LoaderArgs) {
    const experiencias = await getExperiencias();
    return { experiencias };
}

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Experiencias | Cervecería Tenek" },
        { name: "description", content: "Conoce las vivencias, catas y eventos de Cervecería Tenek." },
    ];
}

export default function ExperienciasRoute() {
    const { experiencias } = useLoaderData<typeof loader>();

    return (
        <div className="w-full bg-transparent">

            <ExperienceHero />


            <ExperienceList experiencias={experiencias} />

            <section className="relative w-full overflow-hidden bg-transparent py-3 sm:py-2 lg:py-6">

                <WavesBackground variant="wine" isFixed={false} />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 backdrop-blur-xs bg-neutral-950/20 -z-10"
                />


                <div className="relative w-full aspect-[1920/1081] max-h-[85vh] mx-auto flex items-center justify-center">
                    <ClipPathImage
                        src="/images/experiencias/cultura_tenek.webp"
                        alt="Cultura Tenek - Tradición y Cerveza Artesanal"
                        direction="bottom"
                        duration={1.2}
                        containerClassName="relative h-full w-full overflow-hidden flex items-center justify-center"
                        className="h-full w-full pointer-events-none select-none drop-shadow-md"
                    />

                </div>
            </section>

            <MisionVisionValores />
        </div>
    );
}