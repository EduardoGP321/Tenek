import type { AcademiaArticulo } from "~/types";
import { FiCalendar, FiArrowRight } from "react-icons/fi";

interface AcademiaCarouselCardProps {
    articulo: AcademiaArticulo;
    onSelect: (articulo: AcademiaArticulo) => void;
}

export function AcademiaCarouselCard({ articulo, onSelect }: AcademiaCarouselCardProps) {
    const isDistribuidor = articulo.tipo.toLowerCase() === "distribuidor";
    const fecha = new Date(articulo.fecha_publicacion).toLocaleDateString("es-MX", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        
        <article
            onClick={() => onSelect(articulo)}
            className="group relative mx-3 sm:mx-4 flex h-[440px] w-[300px] sm:w-[350px] shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-stone-200/90 bg-white/95 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-stone-300 hover:shadow-2xl"
        >

            <div
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 h-1.5 ${isDistribuidor ? "bg-[#21cff7]" : "bg-[#19a515]"
                    }`}
                    
            />
            
            <div>
                
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-stone-200 bg-stone-100">
                
                    {articulo.imagen_url ? (
                        <img
                            src={
                                articulo.imagen_url.startsWith("http")
                                    ? articulo.imagen_url
                                    : `/${articulo.imagen_url}`
                            }
                            alt={articulo.titulo}
                            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-stone-400">
                            Cervecería Tenek
                        </div>
                    )}
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-stone-500">
                    <time className="flex items-center gap-1 font-medium">
                        <FiCalendar className="h-3 w-3" />
                        {fecha}
                    </time>
                    <span
                        className={`rounded-full px-2.5 py-0.5 font-sans text-[9px] font-bold uppercase tracking-wider ${isDistribuidor
                            ? "bg-amber-100 text-amber-900"
                            : "bg-red-50 text-[#a51d24]"
                            }`}
                    >
                        {articulo.tipo}
                    </span>
                </div>

                <h3 className="mt-2.5 font-sans text-lg sm:text-xl font-bold tracking-tight text-neutral-900 line-clamp-2 leading-snug">
                    {articulo.titulo}
                </h3>

                <p className="mt-2 font-sans text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                    {articulo.extracto}
                </p>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#a51d24] group-hover:underline">
                    Leer Artículo
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-stone-700 transition-colors duration-300 group-hover:bg-[#a51d24] group-hover:text-white">
                    <FiArrowRight className="h-3.5 w-3.5" />
                </span>
            </div>
        </article>
    );
}