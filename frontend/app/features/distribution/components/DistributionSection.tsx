import Container from "~/components/ui/Container";
import WaveColorShift from "~/components/ui/WaveColorShift";
import InfiniteLoopCarousel from "~/components/ui/InfiniteLoopCarousel";
import ClipPathImage from "~/components/ui/ClipPathImage";
import WordbyWordBuild from "~/components/ui/WordbyWordBuild";
import WavesBackground from "~/components/ui/WavesBackground";
import ShineButton from "~/components/ui/ShineButton";
import SeamlessInfiniteScroll from "~/components/ui/SeamlessInfiniteScroll";

const ICONOS_DISTRIBUCION = [
    { id: 1, src: "/images/iconos/bolsa_de_dinero.png", titulo: "Márgenes comerciales competitivos." },
    { id: 2, src: "/images/iconos/cerveza.png", titulo: "Portafolio de cervezas artesanales con identidad mexicana." },
    { id: 3, src: "/images/iconos/libro.png", titulo: "Capacitación en producto, maridaje y venta consultiva." },
    { id: 4, src: "/images/iconos/camion.png", titulo: "Abasto confiable y crecimiento conjunto." },
    { id: 5, src: "/images/iconos/apreton_de_manos.png", titulo: "Acompañamiento comercial y atención personalizada." },
    { id: 6, src: "/images/iconos/estrategia.png", titulo: "Material de marketing y apoyo para activaciones." },
];

const imagenes = [
    "/images/distribuye/carrusel/1.png",
    "/images/distribuye/carrusel/2.png",
    "/images/distribuye/carrusel/3.png",
    "/images/distribuye/carrusel/4.png",
    "/images/distribuye/carrusel/5.png",
];

const PARRAFOS_DISTRIBUCION = [
    "En TENEK buscamos aliados comerciales que compartan nuestra pasión por ofrecer productos auténticos y de alta calidad. Más que distribuir cerveza artesanal, tendrás la oportunidad de representar una marca mexicana con identidad propia, inspirada en la riqueza cultural y las tradiciones de nuestro país.",
    "En TENEK buscamos aliados comerciales que compartan nuestra pasión por ofrecer productos auténticos y de alta calidad. Más que distribuir cerveza artesanal, tendrás la oportunidad de representar una marca mexicana con identidad propia, inspirada en la riqueza cultural y las tradiciones de nuestro país.",
    "Al convertirte en distribuidor TENEK contarás con una marca premium que protege tus márgenes, respaldo comercial para impulsar tus ventas y una propuesta diferenciada que destaca en restaurantes, bares, hoteles y tiendas especializadas. Además, buscamos desarrollar relaciones de largo plazo mediante zonas estratégicas de distribución y acompañamiento constante para hacer crecer tu negocio.",
    "En un mercado donde muchas cervezas compiten por precio, TENEK compite por historia, calidad y experiencia. Eso significa clientes que descubren la marca, regresan por ella y la recomiendan.",
    "Haz crecer tu portafolio con una cerveza artesanal que representa lo mejor de México y conviértete en parte de una red de distribuidores que apuesta por la rentabilidad, la diferenciación y el orgullo de compartir una marca con identidad.",
];

