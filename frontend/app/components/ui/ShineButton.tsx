import { useRef, type ReactNode, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";
import { gsap, useGSAP } from "~/utils/gsap";

type CommonProps = {
    children: ReactNode;
    className?: string;
    shineColor?: string;
    duration?: number;
};

type AsAnchor = CommonProps &
    AnchorHTMLAttributes<HTMLAnchorElement> & {
        as?: "a";
    };

type AsButton = CommonProps &
    ButtonHTMLAttributes<HTMLButtonElement> & {
        as?: "button";
    };

type ShineButtonProps = AsAnchor | AsButton;

export default function ShineButton({
    children,
    className = "",
    shineColor = "rgba(255, 255, 255, 0.35)",
    duration = 0.6,
    as = "a",
    ...props
}: ShineButtonProps) {
    const elementRef = useRef<HTMLElement | null>(null);

    const { contextSafe } = useGSAP({ scope: elementRef });

    const handleMouseEnter = contextSafe(() => {
        const el = elementRef.current;
        if (!el) return;

        const overlay = document.createElement("span");
        overlay.style.position = "absolute";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "60%";
        overlay.style.height = "100%";
        overlay.style.transform = "skewX(-20deg)";
        overlay.style.pointerEvents = "none";
        overlay.style.background = `linear-gradient(90deg, transparent, ${shineColor}, transparent)`;

        el.appendChild(overlay);

        gsap.fromTo(
            overlay,
            { xPercent: -200 },
            {
                xPercent: 200,
                duration: duration,
                ease: "power2.out",
                onComplete: () => {
                    overlay.remove();
                },
            }
        );
    });

    const sharedClasses = `relative inline-flex items-center justify-center overflow-hidden transition-all duration-300 ${className}`;

    if (as === "button") {
        const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
        return (
            <button
                ref={elementRef as React.RefObject<HTMLButtonElement>}
                onMouseEnter={handleMouseEnter}
                className={sharedClasses}
                {...buttonProps}
            >
                {children}
            </button>
        );
    }

    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
        <a
            ref={elementRef as React.RefObject<HTMLAnchorElement>}
            onMouseEnter={handleMouseEnter}
            className={sharedClasses}
            {...anchorProps}
        >
            {children}
        </a>
    );
}