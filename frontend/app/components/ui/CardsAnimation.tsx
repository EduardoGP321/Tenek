import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "~/utils/gsap";

interface CardsAnimationProps {
    children: ReactNode;
    className?: string;
    cardSelector?: string;
    iconSelector?: string;
    delay?: number;
    stagger?: number;
}

export default function CardsAnimation({
    children,
    className = "",
    cardSelector = ".anim-card",
    iconSelector = ".anim-card-icon",
    delay = 0,
    stagger = 0.22,
}: CardsAnimationProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            const cards = containerRef.current.querySelectorAll(cardSelector);
            if (!cards.length) return;

            gsap.fromTo(
                cards,
                {
                    y: 90,
                    opacity: 0,
                    scale: 0.94,
                },
                {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.1,
                    stagger: stagger,
                    delay: delay,
                    ease: "back.out(1.4)",
                }
            );

            const icons = containerRef.current.querySelectorAll(iconSelector);
            if (icons.length) {
                const iconTween = gsap.to(icons, {
                    y: -10,
                    duration: 2.4,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    stagger: {
                        each: 0.2,
                    },
                    paused: true,
                });

                import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
                    ScrollTrigger.create({
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        onEnter: () => iconTween.play(),
                        onLeave: () => iconTween.pause(),
                        onEnterBack: () => iconTween.play(),
                        onLeaveBack: () => iconTween.pause(),
                    });
                });
            }
        },
        { scope: containerRef, dependencies: [cardSelector, iconSelector] }
    );

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}