export default function DistributionSection() {
    return (
        <div className="w-full text-neutral-900">

            <section className="relative w-full overflow-hidden bg-transparent">
                <div className="relative w-full aspect-[1921/473] min-h-[360px] sm:min-h-[420px]">
                    <img
                        src="/images/distribuye/distribuye_tenek.webp"
                        alt="Distribuye Tenek - Socio Comercial"
                        width={1921}
                        height={473}
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        loading="eager"
                    />

                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-neutral-950/85 via-neutral-950/30 to-transparent"
                    />

                    <div className="relative z-10 flex h-full w-full items-center justify-start">
                        <Container className="w-full !px-4 sm:!px-6 md:!px-8 lg:!px-12">
                            <div className="w-full max-w-md text-left sm:max-w-xl lg:max-w-2xl">
                                <div className="mt-3 w-full text-left sm:mt-3">
                                    <WaveColorShift
                                        as="h1"
                                        text="Conviértete en socio comercial de Tenek"
                                        initialColor="#A51D24"
                                        yOffset={40}
                                        duration={0.6}
                                        stagger={0.03}
                                        className="font-sans text-3xl  text-white drop-shadow-md text-left sm:text-4xl md:text-6xl lg:text-7xl"
                                    />
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
            </section>


            <section className="w-full py-8 sm:py-16 overflow-hidden">

                <div className="relative z-10 w-full">
                    <InfiniteLoopCarousel speed={35} gap={24} pauseOnHover={false}>
                        {ICONOS_DISTRIBUCION.map((item, index) => (
                            <div
                                key={`${item.id}-${index}`}
                                className="group flex flex-col items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-xl transition-all duration-300 hover:border-red-600/50 hover:bg-neutral-900 w-64 sm:w-72 shrink-0"
                            >

                                <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-xl border border-white/10 bg-neutral-900 p-3.5 shadow-inner transition-transform duration-300 group-hover:scale-105">
                                    <ClipPathImage
                                        src={item.src}
                                        alt={item.titulo}
                                        direction={index % 2 === 0 ? "bottom" : "top"}
                                        duration={0.9}
                                        containerClassName="relative h-full w-full overflow-hidden"
                                        className="h-full w-full object-contain filter drop-shadow-md"
                                    />
                                </div>


                                <span className="mt-4 font-sans text-xs sm:text-sm font-semibold tracking-wide text-stone-200 text-center leading-snug">
                                    {item.titulo}
                                </span>
                            </div>
                        ))}
                    </InfiniteLoopCarousel>
                </div>
            </section>


            <section className="relative w-full py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden bg-transparent">
                <Container>
                    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12 lg:gap-16 xl:gap-20">


                        <div className="order-1 space-y-6 sm:space-y-8 md:col-span-7 lg:col-span-7 xl:col-span-8 text-left">

                            <div className="space-y-4 sm:space-y-5 lg:space-y-6 font-sans text-stone-700 text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.25rem] leading-relaxed">
                                {PARRAFOS_DISTRIBUCION.map((parrafo, idx) => (
                                    <WordbyWordBuild
                                        key={idx}
                                        text={parrafo}
                                        stagger={0.02}
                                        duration={0.4}
                                        delay={idx * 0.05}
                                        className="text-stone-700 text-justify text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.25rem] leading-relaxed"
                                    />
                                ))}
                            </div>
                        </div>


                        <div className="order-2 flex justify-center items-center md:col-span-5 lg:col-span-5 xl:col-span-4 pt-6 md:pt-0">
                            <div className="relative w-full max-w-[170px] sm:max-w-[200px] md:max-w-[230px] lg:max-w-[270px] xl:max-w-[310px] drop-shadow-2xl transition-all duration-300">
                                <ClipPathImage
                                    src="/images/distribuye/akal.webp"
                                    alt="Cerveza Tenek Akal - Alianza Comercial"
                                    direction="bottom"
                                    duration={1}
                                    containerClassName="relative aspect-[347/1081] w-full overflow-hidden"
                                    className="h-full w-full object-contain filter drop-shadow-2xl"
                                />
                            </div>
                        </div>

                    </div>
                </Container>
            </section>



            <section className="relative w-full py-10 sm:py-14 md:py-16 lg:py-20 overflow-hidden">
                <WavesBackground variant="wine" isFixed={false} />

                <Container className="relative z-10">
                    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-10 lg:gap-12 xl:gap-16">


                        <div className="order-2 md:order-1 flex justify-center items-center md:col-span-5 lg:col-span-5 xl:col-span-5">
                            <div className="relative w-full max-w-[240px] sm:max-w-[290px] md:max-w-[320px] lg:max-w-[380px] xl:max-w-[420px] drop-shadow-[0_20px_35px_rgba(0,0,0,0.55)] transition-all duration-300">
                                <ClipPathImage
                                    src="/images/distribuye/perfil_distribuidor.webp"
                                    alt="Perfil del distribuidor Tenek"
                                    direction="top"
                                    duration={1}
                                    containerClassName="relative aspect-[1343/1920] w-full overflow-hidden rounded-2xl sm:rounded-3xl"
                                    className="h-full w-full object-cover filter drop-shadow-xl"
                                />
                            </div>
                        </div>


                        <div className="order-1 md:order-2 md:col-span-7 lg:col-span-7 xl:col-span-7 text-left">
                            <article className="rounded-3xl border border-white/15 bg-neutral-950/85 p-6 sm:p-8 md:p-9 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md">


                                <WaveColorShift
                                    as="h1"
                                    text="Perfil del distribuidor ideal"
                                    initialColor="#A51D24"
                                    yOffset={30}
                                    duration={0.6}
                                    stagger={0.03}
                                    className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white text-center"
                                />


                                <div className="mt-5 sm:mt-6 space-y-4 sm:space-y-5 font-sans text-stone-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                                    <WordbyWordBuild
                                        text="Nuestro distribuidor ideal es una empresa o emprendedor con experiencia en la comercialización de bebidas, alimentos gourmet o productos premium, que busca incorporar a su portafolio una marca diferenciada con alto potencial de crecimiento y fidelización."
                                        stagger={0.015}
                                        duration={0.35}
                                        delay={0.05}
                                        className="text-stone-300 text-sm sm:text-base lg:text-lg leading-relaxed"
                                    />
                                    <WordbyWordBuild
                                        text="Se distingue por construir relaciones comerciales de largo plazo con sus clientes, asesorarlos en la selección de productos y desarrollar mercados, más que competir únicamente por precio."
                                        stagger={0.015}
                                        duration={0.35}
                                        delay={0.08}
                                        className="text-stone-300 text-sm sm:text-base lg:text-lg leading-relaxed"
                                    />
                                </div>

                            </article>
                        </div>

                    </div>
                </Container>
            </section>


            <section className="relative w-full py-2">

                <SeamlessInfiniteScroll speed={0.12} aspectRatio="square">
                    {imagenes.map((src, index) => (
                        <div
                            key={index}
                            className="relative h-full w-full rounded-3xl overflow-hidden border-2 border-white/80 bg-stone-900 shadow-xl"
                        >
                            <img
                                src={src}
                                alt={`Foto carrusel ${(index % 5) + 1}`}
                                className="h-full w-full object-cover object-center"
                                loading="lazy"
                                onError={(e) => {
                                    const target = e.currentTarget;
                                    if (target.src.endsWith(".webp")) {
                                        target.src = target.src.replace(".webp", ".jpg");
                                    }
                                }}
                            />

                            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/15" />
                        </div>
                    ))}
                </SeamlessInfiniteScroll>
            </section>

            <section className=" w-full py-10 sm:py-20 lg:py-24 overflow-hidden">
                <Container>
                    <div className="relative mx-auto w-full max-w-5xl rounded-3xl border border-neutral-800 p-8 sm:p-12 lg:p-14 shadow-2xl backdrop-blur-md">
                        <WavesBackground variant="dark" isFixed={false} />

                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute top-0 right-1/4 h-72 w-72 rounded-full bg-red-900/20 blur-[100px]"
                        />

                        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12">


                            <div className="flex justify-center items-center md:col-span-5">
                                <div className="relative w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[316px] drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)] transition-transform duration-500 hover:scale-105">
                                    <ClipPathImage
                                        src="/images/distribuye/catalogo.png"
                                        alt="Catálogo Comercial Cervecería Tenek"
                                        direction="bottom"
                                        duration={1}
                                        containerClassName="relative aspect-[316/453] w-full overflow-hidden rounded-2xl"
                                        className="h-full w-full object-contain filter drop-shadow-2xl"
                                    />
                                </div>
                            </div>


                            <div className="text-left md:col-span-7 space-y-6">


                                <WaveColorShift
                                    as="h2"
                                    text="Catálogo de Distribución"
                                    initialColor="#A51D24"
                                    yOffset={25}
                                    duration={0.6}
                                    stagger={0.03}
                                    className="font-sans text-3xl sm:text-5xl lg:text-6xl text-white tracking-wide leading-tight"
                                />

                                <WordbyWordBuild
                                    text="Descarga el catálogo completo con fichas técnicas de cada estilo de cerveza, notas de cata, presentaciones y sugerencias de maridaje."
                                    stagger={0.015}
                                    duration={0.35}
                                    delay={0.05}
                                    className="font-sans text-sm sm:text-base lg:text-lg text-stone-300 leading-relaxed"
                                />

                                <div className="pt-3">
                                    <ShineButton
                                        as="a"
                                        href="/docs/catalogo_tenek.pdf"
                                        download="Catalogo_Tenek_Distribucion.pdf"
                                        className="rounded-2xl bg-red-700 px-8 py-4 font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white shadow-xl shadow-red-950/60 hover:bg-red-600 active:scale-95"
                                    >
                                        <span className="relative z-10 flex items-center gap-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                                className="h-5 w-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                                                />
                                            </svg>
                                            Descargar Catálogo
                                        </span>
                                    </ShineButton>
                                </div>

                            </div>

                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}