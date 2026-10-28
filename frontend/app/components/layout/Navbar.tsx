import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router";
import gsap from "gsap";

const NAV_LINKS = [
    { name: "Distribuye Tenek", href: "/distribuye" },
    { name: "Nuestras Cervezas", href: "/cervezas" },
    { name: "Experiencia Tenek", href: "/experiencia" },
    { name: "Ubicaciones", href: "/ubicaciones" },
    { name: "Academia Cervecera", href: "/academia" },
    { name: "Contactos", href: "/contacto" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const containerRef = useRef<HTMLElement>(null);
    const menuBarTl = useRef<gsap.core.Timeline | null>(null);
    const navTl = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 1024px)", () => {
                gsap.from(".desktop-nav-item", {
                    y: 40,
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.8,
                    stagger: 0.08,
                    delay: 0.2,
                    ease: "power2.out",
                    clearProps: "all"
                });
            });

            menuBarTl.current = gsap.timeline({ paused: true })
                .to(".mobile-bar-1", {
                    duration: 0.4,
                    attr: { d: "M8,2 L2,8" },
                    x: 1,
                    stroke: "#A51D24",
                    ease: "power2.inOut"
                }, "start")
                .to(".mobile-bar-2", {
                    duration: 0.3,
                    autoAlpha: 0,
                    ease: "power2.inOut"
                }, "start")
                .to(".mobile-bar-3", {
                    duration: 0.4,
                    attr: { d: "M8,8 L2,2" },
                    x: 1,
                    stroke: "#A51D24",
                    ease: "power2.inOut"
                }, "start");

            navTl.current = gsap.timeline({ paused: true })
                .set(".mobile-fullpage-menu", { display: "block" })
                .to(".mobile-menu-bg", {
                    duration: 0.35,
                    opacity: 1,
                    ease: "power2.out"
                })
                .from(".mobile-nav-link", {
                    duration: 0.4,
                    y: 30,
                    opacity: 0,
                    stagger: 0.06,
                    ease: "power3.out"
                }, "-=0.2");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (isOpen) {
            menuBarTl.current?.play();
            navTl.current?.play();
            document.body.style.overflow = "hidden";
        } else {
            menuBarTl.current?.reverse();
            navTl.current?.reverse();
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname, location.hash]);

    return (
        <header
            ref={containerRef}
            className="sticky top-0 z-50 w-full bg-white/95 supports-[backdrop-filter]:bg-white/90 supports-[backdrop-filter]:backdrop-blur-md transition-colors max-lg:bg-white"
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">

                <Link
                    to="/"
                    className="group flex items-center gap-2.5 focus:outline-none transition-transform active:scale-95"
                >
                    <img
                        src="/images/logo-black.png"
                        alt="Cervecería Tének"
                        className="h-12 w-auto object-contain transition-opacity group-hover:opacity-80 sm:h-9 md:h-20"
                    />
                </Link>


                <nav className="hidden items-center lg:flex lg:gap-4 xl:gap-7">
                    {NAV_LINKS.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.href}
                            className={({ isActive }) =>
                                `desktop-nav-item text-base font-sans tracking-normal  transition-colors duration-150 hover:text-red-800 xl:text-base ${isActive ? "text-red-800 font-bold" : "text-black"
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>


                <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    aria-label={isOpen ? "Cerrar menú" : "Abrir menú de navegación"}
                    aria-expanded={isOpen}
                    className="relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-xl p-2 text-black focus:outline-none lg:hidden"
                >
                    <svg
                        viewBox="0 0 12 10"
                        className="h-6 w-6 stroke-current fill-none"
                        style={{ strokeLinecap: "round", strokeWidth: 1.5 }}
                    >
                        <path d="M10,2 L2,2" className="mobile-bar-1" />
                        <path d="M2,5 L10,5" className="mobile-bar-2" />
                        <path d="M10,8 L2,8" className="mobile-bar-3" />
                    </svg>
                </button>
            </div>


            <div
                className="mobile-fullpage-menu fixed inset-0 z-40 hidden h-screen w-full lg:hidden"
            >

                <div className="mobile-menu-bg absolute inset-0 bg-white opacity-0" />


                <div className="relative z-10 flex h-full flex-col justify-center px-8 sm:px-12">
                    <ul className="flex flex-col space-y-6">
                        {NAV_LINKS.map((link) => (
                            <li key={link.name} className="overflow-hidden">
                                <NavLink
                                    to={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `mobile-nav-link block font-sans text-2xl sm:text-3xl font-bold tracking-tight uppercase transition-colors ${isActive
                                            ? "text-balck"
                                            : "text-balck hover:text-red-800"
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    );
}