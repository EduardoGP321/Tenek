import { useEffect, useRef, useMemo } from "react";
import type { AcademiaArticulo } from "~/types";
import { gsap, useGSAP } from "~/utils/gsap";
import { FiX, FiCalendar, FiTag, FiList, FiGrid } from "react-icons/fi";
import DOMPurify from 'isomorphic-dompurify';

interface AcademiaModalProps {
    articulo: AcademiaArticulo | null;
    onClose: () => void;
}

/**
 * Función que analiza el HTML del CMS y distingue semánticamente:
 * - Subtítulos/Títulos de sección reales (los convierte a <h3> / <h4>)
 * - Párrafos con énfasis o negritas normales (los deja como <p><strong>)
 */
function processContentSemantics(html: string): string {
    if (!html) return "";

    return html.replace(/<p>\s*<strong>(.*?)<\/strong>\s*<\/p>/gi, (match, innerText) => {
        const cleanText = innerText.replace(/<[^>]*>/g, "").trim();

        if (cleanText.endsWith(":")) {
            return match;
        }

        const isNumberedHeading = /^(\d+\.|\bpaso\s+\d+|\bfase\s+\d+)/i.test(cleanText);
        const isQuestionHeading = /^¿[A-Z0-9\s,.-]+(cerveza|catar|estilos|negocio|mercado)\?$/i.test(cleanText);
        const isSectionHeader = /^(un ejercicio sencillo|conoce cervecería|convierte a la cerveza|la cerveza artesanal también)/i.test(cleanText);

        if (isNumberedHeading || isQuestionHeading || isSectionHeader) {
            return `<h3 class="font-sans text-xl sm:text-2xl font-bold text-neutral-900 mt-10 mb-3 tracking-tight text-left not-prose">${innerText}</h3>`;
        }

        const isShortTitle = cleanText.length < 55 && !cleanText.endsWith(".");
        if (isShortTitle && !cleanText.includes(",")) {
            return `<h4 class="font-sans text-lg sm:text-xl font-bold text-neutral-800 mt-7 mb-2 tracking-tight text-left not-prose">${innerText}</h4>`;
        }

        return match;
    });
}

