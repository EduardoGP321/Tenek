import { useRef } from "react";
import { gsap, useGSAP } from "~/utils/gsap";

interface ClipPathImageProps {
    src: string;
    alt: string;
    className?: string;
    containerClassName?: string;
    direction?: "bottom" | "top" | "left" | "right";
    duration?: number;
    delay?: number;
    disableScrollTrigger?: boolean;
}

export default function ClipPathImage({
    src,
    alt,
    className = "w-full h-full object-cover bg-red-900/5",
    containerClassName = "relative overflow-hidden",
    direction = "bottom",
    duration = 1.2,
    delay = 0,
    disableScrollTrigger = false,
}: ClipPathImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const getInitialClip = () => {
        switch (direction) {
            case "bottom":
                return "polygon(0 0, 100% 0, 100% 0, 0 0)";
            case "top":
                return "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)";
            case "left":
                return "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";
            case "right":
                return "polygon(0 0, 0 0, 0 100%, 0 100%)";
        }
    };

    useGSAP(
        () => {
            if (!imageRef.current || !containerRef.current) return;

            const animationProps = {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                scale: 1,
                duration: duration,
                delay: delay,
                ease: "power3.inOut",
            };

            if (disableScrollTrigger) {
                gsap.fromTo(
                    imageRef.current,
                    {
                        clipPath: getInitialClip(),
                        scale: 1.15,
                    },
                    animationProps
                );
            } else {
                gsap.fromTo(
                    imageRef.current,
                    {
                        clipPath: getInitialClip(),
                        scale: 1.15,
                    },
                    {
                        ...animationProps,
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        },
        { scope: containerRef, dependencies: [direction, duration, delay, disableScrollTrigger] }
    );

    return (
        <div ref={containerRef} className={containerClassName}>
            <img
                ref={imageRef}
                src={src}
                alt={alt}
                className={`${className} will-change-[clip-path,transform]`}
                loading="lazy"
            />
        </div>
    );
}