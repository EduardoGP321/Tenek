import { useRef } from "react";
import ClipPathImage from "~/components/ui/ClipPathImage";
import WavesBackground from "~/components/ui/WavesBackground";
import WordbyWordBuild from "~/components/ui/WordbyWordBuild";
import type { Experiencia } from "~/types";
import { gsap, useGSAP } from "~/utils/gsap";

interface ExperienceEditorialRowProps {
    experiencia: Experiencia;
    index: number;
}

export function ExperienceEditorialRow({ experiencia, index }: ExperienceEditorialRowProps) {
    const rowRef = useRef<HTMLElement>(null);
    const imgWrapRef = useRef<HTMLDivElement>(null);
    const isEven = index % 2 === 0;

    const fechaFormateada = new Date(experiencia.fecha).toLocaleDateString("es-MX", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    useGSAP(
        () => {
            if (!rowRef.current || !imgWrapRef.current) return;

            gsap.fromTo(
                imgWrapRef.current,
                { y: 20 },
                {
                    y: -20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: rowRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.2,
                    },
                }
            );
        },
        { scope: rowRef }
    );

    return (
        <article
            ref={rowRef}
            className="relative w-full py-6 sm:py-8 lg:py-10"
        >

            <div className="relative overflow-hidden rounded-[2.5rem]  p-6 sm:p-10 lg:p-14 shadow-xl backdrop-blur-md">

                <WavesBackground variant="dark" isFixed={false} />

                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1.5 bg-[#a51d24]"
                />

                <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14">


                    <div
                        className={`flex justify-center items-center lg:col-span-6 ${isEven ? "order-1 lg:order-1" : "order-1 lg:order-2"
                            }`}
                    >
                        <div
                            ref={imgWrapRef}
                            className="relative w-full overflow-hidden rounded-3xl shadow-xl will-change-transform"
                        >
                            {experiencia.imagen_url ? (


                                <ClipPathImage
                                    src={experiencia.imagen_url}
                                    alt="Fotografía de la experiencia"
                                    direction={index % 2 === 0 ? "bottom" : "top"}
                                    duration={1.2}
                                    containerClassName="relative h-full w-full overflow-hidden"
                                    className="wh-full w-full"
                                />

                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-sm font-sans text-stone-400">
                                    Sin imagen disponible
                                </div>
                            )}


                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent"
                            />
                        </div>
                    </div>


                    <div
                        className={`space-y-4 lg:col-span-6 ${isEven
                            ? "order-2 lg:order-2 text-left"
                            : "order-2 lg:order-1 text-left lg:text-right"
                            }`}
                    >

                        <WordbyWordBuild
                            text={experiencia.descripcion}
                            stagger={0.015}
                            duration={0.35}
                            delay={0.05}
                            className="font-sans text-justify text-base sm:text-lg lg:text-xl text-white leading-relaxed"
                        />

                    </div>

                </div>

            </div>
        </article>
    );
}