import type { Route } from "./+types/contacto";
import { useLoaderData } from "react-router";
import { getCervezas } from "~/services/cervezas.service";
import { ContactCardsSection, ContactHeroCarousel, ContactMapSection } from "~/features/contact";

export async function loader({ }: Route.LoaderArgs) {
    const cervezas = await getCervezas();
    return { cervezas };
}

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Contacto | Cervecería Tenek" },
        { name: "description", content: "Ponte en contacto con Cervecería Tenek." },
    ];
}

export default function ContactoRoute() {
    const { cervezas } = useLoaderData<typeof loader>();

    return (
        <div className="w-full bg-transparent">

            <ContactHeroCarousel cervezas={cervezas} />

            <ContactCardsSection />

            <ContactMapSection />


        </div>
    );
}