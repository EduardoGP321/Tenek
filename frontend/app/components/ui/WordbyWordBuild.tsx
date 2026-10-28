import { useRef, type ElementType, type ComponentPropsWithoutRef } from "react";
import { gsap, useGSAP } from "~/utils/gsap";

interface WordbyWordBuildProps<T extends ElementType = "p"> {
    text: string;
    as?: T;
    className?: string;
    duration?: number;
    stagger?: number;
    yOffset?: number;
    delay?: number;
}

export default function WordbyWordBuild<T extends ElementType = "p">({
    text,
    as,
    className = "",
    duration = 0.5,
    stagger = 0.06,
    yOffset = 15,
    delay = 0,
    ...props
}: WordbyWordBuildProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof WordbyWordBuildProps<T>>) {
    const Component = as || "p";
    const containerRef = useRef<HTMLElement>(null) as React.RefObject<any>;

    useGSAP(
        () => {
            if (!containerRef.current) return;

            const words = containerRef.current.querySelectorAll(".anim-word");
            if (!words.length) return;

            gsap.from(words, {
                opacity: 0,
                y: yOffset,
                stagger: stagger,
                duration: duration,
                delay: delay,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                    fastScrollEnd: true,
                    preventOverlaps: true,
                },
            });
        },
        { scope: containerRef, dependencies: [text, duration, stagger, yOffset, delay] }
    );

    const wordList = text.split(" ");

    return (
        <Component
            ref={containerRef}
            aria-label={text}
            className={`block leading-relaxed ${className}`}
            {...props}
        >
            {wordList.map((word, idx) => (
                <span
                    key={`word-${idx}`}
                    className="anim-word inline-block will-change-[transform,opacity]"
                    aria-hidden="true"
                >
                    {word}&nbsp;
                </span>
            ))}
        </Component>
    );
}