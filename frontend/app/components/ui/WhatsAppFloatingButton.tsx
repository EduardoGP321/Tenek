import { useState, useRef } from "react";
import { useLocation } from "react-router";
import { FaWhatsapp } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { gsap, useGSAP } from "~/utils/gsap";

const WHATSAPP_PHONE = "522225987597";

interface WhatsAppOption {
    label: string;
    message: string;
}

const whatsappOptions: WhatsAppOption[] = [
    {
        label: "Quiero distribuir Tenek",
        message: "Hola Cervecería Tenek, me interesa recibir información para distribuir sus cervezas en mi negocio.",
    },
    {
        label: "Conocer nuestras cervezas",
        message: "Hola Cervecería Tenek, me gustaría conocer más sobre sus estilos de cerveza disponibles y fichas técnicas.",
    },
    {
        label: "Contactar un asesor comercial",
        message: "Hola, me gustaría hablar directamente con un asesor comercial de Cervecería Tenek.",
    },
];

export default function WhatsAppFloatingButton() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const pillGroupRef = useRef<HTMLDivElement>(null);
    const mainIconRef = useRef<HTMLDivElement>(null);

    const isHomePage = location.pathname === "/";

    const { contextSafe } = useGSAP({ scope: containerRef });

    const animateOpen = contextSafe(() => {
        if (!pillGroupRef.current || !mainIconRef.current) return;

        gsap.to(mainIconRef.current, {
            rotate: 15,
            scale: 1.08,
            duration: 0.3,
            ease: "power2.out",
        });

        const pills = pillGroupRef.current.querySelectorAll(".wa-pill");
        gsap.killTweensOf(pills);
        gsap.fromTo(
            pills,
            { y: 15, opacity: 0, scale: 0.9 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: -0.06,
                duration: 0.35,
                ease: "back.out(1.5)",
            }
        );
    });

    const animateClose = contextSafe(() => {
        if (!pillGroupRef.current || !mainIconRef.current) return;

        gsap.to(mainIconRef.current, {
            rotate: 0,
            scale: 1,
            duration: 0.25,
            ease: "power2.out",
        });

        const pills = pillGroupRef.current.querySelectorAll(".wa-pill");
        gsap.killTweensOf(pills);
        gsap.to(pills, {
            y: 10,
            opacity: 0,
            scale: 0.95,
            duration: 0.2,
            stagger: 0.04,
            ease: "power2.in",
        });
    });

    const handleMouseEnter = () => {
        setIsOpen(true);
        animateOpen();
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
        animateClose();
    };

    if (!isHomePage) return null;

    return (
        <div
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none"
        >

            <div
                ref={pillGroupRef}
                className={`flex flex-col items-end gap-2.5 transition-all duration-300 ${isOpen ? "pointer-events-auto" : "pointer-events-none"
                    }`}
            >
                {whatsappOptions.map((opt, idx) => {
                    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                        opt.message
                    )}`;

                    return (
                        <a
                            key={idx}
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`wa-pill group flex items-center gap-2.5 rounded-full border border-stone-200/90 bg-white/95 px-4 py-2.5 shadow-xl backdrop-blur-md transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50/90 hover:scale-[1.03] active:scale-95 ${isOpen ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            <span className="font-sans text-xs font-bold tracking-tight text-neutral-800 transition-colors group-hover:text-emerald-950">
                                {opt.label}
                            </span>
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                                <FiArrowUpRight className="h-3.5 w-3.5" />
                            </span>
                        </a>
                    );
                })}
            </div>


            <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                    "Hola Cervecería Tenek, me gustaría recibir información."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp"
                className="group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_25px_rgba(37,211,102,0.4)] transition-all duration-300 hover:shadow-[0_14px_30px_rgba(37,211,102,0.55)] active:scale-90"
            >

                <span
                    aria-hidden="true"
                    className="absolute -inset-1.5 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none"
                />


                <div ref={mainIconRef} className="relative z-10 will-change-transform">
                    <FaWhatsapp className="h-7 w-7 sm:h-8 sm:w-8 drop-shadow-sm" />
                </div>
            </a>
        </div>
    );
}