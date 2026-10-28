import Container from "~/components/ui/Container";
import CardFlipGallery, { type CardFlipItem } from "~/components/ui/CardFlipGallery";
import WaveColorShift from "~/components/ui/WaveColorShift";

const dataCards: CardFlipItem[] = [
    {
        id: "mision",
        ariaLabel: "Misión de Cervecería Tenek",
        frontContent: (
            <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-white/90 border border-stone-200/90 shadow-lg backdrop-blur-md transition-all duration-300">

                <div className="relative mb-6 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-neutral-950 p-5 shadow-lg border border-neutral-800">
                    <img
                        src="/images/iconos/mision.png"
                        alt="Ícono Misión"
                        className="h-full w-full object-contain filter drop-shadow-sm"
                        loading="lazy"
                    />
                </div>


                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-[#a51d24]">
                    Propósito
                </span>
                <h3 className="mt-1 font-sans text-3xl font-bold uppercase tracking-tight text-neutral-900">
                    Misión
                </h3>


                <p className="mt-3 font-sans text-xs sm:text-sm text-stone-500 max-w-xs leading-relaxed line-clamp-3">
                    Elaborar cerveza artesanal mexicana de alta calidad con sabores únicos promoviendo la identidad cultural...
                </p>

                <span className="mt-6 text-[10px] font-bold uppercase tracking-widest text-[#a51d24] opacity-80">
                    Toca o pasa el cursor →
                </span>
            </div>
        ),
        backContent: (
            <div
                className="flex h-full w-full flex-col items-center justify-center p-7 sm:p-8 text-center text-white shadow-2xl backdrop-blur-xl border border-white/20"
                style={{ backgroundColor: "#f93eda" }}
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 p-2 mb-3">
                    <img
                        src="/images/iconos/mision.png"
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-contain"
                    />
                </div>

                <h4 className="font-sans text-2xl font-bold uppercase tracking-tight text-white drop-shadow-xs">
                    Misión
                </h4>
                <div className="my-3 h-0.5 w-12 bg-white/60" />

                <p className="font-sans text-xs sm:text-sm leading-relaxed text-white font-medium drop-shadow-xs max-w-xs">
                    Elaborar cerveza artesanal mexicana de alta calidad con sabores únicos
                    promoviendo la identidad cultural de todos los rincones de México,
                    inspirandonos en nuestras culturas y tradiciones ofreciendo historias y
                    experiencias nuevas a nuestros consumidores.
                </p>
            </div>
        ),
    },
    {
        id: "vision",
        ariaLabel: "Visión de Cervecería Tenek",
        frontContent: (
            <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-white/90 border border-stone-200/90 shadow-lg backdrop-blur-md transition-all duration-300">

                <div className="relative mb-6 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-neutral-950 p-5 shadow-lg border border-neutral-800">
                    <img
                        src="/images/iconos/vision.png"
                        alt="Ícono Visión"
                        className="h-full w-full object-contain filter drop-shadow-sm"
                        loading="lazy"
                        onError={(e) => {
                            const target = e.currentTarget;
                            if (target.src.endsWith(".png")) target.src = "/images/iconos/mision.png";
                        }}
                    />
                </div>


                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-[#a51d24]">
                    Horizonte
                </span>
                <h3 className="mt-1 font-sans text-3xl font-bold uppercase tracking-tight text-neutral-900">
                    Visión
                </h3>


                <p className="mt-3 font-sans text-xs sm:text-sm text-stone-500 max-w-xs leading-relaxed line-clamp-3">
                    Ser un referente nacional de la cerveza artesanal mexicana, llevando la esencia y los sabores de México...
                </p>

                <span className="mt-6 text-[10px] font-bold uppercase tracking-widest text-[#a51d24] opacity-80">
                    Toca o pasa el cursor →
                </span>
            </div>
        ),
        backContent: (
            <div
                className="flex h-full w-full flex-col items-center justify-center p-7 sm:p-8 text-center text-white shadow-2xl backdrop-blur-xl border border-white/20"
                style={{ backgroundColor: "#19ab15" }}
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 p-2 mb-3">
                    <img
                        src="/images/iconos/vision.png"
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-contain"
                    />
                </div>

                <h4 className="font-sans text-2xl font-bold uppercase tracking-tight text-white drop-shadow-xs">
                    Visión
                </h4>
                <div className="my-3 h-0.5 w-12 bg-white/60" />

                <p className="font-sans text-xs sm:text-sm leading-relaxed text-white font-medium drop-shadow-xs max-w-xs">
                    Ser un referente nacional de la cerveza artesanal mexicana, llevando la escencia,
                    los sabores y las historias de México a nuevas generaciones de consumidores,
                    construyendo una marca icónica que inspire orgullo por nuestras raices y
                    contribuya al crecimiento de la cultura cervecera del pais.
                </p>
            </div>
        ),
    },
    {
        id: "valores",
        ariaLabel: "Valores de Cervecería Tenek",
        frontContent: (
            <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-white/90 border border-stone-200/90 shadow-lg backdrop-blur-md transition-all duration-300">

                <div className="relative mb-6 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-neutral-950 p-5 shadow-lg border border-neutral-800">
                    <img
                        src="/images/iconos/valores.png"
                        alt="Ícono Valores"
                        className="h-full w-full object-contain filter drop-shadow-sm"
                        loading="lazy"
                        onError={(e) => {
                            const target = e.currentTarget;
                            if (target.src.endsWith(".png")) target.src = "/images/iconos/mision.png";
                        }}
                    />
                </div>


                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-[#a51d24]">
                    Pilares
                </span>
                <h3 className="mt-1 font-sans text-3xl font-bold uppercase tracking-tight text-neutral-900">
                    Valores
                </h3>


                <p className="mt-3 font-sans text-xs sm:text-sm text-stone-500 max-w-xs leading-relaxed line-clamp-3">
                    Innovación, identidad cultural, pasión, calidad, confianza y creatividad en cada proceso.
                </p>

                <span className="mt-6 text-[10px] font-bold uppercase tracking-widest text-[#a51d24] opacity-80">
                    Toca o pasa el cursor →
                </span>
            </div>
        ),
        backContent: (
            <div
                className="flex h-full w-full flex-col items-center justify-center p-7 sm:p-8 text-center text-white shadow-2xl backdrop-blur-xl border border-white/20"
                style={{ backgroundColor: "#8700a3" }}
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 p-2 mb-3">
                    <img
                        src="/images/iconos/valores.png"
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-contain"
                    />
                </div>

                <h4 className="font-sans text-2xl font-bold uppercase tracking-tight text-white drop-shadow-xs">
                    Valores
                </h4>
                <div className="my-3 h-0.5 w-12 bg-white/60" />


                <div className="flex flex-wrap items-center justify-center gap-2 max-w-xs">
                    {[
                        "Innovación",
                        "Identidad cultural",
                        "Pasión",
                        "Calidad",
                        "Confianza",
                        "Creatividad",
                    ].map((valor) => (
                        <span
                            key={valor}
                            className="rounded-full bg-white/20 px-3 py-1 font-sans text-xs font-semibold text-white backdrop-blur-xs border border-white/30 drop-shadow-xs"
                        >
                            {valor}
                        </span>
                    ))}
                </div>
            </div>
        ),
    },
];

export function MisionVisionValores() {
    return (
        <section className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden bg-transparent">

            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[650px] rounded-full bg-[#a51d24]/10 blur-[130px] -z-10"
            />

            <Container>

                <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
                    <span className="font-sans text-xs font-bold uppercase text-[#a51d24]">
                        Identidad Tenek
                    </span>
                    <div className="mt-2">
                        <WaveColorShift
                            as="h1"
                            text="Misión, Visión y Valores"
                            initialColor="#a51d24"
                            yOffset={20}
                            duration={0.6}
                            className="font-sans text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight"
                        />
                    </div>
                </div>


                <CardFlipGallery
                    items={dataCards}
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