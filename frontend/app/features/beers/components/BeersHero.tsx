import { useRef } from "react";
import Container from "~/components/ui/Container";
import WaveColorShift from "~/components/ui/WaveColorShift";
import WavesBackground from "~/components/ui/WavesBackground";
import { gsap, useGSAP, ScrollTrigger } from "~/utils/gsap";

export function BeersHero() {
    const heroRef = useRef<HTMLElement>(null);
    const liquidBlobRef = useRef<HTMLDivElement>(null);
    const headlineWrapRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!heroRef.current) return;

            const bgTween = gsap.to(".bg-liquid", {
                backgroundPosition: "100% 100%",
                duration: 4,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
            });

            let haloTween: gsap.core.Tween | undefined;
            if (liquidBlobRef.current) {
                haloTween = gsap.to(liquidBlobRef.current, {
                    scale: 1.15,
                    opacity: 0.45,
                    duration: 3.5,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1,
                });
            }

            ScrollTrigger.create({
                trigger: heroRef.current,
                start: "top bottom",
                end: "bottom top",
                onEnter: () => {
                    bgTween.resume();
                    haloTween?.resume();
                },
                onLeave: () => {
                    bgTween.pause();
                    haloTween?.pause();
                },
                onEnterBack: () => {
                    bgTween.resume();
                    haloTween?.resume();
                },
                onLeaveBack: () => {
                    bgTween.pause();
                    haloTween?.pause();
                }
            });

            if (headlineWrapRef.current) {
                gsap.to(headlineWrapRef.current, {
                    y: -40,
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom center",
                        scrub: 1.2,
                    },
                });
            }
        },
        { scope: heroRef }
    );

    const handleScrollToCatalog = () => {
        const catalogElement = document.querySelector(".beer-row");
        if (catalogElement) {
            catalogElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            ref={heroRef}
            className="relative w-full pt-28 pb-20 sm:pt-36 sm:pb-24 lg:pt-44 lg:pb-32 overflow-hidden bg-transparent"
        >
            <WavesBackground variant="wine" isFixed={false} />


            <div
                ref={liquidBlobRef}
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[380px] sm:h-[480px] w-[550px] sm:w-[850px] rounded-full opacity-35 blur-[110px] -z-10"
                style={{
                    background:
                        "radial-gradient(circle, #a51d24 0%, rgba(165, 29, 36, 0.45) 50%, transparent 75%)",
                }}
            />

            <Container className="relative z-10 text-center">
                <div ref={headlineWrapRef} className="will-change-transform flex flex-col items-center">


                    <div className="mt-4 max-w-5xl">
                        <WaveColorShift
                            as="h1"
                            text="Conoce nuestras cervezas artesanales"
                            initialColor="#a51d24"
                            yOffset={30}
                            duration={0.65}
                            stagger={0.025}
                            className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white leading-[1.05] text-center drop-shadow-md"
                        />
                    </div>


                    <div className="mt-12 sm:mt-14">
                        <button
                            type="button"
                            onClick={handleScrollToCatalog}
                            className="group relative inline-flex items-center justify-center p-[2px] rounded-full overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105 active:scale-95"
                        >

                            <span
                                className="bg-liquid absolute inset-0 rounded-full will-change-[background-position]"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(135deg, #a51d24 0%, #ffffff 50%, #e0323c 100%)",
                                    backgroundSize: "200% 200%",
                                    backgroundPosition: "0% 0%",
                                }}
                            />


                            <span className="relative flex items-center gap-3 rounded-full bg-neutral-950/80 px-8 py-3.5 sm:px-10 sm:py-4 backdrop-blur-md transition-colors duration-300 group-hover:bg-neutral-950/60">
                                <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-white">
                                    Explorar
                                </span>
                                <svg
                                    className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-y-0.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                </svg>
                            </span>
                        </button>
                    </div>


                    <div className="mt-10 flex flex-col items-center gap-2 opacity-80">
                        <div className="h-10 w-[1.5px] bg-gradient-to-b from-white to-transparent" />
                    </div>

                </div>
            </Container>
        </section>
    );
}