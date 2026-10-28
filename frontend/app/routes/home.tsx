import Container from "~/components/ui/Container";
import type { Route } from "./+types/home";
import WavesBackground from "~/components/ui/WavesBackground";
import CardsAnimation from "~/components/ui/CardsAnimation";
import InfiniteLoopCarousel from "~/components/ui/InfiniteLoopCarousel";
import ClipPathImage from "~/components/ui/ClipPathImage";
import WaveColorShift from "~/components/ui/WaveColorShift";
import CinematicVideoFrame from "~/components/ui/CinematicVideoFrame";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Cervecería Tenek | Cerveza Artesanal" },
    { name: "description", content: "Cervecería Tenek - Cervezas artesanales con identidad mexicana, barricas y distribución." },
  ];
}

const IMAGENES_CARRUSEL = [
  { id: 1, src: "/images/carrusel/1.webp", alt: "Barricas de roble Tenek" },
  { id: 2, src: "/images/carrusel/2.webp", alt: "Proceso de cocción y lúpulos" },
  { id: 3, src: "/images/carrusel/3.webp", alt: "Servido en copa de cata" },
  { id: 4, src: "/images/carrusel/4.webp", alt: "Cava de fermentación" },
  { id: 5, src: "/images/carrusel/5.webp", alt: "Lote artesanal en frío" },
  { id: 6, src: "/images/carrusel/6.webp", alt: "Experiencia cervecera Tenek" },
  { id: 7, src: "/images/carrusel/7.webp", alt: "Experiencia cervecera Tenek" },
  { id: 8, src: "/images/carrusel/8.webp", alt: "Experiencia cervecera Tenek" },
  { id: 9, src: "/images/carrusel/9.webp", alt: "Experiencia cervecera Tenek" },
  { id: 10, src: "/images/carrusel/10.webp", alt: "Experiencia cervecera Tenek" },
  { id: 11, src: "/images/carrusel/11.webp", alt: "Experiencia cervecera Tenek" },
  { id: 12, src: "/images/carrusel/12.webp", alt: "Experiencia cervecera Tenek" },
  { id: 13, src: "/images/carrusel/13.webp", alt: "Experiencia cervecera Tenek" },
  { id: 14, src: "/images/carrusel/14.webp", alt: "Experiencia cervecera Tenek" },
  { id: 15, src: "/images/carrusel/15.webp", alt: "Experiencia cervecera Tenek" },
];

const PILARES = [
  {
    id: "ingredientes",
    titulo: "Legado & Raíz",
    descripcion:
      "En TENEK elaboramos cerveza artesanal mexicana de alta calidad inspirada en la diversidad cultural, las tradiciones y la riqueza de cada rincón de México. Creemos que cada receta puede contar una historia y que cada cerveza es una invitación a descubrir nuevos sabores, celebrar nuestras raíces y compartir momentos memorables.",
    icono: "/images/iconos/piramide.png",
    theme: {
      card: "border-blue-900/30 bg-blue-950/[0.08] hover:border-blue-600 hover:bg-blue-950/[0.14] hover:shadow-blue-950/20",
      title: "text-blue-950",
      accent: "bg-blue-600",
      iconBox: "border-blue-900/20 bg-blue-100/80 shadow-blue-900/10",
      badge: "border-blue-800/40 bg-blue-900/10 text-blue-900",
      glow: "bg-blue-500/20",
    },
  },
  {
    id: "proceso",
    titulo: "Maestría & Fuego",
    descripcion:
      "Nuestra pasión por la innovación nos impulsa a crear propuestas únicas que reinterpretan ingredientes, costumbres y expresiones culturales para transformarlas en experiencias auténticas. Cada estilo de cerveza refleja el carácter de nuestro país: su creatividad, su diversidad y el orgullo de una herencia que sigue inspirándose.",
    icono: "/images/iconos/lupulo.png",
    theme: {
      card: "border-amber-900/30 bg-amber-950/[0.08] hover:border-amber-600 hover:bg-amber-950/[0.14] hover:shadow-amber-950/20",
      title: "text-amber-950",
      accent: "bg-amber-600",
      iconBox: "border-amber-900/20 bg-amber-100/80 shadow-amber-900/10",
      badge: "border-amber-800/40 bg-amber-900/10 text-amber-900",
      glow: "bg-amber-500/20",
    },
  },
  {
    id: "origen",
    titulo: "Territorio & Unión",
    descripcion:
      "Lo que nos diferencia es nuestra forma de entender la cerveza. No solo buscamos elaborar productos de excelencia; buscamos conectar a las personas con la esencia de México a través de sabores originales que despiertan curiosidad, conversación y nuevas experiencias. En TENEK, cada botella es una historia por descubrir y una forma de brindar por la cultura que nos une.",
    icono: "/images/iconos/cervezas_mapa.png",
    theme: {
      card: "border-emerald-900/30 bg-emerald-950/[0.08] hover:border-emerald-600 hover:bg-emerald-950/[0.14] hover:shadow-emerald-950/20",
      title: "text-emerald-950",
      accent: "bg-emerald-600",
      iconBox: "border-emerald-900/20 bg-emerald-100/80 shadow-emerald-900/10",
      badge: "border-emerald-800/40 bg-emerald-900/10 text-emerald-900",
      glow: "bg-emerald-500/20",
    },
  },
];

