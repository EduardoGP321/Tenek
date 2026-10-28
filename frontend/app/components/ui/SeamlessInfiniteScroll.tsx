import React, { useRef } from "react";
import { gsap, Draggable, useGSAP } from "~/utils/gsap";

export interface SeamlessInfiniteScrollProps {
    children: React.ReactNode[];
    speed?: number;
    spacing?: number;
    aspectRatio?: "square" | "portrait" | "video" | string;
    cardWidthClass?: string;
    containerHeightClass?: string;
    className?: string;
}

export default function SeamlessInfiniteScroll({
    children,
    speed = 0.15,
    spacing = 0.1,
    aspectRatio = "square",
    cardWidthClass = "w-[16rem] sm:w-[19rem] md:w-[22rem]",
    containerHeightClass = "h-[440px] sm:h-[500px] md:h-[560px]",
    className = "",
}: SeamlessInfiniteScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const itemsToRender = React.useMemo(() => {
        if (!children || children.length === 0) return [];
        let list = [...children];
        while (list.length < 14) {
            list = [...list, ...children];
        }
        return list;
    }, [children]);

    const aspectClass = React.useMemo(() => {
        switch (aspectRatio) {
            case "square":
                return "aspect-square";
            case "portrait":
                return "aspect-[9/16]";
            case "video":
                return "aspect-video";
            default:
                return aspectRatio;
        }
    }, [aspectRatio]);

    useGSAP(
        () => {
            if (!containerRef.current || itemsToRender.length === 0) return;

            const cards = gsap.utils.toArray<HTMLElement>(".cards li");
            if (cards.length === 0) return;

            gsap.set(cards, { xPercent: 400, opacity: 0, scale: 0 });

            const animateFunc = (element: HTMLElement) => {
                const tl = gsap.timeline();
                tl.fromTo(
                    element,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        zIndex: 100,
                        duration: 0.5,
                        yoyo: true,
                        repeat: 1,
                        ease: "power1.in",
                        immediateRender: false,
                    }
                ).fromTo(
                    element,
                    { xPercent: 400 },
                    { xPercent: -400, duration: 1, ease: "none", immediateRender: false },
                    0
                );
                return tl;
            };

            const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);
            const playhead = { offset: 0 };
            const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());

            const scrub = gsap.to(playhead, {
                offset: 0,
                onUpdate() {
                    seamlessLoop.time(wrapTime(playhead.offset));
                },
                duration: 0.5,
                ease: "power3",
                paused: true,
            });

            let isDragging = false;
            let isVisible = true;

            const ticker = (_time: number, deltaTime: number) => {
                if (!isDragging && isVisible) {
                    playhead.offset += (deltaTime / 1000) * speed * spacing * 2.5;
                    seamlessLoop.time(wrapTime(playhead.offset));
                }
            };

            gsap.ticker.add(ticker);

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        isVisible = entry.isIntersecting;
                    });
                },
                { threshold: 0 }
            );
            if (containerRef.current) {
                observer.observe(containerRef.current);
            }

            const containerEl = containerRef.current;
            const proxy = containerEl.querySelector<HTMLElement>(".drag-proxy");
            let draggableInstance: Draggable[] | undefined;

            if (proxy) {
                draggableInstance = Draggable.create(proxy, {
                    type: "x",
                    trigger: containerEl.querySelector(".cards"),
                    onPress() {
                        isDragging = true;
                        this.startOffset = playhead.offset;
                    },
                    onDrag() {
                        scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.0015;
                        scrub.invalidate().restart();
                    },
                    onDragEnd() {
                        playhead.offset = scrub.vars.offset as number;
                        isDragging = false;
                    },
                });
            }

            return () => {
                gsap.ticker.remove(ticker);
                observer.disconnect();
                if (draggableInstance && draggableInstance.length > 0) {
                    draggableInstance[0].kill();
                }
            };
        },
        { scope: containerRef, dependencies: [itemsToRender, speed, spacing] }
    );

    return (
        <div
            ref={containerRef}
            className={`gallery relative w-full overflow-hidden select-none bg-transparent ${containerHeightClass} ${className}`}
        >

            <div className="drag-proxy absolute inset-0 z-30 cursor-grab active:cursor-grabbing" />


            <ul
                className={`cards absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${cardWidthClass} ${aspectClass} list-none p-0 m-0 pointer-events-none`}
            >
                {itemsToRender.map((child, index) => (
                    <li
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full ${aspectClass} rounded-3xl overflow-hidden shadow-2xl list-none p-0 m-0 will-change-[transform,opacity]`}
                    >
                        {child}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function buildSeamlessLoop(
    items: HTMLElement[],
    spacing: number,
    animateFunc: (el: HTMLElement) => gsap.core.Timeline
) {
    const overlap = Math.ceil(1 / spacing);
    const startTime = items.length * spacing + 0.5;
    const loopTime = (items.length + overlap) * spacing + 1;
    const rawSequence = gsap.timeline({ paused: true });

    const seamlessLoop = gsap.timeline({
        paused: true,
        repeat: -1,
        onRepeat() {
            if (this._time === this._dur) {
                this._tTime += this._dur - 0.01;
            }
        },
    });

    const l = items.length + overlap * 2;

    for (let i = 0; i < l; i++) {
        const index = i % items.length;
        const time = i * spacing;
        rawSequence.add(animateFunc(items[index]), time);
        if (i <= items.length) {
            seamlessLoop.add("label" + i, time);
        }
    }

    rawSequence.time(startTime);

    seamlessLoop
        .to(rawSequence, {
            time: loopTime,
            duration: loopTime - startTime,
            ease: "none",
        })
        .fromTo(
            rawSequence,
            { time: overlap * spacing + 1 },
            {
                time: startTime,
                duration: startTime - (overlap * spacing + 1),
                immediateRender: false,
                ease: "none",
            }
        );

    return seamlessLoop;
}