export function AcademiaModal({ articulo, onClose }: AcademiaModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const formattedContent = useMemo(() => {
        if (!articulo) return "";
        return processContentSemantics(articulo.contenido);
    }, [articulo?.contenido]);

    useGSAP(
        () => {
            if (!articulo || !overlayRef.current || !panelRef.current) return;

            const tl = gsap.timeline();
            tl.fromTo(
                overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: "power2.out" }
            ).fromTo(
                panelRef.current,
                { y: 35, opacity: 0, scale: 0.97 },
                { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.2)" },
                "-=0.15"
            );
        },
        { dependencies: [articulo] }
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (articulo) {
            const originalOverflow = document.body.style.overflow;
            const originalPaddingRight = document.body.style.paddingRight;
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            }
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);

            return () => {
                document.body.style.overflow = originalOverflow;
                document.body.style.paddingRight = originalPaddingRight;
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [articulo, onClose]);

    if (!articulo) return null;

    const tieneTabla = articulo.contenido.includes("<table");
    const tieneLista = articulo.contenido.includes("<ul") || articulo.contenido.includes("<ol");
    const isDistribuidor = articulo.tipo.toLowerCase() === "distribuidor";

    const fecha = new Date(articulo.fecha_publicacion).toLocaleDateString("es-MX", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            onClick={onClose}
            onWheel={(e) => e.stopPropagation()}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6 md:p-10 backdrop-blur-md"
        >
            <div
                ref={panelRef}
                onClick={(e) => e.stopPropagation()}
                className={`relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-white/20 bg-white/98 shadow-2xl backdrop-blur-xl transition-all duration-300 ${tieneTabla ? "max-w-4xl" : "max-w-3xl"
                    }`}
            >

                <div
                    className={`h-2 w-full shrink-0 ${isDistribuidor ? "bg-amber-600" : "bg-[#a51d24]"
                        }`}
                />


                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-700 shadow-md transition-all duration-200 hover:scale-110 hover:bg-stone-200 cursor-pointer"
                    aria-label="Cerrar lectura"
                >
                    <FiX className="h-5 w-5" />
                </button>


                <div
                    ref={scrollContainerRef}
                    data-lenis-prevent="true"
                    onWheel={(e) => e.stopPropagation()}
                    className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-10"
                >

                    {articulo.imagen_url && (
                        <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-inner">
                            <img
                                src={
                                    articulo.imagen_url.startsWith("http")
                                        ? articulo.imagen_url
                                        : `/${articulo.imagen_url}`
                                }
                                alt={articulo.titulo}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    )}


                    <div className="mb-4 flex flex-wrap items-center gap-2.5">
                        <span
                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-widest ${isDistribuidor
                                ? "border border-amber-300 bg-amber-100 text-amber-900"
                                : "border border-red-200 bg-red-50 text-[#a51d24]"
                                }`}
                        >
                            <FiTag className="h-3 w-3" />
                            {articulo.tipo}
                        </span>

                        <time className="flex items-center gap-1 font-sans text-xs text-stone-500 font-medium">
                            <FiCalendar className="h-3.5 w-3.5" />
                            {fecha}
                        </time>

                        {tieneTabla && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-0.5 font-sans text-[10px] font-semibold text-stone-600 border border-stone-200">
                                <FiGrid className="h-3 w-3 text-amber-600" />
                                Tabla comparativa
                            </span>
                        )}
                        {tieneLista && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-0.5 font-sans text-[10px] font-semibold text-stone-600 border border-stone-200">
                                <FiList className="h-3 w-3 text-[#a51d24]" />
                                Guía paso a paso
                            </span>
                        )}
                    </div>


                    <h2 className="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
                        {articulo.titulo}
                    </h2>

                    <div className="my-6 h-px w-full bg-stone-200" />

                    {/* 
            CONTENIDO WYSIWYG PROCESADO:
            - Los párrafos normales son estrictamente text-justify
            - Las negritas (strong) dentro de párrafos permanecen normales
            - Los encabezados identificados quedan con text-left y estilo de titular
          */}
                    <div
                        className="prose prose-stone max-w-none 
              /* PÁRRAFOS JUSTIFICADOS */
              [&_p]:text-justify [&_p]:[text-justify:inter-word] [&_p]:text-stone-700 
              [&_p]:leading-relaxed [&_p]:text-sm sm:[&_p]:text-base [&_p]:my-4
              
              /* NEGRITAS NORMALES DENTRO DEL TEXTO (No se deforman a títulos) */
              [&_strong]:font-bold [&_strong]:text-neutral-950

              /* ENCABEZADOS NATIVOS (H2, H3, H4) */
              [&_h2]:font-sans [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-neutral-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-left
              [&_h3]:font-sans [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-neutral-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-left
              [&_h4]:font-sans [&_h4]:text-lg sm:[&_h4]:text-xl [&_h4]:font-bold [&_h4]:text-neutral-900 [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-left

              /* LISTAS */
              [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:text-left
              [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:text-left
              [&_li]:text-stone-700 [&_li]:text-sm sm:[&_li]:text-base [&_li]:leading-relaxed
              [&_li::marker]:text-[#a51d24] [&_li::marker]:font-bold
              [&_li_p]:inline [&_li_p]:m-0 [&_li_p]:text-left

              /* TABLAS */
              [&_table]:my-8 [&_table]:w-full [&_table]:border-collapse 
              [&_table]:rounded-2xl [&_table]:border [&_table]:border-stone-300 
              [&_table]:overflow-hidden [&_table]:shadow-sm [&_table]:text-left
              [&_tr:first-child]:bg-stone-100/90 [&_tr:first-child]:border-b [&_tr:first-child]:border-stone-300
              [&_tr:first-child_td]:text-neutral-900 [&_tr:first-child_td]:font-bold [&_tr:first-child_td]:uppercase [&_tr:first-child_td]:text-xs [&_tr:first-child_td]:tracking-wider
              [&_tr:not(:first-child):hover]:bg-stone-50/70
              [&_td]:p-3.5 sm:[&_td]:p-4.5 [&_td]:border [&_td]:border-stone-200 
              [&_td]:text-xs sm:[&_td]:text-sm [&_td]:text-stone-700 [&_td]:align-top
              [&_td_p]:m-0 [&_td_p]:leading-normal [&_td_p]:text-left"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formattedContent) }}
                    />
                </div>
            </div>
        </div>
    );
}