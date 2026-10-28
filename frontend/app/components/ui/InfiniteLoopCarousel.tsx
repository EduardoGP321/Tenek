import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "~/utils/gsap";

interface InfiniteLoopCarouselProps {
    children: ReactNode[];
    className?: string;
    speed?: number;
    gap?: number;
    pauseOnHover?: boolean;
}

export default function InfiniteLoopCarousel({
    children,
    className = "",
    speed = 60,
    gap = 24,
    pauseOnHover = true,
}: InfiniteLoopCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    useGSAP(
        () => {
            if (!trackRef.current || !containerRef.current) return;

            const items = gsap.utils.toArray<HTMLElement>(".carousel-item", trackRef.current);
            if (!items.length) return;

            const firstItem = items[0];
            const itemWidth = firstItem.offsetWidth + gap;
            const totalWidth = (items.length / 2) * itemWidth;

            tweenRef.current = gsap.to(trackRef.current, {
                x: -totalWidth,
                duration: speed,
                ease: "none",
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
                },
                paused: true,
            });

            import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
                ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    onEnter: () => tweenRef.current?.play(),
                    onLeave: () => tweenRef.current?.pause(),
                    onEnterBack: () => tweenRef.current?.play(),
                    onLeaveBack: () => tweenRef.current?.pause(),
                });
            });

            if (pauseOnHover) {
                const handleMouseEnter = () => tweenRef.current?.pause();
                const handleMouseLeave = () => tweenRef.current?.play();

                const container = containerRef.current;
                container.addEventListener("mouseenter", handleMouseEnter);
                container.addEventListener("mouseleave", handleMouseLeave);

                return () => {
                    container.removeEventListener("mouseenter", handleMouseEnter);
                    container.removeEventListener("mouseleave", handleMouseLeave);
                };
            }
        },
        { scope: containerRef, dependencies: [speed, gap, pauseOnHover, children.length] }
    );

    return (
        <div
            ref={containerRef}
            className={`w-full overflow-hidden select-none ${className}`}
        >
            <div
                ref={trackRef}
                className="flex w-max will-change-transform"
                style={{ gap: `${gap}px` }}
            >

                {children.map((child, idx) => (
                    <div key={`orig-${idx}`} className="carousel-item shrink-0">
                        {child}
                    </div>
                ))}
                {children.map((child, idx) => (
                    <div key={`dup-${idx}`} className="carousel-item shrink-0" aria-hidden="true">
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
}