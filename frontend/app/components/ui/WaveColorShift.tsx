import { useRef, type ElementType, type ComponentPropsWithoutRef } from "react";
import { gsap, useGSAP } from "~/utils/gsap";

interface WaveColorShiftProps<T extends ElementType = "h2"> {
    text: string;
    as?: T;
    className?: string;
    initialColor?: string;
    duration?: number;
    stagger?: number;
    yOffset?: number;
}

export default function WaveColorShift<T extends ElementType = "h2">({
    text,
    as,
    className = "",
    initialColor = "#A51D24",
    duration = 0.30,
    stagger = 0.08,
    yOffset = 40,
    ...props
}: WaveColorShiftProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof WaveColorShiftProps<T>>) {
    const Component = as || "h2";
    const containerRef = useRef<HTMLElement>(null) as React.RefObject<any>;

    useGSAP(
        () => {
            if (!containerRef.current) return;

            const chars = containerRef.current.querySelectorAll(".wave-char");
            if (!chars.length) return;

            gsap.from(chars, {
                y: yOffset,
                color: initialColor,
                opacity: 0,
                stagger: {
                    each: stagger,
                    from: "start",
                },
                duration: duration,
                ease: "sine.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                    fastScrollEnd: true,
                    preventOverlaps: true,
                },
            });
        },
        { scope: containerRef, dependencies: [text, initialColor, duration, stagger, yOffset] }
    );

    const words = text.split(" ");

    return (
        <Component
            ref={containerRef}
            aria-label={text}
            className={`block w-full ${className}`}
            {...props}
        >
            {words.map((word, wordIdx) => (
                <span key={`word-${wordIdx}`} className="inline-block whitespace-nowrap">
                    {Array.from(word).map((char, charIdx) => (
                        <span
                            key={`char-${wordIdx}-${charIdx}`}
                            className="wave-char inline-block will-change-[transform,opacity,color]"
                            aria-hidden="true"
                        >
                            {char}
                        </span>
                    ))}

                    {wordIdx < words.length - 1 && (
                        <span className="inline-block whitespace-pre" aria-hidden="true">
                            {" "}
                        </span>
                    )}
                </span>
            ))}
        </Component>
    );
}