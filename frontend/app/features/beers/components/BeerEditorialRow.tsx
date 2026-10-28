import { useRef } from "react";
import WordbyWordBuild from "~/components/ui/WordbyWordBuild";
import WaveColorShift from "~/components/ui/WaveColorShift";
import type { Cerveza } from "~/types";
import { gsap, ScrollTrigger, useGSAP } from "~/utils/gsap";

interface BeerEditorialRowProps {
  cerveza: Cerveza;
  index: number;
}

export function BeerEditorialRow({ cerveza, index }: BeerEditorialRowProps) {
  const rowRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bottleImgRef = useRef<HTMLImageElement>(null);
  const archGlassRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  const beerColor = cerveza.color_hex || "#0284C7";
  const hasAbv = typeof cerveza.contenido_alcoholico === "number" && cerveza.contenido_alcoholico > 0;
  const hasIbu = typeof cerveza.amargor === "number" && cerveza.amargor > 0;
  const hasSrm = typeof cerveza.color_srm === "number" && cerveza.color_srm > 0;
  const hasTechnicalInfo = hasAbv || hasIbu || hasSrm;

  useGSAP(
    () => {
      if (!rowRef.current || !bottleImgRef.current || !archGlassRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const desktopTl = gsap.timeline({
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 90%",
            end: "bottom 10%",
            scrub: 1.2,
          },
        });

        desktopTl
          .fromTo(
            bottleImgRef.current,
            { clipPath: "inset(100% 0% 0% 0%)", y: 40, scale: 0.96 },
            { clipPath: "inset(0% 0% 0% 0%)", y: 0, scale: 1, duration: 1, ease: "power1.out" }
          )
          .to(
            archGlassRef.current,
            {
              backgroundColor: `${beerColor}35`,
              boxShadow: `inset 0 0 55px ${beerColor}60`,
              duration: 0.8,
              ease: "none",
            },
            0.4
          )
          .to(
            bottleImgRef.current,
            {
              clipPath: "inset(0% 0% 100% 0%)",
              y: -35,
              scale: 0.98,
              duration: 1,
              ease: "power1.in",
            },
            1.4
          );
      });

      mm.add("(min-width: 769px) and (max-width: 1023px)", () => {
        const tabletTl = gsap.timeline({
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 85%",
            end: "bottom 15%",
            scrub: 1,
          },
        });

        tabletTl
          .fromTo(
            bottleImgRef.current,
            { clipPath: "inset(70% 0% 0% 0%)", y: 25 },
            { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 1, ease: "none" }
          )
          .to(
            bottleImgRef.current,
            { clipPath: "inset(0% 0% 80% 0%)", y: -20, duration: 1, ease: "none" },
            1.2
          );
      });

      mm.add("(max-width: 768px)", () => {
        gsap.fromTo(
          bottleImgRef.current,
          { clipPath: "inset(35% 0% 0% 0%)", y: 20 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: rowRef.current,
              start: "top 85%",
              end: "center center",
              scrub: true,
            },
          }
        );

        gsap.to(archGlassRef.current, {
          backgroundColor: `${beerColor}25`,
          ease: "none",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 75%",
            end: "center center",
            scrub: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: rowRef }
  );

  return (
    <article
      ref={rowRef}
      className="beer-row relative w-full py-6 sm:py-8 lg:py-10"
      data-color={beerColor}
    >

      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-[2.5rem] p-6 sm:p-10 lg:p-14 shadow-xl backdrop-blur-xl transition-all duration-300 will-change-[transform,opacity]"
        style={{
          backgroundColor: `${beerColor}30`,
          boxShadow: `0 20px 50px -15px ${beerColor}60, 0 0 0 1px ${beerColor}18`,
        }}
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div
            className={`flex justify-center items-center lg:col-span-5 ${isEven ? "order-1 lg:order-1" : "order-1 lg:order-2"
              }`}
          >
            <div className="relative w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[330px]">
              <div className="relative aspect-[621/1100] w-full overflow-hidden rounded-t-[150px] rounded-b-3xl border-2 border-stone-200/80 shadow-md">
                <img
                  src="/images/cervezas/fondo_cervezas.webp"
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-80"
                />

                <div
                  ref={archGlassRef}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 transition-all duration-700"
                  style={{
                    backgroundColor: `${beerColor}60`,
                    boxShadow: `inset 0 0 50px ${beerColor}40`,
                  }}
                />


                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-6 h-36 w-full opacity-40 blur-2xl mix-blend-screen"
                  style={{ backgroundColor: beerColor }}
                />

                <div className="relative z-10 flex h-full w-full items-center justify-center p-4">
                  <div className="relative aspect-[621/1920] h-full max-h-[92%] w-full flex items-center justify-center">
                    {cerveza.imagen_botella_url ? (
                      <img
                        ref={bottleImgRef}
                        src={cerveza.imagen_botella_url}
                        alt={`Cerveza ${cerveza.nombre}`}
                        className="h-full w-full object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.5)] will-change-[clip-path,transform]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-44 w-20 items-center justify-center rounded-2xl border border-dashed border-white/40 bg-black/30 text-xs text-white/60">
                        Sin imagen
                      </div>
                    )}
                  </div>
                </div>
              </div>


              {cerveza.estilo && (
                <div
                  className={`absolute -bottom-4 z-20 flex min-h-[5.5rem] min-w-[5.5rem] sm:min-h-[6.5rem] sm:min-w-[6.5rem] max-w-[140px] sm:max-w-[170px] flex-col items-center justify-center rounded-full border-2 border-stone-100 bg-white/95 px-3.5 py-3 text-center shadow-[0_12px_30px_rgba(0,0,0,0.12)] ring-1 ring-stone-900/5 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${isEven
                    ? "-right-3 sm:-right-5 -rotate-3 hover:rotate-0"
                    : "-left-3 sm:-left-5 rotate-3 hover:rotate-0"
                    }`}
                >
                  <div className="pointer-events-none absolute inset-1 rounded-full border border-dashed border-stone-300/80" />

                  <div className="relative z-10 flex items-center gap-1.5">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: beerColor }}
                    />
                    <span className="font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">
                      Estilo
                    </span>
                  </div>

                  <span className="relative z-10 mt-1 font-sans text-xs sm:text-[13px] font-extrabold uppercase leading-snug tracking-tight text-neutral-900">
                    {cerveza.estilo}
                  </span>
                </div>
              )}
            </div>
          </div>




          <div
            className={`space-y-6 lg:col-span-7 ${isEven ? "order-2 lg:order-2 text-left" : "order-2 lg:order-1 text-left lg:text-right"
              }`}
          >

            <div
              className={`flex flex-wrap items-center gap-4 ${isEven ? "justify-start" : "justify-start lg:justify-end"
                }`}
            >
              <WaveColorShift
                as="h2"
                text={cerveza.nombre}
                initialColor="#a51d24"
                yOffset={25}
                duration={0.6}
                stagger={0.03}
                className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight uppercase leading-none"
                style={{ color: beerColor }}
              />

              {cerveza.medallas_urls && cerveza.medallas_urls.length > 0 && (
                <div className="flex items-center gap-1.5">
                  {cerveza.medallas_urls.map((medalla, i) => (
                    <img
                      key={i}
                      src={medalla}
                      alt="Medalla"
                      className="h-8 w-8 sm:h-10 sm:w-10 object-contain drop-shadow-sm"
                    />
                  ))}
                </div>
              )}
            </div>


            {cerveza.descripcion && (
              <WordbyWordBuild
                text={cerveza.descripcion}
                stagger={0.015}
                duration={0.35}
                delay={0.05}
                className="font-sans text-base sm:text-lg lg:text-xl text-stone-800 leading-relaxed"
              />
            )}


            {cerveza.maridaje && (
              <div className="space-y-1">
                <span className="block font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-neutral-900">
                  Maridaje:
                </span>
                <WordbyWordBuild
                  text={cerveza.maridaje}
                  stagger={0.015}
                  duration={0.35}
                  delay={0.05}
                  className="font-sans text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl"
                />
              </div>
            )}


            {hasTechnicalInfo && (
              <div className="space-y-1.5">
                <span className="block font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-neutral-900">
                  Información Técnica:
                </span>
                <div className="font-sans text-xs sm:text-sm text-stone-600 space-y-1">
                  {hasAbv && (
                    <div className={`flex items-center gap-1.5 ${isEven ? "justify-start" : "justify-start lg:justify-end"}`}>
                      <WordbyWordBuild
                        as="span"
                        text={`Contenido Alc: ${cerveza.contenido_alcoholico}%`}
                        stagger={0.02}
                        duration={0.3}
                        className="font-sans text-xs sm:text-sm text-stone-700"
                      />
                    </div>
                  )}
                  {hasIbu && (
                    <div className={`flex items-center gap-1.5 ${isEven ? "justify-start" : "justify-start lg:justify-end"}`}>
                      <WordbyWordBuild
                        as="span"
                        text={`Amargor: ${cerveza.amargor} IBU's`}
                        stagger={0.02}
                        duration={0.3}
                        className="font-sans text-xs sm:text-sm text-stone-700"
                      />
                    </div>
                  )}
                  {hasSrm && (
                    <div className={`flex items-center gap-1.5 ${isEven ? "justify-start" : "justify-start lg:justify-end"}`}>
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full border border-black/15 shadow-2xs shrink-0"
                        style={{ backgroundColor: beerColor }}
                      />
                      <WordbyWordBuild
                        as="span"
                        text={`Color: ${cerveza.color_srm} SRM`}
                        stagger={0.02}
                        duration={0.3}
                        className="font-sans text-xs sm:text-sm text-stone-700"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}


            {cerveza.presentaciones && cerveza.presentaciones.length > 0 && (
              <div className="space-y-1.5">
                <span className="block font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-neutral-900">
                  Presentaciones:
                </span>
                <ul className="font-sans text-xs sm:text-sm text-stone-600 space-y-1">
                  {cerveza.presentaciones.map((pres, idx) => (
                    <li key={idx} className="leading-snug">
                      <WordbyWordBuild
                        as="span"
                        text={pres}
                        stagger={0.02}
                        duration={0.3}
                        className="font-sans text-xs sm:text-sm text-stone-700"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

        </div>
      </div>
    </article>
  );
}