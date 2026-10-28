import { useState, useRef } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FiExternalLink, FiNavigation } from "react-icons/fi";
import { gsap, useGSAP } from "~/utils/gsap";

const DIRECCION_TEXTO = "Priv. 6a Sur 2906, Ladrillera de Benítez, 72530 Heroica Puebla de Zaragoza, Pue.";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(DIRECCION_TEXTO)}`;

export default function LocationFloatingButton() {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const mainIconRef = useRef<HTMLDivElement>(null);

    const { contextSafe } = useGSAP({ scope: containerRef });

    const animateOpen = contextSafe(() => {
        if (!cardRef.current || !mainIconRef.current) return;

        gsap.to(mainIconRef.current, {
            scale: 1.1,
            duration: 0.25,
            ease: "power2.out",
        });

        gsap.killTweensOf(cardRef.current);
        gsap.fromTo(
            cardRef.current,
            { y: 15, opacity: 0, scale: 0.92 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.35,
                ease: "back.out(1.4)",
            }
        );
    });

    const animateClose = contextSafe(() => {
        if (!cardRef.current || !mainIconRef.current) return;

        gsap.to(mainIconRef.current, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
        });

        gsap.killTweensOf(cardRef.current);
        gsap.to(cardRef.current, {
            y: 10,
            opacity: 0,
            scale: 0.95,
            duration: 0.2,
            ease: "power2.in",
        });
    });

    return (
        <div
            ref={containerRef}
            onMouseEnter={() => {
                setIsOpen(true);
                animateOpen();
            }}
            onMouseLeave={() => {
                setIsOpen(false);
                animateClose();
            }}
            className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none"
        >

            <div
                ref={cardRef}
                className={`w-[290px] sm:w-[320px] rounded-3xl border border-stone-200/90 bg-white/95 p-5 shadow-2xl backdrop-blur-xl transition-all duration-200 ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                    }`}
            >

                <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-[#a51d24]">
                        <FiNavigation className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#a51d24]">
                        Encuéntranos Aquí
                    </span>
                </div>

                <h4 className="font-sans text-lg font-bold uppercase tracking-tight text-neutral-900">
                    Cervecería Tenek
                </h4>


                <p className="mt-1 font-sans text-xs text-stone-600 leading-relaxed font-medium">
                    Priv. 6a Sur 2906, Ladrillera de Benítez, C.P. 72530 Heroica Puebla de Zaragoza, Pue.
                </p>


                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="font-sans text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                        Puebla, Pue.
                    </span>
                    <a
                        href={MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-950 px-3.5 py-2 font-sans text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-[#a51d24] active:scale-95"
                    >
                        <span>Cómo Llegar</span>
                        <FiExternalLink className="h-3.5 w-3.5" />
                    </a>
                </div>
            </div>


            <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver ubicación de Cervecería Tenek"
                className="group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#a51d24] text-white shadow-[0_10px_25px_rgba(165,29,36,0.4)] transition-all duration-300 hover:shadow-[0_14px_30px_rgba(165,29,36,0.6)] active:scale-90"
            >

                <span
                    aria-hidden="true"
                    className="absolute -inset-1.5 rounded-full bg-[#a51d24]/30 animate-ping pointer-events-none"
                />


                <div ref={mainIconRef} className="relative z-10 will-change-transform">
                    <IoLocationSharp className="h-7 w-7 sm:h-8 sm:w-8 drop-shadow-sm text-white" />
                </div>
            </a>
        </div>
    );
}