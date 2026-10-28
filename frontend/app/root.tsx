import { useEffect } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./utils/gsap";

import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import WavesBackground from "./components/ui/WavesBackground";
import PageTransition from "./components/ui/PageTransition";

import poppinsFont from "./assets/fonts/Poppins/Poppins-Regular.ttf";
import rockyeahFont from "./assets/fonts/Rockyeah/Rockyeah-Brush.otf";
import WhatsAppFloatingButton from "./components/ui/WhatsAppFloatingButton";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "preload",
    href: poppinsFont,
    as: "font",
    type: "font/ttf",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: rockyeahFont,
    as: "font",
    type: "font/otf",
    crossOrigin: "anonymous",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="text-neutral-900 antialiased selection:bg-red-500 selection:text-white">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  return (
    <>

      <PageTransition />


      <WavesBackground variant="light" isFixed={true} />

      <div className="flex min-h-screen flex-col bg-transparent">
        <Navbar />
        <main className="flex-1 bg-transparent">
          <Outlet />
        </main>
        <Footer />
      </div>
      <WhatsAppFloatingButton />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "Ocurrió un error inesperado.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "La página solicitada no existe."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1 className="text-3xl font-bold text-amber-600">{message}</h1>
      <p className="mt-2 text-neutral-700">{details}</p>
      {stack && (
        <pre className="mt-4 w-full overflow-x-auto rounded bg-neutral-100 p-4 text-xs text-red-600">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}