import Container from "~/components/ui/Container";
import CardFlipGallery, { type CardFlipItem } from "~/components/ui/CardFlipGallery";
import WaveColorShift from "~/components/ui/WaveColorShift";
import WordbyWordBuild from "~/components/ui/WordbyWordBuild";

import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";

const direccionMaps = encodeURIComponent(
    "Priv. 6a Sur 2906, Ladrillera de Benítez, 72530 Heroica Puebla de Zaragoza, Pue."
);

const contactCardsData: CardFlipItem[] = [
    {
        id: "whatsapp",
        ariaLabel: "Contáctanos por WhatsApp",
        frontContent: (
            <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-white/95 border border-stone-200/90 shadow-xl backdrop-blur-md transition-all duration-300">
                <div className="relative mb-6 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-inner">
                    <FaWhatsapp className="h-12 w-12 sm:h-14 sm:w-14 drop-shadow-xs" />
                </div>

                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-600">
                    Atención Inmediata
                </span>
                <h3 className="mt-1 font-sans text-3xl font-bold uppercase tracking-tight text-neutral-900">
                    WhatsApp
                </h3>

                <p className="mt-3 font-sans text-xs sm:text-sm text-stone-500 max-w-xs leading-relaxed">
                    Cotizaciones, pedidos de barril, eventos y dudas directas.
                </p>

                <span className="mt-6 text-[10px] font-bold uppercase tracking-widest text-emerald-600 opacity-90">
                    Gira para escribirnos →
                </span>
            </div>
        ),
        backContent: (
            <div
                className="flex h-full w-full flex-col items-center justify-center p-7 sm:p-8 text-center text-white shadow-2xl backdrop-blur-xl border border-white/20"
                style={{ backgroundColor: "#16a34a" }}
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 p-2.5 mb-2">
                    <FaWhatsapp className="h-7 w-7 text-white drop-shadow-xs" />
                </div>

                <h4 className="font-sans text-2xl font-bold uppercase tracking-tight text-white">
                    Chatea con Nosotros
                </h4>
                <div className="my-2 h-0.5 w-12 bg-white/60" />

                <p className="font-sans text-xs sm:text-sm text-emerald-50 leading-relaxed max-w-xs mb-2 font-medium">
                    Escríbenos directamente a nuestra línea de atención cervecera:
                </p>

                <span className="font-sans text-lg font-extrabold tracking-wide text-white mb-5">
                    222 598 7597
                </span>

                <a
                    href="https://wa.me/522225987597?text=Hola%20Cervecer%C3%ADa%20Tenek,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-sans text-xs font-bold uppercase tracking-widest text-emerald-700 shadow-lg hover:bg-stone-100 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                    <span>Iniciar Chat</span>
                    <FiExternalLink className="h-4 w-4" />
                </a>
            </div>
        ),
    },

    {
        id: "email",
        ariaLabel: "Contáctanos por Correo Electrónico",
        frontContent: (
            <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-white/95 border border-stone-200/90 shadow-xl backdrop-blur-md transition-all duration-300">
                <div className="relative mb-6 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-amber-50 text-amber-500 border border-amber-200 shadow-inner">
                    <HiOutlineMail className="h-12 w-12 sm:h-14 sm:w-14 drop-shadow-xs" />
                </div>

                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-amber-600">
                    Contacto Formal
                </span>
                <h3 className="mt-1 font-sans text-3xl font-bold uppercase tracking-tight text-neutral-900">
                    Correo
                </h3>

                <p className="mt-3 font-sans text-xs sm:text-sm text-stone-500 max-w-xs leading-relaxed">
                    Propuestas comerciales, alianzas de marca, distribución y prensa.
                </p>

                <span className="mt-6 text-[10px] font-bold uppercase tracking-widest text-amber-600 opacity-90">
                    Gira para redactar →
                </span>
            </div>
        ),
        backContent: (
            <div
                className="flex h-full w-full flex-col items-center justify-center p-6 sm:p-7 text-center text-white shadow-2xl backdrop-blur-xl border border-white/20"
                style={{ backgroundColor: "#d97706" }}
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 p-2.5 mb-2">
                    <HiOutlineMail className="h-7 w-7 text-white drop-shadow-xs" />
                </div>

                <h4 className="font-sans text-2xl font-bold uppercase tracking-tight text-white">
                    Escríbenos
                </h4>
                <div className="my-2 h-0.5 w-12 bg-white/60" />

                <p className="font-sans text-xs text-amber-100 mb-4">
                    Selecciona el correo al que deseas enviar tu mensaje:
                </p>

                <div className="w-full flex flex-col gap-2.5 max-w-[280px]">
                    <a
                        href="mailto:contacto@cerveceriatenek.com"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-between rounded-xl bg-white px-3.5 py-2.5 font-sans text-[11px] font-bold text-amber-900 shadow-md hover:bg-stone-100 active:scale-95 transition-all"
                    >
                        <span className="truncate">contacto@cerveceriatenek.com</span>
                        <FiExternalLink className="h-3.5 w-3.5 shrink-0 ml-1.5" />
                    </a>

                    <a
                        href="mailto:contacto@tenekbeer.com"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-between rounded-xl bg-white/90 px-3.5 py-2.5 font-sans text-[11px] font-bold text-amber-900 shadow-md hover:bg-white active:scale-95 transition-all"
                    >
                        <span className="truncate">contacto@tenekbeer.com</span>
                        <FiExternalLink className="h-3.5 w-3.5 shrink-0 ml-1.5" />
                    </a>
                </div>
            </div>
        ),
    },

    {
        id: "ubicacion",
        ariaLabel: "Nuestra Ubicación en Puebla",
        frontContent: (
            <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-white/95 border border-stone-200/90 shadow-xl backdrop-blur-md transition-all duration-300">
                <div
                    className="relative mb-6 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full border shadow-inner"
                    style={{
                        backgroundColor: "#8700a312",
                        color: "#8700a3",
                        borderColor: "#8700a330",
                    }}
                >
                    <IoLocationOutline className="h-12 w-12 sm:h-14 sm:w-14 drop-shadow-xs" />
                </div>

                <span
                    className="font-sans text-[10px] font-bold uppercase tracking-[0.25em]"
                    style={{ color: "#8700a3" }}
                >
                    Punto de Encuentro
                </span>
                <h3 className="mt-1 font-sans text-3xl font-bold uppercase tracking-tight text-neutral-900">
                    Ubicación
                </h3>

                <p className="mt-3 font-sans text-xs sm:text-sm text-stone-500 max-w-xs leading-relaxed">
                    Heroica Puebla de Zaragoza, Puebla, México.
                </p>

                <span
                    className="mt-6 text-[10px] font-bold uppercase tracking-widest opacity-90"
                    style={{ color: "#8700a3" }}
                >
                    Gira para ver la dirección →
                </span>
            </div>
        ),
        backContent: (
            <div
                className="flex h-full w-full flex-col items-center justify-center p-6 sm:p-7 text-center text-white shadow-2xl backdrop-blur-xl border border-white/20"
                style={{ backgroundColor: "#8700a3" }}
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 p-2.5 mb-2">
                    <IoLocationOutline className="h-7 w-7 text-white drop-shadow-xs" />
                </div>

                <h4 className="font-sans text-2xl font-bold uppercase tracking-tight text-white">
                    Cervecería Tenek
                </h4>
                <div className="my-2 h-0.5 w-12 bg-white/60" />

                <address className="not-italic font-sans text-xs sm:text-sm text-purple-100 leading-snug max-w-xs mb-5 font-medium">
                    Priv. 6a Sur 2906, Ladrillera de Benítez,<br />
                    C.P. 72530 Heroica Puebla de Zaragoza, Pue.
                </address>

                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${direccionMaps}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-sans text-xs font-bold uppercase tracking-widest text-[#8700a3] shadow-lg hover:bg-stone-100 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                    <span>Abrir en Maps</span>
                    <FiExternalLink className="h-4 w-4" />
                </a>
            </div>
        ),
    },
];

export function ContactCardsSection() {
    return (
        <section className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden bg-transparent">

            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[650px] rounded-full bg-[#a51d24]/10 blur-[130px] -z-10"
            />

            <Container>

                <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">

                    <div className="mt-2">
                        <WaveColorShift
                            as="h1"
                            text="Estamos a un Clic"
                            initialColor="#a51d24"
                            yOffset={20}
                            duration={0.6}
                            className="font-sans text-3xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight"
                        />
                    </div>
                    <WordbyWordBuild
                        text="Elige el medio de contacto de tu preferencia y nuestro equipo se comunicará contigo a la brevedad."
                        stagger={0.015}
                        duration={0.35}
                        delay={0.1}
                        className="mt-4 font-sans text-stone-600 text-sm sm:text-base leading-relaxed"
                    />
                </div>


                <CardFlipGallery
                    items={contactCardsData}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 justify-items-center"
                    cardWidthClass="w-full max-w-[340px] sm:max-w-[360px]"
                    cardHeightClass="h-[430px] sm:h-[460px]"
                    perspective={1200}
                    duration={0.7}
                />
            </Container>
        </section>
    );
}