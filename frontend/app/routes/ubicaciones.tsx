import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import api, { type ApiResponse } from "~/api/axiosClient";
import LocationsSection from "~/features/locations/LocationsSection";
import type { Ubicacion } from "~/types";

export async function loader({}: LoaderFunctionArgs) {
    try {
        const { data } = await api.get<ApiResponse<Ubicacion[]>>("/ubicaciones");
        return { ubicaciones: data.data };
    } catch (error) {
        console.error("Error al cargar ubicaciones:", error);
        return { ubicaciones: [] };
    }
}

export default function HomeRoute() {
    const { ubicaciones } = useLoaderData<{ ubicaciones: Ubicacion[] }>();

    return (
        <main>
            {/* ... tus demás secciones ... */}
            <LocationsSection ubicaciones={ubicaciones} />
        </main>
    );
}