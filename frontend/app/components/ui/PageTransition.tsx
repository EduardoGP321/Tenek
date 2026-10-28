import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigation, useLocation } from "react-router";
import { gsap, useGSAP } from "~/utils/gsap";

/**
 * PageTransition — Cortinilla de transición entre páginas.
 * 
 * - Fondo: Rojo institucional (#a51d24)
 * - Logo: Blanco de gran formato (/images/logo-white.png)
 * - Optimizado para Safari iOS y navegadores móviles (GPU clip-path)
 */
export default function PageTransition() {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);

    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);

    const navigation = useNavigation();
    const location = useLocation();
    const isNavigating = useRef(false);

    useGSAP(
        () => {
            if (!isInitialLoad || !containerRef.current || !logoRef.current) return;

            document.body.style.overflow = "hidden";

            const tl = gsap.timeline({
                onComplete: () => {
                    document.body.style.overflow = "";
                    setIsInitialLoad(false);
                    setShouldRender(false);
                },
            });

            tl.fromTo(
                logoRef.current,
                { scale: 0.7, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.75, ease: "back.out(1.2)" }
            )
                .to({}, { duration: 0.4 })
                .to(logoRef.current, {
                    scale: 1.08,
                    opacity: 0,
                    duration: 0.35,
                    ease: "power2.in",
                })
                .to(
                    containerRef.current,
                    {
                        clipPath: "circle(0% at 50% 50%)",
                        webkitClipPath: "circle(0% at 50% 50%)",
                        duration: 0.85,
                        ease: "power3.inOut",
                    },
                    "-=0.15"
                );
        },
        { scope: containerRef, dependencies: [] }
    );

    const playTransitionIn = useCallback(() => {
        if (!containerRef.current || isInitialLoad) return;

        setShouldRender(true);

        gsap.set(containerRef.current, {
            clipPath: "circle(0% at 50% 50%)",
            webkitClipPath: "circle(0% at 50% 50%)",
            opacity: 1,
        });

        if (logoRef.current) {
            gsap.set(logoRef.current, { scale: 0.8, opacity: 0 });
        }

        const tl = gsap.timeline();

        tl.to(containerRef.current, {
            clipPath: "circle(150vmax at 50% 50%)",
            webkitClipPath: "circle(150vmax at 50% 50%)",
            duration: 0.45,
            ease: "power2.inOut",
        });

        if (logoRef.current) {
            tl.to(
                logoRef.current,
                { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" },
                "-=0.2"
            );
        }
    }, [isInitialLoad]);

    const playTransitionOut = useCallback(() => {
        if (!containerRef.current || isInitialLoad) return;

        const tl = gsap.timeline({
            onComplete: () => {
                setShouldRender(false);
            },
        });

        if (logoRef.current) {
            tl.to(logoRef.current, {
                opacity: 0,
                scale: 0.9,
                duration: 0.25,
                ease: "power2.in",
            });
        }

        tl.to(
            containerRef.current,
            {
                clipPath: "circle(0% at 50% 50%)",
                webkitClipPath: "circle(0% at 50% 50%)",
                duration: 0.65,
                ease: "power3.inOut",
            },
            "-=0.1"
        );
    }, [isInitialLoad]);

    useEffect(() => {
        if (isInitialLoad) return;

        const isPending = navigation.state === "loading" || navigation.state === "submitting";

        if (isPending && !isNavigating.current) {
            isNavigating.current = true;
            playTransitionIn();
        }
    }, [navigation.state, isInitialLoad, playTransitionIn]);

    useEffect(() => {
        if (isInitialLoad) return;

        if (isNavigating.current) {
            isNavigating.current = false;
            const timer = setTimeout(() => {
                playTransitionOut();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [location.pathname, isInitialLoad, playTransitionOut]);

    if (!shouldRender) return null;

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#a51d24] touch-none select-none will-change-[clip-path]"
            style={{
                clipPath: isInitialLoad ? "circle(150vmax at 50% 50%)" : undefined,
                WebkitClipPath: isInitialLoad ? "circle(150vmax at 50% 50%)" : undefined,
                transform: "translateZ(0)",
            }}
        >

            <img
                ref={logoRef}
                src="/images/logo-white.png"
                alt="Cervecería Tenek"
                className="relative z-10 h-24 w-auto max-w-[75vw] object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.45)] will-change-transform sm:h-36 md:h-44 lg:h-52"
                style={{ opacity: 0 }}
            />
        </div>
    );
}