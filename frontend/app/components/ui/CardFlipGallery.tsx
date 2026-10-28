import React, { useRef, useState } from "react";
import { gsap, useGSAP } from "~/utils/gsap";

export interface CardFlipItem {
    id: string | number;
    frontContent: React.ReactNode;
    backContent: React.ReactNode;
    ariaLabel?: string;
}

interface CardFlipGalleryProps {
    items: CardFlipItem[];
    className?: string;
    cardWidthClass?: string;
    cardHeightClass?: string;
    perspective?: number;
    duration?: number;
    ease?: string;
}

function FlipCard({
    item,
    cardWidthClass,
    cardHeightClass,
    perspective,
    duration,
    ease,
}: {
    item: CardFlipItem;
    cardWidthClass: string;
    cardHeightClass: string;
    perspective: number;
    duration: number;
    ease: string;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const [isFlipped, setIsFlipped] = useState(false);

    const { contextSafe } = useGSAP({ scope: cardRef });

    const flip = contextSafe((targetDeg: number) => {
        if (!innerRef.current) return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reduced) {
            gsap.set(innerRef.current, { rotationY: targetDeg });
        } else {
            gsap.to(innerRef.current, {
                rotationY: targetDeg,
                duration,
                ease,
                overwrite: "auto",
            });
        }
    });

    const isTouchRef = useRef(false);

    const handleTouchStart = () => {
        isTouchRef.current = true;
    };

    const handleMouseEnter = () => {
        if (isTouchRef.current) return;
        setIsFlipped(true);
        flip(180);
    };

    const handleMouseLeave = () => {
        if (isTouchRef.current) return;
        setIsFlipped(false);
        flip(0);
    };

    const handleFocus = () => {
        if (isTouchRef.current) return;
        setIsFlipped(true);
        flip(180);
    };

    const handleBlur = () => {
        if (isTouchRef.current) return;
        setIsFlipped(false);
        flip(0);
    };

    const handleClick = () => {
        const nextState = !isFlipped;
        setIsFlipped(nextState);
        flip(nextState ? 180 : 0);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
        }
    };

    return (
        <div
            ref={cardRef}
            tabIndex={0}
            role="button"
            aria-label={item.ariaLabel || "Tarjeta interactiva"}
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            onKeyDown={handleKeyDown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`group relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#a51d24] rounded-2xl select-none ${cardWidthClass} ${cardHeightClass}`}
            style={{ perspective: `${perspective}px` }}
        >

            <div
                ref={innerRef}
                className="relative h-full w-full will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
            >

                <div
                    className="absolute inset-0 h-full w-full rounded-2xl overflow-hidden shadow-xl"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    {item.frontContent}
                </div>


                <div
                    className="absolute inset-0 h-full w-full rounded-2xl overflow-hidden shadow-xl"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    {item.backContent}
                </div>
            </div>
        </div>
    );
}

export default function CardFlipGallery({
    items,
    className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center",
    cardWidthClass = "w-full max-w-[280px] sm:max-w-[320px]",
    cardHeightClass = "h-[360px] sm:h-[400px]",
    perspective = 1000,
    duration = 0.25,
    ease = "back.out(1.8)",
}: CardFlipGalleryProps) {
    return (
        <div className={`w-full ${className}`}>
            {items.map((item) => (
                <FlipCard
                    key={item.id}
                    item={item}
                    cardWidthClass={cardWidthClass}
                    cardHeightClass={cardHeightClass}
                    perspective={perspective}
                    duration={duration}
                    ease={ease}
                />
            ))}
        </div>
    );
}