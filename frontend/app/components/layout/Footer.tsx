import { Link } from "react-router";
import Container from "~/components/ui/Container";
import { FaInstagram, FaFacebookF, FaXTwitter, FaTiktok } from "react-icons/fa6";
import { FiPhone, FiMail } from "react-icons/fi";

const REDES_SOCIALES = [
    {
        nombre: "Instagram",
        href: "https://www.instagram.com/cerveceriatenek/",
        icono: FaInstagram,
    },
    {
        nombre: "Facebook",
        href: "https://www.facebook.com/CerveceriaTenek",
        icono: FaFacebookF,
    },
    {
        nombre: "X (Twitter)",
        href: "https://x.com/CerveceriaTenek",
        icono: FaXTwitter,
    },

    {
        nombre: "TikTok",
        href: "https://www.tiktok.com/@cerveceriatenek?is_from_webapp=1&sender_device=pc",
        icono: FaTiktok,
    },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-neutral-900 bg-neutral-950 text-neutral-400 font-sans">
            <Container className="py-14 sm:py-16">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">


                    <div className="flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                            <p className="text-sm font-medium leading-relaxed text-stone-200">
                                Cerveza artesanal mexicana hecha con orgullo y pasión.
                            </p>

                            <div className="pt-1">
                                <img
                                    src="/images/logo-white.png"
                                    alt="Cervecería Tenek"
                                    className="h-40 w-auto object-contain filter drop-shadow-md"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        <div>
                            <span className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-3">
                                Síguenos
                            </span>
                            <div className="flex items-center gap-3">
                                {REDES_SOCIALES.map((red) => {
                                    const Icon = red.icono;
                                    return (
                                        <a
                                            key={red.nombre}
                                            href={red.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={red.nombre}
                                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/60 text-neutral-300 transition-all duration-300 hover:-translate-y-1 hover:border-red-700/60 hover:bg-red-950/30 hover:text-red-400"
                                        >
                                            <Icon className="text-base" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white">
                            Explorar
                        </h3>
                        <ul className="mt-5 space-y-2.5 text-sm">
                            <li>
                                <Link to="/distribuye" className="transition-colors hover:text-red-400">
                                    Distribuye Tenek
                                </Link>
                            </li>
                            <li>
                                <Link to="/cervezas" className="transition-colors hover:text-red-400">
                                    Nuestras Cervezas
                                </Link>
                            </li>
                            <li>
                                <Link to="/experiencia" className="transition-colors hover:text-red-400">
                                    Experiencia Tenek
                                </Link>
                            </li>
                            <li>
                                <Link to="/ubicaciones" className="transition-colors hover:text-red-400">
                                    Ubicaciones
                                </Link>

                            </li>
                            <li>
                                <Link to="/academia" className="transition-colors hover:text-red-400">
                                    Academia Cervecera
                                </Link>
                            </li>
                        </ul>
                    </div>

                    
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white">
                            Contáctanos
                        </h3>
                        <ul className="mt-5 space-y-3 text-sm">
                            <li className="flex items-center gap-2.5">
                                <FiPhone className="text-base text-red-500 shrink-0" />
                                <a href="tel:+522225987597" className="transition-colors hover:text-white">
                                    +52 222 598 7597
                                </a>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <FiMail className="text-base text-red-500 shrink-0" />
                                <a href="mailto:contacto@cerveceriatenek.com" className="transition-colors hover:text-white">
                                    contacto@cerveceriatenek.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <FiMail className="text-base text-red-500 shrink-0" />
                                <a href="mailto:contacto@tenekbeer.com" className="transition-colors hover:text-white">
                                    contacto@tenekbeer.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white">
                            Consumo Responsable
                        </h3>
                        <p className="text-xs leading-relaxed text-neutral-400">
                            El abuso en el consumo de este producto es nocivo para la salud. Venta prohibida exclusivamente a menores de 18 años.
                        </p>
                        <div>
                            <span className="inline-block rounded-lg border border-red-900/40 bg-red-950/20 px-3 py-1 text-[11px] font-bold tracking-wider text-red-300">
                                +18 AÑOS
                            </span>
                        </div>
                    </div>
                </div>

                
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-900 pt-8 sm:flex-row text-xs text-neutral-400">
                    <p>
                        &copy; {currentYear} Cervecería Tenek. Todos los derechos reservados.
                    </p>

                </div>
            </Container>
        </footer>
    );
}