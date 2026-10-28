import type { Route } from "./+types/academia";
import { useLoaderData } from "react-router";
import { getAcademiaArticulos } from "~/services/academia.service";
import { AcademiaSection } from "~/features/academy/components/AcademiaSection";

export async function loader({ }: Route.LoaderArgs) {
    const articulos = await getAcademiaArticulos();
    return { articulos };
}

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Academia Cervecera | Cervecería Tenek" },
        { name: "description", content: "Aprende de cata, notas y distribución con Cervecería Tenek." },
    ];
}

export default function AcademiaRoute() {
    const { articulos } = useLoaderData<typeof loader>();

    return (
        <div className="w-full bg-transparent">
            <AcademiaSection articulos={articulos} />
        </div>
    );
}