export default function Home() {
  return (
    <div className="w-full">

      <section className="relative flex h-full w-full flex-col justify-between overflow-hidden">
        <WavesBackground variant="wine" isFixed={false} />
        <div className="relative z-10 flex h-14 w-full items-center justify-between backdrop-blur-xs px-6 sm:h-16 md:h-20 sm:px-12" />
        <div className="relative flex flex-1 w-full items-center justify-center overflow-hidden">
          <CinematicVideoFrame
            src="/videos/banner.mp4"
            type="native"
            aspectRatio="auto"
            className="h-full w-full"
          />
        </div>
        <div className="relative z-10 flex h-10 w-full items-center justify-center backdrop-blur-xs px-6 sm:h-16 md:h-20" />
      </section>


      <section className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden ">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[650px] rounded-full bg-red-950/20 blur-[130px]"
        />

        <Container className="relative z-10 text-center">


          <div className="mt-10 lg:mt-14 mx-auto w-full max-w-5xl overflow-hidden rounded-3xl p-2 sm:p-3 shadow-2xl shadow-red-950/20">
            <CinematicVideoFrame
              src="https://www.youtube.com/embed/3Vrp3y8_XpI"
              type="iframe"
              aspectRatio="16/9"
            />

          </div>
        </Container>
      </section>


      <section className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden">



        <Container className="relative z-10 text-center">

          <WaveColorShift
            as="h1"
            text="Nuestra Esencia & Origen"
            initialColor="#A51D24"
            yOffset={40}
            duration={0.6}
            stagger={0.03}
            className="font-sans text-5xl sm:text-7xl lg:text-8xl text-red-900 drop-shadow-sm"
          />


          <CardsAnimation
            className="mt-12 lg:mt-16 grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:gap-8 text-center"
            cardSelector=".pilar-card"
            iconSelector=".pilar-icon"
          >
            {PILARES.map((pilar) => (
              <article
                key={pilar.id}
                className={`pilar-card group relative flex flex-col justify-between rounded-3xl border p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${pilar.theme.card}`}
              >

                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${pilar.theme.glow}`}
                />

                <div className="relative z-10 flex flex-col items-center">

                  <div
                    className={`mb-6 flex h-28 w-30 sm:h-32 sm:w-32 items-center justify-center rounded-2xl border p-4 shadow-md backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 ${pilar.theme.iconBox}`}
                  >
                    <img
                      src={pilar.icono}
                      alt={pilar.titulo}
                      className="pilar-icon h-full w-full object-contain filter drop-shadow"
                      loading="lazy"
                    />
                  </div>


                  <h1 className={`font-sans text-3xl sm:text-4xl lg:text-5xl ${pilar.theme.title}`}>
                    {pilar.titulo}
                  </h1>


                  <p className="mt-4 font-sans text-base sm:text-sm text-black text-justify sm:justify-center">
                    {pilar.descripcion}
                  </p>
                </div>


                <div className="relative z-10 mt-6 flex justify-center">
                  <div
                    className={`h-1.5 w-10 rounded-full transition-all duration-300 group-hover:w-20 ${pilar.theme.accent}`}
                  />
                </div>
              </article>
            ))}
          </CardsAnimation>
        </Container>
      </section>


      <section className="relative w-full py-10 sm:py-12 overflow-hidden">
        <div className="mb-6 px-4 text-center">
        </div>


        <InfiniteLoopCarousel speed={50} gap={24} pauseOnHover={false}>
          {IMAGENES_CARRUSEL.map((foto, index) => (
            <div
              key={foto.id}
              className="group relative h-full w-80 sm:h-full sm:w-96 overflow-hidden rounded-2xl shadow-lg"
            >

              <ClipPathImage
                src={foto.src}
                alt={foto.alt}
                direction={index % 2 === 0 ? "bottom" : "top"}
                duration={1.2}
                disableScrollTrigger={true}
                containerClassName="relative h-full w-full overflow-hidden"
                className="h-full w-full transition-transform duration-700 group-hover:scale-200"
              />


              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-red-400/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </InfiniteLoopCarousel>
      </section>
    </div>
  );
}