import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "~/utils/gsap";

type VideoType = "iframe" | "native";

interface CinematicVideoFrameProps {
    src: string;
    type?: VideoType;
    poster?: string;
    aspectRatio?: string;
    className?: string;
    autoPlayOnView?: boolean;
    objectFit?: "cover" | "contain";
}

export default function CinematicVideoFrame({
    src,
    type = "iframe",
    poster,
    aspectRatio = "16/9",
    className = "",
    autoPlayOnView = false,
    objectFit = "cover",
}: CinematicVideoFrameProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useGSAP(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapper,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });

        gsap.set(wrapper, { clipPath: "inset(0% 0% 100% 0%)" });

        tl.to(wrapper, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power4.inOut",
        }).from(
            wrapper,
            {
                y: 40,
                opacity: 0,
                scale: 0.95,
                duration: 1.2,
                ease: "power3.out",
            },
            "<"
        );

        if (type === "native" && autoPlayOnView && videoRef.current) {
            ScrollTrigger.create({
                trigger: wrapper,
                start: "top 70%",
                end: "bottom 30%",
                onEnter: () => videoRef.current?.play(),
                onLeave: () => videoRef.current?.pause(),
                onEnterBack: () => videoRef.current?.play(),
                onLeaveBack: () => videoRef.current?.pause(),
            });
        }
    }, { scope: wrapperRef, dependencies: [type, autoPlayOnView] });

    const embedSrc =
        type === "iframe" && !src.includes("autoplay")
            ? `${src}${src.includes("?") ? "&" : "?"}autoplay=1&mute=1&loop=1&playsinline=1`
            : src;

    return (
        <div
            ref={wrapperRef}
            className={`cinematic-video-frame ${className}`}
            style={{
                position: "relative",
                width: "100%",
                height: aspectRatio === "auto" ? "100%" : undefined,
                aspectRatio: aspectRatio === "auto" ? undefined : aspectRatio,
                overflow: "hidden",
                borderRadius: "12px",
                willChange: "clip-path, transform",
            }}
        >
            {type === "iframe" ? (
                <iframe
                    src={embedSrc}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                />
            ) : (
                <video
                    ref={videoRef}
                    src={src}
                    poster={poster}
                    autoPlay
                    muted
                    playsInline
                    loop
                    preload="auto"
                    className="pointer-events-none"
                    style={{ width: "100%", height: "100%", objectFit, display: "block" }}
                />
            )}
        </div>
    );
}